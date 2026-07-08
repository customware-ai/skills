# Execution, Integrity, Static Checks, And Unit Coverage

Use this reference for Phase 2, Phase 3, and Phase 4.

These phases turn the accepted research plan into working code, then force a second implementation/integrity pass, static checks, and a dedicated unit-test coverage decision before browser verification begins. They are internal gates, not user confirmation points. When a gate passes, continue automatically. When a gate fails, fix the work and rerun the gate automatically. Do not end an OpenCode turn while Phase 2, Phase 3, or Phase 4 is unblocked and the current phase artifact still says `Decision: Fail`.

This is a looped gate workstream: Phase 2, Phase 3, and Phase 4 are not complete until their artifacts pass their gates. A failing score, missing evidence, broken static check, stale gap, placeholder row, weak implementation, or weak unit-test decision means stay in the same phase, repair the work, update the artifact, rescore, and repeat. Do not stop or ask the user to continue when a local repair is available.

## Implementation Authority

Implementation authority is:

1. the task body
2. target repo instructions, especially the task-relevant development rules extracted from `AGENTS.md`
3. Phase 1 research and implementation plan
4. existing repo contracts, route patterns, service boundaries, components, and unit-test structure

If implementation discovers that the Phase 1 plan is wrong, record the plan change in the current phase artifact and cite the file or runtime evidence that forced the change. Return to Phase 1 only when the original research is no longer adequate.

## Gap Ledger Invariant

`task-workflow/open-gaps.md` is part of every Phase 2, Phase 3, and Phase 4 gate.

- Record required work that is skipped, blocked, deferred, or discovered late.
- Give every gap a status, owner or next phase, and evidence.
- When a later phase closes a gap, update `open-gaps.md` in that same phase. Do not leave the gap `Open` and only claim resolution in the phase artifact.
- Template placeholder rows such as `Pending | Pending | Pending` are not valid ledger evidence after Phase 0. Replace them with real gap rows or explicit `None currently recorded` rows.
- Before promotion, re-open `open-gaps.md` and verify that no critical gap remains open and no passed phase is listed as the next action for an open gap.

## Progress Ledger Invariant

`task-workflow/progress.md` is part of every Phase 2, Phase 3, and Phase 4 resume path.

- Read it after compaction before choosing the next action.
- Keep it current after each meaningful Phase 2 work packet, Phase 3 gap-closure pass, Phase 4 check/fix loop, blocker, gate result, and phase promotion.
- It must summarize enough context from earlier phases to continue without conversation memory: task goal, key repo instructions, implementation direction, active work queue, latest checks, and next local action.
- Its Current Phase Pointers must identify the current phase artifact, current reference, next local action, and only high-signal active files needed to resume immediately.
- Its Phase Artifact Index and Artifact Pointers must point to the phase-owned artifacts where detailed researched-file, edited-file, check/log, and test evidence lives.
- If `progress.md` says a later phase than the earliest failing phase artifact, the phase artifact wins. Correct `CURRENT_PHASE.txt` and `progress.md`, then continue from the earliest failing phase.

## Code And Phase Boundary Discipline

Follow the target repo's code rules and the task-relevant development rules extracted from `AGENTS.md`. Do not make the task pass by weakening code quality.

- Prefer existing contracts, schemas, route patterns, services, and local test structure when a test phase actually owns coverage work.
- Avoid broad unsafe type assertions such as `as never`, `as any`, or equivalent type erasure unless a narrow repo-specific boundary genuinely requires it and the artifact explains why.
- Do not silence lint, type, or runtime warnings introduced by this task.
- Phase 2 owns implementation work. Defer unit, E2E, and browser verification work to the owning later phases.
- Phase 3 owns connected-place repair, implementation integrity review, and typecheck/lint/build. Record unit/E2E coverage questions for the owning later phase.
- Phase 4 owns unit-test coverage decisions. It may add, update, remove, or skip unit/service/component/integration-style tests and must record why.
- Phase 6 owns E2E coverage decisions. Do not move E2E add/update/remove work into Phase 2, Phase 3, or Phase 4.
- If coverage work happens before its owning phase, treat it as early evidence to be reconciled. Carry the diff and command output into Phase 4 or Phase 6; do not fail the workflow solely because the evidence was produced early.

