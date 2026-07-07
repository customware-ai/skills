# Phase 7 - Final Audit And Signoff

## Phase Gate Recap

| Phase | Artifact | Score | Decision | Still current |
| --- | --- | --- | --- | --- |
| 0 | `task-workflow/phase-0-artifact-reset.md` | Pending | Fail | Pending |
| 1 | `task-workflow/phase-1-task-research.md` | Pending | Fail | Pending |
| 2 | `task-workflow/phase-2-execution.md` | Pending | Fail | Pending |
| 3 | `task-workflow/phase-3-second-execution.md` | Pending | Fail | Pending |
| 4 | `task-workflow/phase-4-integrity-review.md` | Pending | Fail | Pending |
| 5 | `task-workflow/phase-5-playwright-verification.md` | Pending | Fail | Pending |
| 6 | `task-workflow/phase-6-e2e-verification.md` | Pending | Fail | Pending |

## Final Diff Review

| Area | Files | Summary |
| --- | --- | --- |
| Pending | Pending | Pending |

## Final Verification

| Proof | Evidence |
| --- | --- |
| Final checks current after last code change | Pending |
| Open critical gaps resolved | Pending |
| Stale/deferred open gaps reconciled | Pending |
| Extracted `AGENTS.md` development rules followed | Pending |
| Phase 3 did not use broad/full unit, Vitest, or Playwright/E2E as review/confidence/state-discovery commands | Pending |
| Phase 4/6 test selection and retry ledgers current | Pending |
| Targeted and connected tests prove the changed behavior before any final sanity/exception-full unit command | Pending |
| Full unit/Vitest suite was skipped or used once only as final sanity/explicit exception after targeted and connected tests | Pending |
| No unfiltered full E2E unless the task explicitly requested full E2E or a concrete written repo instruction named full E2E/all-spec for this exact task | Pending |
| No unfiltered full E2E after targeted/connected E2E already passed unless related code, test, config, fixture, migration, or build input changed | Pending |
| Broad/full unit commands, if any, have final sanity/explicit exception reasons | Pending |
| No confidence-only or blind identical failing-command rerun is recorded | Pending |
| Phase 5/6 correct lifecycle-owner evidence current | Pending |
| Phase 5/6 reused DB/setup/server lifecycle across related verification commands unless invalidated by changed state or lifecycle diagnostics | Pending |
| Phase 5 responsive-quality evidence current and first-class when UI changed | Pending |
| No unresolved broken UI, overlap, clipping, unusable control, accidental horizontal scroll, excessive 1080p dead-space issue, or unfinished-looking 2560px empty-region issue | Pending |
| No Phase 5/6 `playwright install` or browser download attempt | Pending |
| Runtime logs cited for managed server/test commands where output is too long | Pending |
| No `console.*` remains in changed app/server source after Phase 5 | Pending |
| Task summary accurate | Pending |
| `progress.md` agrees with Phase 7 and has no remaining local action | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers identify where final gate, verification, log, and test details live | Pending |

## MITB Task Completion Command

Run this only after all prior Phase 7 audit checks are clean. Prefer the exact `Completed:` command from `.tasks/task.md`; otherwise use the exact command supplied in the prompt. Do not synthesize project/task identifiers when the task file or prompt provides them. If any Phase 7 audit check fails, do not run this command; loop back to the earliest failing phase first. Treat this as the final external task action and plan all checks, tests, builds, server probes, browser probes, and verification commands before it.

| Item | Evidence |
| --- | --- |
| Completion command source | Pending |
| Exact completed command | Pending |
| Command run after Phase 7 audit checks passed | Pending |
| Command result/output | Pending |

## Open Gaps Audit

| Gap table | Remaining open items | Stale or contradicted? | Evidence |
| --- | --- | --- | --- |
| Critical Gaps | Pending | Pending | Pending |
| Non-Critical Gaps | Pending | Pending | Pending |
| Placeholder rows | Pending | Pending | Pending |

## Artifact Integrity Review

Re-open every required phase artifact. Do not infer pass status from memory or from this recap table.

| Artifact | Exists? | Decision and score pass? | Required evidence complete? | Contradictions? | Evidence |
| --- | --- | --- | --- | --- | --- |
| `task-workflow/phase-0-artifact-reset.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/phase-1-task-research.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/phase-2-execution.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/phase-3-second-execution.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/phase-4-integrity-review.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/phase-5-playwright-verification.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/phase-6-e2e-verification.md` | Pending | Pending | Pending | Pending | Pending |
| `task-workflow/progress.md` | Pending | Current and consistent | No pending local action | Pending | Pending |

## Fixed Wait Review Recap

| Source | Review present? | Current after last edit? | No fixed waits found? | Evidence |
| --- | --- | --- | --- | --- |
| Phase 5 interactive scripts | Pending | Pending | Pending | Pending |
| Phase 6 E2E/tests | Pending | Pending | Pending | Pending |

