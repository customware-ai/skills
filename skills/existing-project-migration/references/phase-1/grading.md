# Phase 1 Grading

Use this reference for the `Migration build` task.

This rubric is the phase-1 hard gate. Record the result in `.import/migration-review.md`.

## Required Scoring Method

1. Compare the migrated repo directly against `.import/project/`, `.import/database/`, and the migration plan.
2. Judge source fidelity and runnable-state fidelity together. A pretty UI with missing workflows fails. A working stack with generic filler UI also fails.
3. Mark each item `pass` or `fail`.
4. If any critical item fails, phase 1 fails immediately.
5. Treat phase 1 as passed only when all critical items pass and at least `23/24` items pass.
6. Do not stop after only a few failed grading passes. A failing grade means more implementation and more verification work is required. Keep iterating until the score is comfortably in the passing range, not just near it.
7. Apply this rubric against the currently imported app only. Do not import assumptions from previous migrations or previous customer apps.

## 24-Point Checklist

### A. Source Intake And Planning

1. `CRITICAL` The real source frontend root and backend root were identified from `.import/project/`, not guessed from top-level filenames.
2. `CRITICAL` The visible source route map and navigation structure were recorded without shrinking the app to an arbitrary subset.
3. Source shell, layout, representative pages, theme files, typography direction, and brand assets were inspected before major implementation choices.
4. CSV tables, headers, representative rows, and seed-data authority were recorded before schema and seed decisions.
5. `CRITICAL` Every source-visible screen has a recorded translation target with required layout blocks, controls, copy, interactions, and any allowed deviations.

### B. Migration Framing

6. `CRITICAL` The work is clearly a tech stack migration, not a redesign or fresh domain reinterpretation.
7. `CRITICAL` The source product's name, domain framing, and product identity remain authoritative over org or company context.
8. `CRITICAL` No migration-themed copy, provenance copy, or explanatory migration narrative was introduced into the shipped UI.
9. No unrelated template demo pages, fake compatibility layers, or template-only tests remain as product crutches.

### C. Stack And Data

10. `CRITICAL` The target runtime uses React Router + tRPC + Hono + Drizzle + SQLite rather than preserving the source runtime.
11. `CRITICAL` The `client-only-spa` merge preserved `app/lib/trpc-provider.tsx` and `app/utils/error-logger.ts`.
12. Source-derived schema, contracts, services, routes, and page wiring exist for the primary workflows.
13. CSVs with rows are used or wired as seed authority instead of being replaced with unrelated demo content.

### D. Product Fidelity

14. `CRITICAL` Primary source routes and navigation labels are present in the migrated app, and direct route load works for them.
15. `CRITICAL` The page hierarchy, shell, and major layout blocks match the source app at a meaningful route-by-route level.
16. `CRITICAL` Source screen archetypes are preserved. Calendar pages stay calendar-first, workspace/table pages stay workspace-first, configuration pages stay configuration-first, analytics pages stay analytics-first, and so on according to the actual imported source.
17. `CRITICAL` The visual language, theme tokens, typography direction, and logo usage meaningfully reflect the source app.
18. `CRITICAL` No intentional UI or UX changes were introduced to headings, section ordering, controls, labels, filters, form fields, tables, charts, buttons, or page copy unless the deviation is explicitly recorded as unavoidable.
19. `CRITICAL` Source route-level composition is directly translated from source frontend code rather than reinterpreted into summary cards, readiness panels, or review/status shells.
20. `CRITICAL` Source-visible workflows are materially implemented and their concrete screen surfaces still exist.
21. `CRITICAL` Any remaining user-visible drift is explicitly recorded per screen in the review and open-gaps artifacts. Nothing merely "close enough" is left implicit.
22. Data-thin screens still keep the original source screen chrome and control surface instead of being replaced by generic filler or prose.

### E. Verification And Readiness

23. `CRITICAL` The app runs locally and the highest-priority source workflows plus representative routes were exercised in Playwright.
24. Source-derived tests or runtime checks were added or updated for the migrated behavior, and remaining non-blocking warnings were recorded concretely in the migration artifacts.

## What To Do On Failure

- If a critical item fails, keep iterating.
- If the score is below `23/24`, keep iterating.
- If repeated grading passes still miss the target, keep using the failed items and open-gaps ledger as the next-fix queue instead of treating repeated failure as completion permission.
- If the migration is close but fails on named gaps, update `migration-open-gaps.md`, fix those gaps, and re-grade.
- Do not approve phase 1 from overall vibe, partial parity, broad workflow similarity, or a single passing smoke test.
