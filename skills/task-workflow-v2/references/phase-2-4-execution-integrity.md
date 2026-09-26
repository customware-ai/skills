# Execution, Integrity, Check/Lint Validation, And Unit Coverage

Use this reference for Phase 2, Phase 3, and Phase 4.

These phases turn the accepted research plan into working code, then force a second implementation/integrity pass, check/lint validation, and a dedicated unit-test coverage decision before browser verification begins. They are internal gates, not user confirmation points. When a gate passes, continue automatically. When a gate fails, fix the work and rerun the gate automatically. Do not end an OpenCode turn while Phase 2, Phase 3, or Phase 4 is unblocked and the current phase artifact still says `Decision: Fail`.

This is a looped gate workstream: Phase 2, Phase 3, and Phase 4 are not complete until their artifacts pass their gates. A failing score, missing evidence, broken check/lint evidence, stale gap, placeholder row, weak implementation, or weak unit-test decision means stay in the same phase, repair the work, update the artifact, rescore, and repeat. Do not stop or ask the user to continue when a local repair is available.

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
- Before promotion, use the current gap results already established; inspect the ledger only if its state is unknown or contradictory. Resolve/reconcile real gaps, not a fresh ledger audit after every edit.

## Progress And Evidence

Follow the main Evidence And Resume Contract throughout Phases 2–4. Load this grouped reference once; do not reread it at each transition or fix. Keep phase-specific facts in their owning artifact and checkpoint only current work/next action at meaningful batch boundaries. Consolidate writes; no separate table proving that other tables were updated. On compaction/context loss, reload current instructions/evidence and resume from actual missing work rather than rereading the entire earlier history.

## Code And Phase Boundary Discipline

<code_phase_boundary_discipline>

Follow the target repo's code rules and the task-relevant development rules extracted from `AGENTS.md`. Do not make the task pass by weakening code quality.

### Do

- Prefer existing contracts, schemas, route patterns, services, and local test structure when a test phase actually owns coverage work.
- Avoid broad unsafe type assertions such as `as never`, `as any`, or equivalent type erasure unless a narrow repo-specific boundary genuinely requires it and the artifact explains why.
- Do not silence lint, type, or runtime warnings introduced by this task.

### Phase Ownership

- Phase 2 owns implementation work. Defer unit, E2E, and browser verification work to the owning later phases.
- Phase 3 owns connected-place repair, implementation integrity review, and check/lint/build. Record unit/E2E coverage questions for the owning later phase.
- Phase 4 owns unit-test coverage decisions. It may add, update, remove, or skip unit/service/component/integration-style tests and must record why.
- Phase 6 owns E2E coverage decisions. Do not move E2E remove/update/add work into Phase 2, Phase 3, or Phase 4.
- If coverage work happens before its owning phase, treat it as early evidence to be reconciled. Carry the diff and command output into Phase 4 or Phase 6; do not fail the workflow solely because the evidence was produced early.

</code_phase_boundary_discipline>

## Tool And Command Discipline

<tool_command_discipline>

These phases must not stall on unbounded tools.

### File And Command Safety

- Inspect cohesive implementation/test diffs once for gate reliance. Trust successful routine artifact patches; inspect failed/uncertain writes as specified by the main Evidence And Resume Contract.
- If a write, patch, generated file, or command result is invalid, partial, missing, or uncertain, repair that exact issue before starting the next packet.
- Use bounded commands for checks and tests. If a command appears hung or idle, stop it, record the evidence, and continue with the next local recovery path.
- Protect production/live workspace databases as job-critical user data. `.dbs/database.db`, repo default user-data DB paths, and any equivalent live app database are not fixtures or scratch files. Deleting, resetting, reseeding, truncating, manipulating, or corrupting them can destroy user work and can cause the user to lose his job.
- The only allowed production/live database action is the app's required migration command for a real schema change. Record the migration reason, command, target DB/source, and result as phase evidence. This does not permit working on `.dbs/database.db` or any production/live DB. Do not run manual queries, seed, reset, fixture setup, test setup, Playwright, E2E, direct SQLite, data repair, delete, truncate, cleanup, or any data manipulation against production/live DB.
- If Phase 2 or Phase 3 creates or changes a migration, apply it to the production/live default DB with the repo's app migration command once after the migration exists and before Phase 3 passes. This is mandatory because the user uses the completed app immediately; an unapplied migration means the implementation is not actually delivered. Rerun only if the migration changed after the prior run or the prior migration run failed/incomplete.
- If a command mentions `db`, `database`, `sqlite`, `migrate`, `seed`, `fixture`, `reset`, `.dbs`, `rm`, `truncate`, or similar data-state words, prove the target is either the legitimate migration target or an isolated repo-owned test DB before running it. If the target is unknown, assumed safe, or production/live for non-migration work, do not run it.
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