## Verification Evidence Recap

| Evidence type | Required proof | Present and current? | Evidence |
| --- | --- | --- | --- |
| Phase 5 screenshots | Every screenshot path cited in Phase 5 exists | Pending | Pending |
| Phase 5 responsive quality | Required viewports include mobile, tablet, desktop, standard `1920x1080`, and large `2560x1440` when UI changed; evidence shows responsive quality passed as a first-class guarantee with no broken UI, excessive 1080p dead space, or unfinished-looking 2560px empty regions | Pending | Pending |
| Phase 6 E2E/test output | Exact command output recorded in artifact or cited repo-local log | Pending | Pending |
| Test selection and retry evidence | Phase 3 boundary plus Phase 4/6 ledgers explain targeted-first order, connected-spec coverage, final full-unit sanity/exception reason if used, no confidence-only/state-discovery full-suite run, rerun basis, outcomes, and next actions | Pending | Pending |
| Managed lifecycle evidence | Phase 5/6 records the correct lifecycle owner: helper by default, repo Playwright `webServer` or manual fallback only with reason/diagnostics; readiness, browser preflight, cleanup, and runtime logs are cited | Pending | Pending |
| DB/setup/server reuse evidence | Phase 5/6 does not repeatedly reset DB, rerun migrate/seed, or restart the server between related E2E commands without an invalidating state change or lifecycle diagnostic | Pending | Pending |
| Browser install avoidance | No `playwright install` or browser download command was run during Phase 5/6 | Pending | Pending |
| Changed app/server logging | No `console.*` remains in changed app/server source after Phase 5 | Pending | Pending |

## Quality Scorecard

| Category | Required | Actual | Evidence |
| --- | --- | --- | --- |
| Functional result | >= 8/10 | 0/10 | Pending |
| Skill compliance/artifact integrity | >= 8/10 | 0/10 | Pending |
| Code quality/maintainability | >= 8/10 | 0/10 | Pending |
| Test quality | >= 8/10 | 0/10 | Pending |
| Development-instruction compliance | >= 8/10 | 0/10 | Pending |
| Overall result | >= 8/10 | 0/10 | Pending |

## Gate

| Metric | Required | Actual |
| --- | --- | --- |
| Score | 20/20 | 0/20 |
| All previous gates passed | yes | Pending |
| Artifacts auditable | yes | Pending |
| No unresolved critical gap | yes | Pending |
| No stale open gap | yes | Pending |
| No placeholder rows in `open-gaps.md` | yes | Pending |
| Fixed wait reviews current and clean | yes | Pending |
| Phase 5 cited screenshots exist | yes | Pending |
| Phase 5 responsive-quality evidence current and first-class when UI changed | yes | Pending |
| No unresolved broken UI, excessive 1080p dead-space issue, or unfinished-looking 2560px empty-region issue | yes | Pending |
| Phase 6 exact E2E/test command output recorded | yes | Pending |
| Phase 3 did not use broad/full test commands as review/confidence/state-discovery commands | yes | Pending |
| Phase 4/6 test selection and retry ledgers current | yes | Pending |
| Targeted and connected tests prove the changed behavior before any final sanity/exception-full unit command | yes | Pending |
| Full unit/Vitest suite was skipped or used once only as final sanity/explicit exception after targeted and connected tests | yes | Pending |
| No unfiltered full E2E unless the task explicitly requested full E2E or a concrete written repo instruction named full E2E/all-spec for this exact task | yes | Pending |
| No unfiltered full E2E after targeted/connected E2E already passed unless related code, test, config, fixture, migration, or build input changed | yes | Pending |
| Broad/full unit commands, if any, have final sanity/explicit exception reasons | yes | Pending |
| No confidence-only or blind identical failing-command rerun is recorded | yes | Pending |
| Phase 5/6 correct lifecycle-owner evidence recorded | yes | Pending |
| Phase 5/6 did not repeatedly reset DB/setup/server between related commands without invalidating state change or lifecycle diagnostic | yes | Pending |
| No browser download attempted in Phase 5/6 | yes | Pending |
| Artifact integrity review completed and clean | yes | Pending |
| Quality scorecard all >= 8/10 | yes | Pending |
| Extracted `AGENTS.md` development rules verified | yes | Pending |
| No `console.*` remains in changed app/server source after Phase 5 | yes | Pending |
| Verification current | yes | Pending |
| MITB completed command run after clean final audit | yes | Pending |
| `progress.md` final state agrees with Phase 7 | yes | Pending |
| `progress.md` Current Phase Pointers final state is current | yes | Pending |
| `progress.md` Phase Artifact Index and Artifact Pointers final state is current | yes | Pending |
| Promotion lock verified before final signoff | yes | Pending |

Decision: Fail
