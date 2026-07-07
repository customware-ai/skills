# Verification And Signoff

Use this reference for Phase 5, Phase 6, and Phase 7.

These phases prove the implementation through real browser interaction, durable regression coverage, and final artifact audit. They are internal verification gates, not user confirmation points.

This is a looped gate workstream: Phase 5, Phase 6, and Phase 7 are not complete until their artifacts pass their gates. A failing score, missing evidence, browser issue, weak test, stale gap, placeholder row, or incomplete final audit means stay in or return to the failing phase, repair the work, update the artifact, rescore, and repeat. Do not stop or ask the user to continue when a local repair is available.

## Verification Authority

Verification authority is:

1. the task body
2. Phase 1 implementation and verification plan
3. changed files and behavior from Phase 2 and Phase 3
4. Phase 4 integrity results
5. real browser behavior observed through standalone Playwright scripts
6. repo tests or E2E tests that protect the changed behavior

Static checks, builds, and tests are not substitutes for interactive Playwright verification.
Interactive Playwright verification is not a substitute for regression tests.

## Open Gaps Reconciliation

`task-workflow/open-gaps.md` is a gate artifact during verification.

- Phase 5 must resolve or update gaps about browser/runtime/manual verification.
- Phase 6 must resolve or update gaps about E2E, unit, integration, or coverage proof.
- Phase 7 must compare `open-gaps.md` against Phase 5 and Phase 6 artifacts. If a phase says a gap was fixed but `open-gaps.md` still lists it as `Open`, Phase 7 fails.
- Critical gaps must be `Resolved`, `Closed`, or explicitly reclassified with evidence before signoff. They cannot remain `Open`.
- Template placeholder rows such as `Pending | Pending | Pending` are not clean ledger evidence. Replace them with real gap rows or explicit `None currently recorded` rows before any verification gate passes.

## Progress Ledger Reconciliation

`task-workflow/progress.md` must stay current through verification and signoff.

- Read it after compaction before choosing the next verification action.
- Update it after each Phase 5 browser issue/fix/rerun, Phase 6 test coverage decision or test run, Phase 7 audit result, blocker, gate pass/fail, and promotion.
- It must summarize latest browser evidence, test evidence, fixed-wait review state, open gaps, current phase, earliest failing phase, and next local action.
- Its Current Phase Pointers must identify the current phase artifact, current reference, next local action, and only high-signal active files needed to resume immediately.
- Its Artifact Pointers must point to the phase-owned artifacts where Playwright scripts, screenshots, runtime logs, E2E/test files, and verification repair details live.
- Phase 7 cannot pass if `progress.md` says any phase remains pending, in progress, failing, or locally repairable.

## Verification Quality Discipline

Interactive scripts and E2E tests must wait on user-visible state or app signals.

- Prefer role/text locators, URL assertions, network-visible state, persisted data checks, and `expect` retries.
- Do not use fixed waits such as `waitForTimeout`, `setTimeout`, or `sleep(...)` in `task-workflow/playwright` or `tests/e2e`.
- Do not use fixed waits as "stabilization", "mutation timing", "dialog close", "navigation timing", "screenshot timing", "animation timing", or "followed by assertion" helpers. These labels do not make a fixed wait acceptable.
- Phase 5 and Phase 6 must inspect their interactive scripts and E2E tests before scoring the gate.
- Record the files inspected and whether they contain any fixed waits.
- If any fixed wait is present, the phase fails. Remove every fixed wait, replace it with a deterministic Playwright wait/assertion, rerun the affected script/test, and review the files again before passing.
- Remove debug-only Playwright scripts or include them in the fixed-wait review. Debug scripts under `task-workflow/playwright` are part of the verification surface.
- A click, form submit, fill action, mutation trigger, screenshot timing note, or "dialog animation" note is not assertion/state-wait evidence.
- Acceptable proof must cite a concrete post-action wait/assertion such as `locator.waitFor(...)`, `expect(locator).toBeVisible()`, `expect(locator).toContainText(...)`, `waitForURL(...)`, `waitForResponse(...)`, or a persisted-state assertion.
- The review is zero-tolerance: Phase 5, Phase 6, and Phase 7 pass only when the artifact states that inspected verification files contain no fixed waits and cites deterministic waits/assertions used instead.