### Phase-Owned Commands

- Phase 2 may run narrow non-test checks only when needed to unblock implementation or prove a specific batch. Defer routine check, lint, build, unit/Vitest, E2E, Playwright, and repo combined check commands such as `pnpm run check` to owning later phases. If a compile/type issue blocks the batch, a combined static command is allowed with blocker/result evidence. Use cohesive batch diffs/targeted inspection as proof, not per-edit record/readback cycles.
- Phase 3 owns the normal ordered check/build checkpoint after the implementation, connected-place sweep, and integrity review: run the repo's full check command first, use lint only as a focused static/backend diagnostic when useful or when the repo defines it as the static command, then run build if build is separate from check. Each command must run only after the prior command is passing unless the target repo combines them in one documented command.
- Phase 4 owns unit-test commands. Phase 5 owns interactive browser verification. Phase 6 owns E2E coverage decisions. If Phase 2 or Phase 3 discovers unit/E2E/browser work may be needed, record it for the owning phase and continue the ordered gates.

</tool_command_discipline>

## Unit Test Coverage Discipline

<unit_test_coverage_discipline>

Phase 4 owns the final unit-level remove/update/add/skip decision for Phase 2-4 work.

### Decision Order

- Use this decision order for every changed behavior: decide whether unit-level coverage is warranted; inspect connected existing tests; remove unnecessary existing tests; update connected existing tests when they can carry warranted coverage; add a new minimal test only when no existing test can carry a warranted core behavior; otherwise record `N/A`.
- If the change is small, visual-only, incidental, or adequately proven by Phase 3 check/lint evidence and Phase 5 browser verification, record `N/A` and do not create a test.
- Unit tests belong to stable core behavior: shared logic, contracts, permissions, critical state machines, parsers, calculations, data transforms, central stores, or reusable components whose behavior must stay strict.
- Do not add unit tests for every simple component, incidental click, styling change, copy change, color change, spacing/layout tune, or one-off branch.

> Strict default: `N/A`, update existing, or remove/simplify existing is preferred over adding tests. A new unit test is an exception that must earn its maintenance cost.

### Existing-First Hygiene

- Inspect existing unit/service/component/integration-style tests that touch the changed behavior. Decide whether each should be removed, updated, preserved, or left unrelated before any new-test decision.
- Remove existing tests when they are unnecessary, obsolete, duplicated, convoluted, brittle, or protect non-core/non-complex behavior. Record why removal improves the test suite and preserve useful coverage elsewhere only when the behavior remains core.
- Existing tests created by older agents are not protected by age or by passing status. If they are connected to the current work and fail the minimal/core test standard, remove, merge, or simplify them before adding new tests.

### New Unit Test Burden Ledger

Before adding any new unit test file or case, record a burden ledger entry in `task-workflow/phase-4-unit-coverage.md`.

| Required proof | Meaning |
| --- | --- |
| Stable/core risk | The behavior is a durable contract, parser, transform, permission, state machine, central store, or reusable component behavior that should fail loudly when broken. |
| Existing-test inventory | Specific connected test files were read, not merely searched. |
| Existing-first rejection | The artifact explains why updating, removing, or preserving existing tests cannot carry the warranted assertion. |
| Minimal assertion set | Each new assertion protects a distinct required behavior; incidental rendering, text existence, styling, and one-off branches are excluded. |
| Bulk check | If more than one new unit file, more than three new cases, or any helper/fixture/test-file split is introduced, the artifact itemizes why each remains necessary after reduction. |

If the ledger is missing or generic, do not add the test. If added tests cause max-lines, fixture churn, helper churn, slow broad commands, or repeated reruns, return to the ledger and reduce or remove tests before continuing.

### Minimal Command Rules

