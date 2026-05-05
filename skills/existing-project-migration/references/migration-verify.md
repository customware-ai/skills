# Migration Verify Reference

Use this reference for the `migration_verify` task.

## Goal

Independently QA the migrated app after the main build task:

- re-check the source-derived workflows against the built app
- run interactive verification in the sandbox
- confirm runtime or review startup works on a fresh SQLite database
- add or repair missing Playwright end-to-end coverage for verified workflows
- fix migration issues uncovered by QA
- remove temporary migration checklist artifacts only after the app actually passes

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, and this exact reference path.
2. Read `.import/migration-plan.json`.
3. Read `.import/migration-checklist.md`, or fail if it is missing.
4. Extend and update `.import/migration-checklist.md` using the verification sections below.
5. Re-read the build warnings and verify focus areas from the checklist and plan.
6. Run interactive verification quickly on the highest-priority source workflows.
7. If verification fails, fix the repo and re-run the relevant checks.
8. If a verified source workflow lacks end-to-end coverage, add or update the matching Playwright coverage.
9. Run automated validation again after fixes.
10. Remove `.import/migration-checklist.md` only after all required verify boxes are complete.
11. Complete only when source-derived verification targets pass or skipped items are explicitly justified.

## Execution Budget

After reading the plan and checklist:

- Spend at most two turns on additional read-only inspection before the first interactive verification or code/test edit.
- If the build looks obviously broken, move directly into the smallest fix needed to make verification meaningful.
- If a workflow cannot be verified because the source evidence or runtime is insufficient, fail with a concrete blocker instead of looping in more exploration.

## Working Checklist Contract

Use `.import/migration-checklist.md` as the task-local quality gate.

At the start of verification, append these sections if they are not already present:

```md
## Verify Context Reload
- [ ] Re-read root AGENTS.md
- [ ] Re-read existing-project-migration SKILL.md
- [ ] Re-read migration verify reference
- [ ] Re-read .import/migration-plan.json
- [ ] Re-read build warnings and verify handoff notes

## Interactive Verification
- [ ] Use playwright-in-sandbox for interactive verification
- [ ] Verify the highest-priority source workflows from the migration plan
- [ ] Record which workflow paths were verified
- [ ] Record any skipped workflow with a concrete reason

## End-to-End Coverage
- [ ] Inspect existing Playwright coverage against verified workflows
- [ ] Add or repair missing end-to-end coverage for verified workflows
- [ ] Avoid generic/template-only tests as completion evidence

## Runtime Readiness
- [ ] Confirm runtime or review startup does not fail on a fresh SQLite database
- [ ] Confirm migrations and seed paths work for a fresh database
- [ ] Fix runtime issues uncovered by verification

## Drift Check
- [ ] Confirm generated app name/domain match imported zip evidence
- [ ] Confirm generated tables and seed data match source/database evidence
- [ ] Confirm generated routes/pages match source workflow evidence
- [ ] Confirm no unrelated org/company domain replaced the imported app domain
- [ ] Confirm completion summary cites source-derived workflows and verification

## Verify Cleanup
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

## Verification Rules

Verification must prove source-workflow parity.

Required:

- interactive Playwright verification of source-derived user flows
- Playwright end-to-end coverage for verified workflows
- automated validation after any verification fixes
- runtime or review startup verification on a fresh SQLite database

Do not treat template smoke tests, generic dashboard tests, or unrelated happy paths as migration validation.

If you cannot reach source-derived verification or runnable implementation with the available evidence, fail with a concrete summary instead of looping in more source exploration.

## Failure Conditions

Fail the task instead of completing if:

- `.import/migration-plan.json` is missing
- `.import/migration-checklist.md` is missing at verify start
- source app workflows cannot be identified
- implementation is based on org/company domain instead of uploaded artifacts
- no source-derived workflow is testable
- review or runtime boot cannot be made to work
- validation only covers generic/template behavior
- required checklist items remain unchecked

## Completion Summary

The completion summary must include:

- imported app name
- workflows verified interactively
- runtime or review checks performed
- end-to-end coverage added or updated
- automated commands run
- skipped workflows and concrete reasons
- warnings carried forward from the migration plan
