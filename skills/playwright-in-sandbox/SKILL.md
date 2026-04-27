---
name: "playwright-in-sandbox"
description: "Primary Playwright governance skill for interactive browser verification, deterministic end-to-end authoring, flaky-test triage, burn-in, quarantine, and sandbox Playwright execution."
---

# Playwright In Sandbox

Use this skill whenever Playwright is used for browser proof, end-to-end authoring, E2E rewrite work, flaky-test triage, burn-in, or full-suite stabilization.

This skill has two intentionally different modes:

1. **Interactive Sandbox Mode**: user-perspective browser verification after a change is plausibly implemented.
2. **Deterministic E2E Mode**: durable regression coverage, suite stabilization, burn-in, quarantine, and rewrite work.

Interactive mode is mandatory for user-facing changes in this repo. It is not replaced by Playwright test-runner guidance. Deterministic E2E mode uses Playwright reliability guidance more directly.

## Which File To Read

- For interactive browser proof, screenshots, hydration checks, visual QA, or final user-flow verification, read [interactive-mode.md](interactive-mode.md).
- For committed E2E tests, full-suite failures, flaky classification, `@flaky`, burn-in, retries, chaos diagnostics, or test rewrites, read [deterministic-e2e-mode.md](deterministic-e2e-mode.md).
- For a task that changes user-facing behavior and needs regression coverage, use both in order: interactive first, deterministic E2E second.

## Core Workflow

1. Decide the mode before using the browser or editing tests.
2. Write a short QA inventory from the user request, visible behavior, and final claims.
3. Use interactive verification to learn the real user contract:
   - route-ready signal
   - data-loaded signal
   - button-enabled condition
   - dialog or overlay open/close condition
   - save/send-complete signal
   - durable selector contract
4. If the changed flow is bug-fix, workflow, business-critical, or regression-prone, convert the learned contract into deterministic E2E coverage.
5. If browser proof shows product behavior is wrong, fix the product or data contract. Do not weaken the test to match a bug.
6. Before signoff, call out any skipped, quarantined, consolidated, or retired coverage.

## Common Rules

- Use the repo's canonical E2E database contract. Do not silently fall back to a normal app database.
- Prefer querying canonical seed data or the E2E DB to derive expected values, statuses, assignments, and aggregates.
- Prefer selectors in this order:
  1. owned `data-testid`, `data-*`, stable id, or explicit semantic contract
  2. accessible role plus stable accessible name
  3. label/control association
  4. stable URL, pathname, or query contract
  5. text-only selectors only when the text itself is the product contract
  6. CSS, XPath, or DOM order only for deliberate structure checks
- Prefer Playwright web-first assertions: `toBeVisible`, `toHaveText`, `toHaveValue`, `toBeEnabled`, `not.toBeVisible`.
- If a value cannot be asserted with a web-first assertion, use `expect.poll(...)` or a narrow `expect(...).toPass(...)` with a clear success condition.
- Never use `waitForTimeout(...)` as a stability fix.
- Use `force: true` only for diagnosis, never as final signoff.
- Retries are detection and CI resilience, not repair. A retry-only pass is flaky debt.
- Do not add broad fallback/self-healing locator chains to blocking E2E tests unless fallback behavior is the explicit product contract.
- Remove stale screenshots, traces, and temporary artifacts from failed or superseded runs before signoff.

## Shared Sandbox Contract

- Prefer `127.0.0.1` over `localhost` unless the repo says otherwise.
- Use the repo's explicit server contract first. If absent, `4444` is the common sandbox default.
- In sandbox environments, Playwright browsers may live under `/ms-playwright`; do not assume the default cache path.
- In sandbox environments, launch Chromium headless unless the task explicitly requires headed inspection.
- Confirm browser payload when needed:

```bash
echo "$PLAYWRIGHT_BROWSERS_PATH"
ls -al /ms-playwright
```

- Before `page.goto(...)`, verify the target port is listening and the app responds.
- Keep interactive artifacts separate from committed E2E assets.
- When running parallel validation, isolate port, database or seed state, output folder, screenshots, and traces.

## Full-Suite Closed Loop

When a broad Playwright suite fails, do not patch failures one by one by default.

1. Collapse repeats into unique failing tests.
2. Classify each unique failure:
   - deterministic product/data/setup contract drift
   - obsolete test contract
   - intermittent readiness/selector/isolation flake
   - time/scheduler/external dependency issue
   - too-deep E2E assertion better suited to lower-level tests
3. Fix deterministic and shared root causes before true flakes.
4. Run targeted validation with retries disabled.
5. Burn in the fixed spec with retries disabled.
6. Rerun the blocking suite.
7. Feed each new failure pattern back into the relevant mode file.

Use this default targeted loop:

```bash
PLAYWRIGHT_RETRIES=0 npx playwright test tests/e2e/path/spec.ts --workers=1
PLAYWRIGHT_RETRIES=0 npx playwright test tests/e2e/path/spec.ts --workers=1 --repeat-each=10
```

Use suite retries only after failures have been classified, or in CI to keep signal visible while Playwright marks intermittent tests as flaky.

## Dev Server

For local web debugging, keep the app running in a persistent TTY session. Do not rely on one-shot background commands from a short-lived shell.

Use the repo's documented startup flow first. If there is no explicit contract:

```bash
npm run build
PORT=4444 npm run start
```

Stop server processes you started when verification is complete.

