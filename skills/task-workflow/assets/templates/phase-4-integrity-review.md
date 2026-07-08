# Phase 4 - Unit Test Coverage Decision And Verification

## Phase 3 Evidence Review

Re-open Phase 3 ordered typecheck/lint/build and integrity evidence first. Do not rerun typecheck, lint, or build here when Phase 3 evidence is current. If later code/config/package/build-input changes invalidated Phase 3, return to Phase 3 and rerun from the first invalidated command. Starting Phase 4/5/6/7, preparing E2E, or doing final signoff is not an invalidation reason.

| Check | Status | Evidence |
| --- | --- | --- |
| Phase 3 typecheck/lint/build evidence re-opened | Pending | Pending |
| Phase 3 implementation integrity evidence re-opened | Pending | Pending |
| Phase 3 evidence still current, or returned to Phase 3 for invalidated command | Pending | Pending |
| Phase 3 invalidation decision recorded before unit coverage work | Pending | Pending |

## Unit Coverage Decision

Decide whether unit, service, component, or integration-style tests are warranted. Small fixes, visual-only changes, copy/color/style changes, spacing/layout tuning, simple button wiring, and incidental UI behavior normally require no unit-level test. Unit tests belong to stable core behavior: shared logic, contracts, permissions, critical state machines, parsers, calculations, data transforms, central stores, or reusable components whose behavior must stay strict.

| Behavior/area | Unit-level coverage warranted? | Add/update/remove/N/A | Test file(s) | Reason |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Existing Unit Test Review

Inspect existing unit, service, component, and integration-style tests that touch the changed behavior, nearby contracts, central logic, or modified components. Remove tests when they are unnecessary, obsolete, convoluted, brittle, or protect non-core/non-complex behavior. Preserve useful assertions elsewhere only when the behavior is still core.

| Existing test file/area | Relevant to task? | Preserve/update/remove/unrelated | Reason | Evidence |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Unit Test Changes

| Action | Test file | Why this action is warranted | Diff/readback evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

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
| Unit coverage decision recorded, including `N/A` when no unit-level test is warranted | yes | Pending |
| Existing relevant unit-level tests inspected before add/update/remove decisions | yes | Pending |
| Unit tests added, updated, removed, or skipped according to the coverage decision | yes | Pending |
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
