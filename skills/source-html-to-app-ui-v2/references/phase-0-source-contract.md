# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_authority>

Phase 0 builds the complete evidence-backed contract that controls implementation. It is not a quick screenshot pass and not a planning shortcut.

<source_boundary>
Keep target implementation and assets unchanged until Phase 0 passes. Use the managed lifecycle helper for browser evidence and deterministic waits in packets. Source HTML, design metadata, skill resources, and task-workflow artifacts may be inspected in any useful order; none may substitute for required screenshots or the complete source inventory. Correct a procedural mistake in place and recapture only invalid evidence.
</source_boundary>

Read the skill and relevant references before phase work. Inspecting source inputs or task-workflow files before the first browser packet is permitted; target implementation remains Phase 1 work.

The Agent evaluates this phase itself against the rubric below. Do not create or use a script to validate, score, close, or promote Phase 0. Playwright scripts may discover and capture the source, but they must run through `playwright-lifecycle.mjs` and cannot decide whether the phase passes.

Phase 0 remains unpassed until every source page, meaningful state, visible section, interaction family, represented theme, and required viewport has been discovered and recorded; capture and open every reachable source view. One readable image may prove multiple sections, but each section must cite its covering image and finding. For a state unreachable solely because of a documented source runtime defect, record the failed real-input action and the HTML/CSS/design/handler declarations that define its intended result. One proven initialization failure may explain several later unbound handlers when their order is explicit; do not repeat equivalent no-op probes. Do not fabricate or require a source screenshot of an unreachable state; require the corresponding target evidence later.

</phase_authority>

## Entry Conditions

Before Phase 0 work:

- `CURRENT_PHASE.txt` is missing or says `phase-0-source-contract`;
- the Agent has reread `SKILL.md`, this reference, and the lifecycle reference;
- the exact task inputs, source HTML path, design JSON path, target root, and completion command source are known;
- no target implementation/config/package/generated/build/test file has changed for this run;
- the first discovery packet is recorded before its browser run.

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

Record the reset and copied paths in the Phase 0 artifact and `progress.md`.

The fresh scaffold must preserve byte-identical approved inputs and copied helper. Check the files when useful; no immediate next-tool-call sequence is required.

## Model-Owned Discovery Packet Loop

Treat each source-discovery group as a small auditable packet: initial orientation, complete source reading, page/state inventory, full-view capture, section/state capture, shell/sidebar/drawer/theme discovery, and source/design handoff.

Before each packet, record:

- the exact source scope and expected discoveries;
- the custom Playwright script and lifecycle command when browser work is required;
- the evidence paths and inventory items the packet must prove, including sections sharing a readable image;
- explicit exclusions and work owned by later packets;
- the one review action that determines whether the packet passes.

Then:

1. perform only the declared discovery packet;
2. open every captured image and inspect changed artifacts when needed for review;
3. reconcile findings against the complete HTML and existing inventory;
4. record actual evidence, missing coverage, contradictions, and gaps;
5. update the canonical source inventory/evidence record; update `progress.md` when the next action changes and `open-gaps.md` for an observed gap, then review current state before scoring, promotion, or resuming work;
6. record the packet review decision and evidence IDs once;
7. if any row fails, repair the same packet and repeat the review;
8. begin the next packet only when every review row passes.

### Discovery Packet Review Checklist

| Required review | Pass condition |
| --- | --- |
| Declared coverage | every declared page/state/section/theme/viewport item was inspected |
| Lifecycle ownership | every browser action ran through the unchanged lifecycle helper |
| Real-input reachability | reachable pages and states were reached through Playwright user-facing input APIs; unreachable source states cite the source defect and declarations, not evaluated DOM mutation or dispatched events |
| Evidence completeness | required desktop/mobile/full-view/section/state images exist |
| Visual inspection | every gate-critical image was opened at a useful scale |
| Source reconciliation | browser findings and complete HTML declarations agree |
| Fixed-wait audit | custom Playwright scripts use deterministic waits |
| Scope boundary | target implementation remained read-only and later work was not pulled forward |
| Artifact synchronization | source record, phase marker, progress, and actual open gaps agree on the current state |
| Gap ledger | missing or contradictory evidence has an owner and next repair |

