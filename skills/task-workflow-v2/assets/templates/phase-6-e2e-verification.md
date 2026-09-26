# Phase 6 - E2E Coverage Decision And Verification

Default to defended `N/A`, update existing, or remove/simplify unless a critical/core, complex, persistence/navigation/permission workflow needs new durable E2E. Do not add visual/incidental existence-only assertions. Retain existing useful regression coverage. No unfiltered full suite without an explicit task or concrete repo requirement for this task; current targeted/connected proof is not followed by another confidence run.

## Coverage Decisions

For each changed behavior/workflow, decide warranted coverage, inspect connected existing tests, prune obsolete/excess tests, update existing first, add only justified minimal new cases, otherwise defend `N/A`. Existing agent-created tests are not grandfathered. Record existing-file read evidence, action/reason, removal’s remaining useful coverage and diff once here, not in separate change/pruning/removal recaps.

| Behavior / stable-core risk | Connected existing tests read | Action: preserve/remove/simplify/update/add/N/A and reason | Diff/evidence / useful coverage after removal |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## New E2E Burden Ledger

Before adding any new file/case, prove necessity here. If none, one defended `N/A` suffices. Do not duplicate the full existing-test inventory; point to its Coverage Decisions entry.

| New file/case / durable risk | Existing-first rejection / why smaller proof insufficient | Minimal distinct assertions/path | Bulk reduction/merge decision and evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Command Results

Use the smallest warranted targeted/connected commands; broad scope needs the reference’s explicit justification. No rerun merely for confidence. For each necessary rerun cite a material change, stale/incomplete prior output, or a new narrow diagnostic. Preserve exact required output or a local log with exact final lines; a prose pass claim is insufficient. If no command is warranted, record defended `N/A`.

| Command / bounded timeout / scope reason | Current result / exact output or log and final lines | Failure type / fix or new diagnostic / rerun reason |
| --- | --- | --- |
| Pending | Pending | Pending |

## Lifecycle And Safety

Record a command/result once; logs carry PID, readiness, preflight, timeout and cleanup detail. Subsequent unchanged runs can cite the setup/config row instead of repeating its safety proof. No assumed server, manual cleanup/start/sleep chain, browser download, or raw DB-path override. The helper is default; record diagnosed fallback/repo-webServer reason before using it. Verification uses only isolated repo-owned test config, never the live DB. Reuse related setup/server state when valid.

| Run / helper command and scripts/specs | URL / readiness / preflight / runtime logs / cleanup | Isolated DB config and setup mapping / current build pointer |
| --- | --- | --- |
| Pending | Pending | Pending |

## Timeout And Failure Triage

Record every timed-out, quiet, or longer-timeout run. First-run custom scripts normally use 15–20 seconds; targeted E2E up to 30 seconds. Useful errors require diagnosis, not timeout increases. A longer retry requires timer-only/no-useful-output failure and clean helper/readiness/URL/fixture/server/browser/network/page-state triage under the reference limits. An actual script/selector defect is not an application defect.

| Run / timeout / useful error | Failure classification / triage evidence | Fix/new diagnostic/longer-timeout reason and affected rerun result |
| --- | --- | --- |
| N/A until a failure or longer run | No such run yet | N/A |

## Fixed Wait Review

Zero fixed waits in inspected verification scripts/tests. Cite files/diff or audit result and deterministic locator/URL/response/persisted-state assertions. If waits were removed, cite their replacement and affected rerun. Reuse unchanged reviews; review modified files only.

| Files / review proof | Fixed-wait result / deterministic alternatives | Replacement/rerun if needed |
| --- | --- | --- |
| Pending | Pending | Pending |

## Gaps

See `open-gaps.md` for actual unresolved/resolved gaps; do not repeat them in another coverage table.

## Gate

Score against the phase reference once from current evidence. All critical requirements remain mandatory; cite the sections above rather than rewriting their results in a checklist. Conditional evidence uses a reasoned `N/A`, never an unfilled placeholder.

| Score / required | Critical requirements | Evidence pointers | Decision |
| --- | --- | --- | --- |
| Unscored / >= 24/30 | Pending | Pending | Pending |

Record `Decision: Pass` only after the numeric threshold and all critical requirements pass. Then update marker/checkpoint together; no separate promotion-lock record or readback is needed.

Decision: Pending