- Prefer the smallest useful unit-level command that proves the warranted coverage decision. Avoid broad unit directory globs unless the artifact explains why a connected unit area must run together.
- A broad/full unit or Vitest suite may be used only as one final sanity check after warranted targeted and connected unit-level tests pass, or when the target repo explicitly requires it for this exact task, the task explicitly asks for it, global/shared infrastructure changed, or targeted/connected output is incomplete or stale.
- Do not start with a full unit/Vitest suite unless the target repo explicitly requires it for this exact task or the artifact records a concrete global/shared reason that makes targeted-first impossible.
- If a full unit/Vitest suite is justified and fails, inspect the failure and rerun the smallest failing or affected command. Do not immediately rerun the full suite.
- Record every meaningful unit-level command in the Phase 4 artifact with its scope, why that scope was selected, any previous related failure, what changed since that failure, outcome, and next action. If no unit command is warranted, record `N/A` and the reason.
- Do not rerun tests only for confidence. Rerun when related implementation changed, the test changed, config/environment changed, previous output was incomplete/stale, or the next run gathers a narrower diagnostic needed to fix a real failure.
- Before rerunning the exact same failing command, record what changed since the previous run or what new evidence the rerun will collect. If nothing changed and the previous output is complete, inspect logs/state/output first, then change the implementation, test, command scope, or diagnostic strategy before running again.
- When a failure appears pre-existing, order-dependent, or unrelated, keep the command scope narrow. Use the failing test/spec, logs, DOM/state, trace, screenshot, or persisted data evidence to prove the classification; do not run a full suite just to discover the global state.
- If a command timed out or returned partial output, preserve or cite the useful output before choosing the next command.

</unit_test_coverage_discipline>

## Ordered Static And Build Checkpoint

<ordered_static_build_checkpoint>

Phase 3 is the default checkpoint for the repo's check command, focused lint when useful, and build.

### Do

- Complete Phase 2 implementation packets first, including only warranted docs edits, while preserving packet-level evidence.
- In Phase 3, inspect connected places first. If the task changed a contract, data shape, route, component, store, permission, migration, fixture, test helper, or shared UI pattern, find the connected callers/surfaces and update or defend them before check/build validation.
- Run the repo's full check command first, usually `pnpm run check`. Use `pnpm run lint` only as a focused static/backend diagnostic or when the repo documents lint as the static command. Run build only when the repo has a separate build requirement not already covered by check. Record the repo command mapping instead of inventing duplicate commands.
- When a command fails, inspect enough output to identify every visible issue group by file, contract, or root cause. Do not rely on truncated `tail`/`head` output as the only evidence if it can hide issue groups. If output is too large, use focused searches, reporter options, or a temporary full-output log; delete any temporary full-output log after extracting issue groups. Record issue groups, fixes, and rerun reason in the artifact, not large pasted logs.
- Use targeted diagnostics or narrow fix checks only to prove a specific issue group. Before rerunning the same broad check, lint, or build command, fix every locally-fixable issue group visible from the prior broad output. Do not fix one line or one file and rerun the broad command while other visible related groups remain unhandled.
- After check passes, move to any focused lint/build command that is still required. After build passes, record the reusable build evidence: command, output/log path, and the source/config/package/build inputs it depends on.

### Reuse And Invalidation

- Later phases reuse the Phase 3 build result unless code, config, package/dependency files, migrations/build inputs, or generated assets changed after that build, or unless the previous output is missing, partial, stale, or incompatible with the verification command. Do not run a later build as phase preparation, final confirmation, or because E2E is starting; use the recorded Phase 3 build output.
- If a later phase changes code, return to the earliest affected phase, update artifacts, and rerun the relevant ordered command from the first invalidated point. Do not rerun build only for confidence when the Phase 3 build evidence is still current.

</ordered_static_build_checkpoint>

## Execution Order

Follow the ordered implementation plan from `task-workflow/phase-1-task-research.md`.

If the task touches multiple layers, prefer this order unless the repo architecture demands a different one:

1. contracts and schema changes
2. persistence or data access changes
3. service or API route changes
4. frontend data access and state wiring
5. route/page/component implementation
6. docs required by changed behavior

Record deviations in the phase artifact. Do not backfill the checklist after coding without evidence.

During Phase 2, artifact updates are incremental, not end-of-phase cleanup. Do not batch the whole implementation and then fill `phase-2-execution.md` later.

## Execution Batches And Continuity

Continue the next locally available action without rereading marker/artifact after every tool call. Treat a phase’s in-progress score as unfinished work, not a demand to rescore after each edit.

