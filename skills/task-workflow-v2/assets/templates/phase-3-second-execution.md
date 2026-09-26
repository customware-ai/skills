# Phase 3 - Second Execution, Integrity, And Check/Lint Validation

## Independent Second-Pass Review

Review the actual implementation against the task and binding instructions, not merely Phase 2’s claims. Combine related categories when their proof is clear; one finding/fix has one row.

| Area | Finding / fix or defense | Current file/diff evidence |
| --- | --- | --- |
| Task alignment; routes/actions; data/state and error behavior | Pending | Pending |
| Associated UI/API/service/schema/callers and docs consistency | Pending | Pending |
| Imports/symbols; type safety; repo instructions; unrelated edits; warnings | Pending | Pending |
| Logging uses repo-approved telemetry; no lasting changed-source `console.*` | Pending | Pending |

## Ordered Check And Build Results

Run check, focused lint when useful, then separate build. Group all visible locally-fixable issues before rerunning a failed broad command. Keep exact useful result/log pointers, not pasted long logs; remove temporary full-output triage logs after extracting groups. Each check owns its command/result once; reusable build evidence is this row, not another table. Later edits invalidate only affected claims.

| Command/scope | Current result/output or log | Issue groups / batch fix / rerun reason | Input validity / temporary triage-log cleanup |
| --- | --- | --- | --- |
| Check | Pending | Pending | Pending |
| Focused lint when useful, or defended `N/A` | Pending | Pending | Pending |
| Separate build, or repo-specific combined-command reason | Pending | Pending | Pending |

## Safety And Remaining Work

- Live DB safety: reuse Phase 2’s migration proof if unchanged; if new migration work occurred, record its target/reason/exact app command/output here. No other live DB writes or test use: Pending
- Gaps closed/defended or remaining: see `open-gaps.md`
- Unit/E2E coverage questions: Pending or `None`; do not decide/run tests here
- Current check/build proof may be reused until relevant source/config/dependency/build inputs change; list actual invalidation if any: Pending

## Gate

Score against the phase reference once from current evidence. All critical requirements remain mandatory; cite the sections above rather than rewriting their results in a checklist. Conditional evidence uses a reasoned `N/A`, never an unfilled placeholder.

| Score / required | Critical requirements | Evidence pointers | Decision |
| --- | --- | --- | --- |
| Unscored / >= 26/32 | Pending | Pending | Pending |

Record `Decision: Pass` only after the numeric threshold and all critical requirements pass. Then update marker/checkpoint together; no separate promotion-lock record or readback is needed.

Decision: Pending
