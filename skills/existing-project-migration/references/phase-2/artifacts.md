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
- Record skipped workflows with concrete blockers or reasons.
- If a required verify box remains unchecked, phase 2 is still open.
- Do not perform verify cleanup until the phase-2 rubric passes.

## Review Rules

`migration-review.md` is the verify-phase grading record.

- Append or refresh the comparison pass number.
- Record the verified workflows and commands run in this phase.
- Record the checklist score, failed item numbers, and pass/fail call for the phase-2 rubric.
- Keep the fidelity ledger current as QA reveals drift.
- Keep one row per verified source-visible screen, plus shared shell or runtime rows when needed.
- Run and record the adversarial final pass once the migration seems done.

## Open-Gaps Rules

`migration-open-gaps.md` remains the signoff-blocking ledger.

- Update it after every meaningful verification pass.
- Keep route drift, nav drift, structure drift, control-surface drift, copy drift, filler-page drift, style drift, data drift, runtime failures, and missing coverage in the ledger until verified fixed.
- If a verified workflow still has a known issue, it belongs in this file.
- If this file still contains unresolved ordinary gaps, signoff is blocked.

## Cleanup Rules

After the phase-2 rubric passes:

- remove `.import/migration-checklist.md` if the task expects cleanup
- remove `.import/migration-review.md` if the task expects cleanup
- remove `.import/migration-open-gaps.md` if the task expects cleanup
- leave `.import/` source artifacts and any durable migration records such as `migration-plan.json` in place unless explicit instructions say otherwise

Do not clean up evidence files before the final passing grade.
