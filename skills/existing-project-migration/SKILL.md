---
name: existing-project-migration
license: MIT
compatibility: Requires git, npm, Node.js, access to the prepared Customware migration workspace, and the extracted import artifacts under `.import/`.
metadata:
  author: customware-ai
  version: "1.0"
description: >
  Use this skill for Customware existing-project migration tasks that convert uploaded
  `projects.zip`, `database.zip`, and `domain.zip` artifacts into the standard
  full-stack Customware target app. This skill is for `migration_setup` and
  `migration_convert` tasks and enforces zip-driven source discovery, migration-plan
  creation, source-workflow parity, and source-derived Playwright verification.
---

# Existing Project Migration

Use this skill for the two import migration tasks:

- `migration_setup`
- `migration_convert`

## Source Authority

The uploaded artifacts drive the migration.

Priority:

1. `.import/project/` from `projects.zip` is the primary source for product behavior, routes, UI, workflows, integrations, and business logic.
2. `.import/database/` from `database.zip` is the primary source for persisted entities, table shape, and schema inference.
3. `.import/domain/` and `.import/domain-source.txt` from `domain.zip` are supporting domain context.
4. Org name, description, logos, colors, and brand context are presentation context only.

Do not let org/company knowledge redefine the imported app's product domain, workflows, entities, or schema.

## Fixed Target Stack

Migrate into the prepared Customware full-stack target:

- Vite
- React Router
- TypeScript
- Zod
- Node
- Hono
- tRPC
- SQLite via `better-sqlite3`
- Drizzle ORM and migrations

Do not preserve the uploaded source app's original stack as the runtime stack.

## Required References

Read the reference for the current task before doing any work:

- `migration_setup`: `.agents/skills/existing-project-migration/references/migration-setup.md`
- `migration_convert`: `.agents/skills/existing-project-migration/references/migration-convert.md`

Do not infer underscore filenames such as `migration_setup.md` or `migration_convert.md`.
If the task kind is unclear, read both exact reference paths above and determine which one matches the active task text.

## Shared Rules

- Keep the migration zip-driven.
- Keep org context limited to brand presentation, not app-domain decisions.
- Keep the target runtime on the fixed Customware full-stack template.
- Use an agent-owned checklist while working. Do not rely on external validators to decide migration quality.
- Re-read this skill plus `.import/migration-checklist.md` and `.import/migration-plan.json` after any interruption or compaction before continuing work.
- Treat unreadable or raw binary domain content as low-confidence supporting material.
- Fail rather than complete a task that cannot identify or preserve the imported app's core workflows.
- Verify source-derived workflows, not generic template screens.
- Treat existing `.import/migration-checklist.md` and `.import/migration-plan.json` as the source of truth when they are already present; only create them if missing.
- During `migration_setup`, read the existing checklist and plan immediately after reading the setup reference, update them before broad exploration, and do not read the `migration_convert` reference or broad target app/server internals until the checklist and plan files already exist with initial content.
- During `migration_setup`, treat the current repo root `AGENTS.md` as the `template-be-setup` instructions when the repo has already been bootstrapped from `template-be-setup`; do not search outside `/workspace/development` for template files.
- Do not spend more than two consecutive turns on read-only exploration without either updating a required migration artifact, changing implementation files, or calling the explicit completion or failure command.
- If the imported source remains too ambiguous to proceed after the required source intake, fail with a concrete summary instead of continuing exploratory loops.
- Treat more than two read-only turns after the migration plan is loaded as a task failure unless the next turn updates the checklist or edits implementation files.
- Prefer a source-backed vertical slice over exhaustive migration analysis. Implement the smallest runnable version that preserves the primary source workflows, then iterate from tests and Playwright evidence.

## Completion Gate

Before completing a migration task, confirm:

- The app domain comes from `.import/project/`, `.import/database/`, and `.import/domain/`.
- Org branding was used only as presentation context.
- The generated app is not generic and not based on unrelated org/company knowledge.
- Validation covered source-derived workflows.
- Any skipped workflow is listed with a concrete reason.
- The working checklist is fully checked for this task.
- Temporary checklist/work files are cleaned up at the end of `migration_convert` after verification succeeds.
- If the checklist still has required unchecked items, do not continue into the next task and do not complete successfully.