## Tool And Command Discipline

These phases must not stall on unbounded tools.

- After every gate-relevant file write or patch, read back the target file or inspect the diff before relying on the change.
- If a write, patch, generated file, or command result is invalid, partial, missing, or uncertain, repair that exact issue before starting the next packet.
- Use bounded commands for checks and tests. If a command appears hung or idle, stop it, record the evidence, and continue with the next local recovery path.
- Do not run long-lived dev servers, watchers, or interactive CLIs in the foreground as the active command. If a server is needed before Phase 5 for an API/runtime probe, use `task-workflow/scripts/server-probe.mjs`. Server readiness is usually 5-10 seconds; use 15-20 seconds as the normal budget and 30 seconds as the maximum startup-readiness limit. Do not use a 120 second readiness budget for server startup.
- Use this helper shape for manual API/runtime probes. Pass a foreground server command; do not add `&`, `nohup`, `disown`, process-name cleanup, or fixed sleeps around it.

```bash
node task-workflow/scripts/server-probe.mjs \
	--server "PORT=8080 node build/server/start.js" \
	--ready-url "http://127.0.0.1:8080/health" \
	--ready-timeout-ms 20000 \
	--run "curl -fsS http://127.0.0.1:8080/health"
```

- `server-probe.mjs` captures the server PID, writes `task-workflow/runtime/server-probe.pid`, preserves server output in `task-workflow/runtime/server-probe.log`, runs each `--run` command only after readiness, writes run logs as `task-workflow/runtime/server-probe-run-*.log`, and stops only the captured PID/process group.
- If server readiness is not proven before the timeout, treat startup as failed, cite the helper's log evidence, and retry only with a corrected helper invocation or implementation change. If the helper reports that the ready URL already responds before startup, do not kill unknown processes; pick a task-owned port or stop the exact known PID outside the helper with evidence. Broad process-name cleanup is only for explicit sandbox-owned recovery when PID/port cleanup is impossible and the artifact records why.
- Phase 2 may run narrow non-test checks only when needed to unblock implementation or prove a specific work packet. Defer routine typecheck, lint, build, unit/Vitest, E2E, Playwright, and repo combined check commands such as `pnpm run check` to owning later phases. If a compile/type issue blocks the current packet, `pnpm run check` or an equivalent combined static command is allowed only with blocker/result evidence. Keep Phase 2 evidence strict through artifact updates, readback, diff review, targeted search, and any narrow non-test unblock command that was actually needed.
- Phase 3 owns the normal ordered static/build checkpoint after the implementation, connected-place sweep, and integrity review: typecheck, then lint, then build. Each command must run only after the prior command is passing unless the target repo combines them in one documented command.
- Phase 4 owns unit-test commands. Phase 5 owns interactive browser verification. Phase 6 owns E2E coverage decisions. If Phase 2 or Phase 3 discovers unit/E2E/browser work may be needed, record it for the owning phase and continue the ordered gates.

## Unit Test Coverage Discipline

Phase 4 owns the final unit-level add/update/remove/skip decision for Phase 2-4 work.

