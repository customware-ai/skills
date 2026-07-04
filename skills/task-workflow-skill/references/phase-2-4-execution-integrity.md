# Execution And Integrity

Use this reference for Phase 2, Phase 3, and Phase 4.

These phases turn the accepted research plan into working code, then force a second implementation pass and an integrity gate before browser verification begins. They are internal build gates, not user confirmation points. When a gate passes, continue automatically. When a gate fails, fix the work and rerun the gate automatically. Do not end an OpenCode turn while Phase 2, Phase 3, or Phase 4 is unblocked and the current phase artifact still says `Decision: Fail`.

This is a looped gate workstream: Phase 2, Phase 3, and Phase 4 are not complete until their artifacts pass their gates. A failing score, missing evidence, broken check, stale gap, placeholder row, or weak implementation means stay in the same phase, repair the work, update the artifact, rescore, and repeat. Do not stop or ask the user to continue when a local repair is available.

## Implementation Authority

Implementation authority is:

1. the task body
2. target repo instructions, especially the task-relevant development rules extracted from `AGENTS.md`
3. Phase 1 research and implementation plan
4. existing repo contracts, route patterns, service boundaries, components, and test structure

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

## Code And Coverage Discipline

Follow the target repo's code rules and the task-relevant development rules extracted from `AGENTS.md`. Do not make the task pass by weakening code quality.

- Prefer existing contracts, schemas, route patterns, services, and test structure.
- Avoid broad unsafe type assertions such as `as never`, `as any`, or equivalent type erasure unless a narrow repo-specific boundary genuinely requires it and the artifact explains why.
- Do not silence lint, type, or runtime warnings introduced by this task.
- Do not delete existing tests just because they fail after the new task. Migrate, replace, or document why the old coverage no longer represents valid behavior.

## Tool And Command Discipline

These phases must not stall on unbounded tools.

- After every gate-relevant file write or patch, read back the target file or inspect the diff before relying on the change.
- If a write, patch, generated file, or command result is invalid, partial, missing, or uncertain, repair that exact issue before starting the next packet.
- Use bounded commands for checks and tests. If a command appears hung or idle, stop it, record the evidence, and continue with the next local recovery path.
- Do not run long-lived dev servers, watchers, or interactive CLIs in the foreground as the active command. If a server is needed before Phase 5, start it in the background with a PID/log, verify readiness from a separate bounded command with a clear timeout, and kill it after the check.
- If server readiness is not proven before the timeout, treat startup as failed, capture the log evidence, stop the recorded PID/process group from the startup command, and retry only from a clean startup command. If the PID is unknown, use the narrowest bounded cleanup command that targets only the repo's dev server. Never leave a Node server running after a failed or uncertain startup.
- Phase 2 may run focused static checks, unit tests, and build checks needed for implementation feedback. It must not treat interactive Playwright verification or E2E creation as a substitute for the Phase 2 gate.
- Phase 5 interactive browser verification and Phase 6 durable E2E coverage belong to their own phases. If Phase 2 discovers browser/E2E work is needed, record the gap and continue the ordered gates.

## Test Selection And Retry Discipline

Phase 4 checks must prove the implementation without turning validation into a blind retry loop.

- Prefer the smallest useful command that can prove or disprove the current risk.
- For changed service, query, schema, or pure logic, run targeted unit/service tests first.
- For changed route, component, store, or UI state logic, run targeted route/component tests first.
- For changed shared contracts, test setup, global fixtures, routing configuration, or app-wide behavior, broader affected suites are allowed.
- Full or broad Vitest runs are allowed only when a shared/global change justifies them, targeted failures do not identify the affected scope, final repo instructions require them, or the artifact records another concrete reason.
- Record every meaningful check/test command in the Phase 4 artifact with its scope, why that scope was selected, any previous related failure, what changed since that failure, outcome, and next action.
- Do not rerun the exact same failing command unless implementation, test, config, environment, or diagnostic conditions changed, or the previous output was incomplete and a narrower diagnostic command is not available.
- The same failing command may run at most twice without a material change. On the third attempt, first inspect the failure output and change the implementation, test, command scope, or diagnostic strategy.
- If a command timed out or returned partial output, preserve or cite the useful output before choosing the next command.

## Execution Order

Follow the ordered implementation plan from `task-workflow/phase-1-task-research.md`.

If the task touches multiple layers, prefer this order unless the repo architecture demands a different one:

1. contracts and schema changes
2. persistence or data access changes
3. service or API route changes
4. frontend data access and state wiring
5. route/page/component implementation
6. focused tests
7. docs required by changed behavior

