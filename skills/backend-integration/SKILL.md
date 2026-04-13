---
name: backend-integration
license: MIT
compatibility: Requires git, npm, Node.js, and network access to clone the Customware backend reference repo during execution.
metadata:
  author: customware-ai
  version: "1.0"
description: >
  Use this skill when converting a generated Customware client-only SPA into the standard
  backend-enabled stack, especially for the canonical task "Wire backend integration" or any
  task that replaces localStorage/browser storage with Hono + tRPC + Zod + neverthrow +
  SQLite/Drizzle, adds backend-focused unit and end-to-end tests, preserves the app's
  existing implemented behavior, and adapts files, configs, packages, and test patterns
  from the Customware `template-be-setup` reference repo.
---

# Backend Integration

Use this skill for the full backend-integration workflow. This skill is intentionally self-contained.

## Core Rules

- Follow this skill from top to bottom.
- Treat this as the canonical workflow for `Wire backend integration`.
- Do not improvise a new backend stack.
- Do not rely on unrelated skills for backend architecture, testing strategy, or migration planning unless higher-priority instructions explicitly require that.
- The one explicitly allowed companion skill for this workflow is `playwright-interactive-sandbox`, and only for baseline/final interactive QA passes.
- Keep existing product behavior working while changing the persistence and transport layer underneath it.
- Preserve the current implemented app behavior and scope. Do not add new product features, new domain workflows, or speculative capabilities.
- Do not do anything less than the current app already does.
- Do not do anything more than the current app already does, unless higher-priority instructions explicitly require it.
- Re-read this skill and the current `plan.md` on every compaction before continuing.

## Fixed Target Stack

Convert the app toward the Customware reference stack:

- React Router SPA
- Hono server
- tRPC transport/router
- Zod runtime contracts
- neverthrow `Result` / `ResultAsync`
- SQLite via `better-sqlite3`
- Drizzle ORM + migrations

The backend reference repo is:

- Canonical git remote: `git@github.com:customware-ai/template-be-setup.git`
- HTTPS fallback: `https://github.com/customware-ai/template-be-setup.git`

Use the same clone pattern/runtime approach already known to work for Customware repos in the execution environment.

## Required Step Order

1. Read project instructions first.
2. Read this skill fully.
3. Create `plan.md` in the project root using the exact section contract in this skill.
4. Clone or refresh the backend reference repo into a temporary location if needed.
5. Replace the current project `AGENTS.md` with the `AGENTS.md` from the backend reference repo.
6. Use `playwright-interactive-sandbox` for a baseline interactive audit of the current app behavior and record the findings in `plan.md`.
7. Audit the current project and map it against the reference repo.
8. Adapt the backend stack and test setup using this skill's template map.
9. Migrate storage-backed flows to backend-backed flows and track every migration in `plan.md`.
10. Create or update automated tests using this skill's testing and verification rules.
11. Use `playwright-interactive-sandbox` again for final interactive verification of behavior parity after backend migration.
12. Run final verification.
13. Remove temporary assets and `plan.md` as the final successful step.

Do not skip a prerequisite step because the later action seems obvious.

## Scope Rule

The purpose of backend integration is:

- take the current front-end-only implementation
- make it backend and SQLite/Drizzle based
- keep the existing app behavior intact
- add backend-focused tests and end-to-end coverage

This task does not need domain knowledge files to decide scope.

- Do not read `DOMAIN.md` / `domain.md` to redefine the product.
- Use the current implemented app behavior as the source of truth for scope.
- Preserve what the app already does and make it persistent and tested.

## Required `AGENTS.md` Replacement

- Replacing the current project `AGENTS.md` with the `AGENTS.md` from the backend reference repo is a required step.
- Do not partially merge them.
- Do not keep the frontend-only `AGENTS.md` in place.
- The backend reference `AGENTS.md` becomes the new governing repo instructions for the migrated app.
- Perform this replacement early in the workflow so all later work follows the backend-capable instructions.

## Output Contract While Working

- `plan.md` must exist for the duration of the backend integration task.
- `plan.md` must use the exact top-level section headings defined in this skill.
- Every section must contain markdown checkboxes.
- Every migrated browser-storage path must be accounted for in the `Storage Migration Inventory` section.
- Every significant route/page/flow touched by backend integration must be accounted for in the `Coverage Mapping` section.