- First decide whether unit-level coverage is warranted. If the change is small, visual-only, incidental, or adequately proven by Phase 3 static checks and Phase 5 browser verification, record `N/A` and do not create a test.
- Unit tests belong to stable core behavior: shared logic, contracts, permissions, critical state machines, parsers, calculations, data transforms, central stores, or reusable components whose behavior must stay strict.
- Do not add unit tests for every simple component, incidental click, styling change, copy change, color change, spacing/layout tune, or one-off branch.
- Inspect existing unit/service/component/integration-style tests that touch the changed behavior. Decide whether each should be preserved, updated, removed, or left unrelated.
- Remove existing tests when they are unnecessary, obsolete, convoluted, brittle, or protect non-core/non-complex behavior. Record why removal improves the test suite and preserve any useful coverage elsewhere if needed.
- Prefer the smallest useful unit-level command that proves the warranted coverage decision. Avoid broad unit directory globs unless the artifact explains why a connected unit area must run together.
- A broad/full unit or Vitest suite may be used only as one final sanity check after warranted targeted and connected unit-level tests pass, or when the target repo explicitly requires it for this exact task, the task explicitly asks for it, global/shared infrastructure changed, or targeted/connected output is incomplete or stale.
- Do not start with a full unit/Vitest suite unless the target repo explicitly requires it for this exact task or the artifact records a concrete global/shared reason that makes targeted-first impossible.
- If a full unit/Vitest suite is justified and fails, inspect the failure and rerun the smallest failing or affected command. Do not immediately rerun the full suite.
- Record every meaningful unit-level command in the Phase 4 artifact with its scope, why that scope was selected, any previous related failure, what changed since that failure, outcome, and next action. If no unit command is warranted, record `N/A` and the reason.
- Do not rerun tests only for confidence. Rerun when related implementation changed, the test changed, config/environment changed, previous output was incomplete/stale, or the next run gathers a narrower diagnostic needed to fix a real failure.
- Before rerunning the exact same failing command, record what changed since the previous run or what new evidence the rerun will collect. If nothing changed and the previous output is complete, inspect logs/state/output first, then change the implementation, test, command scope, or diagnostic strategy before running again.
- When a failure appears pre-existing, order-dependent, or unrelated, keep the command scope narrow. Use the failing test/spec, logs, DOM/state, trace, screenshot, or persisted data evidence to prove the classification; do not run a full suite just to discover the global state.
- If a command timed out or returned partial output, preserve or cite the useful output before choosing the next command.

## Ordered Static And Build Checkpoint

Phase 3 is the default checkpoint for typecheck, lint, and build.

- Complete Phase 2 implementation packets first, including only warranted docs edits, while preserving packet-level evidence.
- In Phase 3, inspect connected places first. If the task changed a contract, data shape, route, component, store, permission, migration, fixture, test helper, or shared UI pattern, find the connected callers/surfaces and update or defend them before static/build validation.
- Run typecheck, then lint, then build. If the repo has a single command that combines these, record the combined command and its order instead of inventing duplicate commands.
- When a command fails, inspect enough output to identify every visible issue group by file, contract, or root cause. Do not rely on truncated `tail`/`head` output as the only evidence if it can hide issue groups. If output is too large, use focused searches, reporter options, or a temporary full-output log; delete any temporary full-output log after extracting issue groups. Record issue groups, fixes, and rerun reason in the artifact, not large pasted logs.
- Before rerunning the same typecheck, lint, or build command, fix every locally-fixable issue group visible from the prior output. Do not fix one line or one file and rerun while other visible related groups remain unhandled.
- After typecheck passes, move to lint. After lint passes, move to build. After build passes, record the reusable build evidence: command, output/log path, and the source/config/package/build inputs it depends on.
- Later phases reuse the Phase 3 build result unless code, config, package/dependency files, migrations/build inputs, or generated assets changed after that build, or unless the previous output is missing, partial, stale, or incompatible with the verification command. Do not run a later build as phase preparation, final confirmation, or because E2E is starting; use the recorded Phase 3 build output.
- If a later phase changes code, return to the earliest affected phase, update artifacts, and rerun the relevant ordered command from the first invalidated point. Do not rerun build only for confidence when the Phase 3 build evidence is still current.

## Execution Order

Follow the ordered implementation plan from `task-workflow/phase-1-task-research.md`.

If the task touches multiple layers, prefer this order unless the repo architecture demands a different one:

1. contracts and schema changes
2. persistence or data access changes
3. service or API route changes
4. frontend data access and state wiring
5. route/page/component implementation
6. docs required by changed behavior
7. docs required by changed behavior

Record deviations in the phase artifact. Do not backfill the checklist after coding without evidence.

During Phase 2, artifact updates are incremental, not end-of-phase cleanup. Do not batch the whole implementation and then fill `phase-2-execution.md` later.

## Turn Continuity During Execution

After every edit, search, command, typecheck, lint run, migration command, or unit-test command in Phase 2, Phase 3, or Phase 4:

1. Re-check `task-workflow/CURRENT_PHASE.txt`.
2. Re-open the current phase artifact.
3. If the current phase artifact still says `Decision: Fail`, still has `Pending` gate evidence, or still has score `0/...`, immediately perform the next local repair, command, or artifact update.
4. Do not return control to the user with a narrative checkpoint while the next local workflow action is available.

Examples of invalid turn endings:

- ending after "typecheck passes" while lint, build, artifact scoring, or promotion remains
- ending after writing route files while Phase 2 execution log is still blank
- ending after static checks while Phase 4 gate rows still say `Pending`
- ending with Phase 2/3/4 artifact score `0/...`

The run may only stop in this workstream if Phase 4 has passed and the marker has advanced to Phase 5, or if a real external blocker is recorded with evidence.

## Phase 2 Work Packet Discipline

Phase 2 must be executed as small auditable work packets.

One work packet is at most:

- one ordered implementation-plan row, or
- one cohesive file group such as contracts, schema+migration, query+service pair, route registration, one route page, or one implementation check/fix loop.

After each packet:

1. Update `task-workflow/phase-2-execution.md` immediately.
2. Update `task-workflow/progress.md` with the packet summary, current phase pointers, any high-signal active files needed for immediate resume, and next local action.
3. Mark the relevant execution-log row `Done`, `In progress`, `Blocked`, or `Moved to gap`.
4. Cite concrete files changed.
5. Cite readback, diff evidence, targeted search, or a narrow non-test unblock command proving the packet's state. Defer routine typecheck, lint, build, unit tests, E2E, and Playwright verification to their owning later phases unless a compile/type command was needed to unblock that specific packet.
6. Update `task-workflow/open-gaps.md` immediately if the packet leaves work open.
7. If any write or command failed, repair it and read back the affected file before continuing.
8. Then continue to the next packet.

Do not start frontend route work while backend/schema/service packets are complete but still recorded as `Pending`.
Do not start Phase 4 or Phase 6 test work while implementation packets are complete but still recorded as `Pending`.
Do not run broad verification or launch the app while the Phase 2 execution log still has only template-default `Pending` rows.
Do not create E2E tests or standalone Playwright verification scripts while Phase 2 is still failing.

If source files have been edited and `phase-2-execution.md` still has a blank or all-`Pending` execution log, the next action must be updating the Phase 2 artifact, not more coding.