This checklist is an Agent review recorded in the Phase 0 artifact, never a script result.

## Source Discovery Requirements

Before Phase 0 passes, read the approved HTML/CSS/JavaScript completely, capture and open the initial desktop/mobile orientation, complete and inspect the source inventory, and score the source contract. These source tasks may occur in any useful tool order. Keep target implementation and assets unchanged until the Phase 0 gate passes. Source browser packets must confirm the exact approved HTML URL, useful content, and proper lifecycle ownership.

### 1. First Managed Browser Inspection

Create a small custom Playwright orientation script under `task-workflow/source-playwright/` that:

- opens the supplied HTML through its real source launch method;
- receives the exact served HTML URL through `SOURCE_URL` (or an equivalent explicit packet input), navigates to that URL rather than the server directory root, and asserts response success, exact final URL identity, and non-directory content so a directory listing, blank page, or wrong route cannot count as orientation evidence. Assert task-supplied identity when available; otherwise record the title and reconcile it after the complete HTML read;
- waits deterministically for the visible UI;
- captures exactly one initial desktop image;
- captures exactly one initial mobile image;
- records page title, visible navigation, viewport, document dimensions, and obvious interactive controls;
- leaves all full-page, section, state, theme, and per-page capture work to the complete inventory packet;

Run it through `task-workflow/scripts/playwright-lifecycle.mjs`. Open both orientation images and record one concrete finding for each before Phase 0 scoring. These images are startup orientation only; they are never the final inventory and never establish a screenshot limit. Open any additional images the packet produces before scoring.

### 2. Complete HTML/CSS/JavaScript Reading

Read the approved source HTML completely to EOF, including inline CSS and JavaScript. Continue bounded reads until no unread lines remain.

Identify:

- every page, route-like surface, hidden panel, tab, modal, drawer, menu, and view;
- every navigation trigger and JavaScript/CSS state transition;
- every meaningful visual state and interaction family;
- every visible section and its source order;
- themes, responsive rules, breakpoint behavior, scroll containers, and fixed/sticky regions;
- content or state declared in source but not visible in the initial browser view.

Do not assume one HTML file means one page. Source pages may be switched through JavaScript, classes, attributes, anchors, query values, or CSS visibility.

### 3. Interactive Inventory Confirmation

Create or update custom Playwright discovery scripts under `task-workflow/source-playwright/`. Use real input to reach every candidate page and meaningful state found in the source.

Run all browser work through the lifecycle helper. Draft an inventory under `task-workflow/source/` after reading the HTML and initial orientation, before the complete capture. It guides packet framing and the source-to-target contract rather than becoming a post-capture backlog. Record:

| Required field | Meaning |
| --- | --- |
| Stable ID | unique page/state identity |
| Page or state name | visible identity |
| Exact reach steps | real controls and inputs used |
| Interaction family | navigation, tab, drawer, modal, form, filter, selection, etc. |
| Visible sections | complete ordered section list |
| Themes | represented or required variants |
| Desktop/mobile behavior | observed transformation and scroll ownership |
| Evidence paths | planned desktop/mobile images and the sections or states each will cover; replace with captured IDs and findings |

Reconcile browser findings against the complete HTML reading. Every runtime surface/state and every source-declared surface/state must appear exactly once or have an explicit evidence-backed exclusion. Draft source-to-target requirement rows from those declarations now, without inspecting target files; finalize the handoff after evidence review. Revise planned images for a distinct newly discovered state, unreadable content, or contradiction—not merely because another DOM element or input value exists.

There is no fixed inventory size and no fixed screenshot count.

### 4. Complete Source Evidence Capture

For every reachable inventoried page-like surface and layout-distinct state, capture through managed Playwright:

- desktop full-view or full-page evidence;
- mobile full-view or full-page evidence;
- readable evidence covering every visible section; one image may cover several adjacent sections when each is legible at review scale;
- focused state images with enough surrounding context where a real interaction changes only part of an otherwise unchanged page;
- relevant theme images;
- geometry and pre/post-scroll evidence when layout ownership matters.

