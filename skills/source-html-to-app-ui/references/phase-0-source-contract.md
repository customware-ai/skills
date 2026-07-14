# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_0_authority>

Phase 0 owns the trusted basis for the entire implementation. If source discovery is incomplete, every later visual claim is untrustworthy.

Do not rush Phase 0 to reach implementation. The approved source is the product contract. Missing a route, state, section, interaction, scroll behavior, theme, or viewport can cause the Agent to deliver the wrong product and place the user's project or job at risk.

Phase 0 must produce inspectable source evidence, not a source-code interpretation. The initial understanding must come from opening the source in managed Playwright and inspecting screenshots. Read HTML/CSS/JS text only after the initial browser corpus is captured and opened, and then only to support selectors, state reachability, and precise implementation details.

Phase 0 is target-read-only for its entire duration. Inspect the design JSON and target files only after the complete HTML-derived desktop/mobile evidence set has been captured and opened, and then only in the mandatory order below to record architecture and constraints. Existing target-repository brand assets may be inspected read-only after the design read. If an expected target directory is absent, record that fact; do not create it. Do not run `mkdir`, `touch`, copy/move/remove commands, installers, formatters, or generators against the target. Do not download/copy/open externally referenced source logo or brand assets, even under `/tmp`; a task-level source-brand exception applies only after Phase 0 promotion in Phase 1. Record source URLs and intended Phase 1 destinations as contract evidence only. Do not install dependencies or edit any target file. Every task-related write must stay under `task-workflow/` until the supplied promotion gate passes. The executable promotion gate compares the complete target file hashes, symlinks, and directory tree with the bootstrap baseline, so empty/preparatory directories also fail.

</phase_0_authority>

## Mandatory Phase 0 Entry Sequence

<phase_0_entry_sequence>

The first Phase 0 actions are not discretionary:

| Order | Required action | Promotion evidence |
| ---: | --- | --- |
| 1 | Read this reference in one tool call, wait for the result, then read `playwright-lifecycle.md` in a second tool call; never batch or parallelize the reads | ordered tool/read evidence recorded in the artifact |
| 2 | As the next tool action, without listing or pre-validating inputs, run `assets/scripts/bootstrap-phase-0.mjs` with the task prompt's source HTML and design JSON paths; the bootstrap owns existence validation | `phase-0-entry-receipt.json` and fresh scaffold |
| 3 | Read only the already-named entry receipt directly—no intervening directory listing or existence probe—and confirm every copied artifact is byte-identical | receipt readback |
| 4 | Run the exact `MANDATORY NEXT ACTION` printed by the bootstrap | exact helper command and runtime logs |
| 5 | Separately read the already-named `source/initial-capture.json` directly—no `ls`, `stat`, `find`, glob, search, `wc`, or existence probe; lifecycle stdout is not a substitute. Only after that read, open all four `requiredInspectionImages` in order using four separate sequential image-read tool calls; wait for and inspect each result before requesting the next; never batch or parallelize these reads; do not insert an intervening spec/source/target/reference read | ordered desktop/mobile full-page and labeled section-contact-sheet inspection findings |
| 6 | Read the approved HTML/CSS/JavaScript directly and completely to EOF without a preceding shell probe; if a read is truncated, continue from its next offset until every line has been inspected | complete source audit findings |
| 7 | As the next action, run `node task-workflow/scripts/initialize-source-inventory.mjs`; read its generated inventory, reconcile it against the complete HTML, mark the audit passed, run `scripts/finalize-source-inventory.mjs`, then separately read its complete receipt | complete, hash-bound page/state inventory and finalization receipt |
| 8 | Validate the unchanged supplied inventory capture, run every printed lifecycle mode separately and sequentially, read its canonical manifest, and open every dynamic `inspectionImages` sheet in listed order | complete desktop/mobile page, section, state, and shell evidence visibly covered exactly once |
| 9 | After adding `imagesOpened`, read `task-workflow/spec.json` directly and completely as the immediate next tool action | exact ordered design-read evidence |
| 10 | Only then inspect target implementation and existing target-repository brand assets read-only; prepare and read back the exact Phase 1 packet-1 handoff before scoring or promotion | timestamped/order evidence plus `phase-1-entry-plan.json` |

