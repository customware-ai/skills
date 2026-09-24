# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_authority>

Phase 0 builds the visual reference and declaration-backed contract that controls implementation. It is not a quick screenshot pass or a source-side functional test suite. Source interactions that reveal no distinct appearance are implemented and tested in the target phases, not proved again in Phase 0.

<source_boundary>
Keep target implementation and assets unchanged until Phase 0 passes. Use the managed lifecycle helper for browser evidence and deterministic waits in packets. Source HTML, design metadata, skill resources, and task-workflow artifacts may be inspected in any useful order; none may substitute for required screenshots or complete declared-surface coverage. Correct a procedural mistake in place and recapture only invalid evidence.
</source_boundary>

Read the skill and relevant references before phase work. Inspecting source inputs or task-workflow files before the first browser packet is permitted; target implementation remains Phase 1 work.

The Agent evaluates this phase itself against the rubric below. Do not create or use a script to validate, score, close, or promote Phase 0. Playwright scripts may discover and capture the source, but they must run through `playwright-lifecycle.mjs` and cannot decide whether the phase passes.

Phase 0 remains unpassed until every source page, distinct visual state, visible section, declared interaction family, represented theme, and required viewport has been identified and covered; capture and open every reachable visual state. Decide the capture plan from the HTML and initial browser view before full capture. One readable image may prove multiple sections, but each section must cite its covering image and finding. A declared interaction whose resulting appearance is already covered needs a target requirement, not another source-browser packet. If source JavaScript fails or normal input does not reveal an intended UI state, note the observed error or unavailable state and its intended HTML/CSS/design declarations, then move on. Do not create a source-error diagnostic packet, trace the exception or handler order, or repeat failed actions. Do not fabricate or require a source screenshot of an unavailable state; require its complete target evidence later.

</phase_authority>

## Entry Conditions

Before Phase 0 work:

- `CURRENT_PHASE.txt` is missing or says `phase-0-source-contract`;
- the Agent has reread `SKILL.md`, this reference, and the lifecycle reference;
- the exact task inputs, source HTML path, design JSON path, target root, and completion command source are known;
- no target implementation/config/package/generated/build/test file has changed for this run;
- the first discovery packet script and expected proof are defined before its browser run.

If stale workflow state or an early target change exists, reset to a clean Phase 0 boundary before discovery.

## Fresh Artifact Setup

Before Phase 0 scoring, create a fresh task-workflow scaffold that:

1. remove the old `task-workflow/` directory;
2. recreate the runtime structure listed in `SKILL.md`;
3. copy all five phase templates, `progress.md`, and `open-gaps.md` fresh;
4. copy `playwright-lifecycle.mjs` byte-for-byte;
5. copy the supplied design JSON byte-for-byte to `task-workflow/spec.json`;
6. set `CURRENT_PHASE.txt` to `phase-0-source-contract`.

Do not copy prior screenshots, scores, scripts, manifests, or decisions. Do not edit target source, config, package, asset, generated, build, or test files during Phase 0. Only `task-workflow/` may change.

Record scaffold completion in the Phase 0 artifact; the checkpoint needs only its current phase and next action.

The fresh scaffold must preserve byte-identical approved inputs and copied helper. Check the files when useful; no immediate next-tool-call sequence is required.

## Bounded Source Capture

Inspect the HTML and initial browser view to select route/state families and readable viewport/section framing. Let the actual application determine the number of packets and screenshots; no fixed screenshot cap applies. A packet is a lifecycle-owned script plus its generated images, metadata, and runtime log—not a separate Markdown dossier. Keep each capture run focused enough that a failure identifies the affected group. Do not write a command table, predeclare every image in a ledger, or copy HTML headings, values, or handler bodies into workflow files.

After a packet, inspect its result and each accepted/current image. Record one concrete finding per accepted/current image in a concise evidence index. Keep objective capture fields in the packet output or machine-readable manifest and the execution trail in the runtime log. Update `progress.md` only when a group completes or fails, the next action changes, or the phase changes. Record only actual unresolved gaps in `open-gaps.md`. Use these existing records to resume or answer a specific open question; do not reread the whole workflow, perform extra preflight checks beyond the focused packet review, or rerun a packet merely to reconfirm settled evidence. On failure, diagnose the packet and recapture only invalidated evidence under new paths. Preserve failed outputs and invalidation reasons for forensic review; they are not part of the passing image count. If an image is visually valid but recoverable metadata is missing, reconstruct it from the actual image/runtime record; recapture only when image validity or provenance cannot be established.

