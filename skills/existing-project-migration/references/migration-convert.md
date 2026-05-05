# Migration Convert Reference

Use this reference for the `migration_convert` task.

## Goal

Implement the imported product in the Customware full-stack target repo by following `.import/migration-plan.json` and preserving source-derived workflows, entities, labels, and verification targets.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, and this exact reference path.
2. Read `.import/migration-plan.json`.
3. Read `.import/migration-checklist.md` from setup, or fail if it is missing.
4. Extend and update `.import/migration-checklist.md` using the conversion sections below.
5. Re-inspect only the source files needed for the top two workflows and the CSV-backed entities before implementing.
6. Implement a source-backed vertical slice immediately after that bounded intake.
7. Implement backend contracts, queries, services, router procedures, and Drizzle migrations from the source-derived entities.
8. Implement frontend routes/pages/components from source-derived workflows.
9. Add tests mapped to migration-plan verification targets.
10. Run interactive Playwright verification for migrated workflows.
11. Run automated validation.
12. Clean up temporary migration work files only after source-derived verification succeeds.
13. Complete only when source-derived verification targets pass or skipped items are explicitly justified.

## Execution Budget

After reading the plan and checklist:

- Spend at most two turns on additional read-only source inspection before the first implementation edit.
- Read only the files needed to implement the first vertical slice. Do not inspect every workflow before editing.
- If more source context is needed, record the gap in the checklist and keep implementing the already-evidenced workflow.
- If you cannot make a source-backed implementation edit after the bounded intake, fail the task with the missing evidence instead of continuing exploration.
- Do not read generic template files unless they are directly needed for the next edit.

First vertical slice requirements:

- Replace the generic template landing page with the imported app name and source-derived navigation.
- Implement at least two primary workflows from `.import/migration-plan.json`.
- Wire those workflows through real target-stack code, not static screenshots or generic cards.
- Use CSV-backed entities when available before inventing new persisted shapes.
- Keep labels, statuses, and entity names recognizable from the uploaded source.

## Plan Authority

`.import/migration-plan.json` is the execution plan.

- Do not replace it with org-domain assumptions.
- Do not invent a new product around org branding.
- Re-open source files when the plan is ambiguous.
- If the plan is missing or clearly wrong, fail the task with a concrete summary instead of building a generic app.

## Working Checklist Contract

Use `.import/migration-checklist.md` as the task-local quality gate.

At the start of conversion, append these sections if they are not already present:

```md
## Conversion Context Reload
- [ ] Re-read root AGENTS.md
- [ ] Re-read existing-project-migration SKILL.md
- [ ] Re-read migration convert reference
- [ ] Re-read .import/migration-plan.json
- [ ] Re-read setup warnings from the checklist and plan

## Workflow Implementation
- [ ] Re-inspect source evidence for each primary workflow before implementing
- [ ] Implement backend contracts for source-derived workflows
- [ ] Implement query/service/router layers for source-derived workflows
- [ ] Implement Drizzle tables and migrations for source-derived entities
- [ ] Implement frontend routes/pages/components for source-derived workflows
- [ ] Preserve source labels, statuses, entities, and workflow concepts where practical
- [ ] Confirm org branding was used only for presentation

## Source-Derived Testing
- [ ] Add unit/service tests for source-derived backend behavior
- [ ] Add Playwright tests named after imported workflows
- [ ] Avoid generic/template-only tests as completion evidence
- [ ] Run targeted automated tests
- [ ] Run build/check commands required by the repo

## Interactive Verification
- [ ] Use playwright-in-sandbox for interactive verification
- [ ] Verify at least one primary workflow from the migration plan
- [ ] Record which workflow paths were verified
- [ ] Record any skipped workflow with a concrete reason
- [ ] Confirm review/runtime startup does not fail on a fresh SQLite database

## Drift Check
- [ ] Confirm generated app name/domain match imported zip evidence
- [ ] Confirm generated tables match source/database evidence
- [ ] Confirm generated routes/pages match source workflow evidence
- [ ] Confirm no unrelated org/company domain replaced the imported app domain
- [ ] Confirm completion summary cites source-derived workflows and verification

## Convert Cleanup
- [ ] Remove temporary template clones
- [ ] Remove temporary execution notes
- [ ] Remove migration-checklist.md after all required boxes are complete
- [ ] Leave only durable app/source artifacts required by the final repo
```

Rules:

- Update the checklist continuously, not only at the end.
- Add workflow-specific checkboxes when the migration plan identifies concrete workflows.
- Do not complete the task with unchecked required boxes.
- If a required box cannot be checked, fail the task with the concrete blocker.
- Remove `.import/migration-checklist.md` as the final successful cleanup step. Do not remove it before final verification passes.
- Do not spend more than two consecutive turns on read-only exploration without either updating the checklist, implementing workflow code, writing tests, or calling the explicit failure command.
- If the source intake exceeds two read-only turns after the checklist has conversion sections, stop reading and make the next action an implementation edit or task failure.

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

If you cannot reach source-derived verification or runnable implementation with the available evidence, fail with a concrete summary instead of looping in more source exploration.

The completion summary must name the exact checklist sections that passed before cleanup.

## Runtime Startup

Generated full-stack apps must work in a fresh review/runtime sandbox.

- Generate Drizzle migrations for schema changes.
- Ensure runtime/review startup runs migrations before first app traffic, or document and wire the expected review startup command.
- Verify the app does not fail on an empty fresh SQLite database with missing-table errors.

## Failure Conditions

Fail the task instead of completing if:

- `.import/migration-plan.json` is missing
- `.import/migration-checklist.md` is missing at convert start
- source app workflows cannot be identified
- implementation is based on org/company domain instead of uploaded artifacts
- no source-derived workflow is testable
- review/runtime boot cannot be made to work
- validation only covers generic/template behavior
- required checklist items remain unchecked

## Completion Summary

The completion summary must include:

- imported app name
- migrated workflows
- generated tables/migrations
- Playwright workflows verified
- automated commands run
- skipped workflows and concrete reasons
- warnings carried forward from the migration plan
