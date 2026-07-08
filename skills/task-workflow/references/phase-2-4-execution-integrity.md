# Execution And Integrity

Use this reference for Phase 2, Phase 3, and Phase 4.

These phases turn the accepted research plan into working code, then force a second implementation pass and an integrity gate before browser verification begins. They are internal build gates, not user confirmation points. When a gate passes, continue automatically. When a gate fails, fix the work and rerun the gate automatically. Do not end an OpenCode turn while Phase 2, Phase 3, or Phase 4 is unblocked and the current phase artifact still says `Decision: Fail`.

This is a looped gate workstream: Phase 2, Phase 3, and Phase 4 are not complete until their artifacts pass their gates. A failing score, missing evidence, broken check, stale gap, placeholder row, or weak implementation means stay in the same phase, repair the work, update the artifact, rescore, and repeat. Do not stop or ask the user to continue when a local repair is available.

## Implementation Authority

Implementation authority is:

1. the task body
2. target repo instructions, especially the task-relevant development rules extracted from `AGENTS.md`
3. Phase 1 research and implementation plan
4. existing repo contracts, route patterns, service boundaries, components, and minimal test structure

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

## Code And Minimal Coverage Discipline

Follow the target repo's code rules and the task-relevant development rules extracted from `AGENTS.md`. Do not make the task pass by weakening code quality.

- Prefer existing contracts, schemas, route patterns, services, and test structure.
- Avoid broad unsafe type assertions such as `as never`, `as any`, or equivalent type erasure unless a narrow repo-specific boundary genuinely requires it and the artifact explains why.
- Do not silence lint, type, or runtime warnings introduced by this task.
- Do not delete existing tests just because they fail after the new task. Migrate, replace, or document why the old coverage no longer represents valid behavior.
- Do not create tests by default. Create or update tests only when the change is large enough, core enough, or risky enough to need durable regression coverage.
- Small fixes, copy changes, color/style changes, spacing/layout tuning, simple button wiring, and minor UI-only changes normally need no new unit, component, integration, or E2E test. Record `N/A` with the reason when no test is warranted.
- Unit tests belong to stable core behavior: shared logic, contracts, permissions, critical state machines, parsers, calculations, or central components whose behavior must stay strict. Do not write unit tests for every simple component, incidental click, visual change, or one-off branch.

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
- Phase 2 may run narrow checks only when needed to unblock implementation or prove a specific work packet. It must not run routine typecheck, lint, build, or repo combined check commands such as `pnpm run check` after edits. `pnpm run check` or an equivalent combined static command is allowed in Phase 2 only when a concrete compile/type issue blocks the current packet and the artifact records that blocker before the command. Keep Phase 2 evidence strict through artifact updates, readback, diff review, targeted search, and any narrow unblock command that was actually needed.
- Phase 3 owns the normal ordered static/build checkpoint after the implementation and connected-place sweep: typecheck, then lint, then build. Each command must run only after the prior command is passing unless the target repo combines them in one documented command.
- Phase 5 interactive browser verification and the Phase 6 minimal E2E coverage decision belong to their own phases. If Phase 2 discovers browser/E2E work may be needed, record the gap and continue the ordered gates.

## Minimal Test Selection And Retry Discipline

Phase 2, Phase 3, and Phase 4 checks must prove the implementation without turning validation into a blind retry loop, broad-suite habit, or test-writing exercise.

