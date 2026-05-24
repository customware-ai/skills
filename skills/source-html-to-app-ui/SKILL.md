---
name: source-html-to-app-ui
description: >
  Use this skill when a task provides a self-contained source HTML app file plus
  a design-system JSON and asks the Agent to build a real React/shadcn-style app UI
  in the current target repository. The skill discovers the source app with
  Playwright, captures every route and meaningful interaction state, implements
  the target app from those references, and keeps grading with screenshots until
  the target is a high-fidelity, interactive reproduction.
---

# Source HTML To App UI

## Core Idea

Re-read this `SKILL.md` after every compaction before continuing work. Re-load the phase references too. Do not rely on conversational memory.

This skill replaces the image-generation phase of `mock-to-ui` with source-app discovery. The source app already exists as a self-contained HTML file. Open that app with Playwright, learn every visible route and state, capture it as the visual reference set, then build the target app to match those references.

This is a reproduction task, not a redesign task. The output should feel like the same app rebuilt on the target stack, with the supplied design-system JSON used as the token and component styling contract.

## Source Authority

Priority:

1. The source app as rendered and exercised in Playwright.
2. The source HTML file's DOM, script, and styles.
3. The supplied design-system JSON.
4. The target repository's AGENTS instructions and stack constraints.

Use the rendered source app for route, layout, state, and behavior truth. Use the JSON for colors, typography, radius, surfaces, shadows, component roles, and any design dock values.

If the rendered source and JSON disagree, preserve the rendered app's structure and behavior, then use the JSON to resolve theme/token details.

## Critical Invariant

This invariant overrides convenience and time pressure:

- The target app must be a real interactive app, not a static visual copy.
- The target app must be a near one-to-one reproduction of the source screenshots at ordinary visual comparison.
- Layout fidelity and style fidelity are separate hard gates. Passing one does not excuse failing the other.
- Route coverage and state coverage are separate hard gates. A matching home screen does not excuse missing dialogs, tabs, filters, drawers, menus, selected states, or mobile navigation.
- Visible controls in the source must become real target controls with matching states.
- The target app must own the viewport as the product UI. Do not build a gallery page, poster shell, board frame, device frame, or screenshot viewer around the app.
- If the output visibly drifts from the source app, the implementation has failed and the agent must keep iterating.
- The agent must review the target part by part, route by route, state by state, and area by area. Do not judge only the overall mood.
- Ordinary UI structure must be exact across the screen: navigation, headers, controls, panels, rows, tables, filters, tabs, dialogs, spacing, and section order.
- Ordinary UI styling must also be exact: typography weight, surface tone, border strength, control proportions, radius, shadow/contact edges, accent use, and density.
- Hard bespoke illustration or generated-art zones may be the only tolerated approximation. If such a zone exists, preserve its role and composition while holding the surrounding UI to strict fidelity.

Treat these as hard constraints, not suggestions.

## Required References

Load only the phase-relevant references, but load all three for full implementation work:

- `references/source-discovery.md`: before opening or grading the source HTML app.
- `references/target-implementation.md`: before editing the target repository.
- `references/visual-verification.md`: before screenshot comparison or signoff.

## Operating Modes

### Validation Mode

Use this when the user is testing or improving this skill itself.

- Use a throwaway target copy.
- Preserve all source, target, and grading artifacts.
- Judge repeatability across fresh runs, not one lucky result.
- If a repeated failure persists, improve this skill's reusable docs before another validation run.

### Delivery Mode

Use this when the user wants the real target app built.

- Work inside the provided target app repository.
- Treat the source screenshots as the approved visual reference set.
- Do not sign off until the written scorecard, review, open-gaps ledger, and Playwright evidence pass.

## Required Artifacts

These are mandatory in delivery mode:

- `mocks/source/`: source screenshots captured from the HTML app.
- `mocks/verification/`: target screenshots captured from the implemented app.
- `design/source-inventory.md`: route and state inventory for the source app.
- `design/source-quality-review.md`: scorecard proving the source reference set is complete enough to implement from.
- `design/spec.json`: local copy or derived normalization of the supplied design-system JSON.
- `design/implementation-reading.md`: route/state/visual reading before coding.
- `design/implementation-review.md`: screenshot-backed route/state and page-section comparison.
- `design/implementation-open-gaps.md`: every remaining mismatch.
- `mocks/verification/final-desktop.png`: final desktop evidence.
- `mocks/verification/final-mobile.png`: final mobile evidence.

The templates in `assets/templates/` are enforcement artifacts. Copy their structure directly and fill them in. If a required artifact drops its tables, replaces them with prose, or becomes impossible to audit row-by-row, the run fails.

## Phase 0: Start-Up And Scope

1. Determine mode: validation or delivery.
2. Read the target repo `AGENTS.md`.
3. Confirm the task includes:
   - path to the self-contained source HTML app file
   - path to the design-system JSON
4. Copy or normalize the design-system JSON into `design/spec.json`.
5. Create the required artifacts from templates.
6. Read `references/source-discovery.md`.
7. Inspect the target repo's real app structure before planning implementation. Prefer existing route, CSS, component, and test conventions.

Do not implement target UI during this phase.

## Phase 1: Source Discovery And Acceptance Loop

This phase replaces mock generation and mock approval from `mock-to-ui`. It repeats until the source reference set is complete and high-confidence.

1. Open the source HTML app with Playwright.
2. Capture the default desktop and mobile views.
3. Discover all routes and meaningful states through real UI interaction.
4. Capture desktop and mobile screenshots for every discovered route/state.
5. Record exact source contracts in `design/source-inventory.md`.
   - Every inventory row must include its visible page sections.
   - Each page section must have a stable section id, source reference, and exact structure/style/behavior contract.
6. Score the source reference set in `design/source-quality-review.md`.
7. Apply the source acceptance gate:
   - every critical item must pass
   - at least `46/50` checklist items must pass
   - every discovered route has desktop and mobile coverage, unless a concrete source limitation is recorded
   - every visible interactive state family has at least one captured state
8. If the reference set fails:
   - do not proceed to implementation
   - add the failed checklist rows to the next discovery pass
   - run more Playwright exploration and capture missing states
   - rescore
9. Stay in this loop until the written source review shows a real pass.

The agent is not allowed to approve the source reference set from confidence, vibe, or a single screenshot. Approval is a file-backed score.

## Phase 2: Implementation Preparation

1. Read:
   - `design/spec.json`
   - `design/source-inventory.md`
   - `references/target-implementation.md`
2. Write `design/implementation-reading.md` before coding.
3. Break the source app into build regions:
   - app shell and viewport ownership
   - navigation
   - header/context
   - primary workflow surfaces
   - supporting modules
   - route-specific content
   - mobile composition
   - visible interaction states
4. Identify target repo extension points:
   - routing
   - layout
   - global CSS/theme variables
   - Tailwind/theme config when present
   - shadcn/ui wrapper components when present
   - tests
5. Define the first pass implementation sequence in the reading artifact.

Do not skip this phase. It prevents coding from memory and then grading only at the end.

## Phase 3: Theme And Shared Component Pass

This phase must happen before route details become dense.

1. Translate `design/spec.json` into the target repo's global theme files.
2. Update shared component wrappers when the source app requires specific control treatment.
3. Build the app shell enough to capture an early target screenshot.
4. Capture `mocks/verification/01-theme-shell-desktop.png`.
5. Compare it against source shell references.
6. Update `design/implementation-review.md` and `design/implementation-open-gaps.md`.
7. Fix obvious theme, viewport, shell, and component-system drift before building all pages.

Do not accept stock component-library styling when the source app uses a different visual language.

## Phase 4: Route And State Reproduction Loop

This phase repeats until all routes and states in the source inventory exist in the target app.

1. Implement the source route map and shared navigation.
2. Implement each source route/state from the inventory.
3. Use real local state for interactions:
   - tabs
   - filters
   - dialogs
   - drawers/sheets
   - dropdowns/menus
   - selected rows/cards
   - mobile navigation
   - form states