Choose the smallest evidence set that makes every inventoried section and meaningful state independently inspectable; this is a coverage rule, not a screenshot cap. A full-view image covers a section only when its text and details are readable there. Capture a separate image for unreadable content, a distinct visual change not shown, or framing needed for source-target comparison. For a changed state, capture its changed area with enough context; do not automatically duplicate the unchanged full page and every unchanged section. Map every section to its covering image, even when several rows cite the same image. Split capture into focused packets. Each packet owns one route/state family and a coherent viewport/theme set. Keep the packet small enough that its failure identifies one evidence group and its outputs can be opened and reviewed immediately. Do not build one monolithic script for the entire source corpus. When a packet fails, repair and rerun only that packet; do not rerun already-passed packets unless their evidence was invalidated. Keep the manifest append-only and use a new revisioned path when a prior image is recaptured. Reject duplicate image IDs or paths before writing captures, and isolate or reset source state between viewport baselines.

Use deterministic waits. Before every helper invocation, review the current packet and confirm it contains no `page.waitForTimeout(`, `waitForTimeout(`, `setTimeout(`, `setInterval(`, shell `sleep`, or arbitrary polling/timer settling. Review the current packet before invoking the helper; a focused diff or targeted read may cover a small edit, while a new or substantially rewritten packet merits a complete read. Record the fixed-wait review as packet evidence. No particular tool-call order is required. Do not run a packet with a fixed wait and plan to repair it afterward. Any fixed wait is a hard packet failure, not a harmless settling aid; remove it, record the repair, replace it with a visible-state, URL, DOM, response, geometry, or assertion condition, and rerun the packet through the lifecycle helper before scoring.

Complete an image-by-image visual closure after every capture. Read the complete manifest, process every image path in manifest order, and open images in small readable review batches of no more than four related images. This batch size protects context and visual attention; it does not limit the total evidence corpus. Record one opened result, one concrete finding, and covered inventory IDs for every image in the canonical source evidence record. Keep `progress.md` current as the next action changes and `open-gaps.md` current for observed missing or contradictory proof; review them before scoring, promotion, or resuming work rather than after each batch. The walk is complete only when the opened-image count exactly equals the manifest-image count. Readable inspection sheets may supplement the walk, but they never replace opening and recording every constituent image. Do not open only “key images,” one image per route, representative samples, one viewport, one full-page image per route, or a manifest without image review; any such sampling is a failed visual-inspection gate. Do not score or promote until the complete walk is recorded.

If an image is blank, unsettled, faded, clipped, stale, unreadable, or captures an entrance animation, reach the state through real input and wait for its own visible DOM, geometry, opacity, or transition condition, then recapture it. Do not inject CSS, set opacity/classes, disable animations, or mutate source DOM to manufacture a settled screenshot. If a required locator or section capture fails, fail the packet loudly and diagnose it. Repair and rerun a bad selector or packet; if the approved source itself makes the state unreachable, record the defect and intended design from source declarations instead of changing or repeatedly retrying the source. Assert semantic control/DOM state rather than rendered letter case when CSS text transformation changes capitalization.

### Source Evidence Identity And Inspection

Give every image a stable evidence ID and a unique non-reused path containing source, page/state, theme, viewport, framing or covered-section group, and revision. Record dimensions, capture time, lifecycle run, opened time, concrete visible findings, and covered inventory IDs for each image in one source evidence record.

Never reuse one path for desktop and mobile or overwrite an earlier revision. If a recapture is required, create a new revision path and mark the prior row invalidated. Opening a contact sheet does not prove that unreadable constituent images were inspected.

Inspect source evidence in small readable packets. Use one image at a time for very tall full views and compact related batches of no more than four images for smaller section/state images. Record findings in the source evidence record after each batch and keep `progress.md` current enough to resume from the next unreviewed manifest row. Review the current artifacts before scoring or resuming, not after every update. This protects visual attention and context without capping pages, states, sections, themes, viewports, or screenshots.

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
2. finalize the drafted source/design requirements, target roles, required shell adaptations, and Phase 1 research actions;
3. keep exact target file paths and target-owner mapping deferred until `CURRENT_PHASE.txt` is `phase-1-ui-implementation`;
4. record UI-only boundaries and explicit exclusions.

Do not inspect target routes, layouts, components, styling owners, tokens, themes, assets, dependencies, or commands in Phase 0. After promotion, Phase 1 must inspect those owners before the first implementation packet. Use the real repository logo when available, and record unsupported navigation destinations so Phase 1 can disable them instead of inventing routes.

