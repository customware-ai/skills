---
name: source-html-to-app-ui
description: >
  Use this skill when a task provides a self-contained source HTML app file plus
  a design-system JSON and asks the Agent to rebuild that app in the current
  repository. The skill treats the HTML as discovery-only input, forces
  Playwright-driven route/state capture, then moves through scored gates for
  source acceptance, implementation planning, authored UI reproduction, visual
  verification, and adversarial proof before signoff.
---

# Source HTML To App UI

## Core Idea

Re-read this `SKILL.md` after every compaction before continuing work. Re-load the phase references too. Do not rely on conversational memory.

This skill is a gated execution protocol, not a loose set of suggestions. The source HTML file exists only to produce a complete visual and behavioral reference corpus through Playwright. The finished app must then be authored in the target repo from that accepted corpus plus the supplied design-system JSON.

Assume this skill may run fully autonomously. No human is expected to watch the run line by line. The artifact files are therefore the enforcement system. A phase is not complete because the Agent feels confident. A phase is complete only when its required artifact shows a real passing score and all critical items pass.

Never promote work from one phase to the next on optimism, partial evidence, or broad visual similarity.

## Mandatory Process Shape

This workflow shape is not optional:

1. Launch the provided HTML app in Playwright.
2. Discover every route, state, desktop view, mobile view, and important page section through real interaction.
3. Capture that discovery as a screenshot-backed source corpus plus written inventory and source-quality score.
4. Build the target UI as authored repo code from the accepted corpus and the design-system JSON.
5. Capture target screenshots, grade them against the source corpus, fix mismatches, and loop until the gates pass.
6. Run adversarial and functional proof before signoff.

If the work skips one of those phase boundaries, the run is off track.

## Autonomous Run Contract

Treat these rules as always active:

- Every phase must end with an objective gate.
- Every gate must be recorded in the phase-owned artifact file.
- Every gate must have both a numeric threshold and critical-item pass requirement.
- If a gate fails, remain in that phase and keep iterating.
- If later work reveals missing evidence from an earlier phase, return to that earlier phase, repair it, and re-pass the gate.
- Do not assume the user will catch a shortcut. The Agent must prevent the shortcut itself.

## Critical Output Invariant

These are hard constraints:

- The target app must be a real interactive app, not a static visual copy.
- The target app must be authored in the target repo as real routes, layouts, components, state, styling, and interactions.
- The target app must be a near one-to-one reproduction of the accepted source corpus.
- Layout fidelity and style fidelity are separate hard gates.
- Route coverage and state coverage are separate hard gates.
- Visible controls in the source must become real target controls with matching states.
- The target app must own the viewport as the real product UI.
- The provided source HTML file is discovery input only. The finished app must not depend on it at runtime.
- Ordinary UI structure must be exact across the screen: navigation, headers, controls, filters, tables, panels, spacing, and section order.
- Ordinary UI styling must also be exact: typography weight, surface tone, border strength, radii, shadows, density, and control treatment.
- The Agent must review the app part by part, route by route, state by state, and section by section.
- If ordinary visible drift remains, the run has not passed.

## Required References

Load only the phase-relevant references, but use all three during a full delivery run:

- `references/source-discovery.md`
- `references/target-implementation.md`
- `references/visual-verification.md`

## Operating Modes

### Validation Mode

Use this when improving or testing the skill itself.

- Use a throwaway target app copy.
- Preserve all source, target, and grading artifacts.
- Judge repeatability across fresh runs.
- If the same failure repeats, improve the reusable skill before running again.

### Delivery Mode

Use this when the user wants the real target app built.

- Work inside the provided target repo.
- Treat the accepted source corpus as the design authority.
- Do not sign off until every gate in this file has passed in writing.

## Required Artifacts

These are mandatory in delivery mode:

- `mocks/source/`
- `mocks/verification/`
- `design/spec.json`
- `design/source-inventory.md`
- `design/source-quality-review.md`
- `design/implementation-reading.md`
- `design/implementation-review.md`
- `design/implementation-open-gaps.md`
- `mocks/verification/final-desktop.png`
- `mocks/verification/final-mobile.png`

The templates in `assets/templates/` are enforcement artifacts. Copy their structure directly. If a required table is replaced by prose or stripped down until rows are no longer auditable, the run fails.

## Multi-Phase Protocol

### Phase 0: Start-Up And Artifact Scaffolding

1. Determine mode: validation or delivery.
2. Read the target repo `AGENTS.md`.
3. Confirm the task includes:
   - path to the self-contained source HTML app file
   - path to the design-system JSON