Calling a planning/todo/task-list/delegation/subagent tool anywhere in Phase 0; drafting future-phase implementation, build/check, verification, or completion steps; batching or parallelizing the two mandatory reference reads; inserting `ls`, `stat`, `find`, glob, search, `wc`, path validation, or any other probe anywhere between orders 2 and 7; reading another phase reference; listing or reading target implementation; batching or parallelizing the four initial image reads; reading spec/source text before all four required images; stopping either image sequence early; reading the design JSON or target implementation before every inventory-driven capture mode passes and every dynamic inspection sheet is opened; after source inspection, listing/searching target paths, inspecting target implementation/assets, or reasoning about implementation before completely reading `task-workflow/spec.json`; authoring or modifying source-capture code; using a manual server; or making any non-workflow write before order 5 completes is an automatic run failure. The failure cannot be repaired in place because the discovery context is contaminated. Restore a clean fixture and restart.

</phase_0_entry_sequence>

## First-Write Boundary

The Immediate First-Action Lock is the complete authority before the first target-repository write. Use the input paths already supplied in the task prompt. Do not pre-validate them, re-read their files, inspect target files, or insert another action before the bootstrap. The bootstrap owns input validation. Read `task-workflow/spec.json` only after every HTML-inventoried source image has been captured and opened, but then read it as the immediate next path before any target listing/search/read. Record the target architecture before Phase 0 promotion.

The first target-repository write must be the supplied bootstrap command. Do not manually recreate its work:

```bash
node <skill-root>/assets/scripts/bootstrap-phase-0.mjs \
  --source-html <approved-source-html-path> \
  --design-json <approved-design-json-path>
```

The bootstrap deletes old `task-workflow/`, copies all templates and inputs byte-for-byte, copies the lifecycle, inventory, gate, and source-capture scripts byte-for-byte, creates all evidence/runtime roots, sets the marker, writes a hash receipt, and prints the one permitted next browser command.

Do not inspect or edit implementation, configuration, package, generated, or build files before this packet is complete and every image from the finalized source inventory has been captured and opened.

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
| No invisible/preparatory target mutation | `phase-0-target-baseline.json` exactly matches target files, symlinks, and directories at promotion |
| No early target/spec exploration | ordered tool evidence proving the complete inventory-driven browser corpus was opened before target or design JSON reads |
| Artifact confinement | listing proving generated workflow files exist only under `task-workflow/` |

A stale artifact, copied-forward score, reused screenshot, modified helper, missing template, or implementation edit before the boundary is an automatic Phase 0 failure.

## Target Instruction And Repository Contract

Start this contract only after the complete source manifest has been read, every listed dynamic inspection sheet has been opened, `imagesOpened` has been added exactly once, and `task-workflow/spec.json` has been read completely.

The start order is fixed:

1. Read `task-workflow/spec.json` directly and completely. Do not list or search target paths first.
2. Only then list/search/read target implementation paths and inspect existing target-repository brand assets read-only.

Do not reason about routes, assets, architecture, dependencies, or implementation before step 1 finishes. If target inspection begins first, the run is contaminated and must restart.

Read and record:

- existing route registration and layout boundaries;
- theme provider, tokens, typography, and shared primitives;
- existing logo and brand assets;
- app start, check, lint, type, and build commands available in the target;
- existing frontend architecture and file ownership;
- constraints that affect UI-only implementation.

After the complete design read, inspect target architecture and brand assets read-only as needed. Finish that optional inspection completely before the command below. Once owner inventory starts, the target-inspection window is permanently closed for Phase 0: do not list, find, read, or probe a target, public, brand, logo, directory, or repository path until Phase 1 promotion. Then run:

```bash
node task-workflow/scripts/inventory-phase-1-owners.mjs
```

Read `task-workflow/phase-1-owner-candidates.json` to EOF. This machine-generated inventory is the sole owner-path authority even if manual read-only inspection also revealed paths. Choose the smallest first tokens/themes/typography/primitives packet only from exact candidates categorized `styles-and-tokens`, `shared-primitives`, or `ui-config`, then read every selected file once, separately, and consecutively. Route/page/shell/layout/navigation candidates and outcomes belong to later packets. A path that was guessed, merely listed, absent from the inventory, not individually read after the inventory, or outside packet 1's allowed categories cannot enter packet 1.

Then run:

```bash
node task-workflow/scripts/prepare-phase-1-packet.mjs \
  --contracts "<comma-separated Phase 0 contract IDs including token/theme/typography/primitive ownership>" \
  --evidence "<comma-separated existing captured evidence paths beginning literally with task-workflow/source/>" \
  --files "<comma-separated exact existing target owner files>" \
  --outcome "<exact UI-only acceptance outcome>"
```

This is an atomic handoff lock. The `prepare-phase-1-packet.mjs` command above must be the literal next tool action after the last selected owner read. Do not reopen the Phase 0 artifact, gaps, progress, another implementation file, public/brand assets, a directory, or another reference first. After the command passes, read `task-workflow/phase-1-entry-plan.json` completely to EOF as the literal next action. Any intervening read, brand check, repository probe, write, summary command, or skipped preparation is automatic run failure; clean-reset rather than repairing the order.

For `--evidence`, use the discovery manifest and relevant inspection images only. Every value must exist and begin literally with `task-workflow/source/`. `task-workflow/spec.json` and `task-workflow/source-input/approved.html` are inputs, not evidence; target files are owners, not evidence. Every `--files` value must be copied exactly from `phase-1-owner-candidates.json` and must already have been individually read. Do not run the command with `--help` or read its source. This command is still Phase 0 work and writes only `task-workflow/phase-1-entry-plan.json`. It prints and embeds a literal ordered Phase 0 closeout sequence. Read the JSON back immediately, then execute every listed artifact, gaps, and progress read, write, and readback separately and in exact order. If an intended owner is absent, select a different exact candidate; do not create or guess a target path in Phase 0. Do not promote Phase 0 until the handoff, Phase 0 artifact, `open-gaps.md`, `progress.md`, score, decision, promotion lock, and all three final readbacks are complete. Running the promotion gate to discover even one missing checklist item is a failed phase-close audit; a rejected attempt does not authorize repair in place.

Do not use Phase 0 to plan backend, persistence, auth, API, or business logic. If the source appears to imply these systems, reproduce only their visible UI state using local state and static data.

## Mandatory Second Interactive Source Run

The supplied four-image initial capture proves only that the default rendered state can be inspected. It is a startup sanity corpus, never the Phase 0 evidence set, page count, or completion limit.

Before scoring Phase 0:

1. After the initial four images are opened, read `task-workflow/source-input/approved.html` completely to EOF, including all HTML, CSS, and JavaScript. If output is truncated, continue reading until every line has been inspected. First understand how many pages exist and exactly which pages, destinations, states, wizard steps, tabs, filters, drawers, dialogs, and disabled controls exist. Do not read the design JSON or inspect target implementation before this audit is complete.
2. Your next action after the complete source read must be `node task-workflow/scripts/initialize-source-inventory.mjs`. It writes a hash-bound skeleton from every runtime candidate. Do not hand-author a smaller inventory or skip this initializer.
3. Read the generated inventory. Reconcile it against the complete HTML: add source-declared pages/states runtime heuristics missed, correct labels/selectors/ownership/disabled proof, and preserve every runtime mapping exactly once. Set `sourceOnlyDeclarationsReviewed` to `true`, `sourceAuditStatus` to `Pass`, and add concrete `sourceAuditNotes` naming the source declarations reviewed.
4. Run `node task-workflow/scripts/finalize-source-inventory.mjs`. It rejects stale hashes, missing runtime mappings, duplicate mappings, invalid ownership, incomplete audit fields, and wrong counts. Separately read `source/discovery/source-inventory-audit-receipt.json` in full and confirm its page count plus page identities match the HTML audit. Any later inventory edit invalidates the receipt and requires finalization plus receipt read again.
5. Do not author, copy, or modify source-capture code. Run `node task-workflow/scripts/validate-source-discovery.mjs task-workflow/source-playwright/inventory-source-discovery.mjs`. Equivalent absolute paths are accepted only when they resolve to these exact supplied scripts. The validator still rejects any different path or any change from the byte-identical script installed by the bootstrap.
6. Run every lifecycle command printed by the validator separately, sequentially, and without an intervening target/spec read. The runner verifies the supplied script hash, owns the source lifecycle, automatically divides an arbitrarily large finalized inventory into sequential bounded execution batches, uses `15000`/`20000` ms per lifecycle batch, and records one complete receipt for each required mode only after all of that mode's candidates pass. A batch size is process isolation, never an evidence limit. Never invoke the lifecycle helper directly for this capture.
7. The supplied script consumes the finalized inventory rather than a page list. Across its lifecycle-owned batches, it iterates every `inventory.pages` entry at desktop and mobile, captures each full page plus its visible sections, iterates every `inventory.states` entry at desktop and mobile using real input, and captures desktop/mobile shell evidence. Before each screenshot it drives finite browser animations and transitions to their final state, then waits for stable frames, so evidence cannot freeze midway through motion. The HTML decides the counts. There is no fixed minimum, maximum, representative sample, first-page shortcut, or four-image cap.
8. Separately read the completed canonical `source/discovery/manifest.json`. Confirm its page/state counts and identities exactly match the finalized inventory and that desktop/mobile evidence exists for each entry.
9. The canonical manifest keeps raw evidence in `images`, dynamic readable contact sheets in `inspectionImages`, and an `inspectionCoverage` mapping. The supplied script must prove that the sheets visibly include every raw evidence file exactly once. Grouping is only an inspection transport; it must never omit or sample a page, state, viewport, section, scroll state, or drawer state. The browser script must not mention, create, or populate `imagesOpened`; screenshot capture is not image inspection.
10. Open every `inspectionImages` sheet separately and sequentially in listed order. Never inspect only representative sheets or replace a sheet read with its path. Reject any panel caught during an entrance animation or transition: faded, transparent, blank, partially populated, moving, or otherwise unsettled evidence is invalid even when its file exists. Stop Phase 0 instead of treating corrupt evidence as source truth. Only after every sheet and every labeled panel is complete and visually valid, edit the manifest once to add `imagesOpened` as the exact ordered copy of the inspected `inspectionImages` list.
11. Only now read `task-workflow/spec.json` directly and completely as the immediate next tool action. Only then inspect target implementation and existing target-repository brand assets read-only, complete the Phase 0 contract and ledgers, and score the phase. Any target listing/search/read or implementation reasoning before the design read, or any `Pass` or score written before this point, invalidates the run.
12. Reopen the completed artifacts, then run `node task-workflow/scripts/promote-phase-0.mjs`. Do not edit the marker manually.

Use this inventory shape exactly; arrays grow to match the HTML and have no fixed limit:

```json
{
  "sourceAuditStatus": "Pass",
  "sourceAuditNotes": ["Reviewed every navigation declaration, view container, and state-control family through EOF."],
  "sourceOnlyDeclarationsReviewed": true,
  "initialInventoryFingerprint": "<source/initial-capture.json inventoryFingerprint>",
  "sourceHtmlSha256": "<approved.html SHA-256>",
  "pageCount": 1,
  "pages": [
    {
      "candidateId": "page:<stable-name>",
      "label": "<visible page name>",
      "sourceSelectors": ["<HTML selector/declaration evidence>"],
      "runtimeCandidateIds": ["surface:<mapped runtime id>"],
      "disabled": false,
      "disabledSourceEvidence": ""
    }
  ],
  "stateCount": 1,
  "states": [
    {
      "candidateId": "state:<stable-name>",
      "ownerPageCandidateId": "page:<stable-name>",
      "label": "<state/control name>",
      "sourceSelectors": ["<HTML selector/declaration evidence>"],
      "runtimeCandidateIds": ["state:<mapped runtime id>"],
      "disabled": false,
      "disabledSourceEvidence": ""
    }
  ]
}
```

