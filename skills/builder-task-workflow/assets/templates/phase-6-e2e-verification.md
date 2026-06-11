# Phase 6 - E2E Test Creation And Verification

## Coverage Decision

| Behavior/path | Coverage type | Test file | Reason |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Test Runs

| Command | Result | Output summary | Follow-up |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Server And Command Discipline

| Check | Status | Evidence |
| --- | --- | --- |
| Test server, if needed, started in background with PID/log | Pending | Pending |
| Server readiness, if needed, checked from separate bounded command | Pending | Pending |
| Tests run as bounded commands, not watchers | Pending | Pending |
| Background server cleaned up after tests | Pending | Pending |

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
| Existing tests preserved, migrated, or defended | Pending |  |
| New/updated tests assert user-visible or persisted state | Pending |  |
| Fixed wait review completed and clean | Pending |  |
| Coverage gaps reflected in `open-gaps.md` | Pending |  |
| Server/command discipline passed | Pending |  |

## Gate

| Metric | Required | Actual |
| --- | --- | --- |
| Score | >= 24/30 | 0/30 |
| Critical E2E/test items | all pass | Pending |
| New/affected behavior covered or defended | yes | Pending |
| Required tests pass or unrelated failure evidenced | yes | Pending |
| Open gaps for E2E/test coverage updated | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| Test quality review passed | yes | Pending |
| Fixed wait review completed and clean | yes | Pending |
| Server/command discipline passed | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