4. After each meaningful route group, capture target screenshots for the same route/state rows.
5. Update:
   - `design/implementation-review.md`
   - `design/implementation-open-gaps.md`
6. If any route/state is missing, renamed beyond recognition, reordered without source support, or static when the source is interactive, the phase remains open.

This phase is not done when the home page works. It is done only when the source inventory has target coverage.

## Phase 5: Visual Verification And Grading Loop

Read `references/visual-verification.md` before this phase.

This is the main enforcement loop. Expect many passes.

1. Capture the full target evidence set:
   - desktop route screenshots
   - mobile route screenshots
   - interaction state screenshots
   - focused section crops for every source-listed page section where a full viewport screenshot is not enough to judge fidelity
   - focused region crops for nav, header, main surface, support modules, and mobile above-the-fold
2. Compare source and target row-by-row.
3. Compare every page section listed in `design/source-inventory.md`.
4. Score the implementation in `design/implementation-review.md`.
5. Apply the implementation pass gate:
   - every critical item must pass
   - at least `48/50` checklist items must pass
   - no ordinary unresolved row remains in `design/implementation-open-gaps.md`
   - final desktop and mobile screenshots exist
   - at least one screenshot-backed interaction state exists for every source interaction family
   - every source-listed page section has a passing section-review row or an explicit hard exception
6. If the implementation fails:
   - keep the failed checklist items in the open-gaps ledger
   - fix them
   - rerun Playwright
   - rescore
7. Continue until the scorecard, page-section ledger, and open-gaps ledger pass together.

Do not stop because the target feels broadly right. Stop only when the documented gaps are gone.

## Phase 6: Adversarial Final Pass

After the implementation appears done:

1. Assume the target is still wrong.
2. Try to find at least five differences across:
   - route coverage
   - mobile behavior
   - interaction states
   - shell ownership
   - typography
   - spacing and density
   - control styling
   - border/radius/shadow treatment
3. Either record and fix each difference, or document specifically why it is not a true blocking mismatch.
4. Record this pass in `design/implementation-review.md`.

The final pass cannot dismiss shell/layout ownership, missing states, or style-system drift as acceptable simplification.

## Phase 7: Final Signoff

Signoff is blocked unless all of the following are true:

- `design/source-inventory.md` is complete and current.
- `design/source-quality-review.md` passes the source acceptance gate.
- `design/spec.json` is current.
- `design/implementation-reading.md` exists.
- `design/implementation-review.md` exists and keeps the required scorecard, route/state review, page-section review, and adversarial tables.
- `design/implementation-open-gaps.md` exists and keeps the required mismatch ledger table.
- `design/implementation-open-gaps.md` contains no ordinary unresolved drift.
- The target app is interactive rather than static.
- Every source route/state row has matching target evidence.
- Every source-listed page section has matching target evidence and a passing section-review row.
- Desktop and mobile final screenshots exist at `mocks/verification/final-desktop.png` and `mocks/verification/final-mobile.png`.
- Focused region screenshots exist for shell/nav, header/context, dominant workflow surface, support modules, and mobile above-the-fold.
- The adversarial final pass is documented.
- Target repo checks and tests required by `AGENTS.md` have run, or any inability to run them is explicitly recorded.

If any ordinary visible mismatch remains, signoff is not allowed.

## Reference Map

- `references/source-discovery.md`: source app launch, route/state inventory, source scoring.
- `references/target-implementation.md`: theme, shared components, routes, real interactions, checkpoints.
- `references/visual-verification.md`: screenshot comparison, scoring, open-gaps discipline, final signoff.

## Non-Negotiables

- The rendered source app is the product authority.
- The supplied JSON is the styling-system authority.
- Do not invent a different product, route map, visual system, or information architecture.
- Do not ship a static facsimile. Visible controls must behave.
- Do not proceed from source discovery until the source quality score passes.
- Do not sign off implementation while the scorecard fails or ordinary gaps remain open.
- Do not let review artifacts degrade into prose.
- Do not let default component-library styling become an excuse for mismatch.
- Do not use vague success language such as `close enough`, `broadly aligned`, `inspired by`, or `good enough` as a substitute for screenshot-backed proof.
