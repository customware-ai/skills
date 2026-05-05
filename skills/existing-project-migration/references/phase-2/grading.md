# Phase 2 Grading

Use this reference for the `Migration verify` task.

This rubric is the phase-2 hard gate. Record the result in `.import/migration-review.md`.

## Required Scoring Method

1. Compare the running app directly against `.import/project/`, `.import/database/`, and the migration plan.
2. Judge product fidelity, workflow fidelity, runtime fidelity, and coverage fidelity together.
3. Mark each item `pass` or `fail`.
4. If any critical item fails, phase 2 fails immediately.
5. Treat phase 2 as passed only when all critical items pass and at least `22/24` items pass.
6. Do not stop after only a few failed grading passes. A failing grade means more fixes, stronger verification, or more coverage work is still required. Keep iterating until the score is comfortably in the passing range, not just near it.

## 24-Point Checklist

### A. Context And Evidence

1. The migration plan, checklist, review, and open-gaps artifacts were loaded and updated during verification.
2. Build warnings, omissions, and prior open gaps were translated into explicit verify targets.

### B. UI And Route Fidelity

3. `CRITICAL` The visible route map matches the source app, or every omission has a concrete blocker recorded.
4. `CRITICAL` Navigation labels and sections match the source app at a meaningful level.
5. `CRITICAL` Page hierarchy, headings, and major layout blocks match the source app's visible intent.
6. `CRITICAL` The shell, theme, typography direction, and logo usage still reflect the source app instead of a generic template shell.
7. No migration-themed copy or generic imported-app framing remains.
8. No generic filler dashboards, hero panels, or placeholder prose replaced source pages.

### C. Workflow Parity

9. `CRITICAL` The highest-priority source workflows were verified interactively.
10. Representative secondary routes or workflows were verified or explicitly blocked with reasons.
11. Data-backed screens use seeded or imported data when available, or honest source-shaped empty states when not.
12. The migrated app is not still a collapsed vertical slice when broader source evidence exists.

### D. Runtime, Stack, And Data

13. `CRITICAL` Runtime or review startup works on a fresh SQLite database.
14. `CRITICAL` Migrations and seed flow work on a fresh SQLite database.
15. `CRITICAL` The Customware target stack is active and no source runtime was kept alive as the real runtime.
16. No legacy back-compat handlers or extra validator-service crutches were added just to pass verification.
17. Automated validation was re-run after the final fixes.

### E. Coverage And Review Discipline

18. `CRITICAL` Playwright end-to-end coverage exists or was repaired for the workflows that were actually verified.
19. `CRITICAL` `migration-review.md` records score, failed items, pass/fail call, verified workflows, and commands run.
20. `CRITICAL` `migration-open-gaps.md` was updated after verification passes and no ordinary unresolved gap remains open.
21. The first real verify pass did not falsely declare zero gaps without adversarial review.
22. The adversarial final pass evaluated at least five suspected drifts and either fixed them or justified them specifically.

### F. Cleanup And Signoff

23. Skipped workflows and concrete reasons are recorded.
24. Temporary migration-only review artifacts were cleaned up only after the passing grade, or intentionally retained because the task required durable evidence.

## What To Do On Failure

- If a critical item fails, keep iterating.
- If the score is below `22/24`, keep iterating.
- If repeated grading passes still miss the target, treat the failed items and open-gaps ledger as the mandatory next-fix queue and continue.
- If the app is close but still drifts on named routes, styles, workflows, data, or coverage, update `migration-open-gaps.md`, fix them, and re-grade.
- Do not sign off from a passing smoke test, a single happy path, or broad overall similarity.
