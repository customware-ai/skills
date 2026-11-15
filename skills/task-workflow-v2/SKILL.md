---
name: task-workflow
description: Deliver an approved application change through coordinated implementation, relevant owner checks and independent native-harness verification of the requested outcomes.
---

# Task workflow

Main reads and follows `AGENTS.md` at session start and after compaction and delivers the approved task with least product code. The orchestrator role defines main's decisions; this skill sets delivery, tests, retests and checkpoint. Workers read only their assigned reference; name it in every assignment:

- [implementation.md](references/implementation.md): foundation and feature owners; main designs outlines to these rules.
- [build.md](references/build.md): check/build owner (gate, build, startup check).
- [testing.md](references/testing.md): test owners (scope, E2E isolation commands).

## Checkpoint

Keep only these in `task-workflow/checkpoint.md`:

- each required outcome, implementation state and required direct check or browser proof: **unverified, passed, failed or blocked**, concise evidence, relevant build and blocker when applicable. If both proofs are needed, both must pass; unrequired proofs are not outstanding;
- task identity, settled contracts and live path of each changed journey;
- owners and exclusive files;
- focused verification items, outcomes covered and current results.

**Critical:** Main's first worker creates `task-workflow/checkpoint.md` and main assigns each writer its rows. Each worker edits only its own rows with an exact-text edit, never rewriting the whole file, so concurrent workers never overwrite each other. Before returning, each worker updates its rows as its final step. The browser-only app driver cannot write: main includes its returned results, proof/item ID, build, evidence and blocker in the next worker assignment, or dispatches a worker to record them before completion. Mark affected proofs unverified pending retest, keeping earlier evidence references. Change lines only when facts change; no narratives, logs or evidence copies.

Example line: `Rename habit | implemented | browser: passed (item 2, build 18) | direct: passed (run 7, build 18)`.

After compaction, reread task and domain inputs, reconcile the checkpoint with Git status and diff, and load only unfinished work. Confirm identity before replacing another task's snapshot. No other tracking documents; command logs and evidence files are fine.

## Delivery order

0. **Research and plan in parallel.** Main reads the core, settles names, dispatches explorers and ready owners, and maps boundaries, consumers and readiness checks. Prepare the full-app gate assignment before the snapshot is ready.
1. **Foundation, only if needed.** One worker owns only common schemas, migrations, shared contracts and database queries. Reuse contracts; apply and check migrations on isolated disposable storage before consumers need them. A relevant assigned check can prove a boundary and unblock consumers before other foundation work finishes; types unblock type-only consumers but types or stubs never prove runtime boundaries. No full-app check is required per boundary.
2. **Feature owners** start when their dependencies are usable. Main immediately launches ready consumers while the notifying owner finishes. Preserve exclusive files and implement each feature end to end under `implementation.md`.
3. **Full-app check, build and startup:** the named owner follows `build.md` once the required served snapshot is stable, not per partial return. Don't delay handoff for separate verification planning or audit.
   - Coordinate every check/build input with owners using an already supported isolated snapshot or short freeze only if neither blocks critical-path work. Don't wait for unrelated owners merely to group verification. If stability disrupts critical work, use the integrated batch. Approved work may continue without changing the served snapshot during an item.
   - **Critical:** Never change check/build inputs while commands run. Rebuild only for changed build/runtime inputs or a failed build, only between app-driver items; test-only changes outside served inputs do not rebuild. Passed or intended items need no rebuild, restart or handoff; send the next to the running app. Group corrections when safe; the build owner, not driver, stops and restarts it using its PID file. Keep database and records across correction builds; follow the orchestrator's database and retest rule.
   - Follow `build.md` for the single full-app gate/build; before completion require a passing check on the final snapshot of all covered inputs, including later non-runtime changes; reuse a pass only if those inputs are unchanged. Run independent direct checks in parallel; route failures to responsible owners, retaining unrelated work and evidence. Later runtime changes need gate/build before proof; prior results stand only if unaffected. **Critical:** A failing gate is never a pass.
