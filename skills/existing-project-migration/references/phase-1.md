# Phase 1 Reference

Use this reference for the `Migration build` task.

## Goal

Complete phase 1 of the migration in one task:

- build the migration plan
- merge the template foundation
- install the correct root instructions
- create schema and contracts
- seed from CSV rows when present
- implement source-derived workflows
- add source-derived tests
- use Playwright interactive verification to prove the migrated app works at a base level
- leave the repo ready for phase 2 verification
- preserve the imported app's visible route map, layout language, styling direction, and page-level structure instead of replacing it with a generic migration shell

Phase 1 must be driven to success.

- Do not stop at planning, partial migration, or a broken repo state.
- Do not stop after only reading or only scaffolding.
- Do not give up when the first implementation or verification attempt fails.
- Before writing `.import/migration-checklist.md` or `.import/migration-plan.json`, inspect the extracted source deeply enough to identify the real app root, real backend root, actual route/page structure, and real CSV contents.
- Before writing `.import/migration-checklist.md` or `.import/migration-plan.json`, enumerate the active frontend's visible route map, navigation labels, top-level pages, and major workflows from source evidence. Do not stop at a smaller subset like four or five workflows when the imported app clearly exposes more surface area.
- Keep iterating on code, schema, seed data, tests, and Playwright checks until the migrated app works at a basic source-backed level or a concrete blocker makes success impossible.
- Do not be lazy about finishing the actual migration work. A repo that only partially reflects the imported app is not a successful phase 1 outcome.
- Do not reduce the product to a narrow vertical slice when the source app clearly contains more visible routes, pages, or workflows. A reduced subset can be a sequencing tactic during implementation, but it is not a valid final phase 1 outcome.
- Do not introduce migration-themed copy or generic dashboard framing in user-facing UI when the source app already provides product framing, route labels, and layout patterns to preserve.
- Do not invent a new visual concept for the migrated app when the source frontend already provides the theme, logo, typography, navigation sections, and layout shell. Preserve those source decisions as closely as the target stack allows.
- Do not use route-preservation as an excuse for shallow filler pages. If a visible source page exists, port its main layout blocks, headings, controls, and page intent instead of replacing it with generic placeholder metrics or prose.

## Output Contract While Working

The following files are required working artifacts during the build task:

- `.import/migration-checklist.md`
- `.import/migration-plan.json`

Rules:

- Read both files near the start of build if they already exist; create only the missing one(s) after the required deep source intake and before broad exploration or template merge.
- Keep them populated continuously while working; they are required migration state.
- If either file is missing by the time build reaches template merge or implementation work, fail the task.
- If the plan lacks the required top-level fields, at least one workflow, or at least one verification target, fail the task instead of continuing.

## Required Order

1. Read project instructions, `SKILL.md`, this exact reference path, and `.import/verification.json`.
2. Re-read the current root `AGENTS.md`; the working repo is already bootstrapped from `template-be-setup`.
3. Inspect `.import/project/` deeply enough to find the real source root. Do not assume source files live directly under `.import/project/`; many imports will have one top-level folder such as `.import/project/<app-name>/...`.
4. Inspect `.import/database/` deeply enough to find the real CSV root. Do not assume CSVs live directly under `.import/database/`; they may also sit under a top-level extracted folder.
5. Inspect the actual frontend app, actual backend app, actual route/page files, actual API route files, actual schema/entity files, the active frontend router/bootstrap, the active layout/navigation component, the root CSS or theme-token files, key source assets, and the actual CSV headers plus representative rows before creating the plan.
6. Identify the active source app from workspace manifests, app bootstraps, router files, page directories, layout/navigation files, and backend route registration. Do not confuse archived folders or helper packages with the live product.
7. Read existing `.import/migration-checklist.md` and `.import/migration-plan.json` if they already exist. If either file is missing, create it only after the source intake above using the contracts below.
8. Update the checklist and plan with initial content immediately after the deep source intake, even if some values are still provisional.
9. Use `.import/domain-source.txt` only when it contains readable extracted text instead of raw binary or PDF object streams.
10. Treat `.tasks/domain.md` as low-authority org context. If it conflicts with `.import/project/` or `.import/database/`, record the warning and follow `.import/`.
11. Ignore any `AGENTS.md` files from `.import/project/` or temporary `client-only-spa` clones.
12. Fill the migration plan from the uploaded artifacts.
13. Merge template assets only after the source inventory and plan are clear.
14. Ensure the root `AGENTS.md` remains the `template-be-setup` instruction file. If a temporary template clone is needed inside `/workspace/development`, copy that template `AGENTS.md` to the repo root and ignore imported or client-template `AGENTS.md` files as root instructions.
15. Clone `client-only-spa` into a temporary folder, remove its `.git` metadata, merge its `app/` contents into the current repo, and preserve `app/lib/trpc-provider.tsx` plus `app/utils/error-logger.ts`.
16. Create initial Drizzle schema, contracts, queries, services, router procedures, seed data, and implementation slices from source entities and CSV tables.
17. Use CSV rows when present to seed SQLite. Do not replace row-backed CSV data with unrelated demo content.
18. Port the imported app shell, navigation labels, primary routes, and core page hierarchy from the active source app. If some workflows have thinner data support, keep the routes and source-shaped UI with honest empty states or staged wiring instead of deleting them.
19. Preserve the active source frontend's concrete visual identity: logo usage, nav grouping, route labels, typography direction, root theme tokens, and page-level layout patterns. Do not swap these for a new generic shell.
20. Add source-derived tests, run build-task validation, and use Playwright interactive verification to prove the migrated app works at a base level.
21. Leave `.import/`, the checklist, and the plan in place for phase 2.

