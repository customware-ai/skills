---
name: cw-email
description: Use when sending transactional emails from a CW Agents app, such as password resets, sign-in links, verification, or notifications.
---

# CW Agents Outbound Email

Send transactional email through the CW Agents outbound email feature. The browser calls the app's own server (normally through tRPC); the server calls the email endpoint so the key never reaches browser bundles, responses or logs.

- Read `projectId` from `.tasks/task.json` (`.tasks/task.md` lists it in frontmatter) and put the real ID in the server constant. If you can't determine it, report that in the task outcome; a placeholder won't work.
- CW Agents injects `CUSTOMWARE_EMAIL_KEY` into the dev sandbox and live app when the org's Outbound email feature is on. If the key is missing, report that outbound email isn't available for this org; never invent credentials or silently switch providers.
- Send exactly `{ to, subject, html, text }`: one recipient address, a subject and both body versions. The endpoint accepts no attachments, cc/bcc, reply-to, from or templates. Max request: 1 MiB.
- Name the app in the body: the sender is always “Customware AI” <support@customware.ai> and can't be changed.
- Send only transactional messages: 15 emails per project per UTC day, and admitted sends count even if delivery fails. Never send bulk mail, marketing or digests to all users, or retry in a loop.
- Log the gateway's `request_id` on failure to trace the send. Never log the email body or raw gateway error; content can contain reset links.

## Send from the server

`apps/api/src/services/email.ts`:

```ts
const PROJECT_ID = "<projectId>"; // Replace with the real ID from .tasks/task.json.
const SEND_URL = `https://agents.customware.ai/api/features/out-email/v1/${PROJECT_ID}/send`;

type Email = { to: string; subject: string; html: string; text: string };
type SendResult = { ok: true } | { ok: false; message: string };
const unavailable = "Outbound email isn't available for this org.";

const errors: Partial<Record<number, string>> = {
  400: "Invalid email request.",       // invalid_json / invalid_request
  401: "Email authorization failed.",  // unauthorized
  403: unavailable,                    // feature_off
  404: "Email project not found.",     // project_not_found
  413: "Email exceeds 1 MiB.",         // body_too_large
  429: "Daily email limit reached.",   // daily_limit_reached
  502: "Email could not be sent.",     // send_failed
  500: "Email service failed.",        // internal
};

export async function sendEmail({ to, subject, html, text }: Email): Promise<SendResult> {
  const key = process.env.CUSTOMWARE_EMAIL_KEY;
  if (!key) return { ok: false, message: unavailable };

  const body = JSON.stringify({ to, subject, html, text });
  if (new TextEncoder().encode(body).length > 1024 * 1024) {
    return { ok: false, message: errors[413]! };
  }

  const response = await fetch(SEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body,
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null);
  if (!response) {
    console.error("Outbound email: no gateway response.");
    return { ok: false, message: "Could not confirm the email send." };
  }
  if (response.status === 200) return { ok: true };

  const payload = await response.json().catch(() => null) as
    { error?: { code: string; message: string; status: number; request_id: string } } | null;
  console.error("Outbound email failed.", {
    status: response.status,
    request_id: payload?.error?.request_id,
  });
  return { ok: false, message: errors[response.status] ?? "Email request failed." };
}
```

A 429 returns a message the caller can show where safe; don't retry it. Don't retry an unconfirmed send automatically either: the gateway may already have admitted it.

## Send a password reset

In the app's tRPC router, use its existing auth and reset services. The helper names below are app-specific. Rate-limit by requester and normalized address to protect the daily quota. Use the same public response and avoid timing differences for unknown accounts or failed sends; queue the reset work if needed to keep lookup and send latency out of the response.

```ts
requestPasswordReset: publicProcedure
  .input(z.object({ email: z.string().email() }))
  .mutation(async ({ ctx, input }) => {
    await rateLimitReset(ctx, input.email);
    await enqueuePasswordReset(input.email); // Queue for all addresses, not just known ones.
    return { message: "If the account exists, you'll receive a reset link." };
  }),

// In the server-side reset job:
async function sendPasswordReset(email: string) {
  const account = await findAccountByEmail(email);
  if (!account) return;

  // Generate an expiring, single-use token and store only its hash.
  const token = await issueResetToken(account.id);
  const link = new URL("/reset-password", appOrigin); // Trusted server config, not request headers.
  link.searchParams.set("token", token);
  const result = await sendEmail({
    to: account.email,
    subject: "Reset your Report Desk password",
    html: `<p>Reset your Report Desk password: <a href="${escapeHtml(link.href)}">Reset password</a>.</p>`,
    text: `Reset your Report Desk password: ${link.href}`,
  });
  if (!result.ok) console.error("Password reset email:", result.message);
}
```

## Send a notification

After a report finishes, send to its owner from the server. Return or handle the typed result in the caller; don't accept an arbitrary recipient from the browser.

```ts
return sendEmail({
  to: reportOwner.email,
  subject: "Your Report Desk report is ready",
  html: "<p>Your Report Desk report is ready. Sign in to view it.</p>",
  text: "Your Report Desk report is ready. Sign in to view it.",
});
```

Adapt these examples to the app's own setup.
