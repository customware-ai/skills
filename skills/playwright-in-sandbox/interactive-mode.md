# Interactive Sandbox Mode

Use this mode for required user-perspective browser verification after implementation is plausibly correct.

Interactive mode is not a replacement for committed E2E tests, and committed E2E tests are not a replacement for interactive proof. Interactive answers: "does this actually work and look right for a user right now?"

## QA Inventory

Build the inventory from:

- the user's requested behavior
- the visible behavior changed by the implementation
- the claims you expect to make in the final response

Check every meaningful control, state change, mode switch, and final visual claim. Include at least two off-happy-path probes when the flow is interactive.

## Reliability Rules

- Verify hydration through real interaction. If a visible control does nothing, fix readiness or wait for an explicit app-ready signal.
- Do not use `force: true` as signoff.
- Do not use `waitForTimeout(...)` as proof of readiness.
- For async writes followed by navigation, reload, or reading another page, start listening before acting:
  - `page.waitForResponse(...)`
  - save-complete assertion
  - route-ready assertion
- Await completion before moving to the dependent step.
- Exploratory fallback locators are allowed while learning the page, but record the single durable selector or visible contract that deterministic E2E should use.
- If a modal, drawer, popover, command palette, or toast can block input, prove it is closed before the next action.

## Fallbacks During Exploration

- Fallback locators are acceptable while discovering a page or recovering an interactive verification session.
- If one fallback works, write down why it worked and whether it represents a real user contract.
- Do not let an exploratory fallback become silent proof that the product is stable.
- Alternative navigation paths are acceptable when verifying user recovery, but the final claim must say which path was proven.
- If fallback discovery shows the app lacks a durable selector or accessible name, prefer improving the app contract before writing blocking E2E.

## Desktop Verification Script

Set `TARGET_URL` to the app being verified. Prefer `127.0.0.1`.

```javascript
import { chromium } from "playwright";

const TARGET_URL = "http://127.0.0.1:4444";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
});
const page = await context.newPage();

try {
  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });
  console.log("Loaded:", await page.title());

  // Add the task-specific interactions and assertions here.

  await page.screenshot({ path: "playwright-desktop.png", type: "png" });
} finally {
  await context.close().catch(() => {});
  await browser.close().catch(() => {});
}
```

## Mobile Verification Script

Use a separate mobile pass when layout, touch behavior, or responsive navigation is affected.

```javascript
import { chromium } from "playwright";

const TARGET_URL = "http://127.0.0.1:4444";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

try {
  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });
  console.log("Loaded mobile:", await page.title());

  // Add the task-specific interactions and assertions here.

  await page.screenshot({ path: "playwright-mobile.png", type: "png" });
} finally {
  await context.close().catch(() => {});
  await browser.close().catch(() => {});
}
```

## Functional QA

- Use normal user input APIs for signoff: click, fill, press, keyboard, mouse, touch.
- Confirm visible outcomes, not just internal state.
- Cover obvious visible controls before signoff, not only the happy path.
- `page.evaluate(...)` may inspect or stage state, but it does not count as user-input signoff.
- Rerun from a clean process after code changes.

## Visual QA

- Inspect the initial viewport before scrolling.
- Inspect the densest realistic state reached by the flow.
- Look for clipping, overflow, distortion, weak contrast, broken layering, stale overlays, awkward motion, and responsive breakage.
- Screenshot review is part of the contract. Do not sign off from DOM assertions alone.

## Interactive Signoff

Before final response, confirm:

- the functional path passed with normal user input
- the visual pass covered the relevant interface
- final screenshots match the claims
- blockers, overlays, and pending states are resolved
- durable selectors and readiness gates are recorded for E2E authoring when needed
- stale artifacts from failed iterations are removed
