# Phase 2 - Primary Execution

## Start

- Phases 0–1 passed before implementation; marker set to `phase-2-execution` before source edits: Pending
- Existing workspace edits preserved; no implementation generated in Phases 0–1: Pending

## Execution Batches

Update once per meaningful cohesive batch, not per file edit. Each entry owns implementation state, changed files, diff/search proof, plan adjustment if any, and remaining work. The checkpoint contains only the next resumable action. Routine check/build/tests/browser work belongs to later phases; a narrow compile/type unblock command needs a concrete blocker/result here.

| Plan step/batch | State | Files and diff/inspection evidence | Finding/change reason / next work |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Safety And Handoffs

- Live DB safety: only the app migration command for an actual schema change is permitted. No ad hoc live query/reset/seed/fixtures/direct SQLite/repair/delete/cleanup or test access: Pending
- If migration changed: target/source, reason, exact app migration command/output (or `N/A`): Pending
- Any isolated test data/runtime probe: repo-owned config and bounded server-probe evidence (or `N/A`): Pending
- Failed/uncertain edits repaired; implementation-batch diff verified; commands bounded/cleaned up: Pending
- Deferred unit/E2E/browser needs and real remaining gaps: point to `open-gaps.md`, or `None`

## Gate

Score against the phase reference once from current evidence. All critical requirements remain mandatory; cite the sections above rather than rewriting their results in a checklist. Conditional evidence uses a reasoned `N/A`, never an unfilled placeholder.

| Score / required | Critical requirements | Evidence pointers | Decision |
| --- | --- | --- | --- |
| Unscored / >= 34/40 | Pending | Pending | Pending |

Record `Decision: Pass` only after the numeric threshold and all critical requirements pass. Then update marker/checkpoint together; no separate promotion-lock record or readback is needed.

Decision: Pending