4. Copy or normalize the design-system JSON into `design/spec.json`.
5. Create the required artifacts from templates.
6. Read `references/source-discovery.md`.
7. Inspect the target repo's real route, layout, theme, and test structure.
8. Decide how the source HTML app will be launched in Playwright.
9. Do not edit target app UI files yet.
10. Do not treat HTML reading as a substitute for the discovery run.

### Phase 0 Gate: Start-Up Gate

This gate is recorded in `design/source-quality-review.md`.

Score this phase as `10/10`.

Pass rule:

- all `10/10` items above are complete
- no target UI implementation files have been edited yet

If the phase scores below `10/10`, remain in Phase 0.

### Phase 1: Source Discovery And Acceptance Loop

1. Open the source HTML app with Playwright.
2. Capture the default desktop and mobile views.
3. Discover every route and meaningful state through real UI interaction.
4. Capture desktop and mobile screenshots for every discovered route/state.
5. Capture focused section crops for shell, navigation, header, dense workflow surfaces, dialogs, drawers, and any section that later needs section-level grading.
6. Fill `design/source-inventory.md`.
7. Fill `design/source-quality-review.md`.
8. If coverage is incomplete, return to Playwright and capture more evidence.
9. Keep looping until the written source-quality gate passes.

HTML reading, DOM inspection, and script inspection may clarify behavior, but they do not replace Playwright discovery and cannot satisfy this phase on their own.

### Phase 1 Gate: Source Promotion Gate

This gate is owned by `design/source-quality-review.md`.

Pass rule:

- score is at least `48/50`
- every critical discovery item passes
- every discovered route/state has desktop evidence
- every discovered route/state has mobile evidence unless a real source limitation is recorded
- every visible page section has screenshot evidence and a written contract
- every route/state row in `design/source-inventory.md` cites actual screenshot paths

If this gate fails, implementation is blocked. Stay in Phase 1.

### Phase 2: Implementation Reading And Build Plan

1. Read:
   - `design/spec.json`
   - `design/source-inventory.md`
   - `design/source-quality-review.md`
   - `references/target-implementation.md`
2. Write `design/implementation-reading.md` before coding.
3. Map the accepted source corpus into target files, routes, sections, and interaction families.
4. Cite the exact source screenshots the implementation will build from.
5. List the visual and behavioral risks most likely to drift.
6. If the corpus is ambiguous, return to Phase 1, capture more evidence, and re-pass the source gate.

### Phase 2 Gate: Planning Gate

This gate is owned by `design/implementation-reading.md`.

Pass rule:

- score is at least `19/20`
- every planned route/state cites source evidence
- every planned build region maps to concrete target files or extension points
- no source-critical ambiguity remains unresolved

If this gate fails, implementation is blocked. Stay in Phase 2 or return to Phase 1 if evidence is missing.

### Phase 3: Theme And Shell Reproduction Loop

1. Translate `design/spec.json` into the target repo's real theme entry points.
2. Update shared component wrappers or primitives where the source app requires custom treatment.
3. Rebuild the shell so the target owns the viewport as the actual product UI.
4. Capture `mocks/verification/01-theme-shell-desktop.png`.
5. Update `design/implementation-review.md`.
6. Update `design/implementation-open-gaps.md`.
7. Fix shell, theme, and shared-component drift before moving on.

### Phase 3 Gate: Theme And Shell Gate

This gate is owned by `design/implementation-review.md`.

Pass rule:

- score is at least `19/20`
- no critical shell-ownership issue remains
- `mocks/verification/01-theme-shell-desktop.png` exists
- open gaps for shell/theme are explicitly recorded or resolved

If this gate fails, stay in Phase 3.

### Phase 4: Route, State, And Section Reproduction Loop

1. Implement every accepted route/state from `design/source-inventory.md`.
2. Implement every listed page section, not just the outer page layout.
3. Use real local state and real interactions for tabs, filters, dialogs, drawers, menus, row selection, and mobile navigation.
4. After each meaningful pass, capture matching target screenshots.
5. Update `design/implementation-review.md`.
6. Update `design/implementation-open-gaps.md`.
7. If a source route, state, or section is still missing, generic, or fake, keep iterating.

### Phase 4 Gate: Route And State Gate

This gate is owned by `design/implementation-review.md`.

Pass rule:

- score is at least `28/30`
- every critical route/state item passes
- every primary route exists as real target UI
- every source interaction family exists as real target interaction
- every source-listed page section has a target counterpart and review row
- mobile route/state coverage exists for the accepted mobile corpus