## Server And Command Discipline

Verification phases must not stall on foreground servers or watchers.

- Default to `task-workflow/scripts/playwright-lifecycle.mjs` for Playwright scripts, browser probes, app-server startup, readiness, Playwright browser preflight, bounded command execution, output capture, and cleanup.
- The first Phase 5 browser command or Phase 6 Playwright/E2E command that needs a running app must establish lifecycle ownership before the browser/test runs. Do not point a script at an assumed existing `127.0.0.1` server first and then treat `fetch failed`, redirects, not-found data, stale DB state, stale build output, or wrong-port behavior as evidence for manual server management.
- In Phase 6, existing repo E2E tests still run through the helper by default: put `pnpm exec playwright test ...` inside the helper's `--run` while the helper owns setup, server startup, readiness, browser preflight, output capture, and cleanup.
- Use native Playwright with repo `webServer` ownership only when the helper cannot own the server for that exact command, such as a repo config that cannot target an already-running helper server and cannot have `webServer` bypassed for the selected spec. Record that reason before running the native command. A repo merely having a Playwright config, `webServer`, global setup, or existing E2E file is not enough.
- The helper runs each `--setup` command before server startup with bounded timeout and `task-workflow/runtime/setup-*.log`, starts the app server in the background, records `task-workflow/runtime/server.pid`, writes `task-workflow/runtime/server.log`, polls the supplied readiness URL, runs each `--run` command with bounded timeout and `task-workflow/runtime/run-*.log`, and stops the server process group after the run unless `--keep-server` is explicitly used and justified.
- Do not assume a backgrounded process started successfully just because the command returned. A server is ready only after the helper records a successful readiness result.
- Do not compose manual server cleanup, fixed sleep, DB-delete, server-start, and Playwright command chains in Phase 5 or Phase 6. Put pre-server setup such as DB reset, migration, seed, or test fixture preparation into lifecycle `--setup "..."` for helper-owned runs. If cleanup is needed, do it as a separate recorded recovery step before the helper run, then run the helper alone. If the helper times out or produces no useful output, treat that as lifecycle/setup evidence, inspect `task-workflow/runtime/server.log`, `task-workflow/runtime/setup-*.log`, readiness output, and `task-workflow/runtime/run-*.log`, then change the setup, server command, ready URL, test command, fixture, or diagnostic before rerunning. If the helper fails once or twice with a diagnosed lifecycle/tooling issue after a corrected invocation, record the helper logs and switch to the smallest fallback that can prove the task: repo Playwright `webServer`, explicit PID/port cleanup, or manual server management with captured PID/log/readiness/cleanup evidence.
- Do not run `playwright install`, `playwright install chromium`, or equivalent browser downloads during task verification. The helper sets `PLAYWRIGHT_BROWSERS_PATH=/ms-playwright` when present and fails early when the project Playwright version does not match the sandbox browser cache.
- Do not leave `pnpm dev`, `npm run dev`, `vite`, `next dev`, test watchers, or similar long-lived commands as the active foreground tool call.
- If the server or test command hangs, stop it, capture the log/error evidence, update the current phase artifact or `open-gaps.md`, and continue with the smallest local recovery path.
- If the server appears stale, wrong, or on the wrong port, diagnose through the lifecycle owner: helper runtime logs/readiness first, then repo Playwright `webServer` output/config only for commands where `webServer` owns lifecycle. If a build or DB fixture changed, restart by rerunning the lifecycle owner with the corrected `--setup` or server command. Do not switch to broad process cleanup unless PID/port cleanup is impossible and the artifact records the recovery reason.
- If manual fallback is genuinely needed, keep ownership explicit: write the PID/log path under `task-workflow/runtime/`, prove readiness with a bounded check, and clean up the captured PID/process group. Do not use `nohup`, `disown`, or a background server without PID/readiness evidence as the normal fallback.
- Bash readiness polling inside the lifecycle helper is acceptable. The fixed-wait ban applies to Playwright scripts and E2E tests under `task-workflow/playwright` or `tests/e2e`, not the helper's bounded readiness loop.

## Playwright Failure Triage

When a Phase 5 script or Phase 6 targeted spec fails, diagnose the failure type before rerunning.

