# Phase 2 Overview

Use this reference for the `Migration verify` task.

## Goal

Phase 2 is the independent verification and hardening pass after phase 1.

- reload the migration artifacts
- verify the migrated app against the imported source
- run interactive full-app QA
- verify runtime behavior on a fresh SQLite database
- add or repair Playwright end-to-end coverage for verified workflows
- fix migration drift uncovered by QA
- earn a passing phase-2 grade
- clean up temporary migration-only review artifacts only after the grade passes

Phase 2 is not a quick smoke test. If real drift or runtime breakage is found, fix it and re-run the relevant checks.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, and the phase-2 references.
2. Read `.import/migration-plan.json`, `.import/migration-checklist.md`, `.import/migration-review.md`, and `.import/migration-open-gaps.md`. Fail if the required artifacts are missing.
3. Re-read the build warnings, open gaps, and verification targets before starting QA.
4. Run the app and verify the highest-priority source workflows first.
5. Verify representative secondary routes, pages, or workflows instead of stopping at one happy path.
6. Compare route map, navigation labels, page hierarchy, shell, styling language, typography direction, and logo usage against the active source frontend.
7. Verify runtime or review startup on a fresh SQLite database, including migrations and seed flow.
8. Inspect existing Playwright coverage. Add or repair coverage for the workflows and pages that were actually verified.
9. Update `migration-review.md` and `migration-open-gaps.md`, fix the failures, and re-run the relevant checks.
10. Grade the migration against the phase-2 rubric. If it fails, keep iterating.
11. Only after the grade passes may temporary migration-only review artifacts be cleaned up.

## Execution Budget

After the phase-2 artifacts are loaded:

- Spend at most two turns on extra read-only inspection before the first interactive verification step or code edit.
- If the app is obviously broken, move directly into the smallest fix that makes verification meaningful.
- After verification starts, keep alternating between QA, fixes, and re-grading until the phase passes.

## Phase-2 Failure Conditions

Fail the task instead of completing if:

- required migration artifacts are missing at verify start
- no source-derived workflow can be verified
- the route map or styling still clearly drift from the source app
- runtime on a fresh database cannot be made to work and meaningful fixes were not exhausted
- Playwright coverage still ignores the verified workflows
- the phase-2 rubric still fails
