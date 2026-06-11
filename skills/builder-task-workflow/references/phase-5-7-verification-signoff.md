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
7. Capture screenshots under `task-workflow/screenshots/`.
8. Fix discovered issues and rerun the scripts from clean Node.js processes.
9. Review the interactive scripts and E2E tests created so far for fixed waits and record the files inspected plus the result.
10. Update `task-workflow/open-gaps.md` for every browser/runtime/manual-verification gap closed, defended, or still open.
11. Replace all `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows.
12. Record route/state coverage, interaction coverage, screenshots, issues, fixes, open-gap status, and fixed-wait review evidence.
13. Kill any background server started for Phase 5, or record why it must remain running for the next bounded command.
14. After the Phase 5 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-6-e2e-verification`.

## Required Interactive Evidence

The artifact must cite real evidence for every main touched or implied user flow:

- launch command and local URL
- Playwright script path
- route or state exercised
- interaction performed
- screenshot path when visual proof matters
- issue found
- fix made
- rerun result

Screenshots alone do not prove controls work. A control that matters to the task must be clicked, filled, selected, submitted, or otherwise exercised with real browser input.

## Phase 5 Score

Score `task-workflow/phase-5-playwright-verification.md` against `50` items:

- `10` app launch and script discipline items
- `12` route/state coverage items
- `12` interaction coverage items
- `8` screenshot/evidence items
- `8` fix-and-rerun items

Critical failures:

- standalone Playwright script not created
- app not launched through the repo's local command
- app server launched as an unbounded foreground command
- server PID/log/readiness proof not recorded
- main touched route or flow not exercised
- screenshot path cited but file does not exist
- discovered critical UI/runtime issue remains unresolved
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
3. Add or update E2E tests when the task changes user-visible behavior.
4. Add or update lower-level tests when they are the better fit for non-UI logic.
5. Run the new or affected tests.
6. Fix failures and rerun until passing.
7. Review the interactive scripts and E2E tests for fixed waits and record the files inspected plus the result.
8. Update `task-workflow/open-gaps.md` for every test/coverage gap closed, defended, or still open.
9. Replace all `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows.
10. Record test files, commands, outcomes, fixed-wait review evidence, and remaining coverage gaps.
11. After the Phase 6 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-7-final-signoff`.

## Coverage Decision

Prefer the smallest durable test that protects the behavior:

- E2E tests for user-visible multi-step flows
- component tests for isolated UI behavior
- service/unit tests for non-UI logic
- integration tests for data contracts or persistence flows

If new coverage is not practical, record the reason, risk, and remaining manual proof. Do not use this exception for convenience.

## Phase 6 Score

Score `task-workflow/phase-6-e2e-verification.md` against `30` items:

- `8` coverage-decision items
- `8` test implementation items
- `8` test execution items
- `3` failure-fix/rerun items
- `3` coverage-gap documentation items

Critical failures:

- changed user-visible behavior has no coverage and no defensible reason
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
- new or affected behavior has test coverage or a documented reason why not
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
7. Re-read the fixed-wait review evidence from Phase 5 and Phase 6, re-open the inspected verification files if they changed, and confirm the review is still current.
8. Record an artifact integrity review by re-opening each phase artifact and checking its decision, score, required evidence, and consistency with `CURRENT_PHASE.txt` and `open-gaps.md`.
9. Review the final diff.
10. Re-run any command needed because later edits invalidated earlier proof.
11. Score the final result in all quality categories.
12. Confirm task completion summary is accurate.
13. Sign off only when the artifact proves the whole workflow passed.

## Final Audit Checklist

Confirm:

- every phase artifact exists
- every previous phase decision is `Pass`
- every gate score still satisfies its threshold
- required evidence tables remain intact
- artifact integrity review passes for every phase artifact
- no artifact is mostly template placeholders
- no critical open gap remains
- no stale open gap remains
- no `open-gaps.md` placeholder row remains
- Phase 5 and Phase 6 fixed-wait reviews are present and current
- final diff matches the task scope
- final quality scorecard is at least `8/10` in every category
- final verification is current after the last source edit
- final response can cite changed files, commands/tests run, and final gate status

## Phase 7 Score

Score `task-workflow/phase-7-final-signoff.md` against `20` items:

- `6` previous-gate-currentness items
- `4` artifact integrity items
- `4` final diff review items
- `4` final verification-currentness items
- `2` final summary accuracy items

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

If any artifact fails this check, do not advance the marker. Set `task-workflow/CURRENT_PHASE.txt` to the earliest failing phase and continue there.

Do not ask the user whether to continue between Phase 5, Phase 6, and Phase 7. The gates decide whether to continue, rework, or return to an earlier phase.