- If a selector/action/assertion times out, first prove the page is in the expected state: URL, no not-found/error screen, required DB or fixture record exists, server log has no route/runtime error, and browser console has no fatal error. Do not rerun the same script while the page state is wrong; fix setup, seed, route, or app state first.
- If the helper times out, exits with no useful output, or appears hung, inspect helper setup/server/run logs and readiness evidence before rerunning. The next run must change setup, server command, ready URL, test command, fixture, timeout reason, or diagnostic output.
- If the page state is correct and the assertion is valid, fix implementation or test code, then rerun the smallest affected script/spec.
- Timeout increases are not a retry strategy. Start with the smallest practical timeout: `15000`-`20000` ms for Phase 5 launch/page-state/custom-script probes and up to `30000` ms for first-run Phase 6 targeted E2E where Playwright runner startup adds overhead. If the run fails with any useful error, assertion output, not-found state, console/runtime error, route error, fixture/DB miss, or helper diagnostic, use that evidence to diagnose; do not retry with a larger timeout. A larger timeout is allowed only when the first run ended only because the timer expired with no useful response or explanation, and only after helper logs, readiness, URL, not-found/error state, required DB/fixture records, server runtime logs, browser console, and network/page state prove the app and test are in the correct state to run. Only then may one rerun use `60000` ms, and never more than `120000` ms for one targeted script/spec. If a single targeted run needs more than two minutes, split the verifier or diagnose lifecycle, setup, fixture, page-state, console, network, or test-design failure instead of increasing the timeout.

Example helper shape:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --setup "pnpm run db:migrate" \
  --server "pnpm run dev -- --host 127.0.0.1 --port 4444" \
  --ready-url "http://127.0.0.1:4444" \
  --run "node task-workflow/playwright/verify-main-flow.mjs" \
  --command-timeout-ms 20000
