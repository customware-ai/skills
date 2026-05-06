# Phase 1 Artifacts

Use this reference for the `Migration build` task.

## Required Working Files

Phase 1 must keep these files current:

- `.import/migration-plan.json`
- `.import/migration-checklist.md`
- `.import/migration-review.md`
- `.import/migration-open-gaps.md`

Copy structure from:

- `.agents/skills/existing-project-migration/assets/templates/migration-plan.json`
- `.agents/skills/existing-project-migration/assets/templates/migration-checklist.md`
- `.agents/skills/existing-project-migration/assets/templates/migration-review.md`
- `.agents/skills/existing-project-migration/assets/templates/migration-open-gaps.md`

Do not replace the review and open-gaps ledgers with prose summaries.

## Migration Plan Contract

`migration-plan.json` must keep these top-level keys:

- `appName`
- `sourceSummary`
- `workflows`
- `sourceRoutes`
- `sourceNavigation`
- `sourcePages`
- `screenTranslationTargets`
- `sourceTheme`
- `sourceBrandAssets`
- `activeFrontendRoot`
- `activeBackendRoot`
- `sourceLayoutFiles`
- `sourceApiRoutes`
- `sourceEntities`
- `sourceIntegrations`
- `csvTables`
- `seedDataSources`
- `preservationTargets`
- `proposedDrizzleTables`
- `verificationTargets`
- `warnings`
- `confidence`

Each workflow must include:

- `id`
- `name`
- `sourceEvidence`
- `entities`
- `routesOrPages`
- `apiRoutes`
- `verification`
- `sourceVisibleSurface`

Each screen translation target must include:

- `route`
- `name`
- `sourceFiles`
- `sourceEvidence`
- `requiredLayoutBlocks`
- `requiredControls`
- `requiredCopy`
- `requiredInteractions`
- `requiredVisualTokens`
- `allowedDeviations`
- `status`
- `warnings`

Each seed data source must include:

- `tableName`
- `csvPath`
- `rowCount`
- `keyColumns`
- `relationshipHints`
- `seedUse`
- `warnings`

Each proposed table must include:

- `name`
- `sourceEvidence`
- `columns`
- `relationships`
- `warnings`

Remove placeholder values from the template once real source evidence is available.

## Checklist Rules

`migration-checklist.md` is the running execution gate.

- Update it continuously, not only at the end.
- Per-screen translation work cannot be hand-waved. If a source-visible screen has no checklist coverage or blocker note, phase 1 is still open.
- Every available migrated page route also needs interactive visit coverage or an explicit blocker note. Partial smoke-test coverage is not enough for phase 1.
- Do not mark verify-only sections complete during phase 1 unless that work truly happened.
- If a required box cannot be checked, record the blocker explicitly.
- If the checklist says the app still has open migration drift, the phase is still open.

## Review Rules

`migration-review.md` is the grading artifact.

- Update it after every meaningful implementation or verification pass.
- Record the checklist score, failed item numbers, pass/fail call, verified workflows, commands run, and the verification host or URL used.
- The fidelity ledger must cite source evidence and current evidence.
- Use one row per source-visible screen, plus shared shell or runtime rows when needed. Do not group unrelated screens into a single row.
- For phase 1, treat source frontend code and source screenshots as first-class evidence for UI fidelity. Review the migrated screen against the source screen directly, not only at the domain/workflow level.
- Record the first-user boot result explicitly: `/`, `/login`, seeded login, first landing page, and fatal console/runtime error status.
- Record the route-by-route interactive visit coverage explicitly, including the basic page-native action exercised on each visited route.
- The phase-1 review must show that every available migrated page route was visited interactively or explicitly blocked.
- Any user-noticeable difference, even if it seems minor, must be called out under `Drift found`.
- An intentional deviation is allowed only when the exact source evidence and stack reason are recorded.
- The adversarial table must contain five suspected drifts once the migration seems close.
- If the review says `fail`, keep iterating.

## Open-Gaps Rules

`migration-open-gaps.md` is the signoff-blocking ledger.

- Every ordinary product drift, workflow gap, runtime gap, or user-visible UI difference belongs here until verified fixed.
- Keep source-visible route loss, nav drift, structure drift, control-surface drift, copy drift, filler pages, style drift, seed-data issues, runtime issues, blank first-page issues, blank login issues, and fatal console/runtime boot issues in this file until they are resolved.
- If a route was not visited interactively, or no page-native action was exercised on it yet, keep that gap open here until it is covered or explicitly blocked.
- If a route exists but its section ordering, controls, labels, styling, or copy drift from source, keep that row open.
- If a screen was replaced by summary cards, generic empty-state prose, or a review/status shell, keep that row open.
- The first real grading pass must record the visible gaps it can see.
- If you believe no ordinary gap remains, run the adversarial pass first and document why it still found no blocking issue.
- If this file still contains unresolved ordinary gaps, phase 1 is not done.