Do not treat the first passing build or a partially rendered page as phase 1 completion. Phase 1 completes only when the migrated app is materially implemented, runs, and survives basic source-backed interactive verification.

## Execution Budget

After the checklist and plan exist with initial content:

- Spend at most two turns on additional read-only source inspection before the first implementation edit.
- Read only the files needed to implement the first source-backed implementation batch while preserving the active app shell, route map, navigation labels, and product framing. Do not inspect every workflow before editing.
- If more source context is needed, record the gap in the checklist and keep implementing the already-evidenced workflow.
- If you cannot make a source-backed implementation edit after the bounded intake, fail the task with the missing evidence instead of continuing exploration.
- After the first implementation edit, keep moving between implementation, validation, and Playwright verification until the app works at a basic level. Do not stall in repeated read-only diagnosis.

Before the checklist and plan exist:

- Spend the needed turns on deep source intake of `.import/project/` and `.import/database/`.
- Confirm the real nested root folders, main app entrypoints, backend entrypoints, major routes/pages, and CSV tables before writing the first plan/checklist draft.
- Do not write a shallow plan from top-level filenames alone.

## AGENTS.md Rule

The root `AGENTS.md` for the migrated repo must come from `template-be-setup`.

- The import bootstrap starts from `template-be-setup`, so the current root `AGENTS.md` is already the template instruction file unless there is explicit evidence otherwise.
- Re-read the current root `AGENTS.md` and record that it is the template instruction file.
- Do not search outside `/workspace/development` for `template-be-setup` or `AGENTS.md`.
- Only copy `AGENTS.md` from a `template-be-setup` clone if that clone already exists inside `/workspace/development`.
- Do not merge root instructions from the uploaded source project.
- Do not copy `AGENTS.md` from `client-only-spa`.
- Treat all imported `AGENTS.md` files as reference artifacts only.

## Source Inventory

Inspect the imported project before choosing schema or UI direction.

The inspection must be deep enough to identify the actual live app, not just archived or helper folders.

- If `.import/project/` contains a single top-level extracted folder, descend into it and treat that as the effective source root.
- Distinguish active app folders from `_archived`, legacy, helper, or generated artifacts.
- Identify which frontend folder is the current app and which backend folder is the current API/service layer.

Record:

- app and package names
- likely product name
- source routes and pages
- active frontend root and active backend root
- active frontend router/bootstrap file
- source layout/navigation files
- source theme-token or root CSS files
- source brand assets and logos
- API routes and handlers
- entities and schema files
- key workflows
- integrations
- source tests or screenshots
- auth or user model hints
- important assets and branding in the source archive

Use org brand files only for presentation context after the source product identity is known.
Do not let org-brand or `.tasks/domain.md` content rename the product or replace the source route map.

## Database Inventory

Inspect `.import/database/` CSV files.

- If `.import/database/` contains a nested extracted root folder, descend into it before inspecting CSVs.
- Read actual headers and representative rows from the important CSVs before inferring schema or workflow meaning.

Record:

- table names
- columns
- whether each CSV has data rows available for seeding
- obvious primary keys
- obvious foreign keys
- enum or status columns
- dates or timestamps
- monetary or numeric columns
- user or customer identity columns
- missing or partial tables

Do not fail because CSVs are incomplete if there is enough source code to infer the migration plan. Add warnings instead.

If a CSV has rows, record that it must be used as seed data by the build task. Do not treat row-bearing CSVs as schema-only evidence.

## Domain Inventory

Inspect `.import/domain/` and `.import/domain-source.txt`.

- Use extracted readable text when available.
- Treat raw PDF or object streams as low-confidence.
- Do not let unreadable domain material override source code and CSV evidence.
- Use org name, description, logo, colors, and brand tone only for visual or presentation context.

## Migration Plan Contract

Write `.import/migration-plan.json` before broad implementation work.

Required top-level fields:

- `appName`
- `sourceSummary`
- `workflows`
- `sourceRoutes`
- `sourceNavigation`
- `sourcePages`
- `sourceTheme`
- `sourceBrandAssets`
- `activeFrontendRoot`
- `activeBackendRoot`
- `sourceLayoutFiles`
- `sourceApiRoutes`
- `sourceEntities`
- `sourceIntegrations`
- `csvTables`
- `seedDataSources`
- `proposedDrizzleTables`
- `verificationTargets`
- `warnings`
- `confidence`

Each workflow should include:

- `id`
- `name`
- `sourceEvidence`
- `entities`
- `routesOrPages`
- `apiRoutes`
- `verification`
- `sourceVisibleSurface`