Group independent edits within a cohesive plan area (contracts, schema/migration, services, routes, UI) and work concurrently where dependencies permit. At each meaningful batch boundary, update one execution entry with files/diff evidence, state, remaining work, and next action, plus a compact checkpoint. Do not finish the whole implementation with a blank log, but do not interleave every file edit with several record reads/writes either. Record newly discovered real gaps promptly in the authoritative ledger. Deferred verification belongs to its owning phase.

An implementation-batch diff/targeted inspection supplies write proof for all included files. Failed/uncertain edits require targeted inspection and repair before relying on them. A successful record update needs no extra readback or promotion-permission proof.

## Phase 2: Primary Execution

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-2-execution`.
2. Use the successful marker write as confirmation; reread only if the write failed/was uncertain or context was lost.
3. Confirm this reference is loaded as the required current phase reference before Phase 2 work starts.
4. Keep the Phase 2 start checkpoint section in `task-workflow/phase-2-execution.md`; fill it before scoring the Phase 2 gate.
5. Execute the Phase 1 plan in dependency order, grouping independent work into cohesive auditable batches.
6. Keep changes scoped to the task.
7. Reuse existing contracts, patterns, components, services, and route shapes.
8. Update docs when the task logically changes documentation.
9. Do not write, update, remove, or run unit/Vitest, E2E, or Playwright tests in Phase 2.
10. At meaningful batch boundaries, record state/file/diff evidence once and checkpoint remaining work; do not write another checklist for the same evidence.
11. Record any skipped, blocked, or deferred step in `task-workflow/open-gaps.md`.
12. Replace `open-gaps.md` placeholder rows with real rows or explicit `None currently recorded` rows before scoring the gate.
13. At the passing gate/transition, update the compact checkpoint once; Phase 2 owns execution details and file evidence.
14. Do not run final signoff from this phase.
15. After the Phase 2 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-3-second-execution`.
16. Reuse this loaded reference for Phase 3 unless context was lost.
17. Update `task-workflow/progress.md` so current phase, current phase reference, and next local action match Phase 3.

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
- meaningful implementation batches are completed while their execution evidence remains blank or unfilled
- Phase 2 work progresses without a checkpoint identifying its phase, active batch, and next action
- meaningful batches are completed without incremental implementation evidence or a usable resume checkpoint
- failed or uncertain write/edit result is ignored instead of repaired and read back
- long-lived command, watcher, or dev server is left running in the foreground until the session stalls
- Phase 2 runs `pnpm run check` or an equivalent combined check/build command without a concrete compile/type blocker recorded before the command
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
- implementation batches have current diff/inspection evidence; successful record updates do not need separate readbacks
- no unbounded foreground server/watcher command is still running

If this gate fails, stay in Phase 2.

A failing Phase 2 artifact is not a stopping state. Fix the implementation or artifact evidence, rerun the Phase 2 gate, and continue only after the artifact records a real pass.

## Phase 3: Second Execution, Integrity, And Check/Lint Validation

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-3-second-execution`.
2. Confirm this reference is loaded as the required current phase reference before Phase 3 work starts.
3. Use the loaded task, plan, implementation evidence and gaps; open only missing/out-of-context details needed for the independent second-pass review.
4. Review the implementation as if continuing someone else's work.
5. Find missing routes, missing actions, weak wiring, incomplete state, fragile data flow, stale docs, and accidental scope creep.
6. Review associated surfaces for consistency. If a UI element was changed in one place, find similar UI elements and update or explicitly defend consistency. If an API/service/schema change enables one flow, verify other callers, routes, mutations, queries, permissions, and docs that share that contract are covered.
7. Review code integrity: imports, symbols, route/action wiring, schema/data shapes, state transitions, extracted `AGENTS.md` rules, unrelated edit risk, unsafe casts, warnings, and lasting `console.*`.
8. Use code inspection, artifact review, targeted search, and narrow file/state checks for the second pass. Do not write, update, remove, or run unit/Vitest or E2E tests in Phase 3.
9. Close every gap that can be closed from local context.
10. Run the ordered check/build checkpoint: repo check, focused lint when useful, and build when separate. For each failure, identify visible issue groups, fix every locally-fixable group together, and rerun that same command before moving to the next command. If a temporary full-output log was needed to triage a large failure, delete it after extracting issue groups.
11. Record reusable build evidence after a passing build, including when later phases may reuse it and what would invalidate it.
12. Update `task-workflow/open-gaps.md` after each gap is closed or defended.
13. Keep findings/integrity/check/build facts once in Phase 3. At meaningful boundaries and promotion, checkpoint its pointer and next action; do not copy the full review into progress.
14. Record a second-pass diff review with file evidence.
15. After the Phase 3 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-4-unit-coverage`.
16. Reuse this loaded reference for Phase 4 unless context was lost.
17. Update `task-workflow/progress.md` so current phase, current phase reference, and next local action match Phase 4.

