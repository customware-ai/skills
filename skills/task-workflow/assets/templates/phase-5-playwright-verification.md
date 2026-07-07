# Phase 5 - Interactive Playwright Verification

## App Launch

| Field | Value |
| --- | --- |
| Launch command | Pending |
| Lifecycle helper command | Pending |
| First app/browser command lifecycle owner | Pending |
| URL | Pending |
| Playwright scripts | Pending |
| Server PID | Pending |
| Server log | Pending |
| Readiness proof | Pending |
| Runtime command logs | Pending |
| Browser preflight result | Pending |

## Phase 3 Build Reuse

Reuse the Phase 3 passing build unless code, config, package/dependency files, migrations/build inputs, generated assets, stale output, or incompatible verification tooling invalidated it after Phase 3. Do not rebuild only because Phase 5 is starting or a server command needs a production bundle.

| Item | Evidence |
| --- | --- |
| Phase 3 build evidence reviewed | Pending |
| Reused Phase 3 build or rebuild reason | Pending |
| If rebuilt, command/log and invalidating change | Pending |

## Server And Command Discipline

| Check | Status | Evidence |
| --- | --- | --- |
| Correct lifecycle owner recorded before command: helper by default; repo `webServer` or manual fallback only with reason/diagnostics made before the command | Pending | Pending |
| First browser/app-server run established lifecycle ownership before testing, with no reliance on an assumed existing server | Pending | Pending |
| App server started by the recorded lifecycle owner, not as an unbounded foreground command | Pending | Pending |
| Server readiness checked by the recorded lifecycle owner before browser interaction | Pending | Pending |
| Browser preflight passed, or mismatch failed early without `playwright install` | Pending | Pending |
| Playwright scripts run as bounded helper commands | Pending | Pending |
| Runtime logs preserved under `task-workflow/runtime/` | Pending | Pending |
| Pre-server setup, if needed, ran through lifecycle `--setup` or justified repo/fallback setup without manual chain bundling | Pending | Pending |
| Fetch/stale DB/stale build/wrong-port issues were diagnosed through lifecycle logs/readiness before any fallback | Pending | Pending |
| Manual fallback, if used, captured PID/log/readiness/cleanup evidence under `task-workflow/runtime/`; otherwise N/A | Pending | Pending |
| Background server cleaned up by helper or explicitly handed to next bounded command | Pending | Pending |
| Cleanup method recorded and bounded | Pending | Pending |

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

Verify the main changed flow and nearby UI on mobile, tablet, desktop, standard `1920x1080`, and large `2560x1440` desktop when UI changed. Responsive quality is a first-class Phase 5 pass condition, equal to the task's functional behavior working. Check overlap, overflow, clipping, readable text, navigation access, tap/click targets, dialogs/menus, accidental horizontal scroll, controls outside the viewport, screenshots, and whether normal desktop/1080p has excessive dead space. Some whitespace is fine. `2560x1440` may have some extra whitespace, but not broad empty regions that make the UI feel unfinished. Large empty areas are acceptable on 4K/ultrawide only when the layout is intentionally constrained and still coherent.

| Viewport | Flow/area | Screenshot/evidence | UI quality and dead-space result | Fix/rerun |
| --- | --- | --- | --- | --- |
| Mobile, e.g. 390x844 | Pending | Pending | Pending | Pending |
| Tablet, e.g. 768x1024 | Pending | Pending | Pending | Pending |
| Desktop, e.g. 1440x900 | Pending | Pending | Pending | Pending |
| Standard desktop, 1920x1080 | Pending | Pending | Pending | Pending |
| Large desktop, 2560x1440 | Pending | Pending | Pending | Pending |

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
| Mobile/tablet/desktop/1080p/2560px responsive UI verified when UI changed | yes | Pending |
| Responsive UI quality passes as a first-class guarantee alongside task functionality | yes | Pending |
| No unresolved overlap, clipping, unusable control, accidental horizontal scroll, excessive 1080p dead-space issue, or unfinished-looking 2560px empty-region issue | yes | Pending |
| Screenshot paths exist | yes | Pending |
| Screenshot existence audit completed for every cited path | yes | Pending |
| Phase 3 build reused, or rebuild reason and output recorded | yes | Pending |
| No unresolved critical UI/runtime issue | yes | Pending |
| Phase 5 failures routed through Phase 4 fix/integrity review and rechecked | yes | Pending |
| Open gaps for interactive verification updated | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| No fixed waits in audited Playwright/E2E files | yes | Pending |
| Fixed wait review completed and clean | yes | Pending |
| Server/command discipline passed | yes | Pending |
| Correct lifecycle owner managed startup/readiness/cleanup | yes | Pending |
| First app/browser command established lifecycle ownership before testing | yes | Pending |
| No unowned `nohup`/`disown`/assumed-server path used before diagnosed helper failure | yes | Pending |
| No `playwright install` or browser download attempted | yes | Pending |
| Cleanup method recorded and bounded | yes | Pending |
| `progress.md` current and points to Phase 6 next action | yes | Pending |
| `progress.md` points to this Phase 5 artifact for Playwright scripts, screenshots, logs, and repair details | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers current | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
