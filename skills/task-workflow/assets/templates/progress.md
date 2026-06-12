# Progress Ledger

This file is the compact resume state for the task. Hard rule: re-read it after every compaction or resume before continuing work.

## Resume Pointer

| Field | Value |
| --- | --- |
| Current phase | Pending |
| Earliest failing phase, if any | Pending |
| Last completed gate | Pending |
| Next local action | Pending |
| External blocker, if any | Pending |
| Last updated | Pending |

## Task Snapshot

| Item | Summary |
| --- | --- |
| Task goal | Pending |
| Target repo | Pending |
| Task file / source | Pending |
| Important repo instructions | Pending |
| Domain/context files read | Pending |
| Relevant skill files selected and read | Pending |
| Key constraints | Pending |
| Current implementation direction | Pending |
| MITB task completion command | Pending |

## Resume Context Files

After compaction or resume, re-read these repo-relative files before choosing the next action. Include only files that are actually relevant to this task.

| File | Why reread | Last read / notes |
| --- | --- | --- |
| `AGENTS.md` | Required target repo instructions | Pending |
| `.tasks/domain.md` | MITB domain, brand, and product context when present | Pending |
| Relevant `.agents/skills/<skill-id>/SKILL.md` files only | Task-specific skill instructions selected in Phase 1; do not list irrelevant skills | Pending |
| Other task-relevant docs or inputs | Additional architecture, domain, or attached-file context | Pending |

## Phase Summaries

Update the relevant row at phase start, after meaningful work packets, after gate pass/fail, and before promotion.

| Phase | Status | Summary | Evidence/artifact |
| --- | --- | --- | --- |
| 0 - Artifact reset | Pending | Pending | `task-workflow/phase-0-artifact-reset.md` |
| 1 - Research | Pending | Pending | `task-workflow/phase-1-task-research.md` |
| 2 - Primary execution | Pending | Pending | `task-workflow/phase-2-execution.md` |
| 3 - Second execution | Pending | Pending | `task-workflow/phase-3-second-execution.md` |
| 4 - Integrity review | Pending | Pending | `task-workflow/phase-4-integrity-review.md` |
| 5 - Playwright verification | Pending | Pending | `task-workflow/phase-5-playwright-verification.md` |
| 6 - E2E verification | Pending | Pending | `task-workflow/phase-6-e2e-verification.md` |
| 7 - Final signoff | Pending | Pending | `task-workflow/phase-7-final-signoff.md` |

## Artifact Inventory

Brief the actual artifacts that carry resume context. Use repo-relative paths only. Keep this current enough that a resumed agent can find prior gate MD files, Playwright scripts, screenshots, logs, and test artifacts without conversation memory.

| Artifact group | Path(s) | Purpose / contents | Status / notes |
| --- | --- | --- | --- |
| Phase gate MD files | `task-workflow/phase-0-artifact-reset.md`; `task-workflow/phase-1-task-research.md`; `task-workflow/phase-2-execution.md`; `task-workflow/phase-3-second-execution.md`; `task-workflow/phase-4-integrity-review.md`; `task-workflow/phase-5-playwright-verification.md`; `task-workflow/phase-6-e2e-verification.md`; `task-workflow/phase-7-final-signoff.md` | Scored gate evidence for each phase | Pending |
| Resume and gap files | `task-workflow/progress.md`; `task-workflow/CURRENT_PHASE.txt`; `task-workflow/open-gaps.md` | Resume pointer, current phase marker, and open/resolved gap ledger | Pending |
| Interactive Playwright scripts | `task-workflow/playwright/` | Standalone scripts created for Phase 5 browser verification | Pending |
| Browser evidence | `task-workflow/screenshots/` | Screenshots and visual/browser evidence captured during Phase 5 | Pending |
| Runtime logs / server evidence | Pending | Background server PID/log files or runtime notes used for bounded verification | Pending |
| Regression test artifacts | Pending | E2E, unit, component, or integration test files added/updated for Phase 6 | Pending |
| MITB task completion evidence | `.tasks/task.md`; `/workspace/mitb/task_complete.mjs` | Required completed command source and final command result | Pending |
| Other workflow artifacts | Pending | Any extra reports, fixtures, generated evidence, or task-specific workflow files | Pending |

## Active Work Queue

| Priority | Work item | Phase owner | Status | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Pending | Pending | Pending | Pending |

## Verification State

| Area | Latest proof | Status | Next action |
| --- | --- | --- | --- |
| Static/type/lint/build checks | Pending | Pending | Pending |
| Unit/component/integration tests | Pending | Pending | Pending |
| Interactive Playwright verification | Pending | Pending | Pending |
| E2E tests | Pending | Pending | Pending |
| Fixed-wait review | Pending | Pending | Pending |

## Resume Rules

- After compaction, re-read `SKILL.md`, this file, `CURRENT_PHASE.txt`, `open-gaps.md`, the current phase artifact, and the current phase reference.
- After compaction, also re-read the repo-relative files listed in `Resume Context Files`, including `AGENTS.md`, `.tasks/domain.md` when present, and only the relevant `.agents/skills/.../SKILL.md` files selected in Phase 1.
- If this file and `CURRENT_PHASE.txt` disagree, inspect the phase artifacts and continue from the earliest failing phase.
- Use the Artifact Inventory to locate prior gate MD files, Playwright scripts, screenshots, logs, and test artifacts before deciding the next action.
- This file is a summary and resume map, not proof by itself. Phase artifacts and gate decisions remain the proof.
- Do not produce a final response while this file says any phase is `Pending`, `Fail`, `In progress`, or locally repairable.