```

For E2E:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --setup "pnpm run db:migrate" \
  --server "pnpm run dev -- --host 127.0.0.1 --port 4444" \
  --ready-url "http://127.0.0.1:4444" \
  --run "pnpm exec playwright test tests/e2e/changed-flow.spec.ts --reporter=line" \
  --command-timeout-ms 30000
```
## Phase 5: Interactive Playwright Verification

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-5-playwright-verification`.
2. Read `references/playwright-interactive.md`.
3. Confirm `task-workflow/scripts/playwright-lifecycle.mjs` exists and is readable.
4. Write standalone Playwright scripts under `task-workflow/playwright/`.
5. Run the scripts through `task-workflow/scripts/playwright-lifecycle.mjs` with the repo's normal local app command, a readiness URL, bounded command timeout, and runtime logs.
6. Drive the app through real user interactions.
7. Verify primary routes, forms, buttons, menus, dialogs, tables, navigation, save flows, and error states touched or implied by the task.
8. Exercise bad cases and non-ideal user behavior: invalid submissions, empty states, cancel/close paths, repeated clicks where relevant, out-of-order actions, navigating away/back, and nearby controls a real user could click while using the feature.
9. Smoke-test surrounding UI/features that share the changed surface, such as adjacent navigation, list/detail transitions, filters/search, dialogs, menus, sidebars, and nearby actions that could be accidentally broken by the implementation.
10. Verify responsive behavior and visual quality on mobile, tablet, desktop, standard `1920x1080`, and large `2560x1440` desktop viewports when the task changes UI. Treat this as equal to proving the task's functional changes work: Phase 5 fails if either the changed behavior or the responsive UI quality is broken. Check layout, overlap, overflow, clipping, tap/click targets, readable text, navigation access, dialogs/menus, and the task's main flows at each required viewport. Standard desktop/1080p screens must not have excessive dead space that makes the app look abandoned or sparse. `2560x1440` may have some extra whitespace, but not broad empty regions that make the UI feel unfinished. 4K/ultrawide whitespace is acceptable when the layout is intentionally constrained and still coherent.
11. Capture screenshots under `task-workflow/screenshots/` for the main changed flows and responsive evidence.
12. Verify every screenshot path cited in the Phase 5 artifact exists before scoring the gate. Record the file-existence command/readback proof in `task-workflow/phase-5-playwright-verification.md`.
13. If Phase 5 finds a broken flow, bad-case failure, surrounding-feature regression, missing screenshot file, or responsive/UI-quality issue, Phase 5 fails. Record it in the artifact and `open-gaps.md`, return to Phase 4 for fix and integrity review, then re-enter Phase 5 and rerun the failed path plus nearby/surrounding checks.
14. Fix discovered issues and rerun the scripts from clean Node.js processes through the lifecycle helper.
15. Review the interactive scripts and E2E tests created so far for fixed waits and record the files inspected plus the result.
16. Update `task-workflow/open-gaps.md` for every browser/runtime/manual-verification gap closed, defended, or still open.
17. Update `task-workflow/progress.md` with browser evidence summary, a pointer to `task-workflow/phase-5-playwright-verification.md` for Playwright/screenshot/log details, fixed-wait review state, open gaps, and next local action.
18. Replace all `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows.
19. Record route/state coverage, interaction coverage, bad-case/adversarial coverage, surrounding-feature smoke, responsive viewport coverage, screenshots, screenshot existence proof, lifecycle helper command, readiness proof, runtime log paths, cleanup result, issues, fixes, open-gap status, and fixed-wait review evidence.
20. After the Phase 5 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-6-e2e-verification`.
21. Update `task-workflow/progress.md` so current phase and next local action match Phase 6.

## Required Interactive Evidence

The artifact must cite real evidence for every main touched or implied user flow:

- launch command and local URL
- lifecycle helper command
- readiness proof and runtime log path
- Playwright script path
- route or state exercised
- interaction performed
- bad case, non-ideal user action, or surrounding feature checked
- viewport checked, including dimensions such as mobile, tablet, desktop, `1920x1080`, or `2560x1440`
- screenshot path when visual proof matters
- screenshot existence proof for every screenshot path cited
- issue found
- fix made
- rerun result

Screenshots alone do not prove controls work. A control that matters to the task must be clicked, filled, selected, submitted, or otherwise exercised with real browser input.

Phase 5 is not a happy-path-only check. Think like a real user who may click nearby controls, enter invalid data, abandon a flow, resize the viewport, use the feature on mobile, or do steps in an unexpected order. If that breaks the task flow or nearby UI, fix it before Phase 5 passes.

## Phase 5 Score

Score `task-workflow/phase-5-playwright-verification.md` against `50` items:

- `8` app launch and script discipline items
- `8` current task route/state coverage items
- `8` interaction and bad-case coverage items
- `8` surrounding feature smoke items
- `8` responsive mobile/tablet/desktop/1080p/2560px UI-quality items
- `5` screenshot/evidence items
- `5` fix-and-rerun items

Critical failures:

- standalone Playwright script not created
- app not launched through the repo's local command
- app server launched as an unbounded foreground command
- lifecycle helper not used for Phase 5 app startup and script execution, except after recorded helper failure and a justified fallback
- first app/browser command ran against an assumed existing server instead of establishing helper/repo lifecycle ownership
- manual cleanup, fixed `sleep`, DB-delete, or server-start command chain used instead of the lifecycle helper before a diagnosed helper failure
- `playwright install` or equivalent browser download attempted during verification
- server PID/log/readiness proof not recorded
- main touched route or flow not exercised
- bad cases and non-ideal user actions not exercised for the changed flow
- surrounding UI/features sharing the changed surface not smoke-tested
- mobile, tablet, desktop, standard `1920x1080`, and large `2560x1440` responsive behavior not checked for the main changed flow when UI changed
- critical responsive UI issue remains unresolved, such as overlapping controls, clipped content, inaccessible controls, broken navigation, unreadable text, unusable dialogs/menus, accidental horizontal scrolling, controls outside the viewport, excessive dead space on normal desktop/1080p screens, or broad unfinished-looking empty regions at `2560x1440`
- screenshot path cited but file does not exist
- screenshot paths are cited without file-existence proof in the artifact
- discovered critical UI/runtime issue remains unresolved
- Phase 5-discovered issue was not routed back through Phase 4 fix/integrity review before rechecking
- script uses DOM shortcuts as a substitute for normal user interaction
- script contains any fixed wait in the audited files
- fixed-wait review not recorded
- fixed-wait review finds any occurrence in `task-workflow/playwright` or `tests/e2e`
- browser-verification gaps remain stale in `task-workflow/open-gaps.md`
- `task-workflow/open-gaps.md` still contains template placeholder rows

Pass gate:

- score is at least `44/50`
- every critical Playwright item passes
- every main touched or implied user flow has interactive evidence
- bad cases, non-ideal user actions, and surrounding features have interactive evidence
- mobile, tablet, desktop, standard `1920x1080`, and large `2560x1440` responsive behavior is verified for the main changed flow when UI changed
- responsive UI quality passes as a first-class guarantee alongside the task's functional behavior
- screenshots cited in the artifact exist
- screenshot existence proof is recorded for every screenshot path cited
- no unresolved critical UI/runtime issue remains
- browser-verification gaps in `task-workflow/open-gaps.md` are resolved, updated, or defended
- fixed-wait review is recorded and clean
- `task-workflow/open-gaps.md` has no placeholder `Pending` rows
- any background server started for the phase is cleaned up or explicitly handed to the next bounded command

If this gate fails, stay in Phase 5.

## Phase 6: E2E Test Creation And Verification

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-6-e2e-verification`.
2. Identify the regression paths that should remain protected after this task.
3. Inspect existing E2E tests before creating new ones. Identify whether the changed feature belongs in an existing flow, regression suite, or user journey.
4. Update existing E2E tests first when the new or changed behavior extends an existing workflow or could affect existing functionality.
5. Add a new E2E test only when the task introduces a genuinely new workflow that cannot be cleanly covered by an existing E2E test.
6. Add or update lower-level tests when they are the better fit for non-UI logic.
7. Select the smallest useful test command that proves the changed behavior and connected existing behavior. Start with new, changed, or directly connected E2E specs and maintain a connected-spec ledger. Never run the unfiltered full E2E suite unless the task explicitly asks for full E2E or a concrete written repo instruction names full E2E/all-spec execution for this exact task; "target repo instructions" must name full E2E or an equivalent all-spec command, not merely say to run tests. If targeted or multi-spec commands already ran the connected specs and no related code/config changed, that is the evidence.
8. Record every meaningful test command with its scope, why that scope was selected, any previous related failure, what changed since that failure, outcome, and next action.
9. Do not rerun tests only for confidence. Rerun when related implementation changed, the test changed, config/environment changed, previous output was incomplete/stale, or the next run gathers a narrower diagnostic needed to fix a real failure.
10. Before rerunning the exact same failing command, record what changed since the previous run or what new evidence the rerun will collect. If nothing changed and the previous output is complete, inspect logs, DOM/state, traces, screenshots, or persisted data first, then change the implementation, test, command scope, or diagnostic strategy before running again.
11. Run the existing, updated, new, and connected tests needed to prove existing functionality still works and the new additions work with it. Use `task-workflow/scripts/playwright-lifecycle.mjs` as the default lifecycle owner for Playwright and app-server startup, including existing repo E2E specs. Put the native test command inside helper `--run`. Use native Playwright with repo `webServer` only when the helper cannot own the server for that exact command, or after the helper has failed once or twice with recorded diagnostics. If setup is required before a helper-owned server starts, pass it with `--setup` instead of chaining setup, server start, and test execution in one shell command. When a failing E2E run suggests stale DB, stale server, wrong build, redirect, missing fixture data, not-found page state, selector timeout, or no useful helper output, inspect helper run/server/setup logs plus page state before rerunning through the same lifecycle owner.
12. Fix failures and rerun with the smallest command that can prove the fix.
13. Record the exact command output for every required E2E/test run. If output is long, write it to a repo-local log file, cite that path, and copy the final pass/fail lines exactly into `task-workflow/phase-6-e2e-verification.md`.
14. Review the interactive scripts and E2E tests for fixed waits and record the files inspected plus the result.
15. Update `task-workflow/open-gaps.md` for every test/coverage gap closed, defended, or still open.
16. Update `task-workflow/progress.md` with a pointer to `task-workflow/phase-6-e2e-verification.md` for test-file and test-repair details, command results summary, fixed-wait review state, coverage gaps, artifact pointer updates, and next local action.
17. Replace all `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows.
18. Record existing tests inspected, tests updated, tests added, commands, exact command output evidence, outcomes, test-selection/retry evidence, fixed-wait review evidence, and remaining coverage gaps.
19. After the Phase 6 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-7-final-signoff`.
20. Update `task-workflow/progress.md` so current phase and next local action match Phase 7.