If this gate fails, stay in Phase 4.

### Phase 5: Visual Verification Loop

1. Read `references/visual-verification.md`.
2. Start the target app using the repo's normal command.
3. Capture target screenshots that mirror the accepted source inventory.
4. Capture focused section evidence where full-page screenshots are not enough.
5. Compare source and target route by route, state by state, and section by section.
6. Update `design/implementation-review.md`.
7. Update `design/implementation-open-gaps.md`.
8. Fix mismatches.
9. Rerun Playwright from a clean process.
10. Keep looping until the written verification gate passes.

### Phase 5 Gate: Visual Fidelity Gate

This gate is owned by `design/implementation-review.md`.

Pass rule:

- score is at least `49/50`
- every critical verification item passes
- every source route/state row has target evidence
- every source-listed page section has target evidence and a passing section-review row
- `design/implementation-open-gaps.md` contains no unresolved ordinary drift
- final desktop and mobile screenshots exist

If this gate fails, stay in Phase 5.

### Phase 6: Adversarial And Functional Proof Loop

1. Assume the implementation is still wrong.
2. Find at least five serious possible mismatches.
3. Check each against the accepted source corpus.
4. Fix true mismatches.
5. Record defended non-blocking differences with concrete reasoning.
6. Exercise each visible interaction family with real user input.
7. Capture at least one proof screenshot per interaction family.
8. Update the adversarial and functional sections of `design/implementation-review.md`.

### Phase 6 Gate: Adversarial Proof Gate

This gate is owned by `design/implementation-review.md`.

Pass rule:

- score is at least `19/20`
- at least five serious suspected mismatches were checked
- every checked mismatch was either fixed or explicitly defended
- every visible interaction family has functional proof
- mobile is included in the adversarial pass

If this gate fails, stay in Phase 6 and keep iterating.

### Phase 7: Final Signoff

Before signoff:

1. Re-check that every earlier phase gate passed in writing.
2. Re-check that required artifacts still use their required tables.
3. Re-check that the app is authored repo code rather than source-file reuse.
4. Re-check that final screenshots exist.
5. Run the target repo's required checks when code changed.
6. If any ordinary mismatch remains, return to the failing phase.

### Phase 7 Gate: Signoff Gate

This gate is owned by `design/implementation-review.md`.

Score this phase as `12/12`.

Pass rule:

- all earlier gates passed and remain current
- all required artifacts exist
- final desktop and mobile screenshots exist
- open gaps contain no unresolved ordinary drift
- required review tables remain intact
- repo checks required for code changes have been run
- the app is interactive
- the app does not depend on the provided source HTML file at runtime
- the app owns the viewport as the product UI
- no placeholder or generic route remains
- no ordinary section remains unreviewed
- no critical item remains failing

If the phase scores below `12/12`, signoff is blocked.

## Disallowed Shortcuts And Automatic Fails

These shortcuts automatically fail the run:

- moving to implementation before the source gate passes
- moving past planning before the planning gate passes
- moving past theme/shell before the theme gate passes
- moving past route/state build before the route/state gate passes
- signing off before the visual and adversarial gates pass
- reading the HTML file and inferring the app without Playwright discovery
- embedding, fetching, or rendering the provided source HTML file at runtime
- using `iframe`, `srcDoc`, `object`, `embed`, `webview`, or injected raw HTML as the product UI
- building a screenshot viewer, design board, gallery shell, poster shell, or device frame around the app
- treating route existence as proof of route fidelity
- treating a green test suite or a successful build as proof of visual fidelity
- replacing required audit tables with prose
- leaving ordinary mismatches undocumented in the open-gaps ledger
- treating visible interactive controls as static markup
- skipping mobile discovery, mobile implementation, or mobile grading
- approving work from overall vibe rather than row-by-row evidence

## Reference Map

- `references/source-discovery.md`: Phase 1 discovery and source acceptance.
- `references/target-implementation.md`: Phase 2 planning plus Phase 3 and Phase 4 reproduction.
- `references/visual-verification.md`: Phase 5 visual QA plus Phase 6 adversarial and functional proof.
- `assets/templates/source-inventory.md`
- `assets/templates/source-quality-review.md`
- `assets/templates/implementation-reading.md`
- `assets/templates/implementation-review.md`
- `assets/templates/implementation-open-gaps.md`

## Non-Negotiables

- Use the phase gates exactly.
- Keep the artifacts auditable.
- Return to earlier phases when evidence is weak.
- Do not let the provided source HTML leak into the finished runtime.
