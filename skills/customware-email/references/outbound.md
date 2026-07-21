# Outbound Email

<contract>

Send customer-facing mail directly from server code to Postmark's single-message HTTPS Email API. Use the provisioned server token, the task's approved From address, the task's virtual inbound address as ReplyTo, and the existing Default Transactional stream.

</contract>

## Request shape

Post to:

```text
POST https://api.postmarkapp.com/email
```

Use these headers:

```http
Accept: application/json
Content-Type: application/json
X-Postmark-Server-Token: <POSTMARK_SERVER_TOKEN>
```

Use a body shaped like this, with the exact task address values supplied by the Builder task:

```json
{
  "From": "messages@customware.ai",
  "To": "customer@example.com",
  "Subject": "Your quote is ready",
  "TextBody": "Your quote is ready to review.",
  "HtmlBody": "<p>Your quote is ready to review.</p>",
  "ReplyTo": "<virtual inbound address from the task>",
  "MessageStream": "outbound"
}
```

`To` is the customer recipient chosen by the app's trusted domain data. `From`, `ReplyTo`, and `MessageStream` are platform-controlled values. Do not let a browser request override them.

Postmark accepts a plain-text body, an HTML body, or both. Prefer both when the product already has an HTML email pattern; otherwise keep the message simple and readable with a plain-text body. Add Cc, Bcc, attachments, tracking, templates, or metadata only when the task and existing app behavior require them.

<stream_note>

The Default Transactional stream is already present and is identified by `outbound`. Supplying `MessageStream: "outbound"` makes the intent explicit. Omitting it also defaults to that stream, but the explicit field is easier to review and prevents accidental routing if provider defaults ever change.

</stream_note>

## Server-side adapter

Keep provider transport in a focused server module. Adapt this shape to the app's result/error conventions:

```ts
type SendCustomerEmailInput = {
  to: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
};

export async function sendCustomerEmail(input: SendCustomerEmailInput) {
  const token = readRequiredServerEnv("POSTMARK_SERVER_TOKEN");

  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: customerEmailConfig.outboundFrom,
      To: input.to,
      Subject: input.subject,
      TextBody: input.textBody,
      HtmlBody: input.htmlBody,
      ReplyTo: customerEmailConfig.inboundAddress,
      MessageStream: customerEmailConfig.outboundMessageStream,
    }),
  });

  if (!response.ok) {
    return Result.err(new Error("Customer email could not be sent."));
  }

  return Result.ok(undefined);
}
```

The example intentionally leaves out the target repository's exact `Result` import and response schema. Reuse the app's existing provider client pattern, timeout helper, response parser, and error logger. Keep the token in the function's server-only execution path and never include it in a returned object.

<result_boundary>

Keep one result boundary from the provider adapter to the caller. If the existing client returns `Promise<Result<T, E>>`, await it and branch on `isErr()`/`isOk()` directly; do not wrap it in another `ResultAsync`, instantiate `Ok`/`Err` manually, or access `.value` before the branch. If the repository's adapter already returns `ResultAsync`, return that contract unchanged and compose with its existing helpers.

</result_boundary>

Define a provider-response schema separate from the inbound payload schema. For a successful single-email request, the minimum useful Postmark response is a non-empty `MessageID`; error bodies should be converted to the app's safe provider error category rather than reused as user-facing text.

## Connect to application behavior

Use the existing domain/service boundary that knows when a customer-facing message is required. A good flow is:

```text
trusted app event → email service → Postmark adapter → safe app result
```

The browser may submit a user action that causes the app to send mail, but it should call the app's own authenticated route or server action. The browser must not receive a Postmark token and must not send directly to `api.postmarkapp.com`.

Validate the dynamic fields at the app boundary:

| Field | Minimum expectation |
| --- | --- |
| `To` | A valid app-approved recipient address or address list; apply the app's existing authorization rules. |
| `Subject` | Non-empty string within the app's normal length bound. |
| `TextBody`/`HtmlBody` | At least one body representation; preserve the app's existing content policy. |
| `From` | Always the task-provided platform value. |
| `ReplyTo` | Always the task-provided virtual inbound value. |
| `MessageStream` | Always `outbound`. |

Do not accept arbitrary provider fields from the browser. If the app supports templates, keep template ids and model selection in server-owned code and still force the platform From, ReplyTo, and stream values.

## Failure behavior

Treat these as normal, safe provider failures:

- missing `POSTMARK_SERVER_TOKEN` is a server configuration error;
- network timeout or DNS failure is a retryable transport error according to the app's existing convention;
- Postmark `4xx` is a provider/input error that should become a generic user-safe failure after the app records the safe category;
- Postmark `5xx` is a provider availability error that may be retried only through the app's bounded retry convention.

Never expose the Postmark response body, token, request headers, or full request payload to the browser. Never log message bodies, attachment content, recipient lists, or credentials. If the app has durable outbound job state, record only safe identifiers, status, attempt count, timestamps, and a non-sensitive failure category.

## Sending and reply routing decisions

| Decision | Use | Reason |
| --- | --- | --- |
| `From` | Task's `messages@customware.ai` value | The verified Customware domain is the platform sender. |
| `ReplyTo` | Task's virtual inbound address | Customer replies return through the existing Postmark inbound stream/webhook. |
| `MessageStream` | `outbound` | Keeps customer sends transactional and out of the broadcast stream. |
| HTTP API | Direct server-side Postmark request | SMTP is disabled and a second Customware proxy adds no required capability. |

Prefer this fixed path consistently. Changing From to the virtual inbound address, using a personal sender, enabling SMTP, creating a new stream, or proxying through Customware breaks the platform contract or makes replies harder to route and review.

## Focused checks

Use an injected/stubbed `fetch` or the app's existing provider-client test seam to prove:

- the request is `POST https://api.postmarkapp.com/email`;
- `X-Postmark-Server-Token` comes from the server ENV and never appears in a browser-facing value;
- the body uses the exact task From and inbound ReplyTo values;
- `MessageStream` is exactly `outbound`;
- at least one of `TextBody` or `HtmlBody` is present;
- missing token, network errors, invalid provider responses, and non-2xx responses become the app's safe result/error shape;
- successful Postmark acceptance returns the app's normal success result;
- no SMTP client, account token, direct browser call, or sensitive log is introduced.

If the user explicitly asks for an actual email send, confirm the recipient before sending and use a safe, authorized address. A mocked request-shape proof is the default verification and avoids accidentally sending customer mail.
