# Phase 1 Overview

Use this reference for the `Migration build` task.

## Goal

Phase 1 is the first full migration pass.

- deeply inspect the uploaded source
- create the migration artifacts
- merge the required template foundation
- implement source-derived schema, data flows, routes, pages, and workflows
- directly translate the source frontend route-by-route into the new stack with no intentional UI or UX change
- preserve the source product's visible route map, navigation, shell, styling language, and concrete screen contracts
- run base user-perspective verification on the real app host
- earn a passing phase-1 grade
- leave the repo ready for phase 2

This is not a planning-only phase and not a vertical-slice phase. Phase 1 must end with a runnable, source-faithful migrated app that a source user would recognize as the same product, or a concrete blocker.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, this phase-1 folder, and `.import/verification.json`.
2. Confirm the current repo root is the prepared migration workspace. Do not search outside the workspace for alternate template instructions unless an allowed clone already exists inside the workspace.
3. Inspect `.import/project/` deeply enough to find the real source frontend root and backend root. Do not assume the extracted zip is flat.
4. Inspect `.import/database/` deeply enough to find the real CSV root. Read actual headers and representative rows before inferring schema.
5. Inspect the active source router/bootstrap, layout/navigation files, theme/root CSS or tokens, representative pages, brand assets, backend routes, entities, and integrations before planning implementation.
6. After that source intake, create or update `.import/migration-plan.json`, `.import/migration-checklist.md`, `.import/migration-review.md`, and `.import/migration-open-gaps.md` from the required contracts.
7. Record the full visible source route map, navigation labels, page inventory, workflows, CSV tables, preservation targets, verification targets, and per-screen translation targets. Do not cap the product to an arbitrary subset.
8. Merge the `client-only-spa` `app/` into the prepared repo and preserve `app/lib/trpc-provider.tsx` plus `app/utils/error-logger.ts`.
9. Implement the source-derived schema, contracts, queries, routers, pages, and workflow surfaces on the Customware stack.
10. Translate the source frontend screen-by-screen. Preserve route-level layout composition, section ordering, headings, controls, labels, filters, forms, tables, charts, actions, copy, interaction model, and styling tokens as directly as the new stack allows.
11. When data is sparse or staged, keep the original screen chrome and control surface. Do not replace the page with generic summary cards, placeholder prose, or review/status shells.
12. Seed from CSV rows when present. Do not replace row-backed data with unrelated demo data.
13. Remove or rewrite conflicting template demo leftovers, placeholder copy, fake compatibility layers, and template-only tests.
14. Run the relevant build or validation commands.
15. Determine the actual user-facing verification host. If the task provides a review or preview URL, use that. Do not treat localhost or an internal debug port as sufficient signoff evidence when an external host exists.
16. Verify the real first-user flow while unauthenticated: open `/`, confirm a visible first page, confirm `/login` renders visibly when applicable, log in with seeded credentials, and confirm the first post-login landing page renders visibly.
17. Fail immediately on blank screens, broken first paint, missing login surface, failed seeded login, failed first in-app navigation, hydration errors, or fatal console errors. Fix them before calling the phase close.
18. Compare representative migrated screens directly against source code and screenshots before signoff. Fix visible drift before calling the phase close.
19. Run Playwright interactive verification on the highest-priority source workflows and representative routes.
20. Grade the migration against the phase-1 rubric, update the review and open-gaps artifacts, fix the failures, and re-grade until it passes.
21. Leave `.import/`, `.import/migration-plan.json`, and any still-needed migration artifacts in place for phase 2.

## Execution Budget

After the migration artifacts exist with initial content:

- Spend at most two turns on extra read-only inspection before the first implementation edit.
- If more context is needed, record the gap in the checklist or plan and keep moving on already-supported workflows.
- If the app is not yet runnable or the rubric does not pass, the phase is still open.
- If the migration looks close but still fails on specific items, keep iterating in the same repo. Do not self-approve it as good enough.

## Phase-1 Failure Conditions

Fail the task instead of completing if:

- the real source frontend or backend cannot be identified after deep intake
- the visible source route map or workflows cannot be identified
- the implementation drifts to org/company domain instead of uploaded product evidence
- the migrated app is still a reduced generic subset when broader source evidence exists
- any source-visible screen is reinterpreted into a different screen type or generic substitute
- any shipped UI still contains migration or provenance copy
- any major source screen still differs in visible structure, controls, or copy without an explicit unavoidable blocker
- the user-facing review or preview app boots blank, crashes on first paint, or cannot show login or the first post-login page
- the app does not run and meaningful fixes are still possible but were not attempted
- the phase-1 rubric still fails
