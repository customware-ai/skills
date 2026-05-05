# Phase 1 Grading

Use this reference for the `Migration build` task.

This rubric is the phase-1 hard gate. Record the result in `.import/migration-review.md`.

## Required Scoring Method

1. Compare the migrated repo directly against `.import/project/`, `.import/database/`, and the migration plan.
2. Judge source fidelity and runnable-state fidelity together. A pretty UI with missing workflows fails. A working stack with generic filler UI also fails.
3. Mark each item `pass` or `fail`.
4. If any critical item fails, phase 1 fails immediately.
5. Treat phase 1 as passed only when all critical items pass and at least `20/22` items pass.
6. Do not stop after only a few failed grading passes. A failing grade means more implementation and more verification work is required. Keep iterating until the score is comfortably in the passing range, not just near it.
7. Apply this rubric against the currently imported app only. Do not import assumptions from previous migrations or previous customer apps.

## 22-Point Checklist

### A. Source Intake And Planning

1. `CRITICAL` The real source frontend root and backend root were identified from `.import/project/`, not guessed from top-level filenames.
2. `CRITICAL` The visible source route map and navigation structure were recorded without shrinking the app to an arbitrary subset.
3. Source shell, layout, representative pages, theme files, typography direction, and brand assets were inspected before major implementation choices.
4. CSV tables, headers, representative rows, and seed-data authority were recorded before schema and seed decisions.

### B. Migration Framing

5. `CRITICAL` The work is clearly a tech stack migration, not a redesign or fresh domain reinterpretation.
6. `CRITICAL` The source product's name, domain framing, and product identity remain authoritative over org or company context.
7. No migration-themed copy or generic migration dashboard framing was introduced into the shipped UI.
8. No unrelated template demo pages, fake compatibility layers, or template-only tests remain as product crutches.

### C. Stack And Data

9. `CRITICAL` The target runtime uses React Router + tRPC + Hono + Drizzle + SQLite rather than preserving the source runtime.
10. `CRITICAL` The `client-only-spa` merge preserved `app/lib/trpc-provider.tsx` and `app/utils/error-logger.ts`.
11. Source-derived schema, contracts, services, routes, and page wiring exist for the primary workflows.
12. CSVs with rows are used or wired as seed authority instead of being replaced with unrelated demo content.

### D. Product Fidelity

13. `CRITICAL` Primary source routes and navigation labels are present in the migrated app.
14. `CRITICAL` The page hierarchy, shell, and major layout blocks meaningfully reflect the source app.
15. `CRITICAL` Source screen archetypes are preserved. Calendar pages stay calendar-first, workspace/table pages stay workspace-first, configuration pages stay configuration-first, analytics pages stay analytics-first, and so on according to the actual imported source.
16. `CRITICAL` The visual language, theme tokens, typography direction, and logo usage meaningfully reflect the source app.
17. `CRITICAL` Source screen structure is already near one-to-one in phase 1. Headings, controls, route-level composition, copy, and visible interaction model are directly translated from the source frontend rather than loosely reinterpreted.
18. Source-visible workflows are materially implemented rather than replaced by filler cards, hero panels, placeholder prose, or generic review/status shells.
19. Source-visible surfaces beyond the seeded data still exist with honest source-shaped empty states or staged wiring instead of being deleted.

### E. Verification And Readiness

20. `CRITICAL` The app runs locally and the highest-priority source workflows or representative routes were exercised in Playwright.
21. Source-derived tests or runtime checks were added or updated for the migrated behavior.
22. Remaining warnings, omissions, and non-blocking gaps were recorded concretely in the migration artifacts.

## What To Do On Failure

- If a critical item fails, keep iterating.
- If the score is below `20/22`, keep iterating.
- If repeated grading passes still miss the target, keep using the failed items and open-gaps ledger as the next-fix queue instead of treating repeated failure as completion permission.
- If the migration is close but fails on named gaps, update `migration-open-gaps.md`, fix those gaps, and re-grade.
- Do not approve phase 1 from overall vibe, partial parity, or a single passing smoke test.
