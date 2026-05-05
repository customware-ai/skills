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
- Do not mark verify-only sections complete during phase 1 unless that work truly happened.
- If a required box cannot be checked, record the blocker explicitly.
- If the checklist says the app still has open migration drift, the phase is still open.

## Review Rules

`migration-review.md` is the grading artifact.

- Update it after every meaningful implementation or verification pass.
- Record the checklist score, failed item numbers, pass/fail call, verified workflows, and commands run.
- The fidelity ledger must cite source evidence and current evidence.
- For phase 1, treat source frontend code and source screenshots as first-class evidence for UI fidelity. Review the migrated screen against the source screen directly, not only at the domain/workflow level.
- The adversarial table must contain five suspected drifts once the migration seems close.
- If the review says `fail`, keep iterating.

## Open-Gaps Rules

`migration-open-gaps.md` is the signoff-blocking ledger.

- Every ordinary product drift, workflow gap, or runtime gap belongs here until verified fixed.
- Keep source-visible route loss, nav drift, filler pages, style drift, seed-data issues, and runtime issues in this file until they are resolved.
- The first real grading pass must record the visible gaps it can see.
- If you believe no ordinary gap remains, run the adversarial pass first and document why it still found no blocking issue.
- If this file still contains unresolved ordinary gaps, phase 1 is not done.
