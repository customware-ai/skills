---
name: existing-project-migration
license: MIT
compatibility: Requires git, npm, Node.js, access to the prepared Customware migration workspace, and the extracted import artifacts under `.import/`.
metadata:
  author: customware-ai
  version: "1.8"
description: >
  Use this skill for Customware existing-project migration tasks that convert uploaded
  `projects.zip`, `database.zip`, and `domain.zip` artifacts into the standard
  full-stack Customware target app. This skill is for phase 1 build migration work
  and phase 2 verify migration work. The skill must be followed rigorously until the
  assigned phase actually succeeds.
---

# Existing Project Migration

Use this skill for the two import migration tasks:

- `Migration build`
- `Migration verify`

## Source Authority

The uploaded artifacts drive the migration.

Priority:

1. `.import/project/` from `projects.zip` is the primary source for product behavior, routes, UI, workflows, integrations, and business logic.
2. `.import/database/` from `database.zip` is the primary source for persisted entities, table shape, schema inference, and seed data when CSV rows exist.
3. `.import/domain/` and `.import/domain-source.txt` from `domain.zip` are supporting domain context.
4. `.tasks/domain.md` and org name, description, logos, colors, and brand context are presentation context only.

Do not let org/company knowledge or `.tasks/domain.md` redefine the imported app's product domain, routes, workflows, entities, integrations, or schema.

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

- `Migration build`: `.agents/skills/existing-project-migration/references/phase-1.md`
- `Migration verify`: `.agents/skills/existing-project-migration/references/phase-2.md`

Do not infer alternate or underscore filenames.
If the task kind is unclear, read both exact reference paths above and determine which one matches the active task text.

## Shared Rules

- Follow this skill rigorously. Do not stop halfway, do not give up early, and do not settle for partial progress when the assigned phase can still be completed.
- Treat success as required. Keep working until the assigned phase either succeeds with evidence or fails with a concrete blocker that cannot be resolved from the repo, sandbox, source artifacts, or available tools.
- Do not be lazy about source intake, implementation, testing, or verification. If the app is not working yet, the phase is not done.
- Treat `.import/project/` and `.import/database/` as the real extracted source authority, not as shallow placeholders. Inspect them thoroughly before making migration decisions.
- Do not assume the extracted zip contents are flat. The imported source may sit under one top-level folder inside `.import/project/`, and the CSV files may also sit under a nested root folder inside `.import/database/`. Find the real source roots before planning or implementing.
- Treat the imported frontend app as the visual authority. Preserve its route map, navigation structure, labels, typography, theme tokens, layout patterns, and page hierarchy unless the fixed Customware stack makes an exact copy impossible.
- Read the active frontend router/bootstrap, layout/navigation component, root CSS or theme-token files, source assets, and representative major page files before proposing any UI direction. Those files are the visual and information-architecture authority.
- If the imported frontend already uses a distinctive visual system or component stack, preserve that concrete direction. Do not replace it with a newly invented theme, shell, or layout concept.
- Enumerate the full visible source app surface from the active frontend before planning implementation. Do not arbitrarily cap the route list, workflow list, or page list to a smaller subset such as “four or five workflows”.
- Do not invent user-facing migration framing such as “Imported App Migration”, “Migration slice”, “Preserving the uploaded...”, or generic migration dashboards. The shipped app should look like the imported product, not like an AI migration demo.
- Do not preserve route count with filler content alone. For each visible source route, port the core layout blocks, headings, navigation context, primary actions, and page intent from the source app. Use honest source-shaped empty states only when real data or integrations are unavailable.
- Do not replace source page structure with generic metric cards, hero panels, placeholder dashboards, or generic prose unless that exact structure is already present in the imported frontend.
- Do not collapse the imported product into a narrow vertical slice just because the CSV exports cover only part of the data model. If the source app exposes visible routes, pages, and workflows beyond the CSV-backed data, preserve those surfaces using the best available source-backed implementation, empty states, or staged integration wiring rather than deleting them.
- Do not use “vertical slice”, “smallest slice”, “first slice”, or “reduced subset” reasoning to redefine the required phase-1 scope. You may sequence implementation internally, but the shipped phase-1 result must still preserve the imported product’s visible shell, route map, navigation, and core workflows.
- Missing seed data is not permission to delete source-visible routes, navigation items, or product areas that are clearly present in `.import/project/`.
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
- During `migration_build`, treat the work as phase 1. Read any existing checklist and plan after the required deep source intake. If they are missing, create them only after the required deep source intake. Do not drift into broad target app/server internals until the checklist and plan exist with source-backed initial content.
- During `migration_build`, do not read the phase-2 reference near the start of the task. Phase 1 should be planned from phase-1 requirements plus the imported artifacts. Only consult phase 2 near the end if a handoff detail is genuinely needed.
- During `migration_build`, treat the current repo root `AGENTS.md` as the `template-be-setup` instructions when the repo has already been bootstrapped from `template-be-setup`; do not search outside `/workspace/development` for template files.
- During `migration_build`, use Playwright interactive verification to prove the migrated app works at a base level before completing phase 1. Phase 1 is not done until the migrated app is actually runnable and basic source-backed flows have been exercised.
- During `migration_build`, do not remove `.import/`, `.import/migration-checklist.md`, or `.import/migration-plan.json`; phase 2 must still use them.
- During `migration_verify`, treat the work as phase 2. Focus on independent full-app runtime and interactive QA. If a missed end-to-end path is discovered, add or fix the corresponding Playwright coverage before completing. Phase 2 is not done until the app has been interactively verified more thoroughly and the remaining gaps have been fixed or explicitly failed.
- Do not spend more than two consecutive turns on read-only exploration without either updating a required migration artifact, changing implementation or test files, or calling the explicit completion or failure command.
- If the imported source remains too ambiguous to proceed after the required source intake, fail with a concrete summary instead of continuing exploratory loops.
- Treat more than two read-only turns after the migration plan is loaded as a task failure unless the next turn updates the checklist, edits implementation files, or starts the required interactive verification.
- Prefer focused, source-backed implementation over endless analysis, but keep the visible source app shell, route map, and product framing intact. Do not replace the imported product with a smaller generic dashboard.
- If implementation or verification reveals breakage, keep iterating on code and tests instead of stopping at a diagnosis. Reading the problem is not completion.

## Completion Gate

Before completing a migration task, confirm:

- The app domain comes from `.import/project/`, `.import/database/`, and `.import/domain/`.
- Org branding was used only as presentation context.
- The generated app is not generic and not based on unrelated org/company knowledge.
- The generated app preserves the imported product's visible route map, navigation labels, and overall visual language at a meaningful level.
- Validation covered source-derived workflows.
- Any skipped workflow is listed with a concrete reason.
- The working checklist is fully checked for this task.
- The task did not stop at a partial or halfway state while unresolved runnable issues still remained.
- `.import/` artifacts remain available through phase 2.
- Temporary checklist or work files are cleaned up only at the end of `migration_verify` after verification succeeds.
- If the checklist still has required unchecked items, do not complete successfully.