## Planning Rules

- `plan.md` is a working checklist, not a narrative document.
- Keep each checkbox concrete and verifiable.
- Update `plan.md` continuously as work progresses.
- If you discover a new required migration or test surface, add it to the checklist before implementing it.
- Optional sections from the template should be added only when the current app actually needs them.

## Playwright Interactive QA Rule

- Use `playwright-interactive-sandbox` in exactly two intentional passes unless a special failure requires another pass:
  1. baseline audit before backend integration
  2. final parity verification after backend integration
- The baseline pass is used to understand what the current app actually does.
- Record the baseline findings in `plan.md`, especially in:
  - `Current App Audit`
  - `Coverage Mapping`
- The final pass is used to verify that the migrated app still behaves correctly after replacing browser storage with backend persistence.
- Do not treat this Playwright workflow as a replacement for automated tests.
- Do not use it as a reason to skip unit/service/E2E coverage.

## Migration Rules

- Prefer adapting the reference repo's structure and conventions over inventing new ones.
- Do not copy the template's sample business domain literally.
- Replace the current app's localStorage/browser-storage data paths with backend-backed reads/writes.
- Remove stale localStorage-only helpers, fixtures, and template leftovers when they conflict with backend mode.
- Preserve user-facing routes, navigation, labels, and behavior unless higher-priority instructions explicitly require product changes.

## Contract / Query / Service / Router Rules

- Treat schema-defined types as the source of truth.
- Prefer deriving TypeScript types from Zod schemas instead of writing plain standalone TypeScript domain types.
- For persisted domain records, the primary source of truth should be the schema layer that represents the DB/result shape, and other backend types should be derived from or validated against schemas.
- Use Zod contracts at the boundary.
- Use Zod schemas for input, output, and domain/result shapes that need to cross backend boundaries.
- Do not introduce plain TypeScript-only input/output/domain contracts when a Zod schema should exist instead.
- Use neverthrow patterns for query and service layers.
- Keep a clean chain:
  - contract
  - query
  - service
  - router
- Do not collapse everything into route handlers or client hooks.
- Validate every backend input and output that crosses a boundary against a Zod schema.
- Use tRPC input/output schemas as part of that contract enforcement, not as a substitute for missing domain schemas underneath.

## Schema-First Data Rules

- Backend contracts should be schema-first, not type-first.
- Every important backend shape should be represented by a Zod schema.
- Types should be inferred from schemas whenever possible.
- Avoid plain `interface` / `type` declarations as the primary definition for backend contract shapes.
- If a shape needs a narrower or transformed form, create another schema and infer from it.
- Frontend submission paths should validate payloads before sending them to the backend.
- Frontend validation should complement backend validation, not replace it.
- Backend validation remains authoritative at the transport and service boundaries.
- Treat the Drizzle schema layer as the primary persisted-record source of truth.
- Treat DB/result-backed schema shapes as the anchor for backend data/results.
- Define separate Zod input schemas for desired backend inputs.
- Define separate Zod output schemas for desired backend transport/output shapes.
- Derive or map outputs from the DB/result-backed schema layer rather than inventing unrelated output types.
- If an additional intermediate shape is genuinely needed, define it as another Zod schema rather than a plain TypeScript-only contract.
- Main thing to avoid: multiple drifting schema/type layers describing the same concept differently.

## Testing Rules

- Backend integration includes real test work.
- Do not stop at implementation.
- Add or update:
  - unit tests
  - service/query/backend tests
  - Playwright E2E coverage for the migrated flows
- Replace tests that only validate the old localStorage mode.
- Follow the deterministic database setup pattern from the backend reference repo.

## Backend Reference Map

Use the `template-be-setup` repo as the canonical reference for stack, file layout, package choices, test setup, and migration patterns.

### Primary Files To Inspect And Adapt

#### Runtime And Packages

- `package.json`
  - scripts
  - runtime dependencies
  - dev dependencies
- `.env.example`
- `vite.config.ts`
- `react-router.config.ts`
- `tsconfig.json`

#### Server Skeleton

- `server/index.ts`
  - Hono setup
  - tRPC mount at `/trpc/*`
  - CORS/static/fallback behavior
  - error handling
