# Common Quality And Verification

<quality_contract>

Customer email crosses a public webhook, a database, a provider API, and customer-facing app behavior. The implementation is complete only when those boundaries are safe and the actual repository checks pass. A green typecheck alone does not prove durable receipt or correct Postmark routing.

</quality_contract>

## Validation without duplication

Validate at the boundary where the value enters the app, then pass the typed contract inward. Reuse existing Zod/schema/result helpers and domain authorization.

| Boundary | Validate |
| --- | --- |
| Inbound HTTP | Basic Auth, raw JSON parse, non-array object, non-empty `MessageID`. |
| Inbound persistence | Database uniqueness and valid state transitions. |
| Outbound app input | Authorized recipient, non-empty subject, and at least one body. |
| Provider response | Expected success shape and status; map invalid/unexpected responses to a safe error. |
| Browser/API response | Generic user-safe status; never provider payloads or credentials. |

Do not repeat the same validation in every service layer, and do not add defensive branches for states the strict schema and database constraint already make impossible. Add a guard when it protects a real external boundary, persistence failure, or a documented recovery case.

## Safe logging

<logging_policy>

Email content is sensitive operational data. Logs may contain a safe internal receipt id, a Postmark operation category, a status, an attempt count, or a non-sensitive provider error category. Logs must not contain credentials, Authorization headers, raw payloads, sender/recipient addresses, subject lines, bodies, headers, attachment names, or attachment content.

</logging_policy>

When a provider call fails, log the app's safe category and correlation id through its established logger. Do not stringify the request or provider response to make debugging easier; that turns operational logs into an email data store.

## Migration discipline

Add the smallest migration required for durable inbound receipt and any app-specific processing state. Follow the repository's normal schema generation and migration command. Before applying it:

1. Read the existing schema and migration conventions.
2. Confirm the unique `MessageID` constraint is represented in the generated migration.
3. Confirm the migration is forward-only and safe for the app's existing data.
4. Run the isolated migration/test command required by the repository.
5. Include the migration in the final diff and record the exact verification command.

Do not hand-edit a live database, reset user data, seed production fixtures, or create an unrelated mailbox schema. Use the app's existing migration owner and data layer.

## Test matrix

<test_matrix>

The smallest complete coverage should include both directions and the shared security boundary:

| Area | Evidence |
| --- | --- |
| Inbound auth | Missing, malformed, incorrect, and valid Basic Auth. |
| Inbound payload | Malformed JSON, primitive/array JSON, missing/empty `MessageID`, and valid payload. |
| Inbound durability | Exact raw body preservation, unique duplicate handling, concurrent duplicate behavior, and persistence failure. |
| Inbound recovery | Pending and stale-processing rows recover after worker recreation/restart, with bounded retry behavior. |
| Outbound request | Exact endpoint, headers, From, ReplyTo, stream, body requirement, and token isolation. |
| Outbound failures | Missing token, transport failure, non-2xx response, invalid provider response, and safe error mapping. |
| Integration | A real app workflow can trigger send/receive processing without bypassing the app boundary. |
| Regression | Existing repository check, typecheck, build, and relevant browser flow remain green. |

</test_matrix>

Use the existing test harness. Keep provider tests deterministic with injected `fetch` or the app's established adapter seam. A live email send is optional and requires an explicitly approved safe recipient; it is not a substitute for testing the request contract.

## Interactive verification

For a user-facing email workflow, verify through the real local app where the repository supports it:

1. Start the app with the repository's normal local command and a bounded readiness check.
2. Exercise the relevant UI or app action that causes an outbound send.
3. Inspect the server-side result/log category without exposing the token or message content.
4. Exercise the inbound route with a safe representative payload and valid/invalid auth.
5. Confirm the accepted receipt and processing result through the app's normal UI or safe operational evidence.
6. Check mobile and desktop layouts when the task changes UI.
7. Clean up only the isolated test state and temporary processes.

If interactive tooling is unavailable, report that limitation and provide the strongest available route, database, provider-request, typecheck, build, and static evidence. Do not claim that a browser flow or real delivery was verified without performing it.

## Final audit search

Before sign-off, search the final diff and generated bundle for:

| Search target | Expected result |
| --- | --- |
| `POSTMARK_INBOUND_WEBHOOK_SECRET` | Server-only read and Basic Auth use. |
| `POSTMARK_SERVER_TOKEN` | Server-only Postmark header use. |
| `POSTMARK_ACCOUNT_TOKEN` | Absent from generated app. |
| `POSTMARK_INBOUND_ADDRESS` or address ENV variants | Absent; task address is a code constant. |
| `SMTP`, `smtp.postmarkapp.com` | Absent from implementation. |
| `api.postmarkapp.com` in browser files | Absent; provider calls stay server-side. |
| `403` in inbound handler | Absent as an inbound response path. |
| raw payload/address/body logging | Absent. |
| production/publish email branches | Absent unless the task explicitly changes the platform contract. |
| second stream/server/signature/gateway | Absent. |

Also read back the route registration order, configuration module, migration, provider adapter, and final task-specific integration. Confirm the reviewer requirements from the task are demonstrably true, not just described in prose.

## Completion evidence

Record:

- the selected task values and where they are defined;
- the two managed ENV reads and their server-only boundary;
- the migration command and output;
- focused test commands and results;
- repository check/typecheck/build results;
- interactive or provider-request verification evidence;
- any explicitly skipped live-email check and why;
- final diff/search results and cleanup.

<signoff>

If a required contract cannot be proven, keep the task open and state the exact missing evidence or `action_required` dependency. Do not convert uncertainty into a successful sign-off.

</signoff>
