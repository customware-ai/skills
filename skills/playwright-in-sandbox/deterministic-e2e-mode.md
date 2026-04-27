# Deterministic E2E Mode

Use this mode for committed Playwright regression coverage, suite stabilization, flaky-test triage, burn-in, quarantine, and E2E rewrite work.

The job is confidence, not green paint. If the app behavior is wrong, fix the app or data contract. Do not preserve a bug by weakening the test.

## Workflow

1. Start from behavior interactive validation already proved, when available.
2. Translate learned route, readiness, selector, and save-complete contracts into durable tests.
3. Keep each spec focused on one workflow family or coherent user journey.
4. Make each test own its setup or explicitly receive canonical seeded data.
5. Derive expected values from test-owned setup or canonical DB/seed contracts.
6. Validate replacement coverage before deleting or consolidating legacy checks.
7. Map removed scenarios as retained, consolidated, obsolete, or quarantined.

## Waiting And Readiness

- Do not default to `waitForLoadState("networkidle")`.
- For navigation, wait for URL change plus page-ready sentinel, or response contract plus ready sentinel.
- For dialogs, wait for explicit open-state before interaction and close-state before the next dependent step.
- For saves, wait for an observable save-complete contract.
- For async controls, assert what makes the control enabled before clicking it.
- For create/save/send flows followed by reload or navigation, register the response or save-complete wait before the triggering action.
- For overlays, drawers, and command palettes, prove they are closed before interacting with the next surface.
- If actionability fails because another surface owns focus or pointer events, fix readiness instead of adding retries.

## Assertions And Selectors

- Assert behavior, not implementation.
- Prefer web-first assertions over raw DOM reads.
- Use text assertions only when the text itself is the contract.
- Avoid broad page-level text matching when the real contract lives in a card, section, dialog, or row.
- Avoid pixel-perfect layout assertions in blocking E2E unless precise geometry is the product contract.
- Avoid table column ordinals unless column order itself is the contract. Prefer header-derived cells, row-level test ids, accessible names, or product-owned cell test ids.
- Do not make a failing test green by broadening selectors or weakening expectations unless that weaker contract is the intended product behavior.

## Resilient Locator Policy

- Resilience in blocking E2E should come from stable product contracts, not from guessing many possible selectors.
- Prefer adding or using one durable selector over trying `data-testid`, role, text, CSS, and XPath in sequence.
- Fallback locator chains are allowed only when the product intentionally supports multiple equivalent surfaces or labels and the test asserts which path was used.
- If a fallback locator succeeds after the primary locator fails, treat that as a contract signal to investigate, not automatic proof of stability.
- Alternative path testing is valid when the alternative path is user-visible recovery behavior; it should be named as such in the test.
- For dynamic content, prefer web-first assertions. Use `waitForSelector(...)` or `waitForFunction(...)` only when there is no accessible/user-visible locator contract yet, and treat that as a prompt to improve the app contract.
- Prefer `expect(...).toPass(...)` for a narrow action-plus-outcome retry only when the UI has a known hydration or readiness gap that cannot be fixed immediately.
- Avoid custom retry loops around actions in committed E2E unless they are wrapped around a clear user-visible success assertion and capped tightly.

## Hard Bans

- `waitForTimeout(...)` as a stability mechanism
- `force: true` as committed signoff for normal user actions
- default `networkidle` as the main readiness strategy
- `page.evaluate(...)` to assert behavior the UI can expose directly
- giant omnibus specs spanning unrelated workflows
- generic selectors like `button[role="combobox"]` as the primary contract
- silently reusing leftover state from prior tests
- fallback locator or self-healing chains in blocking E2E unless fallback behavior is the explicit product contract

## Burn-In And Repeat Runs

Use repeat runs to classify reliability.

```bash
npx playwright test path/to/spec.ts --workers=1 --retries=0 --repeat-each=10
```

For changed-test burn-in:

```bash
npx playwright test --only-changed=origin/main --workers=1 --retries=0 --repeat-each=25
```

Interpret results:

- fails every repeat: deterministic product, data, setup, scheduler, or obsolete-test contract drift
- passes and fails across repeats: flaky readiness, selector, isolation, or timing debt
- passes every repeat: reasonable confidence for that environment, not permanent immunity

Keep retries disabled during burn-in so every failed attempt is visible. Do not respond to burn-in failures by raising global timeouts or enabling retries.

## Retries

Retries are for resilience and classification. They are not a fix.

- If retries fail with the same business state, classify as deterministic contract drift, not `@flaky`.
- If retries sometimes pass and sometimes fail, classify as flaky debt and harden or quarantine.
- If the suite defaults to retries, still use `PLAYWRIGHT_RETRIES=0` for root-cause work.

## Quarantine With `@flaky`

Quarantine isolates noise; it does not fix tests.

Use `@flaky` only for:

- known intermittent failures
- externally blocked behavior
- infrastructure instability with a follow-up plan

Do not use `@flaky` for deterministic product, data, scheduler, or obsolete-test failures.

A quarantined test must have:

- explicit `@flaky` tag or `test.fixme(...)`
- short reason
- issue, owner, or follow-up reference when the repo supports it
- a plan for how it runs outside blocking CI

Blocking config may exclude `@flaky` with `grepInvert: /@flaky/`. Run quarantined tests intentionally with:

```bash
PLAYWRIGHT_INCLUDE_FLAKY=1 npx playwright test --grep @flaky
```

Remove quarantine as soon as the test is hardened or rewritten.

## Stress And Chaos Diagnostics

Use stress to expose race conditions after a focused test exists.

Optional diagnostics:

- higher worker counts
- CPU throttling
- delayed XHR/fetch
- slower network

Stress failures are investigation signals. Do not bake chaos assumptions into normal blocking E2E unless the repo owns that profile.

If chaos reveals visible-but-not-ready controls, prefer fixing app readiness: disabled controls, pending UI, loading indicators, or explicit save state.

If chaos reveals reload-before-save races, listen for the write before triggering it and await completion before navigation.

## Failure Convergence

When many tests fail:

1. Collapse repeats into unique failing tests.
2. Cluster by root cause:
   - auth/bootstrap
   - stale server or port contention
   - modal/overlay state
   - selector gaps
   - readiness gaps
   - data/setup nondeterminism
   - duplicate accessible names
   - pixel/layout brittleness
   - table ordinal brittleness
   - async write/read races
   - time/scheduler drift
   - obsolete workflow assumptions
3. Fix shared contracts before individual tests.
4. If a spec shape is wrong, rewrite that workflow family instead of patching around it.
5. If a broad repeat run reports many failures, collapse repeats before estimating work.

## Delete Or Rewrite Rule

If a test remains flaky after owned data, web-first assertions, readiness gates, selector cleanup, and trace review, stop patching it.

- Delete and rewrite the test from the user contract.
- Move too-deep calculations, formatting, and table-mapping checks into unit/component/integration coverage when E2E is adding brittleness instead of confidence.
- Preserve the coverage map before deleting legacy checks.

## Rewrite Governance

- Coverage loss must be explicit.
- Every removed legacy assertion must have a mapped replacement or written obsolescence rationale.
- Prefer meaningful consolidation over duplicative green checks.
- Keep formal E2E assets in committed test directories.
- Keep exploratory scripts, screenshots, and trace experiments out of committed test directories.
