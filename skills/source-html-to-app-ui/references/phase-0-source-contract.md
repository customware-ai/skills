# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_0_authority>

Phase 0 owns the trusted basis for the entire implementation. If source discovery is incomplete, every later visual claim is untrustworthy.

Do not rush Phase 0 to reach implementation. The approved source is the product contract. Missing a route, state, section, interaction, scroll behavior, theme, or viewport can cause the Agent to deliver the wrong product and place the user's project or job at risk.

Phase 0 must produce inspectable source evidence, not a source-code interpretation. The initial understanding must come from opening the source in managed Playwright and inspecting screenshots. Read HTML/CSS/JS text only after the initial browser corpus is captured and opened, and then only to support selectors, state reachability, and precise implementation details.

Phase 0 is target-read-only for its entire duration. After the initial image gate, inspect target files only to record architecture and constraints. Do not download/copy/open source logo or brand assets, even under `/tmp`; record source URLs and intended Phase 1 destinations as contract evidence only. Do not install dependencies or edit any target file. Every task-related write must stay under `task-workflow/` until the supplied promotion gate passes.

</phase_0_authority>

## Mandatory Phase 0 Entry Sequence

<phase_0_entry_sequence>

The first Phase 0 actions are not discretionary:

| Order | Required action | Promotion evidence |
| ---: | --- | --- |
| 1 | Read this reference and `playwright-lifecycle.md` immediately after the main skill | tool/read evidence recorded in the artifact |
| 2 | As the next tool action, without listing or pre-validating inputs, run `assets/scripts/bootstrap-phase-0.mjs` with the task prompt's source HTML and design JSON paths; the bootstrap owns existence validation | `phase-0-entry-receipt.json` and fresh scaffold |
| 3 | Read only the entry receipt and confirm every copied artifact is byte-identical | receipt readback |
| 4 | Run the exact `MANDATORY NEXT ACTION` printed by the bootstrap | exact helper command and runtime logs |
| 5 | Read `source/initial-capture.json`, then open all four `requiredInspectionImages` in order using four separate sequential image-read tool calls; wait for and inspect each result before requesting the next; never batch or parallelize these reads; do not insert an intervening spec/source/target/reference read | ordered desktop/mobile full-page and labeled section-contact-sheet inspection findings |
| 6 | Only now read other references, inspect target files, or bulk-read source HTML | timestamped/order evidence |

Calling a planning/todo/delegation tool; inserting `ls`, `stat`, `find`, glob, search, or path validation before the bootstrap; reading another phase reference; listing or reading target implementation; batching or parallelizing the four initial image reads; reading spec/source text before all four required images; stopping the image sequence early; using a manual server; or making any non-workflow write before order 5 completes is an automatic run failure. The failure cannot be repaired in place because the discovery context is contaminated. Restore a clean fixture and restart.

</phase_0_entry_sequence>

## First-Write Boundary

The Immediate First-Action Lock is the complete authority before the first target-repository write. Use the input paths already supplied in the task prompt. Do not pre-validate them, re-read their files, inspect target `AGENTS.md`, or insert another action before the bootstrap. The bootstrap owns input validation. Read target `AGENTS.md` and its required docs only after all four initial source images have been opened, then record every binding instruction before Phase 0 promotion.

The first target-repository write must be the supplied bootstrap command. Do not manually recreate its work:

```bash
node <skill-root>/assets/scripts/bootstrap-phase-0.mjs \
  --source-html <approved-source-html-path> \
  --design-json <approved-design-json-path>
```

The bootstrap deletes old `task-workflow/`, copies all templates and inputs byte-for-byte, copies the lifecycle and initial source-capture scripts byte-for-byte, creates all evidence/runtime roots, sets the marker, writes a hash receipt, and prints the one permitted next browser command.

Do not inspect or edit implementation, configuration, package, generated, or build files before this packet is complete, the initial source browser corpus is captured, and every initial image is opened.

### Required First-Write Evidence

| Requirement | Required proof |
| --- | --- |
| Old state removed | pre-reset listing plus post-reset fresh listing |
| Templates fresh | file list and comparison to skill assets |
| Spec byte-identical | byte comparison with exact input path |
| Helper byte-identical | byte comparison with skill asset |
| Source HTML byte-identical | entry receipt comparison with the task input |
| Initial source script byte-identical | entry receipt comparison with the skill asset |
| Exact order | bootstrap was the next action after the two required reference reads; printed lifecycle command was next after receipt readback |
| No early implementation | clean diff/status evidence covering the boundary |
| No early target/source-text exploration | ordered tool evidence proving browser images were opened before implementation reads or bulk HTML reads |
| Artifact confinement | listing proving generated workflow files exist only under `task-workflow/` |

