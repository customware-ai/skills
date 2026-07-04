# Phase 5 - Interactive Playwright Verification

## App Launch

| Field | Value |
| --- | --- |
| Launch command | Pending |
| Lifecycle helper command | Pending |
| URL | Pending |
| Playwright scripts | Pending |
| Server PID | Pending |
| Server log | Pending |
| Readiness proof | Pending |
| Runtime command logs | Pending |
| Browser preflight result | Pending |

## Server And Command Discipline

| Check | Status | Evidence |
| --- | --- | --- |
| `task-workflow/scripts/playwright-lifecycle.mjs` exists and was used unless repo `webServer` owns lifecycle | Pending | Pending |
| App server started by lifecycle helper or repo `webServer`, not as unbounded foreground command | Pending | Pending |
| Server readiness checked by lifecycle helper or repo `webServer` before browser interaction | Pending | Pending |
| Browser preflight passed, or mismatch failed early without `playwright install` | Pending | Pending |
| Playwright scripts run as bounded helper commands | Pending | Pending |
| Runtime logs preserved under `task-workflow/runtime/` | Pending | Pending |
| Background server cleaned up by helper or explicitly handed to next bounded command | Pending | Pending |
| No manual `pkill`/`sleep`/DB-delete/server-start Playwright command chain used | Pending | Pending |

## Interactive Coverage

| Flow/route/state | Script | Screenshot/evidence | Result | Fix needed |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## User-Perspective Stress Coverage

Exercise non-ideal behavior a real user could do while using the feature: invalid inputs, cancel/close paths, repeated clicks where relevant, out-of-order actions, navigation away/back, empty states, and nearby controls.

| Scenario | Script | Evidence | Result | Fix/rerun |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Surrounding Feature Smoke

Check nearby UI/features sharing the changed surface so the task did not break unrelated but adjacent behavior.

| Surrounding feature | Why at risk | Script/evidence | Result |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Responsive UI And Visual Quality

Verify the main changed flow and nearby UI on desktop, tablet, and mobile. Check layout, overflow, clipping, readable text, navigation access, tap/click targets, dialogs/menus, and screenshots.

| Viewport | Flow/area | Screenshot/evidence | UI quality result | Fix/rerun |
| --- | --- | --- | --- | --- |
| Desktop | Pending | Pending | Pending | Pending |
| Tablet | Pending | Pending | Pending | Pending |
| Mobile | Pending | Pending | Pending | Pending |

## Screenshot Existence Audit

Every screenshot path cited anywhere in this artifact must exist when the Phase 5 gate is scored. Verify cited paths with a bounded file-read/listing command and record the proof here.

| Screenshot path cited | Existence proof command/output | Result |
| --- | --- | --- |
| Pending | Pending | Pending |

## Issues Found And Fixed

| Issue | Fix | Evidence |
| --- | --- | --- |
| Pending | Pending | Pending |

## Fixed Wait Review

Inspect the Playwright scripts used in this phase and any E2E tests created so far.

Record:

- files inspected
- whether any fixed waits were found
- deterministic waits/assertions used instead

This review is zero-tolerance. If any fixed wait is present, Phase 5 fails. Remove every fixed wait, replace it with deterministic Playwright waits/assertions such as `locator.waitFor`, `expect(locator)...`, `waitForURL`, `waitForResponse`, or persisted-state assertions, rerun the script/test, and review the files again before passing.

Do not justify fixed waits as stabilization, mutation timing, dialog close, navigation timing, screenshot timing, animation timing, or followed-by-assertion helpers. There is no allowed fixed-wait list.

| Command result | Fixed wait count | Disposition |
| --- | --- | --- |
| Pending | Pending | Pending |

If matches were found and removed, record the replacement proof here.

| Removed file:line | Replacement wait/assertion | Rerun evidence |
| --- | --- | --- |
| None found yet | N/A | Replace this row if the audit finds and removes matches |

## Gate

| Metric | Required | Actual |
| --- | --- | --- |
| Score | >= 44/50 | 0/50 |
| Critical Playwright items | all pass | Pending |
| Main touched/implied flows covered | yes | Pending |
| Bad cases and non-ideal user behavior covered | yes | Pending |
| Surrounding feature smoke completed | yes | Pending |
| Desktop/tablet/mobile responsive UI verified | yes | Pending |
| Screenshot paths exist | yes | Pending |
| Screenshot existence audit completed for every cited path | yes | Pending |
| No unresolved critical UI/runtime issue | yes | Pending |
| Phase 5 failures routed through Phase 4 fix/integrity review and rechecked | yes | Pending |
| Open gaps for interactive verification updated | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| No fixed waits in audited Playwright/E2E files | yes | Pending |
| Fixed wait review completed and clean | yes | Pending |
| Server/command discipline passed | yes | Pending |
| Lifecycle helper or repo `webServer` managed startup/readiness/cleanup | yes | Pending |
| No `playwright install` or browser download attempted | yes | Pending |
| No manual `pkill`/`sleep`/DB-delete/server-start Playwright command chain used | yes | Pending |
| `progress.md` current and points to Phase 6 next action | yes | Pending |
| `progress.md` points to this Phase 5 artifact for Playwright scripts, screenshots, logs, and repair details | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers current | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