- `server/start.ts`
  - server startup
  - port resolution
- `server/utils/env.ts`
  - environment parsing

#### Database And Migrations

- `server/db/index.ts`
  - sqlite + Drizzle initialization
  - E2E database override path handling
- `server/db/schemas.ts`
- `server/db/migrate.ts`
- `drizzle.config.ts`
- `server/db/migrations/*`

#### Backend Domain Pattern

- `server/contracts/*`
  - Zod contracts
- `server/db/queries/*`
  - neverthrow query helpers
- `server/services/*`
  - neverthrow service orchestration
- `server/trpc/router.ts`
  - transport/router procedures

#### Frontend Data Wiring

- `app/lib/trpc-provider.tsx`
  - React Query + tRPC provider pattern

#### Testing

- `tests/e2e/database.ts`
  - deterministic Playwright database reset pattern
- `tests/e2e/global-setup.ts`
  - E2E setup wiring
- `tests/e2e/README_FIRST_BEFORE_ADDING_E2E_TESTS.spec.ts`
  - format example only; do not preserve demo behavior
- `tests/unit/services/estimate.test.ts`
  - isolated sqlite-backed service test pattern

### Adaptation Rules

- Copy or adapt structure and conventions, not the sample business domain.
- Replace the sample estimate domain with the current app's real domain modules.
- Keep the fixed stack choices unless higher-priority instructions explicitly override them.
- Preserve current product behavior while migrating the data layer.

### Must-Not-Miss Areas

- runtime scripts and dependencies
- server entry and startup
- tRPC mount path
- sqlite/drizzle setup
- migration runner
- provider wiring on the frontend
- deterministic test database setup
- replacement of browser-storage-backed data paths

## `plan.md` Contract

Use this exact top-level section order in `plan.md`.

```md
# Backend Integration Plan

## Context Reload
- [ ] Re-read project `AGENTS.md`
- [ ] Re-read backend integration skill
- [ ] Re-read current `plan.md`
- [ ] Re-read the specific backend reference files needed for this app

## Reference Intake
- [ ] Clone or refresh the backend reference repo in a temp location if needed
- [ ] Identify the exact reference files to adapt
- [ ] Identify required package/config deltas
- [ ] Note app-specific differences from the reference

## Current App Audit
- [ ] Inventory current localStorage/browser-storage backed flows
- [ ] Inventory current routes/pages and key interactions
- [ ] Inventory current implemented behavior that must be preserved exactly
- [ ] Inventory current domain entities that need persistence
- [ ] Inventory current tests and test gaps
- [ ] Inventory stale mocks/fixtures/storage helpers to remove or replace

## Package And Runtime Alignment
- [ ] Align required backend/runtime dependencies
- [ ] Align required npm scripts
- [ ] Align required config files
- [ ] Align runtime port/server startup assumptions

## Server Skeleton
- [ ] Establish/adapt `server/` structure
- [ ] Establish/adapt Hono app setup
- [ ] Establish/adapt tRPC mounting
- [ ] Preserve static asset + SPA fallback behavior
- [ ] Confirm server startup and health path works

## Database And Migration Setup
- [ ] Establish/adapt sqlite path handling
- [ ] Establish/adapt Drizzle schema files
- [ ] Establish/adapt migration runner
- [ ] Generate/apply migrations as needed
- [ ] Account for local runtime DB path and E2E DB path

## Contract Query Service Router Chain
- [ ] Define/adapt Zod contracts for the first migrated domain area
- [ ] Implement/adapt query layer for that area
- [ ] Implement/adapt service layer for that area
- [ ] Implement/adapt router procedures for that area
- [ ] Repeat until every migrated domain area has a complete chain

## Frontend Data Wiring
- [ ] Add or align tRPC provider/client wiring
- [ ] Replace localStorage-backed reads for migrated flows
- [ ] Replace localStorage-backed writes for migrated flows
- [ ] Preserve existing page behavior and navigation
- [ ] Remove stale localStorage-only helpers or mark retained helpers with justification

## Storage Migration Inventory
- [ ] List every old localStorage/browser-storage path
- [ ] Mark each path as migrated / intentionally retained / deleted
- [ ] Confirm no storage path is left unaccounted for

## Seed Fixture And Test Data Setup
- [ ] Establish deterministic backend test-data setup
- [ ] Align Playwright DB reset/setup pattern
- [ ] Add or adapt seed/fixture helpers as needed
- [ ] Replace template sample data assumptions with app-specific test data

## Coverage Mapping
- [ ] Map significant routes/pages/flows to automated coverage
- [ ] Map backend modules to service/query/unit coverage
- [ ] Map E2E user journeys to Playwright coverage
- [ ] List app-specific edge cases requiring coverage

## Automated Tests
- [ ] Create/update unit tests for migrated client/server behavior
- [ ] Create/update service/query/backend tests
- [ ] Create/update Playwright E2E tests
- [ ] Remove or update tests that only validate the old localStorage mode

## Verification
- [ ] Run required validation commands
- [ ] Run required migration/setup commands
- [ ] Run targeted unit/service tests
- [ ] Run targeted Playwright E2E tests
- [ ] Confirm the app works end-to-end in backend mode

## Cleanup
- [ ] Remove temp backend reference clone/assets
- [ ] Remove temporary execution-only files
- [ ] Remove `plan.md` as the final successful step
```