Phase 3 is mandatory. It is not a polish pass that can be skipped because Phase 2 seemed complete.

## Phase 3 Score

Score `task-workflow/phase-3-second-execution.md` against `32` points:

- `8` task-alignment review items
- `6` route/action/data wiring review items
- `5` missing behavior and edge-flow items
- `5` associated-surface consistency items
- `3` docs and phase-boundary items
- `3` gap-ledger quality items
- `2` implementation-integrity and reusable-build evidence items

Critical failures:

- critical open gap remains unresolved
- second-pass artifact only repeats Phase 2 claims without independent review
- a missing task requirement is found and not fixed or recorded
- associated UI/API/data surfaces were not reviewed for consistency after a related change
- a related surface was found inconsistent and neither fixed nor defended with evidence
- Phase 3 passed without current check, focused lint if used, and build evidence, or without a recorded repo-specific reason one of those commands does not exist
- Phase 3 reran check, lint, or build before all visible locally-fixable issue groups from the prior output were handled
- Phase 3 kept a temporary full-output check/build log after extracting issue groups, or relied only on truncated output while issue groups may have been hidden
- Phase 3 failed to record reusable build evidence after a passing build
- Phase 3 failed to record implementation integrity review evidence
- changed app/server source still contains `console.*` outside the active Phase 5 debug loop
- remaining gap has no reason, owner, or next action

Pass gate:

- score is at least `26/32`
- every critical second-pass item passes
- no unresolved critical gap remains
- associated UI/API/data surfaces have been reviewed, fixed where needed, or explicitly defended
- implementation integrity review is recorded and clean
- check, focused lint if used, and build have passed in order, or missing commands have repo-specific evidence
- reusable build evidence and invalidation conditions are recorded
- every remaining non-critical gap has a concrete reason and owner
- `task-workflow/open-gaps.md` is current after the second pass
- implementation still matches the task scope

If this gate fails, stay in Phase 3.

A failing Phase 3 artifact is not a stopping state. Continue the second-pass review, close or properly record gaps, rerun the gate, and continue only after the artifact records a real pass.

## Phase 4: Unit Test Coverage Decision And Verification

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-4-unit-coverage`.
2. Confirm this reference is loaded as the required current phase reference before Phase 4 work starts.
3. Reuse current Phase 3 integrity/check/build evidence. A relevant code/config/dependency/build-input change invalidates only affected claims; refresh them through their owning phase. A test-only edit does not automatically invalidate the app build. Do not reread or rerun unchanged proof to enter Phase 4.
4. For each changed behavior, decide whether unit-level coverage is warranted. Use `N/A` when no unit-level test is needed.
5. Inspect existing unit, service, component, and integration-style tests that touch the changed behavior, nearby contracts, central logic, or modified components.
6. Remove, merge, or simplify existing tests when they are unnecessary, obsolete, duplicated, convoluted, brittle, or protect non-core/non-complex behavior. This includes tests added by older agents. Record the removal reason and diff/readback evidence. Preserve useful assertions elsewhere only when the behavior is still core.
7. Update existing tests when they already own warranted behavior and still provide useful coverage.
8. Add tests only when coverage is warranted, the behavior is stable/core, no existing test can carry it, and the New Unit Test Burden Ledger proves every new file/case is minimal.
9. Run only the warranted unit-level commands. Use the smallest useful targeted command first. Use broad/full unit or Vitest only as a final sanity or explicit exception with an artifact reason.
10. Inspect failures and fix root causes. Before rerunning the same command, record what changed or what new diagnostic evidence the rerun will collect.
11. Record existing-test inspection/action/pruning and coverage rationale once in the Coverage Decisions table. Put required per-new-case necessity proof in its Burden Ledger and command/output/failure/rerun proof in Command Results; point to open-gaps.md for unresolved gaps. Do not repeat test changes/removals in separate audits.
12. Update `task-workflow/open-gaps.md` for any remaining unit-test coverage gap.
13. Checkpoint Phase 4’s evidence pointer and next action at meaningful boundaries/promotion; keep test rationale and outputs only in Phase 4.
14. Confirm no unit test command or watcher remains running in the foreground from Phase 4.
15. After the Phase 4 gate passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-5-playwright-verification`.
16. Read `references/phase-5-7-verification-signoff.md` and `references/playwright-interactive.md` before doing Phase 5 work.
17. Update `task-workflow/progress.md` so current phase, current phase references, and next local action match Phase 5.

