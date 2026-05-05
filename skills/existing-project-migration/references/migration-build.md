# Migration Build Reference

Use this reference for the `migration_build` task.

## Goal

Prepare the target repo and fully migrate the imported product in one task:

- build the migration plan
- merge the template foundation
- install the correct root instructions
- create schema and contracts
- seed from CSV rows when present
- implement source-derived workflows
- add source-derived tests
- leave the repo ready for a separate QA verify task

## Output Contract While Working

The following files are required working artifacts during the build task:

- `.import/migration-checklist.md`
- `.import/migration-plan.json`

Rules:

- Read both files near the start of build if they already exist; create only the missing one(s) before broad exploration or template merge.
- Keep them populated continuously while working; they are required migration state.
- If either file is missing by the time build reaches template merge or implementation work, fail the task.
- If the plan lacks the required top-level fields, at least one workflow, or at least one verification target, fail the task instead of continuing.

## Required Order

1. Read project instructions, `SKILL.md`, this exact reference path, and `.import/verification.json`.
2. Read existing `.import/migration-checklist.md` and `.import/migration-plan.json` immediately; if either file is missing, create it using the contracts below.
3. Update the checklist and plan with initial content before broad exploration, even if many values are still provisional.
4. Inspect only the minimum source intake needed from `.import/project/`, `.import/database/`, and `.import/domain/` to identify the app name, core workflows, CSV tables, major routes, and seed-data sources.
5. Use `.import/domain-source.txt` only when it contains readable extracted text instead of raw binary or PDF object streams.
6. Re-read the current root `AGENTS.md`; the working repo is already bootstrapped from `template-be-setup`.
7. Ignore any `AGENTS.md` files from `.import/project/` or temporary `client-only-spa` clones.
8. Fill the migration plan from the uploaded artifacts.
9. Merge template assets only after the source inventory and plan are clear.
10. Create initial Drizzle schema, contracts, queries, services, router procedures, seed data, and implementation slices from source entities and CSV tables.
11. Add source-derived tests and run build-task validation.
12. Leave the checklist and plan in place for the verify task.

## Execution Budget

After the checklist and plan exist with initial content:

- Spend at most two turns on additional read-only source inspection before the first implementation edit.
- Read only the files needed to implement the first source-backed vertical slice. Do not inspect every workflow before editing.
- If more source context is needed, record the gap in the checklist and keep implementing the already-evidenced workflow.
- If you cannot make a source-backed implementation edit after the bounded intake, fail the task with the missing evidence instead of continuing exploration.

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

Record:

- app and package names
- likely product name
- source routes and pages
- API routes and handlers
- entities and schema files
- key workflows
- integrations
- source tests or screenshots
- auth or user model hints
- important assets and branding in the source archive

Use org brand files only for presentation context after the source product identity is known.

## Database Inventory

Inspect `.import/database/` CSV files.

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
- `sourcePages`
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

## Working Checklist Contract

Read existing `.import/migration-checklist.md` near the start of build, or create it if missing, and update it as work proceeds.

Use this exact top-level section order:

```md
# Existing Project Migration Checklist

## Build Context Reload
- [ ] Read root AGENTS.md
- [ ] Read existing-project-migration SKILL.md
- [ ] Read migration build reference
- [ ] Read migration verify reference if needed for handoff shape

## Source Intake
- [ ] Inventory .import/project source files
- [ ] Inventory .import/database CSV files
- [ ] Inventory .import/domain files and domain-source.txt
- [ ] Identify imported app name from zip evidence
- [ ] Identify primary source workflows from zip evidence
- [ ] Identify source entities and integrations from zip evidence
- [ ] Mark unreadable or low-confidence artifacts with warnings

## Branding Boundary
- [ ] Identify org branding inputs, if available
- [ ] Confirm org context is presentation-only
- [ ] Confirm app domain/workflows/entities come from imported zips

## Runtime Instructions
- [ ] Confirm current root AGENTS.md is the template-be-setup instruction file
- [ ] Re-read root AGENTS.md after confirmation
- [ ] Confirm imported/client-template AGENTS.md files were ignored as root instructions

## Migration Plan
- [ ] Write .import/migration-plan.json
- [ ] Include source-backed workflows
- [ ] Include source-backed entities and tables
- [ ] Include CSV row-backed seed data sources when rows exist
- [ ] Include verification targets for imported workflows
- [ ] Include warnings and confidence

## Template Foundation
- [ ] Merge client-only-spa app files without copying .git metadata
- [ ] Preserve template-be-setup backend wiring
- [ ] Preserve app/lib/trpc-provider.tsx
- [ ] Preserve app/utils/error-logger.ts
- [ ] Remove temporary template clone leftovers

## Build Implementation
- [ ] Create initial Drizzle schema and contracts from CSV/source evidence
- [ ] Seed the generated SQLite database from uploaded CSV rows when present
- [ ] Implement source-derived backend and frontend workflows
- [ ] Add source-derived tests and validation targets
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
- Do not remove `.import/migration-checklist.md` during build. It is handoff state for `migration_verify`.
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

Completion summary must list the app name, detected workflows, proposed tables, seed-data sources, remaining verify focus areas, and any warnings.