## Coverage Decision

Prefer the smallest durable test that protects the behavior:

- targeted unit/component tests for non-UI logic or isolated UI behavior
- targeted E2E for one affected user flow
- new, changed, or directly connected E2E specs only by default
- multi-spec E2E only when multiple changed or adjacent flows must be protected together
- full Playwright E2E only when the task explicitly asks for full E2E or a concrete written repo instruction names full E2E/all-spec execution for this exact task; do not run it for confidence, state discovery, suspected pre-existing/order-dependent failures, because many specs appear relevant, or because the repo has one E2E spec file containing many tests. Diagnose those cases with the narrow failing spec/test plus logs, DOM/state, trace, screenshot, or persisted data evidence.
- broad/full unit or Vitest only as one final sanity check after targeted and connected tests pass, or when shared contracts, global setup, app-wide behavior, explicit task/repo instructions, or incomplete/stale prior output requires it. Do not start with it and do not repeat it after a clean pass unless related code/config changed or previous output is stale/incomplete.
- update an existing E2E test when the task modifies or extends an existing user workflow
- add a new E2E test only for a genuinely new workflow or when existing E2E coverage cannot cleanly express the path
- E2E tests for user-visible multi-step flows
- component tests for isolated UI behavior
- service/unit tests for non-UI logic
- integration tests for data contracts or persistence flows