### Optional Sections

Add these only when the current generated app actually needs them:

- `## Additional Domain Modules`
- `## Logging And Runtime Diagnostics`
- `## Complex Import Or Fixture Backfill`
- `## Advanced Query Or Reporting Shapes`

### `plan.md` Rules

- Keep all mandatory sections, even if one becomes a short "not needed after audit" note.
- Add new checkboxes when new requirements are discovered.
- Update checkbox state continuously.
- Re-read `plan.md` on every compaction before continuing work.

## Testing And Verification

Backend integration is not complete until tests and verification are done.

### Required Testing Surfaces

#### Unit / Service / Query Tests

Use the reference repo's patterns for:

- isolated sqlite-backed service tests
- deterministic schema setup
- cleanup between tests
- direct assertions on backend behavior

The reference example is:

- `tests/unit/services/estimate.test.ts`

Adapt the pattern to the app's real domain modules.

#### Playwright E2E

Use the reference repo's deterministic E2E DB setup pattern:

- `tests/e2e/database.ts`
- `tests/e2e/global-setup.ts`

This means:

- the backend starts against a clean, deterministic sqlite DB for E2E
- test state can be seeded deliberately
- assertions should validate real backend-backed behavior, not browser-storage fallbacks

Do not keep the demo E2E example as product coverage. Replace it with real flow coverage.

### Coverage Expectations

Map tests to real migrated behavior:

- routes/pages that now read backend state
- forms/actions that now write backend state
- significant domain modules with contract -> query -> service -> router chains
- end-to-end journeys that prove the backend integration actually works

Do not satisfy this with shallow "page renders" tests alone.

### Verification Sequence

Run verification in this order unless higher-priority repo instructions override it:

1. required static validation
2. required migration/setup commands
3. targeted unit/service/backend tests
4. targeted Playwright E2E tests
5. final end-to-end sanity check of the migrated app behavior

### Verification Checklist

- backend server starts successfully
- health/runtime endpoint works
- migrations apply cleanly
- migrated routes/pages read real backend state
- migrated writes persist through the backend/data layer
- old localStorage-only behavior is not silently masking missing backend wiring
- tests reflect the new backend mode
- cleanup happens only after verification is complete

## Verification Loop

Before final completion:

- Check correctness: does the app now use the fixed backend stack and not an improvised one?
- Check migration coverage: is every old storage path accounted for?
- Check grounding: do changed files and package/config choices match the reference repo patterns where expected?
- Check testing: were the required tests created or updated and run?
- Check formatting: is `plan.md` complete and fully checked off?
- Check cleanup: are temp reference assets and `plan.md` removed as the final successful step?

## Missing Context Gating

- If required project context is missing, do not guess silently.
- Prefer reading the current project files or the backend reference repo first.
- If the missing context is still unresolved, make the smallest reversible assumption and record it in `plan.md`.

## Cleanup Rule

On successful completion, remove:

- temporary backend reference clone/assets created only for this task
- temporary execution-only notes/files
- `plan.md`

Do this only after validation is complete.
