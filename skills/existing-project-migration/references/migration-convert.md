# Migration Convert Reference

Use this reference for the `migration_convert` task.

## Goal

Implement the imported product in the Customware full-stack target repo by following `.import/migration-plan.json` and preserving source-derived workflows, entities, labels, and verification targets.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, and this reference.
2. Read `.import/migration-plan.json`.
3. Re-inspect source files for each workflow before implementing it.
4. Implement workflows in priority order from the migration plan.
5. Implement backend contracts, queries, services, router procedures, and Drizzle migrations from the source-derived entities.
6. Implement frontend routes/pages/components from source-derived workflows.
7. Add tests mapped to migration-plan verification targets.
8. Run interactive Playwright verification for migrated workflows.
9. Run automated validation.
10. Complete only when source-derived verification targets pass or skipped items are explicitly justified.

## Plan Authority

`.import/migration-plan.json` is the execution plan.

- Do not replace it with org-domain assumptions.
- Do not invent a new product around org branding.
- Re-open source files when the plan is ambiguous.
- If the plan is missing or clearly wrong, fail the task with a concrete summary instead of building a generic app.

## Implementation Rules

Use the fixed target stack:

- React Router frontend
- Hono server
- tRPC router
- Zod contracts
- SQLite via `better-sqlite3`
- Drizzle schema and migrations

Keep source concepts recognizable:

- workflow names
- route/page concepts
- entity names
- status values
- important labels
- integration surfaces
- user/customer/order/inventory concepts when present

Do not copy the uploaded app's original runtime stack as-is. Port the product behavior into the target stack.

## Backend Rules

For each source-derived entity or workflow:

- define Drizzle tables where persistence is needed
- generate migrations
- define Zod input/output contracts
- implement query and service layers
- expose tRPC procedures
- keep result/error flow consistent with the target template conventions

Do not implement only mocked frontend state when the workflow is persisted in source evidence or CSVs.

## Frontend Rules

Build operational screens around the imported workflows.

- Preserve the source app's route/page concepts where practical.
- Use org branding for logo, colors, and visual identity only after the product domain is set by the import artifacts.
- Avoid generic dashboards unless the source app actually contains one.
- Do not create a new product category that is absent from the uploaded zips.

## Verification Rules

Verification must prove source-workflow parity.

Required:

- unit/service tests for key backend workflows
- route/component tests for key UI flows where useful
- Playwright e2e tests named after imported workflows
- interactive Playwright verification of source-derived user flows
- `npm run build`
- the repo's relevant check/test command

Playwright should verify at least one primary workflow from `.import/migration-plan.json`. Prefer several when the plan has multiple primary workflows.

Do not treat template smoke tests, generic dashboard tests, or unrelated happy paths as migration validation.

## Runtime Startup

Generated full-stack apps must work in a fresh review/runtime sandbox.

- Generate Drizzle migrations for schema changes.
- Ensure runtime/review startup runs migrations before first app traffic, or document and wire the expected review startup command.
- Verify the app does not fail on an empty fresh SQLite database with missing-table errors.

## Failure Conditions

Fail the task instead of completing if:

- `.import/migration-plan.json` is missing
- source app workflows cannot be identified
- implementation is based on org/company domain instead of uploaded artifacts
- no source-derived workflow is testable
- review/runtime boot cannot be made to work
- validation only covers generic/template behavior

## Completion Summary

The completion summary must include:

- imported app name
- migrated workflows
- generated tables/migrations
- Playwright workflows verified
- automated commands run
- skipped workflows and concrete reasons
- warnings carried forward from the migration plan
