# Phase 4 - Implementation Integrity Review

## Phase Contract

| Contract item | Required | Evidence |
| --- | --- | --- |
| Goal | Prove implementation integrity before browser verification begins | Pending |
| Allowed work used | Code review, current static/build evidence review, targeted/connected checks, justified final sanity only if needed | Pending |
| Evidence required | Integrity findings, check/test selection ledger, current build reuse state, and remaining gaps | Pending |
| Stop condition | Phase 4 gate passes and verification can move to Phase 5 | Pending |
| Fallback condition | Broader command used only after targeted/connected evidence or exact-task repo/task requirement | Pending |

## Commands

Re-open Phase 3 ordered typecheck/lint/build evidence first. Do not rerun typecheck, lint, or build here when Phase 3 evidence is current. If later code/config/package/build-input changes invalidated it, rerun from the first invalidated command and record why. Starting Phase 4/5/6/7, preparing E2E, or doing final signoff is not an invalidation reason.

| Command | Result | Output summary | Follow-up |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Phase 3 Static/Build Evidence Review

| Check | Status | Evidence |
| --- | --- | --- |
| Phase 3 typecheck/lint/build evidence re-opened | Pending | Pending |
| Phase 3 build evidence still current, or invalidating change identified | Pending | Pending |
| Any rerun started from first invalidated command, not repeated for confidence | Pending | Pending |
| No build rerun was done only for phase prep, E2E prep, or final confirmation | Pending | Pending |
| Reusable build evidence carried forward for Phase 5/6 | Pending | Pending |

## Test Selection And Retry Ledger

Record every meaningful check/test command. Use `N/A` only when no test command is relevant.

| Command | Scope: targeted/connected/final-sanity-full/exception-full | Why this scope | Previous related failure | Changed or new evidence before rerun | Outcome | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Command And Write Safety

| Check | Status | Evidence |
| --- | --- | --- |
| Gate-relevant file edits have readback or diff evidence | Pending | Pending |
| Failed/invalid/uncertain write or command results were repaired before continuing | Pending | Pending |
| Pre-Phase-5 API/runtime server probes used `task-workflow/scripts/server-probe.mjs`, or none were needed | Pending | Pending |
| No long-lived server, watcher, or interactive command remains running in the foreground | Pending | Pending |

## Integrity Review

| Area | Status | Evidence |
| --- | --- | --- |
| Imports and symbols | Pending | Pending |
| Route/action wiring | Pending | Pending |
| Schema/data shapes | Pending | Pending |
| State transitions | Pending | Pending |
| Docs alignment | Pending | Pending |
| Extracted `AGENTS.md` development rules followed | Pending | Pending |
| Unrelated edits avoided | Pending | Pending |
| Type safety and narrow assertions | Pending | Pending |
| Existing tests preserved, migrated, or defended | Pending | Pending |
| Tooling warnings from changed code resolved or defended | Pending | Pending |

## Console And Logging Review

Changed app/server source must not keep `console.*`. Temporary `console.*` may be used only during Phase 5 interactive testing when it directly helps debug browser/runtime behavior by reading console output. Remove those logs after the issue is understood and before Phase 5 reruns, Phase 4 re-passes, or Phase 7 signs off. If lasting logging is needed, use the repo-approved logging or telemetry path recorded from `AGENTS.md` and relevant docs.

| Area inspected | Console usage found? | Temporary Phase 5 debug only? | Removed or replaced evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Gate

| Metric | Required | Actual |
| --- | --- | --- |
| Score | >= 28/30 | 0/30 |
| Critical integrity items | all pass | Pending |
| Required checks pass or unrelated failure evidenced | yes | Pending |
| Phase 3 typecheck/lint/build evidence current, or invalidated sequence rerun from first affected command | yes | Pending |
| Test/check command selection and retry evidence recorded | yes | Pending |
| Targeted tests ran before broad/full unit or Vitest suite | yes | Pending |
| Full unit/Vitest suite was skipped or used once only as final sanity/explicit exception after targeted and connected tests | yes | Pending |
| Broad/full unit commands, if any, have final sanity/explicit exception reasons | yes | Pending |
| No confidence-only or blind identical failing-command rerun | yes | Pending |
| No runtime-blocking issue remains | yes | Pending |
| No extracted `AGENTS.md` development rule violation remains | yes | Pending |
| No `console.*` remains outside the active Phase 5 debug loop | yes | Pending |
| No stale critical gap in `open-gaps.md` | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| Command/write safety passed | yes | Pending |
| `progress.md` current and points to Phase 5 next action | yes | Pending |
| `progress.md` points to this Phase 4 artifact for check/fix details | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers current | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
