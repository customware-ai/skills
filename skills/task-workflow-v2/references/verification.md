# Running agent-owned Playwright checks

## Environment, not application logic

Run from the target repository root. Use the installed `scripts/verify.mjs` to own setup/server readiness, commands, logs and cleanup; use `scripts/browser.mjs` for an observed browser and error reporting. Inspect `--help` once when the invocation is unknown. Read a relevant helper implementation section only for an undocumented interface or evidence of a helper defect, not before every ordinary check. Use existing dependencies/browser cache; do not silently install prerequisites.

```sh
node .agents/skills/task-workflow/scripts/verify.mjs --run 'node task-workflow/verify-change.mjs'
```

For a temporary server add the actual isolated `--setup`, `--server`, `--ready-url` and required `--env` options. A native test owning its server runs without a second `--server`. The runner does not build, establish storage isolation or update checkpoints. Temporary checks/data/artifacts belong under repository-root `task-workflow/`. Follow environment-specific launcher instructions outside this skill.

`withBrowser(check, { url })` enters once before the callback. Use `{ url: null }` when routes must be installed before entering, then navigate once yourself. Do not repeat initial navigation or manually close the browser inside the callback. `TW_BROWSER_KIT`, `TW_RUN_DIR` and server-mode `TARGET_URL` are supplied by the runner.

Await `kit.navigate(() => page.reload(...))` or `kit.navigate(() => page.goto(observedUrl, ...))` for document replacement. It settles finite requests and owns cancellation of the old document’s acknowledged realtime streams only after Chromium confirms a different main-frame document. Hash changes and same-document history navigation do not grant cancellation ownership. `kit.settle()` also settles finite work without requiring a healthy stream to end. Assert streamed business results through the UI; response headers alone do not prove them. Normal helper teardown owns its stream cancellations. Do not close the browser yourself, globally excuse aborted requests, or change application code to satisfy checker cleanup.

## Worked journey: observe → act → prove → extend

You write the check with native Playwright. First inspect the owning requirements/source and the relevant actual screen. For example:

```js
console.log(await page.locator('main').ariaSnapshot());
```

Suppose this prints a link named `Start new quote` and a textbox named `Customer` in the new-quote form. Use those observed names; don't paste decorative glyphs or nested field descriptions from raw DOM text. Scope repeated names to their actual region/dialog/record and assert uniqueness rather than using `.first()` to hide ambiguity.

These fragments assume the **observed** fixture has a Freight spinbutton, Save button and Saved quote region. The inspected contract says input dollars serialize as integer cents and the POST `/api/quotes` response contains `{ id, freightCents }`; GET `/api/quotes/<id>` reloads that stored shape. They are not universal selectors or transport adapters:

```js
import assert from 'node:assert/strict';
import { expect } from '@playwright/test';
const { withBrowser } = await import(process.env.TW_BROWSER_KIT);

await withBrowser(async (kit) => {
  const { page } = kit;
  // From the real screen; requirements determine values, not this observation.
  const freight = page.getByRole('spinbutton', { name: 'Freight', exact: true });
  await expect(freight).toHaveCount(1);
  await freight.fill('1234.56');
  const [response] = await Promise.all([
    page.waitForResponse(response =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/api/quotes' &&
      response.request().postDataJSON().freightCents === 123456),
    page.getByRole('button', { name: 'Save', exact: true }).click()
  ]);
  assert.equal(response.status(), 200);
  const committed = await response.json();
  assert.equal(committed.freightCents, 123456);
  const summary = page.getByRole('region', { name: 'Saved quote', exact: true });
  await expect(summary).toHaveAttribute('data-record-id', String(committed.id));
  await expect(summary.getByText('$1,234.56', { exact: true })).toBeVisible();
  // Settle the current document before replacing it, not after aborting its resources.
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const [reloadedResponse] = await Promise.all([
    page.waitForResponse(response =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname === '/api/quotes/' + committed.id),
    kit.navigate(() => page.reload({ waitUntil: 'load' }))
  ]);
  assert.equal(reloadedResponse.status(), 200);
  const stored = await reloadedResponse.json();
  assert.equal(stored.id, committed.id);
  assert.equal(stored.freightCents, 123456);
  await expect(summary).toHaveAttribute('data-record-id', String(committed.id));
  await expect(summary.getByText('$1,234.56', { exact: true })).toBeVisible();
});
```

Retain the committed identity for reopen/Back/list checks when those consumers are affected. Observe the next screen, add its next meaningful action/assertion, run, and continue. If source/build changes, refresh the connected earlier segments. API calls or seeded fixtures cannot substitute for performing a claimed UI action.

**Bad:** a guessed label fails; add a heading wait and replay every journey. **Good:** print the failed region's `ariaSnapshot`, inspect both matching nodes/current stage, fix its selector/precondition once and rerun the owning scenario. Expected business values still come from requirements; an observed disagreement is a finding, not a new expected value.

**Bad:** wait for a Save request after clicking unchanged values; silently accept no request. **Good:** choose a real change when verifying a mutation and await that action's actual commit. Test an intentional no-op separately if relevant.

## Pixels and output

Use native `page.screenshot({ path, fullPage: true })` within `TW_RUN_DIR` when below-fold content matters; use viewport screenshots for actual viewport/mobile clipping. Open the returned files with the available image-viewing tool, including relevant scrolled panels—not just document width. Do not invent OCR/pixel-grid tooling as a substitute for viewing an image. If visual access is genuinely unavailable, report that proof unfinished rather than claiming it from statistics. For print/export trigger the real application action, capture the actual resulting document, then inspect every page's pixels and values. If the file-reading tool exposes only PDF text, render pages with an existing available tool and view those images. A full-page print-media PNG supplements, not replaces, PDF page/pagination proof. Do not add a rendering dependency silently. Compare pixels with the requested/approved design; pagination whitespace alone does not establish a defect. Separate observations or preferences from proven requirement violations.

**Bad:** stub `window.print`, save one viewport PNG and call the output correct. **Good:** exercise Print, generate/inspect the actual PDF pages, check margins/legibility/background/last content against the intended design, and distinguish headless PDF proof from an untested native OS printer.

Unexpected browser/server errors still fail. Read unique result.json/logs and inspect any failure-time screen yourself; the shared helper does not choose selectors or turn findings into acceptance.