Before the Phase 0 gate, verify declared coverage, lifecycle ownership, real-input reachability, readable desktop/mobile/section evidence, deterministic waits, source/target boundary, and absence of unresolved gaps. Record the decision once in the Phase 0 artifact with links to evidence; no per-packet checklist or repeated readback is required.

## Source Discovery Requirements

Before Phase 0 passes, inspect approved HTML/CSS and UI-relevant JavaScript declarations for intended visuals and interactions, capture and open the initial desktop/mobile orientation, verify full declared and browser-discovered UI coverage, and score the source contract. These source tasks may occur in any useful tool order. Keep target implementation and assets unchanged until the Phase 0 gate passes. Source browser packets must confirm the exact approved HTML URL, useful content, and proper lifecycle ownership.

### 1. First Managed Browser Inspection

Create a small custom Playwright orientation script under `task-workflow/source-playwright/` that:

- opens the supplied HTML through its real source launch method;
- receives the exact served HTML URL through `SOURCE_URL` (or an equivalent explicit packet input), navigates to that URL rather than the server directory root, and asserts response success, exact final URL identity, and non-directory content so a directory listing, blank page, or wrong route cannot count as orientation evidence. Assert task-supplied identity when available; otherwise record the title and reconcile it against the relevant HTML declaration;
- waits deterministically for the visible UI and required visible images before capture. An external logo may load a few seconds after the document; wait for its actual readiness (for an image, completion with nonzero natural dimensions), not a fixed delay. If the approved source fails to load it, record that source defect rather than retrying the same state indefinitely;
- captures exactly one initial desktop image;
- captures exactly one initial mobile image;
- records page title, visible navigation, viewport, document dimensions, and obvious interactive controls. For each image, write one capture record with its ID/path, source URL, state, theme, viewport, framing, dimensions derived from the saved PNG, capture time, lifecycle run, and required visible-asset status. Do not mistake viewport or document dimensions for PNG dimensions;
- leaves all full-page, section, state, theme, and per-page capture work to later focused capture packets;

Run it through `task-workflow/scripts/playwright-lifecycle.mjs`. Open both orientation images and record one concrete finding for each before Phase 0 scoring. These images are startup orientation only; they are never the final inventory and never establish a screenshot limit. Open any additional images the packet produces before scoring.

### 2. Source Inspection And Capture Plan

Inspect the approved HTML, CSS, and JavaScript sufficiently to identify every declared page or route-like surface, hidden panel, tab, modal, drawer, menu, section, visual state, navigation/interaction family, theme, breakpoint, scroll owner, and content not initially visible. Use targeted reads or parsing and revisit relevant excerpts when implementing; do not mechanically read to EOF, repeatedly reread the entire document, or reproduce its facts in a large table. The HTML is authoritative for declarations, and the browser is authoritative for actual rendered states and runtime failures.

After orientation and source inspection, choose the smallest set of desktop/mobile full views and readable section/state/theme images that covers the declared surfaces and observed differences. One image may cover several readable sections; a changed local state needs the changed region with enough context, not a duplicate full page. A declaration whose resulting appearance is already evidenced needs a target requirement, not another source-browser test. Keep a concise evidence index of accepted image IDs/paths, what each proves, and one finding per image; record only source defects, non-obvious reachability decisions, adaptations, and exclusions that cannot be recovered by opening the HTML or images. Revise the capture plan for newly discovered states, unreadable content, or contradictions. There is no fixed inventory or screenshot count.

### 4. Complete Source Evidence Capture

For every reachable inventoried page-like surface and layout-distinct state, capture through managed Playwright:

- desktop full-view or full-page evidence;
- mobile full-view or full-page evidence;
- readable evidence covering every visible section; one image may cover several adjacent sections when each is legible at review scale;
- focused state images with enough surrounding context where a real interaction changes only part of an otherwise unchanged page;
- relevant theme images;
- geometry and pre/post-scroll evidence when layout ownership matters.

