# Phase 4 - Unit Test Coverage Decision And Verification

## Phase 3 Evidence Review

Re-open Phase 3 ordered typecheck/lint/build and integrity evidence first. Do not rerun typecheck, lint, or build here when Phase 3 evidence is current. If later code/config/package/build-input changes invalidated Phase 3, return to Phase 3 and rerun from the first invalidated command. Starting Phase 4/5/6/7, preparing E2E, or doing final signoff is not an invalidation reason.

| Check | Status | Evidence |
| --- | --- | --- |
| Phase 3 typecheck/lint/build evidence re-opened | Pending | Pending |
| Phase 3 implementation integrity evidence re-opened | Pending | Pending |
| Phase 3 evidence still current, or returned to Phase 3 for invalidated command | Pending | Pending |
| Phase 3 invalidation decision recorded before unit coverage work | Pending | Pending |

## Unit Coverage Decision Matrix

Use this order for each changed behavior: decide whether unit-level coverage is warranted; inspect connected existing tests; remove unnecessary existing tests; update connected existing tests when they can carry the warranted coverage; add a new minimal test only when no existing test can carry a warranted core behavior; otherwise record `N/A`.

Small fixes, visual-only changes, copy/color/style changes, spacing/layout tuning, simple button wiring, and incidental UI behavior normally require no unit-level test. Unit tests belong to stable core behavior: shared logic, contracts, permissions, critical state machines, parsers, calculations, data transforms, central stores, or reusable components whose behavior must stay strict.

| Behavior/area | Unit-level coverage warranted? | Existing related tests inspected | Remove existing? | Update existing? | Add new? | Decision and minimal/core reason |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Existing Unit Test Actions

Record each connected existing unit, service, component, or integration-style test and the action taken. Existing-test actions come before any new-test decision.

| Existing test file/area | Connected behavior | Action: remove/update/preserve/unrelated | Reason | Evidence |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Unit Test Changes

| Action | Test file | Existing-first outcome | Why this action is warranted and minimal | Diff/readback evidence |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Unit Test Runs

Record exact bounded unit-level test commands when tests are warranted. If output is long, cite a repo-local log file and copy the final pass/fail lines exactly. If no unit command is warranted, record `N/A` and the coverage-decision evidence.

| Command | Scope: N/A/targeted/connected/final-sanity-full/exception-full | Why this scope or why no unit command is warranted | Previous related failure | Changed or new evidence before rerun | Result | Exact output or repo-local log path with final lines | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Removed-Test Audit

Use this section whenever tests are removed. A removal is valid only when the test is unnecessary, obsolete, convoluted, brittle, or protects non-core/non-complex behavior, and useful core coverage is preserved or explicitly no longer needed.

| Removed test | Removal reason | Useful coverage preserved? | Diff/readback evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Failure And Rerun Discipline

| Command | Failure or risk | Fix/diagnostic before rerun | Rerun outcome |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Coverage Gaps

| Gap | Reason | Risk | Owner/next action |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Command And Write Safety

| Check | Status | Evidence |
| --- | --- | --- |
| Gate-relevant test edits/removals have readback or diff evidence | Pending | Pending |
| Failed/invalid/uncertain write or command results were repaired before continuing | Pending | Pending |
| Test watcher or interactive command cleanup recorded, if applicable | Pending | Pending |

## Gate

| Metric | Required | Actual |
| --- | --- | --- |
| Score | >= 28/30 | 0/30 |
| Critical unit-test coverage items | all pass | Pending |
| Phase 3 static/build and integrity evidence current, or returned to Phase 3 for invalidation | yes | Pending |
| Unit coverage decision matrix recorded, including `N/A` when no unit-level test is warranted | yes | Pending |
| Existing connected unit-level tests inspected before remove/update/add decisions | yes | Pending |
| Unit tests removed, updated, added, or skipped according to the existing-first decision order | yes | Pending |
| Removed tests have rationale and readback/diff evidence | yes | Pending |
| Warranted unit commands pass, no unit command was warranted, or unrelated failure evidenced | yes | Pending |
| Exact command output recorded when a unit command was required; otherwise `N/A` decision recorded | yes | Pending |
| Identified unnecessary, obsolete, convoluted, brittle, or non-core/non-complex unit tests were removed or defended | yes | Pending |
| Broad/full unit command, if any, has final-sanity/explicit-exception reason | yes | Pending |
| Repeated unit commands have material change, stale-output, or diagnostic reasons | yes | Pending |
| Open gaps for unit coverage updated | yes | Pending |
| `open-gaps.md` finalized with real rows or explicit none rows | yes | Pending |
| Command/write safety passed | yes | Pending |
| `progress.md` current and points to Phase 5 next action | yes | Pending |
| `progress.md` points to this Phase 4 artifact for unit coverage details | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers current | yes | Pending |
| Promotion lock verified before marker advance | yes | Pending |

Decision: Fail
