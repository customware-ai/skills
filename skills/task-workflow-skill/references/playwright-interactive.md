# Interactive Playwright Verification

Use this reference in Phase 5.

`Playwright` means standalone Node.js scripts that open the local app, drive the browser with real input, and save screenshots. It does not mean the repo's normal E2E test suite.

## Rules

- Run Phase 5 scripts through `task-workflow/scripts/playwright-lifecycle.mjs` unless the repo's Playwright `webServer` fully owns startup, readiness, and cleanup.
- Pass the repo's normal local command to the lifecycle helper with `--server`.
- Do not manually combine server cleanup, server start, sleeps, DB cleanup, and script execution in one shell command.
- Do not run `playwright install` or any browser download command. The lifecycle helper sets `PLAYWRIGHT_BROWSERS_PATH=/ms-playwright` when the cache exists and fails early on a revision mismatch.
- Prefer `127.0.0.1` over `localhost`.
- Write scripts under `task-workflow/playwright/`.
- Save screenshots under `task-workflow/screenshots/`.
- Run scripts from clean Node.js processes after each meaningful fix.
- Use normal input APIs such as `click`, `fill`, `press`, `selectOption`, and route navigation.
- Do not use screenshots alone as proof when a visible control needs interaction proof.
- Do not use `page.evaluate(...)` as a substitute for normal user interaction unless inspecting state that cannot be observed otherwise.

## Lifecycle Helper Pattern

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
	--server "pnpm run dev -- --host 127.0.0.1 --port 4444" \
	--ready-url "http://127.0.0.1:4444" \
	--run "node task-workflow/playwright/verify-main-flow.mjs" \
	--command-timeout-ms 300000
```

The helper writes server and command logs under `task-workflow/runtime/`. Cite those paths in the Phase 5 artifact when output is too long to paste directly.

## Minimal Script Pattern

```js
import { chromium } from 'playwright';

const targetUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:4444';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
	viewport: { width: 1440, height: 960 }
});
const page = await context.newPage();

try {
	await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
	await page.screenshot({ path: 'task-workflow/screenshots/home-desktop.png', type: 'png' });
} finally {
	await context.close().catch(() => {});
	await browser.close().catch(() => {});
}
```

## Mobile Pattern

```js
const context = await browser.newContext({
	viewport: { width: 390, height: 844 },
	isMobile: true,
	hasTouch: true
});
```

## Required Coverage

Cover all routes, states, and interactions touched or implied by the task:

- primary navigation
- create/edit/delete flows
- save/cancel flows
- forms and validation
- menus, dialogs, drawers, tabs, and filters
- table/list row actions
- loading, empty, error, and success states when relevant
- mobile behavior when the task changes UI

## What Does Not Count

- opening the app without interacting
- taking only one screenshot
- relying on stale browser state
- relying only on unit/E2E test runner output
- recording paths that do not exist
- ignoring console/runtime errors discovered during verification