Choose the smallest evidence set that makes every inventoried section and meaningful state independently inspectable; this is a coverage rule, not a screenshot cap. A full-view image covers a section only when its text and details are readable there. Capture a separate image for unreadable content, a distinct visual change not shown, or framing needed for source-target comparison. For a changed state, capture its changed area with enough context; do not automatically duplicate the unchanged full page and every unchanged section. Keep a concise pointer from each section or section group to an accepted readable image; do not copy its content. Split capture into focused packets. Each packet owns one route/state family and a coherent viewport/theme set. Keep the packet small enough that its failure identifies one evidence group and its outputs can be opened and reviewed immediately. Do not build one monolithic script for the entire source corpus. When browser evidence is missing or invalid, repair and rerun only that packet; do not rerun already-passed packets. Recover missing metadata from actual image/runtime records when provenance remains valid. Keep prior captures in runtime evidence and use a new revisioned path when a prior image is recaptured. Reject duplicate image IDs or paths before writing captures, and isolate or reset source state between viewport baselines.

Use deterministic waits, including visible asset readiness when an image is needed for a valid screenshot. Before every helper invocation, review the current packet and confirm it contains no `page.waitForTimeout(`, `waitForTimeout(`, `setTimeout(`, `setInterval(`, shell `sleep`, or arbitrary polling/timer settling. Review the current packet before invoking the helper; a focused diff or targeted read may cover a small edit, while a new or substantially rewritten packet merits a complete read. A focused code review before invocation suffices; no duplicate review log is required. No particular tool-call order is required. Do not run a packet with a fixed wait and plan to repair it afterward. Any fixed wait is a hard packet failure, not a harmless settling aid; remove it, record the repair, replace it with a visible-state, URL, DOM, response, geometry, or assertion condition, and rerun the packet through the lifecycle helper before scoring.

After each successful capture, open every accepted/current image at readable scale in batches of at most four related images. Record one concrete finding per image in the concise evidence index. The opened count must equal the accepted/current image count before scoring; a contact sheet, representative sample, or one viewport is insufficient. Invalidated images remain in runtime evidence with reasons but do not require another passing visual review.

If an image is blank, unsettled, faded, clipped, stale, unreadable, or captures an entrance animation, reach the state through real input and wait for its own visible DOM, geometry, opacity, or transition condition, then recapture it. Do not inject CSS, set opacity/classes, disable animations, or mutate source DOM to manufacture a settled screenshot. If a required locator or section capture fails because of the packet or selector, fail, repair, and rerun that packet. If source JavaScript or its normal UI action fails, record the error or unavailable state and intended design from source declarations; do not debug or repeatedly retry the source. Assert semantic control/DOM state rather than rendered letter case when CSS text transformation changes capitalization.

### Source Evidence Identity And Inspection

Give every image a stable ID and unique path. Store its objective capture metadata once in packet output or a machine-readable manifest; later gates reference that record rather than reconstructing a parallel ledger. Do not duplicate these fields in Markdown. Never overwrite an image; use a new revisioned path only when recapture is needed and keep the invalidation reason with the runtime evidence. The passing corpus consists only of accepted/current images.

Open each accepted/current image at readable scale, singly for tall images or in batches of up to four related images. Record one concrete visible finding per accepted/current image in the concise evidence index, with coverage pointers where needed. The opened accepted/current count must equal the accepted/current image count. A contact sheet or representative sample cannot replace this review. Keep the next unreviewed group in the checkpoint only when work stops or the next action changes.

### 5. Sidebar, Drawer, Scroll, And Theme Discovery

When a sidebar exists, inspect a short-height desktop viewport with enough content to force overflow. Record:

- shell, sidebar, document, and content-pane geometry;
- actual scroll owner before and after real wheel/scroll input;
- sidebar top and bottom bounds;
- pre-scroll and post-scroll screenshots;
- whether a blank lower-sidebar region appears.

Keep two contracts distinct:

| Contract | Required record |
| --- | --- |
| Observed source behavior | the source's actual document/content scroll values and sidebar bounds before/after input |
| Required target behavior | a viewport-bounded shell whose document stays still, named content pane scrolls, and sidebar top/bottom stay fixed to the viewport |

The source observation is reference evidence. If the source uses document scrolling or sticky positioning, carry its visible result into the target while adapting the target shell to the required content-only scroll architecture. Write that adaptation explicitly into the reproduction contract.

When a mobile drawer exists, record real-input open/close behavior, overlay, full-height geometry, background interception, body/document lock, and scroll restoration.

Record every represented theme. If the source omits a target-required theme, record the conservative derivation rule without inventing a new direction.

### 6. Source Design And Target Research Handoff

After complete source evidence has been captured and opened, and the Phase 0 artifact links that evidence:

