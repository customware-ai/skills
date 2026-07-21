# Inbound Email

<contract>

Implement development inbound email through exactly `POST /api/email/inbound`. Postmark calls this route directly at the current sandbox URL. The route is a durable receipt boundary, not a synchronous business workflow.

</contract>

## Route and response contract

Register the route before static-file serving and the client-side SPA fallback. A catch-all or static handler must never turn the webhook into HTML or a client route.

| Condition | Response |
| --- | --- |
| New valid delivery durably accepted | `200` |
| Duplicate valid `MessageID` | `200` |
| Missing, malformed, or failed Basic Auth | `401` |
| Malformed JSON, non-object JSON, missing `MessageID`, or empty `MessageID` | `400` |
| Missing/empty server configuration or persistence failure | `500` |
| Any other application failure | `500` through the app's safe error boundary |

Never return `403`. Postmark treats it as a permanent rejection and the message can be lost. Keep response bodies small and generic; they do not need to echo provider or email content.

## Authentication

<authentication>

Use HTTP Basic Auth with username `customware` and password `POSTMARK_INBOUND_WEBHOOK_SECRET`.

</authentication>

Perform checks in this order:

1. Read and validate the secret as a non-empty server value. A missing value is a server fault (`500`), not a bad customer request.
2. Require an `Authorization` header with the `Basic` scheme.
3. Decode Base64 credentials and split at the first colon. The password may contain colons.
4. Compare the username and password together without revealing which part failed. Use a constant-time primitive when the runtime provides one, and make the comparison length-safe by comparing equal-length buffers or fixed-length digests.
5. Return the same minimal `401` for missing, malformed, or incorrect credentials.

Do not log the header, decoded value, username/password pair, secret, or comparison result. Do not accept a bearer token, query parameter, custom header, or browser session as a substitute for the fixed Basic Auth contract.

## Validate and capture the delivery

Capture the request body exactly once as raw text. Parse that captured string for validation, but never stringify the parsed value back before storing it.

The minimum accepted shape is a non-null, non-array JSON object with a non-empty string `MessageID`:

```ts
const rawBody = await request.text();
let payload: unknown;

try {
  payload = JSON.parse(rawBody);
} catch {
  return jsonError("Invalid inbound email payload.", 400);
}

const parsed = inboundPayloadSchema.safeParse(payload);
if (!parsed.success) {
  return jsonError("Invalid inbound email payload.", 400);
}
```

The schema should allow the other Postmark fields needed by the app's processing behavior without inventing a second copy of the provider contract. Preserve the complete raw body even when the app only consumes a subset of fields; future processing and forensic recovery need the original delivery.

## Durable receipt and deduplication

Add a normal repository migration for one durable inbox row per Postmark `MessageID`. Keep the row focused:

| Field | Requirement |
| --- | --- |
| `messageId` | Non-empty and unique in the database. |
| `rawBody` | Exact captured request-body string. |
| `status` | At least `pending`, `processing`, `completed`, and `failed` or the app's equivalent. |
| claim/retry data | The minimum lease, attempt count, error category, and timestamps needed for restart recovery. |
| timestamps | Created, updated, claimed, completed/failed values following the app's conventions. |

Use the database's unique constraint with an insert conflict-ignore/upsert primitive. The insert result distinguishes an accepted delivery from a duplicate:

```text
authenticate → read raw body → parse/validate → insert with unique MessageID
                                      ├─ inserted  → wake durable processor → 200
                                      └─ conflict  → do not schedule again  → 200
```

A read-then-insert check is not sufficient: two Postmark retries can arrive concurrently. Do not schedule task-specific processing before the receipt is durably accepted.

## Recoverable processing

After the route acknowledges the durable receipt, process the row through the app's existing worker/job pattern. If the app has no worker, implement the smallest DB-backed claim-and-drain loop that fits its conventions:

1. Claim one `pending` row atomically, or reclaim a stale `processing` lease.
2. Mark the claim and attempt before performing app work.
3. Process the message from the stored row, not from a one-shot request callback.
4. Mark `completed` on success.
5. Mark `failed` or return it to `pending` with bounded retry metadata on failure.
6. Recover pending and stale claims during startup or the app's established worker lifecycle.

An immediate wake-up after insertion is useful for latency, but it is only an optimization. The database row must remain sufficient to recover work after a process restart. Keep failure details free of raw payload, addresses, subjects, bodies, headers, attachment names, and attachment content.

<result_boundary>

If the repository uses `ResultAsync`, `await` the claim call and branch on the returned `Result` before touching the row. Access the claimed row through `.value` only after `isErr()` has been ruled out, then compare that row to `null`:

```ts
const claimResult = await claimNextInboundReceipt();
if (claimResult.isErr()) return err(claimResult.error);
const row = claimResult.value;
if (row === null) break;
await processOneInboundReceipt(row.id);
```

Never compare the `Result` wrapper to `null` or read row fields directly from it. Keep the loop's sentinel as the unwrapped row. Preserve the target repository's existing result contract instead of introducing a second wrapper.

</result_boundary>

<app_behavior>

The Builder task defines what the accepted email means in this application. Adapt the processor to the app's existing customer, ticket, order, notification, or workflow model. Do not invent a general mailbox UI or a second domain model when the task only requests a focused integration.

</app_behavior>

## Hono route shape

Adapt the names to the inspected app, but preserve the order and result boundary:

```ts
app.post("/api/email/inbound", async (c) => {
  const authResult = authenticateInbound(c.req.header("Authorization"));
  if (authResult.isErr()) return c.json({ error: "Unauthorized" }, 401);

  const rawBody = await c.req.text();
  const payload = parseInboundPayload(rawBody);
  if (payload.isErr()) return c.json({ error: "Invalid payload" }, 400);

  const receipt = await acceptInboundReceipt({
    messageId: payload.value.MessageID,
    rawBody,
  });
  if (receipt.isErr()) return c.json({ error: "Inbound email unavailable" }, 500);

  if (receipt.value.accepted) {
    wakeInboundProcessor();
  }

  return c.json({ ok: true }, 200);
});
```

Do not copy this snippet mechanically if the app uses another result/router shape. The important properties are configuration/authentication first, one raw-body read, schema validation, atomic durable receipt, and 200 only after persistence.

## Required focused checks

Prove at least these cases with the repository's existing test harness:

- missing or empty `POSTMARK_INBOUND_WEBHOOK_SECRET` returns `500`;
- missing, malformed, and incorrect Basic Auth all return `401` with the same safe response;
- valid authentication accepts a delivery;
- malformed JSON, primitive/array JSON, missing `MessageID`, and empty `MessageID` return `400`;
- the exact raw string is stored byte-for-byte at the application string boundary;
- duplicate `MessageID` returns `200`, creates one row, and schedules one processing unit;
- concurrent duplicate delivery exercises the real database uniqueness constraint;
- persistence failure returns `500` rather than acknowledging;
- route order beats static serving and SPA fallback;
- pending and stale-processing work recover after restart or worker recreation;
- logs do not contain representative credentials or email content.

Keep the tests focused on the contract and the task's processing behavior. Reuse existing fixtures and migrations; do not create a parallel database just for email.
