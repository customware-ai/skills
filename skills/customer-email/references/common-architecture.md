# Common Architecture

<scope>

This reference defines the shared platform and application boundary for customer email. Read it before implementing either direction.

</scope>

## The system boundary

The generated app is the runtime email product. Customware is the control plane.

```text
Customware control plane
  ├─ creates one development Postmark server
  ├─ stores the encrypted server credential
  ├─ materializes hidden project ENV values
  ├─ points Postmark at the current sandbox URL
  └─ blocks publish while this development integration exists

Generated app
  ├─ receives POST /api/email/inbound from Postmark
  ├─ durably stores and processes inbound deliveries
  └─ sends customer-facing mail directly to Postmark's HTTPS Email API
```

<boundary_rule>

The app never creates a Postmark server, asks for an account token, changes a message stream, configures SMTP, or calls a Customware email gateway. The existing development server and its credentials are already available when this skill is invoked.

</boundary_rule>

## Task-provided values

The Builder task is intentionally the project-specific handoff. Read it before choosing constants.

| Value | Where it comes from | How the app uses it |
| --- | --- | --- |
| Virtual inbound address | The task's `Platform contract` | Use as the outbound `ReplyTo` address. Keep it in a server-owned constant. |
| Outbound From address | The task's `Platform contract` (currently `messages@customware.ai`) | Use as `From`. Keep it in the same server-owned email configuration module. |
| Project/org identity | Trusted generation context and the app's existing configuration | Keep it server-owned where the app needs it. Never accept it as a credential or arbitrary browser routing input. |

The inbound address is not an environment variable. The From address is not an environment variable. Neither is a secret, and both are deliberately visible in the task so the Builder and reviewer can use and verify them.

<missing_task_value>

If the task does not contain an exact inbound address or exact From address, stop with a clear missing-input explanation. Do not query Postmark from the generated app, guess an address, add a user-editable ENV, or substitute a placeholder.

</missing_task_value>

## Managed server ENV values

Only these two values belong in the generated app's server environment:

| ENV key | Kind | Purpose | Exposure |
| --- | --- | --- | --- |
| `POSTMARK_INBOUND_WEBHOOK_SECRET` | Hidden system-managed project ENV | HTTP Basic Auth password for the inbound webhook | Server only |
| `POSTMARK_SERVER_TOKEN` | Hidden system-managed project ENV | `X-Postmark-Server-Token` for outbound HTTPS Email API requests | Server only |

There is no generated-app `POSTMARK_ACCOUNT_TOKEN`, `POSTMARK_INBOUND_ADDRESS`, `POSTMARK_OUTBOUND_FROM_ADDRESS`, SMTP password, or Customware gateway token for this feature. The account token belongs to the Customware control plane and must never cross into the sandbox.

<secret_preflight>

Treat `.env` and every `.env.*` file as inaccessible. Do not use `cat`, `head`, `tail`, `sed`, `awk`, `rg`, `grep`, `ls`, `stat`, or another file/tool read against those files. A runtime command may use the exact form `node --env-file=.env ...` only when its output contains no environment values, credentials, headers, or provider objects.

</secret_preflight>

Read both values at the server boundary, validate that they are present and non-empty, and pass them only to the operation that needs them. Never return them through an API route or put them in a shared module imported by the browser.

## Target application shape

The current Customware full-stack template uses:

| Layer | Existing shape | Integration guidance |
| --- | --- | --- |
| HTTP server | Hono in `server/index.ts` | Register the inbound route before static serving and the SPA fallback. |
| Browser app | React Router client-only SPA | The browser calls the app's own domain; it never calls Postmark. |
| Validation | Zod and existing typed contracts | Define one contract at the appropriate boundary and reuse it. |
| Database | SQLite with Drizzle migrations | Store inbound receipt state durably and enforce uniqueness in the database. |
| Error/result flow | Existing `Result`/`neverthrow` or repository equivalent | Follow the inspected repository contract; do not add a second result abstraction. |
| Observability | Existing server logger and runtime log boundary | Log safe operational facts only. |
| Package manager | pnpm | Use pnpm for any dependency changes. |

The template is a reference, not permission to overwrite an app's architecture. Inspect the target app and reuse its existing route, query, service, migration, and error patterns.

<async_boundary>

When an accepted webhook starts background processing, keep the HTTP response immediate and attach failure handling using the repository's established fire-and-forget pattern. Do not await the worker in the request path, and do not add `void` or a new promise/result wrapper when the repository's code rules disallow them.

</async_boundary>

## Shared integration shape

Create a small server-owned configuration and provider boundary:

```ts
export const customerEmailConfig = {
  inboundAddress: "<exact address from the task>",
  outboundFrom: "<exact From address from the task>",
  inboundWebhookPath: "/api/email/inbound",
  inboundWebhookUsername: "customware",
  outboundMessageStream: "outbound",
} as const;

function readRequiredServerEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required on the server.`);
  return value;
}
```

Keep task values in one module and credential reads at the server boundary. The sample placeholders are explanatory only; replace them with the exact task values and never leave placeholders in the app.

<provider_boundary>

The Postmark adapter should accept the injected `fetch` implementation where the app's tests need it. It should convert network failures, non-2xx responses, and invalid provider responses into the app's normal typed/result error without exposing provider response bodies to users.

</provider_boundary>

## Provider facts to preserve

Postmark has already created the default streams on the provisioned server:

| Stream | Use in this feature |
| --- | --- |
| Default Inbound | Postmark receives mail at the virtual address and delivers the webhook. The app does not create or edit this stream. |
| Default Transactional (`outbound`) | The app sends customer-facing mail with `MessageStream: "outbound"`. |
| Default Broadcast | Not used. Do not create or route messages to it. |

The verified `customware.ai` domain permits the task's approved From address. Do not add a sender signature or custom gateway. If a target app already has a generic sender abstraction, add the Postmark implementation behind that abstraction and keep the fixed platform values server-owned.

## What the app owns

The app owns:

- the inbound HTTP route and Basic Auth check;
- raw delivery capture, schema validation, and durable deduplication;
- app-specific processing of accepted messages;
- a server-side outbound send helper used by real customer workflows;
- safe error translation and logs;
- database migrations and focused tests.

The app does not own provider lifecycle, sandbox URL reconciliation, hidden ENV storage, admin cleanup, project deletion, or publish decisions. Those already belong to Customware.

## Good implementation choices

| Prefer | Why it fits this platform |
| --- | --- |
| One `email` configuration module | Prevents From/ReplyTo/stream drift between features. |
| One focused Postmark client | Keeps network, headers, timeout, and provider errors in one place. |
| Existing app DB/service layer | Keeps durability and transactions consistent with the app. |
| Server-side send helper | Keeps credentials and policy out of browser code. |
| Task address as a literal constant | It is non-secret, project-specific input already intentionally given to the Builder. |

Avoid adding a second Postmark SDK, a direct browser `fetch` to `api.postmarkapp.com`, an ENV for the task addresses, or a generic email platform abstraction without a real existing boundary. Those choices make the fixed contract harder to review and create more places for credentials or routing to drift.
