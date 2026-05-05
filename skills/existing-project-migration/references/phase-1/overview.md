# Phase 1 Overview

Use this reference for the `Migration build` task.

## Goal

Phase 1 is the first full migration pass.

- deeply inspect the uploaded source
- create the migration artifacts
- merge the required template foundation
- implement source-derived schema, data flows, routes, pages, and workflows
- directly translate the source frontend UI into the new stack with near one-to-one screen fidelity
- preserve the source product's visible route map, navigation, shell, and styling language
- run base Playwright verification
- earn a passing phase-1 grade
- leave the repo ready for phase 2

This is not a planning-only phase and not a vertical-slice phase. Phase 1 must end with a runnable, source-shaped migrated app whose UI is already very close to the source app, or a concrete blocker.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, this phase-1 folder, and `.import/verification.json`.
2. Confirm the current repo root is the prepared migration workspace. Do not search outside the workspace for alternate template instructions unless an allowed clone already exists inside the workspace.
3. Inspect `.import/project/` deeply enough to find the real source frontend root and backend root. Do not assume the extracted zip is flat.
4. Inspect `.import/database/` deeply enough to find the real CSV root. Read actual headers and representative rows before inferring schema.
5. Inspect the active source router/bootstrap, layout/navigation files, theme/root CSS or tokens, representative pages, brand assets, backend routes, entities, and integrations before planning implementation.
6. After that source intake, create or update `.import/migration-plan.json`, `.import/migration-checklist.md`, `.import/migration-review.md`, and `.import/migration-open-gaps.md` from the required contracts.
7. Record the full visible source route map, navigation labels, page inventory, workflows, CSV tables, preservation targets, and verification targets. Do not cap the product to an arbitrary subset.
8. Merge the `client-only-spa` `app/` into the prepared repo and preserve `app/lib/trpc-provider.tsx` plus `app/utils/error-logger.ts`.
9. Implement the source-derived schema, contracts, queries, routers, pages, and workflow surfaces on the Customware stack.
10. Translate the source frontend screen-by-screen. Preserve route-level layout composition, headings, controls, copy, interaction model, and styling direction as directly as the new stack allows.
11. Seed from CSV rows when present. Do not replace row-backed data with unrelated demo data.
12. Remove or rewrite conflicting template demo leftovers, placeholder copy, fake compatibility layers, and template-only tests.
13. Run the relevant build or validation commands.
14. Run Playwright interactive verification on the highest-priority source workflows and representative routes.
15. Grade the migration against the phase-1 rubric, update the review and open-gaps artifacts, fix the failures, and re-grade until it passes.
16. Leave `.import/`, `.import/migration-plan.json`, and any still-needed migration artifacts in place for phase 2.

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
- the app does not run and meaningful fixes are still possible but were not attempted
- the phase-1 rubric still fails
