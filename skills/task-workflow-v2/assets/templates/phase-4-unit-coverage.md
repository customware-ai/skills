# Phase 4 - Unit Test Coverage Decision And Verification

## Current Inputs

- Phase 3 integrity/check/build proof: Pending (reuse if current; only relevant changes invalidate it)

## Coverage Decisions

For each changed behavior/workflow, decide warranted coverage, inspect connected existing tests, prune obsolete/excess tests, update existing first, add only justified minimal new cases, otherwise defend `N/A`. Existing agent-created tests are not grandfathered. Record existing-file read evidence, action/reason, removal’s remaining useful coverage and diff once here, not in separate change/pruning/removal recaps.

| Behavior / stable-core risk | Connected existing tests read | Action: preserve/remove/simplify/update/add/N/A and reason | Diff/evidence / useful coverage after removal |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## New Unit Test Burden Ledger

Before adding any new file/case, prove necessity here. If none, one defended `N/A` suffices. Do not duplicate the full existing-test inventory; point to its Coverage Decisions entry.

| New file/case / durable risk | Existing-first rejection / why smaller proof insufficient | Minimal distinct assertions/path | Bulk reduction/merge decision and evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Command Results

Use the smallest warranted targeted/connected commands; broad scope needs the reference’s explicit justification. No rerun merely for confidence. For each necessary rerun cite a material change, stale/incomplete prior output, or a new narrow diagnostic. Preserve exact required output or a local log with exact final lines; a prose pass claim is insufficient. If no command is warranted, record defended `N/A`.

| Command / bounded timeout / scope reason | Current result / exact output or log and final lines | Failure type / fix or new diagnostic / rerun reason |
| --- | --- | --- |
| Pending | Pending | Pending |

## Safety And Gaps

- Implementation/test batch diffs inspected; failed/uncertain writes repaired; no foreground test watcher left running: Pending
- Isolated repo-owned test config if data is used; no live DB test access: Pending
- Remaining real gaps: see `open-gaps.md`, or `None`

## Gate

Score against the phase reference once from current evidence. All critical requirements remain mandatory; cite the sections above rather than rewriting their results in a checklist. Conditional evidence uses a reasoned `N/A`, never an unfilled placeholder.

| Score / required | Critical requirements | Evidence pointers | Decision |
| --- | --- | --- | --- |
| Unscored / >= 28/30 | Pending | Pending | Pending |

Record `Decision: Pass` only after the numeric threshold and all critical requirements pass. Then update marker/checkpoint together; no separate promotion-lock record or readback is needed.

Decision: Pending
