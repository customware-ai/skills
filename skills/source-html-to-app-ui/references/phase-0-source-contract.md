# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_0_authority>

Phase 0 owns the trusted basis for the entire implementation. If source discovery is incomplete, every later visual claim is untrustworthy.

Do not rush Phase 0 to reach implementation. The approved source is the product contract. Missing a route, state, section, interaction, scroll behavior, theme, or viewport can cause the Agent to deliver the wrong product and place the user's project or job at risk.

Phase 0 must produce inspectable source evidence, not a source-code interpretation. Reading HTML is necessary for orientation but does not replace opening the source in Playwright and exercising it with real input.

</phase_0_authority>

## First-Write Boundary

Before the first target-repository write:

1. Read the task instructions.
2. Read target `AGENTS.md` and every task-relevant file it requires.
3. Read the source HTML and design JSON paths.
4. Read the main skill and this reference.
5. Identify the target root and confirm delivery mode.

The first target-repository write must be one reset-and-reseed packet:

```text
delete old task-workflow/
copy all five phase templates
copy progress.md and open-gaps.md templates
copy lifecycle helper byte-for-byte
copy design JSON byte-for-byte to task-workflow/spec.json
create empty source/target script, evidence, and runtime roots
set CURRENT_PHASE.txt to phase-0-source-contract
```

Do not edit implementation, configuration, package, generated, or build files before this packet is complete and read back.

### Required First-Write Evidence

| Requirement | Required proof |
| --- | --- |
| Old state removed | pre-reset listing plus post-reset fresh listing |
| Templates fresh | file list and comparison to skill assets |
| Spec byte-identical | byte comparison with exact input path |
| Helper byte-identical | byte comparison with skill asset |
| No early implementation | clean diff/status evidence covering the boundary |
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
9. Set `CURRENT_PHASE.txt` to `phase-1-ui-implementation`.
10. Read `references/phase-1-ui-implementation.md` before implementation.

If any step fails, remain in Phase 0 and repair it. Do not implement anyway.

</phase_0_gate>