Each proposed table should include:

- `name`
- `sourceEvidence`
- `columns`
- `relationships`
- `warnings`

Each seed data source should include:

- `tableName`
- `csvPath`
- `rowCount`
- `keyColumns`
- `relationshipHints`
- `seedUse`
- `warnings`

Keep the plan factual. If evidence is weak, write that explicitly in `warnings`.
Do not write a plan that only covers a subset of the visible source app without explicitly listing the omitted routes/pages/workflows and the blocker for each omission.
Do not create a provisional plan that intentionally caps the imported product to an arbitrary subset of workflows when the active source route map already proves the app is broader.

## Working Checklist Contract

Read existing `.import/migration-checklist.md` near the start of build, or create it if missing, and update it as work proceeds.

Use this exact top-level section order:

```md
# Existing Project Migration Checklist

## Build Context Reload
- [ ] Read root AGENTS.md
- [ ] Read existing-project-migration SKILL.md
- [ ] Read phase 1 reference

## Source Intake
- [ ] Inventory .import/project source files
- [ ] Inventory .import/database CSV files
- [ ] Inventory .import/domain files and domain-source.txt
- [ ] Identify imported app name from zip evidence
- [ ] Identify active frontend root, backend root, and live router files
- [ ] Enumerate the full active source route map and navigation labels
- [ ] Capture source theme tokens, brand assets, layout shell, and navigation sections
- [ ] Identify primary source workflows from zip evidence
- [ ] Identify source entities and integrations from zip evidence
- [ ] Mark unreadable or low-confidence artifacts with warnings

## Branding Boundary
- [ ] Identify org branding inputs, if available
- [ ] Confirm org context is presentation-only
- [ ] Confirm .tasks/domain.md does not override imported zip evidence
- [ ] Confirm app domain/workflows/entities come from imported zips

## Runtime Instructions
- [ ] Confirm current root AGENTS.md is the template-be-setup instruction file
- [ ] Re-read root AGENTS.md after confirmation
- [ ] Confirm imported/client-template AGENTS.md files were ignored as root instructions

## Migration Plan
- [ ] Write .import/migration-plan.json
- [ ] Include source-backed workflows
- [ ] Include active source route map and visible app surfaces
- [ ] Include full source navigation labels and route ownership
- [ ] Include source-backed entities and tables
- [ ] Include CSV row-backed seed data sources when rows exist
- [ ] Include verification targets for imported workflows
- [ ] Include warnings and confidence

## Template Foundation
- [ ] Merge client-only-spa app files without copying .git metadata
- [ ] Keep template-be-setup AGENTS.md at the repo root
- [ ] Preserve template-be-setup backend wiring
- [ ] Preserve app/lib/trpc-provider.tsx
- [ ] Preserve app/utils/error-logger.ts
- [ ] Remove temporary template clone leftovers

## Build Implementation
- [ ] Create initial Drizzle schema and contracts from CSV/source evidence
- [ ] Seed the generated SQLite database from uploaded CSV rows when present
- [ ] Implement source-derived backend and frontend workflows
- [ ] Preserve source navigation, route labels, and layout language
- [ ] Preserve source theme, logo usage, and page-level layout structure
- [ ] Add source-derived tests and validation targets
- [ ] Use Playwright interactive verification for base-level app behavior
- [ ] Keep build source-driven, not org-domain-driven
- [ ] Run build-task validation commands

## Verify Handoff
- [ ] Summarize imported app name
- [ ] Summarize detected workflows
- [ ] Summarize proposed tables
- [ ] Summarize CSV seed data sources
- [ ] Summarize remaining verify focus areas
```

Rules:

- Keep checkboxes concrete and continuously updated.
- Add task-specific checkboxes only when a discovered requirement is real.
- Do not remove `.import/`, `.import/migration-checklist.md`, or `.import/migration-plan.json` during phase 1. They are required handoff state for `migration_verify`.
- Do not use the checklist to justify weak work; unchecked items must be completed or explained in the task failure summary.

## Template Merge

Use the full-stack template as the runtime foundation.

When copying from `client-only-spa`:

- copy only needed application files
- preserve full-stack template backend wiring
- preserve `app/lib/trpc-provider.tsx`
- preserve `app/utils/error-logger.ts`
- remove temporary clone folders
- remove any copied `.git` metadata
- ignore client template `AGENTS.md`

## Build Validation

Before completing:

- `.import/migration-plan.json` exists and is source-driven
- `.import/migration-checklist.md` exists and build sections are fully checked or clearly failed
- root `AGENTS.md` is from `template-be-setup`
- imported/client-template `AGENTS.md` files were not installed as root instructions
- schema, contracts, implementation, and tests line up with source entities and CSVs
- row-bearing CSVs are recorded as seed sources in the migration plan and used by the build
- warnings are explicit for missing or low-confidence inputs
- build-task validation commands pass
- basic Playwright interactive verification has been run against source-backed behavior, not only template boot
- the repo is not left in a half-migrated or obviously broken state

Completion summary must list the app name, detected workflows, proposed tables, seed-data sources, remaining verify focus areas, and any warnings.
