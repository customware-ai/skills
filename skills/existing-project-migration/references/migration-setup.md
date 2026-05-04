# Migration Setup Reference

Use this reference for the `migration_setup` task.

## Goal

Prepare the target repo for conversion by combining templates, installing the correct root instructions, and producing a source-driven migration plan before schema or app implementation proceeds.

## Required Order

1. Read project instructions, `SKILL.md`, and this reference.
2. Inspect `.import/project/`, `.import/database/`, `.import/domain/`, and `.import/domain-source.txt`.
3. Clone or inspect the `template-be-setup` reference repo if it is not already the working base.
4. Copy `AGENTS.md` from `template-be-setup` into the target repo root.
5. Re-read the copied root `AGENTS.md` before continuing.
6. Ignore any `AGENTS.md` files from `.import/project/` or temporary `client-only-spa` clones.
7. Build `.import/migration-plan.json` from the uploaded artifacts.
8. Merge template assets only after the source inventory and plan are clear.
9. Create initial Drizzle schema/contracts from source entities and CSV tables.
10. Run static validation relevant to setup.

## AGENTS.md Rule

The root `AGENTS.md` for the migrated repo must come from `template-be-setup`.

- Replace the target repo root `AGENTS.md` with the `template-be-setup` version.
- Do not merge root instructions from the uploaded source project.
- Do not copy `AGENTS.md` from `client-only-spa`.
- Treat all imported `AGENTS.md` files as reference artifacts only.
- After replacement, immediately re-read root `AGENTS.md` and follow it for all later work.

## Source Inventory

Inspect the imported project before choosing schema or UI direction.

Record:

- app/package names
- likely product name
- source routes and pages
- API routes and handlers
- entities and schema files
- key workflows
- integrations
- source tests or screenshots
- auth/user model hints
- important assets and branding in the source archive

Use org brand files only for presentation context after the source product identity is known.

## Database Inventory

Inspect `.import/database/` CSV files.

Record:

- table names
- columns
- obvious primary keys
- obvious foreign keys
- enum/status columns
- dates/timestamps
- monetary/numeric columns
- user/customer identity columns
- missing or partial tables

Do not fail because CSVs are incomplete if there is enough source code to infer the migration plan. Add warnings instead.

## Domain Inventory

Inspect `.import/domain/` and `.import/domain-source.txt`.

- Use extracted readable text when available.
- Treat raw PDF/object streams as low-confidence.
- Do not let unreadable domain material override source code and CSV evidence.
- Use org name, description, logo, colors, and brand tone only for visual/presentation context.

## Migration Plan Contract

Write `.import/migration-plan.json` before implementing schema/contracts.

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

Keep the plan factual. If evidence is weak, write that explicitly in `warnings`.

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

## Setup Validation

Before completing:

- `.import/migration-plan.json` exists and is source-driven
- root `AGENTS.md` is from `template-be-setup`
- imported/client-template `AGENTS.md` files were not installed as root instructions
- schema/contracts line up with source entities and CSVs
- warnings are explicit for missing/low-confidence inputs
- setup validation commands pass

Completion summary must list the app name, detected workflows, proposed tables, root `AGENTS.md` source, and any warnings.