A stale artifact, copied-forward score, reused screenshot, modified helper, missing template, or implementation edit before the boundary is an automatic Phase 0 failure.

## Target Instruction And Repository Contract

Read and record:

- binding target instructions and required docs;
- existing route registration and layout boundaries;
- theme provider, tokens, typography, and shared primitives;
- existing logo and brand assets;
- app start, check, lint, type, and build commands required by target instructions;
- existing frontend architecture and file ownership;
- constraints that affect UI-only implementation.

Do not use Phase 0 to plan backend, persistence, auth, API, or business logic. If the source appears to imply these systems, reproduce only their visible UI state using local state and static data.

## Mandatory Second Interactive Source Run

The supplied initial capture proves only the default rendered state. It can never complete route, state, or interaction discovery by itself.

Before scoring Phase 0:

1. After the initial four images are opened, inspect source text only for selectors and reachable state logic.
2. Create at least one additional focused script under `task-workflow/source-playwright/` that uses real Playwright input calls such as `click`, `fill`, `press`, `selectOption`, `wheel`, `tap`, or drag.
3. Before any custom browser run, execute `node task-workflow/scripts/validate-source-discovery.mjs <custom-script-path> [...]`. Repair until it passes. Any script edit invalidates the hash receipt and requires revalidation.
4. Run each validated script only through `node task-workflow/scripts/run-validated-source-discovery.mjs <custom-script-path>`, one command at a time. Never invoke two validated runners in parallel. The runner verifies the hash, takes an exclusive source-lifecycle lock, invokes the unchanged lifecycle helper, hardcodes `15000`/`20000` ms limits, and records that script hash in `source/discovery/lifecycle-run-receipts.json`. Do not invoke the lifecycle helper directly for custom discovery. Split focused scripts rather than increasing time, but execute every split script sequentially. Every current custom script hash must have its own passing receipt. This must create a non-empty `run-02.log`.
5. Capture every discovered destination/state under `source/discovery/desktop/` and `source/discovery/mobile/`, with at least two images in each.
6. The discovery run may write `source/discovery/manifest.json` with `inputActions` and `images`. The browser script must not mention, create, or populate `imagesOpened`; screenshot capture is not image inspection.
7. Open every manifest image. Only after the final visual read, edit the manifest once to add `imagesOpened` as the exact ordered copy of the inspected `images` list.
8. Complete and reopen the Phase 0 artifact and ledgers.
9. Run `node task-workflow/scripts/promote-phase-0.mjs`. Do not edit the marker manually.

If a visible navigation/control family has not been exercised with real input, Phase 0 fails. If only `initial-source-capture.mjs` ran, Phase 0 fails. If a custom script contains a fixed wait, ran without a current validation receipt and matching lifecycle-run receipt, ran concurrently with another validated source runner, or used `60000` ms without a qualifying timer-only retry record, Phase 0 fails. If any target file outside `task-workflow/` changed, the executable gate fails and the run must be reset.

## Source Launch Contract

<source_launch_contract>

Choose a launch method that preserves the source's real behavior:

| Source form | Preferred launch | Required rationale |
| --- | --- | --- |
| self-contained HTML | direct file URL or helper-owned static server | prove assets, scripts, links, and states still work |
| multi-file HTML app | helper-owned static server | prove relative assets and routes resolve |
| source requiring a repo command | helper-owned source command | record why direct-file/static launch would lose behavior |

Use a source-only port and `task-workflow/runtime/source/`. The first source browser command must run through the unchanged lifecycle helper.

Do not start a manual server first. Do not use fixed sleeps for readiness. Do not edit the helper when a run fails. Diagnose the source runtime logs and command inputs using the lifecycle reference.

</source_launch_contract>

## Interactive Source Discovery

<interactive_source_discovery>

Use real input to discover every reachable product surface.

### Required Inventory

| Surface | Discovery requirement |
| --- | --- |
| Routes | direct routes, navigation destinations, disabled destinations |
| State-only views | tabs, filters, steps, selections, expanded/collapsed states |
| Sections | every visible full-width area, panel, card group, table, form, preview, footer |
| Interaction families | buttons, links, inputs, selects, toggles, menus, drawers, dialogs, tabs |
| Feedback states | empty, loading, success, warning, error, disabled, selected |
| Themes | every source theme and source theme behavior |
| Responsive states | every source-represented viewport and mobile behavior |
| Shell behavior | header, sidebar, content scroll owner, document scroll, drawer behavior |