E2E coverage must protect actual task functionality. Prefer assertions that prove a user-visible outcome, persisted state, navigation result, saved record, validation behavior, permission behavior, or end-to-end data flow. Avoid tests whose main value is checking superficial styling, color, class names, incidental copy, or whether a button exists without proving the feature works.

When updating an existing E2E test, keep its original regression value. The updated test must prove existing functionality still works and that the new or changed behavior integrates with that flow.

Do not add flaky one-off assertions just to claim coverage. A useful E2E test should fail when the task's real user workflow breaks and should remain stable when harmless styling or layout details change.

If new coverage is not practical, record the reason, risk, and remaining manual proof. Do not use this exception for convenience.

## Phase 6 Score

Score `task-workflow/phase-6-e2e-verification.md` against `30` items:

- `8` coverage-decision items
- `8` meaningful functional assertion items
- `6` test execution items
- `4` failure-fix/rerun items
- `4` coverage-gap documentation items

Critical failures:

- changed user-visible behavior has no coverage and no defensible reason
- existing E2E tests were not inspected before adding new tests
- new E2E test added when an existing E2E flow should have been updated instead
- existing functionality affected by the task is not protected by the updated or affected E2E run
- new/updated tests do not prove actual task functionality, persisted state, navigation result, validation behavior, or end-to-end data flow
- tests are primarily superficial checks such as color, CSS class, incidental copy, or button existence without proving feature behavior
- tests depend on brittle implementation details instead of user-visible or persisted outcomes
- test added but not run
- Playwright/E2E command bypasses `task-workflow/scripts/playwright-lifecycle.mjs` before a diagnosed helper failure or a recorded pre-command reason that repo `webServer` ownership is required for that exact command
- first E2E command depends on an assumed existing server instead of establishing helper/repo lifecycle ownership
- Playwright/E2E command uses manual cleanup, fixed `sleep`, DB-delete, or server-start command chains instead of lifecycle `--setup` plus managed server/run steps before a diagnosed helper failure
- unfiltered full Playwright/E2E suite is run without an explicit task request for full E2E or a concrete written repo instruction naming full E2E/all-spec execution for this exact task
- broad/full unit or Vitest command is run without a concrete artifact reason
- tests are rerun only for confidence, or the same failing test command is rerun blindly without material implementation, test, config, environment, output-staleness, or diagnostic reason
- `playwright install` or equivalent browser download attempted during E2E verification
- relevant test failure caused by this task remains unresolved
- artifact records a pass without command evidence
- artifact records a pass with only a described or documented test result and no exact command output or cited repo-local log containing exact output
- existing tests deleted without replacement coverage or written defense
- audited Playwright or E2E files contain any fixed wait
- fixed-wait review not recorded
- fixed-wait review finds any occurrence in `task-workflow/playwright` or `tests/e2e`
- test/coverage gaps remain stale in `task-workflow/open-gaps.md`
- `task-workflow/open-gaps.md` still contains template placeholder rows