## Phase 4 Score

Score `task-workflow/phase-4-unit-coverage.md` against `30` items:

- `8` unit coverage decision items
- `6` existing-test review items
- `6` remove/update/add quality items
- `5` command execution or `N/A` evidence items
- `5` artifact/gap evidence items

Critical failures:

- unit coverage decision matrix is missing, vague, out of order, or not tied to changed behavior and risk
- connected existing-test inspection/action evidence is missing before a new unit test is added
- new unit test was added when a connected existing test could have been updated instead
- new unit test was added without a complete burden ledger proving stable/core risk, existing-test inventory, existing-first rejection, minimal assertions, and bulk reduction
- new unit test added for small fixes, visual-only changes, incidental UI behavior, trivial button wiring, or non-core/non-complex behavior without a concrete risk reason
- existing useful test deleted without preserving still-core coverage or defending why the behavior is no longer core
- unnecessary, obsolete, duplicated, convoluted, brittle, or non-core/non-complex tests remain after Phase 4 identifies them as removable
- connected old agent-created tests are preserved without a remove/update/preserve decision and reason
- test bulk causes max-lines, helper churn, fixture churn, slow broad commands, or repeated reruns and the artifact does not re-evaluate/reduce the added tests
- test removal lacks reason, diff/readback evidence, or effect on remaining coverage
- warranted unit-level test was not run
- unit command failure caused by this task remains unfixed
- artifact records a pass for a required unit command without exact command output or cited repo-local log
- broad/full unit or Vitest command is run before warranted targeted/connected unit-level tests, repeated after a clean pass, or run without a concrete artifact reason
- check, lint, or build is rerun in Phase 4 while Phase 3 evidence is current and no invalidating change is recorded
- tests are rerun only for confidence, or the same failing test command is rerun blindly without a material change, output-staleness, or diagnostic justification
- test command, server, or watcher is left running without bounded cleanup
- implementation/test batches relied on for the gate have no current diff/inspection evidence

Pass gate:

- score is at least `28/30`
- every critical unit-test coverage item passes
- Phase 3 ordered check/lint/build evidence is current, or invalidated commands were rerun from the first affected point
- unit coverage decision matrix is recorded, including `N/A` when no unit-level test is warranted
- existing relevant unit-level tests were inspected before remove/update/add decisions
- unit tests were removed, updated, added, or skipped according to the existing-first coverage decision
- new unit tests, if any, have a complete burden ledger and minimal assertion proof
- connected old or excessive tests were removed, simplified, updated, or explicitly defended
- removed tests have a recorded rationale and readback/diff evidence
- warranted unit commands pass, no unit command was warranted, or unrelated failures are evidenced
- no unbounded foreground unit command remains active

If this gate fails, stay in Phase 4.

A failing Phase 4 artifact is not a stopping state. If the unit coverage decision is weak, warranted tests fail, unnecessary tests remain, gap-ledger rows are stale, or gate rows are still `Pending`, fix the tests or artifact evidence, rerun the relevant unit command when warranted, rescore, and keep looping. Do not produce a final response from Phase 4 unless an external blocker has been fully recorded with evidence and cannot be solved locally.

## Promotion Rule

Phase 5 is blocked until Phase 4 passes in writing.

At transitions, use the current passing gate and previously established still-valid results. Record the passing score/critical result with evidence pointers, then update marker/checkpoint together. Do not reread earlier artifacts or write promotion-lock paperwork. Missing actual work or invalidated evidence follows the main scoped-invalidation rule; record-only corrections do not reset gates. All numeric thresholds and critical requirements above remain mandatory.

Check/lint validation is necessary but not sufficient. A green build does not replace interactive Playwright verification.

Do not stop after Phase 2, Phase 3, or Phase 4 to summarize progress or wait for approval. The written gates decide whether to continue, rework, or return to an earlier phase without user intervention.
