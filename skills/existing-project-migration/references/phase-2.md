# Phase 2 Reference

Use this reference for the `Migration verify` task.

## Goal

Complete phase 2 of the migration after phase 1:

- re-check the source-derived workflows against the built app
- use full-app interactive verification in the sandbox
- confirm runtime or review startup works on a fresh SQLite database
- compare behavior against the import files and migration plan
- add or repair basic but strong Playwright end-to-end coverage across the app pages and verified workflows
- fix migration issues uncovered by QA
- remove temporary migration checklist artifacts only after the app actually passes
- verify the migrated app still looks and behaves like the imported product instead of a generic migration demo

Phase 2 must be driven to success.

- Do not stop at a quick smoke test, a single happy path, or a partial QA pass.
- Do not give up after finding issues; fix them and re-run the relevant verification.
- Do not be lazy about interactive testing, runtime checks, or end-to-end coverage.
- Keep iterating until the migrated app has been verified thoroughly enough that phase 2 can honestly claim success, or fail with a concrete blocker that cannot be resolved from the available evidence and tools.
- A phase 2 outcome is not successful if the app still has obvious broken workflows, missing critical coverage, or unexplained drift from the imported source.
- A phase 2 outcome is not successful if the visible route map, navigation, headings, or styling language still look like a generic migration shell instead of the imported app.

## Required Order

1. Read project instructions, root `AGENTS.md`, `SKILL.md`, and this exact reference path.
2. Read `.import/migration-plan.json`.
3. Read `.import/migration-checklist.md`, or fail if it is missing.
4. Extend and update `.import/migration-checklist.md` using the verification sections below.
5. Re-read the build warnings and verify focus areas from the checklist and plan.
6. Run interactive verification quickly on the highest-priority source workflows.
7. If verification fails, fix the repo and re-run the relevant checks.
8. Check the imported reference files when behavior looks suspicious or incomplete, then fix the repo and re-verify.
9. If a verified source workflow or app page lacks end-to-end coverage, add or update the matching Playwright coverage.
10. Compare the migrated route map, navigation labels, layout framing, and theme against the imported active frontend before concluding that verification is complete.
11. Run automated validation again after fixes.
12. Remove `.import/migration-checklist.md` only after all required verify boxes are complete.
13. Complete only when source-derived verification targets pass or skipped items are explicitly justified.

Do not treat an initial runtime boot, a passing template test, or a superficial UI render as enough. Phase 2 completes only after full-app interactive verification, fixes, and coverage updates are done for the important source-backed flows.

## Execution Budget

After reading the plan and checklist:

- Spend at most two turns on additional read-only inspection before the first interactive verification or code/test edit.
- If the build looks obviously broken, move directly into the smallest fix needed to make verification meaningful.
- If a workflow cannot be verified because the source evidence or runtime is insufficient, fail with a concrete blocker instead of looping in more exploration.
- After verification starts, keep alternating between interactive testing, fixes, and coverage work until the verify checklist is complete. Do not stall in repeated observation-only loops.

## Working Checklist Contract

Use `.import/migration-checklist.md` as the task-local quality gate.

At the start of verification, append these sections if they are not already present:

```md
## Verify Context Reload
- [ ] Re-read root AGENTS.md
- [ ] Re-read existing-project-migration SKILL.md
- [ ] Re-read phase 2 reference
- [ ] Re-read .import/migration-plan.json
- [ ] Re-read build warnings and verify handoff notes

## Interactive Verification
- [ ] Use playwright-in-sandbox for interactive verification
- [ ] Verify the highest-priority source workflows from the migration plan
- [ ] Compare behavior against `.import/` evidence when validating flows
- [ ] Compare route map, navigation labels, and page hierarchy against the active source frontend
- [ ] Compare theme tokens, typography, and layout framing against the active source frontend
- [ ] Record which workflow paths were verified
- [ ] Record any skipped workflow with a concrete reason

## End-to-End Coverage
- [ ] Inspect existing Playwright coverage against verified workflows
- [ ] Add or repair missing end-to-end coverage for verified workflows and app pages
- [ ] Avoid generic/template-only tests as completion evidence

## Runtime Readiness
- [ ] Confirm runtime or review startup does not fail on a fresh SQLite database
- [ ] Confirm migrations and seed paths work for a fresh database
- [ ] Fix runtime issues uncovered by verification

## Drift Check
- [ ] Confirm generated app name/domain match imported zip evidence
- [ ] Confirm generated tables and seed data match source/database evidence
- [ ] Confirm generated routes/pages match source workflow evidence
- [ ] Confirm source-visible routes were not collapsed into a smaller generic app
- [ ] Confirm no migration-themed user-facing copy replaced source product framing
- [ ] Confirm no unrelated org/company domain replaced the imported app domain
- [ ] Confirm completion summary cites source-derived workflows and verification

## Verify Cleanup
- [ ] Remove temporary template clones
- [ ] Remove temporary execution notes
- [ ] Remove migration-checklist.md after all required boxes are complete
- [ ] Leave `.import/` source artifacts in place unless explicit task instructions say otherwise
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
- direct comparison of visible app structure and styling against the active imported frontend

Interactive verification should be persistent, not ceremonial.

- If a flow breaks, inspect the source evidence, fix the app, and retry the flow.
- If coverage is missing for a verified page or workflow, add it before completion.
- If behavior drifts from the imported source, keep iterating until the drift is removed or explicitly failed with evidence.

Do not treat template smoke tests, generic dashboard tests, or unrelated happy paths as migration validation.
Do not accept a run where only a subset of the source routes survived unless every omitted route has a source-backed blocker recorded in the checklist and completion summary.

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
- the migrated route map or styling still clearly drifts from the active imported frontend
- required checklist items remain unchecked
- the app is still only partially verified when more meaningful QA and fixes were still possible

## Completion Summary

The completion summary must include:

- imported app name
- workflows verified interactively
- runtime or review checks performed
- end-to-end coverage added or updated
- automated commands run
- skipped workflows and concrete reasons
- warnings carried forward from the migration plan
- any source-visible routes or workflows that remain omitted, with the concrete blocker for each
