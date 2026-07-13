# Progress Ledger

## Executable Resume

After compaction, resume, retry, reconnect, or a new session, reload in this order:

1. Target `AGENTS.md` and every task-relevant target instruction recorded below.
2. Every recorded task input, including the exact source HTML and design JSON inputs.
3. `.agents/skills/source-html-to-app-ui/SKILL.md`.
4. `task-workflow/progress.md`, `task-workflow/CURRENT_PHASE.txt`, and `task-workflow/open-gaps.md`.
5. The earliest failing phase artifact and the current phase reference named below.

Do not choose work from conversational memory. If an earlier artifact fails or conflicts, before doing any phase or implementation work set `task-workflow/CURRENT_PHASE.txt` back to that earliest failing marker and update Current phase, Current phase artifact/reference, Earliest failing phase, and Next local action below to match.

## Resume Pointer

| Field | Value |
| --- | --- |
| Current phase | Pending |
| Current phase artifact | Pending |
| Current phase reference | Pending |
| Earliest failing phase | Pending |
| Last completed gate | Pending |
| Next local action | Pending |
| Active files | Pending |
| Phase artifact index/status | Pending |
| External blocker | None |
| Last updated | Pending |

## Task And Inputs

| Item | Value |
| --- | --- |
| Target repo and mode | Pending |
| Source HTML input | Pending |
| Design JSON input and byte-identical `task-workflow/spec.json` | Pending |
| Target `AGENTS.md` and task-relevant instruction files to reload | Pending |
| Other task input files to reload | Pending |
| Exact task completion command | Pending |

## Current Work Packet

| Scope | Source/contract evidence | Active files | Readback/result | Next action |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Phase Artifact Index

| Phase | Marker/status | Artifact | Reference |
| --- | --- | --- | --- |
| 0 | `phase-0-source-contract` — Pending | `phase-0-source-contract.md` | `references/phase-0-source-contract.md`; `references/playwright-lifecycle.md` |
| 1 | `phase-1-ui-implementation` — Pending | `phase-1-ui-implementation.md` | `references/phase-1-2-ui-integrity.md` |
| 2 | `phase-2-integrity-responsive` — Pending | `phase-2-integrity-responsive.md` | `references/phase-1-2-ui-integrity.md`; `references/playwright-lifecycle.md` |
| 3 | `phase-3-playwright-signoff` — Pending | `phase-3-playwright-signoff.md` | `references/phase-3-playwright-signoff.md`; `references/playwright-lifecycle.md` |

## Artifact Pointers

| Group | Path | Owning phase |
| --- | --- | --- |
| Source scripts/evidence/logs | `task-workflow/source-playwright/`; `task-workflow/source/`; `task-workflow/runtime/source/` | Phase 0/2 |
| Target scripts/evidence/logs | `task-workflow/target-playwright/`; `task-workflow/verification/`; `task-workflow/runtime/target/` | Phase 2/3 |
| Lifecycle helper | `task-workflow/scripts/playwright-lifecycle.mjs` | Phase 0/2/3 |
| Gaps | `task-workflow/open-gaps.md` | All phases |