## Phase 2: Primary Execution

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-2-execution`.
2. Re-open `task-workflow/CURRENT_PHASE.txt` and confirm it says `phase-2-execution` before editing implementation files.
3. Keep the Phase 2 start checkpoint section in `task-workflow/phase-2-execution.md`; fill it before scoring the Phase 2 gate.
4. Execute the Phase 1 plan in order, one auditable work packet at a time.
5. Keep changes scoped to the task.
6. Reuse existing contracts, patterns, components, services, and route shapes.
7. Update docs when the task logically changes documentation.
8. Do not write, update, remove, or run unit/Vitest, E2E, or Playwright tests in Phase 2.
9. Immediately after each packet, record the completed or in-progress implementation step with file evidence before starting the next packet.
10. Record any skipped, blocked, or deferred step in `task-workflow/open-gaps.md`.
11. Replace `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows before scoring the gate.
12. Update `task-workflow/progress.md` before scoring and before promotion, pointing to `task-workflow/phase-2-execution.md` for the full edited-file list and keeping only high-signal active files in progress.
13. Do not run final signoff from this phase.
14. After the Phase 2 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-3-second-execution`.
15. Update `task-workflow/progress.md` so current phase and next local action match Phase 3.

## Phase 2 Score

Score `task-workflow/phase-2-execution.md` against `40` items:

- `10` implementation-plan completion items
- `8` repo-pattern reuse items
- `8` behavior and data wiring items
- `6` docs and phase-boundary items
- `4` scope-control items
- `4` artifact evidence items

Critical failures:

- implementation files changed while `CURRENT_PHASE.txt` still says `phase-0-artifact-reset` or `phase-1-task-research`
- Phase 2 gate passes while the phase start checkpoint is missing or still pending
- Phase 2 source files are edited while the execution log remains blank or all `Pending`
- Phase 2 work progresses while `task-workflow/progress.md` still has template-default `Pending` rows for the current phase, active work queue, or next local action
- multiple implementation packets are completed while their execution-log rows still say `Pending`
- failed or uncertain write/edit result is ignored instead of repaired and read back
- long-lived command, watcher, or dev server is left running in the foreground until the session stalls
- Phase 2 runs `pnpm run check` or an equivalent combined typecheck/lint/build command without a concrete compile/type blocker recorded before the command
- required planned step missing without an open-gap entry
- implementation bypasses existing repo contracts or boundaries without evidence
- visible task behavior left fake or placeholder
- broken import, undefined symbol, or unfinished marker remains
- changed files do not match the researched plan and no plan-change evidence exists
- broad unsafe casts or warning suppression introduced without a narrow evidence-backed reason

Pass gate:

- score is at least `34/40`
- every critical execution item passes
- all planned required steps are done or explicitly moved to open gaps with a reason
- changed files match the researched plan or the artifact explains why the plan changed
- no obvious placeholder, dead code, broken import, or unfinished task marker remains
- all gate-relevant writes have readback or diff evidence
- no unbounded foreground server/watcher command is still running

If this gate fails, stay in Phase 2.

A failing Phase 2 artifact is not a stopping state. Fix the implementation or artifact evidence, rerun the Phase 2 gate, and continue only after the artifact records a real pass.

## Phase 3: Second Execution, Integrity, And Static Checks

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-3-second-execution`.
2. Re-read the task, Phase 1 plan, Phase 2 artifact, and open gaps.
3. Review the implementation as if continuing someone else's work.
4. Find missing routes, missing actions, weak wiring, incomplete state, fragile data flow, stale docs, and accidental scope creep.
5. Review associated surfaces for consistency. If a UI element was changed in one place, find similar UI elements and update or explicitly defend consistency. If an API/service/schema change enables one flow, verify other callers, routes, mutations, queries, permissions, and docs that share that contract are covered.
6. Review code integrity: imports, symbols, route/action wiring, schema/data shapes, state transitions, extracted `AGENTS.md` rules, unrelated edit risk, unsafe casts, warnings, and lasting `console.*`.
7. Use code inspection, artifact review, targeted search, and narrow file/state checks for the second pass. Do not write, update, remove, or run unit/Vitest or E2E tests in Phase 3.
8. Close every gap that can be closed from local context.
9. Run the ordered static/build checkpoint: typecheck, lint, build. For each failure, identify visible issue groups, fix every locally-fixable group together, and rerun that same command before moving to the next command. If a temporary full-output log was needed to triage a large failure, delete it after extracting issue groups.
10. Record reusable build evidence after a passing build, including when later phases may reuse it and what would invalidate it.
11. Update `task-workflow/open-gaps.md` after each gap is closed or defended.
12. Update `task-workflow/progress.md` with the second-pass findings, associated-surface review, integrity review, ordered check results, reusable build evidence, gap state, a pointer to `task-workflow/phase-3-second-execution.md` for repair-file details, and next local action.
13. Record a second-pass diff review with file evidence.
14. After the Phase 3 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-4-integrity-review`.
15. Update `task-workflow/progress.md` so current phase and next local action match Phase 4.

Phase 3 is mandatory. It is not a polish pass that can be skipped because Phase 2 seemed complete.

## Phase 3 Score

Score `task-workflow/phase-3-second-execution.md` against `30` items:

- `8` task-alignment review items
- `6` route/action/data wiring review items
- `5` missing behavior and edge-flow items
- `5` associated-surface consistency items
- `3` docs and phase-boundary items
- `3` gap-ledger quality items

Critical failures:

- critical open gap remains unresolved
- second-pass artifact only repeats Phase 2 claims without independent review
- a missing task requirement is found and not fixed or recorded
- associated UI/API/data surfaces were not reviewed for consistency after a related change
- a related surface was found inconsistent and neither fixed nor defended with evidence
- Phase 3 passed without current typecheck, lint, and build evidence, or without a recorded repo-specific reason one of those commands does not exist
- Phase 3 reran typecheck, lint, or build before all visible locally-fixable issue groups from the prior output were handled
- Phase 3 kept a temporary full-output static/build log after extracting issue groups, or relied only on truncated output while issue groups may have been hidden
- Phase 3 failed to record reusable build evidence after a passing build
- Phase 3 failed to record implementation integrity review evidence
- changed app/server source still contains `console.*` outside the active Phase 5 debug loop
- remaining gap has no reason, owner, or next action

Pass gate:

- score is at least `24/30`
- every critical second-pass item passes
- no unresolved critical gap remains
- associated UI/API/data surfaces have been reviewed, fixed where needed, or explicitly defended
- implementation integrity review is recorded and clean
- typecheck, lint, and build have passed in order, or missing commands have repo-specific evidence
- reusable build evidence and invalidation conditions are recorded
- every remaining non-critical gap has a concrete reason and owner
- `task-workflow/open-gaps.md` is current after the second pass
- implementation still matches the task scope

If this gate fails, stay in Phase 3.

A failing Phase 3 artifact is not a stopping state. Continue the second-pass review, close or properly record gaps, rerun the gate, and continue only after the artifact records a real pass.

## Phase 4: Unit Test Coverage Decision And Verification

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-4-integrity-review`.
2. Re-open Phase 3 ordered static/build and integrity evidence. Confirm it is current. If code, config, package/dependency files, migrations/build inputs, or generated assets changed after Phase 3, return to Phase 3 and rerun the invalidated sequence from the first affected point. Do not rerun typecheck, lint, or build inside Phase 4 when Phase 3 evidence is current.
3. Inspect existing unit, service, component, and integration-style tests that touch the changed behavior, nearby contracts, central logic, or modified components.
4. Decide whether unit-level coverage is warranted. Use `N/A` when no unit-level test is needed.
5. Add tests only for stable core behavior, shared logic, contracts, permissions, critical state machines, parsers, calculations, data transforms, central stores, or reusable components whose behavior must stay strict.
6. Update existing tests when they already own warranted behavior and still provide useful coverage.
7. Remove tests when they are unnecessary, obsolete, convoluted, brittle, or protect non-core/non-complex behavior. Record the removal reason and diff/readback evidence. Preserve useful assertions elsewhere only when the behavior is still core.
8. Run only the warranted unit-level commands. Use the smallest useful targeted command first. Use broad/full unit or Vitest only as a final sanity or explicit exception with an artifact reason.
9. Inspect failures and fix root causes. Before rerunning the same command, record what changed or what new diagnostic evidence the rerun will collect.
10. Record the coverage decision, existing tests inspected, tests added, tests updated, tests removed, command output or `N/A`, failure/fix/rerun evidence, and remaining unit coverage gaps.
11. Update `task-workflow/open-gaps.md` for any remaining unit-test coverage gap.
12. Update `task-workflow/progress.md` with the unit coverage decision, command results, removed-test rationale, a pointer to `task-workflow/phase-4-integrity-review.md` for details, and next local action.
13. Confirm no unit test command or watcher remains running in the foreground from Phase 4.
14. After the Phase 4 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-5-playwright-verification`.
15. Update `task-workflow/progress.md` so current phase and next local action match Phase 5.

## Phase 4 Score

Score `task-workflow/phase-4-integrity-review.md` against `30` items:

- `8` unit coverage decision items
- `6` existing-test review items
- `6` add/update/remove quality items
- `5` command execution or `N/A` evidence items
- `5` artifact/gap evidence items

Critical failures:

- unit coverage decision is missing, vague, or not tied to changed behavior and risk
- existing relevant unit/service/component/integration tests were not inspected before adding new tests
- new unit test added for small fixes, visual-only changes, incidental UI behavior, trivial button wiring, or non-core/non-complex behavior without a concrete risk reason
- existing useful test deleted without preserving still-core coverage or defending why the behavior is no longer core
- unnecessary, obsolete, convoluted, brittle, or non-core/non-complex tests remain after Phase 4 identifies them as removable
- test removal lacks reason, diff/readback evidence, or effect on remaining coverage
- warranted unit-level test was not run
- unit command failure caused by this task remains unfixed
- artifact records a pass for a required unit command without exact command output or cited repo-local log
- broad/full unit or Vitest command is run before warranted targeted/connected unit-level tests, repeated after a clean pass, or run without a concrete artifact reason
- typecheck, lint, or build is rerun in Phase 4 while Phase 3 evidence is current and no invalidating change is recorded
- tests are rerun only for confidence, or the same failing test command is rerun blindly without a material change, output-staleness, or diagnostic justification
- test command, server, or watcher is left running without bounded cleanup
- file edits that matter to the gate have no readback or diff evidence

Pass gate:

- score is at least `28/30`
- every critical unit-test coverage item passes
- Phase 3 ordered typecheck/lint/build evidence is current, or invalidated commands were rerun from the first affected point
- unit coverage decision is recorded, including `N/A` when no unit-level test is warranted
- existing relevant unit-level tests were inspected before add/update/remove decisions
- unit tests were added, updated, removed, or skipped according to the coverage decision
- removed tests have a recorded rationale and readback/diff evidence
- warranted unit commands pass, no unit command was warranted, or unrelated failures are evidenced
- no unbounded foreground unit command remains active

If this gate fails, stay in Phase 4.

A failing Phase 4 artifact is not a stopping state. If the unit coverage decision is weak, warranted tests fail, unnecessary tests remain, gap-ledger rows are stale, or gate rows are still `Pending`, fix the tests or artifact evidence, rerun the relevant unit command when warranted, rescore, and keep looping. Do not produce a final response from Phase 4 unless an external blocker has been fully recorded with evidence and cannot be solved locally.

## Promotion Rule

Phase 5 is blocked until Phase 4 passes in writing.

Before setting `task-workflow/CURRENT_PHASE.txt` to any later phase marker, re-open all prior phase artifacts through the current phase.

Promotion requirements:

- every prior phase artifact has `Decision: Pass`
- the current phase artifact has `Decision: Pass`
- every required score meets its threshold
- all critical items pass
- no required evidence table is still a template placeholder
- no required gate row still says `Pending`
- `task-workflow/open-gaps.md` has no placeholder `Pending` rows
- `task-workflow/open-gaps.md` has no stale open gap owned by a passed phase
- no critical gap remains open
- `task-workflow/progress.md` matches the next phase and contains a current next local action

If any artifact fails this check, do not advance the marker. Set `task-workflow/CURRENT_PHASE.txt` to the earliest failing phase and continue there.

Static checks are necessary but not sufficient. A green build does not replace interactive Playwright verification.

Do not stop after Phase 2, Phase 3, or Phase 4 to summarize progress or wait for approval. The written gates decide whether to continue, rework, or return to an earlier phase without user intervention.