- Prefer the smallest useful command that can prove or disprove the current risk.
- First decide whether any new or updated test is warranted. If the change is small, visual-only, or incidental, record why no test is needed and rely on code review, static/build checks, and Phase 5 interactive verification when UI changed.
- For changed service, query, schema, pure logic, or central state, write or run a targeted unit/service test only when the behavior is core enough to need strict regression protection.
- For changed route, component, store, or UI state logic, write or run a targeted route/component test only when the component or state transition is central, reusable, or risky enough to justify it.
- In Phase 2, stop at the narrow warranted test for the current packet when one is needed; otherwise do not run tests. Do not run broad unit directory globs such as `tests/unit/contracts/ tests/unit/services/ tests/unit/components/` in Phase 2.
- Run connected tests in Phase 4 only when the minimal coverage decision identifies shared contracts, fixtures, routes, stores, or user workflows that need protection before browser verification.
- Phase 3 is primarily inspection and gap closure. It may run a targeted check only after a Phase 3 repair or when one narrow command is needed to prove a specific suspected issue. It must not run full unit/Vitest or full Playwright/E2E as a Phase 3 review tool, global regression check, or "understand current state" command.
- A broad/full unit or Vitest suite may be used only as one final sanity check after minimal warranted targeted and connected tests pass, or when the target repo explicitly requires it for this exact task, the task explicitly asks for it, global/shared infrastructure changed, or targeted/connected output is incomplete or stale.
- Do not start with a full unit/Vitest suite unless the target repo explicitly requires it for this exact task or the artifact records a concrete global/shared reason that makes targeted-first impossible.
- If a full unit/Vitest suite is justified and fails, inspect the failure and rerun the smallest failing or affected command. Do not immediately rerun the full suite.
- Record every meaningful check/test command in the Phase 4 artifact with its scope, why that scope was selected, any previous related failure, what changed since that failure, outcome, and next action. If no test command is warranted, record `N/A` and the reason.
- Do not rerun tests only for confidence. Rerun when related implementation changed, the test changed, config/environment changed, previous output was incomplete/stale, or the next run gathers a narrower diagnostic needed to fix a real failure.
- Before rerunning the exact same failing command, record what changed since the previous run or what new evidence the rerun will collect. If nothing changed and the previous output is complete, inspect logs/state/output first, then change the implementation, test, command scope, or diagnostic strategy before running again.
- When a failure appears pre-existing, order-dependent, or unrelated, keep the command scope narrow. Use the failing test/spec, logs, DOM/state, trace, screenshot, or persisted data evidence to prove the classification; do not run a full suite just to discover the global state.
- If a command timed out or returned partial output, preserve or cite the useful output before choosing the next command.

## Ordered Static And Build Checkpoint

Phase 3 is the default checkpoint for typecheck, lint, and build.