1. read `task-workflow/spec.json` completely;
2. record only target-specific roles, shell adaptations, exclusions, and Phase 1 research actions not already recoverable from source/design or accepted images;
3. keep exact target file paths and target-owner mapping deferred until `CURRENT_PHASE.txt` is `phase-1-ui-implementation`;
4. record UI-only boundaries and explicit exclusions.

Do not inspect target routes, layouts, components, styling owners, tokens, themes, assets, dependencies, or commands in Phase 0. After promotion, Phase 1 must inspect those owners before the first implementation packet. Use the real repository logo when available, and record unsupported navigation destinations so Phase 1 can disable them instead of inventing routes.

## Reproduction Contract

The HTML and design JSON remain the source of declared content, styles, sections, and handlers; accepted browser images supply visual and runtime evidence. Do not transcribe them into one row per source item. In the Phase 0 artifact, link the accepted evidence index and record only target-specific decisions: intended interaction families, source defects and unreachable states, shell/sidebar/content-scroll roles, responsive or theme adaptations, unsupported navigation exclusions, UI-only scope, and Phase 1 research actions. Phase 1 maps these requirements to exact target files while inspecting the source declarations as needed. Coverage must still include all pages, states, sections, interaction families, themes, assets, and responsive behavior.

For a sidebar, name the target viewport shell, sidebar, and content-scroller roles. Require unchanged document scroll, increasing content scroll, and stable viewport-bounded sidebar; `sticky 100vh` alone is insufficient.

## Phase 0 Model Gate

Score the Phase 0 artifact row by row:

| Category | Points |
| --- | ---: |
| Fresh scaffold and target-read-only integrity | 10 |
| Complete HTML inventory and visual-state reachability | 10 |
| Desktop/mobile/state/section source evidence | 12 |
| Sidebar/drawer/scroll/theme discovery | 8 |
| Source/design handoff and reproduction contract | 10 |
| **Total** | **50** |

Required score: at least `48/50`.

Every critical item must independently pass:

- old workflow state was removed and fresh artifacts were created;
- no target implementation/config/package/generated/build/test file changed;
- initial desktop/mobile source evidence was captured and opened through managed lifecycle;
- all declared pages, states, sections, styles, and intended interaction families were identified from UI-relevant HTML/CSS/JavaScript declarations;
- every source page, distinct visual state, visible section, and declared interaction family is covered or specifically excluded, with interactions that add no new appearance handed to target verification;
- every accepted capture packet has lifecycle/runtime proof and reviewed evidence;
- every reachable distinct visual item has desktop and mobile evidence plus readable section/state evidence where applicable; interactions with no new appearance have a source declaration and target-proof owner; source-unavailable visual states have the observed error or unavailable state and intended source declarations recorded;
- every accepted/current image was opened and inspected individually or in a readable batch with a per-image finding, and the opened count exactly equals the accepted/current count;
- custom Playwright scripts contain no fixed waits and ran through lifecycle ownership; any fixed wait is a critical failure;
- sidebar/drawer/scroll/theme behavior is proved when applicable;
- observed source scroll behavior and required target scroll behavior are recorded separately, with a named viewport shell and content scroller in the target contract;
- the copied design JSON and source/design handoff were inspected after source discovery; exact target architecture research is explicitly deferred to Phase 1;
- the HTML, design JSON, accepted images, and concise target-specific handoff together cover every required source item; exact target file ownership is mapped in Phase 1;
- no required placeholder, unsupported assumption, or ordinary discovery gap remains.

The Agent must calculate the score from the artifact's evidence once planned capture coverage, source/design handoff, and applicable scroll/theme work are reconciled. A new discovery packet after this point needs a specific uncovered inventory item, unreadable image, or contradiction. An unattempted planned item belongs in the checkpoint next action, not `open-gaps.md`; that ledger records observed missing, failed, or contradictory proof. Do not use a checker or promotion script. If any critical item fails or the score is below `48/50`, keep `CURRENT_PHASE.txt` on Phase 0, record the earliest failure and next repair, perform the repair, refresh evidence, and rescore.

## Promotion Lock

Review the accepted/current image index and findings, unique paths and capture metadata, declared source/design coverage, target-specific handoff, score arithmetic, every critical item, and actual open gaps once. Reopen only stale or unclear images. If anything fails, remain in Phase 0 and repair only invalidated evidence. On pass, record `Decision: Pass`, set `CURRENT_PHASE.txt` to `phase-1-ui-implementation`, update the checkpoint's phase/next action, and read `references/phase-1-ui-implementation.md` before target work.