For each route/state, record exact real-input reach steps. Do not write "navigate to page" when the state requires clicks, selections, or a route transition.

### Required Source Images

Capture under `task-workflow/source/`:

- a full-page or full-view image for every route/state at every source-represented desktop and mobile viewport;
- a readable image for every visible section;
- labeled contact sheets that make every initial section inspectable at desktop and mobile without silently skipping individual section evidence;
- interaction-state images when a state changes visible UI;
- drawer/menu/dialog open images when present;
- pre-scroll and post-scroll images for sidebar layouts;
- source theme images when more than one theme exists.

Open every image after capture. Confirm it is current, readable, correctly framed, and shows the intended route/state. A path in a table is not evidence until the image has been inspected.

### Source Browser Measurements

When a sidebar or constrained shell exists, record:

- viewport dimensions;
- document `scrollHeight`, `clientHeight`, and `scrollTop`;
- content pane `scrollHeight`, `clientHeight`, and `scrollTop`;
- sidebar top, bottom, height, and position before and after scroll;
- shell height and overflow owners;
- whether a blank lower-sidebar region appears.

When a mobile drawer exists, record open/close controls, overlay behavior, body lock, geometry, and scroll restoration.

</interactive_source_discovery>

## Reproduction Contract

Translate accepted source evidence into explicit target obligations.

| Contract group | Required contents |
| --- | --- |
| Route/state | exact route or reach steps; destination; visible state |
| Section | structure, hierarchy, content, spacing, typography, color, controls |
| Interaction | trigger, local state transition, visible result, disabled behavior |
| Shell | viewport ownership, scroll owner, sidebar/header behavior |
| Responsive | represented behavior plus conservative omitted-size adaptation |
| Theme | source behavior plus target-required derived theme policy |
| Exclusions | no invented routes/content/behavior/backend/business logic |

For source-omitted sizes, define objective safety requirements without inventing a new design: no overlap, clipping, cutoff, horizontal canvas overflow, accidental page scroll, unusable controls, or blank lower sidebar.

## Open Gaps Initialization

After fresh scaffolding, replace template placeholders in `open-gaps.md`.

- If discovery already exposes a gap or uncertainty, record it with route/state, section, severity, owner, next action, source evidence, and target evidence.
- If none exists yet, write exactly one explicit `None currently recorded` row.
- The first real Phase 2 comparison must replace that row with mismatch rows or explicit comparison evidence.

## Phase 0 Gate

<phase_0_gate>

### Scorecard

| Category | Points |
| --- | ---: |
| Fresh scaffold and first-write integrity | 10 |
| Target instructions and repository contract | 8 |
| Route/state/interaction discovery | 10 |
| Desktop/mobile/section source evidence | 12 |
| Scroll/drawer/theme/reproduction contract | 10 |
| **Total** | **50** |

Required score: at least `48/50`.

### Non-Compensating Critical Items

Every item must pass:

- fresh reset/reseed is proved and no implementation changed early;
- all five templates, ledgers, roots, spec, marker, and unchanged helper exist;
- exact task inputs and target instructions are recorded;
- every reachable route, state, section, and interaction family has real-input discovery evidence;
- desktop and mobile source evidence is complete and inspected;
- source scroll/sidebar/drawer/theme behavior is measured when present;
- source browser scripts contain no fixed waits;
- the reproduction contract is one-to-one, responsive-safe, and UI-only;
- no required table contains a placeholder or unsupported assumption;
- every cited path exists and was opened or read back.

### Promotion Lock

Before promotion:

1. Reopen `phase-0-source-contract.md`.
2. Reopen every source image cited by the gate.
3. Confirm the score is at least `48/50`.
4. Confirm every critical item says `Pass` with evidence.
5. Confirm no required `Pending`, unsupported `N/A`, or ordinary open discovery gap remains.
6. Write the promotion lock and `Decision: Pass`.
7. Read the artifact back.
8. Update `progress.md`.
9. Run `node task-workflow/scripts/promote-phase-0.mjs`; it sets `CURRENT_PHASE.txt` to `phase-1-ui-implementation` only when every executable check passes.
10. Read `references/phase-1-ui-implementation.md` before implementation.

Steps 9-10 are executable: after the artifact and progress ledger are complete, run `node task-workflow/scripts/promote-phase-0.mjs`. It alone writes the Phase 1 marker and promotion receipt. Then read the Phase 1 reference as the next action.

If any step fails, remain in Phase 0 and repair it. Do not implement anyway.

</phase_0_gate>
