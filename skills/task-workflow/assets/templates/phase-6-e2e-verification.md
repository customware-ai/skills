# Phase 6 - E2E Test Creation And Verification

## Coverage Decision

| Behavior/path | Existing E2E inspected | Update existing or add new? | Test file | Reason |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Existing E2E Review

Inspect existing E2E tests first. Prefer updating an existing flow when the task changes or extends that flow. Add a new E2E test only for a genuinely new workflow or when existing coverage cannot cleanly express the path.

| Existing test file/flow | Relevant to task? | Action taken | Evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Functional Assertion Quality

E2E tests should prove actual task functionality, not superficial styling or existence. Prefer assertions for user-visible outcomes, persisted state, navigation results, validation behavior, permissions, or end-to-end data flow. Avoid primary assertions about color, CSS class, incidental copy, or a button merely existing unless the task itself is specifically about that behavior.

| Test file | Functional outcome proved | User-visible/persisted assertion | Superficial checks avoided? |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Test Runs

Record the exact bounded test command and its exact output. If output is long, write it to a repo-local log file and cite that file here, plus the final pass/fail lines copied exactly into the artifact.

| Command | Lifecycle helper/repo `webServer`/setup evidence | Result | Exact output or repo-local log path with final lines | Follow-up |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Test Selection And Retry Ledger

Record every meaningful E2E/test command, including reruns. Use the smallest useful scope first, and broaden only with a concrete reason.

| Command | Scope: targeted/multi-spec/broad/full | Why this scope | Previous related failure | Changed since previous run | Outcome | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Server And Command Discipline

| Check | Status | Evidence |
| --- | --- | --- |
| `task-workflow/scripts/playwright-lifecycle.mjs` exists and was used for Playwright/E2E unless repo `webServer` owns lifecycle | Pending | Pending |
| Test server, if needed, started by lifecycle helper or repo `webServer` with PID/log evidence | Pending | Pending |
| Server readiness, if needed, checked by lifecycle helper or repo `webServer` before E2E execution | Pending | Pending |
| Browser preflight passed, or mismatch failed early without `playwright install` | Pending | Pending |
| Tests run as bounded commands, not watchers | Pending | Pending |
| Runtime logs preserved under `task-workflow/runtime/` | Pending | Pending |
| Pre-server setup, if needed, ran through lifecycle `--setup` or repo `webServer` setup | Pending | Pending |
| Background server cleaned up after tests | Pending | Pending |
| Cleanup method recorded and bounded | Pending | Pending |

## Fixed Wait Review

Inspect the Playwright scripts and E2E tests used in this phase.

Record:

- files inspected
- whether any fixed waits were found
- deterministic waits/assertions used instead

This review is zero-tolerance. If any fixed wait is present, Phase 6 fails. Remove every fixed wait, replace it with deterministic Playwright waits/assertions such as `locator.waitFor`, `expect(locator)...`, `waitForURL`, `waitForResponse`, or persisted-state assertions, rerun the script/test, and review the files again before passing.

Do not justify fixed waits as stabilization, mutation timing, dialog close, navigation timing, screenshot timing, animation timing, or followed-by-assertion helpers. There is no allowed fixed-wait list.

| Command result | Fixed wait count | Disposition |
| --- | --- | --- |
| Pending | Pending | Pending |

If matches were found and removed, record the replacement proof here.

| Removed file:line | Replacement wait/assertion | Rerun evidence |
| --- | --- | --- |
| None found yet | N/A | Replace this row if the audit finds and removes matches |

## Coverage Gaps

| Gap | Reason | Risk |
| --- | --- | --- |
| Pending | Pending | Pending |

## Test Quality Review

| Check | Status | Evidence |
| --- | --- | --- |
| Existing tests preserved, migrated, or defended | Pending | Pending |
| Existing E2E tests inspected before adding new coverage | Pending | Pending |
| Existing E2E flow updated when changed behavior belongs there | Pending | Pending |
| New E2E test added only when necessary | Pending | Pending |
| Exact command output recorded for required E2E/test runs | Pending | Pending |
| New/updated tests assert user-visible or persisted state | Pending | Pending |
| New/updated E2E tests prove real task functionality | Pending | Pending |
| Superficial color/class/existence-only checks avoided | Pending | Pending |
| Tests avoid brittle implementation details | Pending | Pending |
| Fixed wait review completed and clean | Pending | Pending |
| Coverage gaps reflected in `open-gaps.md` | Pending | Pending |
| Server/command discipline passed | Pending | Pending |
| Lifecycle helper or repo `webServer` managed startup/readiness/cleanup | Pending | Pending |
| No `playwright install` or browser download attempted | Pending | Pending |
| Test selection and retry ledger complete | Pending | Pending |
| Only new, changed, or directly affected E2E specs ran unless full-suite reason recorded | Pending | Pending |
| Broad/full commands have explicit reason or were not used | Pending | Pending |
| No blind identical failing-command rerun | Pending | Pending |
| Cleanup method recorded and bounded | Pending | Pending |

## Gate

| Metric | Required | Actual |
| --- | --- | --- |
| Score | >= 24/30 | 0/30 |
| Critical E2E/test items | all pass | Pending |
| Existing E2E tests inspected before coverage decision | yes | Pending |
| Existing E2E coverage updated when task affects existing flow | yes | Pending |
| New E2E tests added only when existing tests cannot cleanly cover the workflow | yes | Pending |
| New/affected behavior covered or defended | yes | Pending |
| Tests assert meaningful functional outcomes | yes | Pending |
| Superficial/flaky one-off checks avoided | yes | Pending |
| Required tests pass or unrelated failure evidenced | yes | Pending |
| Exact command output recorded in artifact or cited repo-local log | yes | Pending |
| Open gaps for E2E/test coverage updated | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| Test quality review passed | yes | Pending |
| Test selection and retry ledger complete | yes | Pending |
| Broad/full commands have explicit reason or were not used | yes | Pending |
| No full E2E suite without explicit task/repo/app-wide reason | yes | Pending |
| No blind identical failing-command rerun | yes | Pending |
| Fixed wait review completed and clean | yes | Pending |
| Server/command discipline passed | yes | Pending |
| Lifecycle helper or repo `webServer` managed startup/readiness/cleanup | yes | Pending |
| No `playwright install` or browser download attempted | yes | Pending |
| Cleanup method recorded and bounded | yes | Pending |
| `progress.md` current and points to Phase 7 next action | yes | Pending |
| `progress.md` points to this Phase 6 artifact for regression test files and repair details | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers current | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
