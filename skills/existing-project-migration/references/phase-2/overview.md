# Phase 2 Overview

Use this reference for the `Migration verify` task.

## Goal

Phase 2 is the independent verification and hardening pass after phase 1.

- reload the migration artifacts
- reload the phase-1 interactive verification evidence
- verify the migrated app against the imported source and the phase-1 route coverage report
- run a brief interactive sanity recheck from the real user entrypoint
- verify runtime behavior on a fresh SQLite database
- add or repair unit tests plus Playwright end-to-end coverage for verified workflows
- fix migration drift uncovered by QA
- earn a passing phase-2 grade
- clean up `.import/`, Playwright outputs, and temporary migration-only artifacts only after the grade passes

Phase 2 is not a quick smoke test. If real drift or runtime breakage is found, fix it and re-run the relevant checks. But phase 2 is hardening, not the first point where UI fidelity becomes important. Phase 1 should already have produced a source-faithful screen translation with no intentional user-facing drift and exhaustive interactive route coverage.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, and the phase-2 references.
2. Read `.import/migration-plan.json`, `.import/migration-checklist.md`, `.import/migration-review.md`, and `.import/migration-open-gaps.md`. Fail if the required artifacts are missing.
3. Re-read the build warnings, open gaps, and verification targets before starting QA.
4. Determine the real user-facing verification host. If the task provides a review or preview URL, use that. Do not treat localhost or an internal debug port as sufficient signoff evidence when an external host exists.
5. Load the phase-1 interactive verification evidence and use it to derive the phase-2 sanity-check targets plus the automated test targets.
6. Start with a brief real-user sanity check while unauthenticated: open `/`, confirm a visible first page, confirm `/login` renders visibly when applicable, log in with seeded credentials, and confirm the first post-login landing page renders visibly.
7. Recheck the highest-risk or newly changed routes interactively after fixes. Do not rerun a second full route crawl unless phase-1 evidence is missing or no longer trustworthy.
8. Fail immediately on blank screens, missing login, failed seeded login, failed first in-app navigation, hydration errors, or fatal console errors. Fix them before continuing.
9. Compare route map, navigation labels, page hierarchy, section ordering, control surfaces, shell, styling language, typography direction, and logo usage against the active source frontend and the phase-1 review.
10. Verify runtime or review startup on a fresh SQLite database, including migrations and seed flow.
11. Inspect existing automated tests. Add or repair unit tests and Playwright end-to-end coverage for the workflows and pages that phase 1 already proved interactively.
12. Run the automated suites, fix the failures, and keep logic changes minimal. Do not reinterpret the app just to make tests easier to pass.
13. Update `migration-review.md` and `migration-open-gaps.md`, fix the failures, and re-run the relevant checks.
14. Grade the migration against the phase-2 rubric. If it fails, keep iterating.
15. Only after the grade passes may temporary migration-only review artifacts be cleaned up, and cleanup must be the final step before completion.

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
- shipped UI still contains migration or provenance copy
- source screens are still represented by generic substitute layouts
- the real review or preview app boots blank, crashes before login, or cannot complete the first-user flow
- runtime on a fresh database cannot be made to work and meaningful fixes were not exhausted
- unit or end-to-end coverage still ignores the verified workflows
- temporary migration artifacts were not cleaned up before signoff when cleanup was expected
- the phase-2 rubric still fails