## Reproduction Contract

Write one contract row for every required source-backed item:

| Contract field | Required content |
| --- | --- |
| Contract ID | stable unique ID |
| Source evidence | opened page/state/section image paths and observations |
| Required target outcome | exact route/state/section/interaction/theme behavior |
| Target role/owner | target responsibility to map to an exact file/module in Phase 1 |
| Responsive adaptation | behavior at represented and omitted sizes |
| Exclusions | behavior/content that must not be invented |
| Status | `Pass` when source evidence, required outcome, target role, adaptation, and exclusions are concrete; exact file ownership is mapped in Phase 1 |

The contract must cover all pages, states, sections, interaction families, themes, assets, navigation, shell/sidebar/drawer behavior, and responsive safety.

For a sidebar contract, name the required shell role, sidebar role, and content-scroll role; map each to exact target files in Phase 1. The target outcome must state that document scroll remains unchanged while content scroll increases; a contract that merely says `sticky 100vh` is incomplete.

## Phase 0 Model Gate

Score the Phase 0 artifact row by row:

| Category | Points |
| --- | ---: |
| Fresh scaffold and target-read-only integrity | 10 |
| Complete HTML/browser inventory and real-input reachability | 10 |
| Desktop/mobile/state/section source evidence | 12 |
| Sidebar/drawer/scroll/theme discovery | 8 |
| Source/design handoff and reproduction contract | 10 |
| **Total** | **50** |

Required score: at least `48/50`.

Every critical item must independently pass:

- old workflow state was removed and fresh artifacts were created;
- no target implementation/config/package/generated/build/test file changed;
- initial desktop/mobile source evidence was captured and opened through managed lifecycle;
- the complete HTML/CSS/JavaScript was read to EOF;
- every source page, meaningful state, visible section, and interaction family is inventoried;
- every discovery packet passed the model-owned review checklist;
- every reachable inventory item has desktop and mobile evidence plus readable section/state evidence where applicable; source-defect-unreachable states have the failed action and intended source declarations recorded;
- every manifest image was opened and inspected individually or in a readable batch with a per-image finding, and the opened count exactly equals the manifest count;
- custom Playwright scripts contain no fixed waits and ran through lifecycle ownership; any fixed wait is a critical failure;
- sidebar/drawer/scroll/theme behavior is proved when applicable;
- observed source scroll behavior and required target scroll behavior are recorded separately, with a named viewport shell and content scroller in the target contract;
- the copied design JSON and source/design handoff were inspected after source discovery; exact target architecture research is explicitly deferred to Phase 1;
- every contract row has source evidence, a required target outcome/role, responsive behavior, and explicit exclusions; exact target file ownership is mapped in Phase 1;
- no required placeholder, unsupported assumption, or ordinary discovery gap remains.

The Agent must calculate the score from the artifact's evidence once planned capture coverage, source/design handoff, and applicable scroll/theme work are reconciled. A new discovery packet after this point needs a specific uncovered inventory item, unreadable image, or contradiction. An unattempted planned item belongs in the inventory/next-action plan, not `open-gaps.md`; that ledger records observed missing, failed, or contradictory proof. Do not use a checker or promotion script. If any critical item fails or the score is below `48/50`, keep `CURRENT_PHASE.txt` on Phase 0, record the earliest failure and next repair, perform the repair, refresh evidence, and rescore.

## Promotion Lock

Before promoting:

1. reopen the Phase 0 artifact;
2. review the complete source manifest and per-image findings; verify the opened count equals the manifest count, reopening only stale or unclear images;
3. verify every evidence row has a unique path, dimensions, lifecycle run, opened time, and concrete findings;
4. verify the inventory and contract have identical coverage;
5. verify score arithmetic and every critical row;
6. reconcile and reopen `open-gaps.md`;
7. update and reopen `progress.md` and confirm it names Phase 0's promotion as the next planned task;
8. record `Decision: Pass` and the promotion lock;
9. set `CURRENT_PHASE.txt` to `phase-1-ui-implementation`;
10. update `progress.md` and read `references/phase-1-ui-implementation.md` before Phase 1 work.

If any check fails, remain in Phase 0 and continue the loop.
