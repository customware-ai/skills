# Request errors and batched operations

Read when a changed journey needs faults or explicit wire/operation proof. Use native Playwright and the actual client/server contract. The shared browser observes unexpected errors; its existing `hold`, `expectIssue` and `exchange` are optional conveniences, not app adapters. Use the documented example below; inspect only the relevant implementation when an interface is undocumented or helper behavior is suspect.

## Bind the real action

Register response/request waits before the UI action. Match its method, endpoint/procedure, record and serialized input where needed. Inspect its captured non-sensitive shape once; assert the owning contract explicitly. For batched operations resolve the target slot for **each request**, including retries, and read the same slot in its response. HTTP transport status and operation success are separate.

**Bad:** read body[0] or `.data.json` because an earlier request used it. **Good:** inspect the actual serializer and operation list, derive that request's slot, then assert its actual committed identity/values or error. No fallback parser accepting every guessed shape.

## Positive first, then the owned fault

Prove the real positive behavior before intercepting its request. If a required pending item never loads because no live request exists, report/fix that product behavior; a mock request cannot prove it works.

The following fragment runs inside `withBrowser`, with native Playwright `expect` imported and app-local `dialog`, `pendingCustomer` and `openNotifications` already defined from the observed positive flow. For a **single observed** GET `/api/notifications`, with a rendered Notifications dialog/alert/Retry and a successful response containing an array of `{ customer }` records:

```js
import assert from 'node:assert/strict';
const gate = await kit.hold(request => request.method() === 'GET' &&
  new URL(request.url()).pathname === '/api/notifications');
await openNotifications(); // App-local action using an already observed locator.
const request = await gate.hit;
kit.expectIssue({ label: 'owned notification failure', request });
await gate.fail();
await expect(dialog.getByRole('alert')).toBeVisible();
const [recovered] = await Promise.all([
  kit.page.waitForResponse(response =>
    response.request().method() === 'GET' &&
    new URL(response.url()).pathname === '/api/notifications'),
  dialog.getByRole('button', { name: 'Retry', exact: true }).click()
]);
assert.equal(recovered.status(), 200);
assert.ok((await recovered.json()).some(item => item.customer === pendingCustomer));
await expect(dialog.getByRole('alert')).not.toBeVisible();
await expect(dialog.getByText(pendingCustomer, { exact: true })).toBeVisible();
```

This owns the exact injected Request; unexpected siblings still fail. Keep pending feedback and durable-state assertions for mutations. Do not mock the successful commit whose real behavior you claim to verify.

A mixed-success batch can return HTTP207 with a logical400/404 operation error. Assert that logical envelope; do not register an HTTP-failure expectation for a successful transport. For a natural error whose transport can differ on retry, an app-specific scoped route may forward the actual response unchanged, register `kit.expectIssue` only for a real failed transport before fulfilment, and assert captured bodies in the main check rather than throwing from a route callback. Inspect actual retry requests/slots instead of reusing the first slot.

If injecting one operation error, fetch the actual batch, replace only its intended slot with the protocol-valid error envelope, preserve sibling results and use the protocol's correct transport status. Assert intended error, unaffected siblings and UI recovery. Whole-transport failure affects the whole batch.

**Bad:** globally allow HTTP errors, ERR_ABORTED or console messages to pass. **Good:** excuse only an exact deliberately/naturally failing Request or precisely labeled app-authored error, then assert the rendered failure and recovery. Missing expected errors still fail. Avoid networkidle/fixed sleeps as substitutes for expected operation/UI state; settle required current-document resources before navigation.

Successful `text/event-stream` responses establish long-lived connections, not unfinished finite operations. The helper owns their exact `ERR_ABORTED` outcomes only during its teardown or an awaited `kit.navigate` cutover that commits a different document in the owning main frame (verified by Chromium’s frame and loader identities, not hash/history changes). Unexplained stream failures, failed handshakes, ordinary pending requests and unrelated teardown errors still fail. Explicit failure expectations retain their exact request/count requirements.
