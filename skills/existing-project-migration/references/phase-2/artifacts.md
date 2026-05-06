# Phase 2 Artifacts

Use this reference for the `Migration verify` task.

## Required Starting State

Phase 2 assumes these files already exist:

- `.import/migration-plan.json`
- `.import/migration-checklist.md`
- `.import/migration-review.md`
- `.import/migration-open-gaps.md`

Do not recreate them from scratch unless the existing file is truly unreadable. Update the running artifacts instead.

## Checklist Rules

Use `.import/migration-checklist.md` as the phase-2 execution gate.

- Complete the verify sections with real evidence, not intent.
- Use the phase-1 interactive verification report as the main coverage map for route and workflow evidence.
- Record skipped workflows with concrete blockers or reasons.
- If a required verify box remains unchecked, phase 2 is still open.
- Do not perform verify cleanup until the phase-2 rubric passes.

## Review Rules

`migration-review.md` is the verify-phase grading record.

- Append or refresh the comparison pass number.
- Record the verified workflows, commands run, and the verification host or URL used in this phase.
- Record which phase-1 interactive routes or workflows were rechecked in phase 2 and which were relied on from the phase-1 report.
- Record the checklist score, failed item numbers, and pass/fail call for the phase-2 rubric.
- Record the unit-test and end-to-end suites added, repaired, or re-run in this phase.
- Keep the fidelity ledger current as QA reveals drift.
- Keep one row per verified source-visible screen, plus shared shell or runtime rows when needed.
- Record the first-user boot result explicitly: `/`, `/login`, seeded login, first landing page, and fatal console/runtime error status.
- Run and record the adversarial final pass once the migration seems done.

## Open-Gaps Rules

`migration-open-gaps.md` remains the signoff-blocking ledger.

- Update it after every meaningful verification pass.
- Keep route drift, nav drift, structure drift, control-surface drift, copy drift, filler-page drift, style drift, data drift, runtime failures, blank first-page issues, blank login issues, fatal console/runtime boot issues, and missing unit or end-to-end coverage in the ledger until verified fixed.
- If a verified workflow still has a known issue, it belongs in this file.
- If this file still contains unresolved ordinary gaps, signoff is blocked.

## Cleanup Rules

After the phase-2 rubric passes:

- remove generated Playwright screenshots, traces, videos, downloads, and other temporary verification output
- remove `.import/`, including `migration-plan.json`, `migration-checklist.md`, `migration-review.md`, and `migration-open-gaps.md`, unless explicit task instructions require retaining them
- remove any temporary execution notes, scratch files, or template clones created only for migration work
- leave only the durable application code, tests, and intentional repo files

Do not clean up evidence files before the final passing grade.