- Complete Phase 2 implementation packets first, including only warranted tests/docs edits, while preserving packet-level evidence.
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
6. minimal warranted tests
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
5. Cite readback, diff evidence, targeted search, or a narrow unblock command proving the packet's state. Defer routine typecheck, lint, and build to the Phase 3 ordered checkpoint unless the command was needed to unblock that specific packet.
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
- Phase 2 runs `pnpm run check` or an equivalent combined typecheck/lint/build command without a concrete compile/type blocker recorded before the command
- Phase 2 runs broad unit directory commands instead of only the new or updated targeted test file needed for the current packet
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
6. Use code inspection, artifact review, targeted search, and narrow file/state checks for the second pass. Do not run full unit/Vitest or full Playwright/E2E in Phase 3. If test execution is needed after a Phase 3 repair, run the smallest warranted command that proves that repair; otherwise record the check to run in Phase 4 or Phase 6.
7. Close every gap that can be closed from local context.
8. Run the ordered static/build checkpoint: typecheck, lint, build. For each failure, identify visible issue groups, fix every locally-fixable group together, and rerun that same command before moving to the next command. If a temporary full-output log was needed to triage a large failure, delete it after extracting issue groups.
9. Record reusable build evidence after a passing build, including when later phases may reuse it and what would invalidate it.
10. Update `task-workflow/open-gaps.md` after each gap is closed or defended.
11. Update `task-workflow/progress.md` with the second-pass findings, associated-surface review, ordered check results, reusable build evidence, gap state, a pointer to `task-workflow/phase-3-second-execution.md` for repair-file details, and next local action.
12. Record a second-pass diff review with file evidence.
13. After the Phase 3 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-4-integrity-review`.
14. Update `task-workflow/progress.md` so current phase and next local action match Phase 4.

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
- Phase 3 used a broad/full unit, Vitest, or Playwright/E2E suite as a review, confidence, or state-discovery command
- Phase 3 passed without current typecheck, lint, and build evidence, or without a recorded repo-specific reason one of those commands does not exist
- Phase 3 reran typecheck, lint, or build before all visible locally-fixable issue groups from the prior output were handled
- Phase 3 kept a temporary full-output static/build log after extracting issue groups, or relied only on truncated output while issue groups may have been hidden
- Phase 3 failed to record reusable build evidence after a passing build
- remaining gap has no reason, owner, or next action

Pass gate:

- score is at least `24/30`
- every critical second-pass item passes
- no unresolved critical gap remains
- associated UI/API/data surfaces have been reviewed, fixed where needed, or explicitly defended
- typecheck, lint, and build have passed in order, or missing commands have repo-specific evidence
- reusable build evidence and invalidation conditions are recorded
- every remaining non-critical gap has a concrete reason and owner
- `task-workflow/open-gaps.md` is current after the second pass
- implementation still matches the task scope

If this gate fails, stay in Phase 3.

A failing Phase 3 artifact is not a stopping state. Continue the second-pass review, close or properly record gaps, rerun the gate, and continue only after the artifact records a real pass.

## Phase 4: Implementation Integrity Review

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-4-integrity-review`.
2. Re-open Phase 3 ordered static/build evidence and confirm it is still current. If code, config, package/dependency files, migrations/build inputs, or generated assets changed after Phase 3, rerun the invalidated command sequence from the first affected point. Do not rerun build only because Phase 4, Phase 5, Phase 6, or Phase 7 is starting.
3. Select any remaining warranted tests using the Minimal Test Selection And Retry Discipline above. Do not rerun typecheck, lint, or build in Phase 4 when Phase 3 evidence is current.
4. Run the selected checks/tests and record the command scope, reason, previous related failure, changed-since-failure evidence, outcome, and next action in the Phase 4 artifact.
5. Inspect failures and fix root causes.
6. Review code for broken imports, undefined symbols, wrong route wiring, schema drift, data-shape drift, stale mocks, and accidental unrelated edits.
7. Review the implementation against the extracted `AGENTS.md` development rules from Phase 1.
8. Inspect changed app/server source for `console.*`. Temporary `console.*` is allowed only during Phase 5 interactive testing when it directly helps debug browser/runtime behavior by reading console output. Before Phase 4 passes, remove those temporary logs or replace lasting logging with the repo-approved logging/telemetry path.
9. Review docs updates when behavior or workflow changed.
10. Record commands, outputs, fixes, console/logging review, Phase 3 build reuse status, and final status.
11. Update `task-workflow/progress.md` with latest check results, fixed issues, Phase 3 build reuse status, a pointer to `task-workflow/phase-4-integrity-review.md` for check/fix details, and next local action.
12. Confirm no app server, watcher, or check command remains running in the foreground from Phase 4.
13. After the Phase 4 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-5-playwright-verification`.
14. Update `task-workflow/progress.md` so current phase and next local action match Phase 5.

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
- test/check command selection is not recorded with scope and reason, including `N/A` when no test is warranted
- broad/full unit or Vitest command is run before minimal warranted targeted and connected tests, repeated after a clean pass, or run without a concrete artifact reason
- full unit/Vitest suite is run as anything other than one final sanity check after minimal warranted targeted and connected tests pass, or an explicit task/repo/global exception
- tests are added for small fixes, visual-only changes, incidental UI behavior, or trivial button wiring without a concrete core-behavior or risk reason
- typecheck, lint, or build is rerun in Phase 4 while Phase 3 evidence is current and no invalidating change is recorded
- tests are rerun only for confidence, or the same failing test command is rerun blindly without a material change, output-staleness, or diagnostic justification
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
- Phase 3 ordered typecheck/lint/build evidence is current, or invalidated commands were rerun from the first affected point
- test/check command selection and retry evidence is recorded, including `N/A` when no test is warranted
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
