# Startup And Research

Use this reference for Phase 0 and Phase 1.

These phases establish the task workspace and produce the accepted implementation plan. They are internal gates, not user confirmation points. When a gate passes, continue automatically. When a gate fails, repair the phase and rerun the gate automatically.

This is a looped gate workstream: Phase 0 and Phase 1 are not complete until their artifacts pass their gates. A failing score, missing evidence, stale placeholder, or blocked promotion means stay in the same phase, repair the work, update the artifact, rescore, and repeat. Do not stop or ask the user to continue when a local repair is available.

## Startup Authority

The artifact trail is the source of truth for the run.

Phase 0 exists so a new task never inherits stale proof from an older task. The agent owns artifact creation directly by copying templates from `assets/templates/`; no scaffold script is required.

`task-workflow/progress.md` is the compact resume ledger. It must be reset with the rest of `task-workflow/`, copied from template, and updated in Phase 0 before promotion. Hard rule: after compaction or resume, always read `progress.md` immediately after `SKILL.md` and before choosing the next action.

Do not inspect implementation files in app, server, tests, packages, src, or equivalent source directories before Phase 0 artifacts exist.
Do not edit implementation files before Phase 1 passes.
Do not generate build outputs, route typegen, databases, migrations, or source artifacts before Phase 1 passes.
Do not edit implementation files after Phase 1 passes until `task-workflow/CURRENT_PHASE.txt` says `phase-2-execution`.
When filling phase artifacts, keep evidence auditable. If a template row is condensed, the same semantic evidence must still be present.

## Phase 0: Artifact Reset And Scaffolding

Phase 0 is the first action after reading `SKILL.md`.

1. Identify the target repo root.
2. Delete only the existing `task-workflow/` directory in the target repo. Treat it as stale previous-task state; do not reuse old artifacts for the new task.
3. Recreate:
   - `task-workflow/`
   - `task-workflow/playwright/`
   - `task-workflow/screenshots/`
   - `task-workflow/CURRENT_PHASE.txt`
4. Copy the templates from `assets/templates/` into `task-workflow/`:
   - `progress.md`
   - `phase-0-artifact-reset.md`
   - `phase-1-task-research.md`
   - `phase-2-execution.md`
   - `phase-3-second-execution.md`
   - `phase-4-integrity-review.md`
   - `phase-5-playwright-verification.md`
   - `phase-6-e2e-verification.md`
   - `phase-7-final-signoff.md`
   - `open-gaps.md`
5. Set `task-workflow/CURRENT_PHASE.txt` to `phase-0-artifact-reset`.
6. Fill `task-workflow/phase-0-artifact-reset.md` with:
   - repo root
   - task file or task source
   - skill path
   - reset evidence
   - copied template evidence
   - marker before promotion: `phase-0-artifact-reset`
   - confirmation that no implementation files were edited
