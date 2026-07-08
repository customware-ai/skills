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

| Command | Timeout | Lifecycle helper/repo `webServer`/setup evidence | Result | Exact output or repo-local log path with final lines | Follow-up |
| --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending |

## Phase 3 Build Reuse

Reuse the Phase 3 passing build unless code, config, package/dependency files, migrations/build inputs, generated assets, stale output, or incompatible verification tooling invalidated it after Phase 3. Do not rebuild only because Phase 6 is starting, E2E needs a production bundle, or final confidence would feel safer.

| Item | Evidence |
| --- | --- |
| Phase 3 build evidence reviewed | Pending |
| Reused Phase 3 build or rebuild reason | Pending |
| If rebuilt, command/log and invalidating change | Pending |

## Test Selection And Retry Ledger

Record every meaningful E2E/test command, including reruns. Use the smallest useful scope first. For E2E, list the connected specs covered. Never run the unfiltered full E2E suite unless the task explicitly asks for full E2E or a concrete written repo instruction names full E2E/all-spec execution for this exact task. A repo having one large E2E file, a Playwright `webServer`, or generic "run tests" guidance is not enough.

| Command | Scope: targeted/connected-multi-spec/explicit-full | Why this scope and connected specs covered; exact full-suite requirement if explicit-full | Previous related failure | Changed or new evidence before rerun | Timeout/quiet-run triage before longer rerun | Outcome | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Server And Command Discipline

| Check | Status | Evidence |
| --- | --- | --- |
| Correct lifecycle owner recorded before command: helper by default; repo `webServer` or manual fallback only with reason/diagnostics made before the command | Pending | Pending |
| First E2E command established lifecycle ownership before testing, with no reliance on an assumed existing server | Pending | Pending |
| Existing repo E2E command was run through helper `--run`, or repo `webServer` ownership exception was recorded before native Playwright | Pending | Pending |
| Test server, if needed, started by the helper with PID/log, or by a justified repo `webServer`/fallback owner | Pending | Pending |
| Server readiness, if needed, checked by the recorded lifecycle owner before E2E execution | Pending | Pending |
| Browser preflight passed, or mismatch failed early without `playwright install` | Pending | Pending |
| Tests run as bounded commands, not watchers | Pending | Pending |
| Runtime logs preserved under `task-workflow/runtime/` | Pending | Pending |
| Pre-server setup, if needed, ran through lifecycle `--setup` or justified repo/fallback setup | Pending | Pending |
| No helper/setup/server/run command overrode database path env vars; repo E2E/end-to-end config owned test DB paths | Pending | Pending |
| No E2E/end-to-end fixture setup, reset, migration, direct SQLite access, or custom script pointed at `.dbs/database.db` | Pending | Pending |
| DB/setup/server lifecycle reused across related E2E commands unless code, test, config, fixture, migration, build input, or lifecycle diagnostics invalidated it | Pending | Pending |
| Fetch/stale DB/stale build/wrong-port issues were diagnosed through lifecycle logs/readiness before any fallback | Pending | Pending |
| First-run targeted E2E used timeout at or below `30000` ms, or task-specific reason for a different first timeout is recorded | Pending | Pending |
| Longer timeout, if used, followed timer-only/no-useful-output failure plus helper-log/readiness/URL/DB-fixture/server-log/browser-console/network/page-state triage | Pending | Pending |
| Useful failure evidence was diagnosed directly instead of retried with a larger timeout | Pending | Pending |
| Manual fallback, if used, captured PID/log/readiness/cleanup evidence under `task-workflow/runtime/`; otherwise N/A | Pending | Pending |
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

## Timeout And Quiet-Run Triage

Record every timed-out, quiet, or longer-timeout E2E/helper run. A longer rerun is allowed only after a timer-only/no-useful-output failure and clean triage proving the app and spec are valid to rerun.

| Command | Timeout | Result/useful evidence? | Triage checked: helper logs, readiness, URL, not-found/error state, DB/fixture, server log, browser console, network/page state | Rerun/fix decision |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

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
| Correct lifecycle owner managed startup/readiness/cleanup | Pending | Pending |
| First E2E command established lifecycle ownership before testing | Pending | Pending |
| No `playwright install` or browser download attempted | Pending | Pending |
| Test selection and retry ledger complete | Pending | Pending |
| Connected-spec ledger covers each E2E command; unfiltered full suite was not run without explicit full-E2E task request or concrete exact-task repo requirement | Pending | Pending |
| No unfiltered full E2E was run after targeted/connected E2E already passed unless related code, test, config, fixture, migration, or build input changed | Pending | Pending |
| Broad/full unit commands, if any, were one final sanity check or explicit exception after targeted/connected tests | Pending | Pending |
| Suspected pre-existing/order-dependent failures were diagnosed with narrow evidence before any broader command was considered | Pending | Pending |
| No confidence-only or blind identical failing-command rerun | Pending | Pending |
| First-run targeted E2E timeout was at or below `30000` ms or justified | Pending | Pending |
| No longer timeout used without timer-only/no-useful-output failure plus clean triage | Pending | Pending |
| Timeout/quiet-run triage recorded for every timed-out, quiet, or longer-rerun command | Pending | Pending |
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
| Phase 3 build reused, or rebuild reason and output recorded | yes | Pending |
| Open gaps for E2E/test coverage updated | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| Test quality review passed | yes | Pending |
| Test selection and retry ledger complete | yes | Pending |
| Broad/full unit commands were skipped or used once only as final sanity/explicit exception after targeted and connected tests | yes | Pending |
| No unfiltered full E2E unless task explicitly requested full E2E or a concrete written repo instruction named full E2E/all-spec for this exact task | yes | Pending |
| No confidence-only or blind identical failing-command rerun | yes | Pending |
| Fixed wait review completed and clean | yes | Pending |
| Server/command discipline passed | yes | Pending |
| No database path override or `.dbs/database.db` Playwright/E2E/end-to-end fixture use | yes | Pending |
| Correct lifecycle owner managed startup/readiness/cleanup | yes | Pending |
| First E2E command established lifecycle ownership before testing | yes | Pending |
| Existing repo E2E ran through lifecycle helper by default, or native Playwright exception was recorded before command | yes | Pending |
| First-run targeted E2E timeout was at or below `30000` ms or justified | yes | Pending |
| No longer timeout used without timer-only/no-useful-output failure plus clean triage | yes | Pending |
| Timeout/quiet-run triage recorded for every timed-out, quiet, or longer-rerun command | yes | Pending |
| No unowned `nohup`/`disown`/assumed-server path used before diagnosed helper failure | yes | Pending |
| No repeated DB reset/migrate/seed or server restart between related E2E commands without invalidating state change or lifecycle diagnostic | yes | Pending |
| No `playwright install` or browser download attempted | yes | Pending |
| Cleanup method recorded and bounded | yes | Pending |
| `progress.md` current and points to Phase 7 next action | yes | Pending |
| `progress.md` points to this Phase 6 artifact for regression test files and repair details | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers current | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
