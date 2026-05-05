---
name: existing-project-migration
license: MIT
compatibility: Requires git, npm, Node.js, access to the prepared Customware migration workspace, and the extracted import artifacts under `.import/`.
metadata:
  author: customware-ai
  version: "2.0"
description: >
  Use this skill for Customware existing-project migration tasks that move uploaded
  customer apps from other builders into the standard Customware stack while
  preserving the source product's routes, workflows, UI, UX, and styling as
  closely as possible. This skill covers both `Migration build` and
  `Migration verify` and includes self-grading quality gates that must pass
  before the task can complete.
---

# Existing Project Migration

## Core Idea

Re-read this `SKILL.md` after every compaction before continuing work. Do not assume conversational memory is sufficient.

This skill is for tech stack migration, not product redesign.

- The customer already has an app.
- The job is to reorganize that app into the Customware stack.
- The source product's routes, workflows, labels, layout shell, visual language, and styling direction should survive the migration as closely as practical.
- The runtime stack must change to the prepared Customware stack built from `template-be-setup` plus the required `client-only-spa` merge rule.

Do not treat this task like a fresh app build, a domain reinterpretation, or a chance to simplify the product into a smaller generic dashboard.

## Source Authority

The uploaded artifacts drive the migration.

Priority:

1. `.import/project/` from `projects.zip` is the primary authority for product behavior, routes, UI, workflows, integrations, and business logic.
2. `.import/database/` from `database.zip` is the primary authority for persisted entities, schema inference, and seed data when CSV rows exist.
3. `.import/domain/` and `.import/domain-source.txt` from `domain.zip` are supporting context only.
4. `.tasks/domain.md` plus org name, org description, logos, colors, and brand context are low-authority presentation context only.

Do not let org/company knowledge or `.tasks/domain.md` redefine the imported product's domain, routes, workflows, schema, or product framing. This migration intentionally does not rely on the domain skill as product authority.
While `.tasks/domain.md` may exist, treat it as effectively ignorable for product-definition decisions during migration. The real source of truth is the imported codebase in `.import/project/` plus the imported database files in `.import/database/`. Use domain material only if it helps clarify minor presentation context and never let it outrank source code or source data.

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

Do not preserve the uploaded source app's original runtime stack.

## Required Phase References

Read the exact files for the active task before doing work.

- `Migration build`
  - `.agents/skills/existing-project-migration/references/phase-1/overview.md`
  - `.agents/skills/existing-project-migration/references/phase-1/artifacts.md`
  - `.agents/skills/existing-project-migration/references/phase-1/grading.md`
- `Migration verify`
  - `.agents/skills/existing-project-migration/references/phase-2/overview.md`
  - `.agents/skills/existing-project-migration/references/phase-2/artifacts.md`
  - `.agents/skills/existing-project-migration/references/phase-2/grading.md`

If the task text is unclear, read both phase overview files first, determine which phase is active, then load the matching artifact and grading references.

## Critical Migration Invariant

These are hard rules.

- This is a stack migration. Preserve the source product; replace the runtime foundation.
- Preserve the imported app's visible route map, navigation labels, page hierarchy, major layout blocks, workflows, typography direction, theme tokens, and logo usage unless the fixed stack makes an exact copy impossible.
- Treat the imported frontend as the visual and information-architecture authority. Read the active router/bootstrap, layout/navigation files, theme/root CSS files, key assets, and representative page files before deciding UI direction.
- Do not invent migration-themed copy such as `Imported App Migration`, `Migration slice`, or any similar framing.
- Do not collapse the imported app into a narrow vertical slice just because the CSV exports cover only part of the data model.
- Do not replace source-visible pages with generic hero cards, placeholder dashboards, or filler prose.
- Do not keep legacy runtimes, back-compat handlers, or extra validator services just to make the migration look successful.
- Remove template demo pages, placeholder copy, and template-only tests when they no longer match the imported product.
- Use CSV rows from `.import/database/` as seed-data authority when present.
- Use the agent-owned review artifacts below as the enforcement layer. If the score fails or ordinary drift remains open, the phase is still open.

## Required Enforcement Artifacts

These files are mandatory quality gates during migration:

- `.import/migration-plan.json`
- `.import/migration-checklist.md`
- `.import/migration-review.md`
- `.import/migration-open-gaps.md`

Use these templates directly:

- `.agents/skills/existing-project-migration/assets/templates/migration-plan.json`
- `.agents/skills/existing-project-migration/assets/templates/migration-checklist.md`
- `.agents/skills/existing-project-migration/assets/templates/migration-review.md`
- `.agents/skills/existing-project-migration/assets/templates/migration-open-gaps.md`

Rules:

- `Migration build` creates any missing artifact only after deep source intake.
- `Migration verify` fails if any required artifact is missing at verify start.
- Update `migration-review.md` and `migration-open-gaps.md` after every meaningful implementation or verification pass.
- Do not replace the ledger tables in the templates with vague prose.
- The first real grading pass is not allowed to declare zero gaps unless an adversarial pass is already recorded and it genuinely found no blocking drift.
- If any critical rubric item fails, if the score threshold is missed, or if `migration-open-gaps.md` still contains ordinary migration drift, the task is not done.

## Phase Model

- `Migration build` is phase 1.
  - Deep source intake
  - Migration plan and checklist
  - Template merge
  - Source-derived schema, routes, pages, and workflows
  - Base Playwright verification
  - First passing migration grade
- `Migration verify` is phase 2.
  - Reload phase-1 artifacts
  - Interactive full-app QA
  - Fresh-database runtime verification
  - Playwright coverage repair or expansion
  - Final passing migration grade
  - Cleanup of temporary migration-only review artifacts

Both phases must loop until the score threshold passes, all critical items pass, and no ordinary open gaps remain.
Do not run the rubric a couple of times, notice it is still failing, and stop. The point of grading is to force more iteration. Keep fixing and re-grading until the result clears the passing bar with a strong score, roughly in the high-pass range rather than barely scraping by.

## Non-Negotiables

- Keep the migration zip-driven.
- Keep org context limited to presentation context, not product-authority context.
- Keep the runtime on the fixed Customware stack.
- Preserve `app/lib/trpc-provider.tsx` and `app/utils/error-logger.ts` when merging `client-only-spa` `app/`.
- Do not search outside the prepared workspace for alternate template instructions unless the workspace already contains an allowed clone.
- Leave `.import/` source artifacts in place through phase 2 unless explicit task instructions say otherwise.
- Fail with a concrete blocker rather than self-approving a weak migration.