Pass gate:

- score is at least `24/30`
- every critical E2E/test item passes
- existing E2E tests were inspected before deciding whether to update or add coverage
- existing E2E tests are updated when the task changes an existing workflow
- new E2E tests are added only when existing coverage cannot cleanly cover the new workflow
- new or affected behavior has test coverage or a documented reason why not
- tests assert meaningful functional outcomes rather than superficial style or existence checks
- required tests pass or remaining failures are unrelated and evidenced
- test command selection and retry evidence is recorded
- exact E2E/test command output is recorded in the artifact or in a cited repo-local log file
- test/coverage gaps in `task-workflow/open-gaps.md` are resolved, updated, or defended
- fixed-wait review is recorded and clean
- `task-workflow/open-gaps.md` has no placeholder `Pending` rows

If this gate fails, stay in Phase 6.

## Phase 7: Final Audit And Signoff

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-7-final-signoff`.
2. Re-read every phase artifact.
3. Confirm every previous gate passed and remains current.
4. Confirm `task-workflow/open-gaps.md` has no unresolved critical gap.
5. Confirm no open gap is stale or contradicted by Phase 5, Phase 6, or test evidence.
6. Confirm `task-workflow/open-gaps.md` has no placeholder `Pending` rows.
7. Re-read `task-workflow/progress.md` and confirm it matches `CURRENT_PHASE.txt`, every phase decision, the gap ledger, Current Phase Pointers, Phase Artifact Index, Artifact Pointers, and the next local action.
8. Re-read the fixed-wait review evidence from Phase 5 and Phase 6, re-open the inspected verification files if they changed, and confirm the review is still current.
9. Re-read the screenshot existence audit from Phase 5 and verify every screenshot path cited in Phase 5 still exists.
10. Re-read the exact E2E/test command output evidence from Phase 6 and confirm it is present, current, and not replaced by a prose-only claim.
11. Inspect changed app/server source for `console.*` again. Temporary `console.*` used to debug Phase 5 browser/runtime behavior must be removed before Phase 7 signs off; lasting logging must use the repo-approved logging or telemetry path.
12. Record an artifact integrity review by re-opening each phase artifact and checking its decision, score, required evidence, and consistency with `CURRENT_PHASE.txt`, `progress.md`, and `open-gaps.md`.
13. Review the final diff.
14. Re-run only commands whose earlier proof was invalidated by later edits, changed test/config state, incomplete/stale output, or an explicit exact-task requirement from the task or repo instructions. Do not add full unit/Vitest or full Playwright runs only to feel more confident.
15. Score the final result in all quality categories.
16. Confirm the final implementation follows the task-relevant development rules extracted from `AGENTS.md`.
17. Confirm task completion summary is accurate.
18. Locate the required MITB completed command. Prefer the exact `Completed:` command in `.tasks/task.md`; otherwise use the exact command supplied in the prompt. The expected MITB shape is `node /workspace/mitb/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<summary>"`.
19. If any Phase 7 audit check fails, do not run the completed command. Set `task-workflow/CURRENT_PHASE.txt` to the earliest failing phase, repair the work, update evidence, rescore, loop forward through the gates, and re-enter Phase 7.
20. Run the completed command only after every prior Phase 7 audit check is clean. Record the exact command and result in `task-workflow/phase-7-final-signoff.md` and `task-workflow/progress.md`.
21. Treat the completed command as the final external task action. Plan all typecheck, lint, build, unit test, E2E test, app server, server probe, browser probe, and verification work before task completion.
22. Do not synthesize project/task identifiers when `.tasks/task.md` or the prompt already provides the command.
23. Update `task-workflow/progress.md` so the last completed gate is Phase 7, the Current Phase Pointers, Phase Artifact Index, and Artifact Pointers are current, task-completion evidence is recorded, and the only next action is final response.
24. Sign off only when the artifact proves the whole workflow passed and the completed command has run successfully.

## Final Audit Checklist

Confirm:

- every phase artifact exists
- every previous phase decision is `Pass`
- every gate score still satisfies its threshold
- required evidence tables remain intact
- artifact integrity review passes for every phase artifact
- no artifact is mostly template placeholders
- `task-workflow/progress.md` matches Phase 7, has no pending current action, and does not contradict any phase artifact
- no critical open gap remains
- no stale open gap remains
- no `open-gaps.md` placeholder row remains
- Phase 5 and Phase 6 fixed-wait reviews are present and current
- every screenshot path cited in Phase 5 exists and has recorded existence proof
- Phase 6 records exact E2E/test command output in the artifact or a cited repo-local log file
- changed app/server source contains no `console.*` after Phase 5
- final diff matches the task scope
- final implementation follows the task-relevant development rules extracted from `AGENTS.md`
- final quality scorecard is at least `8/10` in every category
- final verification is current after the last source edit
- MITB completed command from `.tasks/task.md` or the prompt was run after every Phase 7 audit check passed
- final response can cite changed files, commands/tests run, and final gate status

## Phase 7 Score

Score `task-workflow/phase-7-final-signoff.md` against `20` items:

- `6` previous-gate-currentness items
- `4` artifact integrity items
- `4` final diff review items
- `4` final verification-currentness items
- `2` final summary and MITB completion-command items

Critical failures:

- any previous phase gate failed or stale
- critical open gap remains
- stale open gap remains after the phase that claimed to resolve it
- `task-workflow/open-gaps.md` still contains template placeholder rows
- fixed-wait reviews are missing, stale, non-clean, or contradicted by files under `task-workflow/playwright` or `tests/e2e`
- Phase 5 cites screenshot paths that do not exist or lack recorded existence proof
- Phase 6 lacks exact E2E/test command output evidence
- changed app/server source still contains `console.*` after Phase 5
- artifact integrity review is missing, incomplete, or records a failing decision, failing score, missing artifact, placeholder gate evidence, or contradiction between artifacts
- final implementation violates or fails to verify an extracted `AGENTS.md` development rule
- any final quality category is below `8/10`
- final source edit happened after last relevant verification
- final artifact mostly repeats claims without evidence
- MITB completed command was not run after every Phase 7 audit check passed
- MITB completed command was run before previous phase gates and final audit checks passed
- Phase 7 found a failing check but did not loop back to the earliest failing phase before task completion
- task completion command was synthesized incorrectly when `.tasks/task.md` or the prompt provided the exact command

Pass gate:

- score is `20/20`
- all previous phase gates passed
- all required artifacts exist and remain auditable
- artifact integrity review is recorded and passes for every phase artifact
- final implementation follows the extracted `AGENTS.md` development rules
- no unresolved critical gap remains
- no stale open gap remains
- no open-gap placeholder row remains
- fixed-wait reviews are present and current
- every screenshot cited in Phase 5 exists
- exact E2E/test command output evidence is present for Phase 6
- changed app/server source contains no `console.*` after Phase 5
- every final quality category is at least `8/10`
- final checks and tests are current after the last code change
- MITB completed command was run successfully after all prior final-audit checks passed
- final summary cites the main files changed and verification performed

If this gate fails, return to the failing earlier phase.

## Promotion Rule

The task is complete only when Phase 7 passes.

Before setting `task-workflow/CURRENT_PHASE.txt` to any later verification or signoff marker, re-open all prior phase artifacts through the current phase.

Promotion requirements:

- every prior phase artifact has `Decision: Pass`
- the current phase artifact has `Decision: Pass`
- every required score meets its threshold
- all critical items pass
- no required evidence table is still a template placeholder
- no required gate row still says `Pending`
- `task-workflow/open-gaps.md` has no placeholder `Pending` rows
- `task-workflow/open-gaps.md` has no critical or stale open gap
- fixed-wait review requirements are satisfied for Phase 5 and Phase 6 before final signoff
- screenshot existence proof is satisfied for Phase 5 before final signoff
- exact E2E/test command output evidence is satisfied for Phase 6 before final signoff
- changed app/server source contains no `console.*` after Phase 5
- artifact integrity review is recorded and clean
- verification evidence is current after the last source edit
- `task-workflow/progress.md` is current and agrees with Phase 7 signoff
- MITB completed command has run successfully after the final audit checks passed

If any artifact fails this check, do not advance the marker. Set `task-workflow/CURRENT_PHASE.txt` to the earliest failing phase and continue there.

Do not ask the user whether to continue between Phase 5, Phase 6, and Phase 7. The gates decide whether to continue, rework, or return to an earlier phase.