7. Fill `task-workflow/progress.md` with the task source, current phase, Phase 0 reset summary, Artifact Inventory for the fresh gate MD files/resume files/empty verification directories, and next local action.
8. After every other Phase 0 gate row passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-1-task-research`.
9. Update `task-workflow/progress.md` so current phase and next local action match Phase 1.
10. Re-open `task-workflow/phase-0-artifact-reset.md`, record marker after promotion as `phase-1-task-research`, then mark the Phase 0 decision.

## Phase 0 Score

Score `task-workflow/phase-0-artifact-reset.md` against `10` items:

- `2` previous-task artifact reset items
- `4` required artifact and resume-ledger items, including the phase marker, progress ledger, and hard resume rule
- `2` required directory creation items
- `1` task and repo identity item
- `1` no-source-edit discipline item

Critical failures:

- any implementation file edited before Phase 0 passes
- any build output, route typegen, database, migration, test output, or source artifact generated before Phase 1 passes
- old previous-task `task-workflow/` reused instead of reset
- missing required artifact file
- missing or stale `task-workflow/progress.md`
- Phase 0 artifact does not record the progress-ledger hard resume rule
- copied templates replaced by loose prose
- `CURRENT_PHASE.txt` missing or wrong after the gate

Pass gate:

- score is `10/10`
- all required artifacts exist
- old previous-task workflow artifacts were cleared
- no app/source files were edited
- marker before promotion was `phase-0-artifact-reset`
- marker after promotion is `phase-1-task-research`

If this gate fails, stay in Phase 0.

## Phase 1: Task Intake And Codebase Research

1. Set `task-workflow/CURRENT_PHASE.txt` to `phase-1-task-research`.
2. Read the complete task body.
3. Immediately read the target repo root `AGENTS.md`.
4. Discover and read repo-local domain files that are relevant to the task, such as `fixtures/domain.md` or domain docs under `docs/`.
5. Discover and read relevant repo-local skill or instruction files, such as `fixtures/relevant-skill-notes.md` or `.agents/skills/.../SKILL.md`.
6. Read any other docs or local instructions required by the task domain.
7. Cite target repo instruction, domain, and local skill files with repo-relative paths only. Do not depend on the task file to list them, and do not record sandbox-specific absolute paths for these files.
8. Inspect the existing codebase before planning edits.
9. Identify the affected routes, components, services, schemas, stores, tests, scripts, config, and docs.
10. Record the exact files and patterns that should be reused.
11. Record assumptions, constraints, non-goals, and risks.
12. Write an ordered implementation plan.
13. Write the verification and test plan.
14. Do not edit implementation files before this phase gate passes.
15. Update `task-workflow/progress.md` with the compact task summary, repo instructions read, domain/context files read, implementation direction, verification plan, risks, and next local action.
16. After every Phase 1 gate requirement passes, set `task-workflow/CURRENT_PHASE.txt` to `phase-2-execution`.
17. Update `task-workflow/progress.md` so current phase and next local action match Phase 2.
18. Record that Phase 2 was promoted only after Phase 1 passed.

## Research Surface

Research must be specific enough that another agent could execute from the artifact alone.

Record:

- task goal and user-visible outcome
- technical goal
- in-scope and out-of-scope work
- repo instructions and docs read
- repo-local domain files and relevant local skill files read
- repo-relative paths for target repo instruction files
- affected architecture
- existing repo patterns to reuse
- files or directories inspected
- implementation plan in execution order
- verification and test plan
- risks, assumptions, and unresolved questions

The Phase 1 artifact is not notes after the fact. It is the plan that controls Phase 2.

## Phase 1 Score

Score `task-workflow/phase-1-task-research.md` against `30` items:

- `6` task understanding items
- `6` instruction and documentation items
- `8` codebase research items
- `6` ordered implementation plan items
- `4` risk and verification-plan items

Critical failures:

- task body not read completely
- root `AGENTS.md` ignored
- `task-workflow/progress.md` not updated with enough context and artifact inventory to resume Phase 2 after compaction
- relevant repo-local domain files or local skill files ignored
- target repo instruction/domain/skill files recorded only as sandbox absolute paths instead of repo-relative paths
- codebase not inspected before implementation planning
- plan does not cite concrete files or directories
- planned work ignores tests, verification, or docs when they are required by the task
- implementation files edited before Phase 1 passes
- implementation files edited while `CURRENT_PHASE.txt` still says `phase-1-task-research`
- Phase 1 artifact omits the task understanding, instructions/docs read, codebase research, implementation plan, or verification plan while claiming pass

Pass gate:

- score is at least `28/30`
- every critical research item passes
- the plan cites concrete files or directories
- `AGENTS.md`, relevant repo-local domain files, and relevant local skill files are read and cited with repo-relative paths
- the plan distinguishes implementation, tests, docs, and verification work
- no known ambiguity remains unhandled
- `CURRENT_PHASE.txt` is promoted to `phase-2-execution` only after Phase 1 passes

If this gate fails, stay in Phase 1.

## Promotion Rule

Phase 2 is blocked until Phase 1 passes in writing.

Before setting `task-workflow/CURRENT_PHASE.txt` to `phase-2-execution`, re-open:

- `task-workflow/phase-0-artifact-reset.md`
- `task-workflow/phase-1-task-research.md`
- `task-workflow/progress.md`

Both phase artifacts must show `Decision: Pass`, passing scores, all critical items passing, and no placeholder `Pending` rows in required evidence or gate sections. `progress.md` must identify Phase 2 as the current phase, summarize Phase 0 and Phase 1, brief the created artifact files, and state the next local action.

After this promotion, Phase 2 implementation is allowed only because the marker now says `phase-2-execution`. If any source file changes while the current marker still says `phase-1-task-research`, the run has failed.

Do not stop after research to ask whether to continue. The gate exists so the agent can continue autonomously once the research artifact is strong enough.
