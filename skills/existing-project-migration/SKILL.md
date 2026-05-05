---
name: existing-project-migration
license: MIT
compatibility: Requires git, npm, Node.js, access to the prepared Customware migration workspace, and the extracted import artifacts under `.import/`.
metadata:
  author: customware-ai
  version: "1.1"
description: >
  Use this skill for Customware existing-project migration tasks that convert uploaded
  `projects.zip`, `database.zip`, and `domain.zip` artifacts into the standard
  full-stack Customware target app. This skill is for the single migration build task
  and the follow-up migration verify task.
---

# Existing Project Migration

Use this skill for the two import migration tasks:

- `migration_build`
- `migration_verify`

## Source Authority

The uploaded artifacts drive the migration.

Priority:

1. `.import/project/` from `projects.zip` is the primary source for product behavior, routes, UI, workflows, integrations, and business logic.
2. `.import/database/` from `database.zip` is the primary source for persisted entities, table shape, schema inference, and seed data when CSV rows exist.
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

- `migration_build`: `.agents/skills/existing-project-migration/references/migration-build.md`
- `migration_verify`: `.agents/skills/existing-project-migration/references/migration-verify.md`

Do not infer underscore filenames such as `migration_build.md` or `migration_verify.md`.
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
- Use CSV rows from `.import/database/` as seed data when present; do not replace real uploaded rows with unrelated demo data.
- Treat existing `.import/migration-checklist.md` and `.import/migration-plan.json` as the source of truth when they are already present; only create them if missing.
- During `migration_build`, read the existing checklist and plan immediately after reading the build reference, update them before broad exploration, and do not drift into broad target app/server internals until the checklist and plan files already exist with initial content.
- During `migration_build`, treat the current repo root `AGENTS.md` as the `template-be-setup` instructions when the repo has already been bootstrapped from `template-be-setup`; do not search outside `/workspace/development` for template files.
- During `migration_verify`, focus on independent runtime and interactive QA. If a missed end-to-end path is discovered, add or fix the corresponding Playwright coverage before completing.
- Do not spend more than two consecutive turns on read-only exploration without either updating a required migration artifact, changing implementation or test files, or calling the explicit completion or failure command.
- If the imported source remains too ambiguous to proceed after the required source intake, fail with a concrete summary instead of continuing exploratory loops.
- Treat more than two read-only turns after the migration plan is loaded as a task failure unless the next turn updates the checklist, edits implementation files, or starts the required interactive verification.
- Prefer a source-backed vertical slice over exhaustive migration analysis. Implement the smallest runnable version that preserves the primary source workflows, then iterate from tests and Playwright evidence.

## Completion Gate

Before completing a migration task, confirm:

- The app domain comes from `.import/project/`, `.import/database/`, and `.import/domain/`.
- Org branding was used only as presentation context.
- The generated app is not generic and not based on unrelated org/company knowledge.
- Validation covered source-derived workflows.
- Any skipped workflow is listed with a concrete reason.
- The working checklist is fully checked for this task.
- Temporary checklist or work files are cleaned up only at the end of `migration_verify` after verification succeeds.
- If the checklist still has required unchecked items, do not complete successfully.
