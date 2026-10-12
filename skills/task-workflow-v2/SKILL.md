---
name: task-workflow
description: Complete connected application changes with real UI verification, reusable Playwright helpers, and a sparse recovery snapshot. Use for coding tasks in new or existing apps.
---

# Task Workflow

Discover connected owners, implement, verify the real journey, repair causes, finish. No phases, scores, checkpoint approval gates or duplicate trackers.

## Trace and change

Read the task, binding `AGENTS.md`, required docs and relevant skills. Use actual repository contracts/architecture. MITB inputs are `.tasks/task.md`, `.tasks/domain.md` and `.tasks/files/`. Preserve canonical inputs, installed skills, unrelated edits and data unless their exact change is authorized.

Trace shared/separate owners, routes, producers/consumers, persistence/recovery and affected tests. Styling includes component families/tokens, not just imports. Change shared owners once and separate affected uses consistently; preserve intentional differences. Fix structural causes and remove superseded code, not retained data. Reopen decisions only for new evidence/conflict.

Implement the smallest complete affected user journey in the first connected batch: the persistence/contract and actual UI needed to prove one outcome, not the whole backend followed by the whole UI. Run the repository’s fast lint/type checks and prove that outcome through the real UI before implementing the next independent outcome. If the journey is not usable yet, finish only its missing connected owners; do not broaden into unrelated stages while deferring its first proof. Repeat these checks after connected implementation batches and shared-owner refactors, not every edit; resolve failures before broadening. When persistence changes, prove save → authoritative commit → reload; appearance changes need their actual rendered result and interactions.

**Bad:** finish quote persistence, approval, output, catalog and reports before testing the first draft. **Good:** build the minimal intake → save → reload path, prove its stored identity/values through the UI, then extend to approval/output.

**Bad:** change one rounded button in a page while its shared component and separately implemented siblings stay square. **Good:** trace the component/token and independent siblings, update their owners consistently, then exercise the affected rendered controls.

## One recovery snapshot

Keep the single recovery snapshot at `<repository-root>/task-workflow/checkpoint.md`; put temporary verification scripts, fixtures, diagnostics and evidence in that same task-workflow folder, never the installed skill folder. For a genuinely new task, empty the task-workflow folder only after confirming it holds finished work and preserving its required evidence. Never clear it when resuming or discard unrelated work. No separate progress files, TODO tools, test ledgers or per-command paperwork.

Create once scope and the first journey are understood. Keep task/goal, consequential owners/decisions, implemented versus verified journeys with proof paths or missing checks, and now/next. Name the first journey, not an entire backend/UI phase.

Refresh from intact context only when a completed/resumable journey milestone materially changes verified work or the next batch, a consequential decision/blocker changes continuation, interruption/handoff is imminent, or final proof is ready. Combine related updates into one write; skip unchanged state. Not per file, command, assertion, failed attempt, repair or timer. Do not reread the snapshot while context is intact or after a successful write; inspect an uncertain write once. User-facing progress updates do not trigger snapshot writes.

After genuine context loss/replacement, read snapshot/binding inputs once; reconcile Git status/diff including untracked files, named owners and proof, then resume unfinished work. Intact reconnects need no recovery ritual. Session/tool logs are diagnostic history, not another ledger.

**Bad:** reread/write the checkpoint after each file edit or failed assertion. **Good:** keep working from intact context; write once when save → reload is implemented and verified, with proof paths and the next unfinished outcome. On a real resume, read once and reconcile the diff.

## Verify through the application

Every UI-reachable change, including backend behavior, needs real UI verification. You own the Playwright check: choose the affected journey, inspect the actual screen, perform user actions and assert the required result. Shared scripts provide server/process lifecycle, evidence paths and browser-error reporting; they do not discover controls or decide what is correct. See [running checks and a worked journey](references/verification.md) for the runner interface.

**Locate from observation; expect from requirements.** Use native Playwright inspection such as `await page.locator('main').ariaSnapshot()` when a screen's roles/names are unknown. The task, owning contract and values you entered determine expected values/state—not the current broken output. Source helps explain behavior but JSX text is not an accessible-name guarantee.

Prove the first usable journey, then extend it across the connected changes. Run a short segment when its controls and preconditions are known; do not write an all-app script from guesses. Keep passing segments and reuse repeated locators where that actually helps. At a new screen or a failed locator, inspect that screen before choosing the next selector. A waiting change cannot fix a wrong name.

Use a known isolated starting state for each scenario: fresh owned records or explicit existing fixtures/identities. Retain state only when the next check deliberately depends on its proven state; otherwise rebuild the isolated precondition, not default/live storage. Assert identity/stage instead of assuming the last saved record or an empty register. A fixture establishes a precondition; it does not prove the user action under test.

Follow the connected [proof boundaries](references/behavior-proof.md). Ordinary UI checks need real actions and contract-based results, not a custom network parser. For consequential saves/state changes also prove authoritative success and the same record/values after reload/reopen; local optimistic UI alone is insufficient. Fault checks follow the positive path and target the actual request/operation; use [error ownership](references/batched-verification.md) only when needed.

When a check fails, read its exact log, inspect the current screen/response with native Playwright and separate product, check, setup and helper causes. Repair the owning construct and its repeated uses; rerun that outcome with explicit prerequisites. Never loosen expected behavior, hide duplicates or suppress unrelated errors to get green. Product changes invalidate connected proof; check-only repairs need not replay unrelated journeys.

View the affected PNGs and every page of actual print/export artifacts with the available image-viewing capability; saving a file, reading document text or computing pixel statistics is not visual acceptance. Judge against the task/approved design and separate demonstrated defects from optional style observations. Before completion, rerun affected proof against the current served build and actual isolated state. A green check that records a product defect is not acceptance: fix in-scope defects and refresh proof before completing implementation. For verification-only tasks, report findings without changing the product. Report exercised behavior and unproved boundaries briefly in the existing handoff—not another tracker.

**Bad:** copy `Start new quote →` from page text, write every stage, then add waits when it matches nothing. **Good:** inspect the rendered role/name, prove create → save → reload with that record, then inspect and extend to the next affected outcome.

**Bad:** observe `$1,235` and change the expectation to match. **Good:** the contract and input require `$1,234.56`; prove the saved value and report the display's lost cents as a product defect.

## Preserve and finish

Default/live storage is protected; fixtures, faults and verification migrations use proven isolated disposable targets. Trace isolation through setup/server/checks, not names alone. Apply required authorized application migrations before delivery. Bound processes and clean up only owned resources/diagnostics; keep parallel work/data isolated and credentials out of output.

Trace changed setup/fixture exports to existing runner/import consumers. Update affected tests without weakening assertions/discovery. New unit/E2E tests only when absolutely necessary; otherwise skip. Never change the product for verifier setup failures. Run required repository checks/builds and relevant retained tests; confirm served artifacts match current source/build identity.

Review the connected final diff, update relevant docs and the same snapshot, and retain proof outside product commits. Confirm task identity before replacing another task's snapshot. Run MITB's exact completion command only after completion and inspect its result. If blocked/stopped, save resumable state and the unfinished requirement; never claim unperformed checks.

**Bad:** trust a database named `test.db`, add a test for every edit, and mark UI verification done from an API pass. **Good:** prove setup and server use the same isolated database, update only affected existing tests or add one only if necessary, and verify the actual changed flow through the UI before the completion command.