4. **Verify.**
   - **Critical:** Give the app driver one focused item at a time in a fresh session, never the whole list or story. Start the first ready item as soon as its stable snapshot passes check, build and startup; dispatch the next after return without unrelated replanning.
   - **Critical:** Keep minimum complete-coverage items in the checkpoint. Choose the highest-risk ready item with dependencies met, including the central journey; follow Reviewer requirements, one per named screen or control journey. Add items for uncovered required observations.
   - **Critical:** As owner rows arrive during implementation, prepare each item's route, actual starting state, valid real inputs and setup, supported controls and required outcomes. Check for existing records or choices before add versus update; preserve expected unchanged or blocked outcomes. Reuse valid identities and browser state. Each item gives the minimum user journey and required outcome, not an observation after every action; retain every task-required visible proof and save/reload check. Example item: `/` — type 'Read 10 minutes' in 'New habit', click 'Add', reload; expect exactly one 'Read 10 minutes' row.
5. **Tests**, when warranted, start alongside verification in a separate worker under `testing.md`; neither waits for the other, and no additional app build is needed. Failures join that round's corrections.

## Test decisions

**Critical:** For driver items, scripts and other tests, test only the changed path and what it touches, never the whole app; don't rerun or extend a whole-app suite. Start minimal: a happy and wrong path where applicable are a start, not a cap; include all distinct cases needed for required or warranted coverage.

Main routes cases: required on-screen observations and screen wiring stay in the browser; direct checks under `implementation.md` cover remaining behavior (saved values, order, approvals, exclusions, quantities and reversal). After one failed rerun, return a script case to main to fix the product or drop only a non-required case; never encourage looping. Decide automated tests under project rules for core behavior, complex flows, stable contracts and regressions; reuse targeted coverage first. For previewed and saved transitions, warranted cases call both real entry points with the same state and inputs, comparing preview to reloaded values across operation shapes. For AGENTS record-loading/creation contract changes, reuse existing regressions and include saved-value/record-count checks after refresh or retry in verification cases. Passing tests cannot overrule browser failures; keep contradictions open until the first divergent boundary is found.

## Corrections and retests

1. The app driver (browser harness tools only) reports failure with build, route, records, steps and expected/observed results. Before retry, main checks state, inputs, operation, served build and page state, identifying a changed condition or targeted unresolved diagnostic question. **Critical:** Never repeat unchanged work hoping for success or replay an acknowledged write. Never request unsupported DevTools, JavaScript, shell, filesystem or cache controls.
2. Main diagnoses and gives the owner a fix outline (orchestrator role).
3. The owner fixes it; changed runtime inputs go through `build.md` again.
4. Retest next on the fixed build (observe-only or fresh write). Cover only affected steps and items, judging by the owner's changed files and behaviors and actual dependencies, not ownership alone. Don't rerun unaffected passed items or unrelated direct checks; mark affected evidence for retest until it passes.

Keep passed evidence, failed attempts and acknowledged records. Continue verifying unaffected served journeys meanwhile. An unbuilt fix is unverified.

## Messages and completion

- **Critical:** A child returns once through native delivery when done or blocked; a continuing owner sends one `notify_parent` notice for a checked shared boundary unblocking another owner or other new information main must act on. No polling, sleeps, progress files or duplicate notices.
- Keep messages short: changed facts, actual results, file paths; never repeat task, plan, logs or source.
- If a child fails, recover unfinished work from the checkpoint and existing state without replaying successful work. Do not cycle agents or change providers for a deterministic provider or account denial; report it.
- **Critical:** The task is not complete until the checkpoint shows the final result of every required proof. Finish only when approved outcomes, required checks and corrections are settled, or report exactly what is incomplete or blocked. No extra export or report phase. Runtime helpers, models, providers, allocation and timing policy stay unchanged.