Record deviations in the phase artifact. Do not backfill the checklist after coding without evidence.

During Phase 2, artifact updates are incremental, not end-of-phase cleanup. Do not batch the whole implementation and then fill `phase-2-execution.md` later.

## Turn Continuity During Execution

After every edit, search, command, typecheck, lint run, migration command, or test run in Phase 2, Phase 3, or Phase 4:

1. Re-check `task-workflow/CURRENT_PHASE.txt`.
2. Re-open the current phase artifact.
3. If the current phase artifact still says `Decision: Fail`, still has `Pending` gate evidence, or still has score `0/...`, immediately perform the next local repair, command, or artifact update.
4. Do not return control to the user with a narrative checkpoint while the next local workflow action is available.

Examples of invalid turn endings:

- ending after "typecheck passes" while lint, tests, artifact scoring, or promotion remains
- ending after writing route files while Phase 2 execution log is still blank
- ending after static checks while Phase 4 gate rows still say `Pending`
- ending with Phase 2/3/4 artifact score `0/...`

The run may only stop in this workstream if Phase 4 has passed and the marker has advanced to Phase 5, or if a real external blocker is recorded with evidence.

## Phase 2 Work Packet Discipline

Phase 2 must be executed as small auditable work packets.

One work packet is at most:

- one ordered implementation-plan row, or
- one cohesive file group such as contracts, schema+migration, query+service pair, route registration, one route page, one test file, or one check/fix loop.

After each packet:

1. Update `task-workflow/phase-2-execution.md` immediately.
2. Update `task-workflow/progress.md` with the packet summary, current phase pointers, any high-signal active files needed for immediate resume, and next local action.
3. Mark the relevant execution-log row `Done`, `In progress`, `Blocked`, or `Moved to gap`.
4. Cite concrete files changed.
5. Cite the command, typecheck result, readback, or diff evidence proving the packet's state.
6. Update `task-workflow/open-gaps.md` immediately if the packet leaves work open.
7. If any write or command failed, repair it and read back the affected file before continuing.
8. Then continue to the next packet.

Do not start frontend route work while backend/schema/service packets are complete but still recorded as `Pending`.
Do not start tests while implementation packets are complete but still recorded as `Pending`.
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
7. Update tests or docs when the task logically changes behavior or documentation.
8. Immediately after each packet, record the completed or in-progress implementation step with file evidence before starting the next packet.
9. Record any skipped, blocked, or deferred step in `task-workflow/open-gaps.md`.
10. Replace `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows before scoring the gate.
11. Update `task-workflow/progress.md` before scoring and before promotion, pointing to `task-workflow/phase-2-execution.md` for the full edited-file list and keeping only high-signal active files in progress.
12. Do not run final signoff from this phase.
13. After the Phase 2 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-3-second-execution`.
14. Update `task-workflow/progress.md` so current phase and next local action match Phase 3.

## Phase 2 Score

Score `task-workflow/phase-2-execution.md` against `40` items:

- `10` implementation-plan completion items
- `8` repo-pattern reuse items
- `8` behavior and data wiring items
- `6` test/doc update items
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
- Phase 2 tries to satisfy Phase 5 or Phase 6 verification instead of completing the Phase 2 gate
- required planned step missing without an open-gap entry
- implementation bypasses existing repo contracts or boundaries without evidence
- visible task behavior left fake or placeholder
- broken import, undefined symbol, or unfinished marker remains
- changed files do not match the researched plan and no plan-change evidence exists
- existing tests deleted without replacement coverage or written defense
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

## Phase 3: Second Execution And Gap Closure

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-3-second-execution`.
2. Re-read the task, Phase 1 plan, Phase 2 artifact, and open gaps.
3. Review the implementation as if continuing someone else's work.
4. Find missing routes, missing actions, weak wiring, incomplete state, fragile data flow, untested behavior, stale docs, and accidental scope creep.
5. Review associated surfaces for consistency. If a UI element was changed in one place, find similar UI elements and update or explicitly defend consistency. If an API/service/schema change enables one flow, verify other callers, routes, mutations, queries, permissions, tests, and docs that share that contract are covered.
6. Close every gap that can be closed from local context.
7. Update `task-workflow/open-gaps.md` after each gap is closed or defended.
8. Update `task-workflow/progress.md` with the second-pass findings, associated-surface review, gap state, a pointer to `task-workflow/phase-3-second-execution.md` for repair-file details, and next local action.
9. Record a second-pass diff review with file evidence.
10. After the Phase 3 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-4-integrity-review`.
11. Update `task-workflow/progress.md` so current phase and next local action match Phase 4.

