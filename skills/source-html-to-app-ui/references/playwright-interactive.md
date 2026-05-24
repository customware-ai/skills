# Interactive Playwright

Use this reference whenever this skill says `Playwright`.

In this skill, `Playwright` means standalone interactive Node.js Playwright scripts that directly open the source HTML app or the built target app, drive the browser with real input, and save screenshot artifacts. It does not mean the repo's normal Playwright end-to-end test suite.

## Scope

There are two Playwright modes in this skill:

- `Source interactive Playwright`: open the provided source HTML app, navigate it, reveal routes and states, and save source evidence under `mocks/source/`.
- `Target interactive Playwright`: open the built target app, replay matching routes and states, and save verification evidence under `mocks/verification/`.

Use the same operational model for both:

- one-off Node.js scripts
- headless Chromium
- real user input through Playwright APIs
- clean reruns from fresh Node.js processes

## Environment Assumptions

- Playwright browsers are preinstalled under `/ms-playwright`.
- `PLAYWRIGHT_BROWSERS_PATH` may already point there.
- Do not assume `~/.cache/ms-playwright`.
- In this sandbox, prefer headless mode.

If needed, verify the browser payload with:

```bash
echo "$PLAYWRIGHT_BROWSERS_PATH"
ls -al /ms-playwright
```

## Script Pattern

Write dedicated scripts for the exact session you need.

- Keep source discovery scripts separate from target verification scripts.
- Keep desktop and mobile as separate scripts or separate invocations when that is clearer.
- Rerun from a clean Node.js process after any meaningful change.
- Do not rely on a test runner harness for this skill.

Base pattern:

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 }
});
const page = await context.newPage();

try {
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  // Drive the page with normal Playwright input APIs.
  // Save the exact artifacts this phase needs.

  await page.screenshot({ path: OUTPUT_PATH, type: 'png' });
} finally {
  await context.close().catch(() => {});
  await browser.close().catch(() => {});
}
```

Mobile pattern:

```javascript
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true
});
```

## Source Interactive Playwright

Use this in Phase 1.

- Open the source HTML app directly when possible.
- If direct file loading breaks navigation or assets, serve it locally with the minimum setup needed to make the app behave correctly.
- Save screenshots into `mocks/source/`.
- Capture:
  - desktop route/state screenshots
  - mobile route/state screenshots
  - focused section crops when needed

The first required action of implementation work is this source discovery session. Do not edit target UI files before source screenshots exist.

## Target Interactive Playwright

Use this in Phase 5 and Phase 6.

- Start the built target app normally.
- Prefer `127.0.0.1` over `localhost`.
- Use port `4444` when you need a local verification server.
- Save screenshots into `mocks/verification/`.
- Capture:
  - route/state screenshots
  - focused section evidence
  - final desktop and mobile screenshots
  - functional proof screenshots for interaction families

## Artifact Discipline

- Use viewport screenshots by default.
- Use focused crops for dense sections, dialogs, drawers, menus, tables, or other areas that need section-level grading.
- Keep only the final successful evidence as the authoritative artifact set.
- Make sure the screenshot paths cited in `design/*.md` actually exist.

Example crop:

```javascript
const clip = await page.locator('[data-testid=\"target\"]').boundingBox();
if (clip) {
  await page.screenshot({ path: 'focused.png', type: 'png', clip });
}
```

## What Does Not Count

These do not satisfy the Playwright requirement of this skill:

- reading the source HTML without running interactive browser scripts
- using the repo's normal Playwright E2E tests instead of standalone scripts
- taking one screenshot without navigating routes or states
- preserving stale browser state instead of rerunning from a clean process
- relying on `page.evaluate(...)` instead of normal input for visible interaction proof
