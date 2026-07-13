# Phases 1–2: UI Implementation And Integrity

## Phase 1: UI Implementation

Implement only authored frontend UI in small auditable packets. Use this blocking order:

1. shared variables/tokens and source/required derived themes;
2. target theme mapping;
3. existing shared primitive inspection/adaptation;
4. shared shell/sidebar and viewport ownership;
5. real route registration and route modules;
6. source-backed sections, visible controls, and local UI states/interactions;
7. mobile and responsive behavior;
8. disabled unsupported navigation and real repo logo.

For each packet record source/reproduction-contract evidence, files, readback/diff proof, result, and next action. Do not start a later required layer while an earlier one is incomplete.

Do not implement API/server/database/auth/persistence/business logic. Use local UI state and realistic static data only where needed to reproduce visible behavior. Do not invent product content, routes, behaviors, or alternate styling.

Pass the binary critical checklist only when every required UI route, state, section, interaction, theme, and mobile behavior is authored in order. Phase 1 has no numeric score.

## Phase 2: Integrity And Responsive Safety

Keep code review/readback and required repo checks for authored-app, code-quality, and integrity proof:

- authored app with no source runtime dependency, wrapper, viewer, raw injection, or evidence-table damage;
- no backend/business logic changes;
- complete route/state/section/interaction/mobile contract;
- real route boundaries, local UI interactions, disabled unsupported navigation, and real repo logo;
- target-required checks/builds/docs actions from recorded repo instructions;
- structural shell/sidebar ownership: document non-scroll owner, content-only overflow, stable full-height sidebar intent;
- responsive safety across source viewports plus desktop, tablet, mobile, and short-height desktop when relevant;
- no overlap, clipping, cutoff, canvas overflow, accidental horizontal/page scroll, or unusable control;
- source themes reproduced;
- target-exposed source-omitted theme conservatively derived and readable, without adding an unrequired switch.

Also run managed source and implemented-target Playwright at matching route/state/viewport pairs. Use `task-workflow/source-playwright/` with `source/` and `runtime/source/`; use `target-playwright/` with `verification/` and `runtime/target/`. Capture paired full-view and section images for source-represented sizes plus a deliberate desktop/tablet/mobile/short-height matrix when relevant.

Use paired images, browser geometry/state checks, and real input for important interaction states to prove:

- no overlap, clipping, cutoff, accidental horizontal canvas overflow, or unusable control;
- correct vertical/document/content overflow and no accidental page scroll;
- readable source and conservatively derived target-required themes;
- correct sidebar/full-page scroll ownership and no blank lower-sidebar region.

Correct objective failures even at source-unrepresented sizes while preserving the source visual direction. Pass the binary critical checklist only from both code/repo evidence and actual paired Playwright image/geometry/state evidence. Phase 2 has no numeric score.

Route failures to Phase 1, missing source/adaptation evidence to Phase 0, and integrity/check/browser-responsive failures to Phase 2. Phase 3 remains blocked until Phase 2 passes.
