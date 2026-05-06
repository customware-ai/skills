# Phase 2 Grading

Use this reference for the `Migration verify` task.

This rubric is the phase-2 hard gate. Record the result in `.import/migration-review.md`.

## Required Scoring Method

1. Compare the running app directly against `.import/project/`, `.import/database/`, and the migration plan.
2. Judge product fidelity, workflow fidelity, runtime fidelity, and coverage fidelity together.
3. Mark each item `pass` or `fail`.
4. If any critical item fails, phase 2 fails immediately.
5. Treat phase 2 as passed only when all critical items pass and at least `26/27` items pass.
6. Do not stop after only a few failed grading passes. A failing grade means more fixes, stronger verification, or more coverage work is still required. Keep iterating until the score is comfortably in the passing range, not just near it.
7. Apply this rubric against the currently imported app only. Do not import assumptions from previous migrations or previous customer apps.

## 27-Point Checklist

### A. Context And Evidence

1. The migration plan, checklist, review, and open-gaps artifacts were loaded and updated during verification.
2. Build warnings, omissions, and prior open gaps were translated into explicit verify targets.

### B. UI And Route Fidelity

3. `CRITICAL` The visible route map matches the source app, direct route load works for the source-visible routes, or every omission has a concrete blocker recorded.
4. `CRITICAL` Navigation labels and sections match the source app at a meaningful level.
5. `CRITICAL` Page hierarchy, headings, section ordering, and major layout blocks match the source app's visible intent.
6. `CRITICAL` Source screen archetypes and concrete control surfaces still match the source app. Do not replace a calendar with a list, a config form with a generic status shell, a dense workspace with summary cards, or any equivalent source-shaped interaction model with a different pattern.
7. `CRITICAL` The shell, theme, typography direction, and logo usage still reflect the source app instead of a generic template shell.
8. `CRITICAL` No migration-themed copy, provenance copy, or generic imported-app framing remains.
9. `CRITICAL` No generic filler dashboards, hero panels, placeholder prose, summary cards, or generic review/status shells replaced source pages.

### C. Workflow Parity

10. `CRITICAL` Interactive verification started from the actual review or preview host when available, from the first user-visible page while unauthenticated. Localhost-only or debug-port-only evidence is insufficient when an external host exists.
11. `CRITICAL` `/`, `/login`, seeded login, and the first post-login landing page render visibly with no blank screen, hydration failure, fatal console error, or runtime boot error.
12. `CRITICAL` The highest-priority source workflows were verified interactively.
13. Representative secondary routes or workflows were verified or explicitly blocked with reasons.
14. Data-backed screens use seeded or imported data when available, or the original source screen chrome and control surface when data is sparse.
15. The migrated app is not still a collapsed vertical slice when broader source evidence exists.

### D. Runtime, Stack, And Data

16. `CRITICAL` Runtime or review startup works on a fresh SQLite database.
17. `CRITICAL` Migrations and seed flow work on a fresh SQLite database.
18. `CRITICAL` The Customware target stack is active and no source runtime was kept alive as the real runtime.
19. No legacy back-compat handlers or extra validator-service crutches were added just to pass verification.
20. Automated validation was re-run after the final fixes.

### E. Coverage And Review Discipline

21. `CRITICAL` Playwright end-to-end coverage exists or was repaired for the workflows and routes that were actually verified.
22. `CRITICAL` `migration-review.md` records score, failed items, pass/fail call, verified workflows, commands run, the verification host or URL used, explicit first-user boot results, and one row per verified source-visible screen or documented blocker.
23. `CRITICAL` `migration-open-gaps.md` was updated after verification passes and no ordinary unresolved gap, including user-visible drift or boot/login failure, remains open.
24. The first real verify pass did not falsely declare zero gaps without adversarial review.
25. The adversarial final pass evaluated at least five suspected route or screen drifts and either fixed them or justified them specifically.

### F. Cleanup And Signoff

26. Skipped workflows and concrete reasons are recorded.
27. Temporary migration-only review artifacts were cleaned up only after the passing grade, or intentionally retained because the task required durable evidence.

## What To Do On Failure

- If a critical item fails, keep iterating.
- If the score is below `26/27`, keep iterating.
- If repeated grading passes still miss the target, treat the failed items and open-gaps ledger as the mandatory next-fix queue and continue.
- If the app is close but still drifts on named routes, styles, workflows, data, or coverage, update `migration-open-gaps.md`, fix them, and re-grade.
- Do not sign off from a passing smoke test, a single happy path, broad overall similarity, or a UI that is only a shadow of the source app.