If the complete HTML was not read first, the initializer was skipped, the finalizer or complete receipt read was skipped, a source HTML page/state is absent from the inventory, any runtime candidate is unmapped, the supplied capture script changed, any required lifecycle mode was skipped, any inventoried page/state lacks desktop/mobile/full-page/section evidence, inspection coverage omits or duplicates raw evidence, any opened sheet panel is transition-corrupted or incomplete, or target/spec inspection began before every inspection sheet was opened, Phase 0 fails. If only `initial-source-capture.mjs` ran, Phase 0 fails. If validated runners ran concurrently or a source run used `60000` ms without a qualifying timer-only retry record, Phase 0 fails. If any target file outside `task-workflow/` changed, the executable gate fails and the run must be reset.

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
- exact task inputs and target architecture are recorded;
- every reachable route, state, section, and interaction family has real-input discovery evidence;
- desktop and mobile source evidence is complete and inspected;
- source scroll/sidebar/drawer/theme behavior is measured when present;
- source browser scripts contain no fixed waits;
- the reproduction contract is one-to-one, responsive-safe, and UI-only;
- no required table contains a placeholder or unsupported assumption;
- every cited path exists and was opened or read back.

### Promotion Lock

Before promotion, follow the generated `phase0CloseoutSequence` exactly. The sequence below defines its evidence requirements; it does not authorize a different order:

1. Reopen `phase-0-source-contract.md`.
2. Reopen every source image cited by the gate.
3. Confirm the score is at least `48/50`.
4. Confirm every critical item says `Pass` with evidence.
5. Confirm no required `Pending`, unsupported `N/A`, or ordinary open discovery gap remains.
6. Write the promotion lock and `Decision: Pass`.
7. Read the artifact back.
8. Update `progress.md`.
9. Read `phase-0-source-contract.md`, `open-gaps.md`, and `progress.md` back through the managed recorder in exact order. Do not use the file-read tool, `wc`, `sed`, `cat`, or another inspection command for these final readbacks. Run the generated `record-phase-0-readback.mjs <basename>` command. It emits one bounded numbered chunk and prints the sole next command. Rerun that exact command until it reports EOF, then follow its next-file command. The recorder binds every chunk cursor, exact order, line count, current hash, and entry-plan hash. A skipped chunk, different command, incomplete file, wrong order, or stale readback fails the gate and promotion rejects it.
10. Run `node task-workflow/scripts/promote-phase-0.mjs` exactly once; it sets `CURRENT_PHASE.txt` to `phase-1-ui-implementation` only when every executable check passes.
11. Read `references/phase-1-ui-implementation.md` before implementation.

Steps 9-11 are ordered: after the artifact and both ledgers are complete, use only the recorder's chained commands to inspect all three completely to EOF, then run `node task-workflow/scripts/promote-phase-0.mjs` once. Every recorder result names the sole next action. Promotion verifies all chunk completion, the ordered receipt, and current hashes, then alone writes the Phase 1 marker and promotion receipt. Then read the Phase 1 reference as the next action. An early rejected invocation is automatic run failure, not a diagnostic loop.

If any step fails, remain in Phase 0 and repair it. Do not implement anyway.

The Phase 0 promotion gate also rejects a missing, stale, incomplete, or baseline-unbound `phase-1-entry-plan.json`. Its passing output prints the literal ordered Phase 1 reads and gate command. Follow that printed sequence exactly.

</phase_0_gate>