Phase 3 is mandatory. It is not a polish pass that can be skipped because Phase 2 seemed complete.

## Phase 3 Score

Score `task-workflow/phase-3-second-execution.md` against `30` items:

- `8` task-alignment review items
- `6` route/action/data wiring review items
- `5` missing behavior and edge-flow items
- `5` associated-surface consistency items
- `3` test/doc gap items
- `3` gap-ledger quality items

Critical failures:

- critical open gap remains unresolved
- second-pass artifact only repeats Phase 2 claims without independent review
- a missing task requirement is found and not fixed or recorded
- associated UI/API/data surfaces were not reviewed for consistency after a related change
- a related surface was found inconsistent and neither fixed nor defended with evidence
- remaining gap has no reason, owner, or next action

Pass gate:

- score is at least `24/30`
- every critical second-pass item passes
- no unresolved critical gap remains
- associated UI/API/data surfaces have been reviewed, fixed where needed, or explicitly defended
- every remaining non-critical gap has a concrete reason and owner
- `task-workflow/open-gaps.md` is current after the second pass
- implementation still matches the task scope

If this gate fails, stay in Phase 3.

A failing Phase 3 artifact is not a stopping state. Continue the second-pass review, close or properly record gaps, rerun the gate, and continue only after the artifact records a real pass.

## Phase 4: Implementation Integrity Review

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-4-integrity-review`.
2. Select the repo's relevant static checks, type checks, build checks, and tests using the Test Selection And Retry Discipline above.
3. Run the selected checks/tests and record the command scope, reason, previous related failure, changed-since-failure evidence, outcome, and next action in the Phase 4 artifact.
4. Inspect failures and fix root causes.
5. Review code for broken imports, undefined symbols, wrong route wiring, schema drift, data-shape drift, stale mocks, and accidental unrelated edits.
6. Review the implementation against the extracted `AGENTS.md` development rules from Phase 1.
7. Inspect changed app/server source for `console.*`. Temporary `console.*` is allowed only during Phase 5 interactive testing when it directly helps debug browser/runtime behavior by reading console output. Before Phase 4 passes, remove those temporary logs or replace lasting logging with the repo-approved logging/telemetry path.
8. Review docs updates when behavior or workflow changed.
9. Record commands, outputs, fixes, console/logging review, and final status.
10. Update `task-workflow/progress.md` with latest check results, fixed issues, a pointer to `task-workflow/phase-4-integrity-review.md` for check/fix details, and next local action.
11. Confirm no app server, watcher, or check command remains running in the foreground from Phase 4.
12. After the Phase 4 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-5-playwright-verification`.
13. Update `task-workflow/progress.md` so current phase and next local action match Phase 5.

## Phase 4 Score

Score `task-workflow/phase-4-integrity-review.md` against `30` items:

- `8` command/check execution items
- `6` import and symbol integrity items
- `6` route/action/schema/data-shape items
- `4` test and docs alignment items
- `3` unrelated-edit review items
- `3` artifact evidence items

Critical failures:

- required check not run and no valid reason recorded
- check failure caused by this task remains unfixed
- runtime-blocking issue remains
- test/check command selection is not recorded with scope and reason
- broad/full test command is run without a concrete artifact reason
- same failing test command is rerun blindly without material change or incomplete-output justification
- lint/type warnings introduced by this task remain unresolved or undefended
- unsafe type assertions are used to bypass a contract that should be modeled directly
- implementation violates an extracted `AGENTS.md` development rule
- changed app/server source still contains `console.*` outside the active Phase 5 debug loop
- unrelated edit risk not reviewed
- artifact claims passing checks without command evidence
- check command, server, or watcher is left running without bounded cleanup
- file edits that matter to the gate have no readback or diff evidence

Pass gate:

- score is at least `28/30`
- every critical integrity item passes
- required repo checks pass or any remaining failure is unrelated and documented with evidence
- test/check command selection and retry evidence is recorded
- no known runtime-blocking issue remains
- no known violation of extracted `AGENTS.md` development rules remains
- no changed app/server source contains `console.*` outside the active Phase 5 debug loop
- no unbounded foreground command remains active

If this gate fails, stay in Phase 4.

A failing Phase 4 artifact is not a stopping state. If checks fail, warnings remain from changed code, gap-ledger rows are stale, or gate rows are still `Pending`, fix the code or artifact evidence, rerun the relevant checks, rescore, and keep looping. Do not produce a final response from Phase 4 unless an external blocker has been fully recorded with evidence and cannot be solved locally.

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
