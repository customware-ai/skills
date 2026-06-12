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

- Start the app server in the background with a recorded PID and log path.
- Verify readiness with a separate bounded command, such as checking the local URL or running the Playwright script with a finite timeout.
- Run interactive scripts and E2E tests as separate bounded commands.
- Kill the background server when verification is complete or when a blocking launch issue is recorded.
- Do not leave `pnpm dev`, `npm run dev`, `vite`, `next dev`, test watchers, or similar long-lived commands as the active foreground tool call.
- If the server or test command hangs, stop it, capture the log/error evidence, update the current phase artifact or `open-gaps.md`, and continue with the smallest local recovery path.

## Phase 5: Interactive Playwright Verification

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-5-playwright-verification`.
2. Read `references/playwright-interactive.md`.
3. Start the app using the repo's normal local command, in the background with a PID and log path.
4. Write standalone Playwright scripts under `task-workflow/playwright/`.
5. Drive the app through real user interactions.
6. Verify primary routes, forms, buttons, menus, dialogs, tables, navigation, save flows, and error states touched or implied by the task.
7. Exercise bad cases and non-ideal user behavior: invalid submissions, empty states, cancel/close paths, repeated clicks where relevant, out-of-order actions, navigating away/back, and nearby controls a real user could click while using the feature.
8. Smoke-test surrounding UI/features that share the changed surface, such as adjacent navigation, list/detail transitions, filters/search, dialogs, menus, sidebars, and nearby actions that could be accidentally broken by the implementation.
9. Verify responsive behavior and visual quality on desktop, tablet, and mobile viewports. Check layout, overflow, clipping, tap/click targets, readable text, navigation access, dialogs/menus, and the task's main flows at each required viewport.
10. Capture screenshots under `task-workflow/screenshots/` for the main changed flows and responsive evidence.
11. If Phase 5 finds a broken flow, bad-case failure, surrounding-feature regression, or responsive/UI-quality issue, Phase 5 fails. Record it in the artifact and `open-gaps.md`, return to Phase 4 for fix and integrity review, then re-enter Phase 5 and rerun the failed path plus nearby/surrounding checks.
12. Fix discovered issues and rerun the scripts from clean Node.js processes.
13. Review the interactive scripts and E2E tests created so far for fixed waits and record the files inspected plus the result.
14. Update `task-workflow/open-gaps.md` for every browser/runtime/manual-verification gap closed, defended, or still open.
15. Update `task-workflow/progress.md` with browser evidence summary, a pointer to `task-workflow/phase-5-playwright-verification.md` for Playwright/screenshot/log details, fixed-wait review state, open gaps, and next local action.
16. Replace all `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows.
17. Record route/state coverage, interaction coverage, bad-case/adversarial coverage, surrounding-feature smoke, responsive viewport coverage, screenshots, issues, fixes, open-gap status, and fixed-wait review evidence.
18. Kill any background server started for Phase 5, or record why it must remain running for the next bounded command.
19. After the Phase 5 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-6-e2e-verification`.
20. Update `task-workflow/progress.md` so current phase and next local action match Phase 6.

## Required Interactive Evidence

The artifact must cite real evidence for every main touched or implied user flow:

- launch command and local URL
- Playwright script path
- route or state exercised
- interaction performed
- bad case, non-ideal user action, or surrounding feature checked
- viewport checked: desktop, tablet, or mobile
- screenshot path when visual proof matters
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
- `8` responsive desktop/tablet/mobile UI-quality items
- `5` screenshot/evidence items
- `5` fix-and-rerun items

Critical failures:

- standalone Playwright script not created
- app not launched through the repo's local command
- app server launched as an unbounded foreground command
- server PID/log/readiness proof not recorded
- main touched route or flow not exercised
- bad cases and non-ideal user actions not exercised for the changed flow
- surrounding UI/features sharing the changed surface not smoke-tested
- desktop, tablet, and mobile responsive behavior not checked for the main changed flow
- critical responsive UI issue remains unresolved, such as clipped content, inaccessible controls, broken navigation, unreadable text, or unusable dialogs/menus
- screenshot path cited but file does not exist
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
- desktop, tablet, and mobile responsive behavior is verified for the main changed flow
- screenshots cited in the artifact exist
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
7. Run the existing, updated, new, and affected tests needed to prove existing functionality still works and the new additions work with it.
8. Fix failures and rerun until passing.
9. Review the interactive scripts and E2E tests for fixed waits and record the files inspected plus the result.
10. Update `task-workflow/open-gaps.md` for every test/coverage gap closed, defended, or still open.
11. Update `task-workflow/progress.md` with a pointer to `task-workflow/phase-6-e2e-verification.md` for test-file and test-repair details, command results summary, fixed-wait review state, coverage gaps, artifact pointer updates, and next local action.
12. Replace all `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows.
13. Record existing tests inspected, tests updated, tests added, commands, outcomes, fixed-wait review evidence, and remaining coverage gaps.
14. After the Phase 6 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-7-final-signoff`.
15. Update `task-workflow/progress.md` so current phase and next local action match Phase 7.

## Coverage Decision

Prefer the smallest durable test that protects the behavior:

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
- relevant test failure caused by this task remains unresolved
- artifact records a pass without command evidence
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
9. Record an artifact integrity review by re-opening each phase artifact and checking its decision, score, required evidence, and consistency with `CURRENT_PHASE.txt`, `progress.md`, and `open-gaps.md`.
10. Review the final diff.
11. Re-run any command needed because later edits invalidated earlier proof.
12. Score the final result in all quality categories.
13. Confirm task completion summary is accurate.
14. Locate the required MITB completed command. Prefer the exact `Completed:` command in `.tasks/task.md`; otherwise use the exact command supplied in the prompt. The expected MITB shape is `node /workspace/mitb/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<summary>"`.
15. If any Phase 7 audit check fails, do not run the completed command. Set `task-workflow/CURRENT_PHASE.txt` to the earliest failing phase, repair the work, update evidence, rescore, loop forward through the gates, and re-enter Phase 7.
16. Run the completed command only after every prior Phase 7 audit check is clean. Record the exact command and result in `task-workflow/phase-7-final-signoff.md` and `task-workflow/progress.md`.
17. Do not synthesize project/task identifiers when `.tasks/task.md` or the prompt already provides the command.
18. Update `task-workflow/progress.md` so the last completed gate is Phase 7, the Current Phase Pointers, Phase Artifact Index, and Artifact Pointers are current, task-completion evidence is recorded, and the only next action is final response.
19. Sign off only when the artifact proves the whole workflow passed and the completed command has run successfully.

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
- final diff matches the task scope
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
- artifact integrity review is missing, incomplete, or records a failing decision, failing score, missing artifact, placeholder gate evidence, or contradiction between artifacts
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
- no unresolved critical gap remains
- no stale open gap remains
- no open-gap placeholder row remains
- fixed-wait reviews are present and current
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
- artifact integrity review is recorded and clean
- verification evidence is current after the last source edit
- `task-workflow/progress.md` is current and agrees with Phase 7 signoff
- MITB completed command has run successfully after the final audit checks passed

If any artifact fails this check, do not advance the marker. Set `task-workflow/CURRENT_PHASE.txt` to the earliest failing phase and continue there.

Do not ask the user whether to continue between Phase 5, Phase 6, and Phase 7. The gates decide whether to continue, rework, or return to an earlier phase.
