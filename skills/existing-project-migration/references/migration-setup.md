# Migration Setup Reference

Use this reference for the `migration_setup` task.

## Goal

Prepare the target repo for conversion by combining templates, installing the correct root instructions, and producing a source-driven migration plan before schema or app implementation proceeds.

## Required Order

1. Read project instructions, `SKILL.md`, and this reference.
2. Create `.import/migration-checklist.md` using the contract below.
3. Inspect `.import/project/`, `.import/database/`, `.import/domain/`, and `.import/domain-source.txt`.
4. Clone or inspect the `template-be-setup` reference repo if it is not already the working base.
5. Copy `AGENTS.md` from `template-be-setup` into the target repo root.
6. Re-read the copied root `AGENTS.md` before continuing.
7. Ignore any `AGENTS.md` files from `.import/project/` or temporary `client-only-spa` clones.
8. Build `.import/migration-plan.json` from the uploaded artifacts.
9. Merge template assets only after the source inventory and plan are clear.
10. Create initial Drizzle schema/contracts from source entities and CSV tables.
11. Run static validation relevant to setup.

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

## Working Checklist Contract

Create `.import/migration-checklist.md` near the start of setup and update it as work proceeds.

Use this exact top-level section order:

```md
# Existing Project Migration Checklist

## Context Reload
- [ ] Read root AGENTS.md
- [ ] Read existing-project-migration SKILL.md
- [ ] Read migration setup reference
- [ ] Read migration convert reference if needed for handoff shape

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
- [ ] Copy template-be-setup AGENTS.md to root
- [ ] Re-read copied root AGENTS.md
- [ ] Confirm imported/client-template AGENTS.md files were ignored as root instructions

## Migration Plan
- [ ] Write .import/migration-plan.json
- [ ] Include source-backed workflows
- [ ] Include source-backed entities and tables
- [ ] Include verification targets for imported workflows
- [ ] Include warnings and confidence

## Template Setup
- [ ] Merge client-only-spa app files without copying .git metadata
- [ ] Preserve template-be-setup backend wiring
- [ ] Preserve app/lib/trpc-provider.tsx
- [ ] Preserve app/utils/error-logger.ts
- [ ] Remove temporary template clone leftovers

## Setup Implementation
- [ ] Create initial Drizzle schema/contracts from CSV/source evidence
- [ ] Keep setup source-driven, not org-domain-driven
- [ ] Run setup validation commands

## Setup Handoff
- [ ] Summarize imported app name
- [ ] Summarize detected workflows
- [ ] Summarize proposed tables
- [ ] Summarize warnings for convert
```

Rules:

- Keep checkboxes concrete and continuously updated.
- Add task-specific checkboxes only when a discovered requirement is real.
- Do not remove `.import/migration-checklist.md` during setup. It is handoff state for `migration_convert`.
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

## Setup Validation

Before completing:

- `.import/migration-plan.json` exists and is source-driven
- `.import/migration-checklist.md` exists and setup sections are fully checked or clearly failed
- root `AGENTS.md` is from `template-be-setup`
- imported/client-template `AGENTS.md` files were not installed as root instructions
- schema/contracts line up with source entities and CSVs
- warnings are explicit for missing/low-confidence inputs
- setup validation commands pass

Completion summary must list the app name, detected workflows, proposed tables, root `AGENTS.md` source, and any warnings.
