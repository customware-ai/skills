# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_authority>

Phase 0 builds the complete evidence-backed contract that controls implementation. It is not a quick screenshot pass and not a planning shortcut.

The Agent evaluates this phase itself against the rubric below. Do not create or use a script to validate, score, close, or promote Phase 0. Playwright scripts may discover and capture the source, but they must run through `playwright-lifecycle.mjs` and cannot decide whether the phase passes.

Phase 0 remains `Fail` until every source page, meaningful state, visible section, interaction family, represented theme, and required viewport has been discovered, captured, opened, and recorded.

</phase_authority>

## Entry Conditions

Before Phase 0 work:

- `CURRENT_PHASE.txt` is missing or says `phase-0-source-contract`;
- the Agent has reread `SKILL.md`, this reference, and the lifecycle reference;
- the exact task inputs, source HTML path, design JSON path, target root, and completion command source are known;
- no target implementation/config/package/generated/build/test file has changed for this run;
- the first discovery packet is recorded immediately after fresh artifact setup.

If stale workflow state or an early target change exists, reset to a clean Phase 0 boundary before discovery.

## Fresh Artifact Setup

The first target-repository write must:

1. remove the old `task-workflow/` directory;
2. recreate the runtime structure listed in `SKILL.md`;
3. copy all five phase templates, `progress.md`, and `open-gaps.md` fresh;
4. copy `playwright-lifecycle.mjs` byte-for-byte;
5. copy the supplied design JSON byte-for-byte to `task-workflow/spec.json`;
6. set `CURRENT_PHASE.txt` to `phase-0-source-contract`.

Do not copy prior screenshots, scores, scripts, manifests, or decisions. Do not edit target source, config, package, asset, generated, build, or test files during Phase 0. Only `task-workflow/` may change.

Record the reset and copied paths in the Phase 0 artifact and `progress.md`.

## Model-Owned Discovery Packet Loop

Treat each source-discovery group as a small auditable packet: initial orientation, complete source reading, page/state inventory, full-view capture, section/state capture, shell/sidebar/drawer/theme discovery, and design/target research.

Before each packet, record:

- the exact source scope and expected discoveries;
- the custom Playwright script and lifecycle command when browser work is required;
- the evidence paths the packet must produce;
- explicit exclusions and work owned by later packets;
- the one review action that determines whether the packet passes.

Then:

1. perform only the declared discovery packet;
2. reopen every created/updated artifact and every captured image;
3. reconcile findings against the complete HTML and existing inventory;
4. record actual evidence, missing coverage, contradictions, and gaps;
5. update and read back the Phase 0 artifact, `progress.md`, and `open-gaps.md` before another packet;
6. mark every packet-review row `Pass` or `Fail`;
7. if any row fails, repair the same packet and repeat the review;
8. begin the next packet only when every review row passes.

### Discovery Packet Review Checklist

| Required review | Pass condition |
| --- | --- |
| Declared coverage | every declared page/state/section/theme/viewport item was inspected |
| Lifecycle ownership | every browser action ran through the unchanged lifecycle helper |
| Real-input reachability | pages and states were reached through actual controls when available |
| Evidence completeness | required desktop/mobile/full-view/section/state images exist |
| Visual inspection | every gate-critical image was opened at a useful scale |
| Source reconciliation | browser findings and complete HTML declarations agree |
| Fixed-wait audit | custom Playwright scripts use deterministic waits |
| Scope boundary | target implementation remained read-only and later work was not pulled forward |
| Artifact synchronization | Phase 0, progress, and gaps record this packet and the same sole next action |
| Gap ledger | missing or contradictory evidence has an owner and next repair |

This checklist is an Agent review recorded in the Phase 0 artifact, never a script result.

## Source-First Discovery Order

Follow this order. Do not inspect target implementation before source discovery and design inspection are complete.

### 1. First Managed Browser Inspection

Before bulk-reading the source HTML, create a small custom Playwright script under `task-workflow/source-playwright/` that:

- opens the supplied HTML through its real source launch method;
- waits deterministically for the visible UI;
- captures the initial desktop view;
- captures the initial mobile view;
- captures readable initial section evidence when one full view is not enough;
- records page title, visible navigation, viewport, document dimensions, and obvious interactive controls.

Run it through `task-workflow/scripts/playwright-lifecycle.mjs`. Open every initial image and record visible findings. These images are startup orientation only; they are never the final inventory and never establish a screenshot limit.

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

Run all browser work through the lifecycle helper. Record an inventory under `task-workflow/source/` containing:

| Required field | Meaning |
| --- | --- |
| Stable ID | unique page/state identity |
| Page or state name | visible identity |
| Exact reach steps | real controls and inputs used |
| Interaction family | navigation, tab, drawer, modal, form, filter, selection, etc. |
| Visible sections | complete ordered section list |
| Themes | represented or required variants |
| Desktop/mobile behavior | observed transformation and scroll ownership |
| Evidence paths | planned and captured images |

Reconcile browser findings against the complete HTML reading. Every runtime surface/state and every source-declared surface/state must appear exactly once or have an explicit evidence-backed exclusion.

There is no fixed inventory size and no fixed screenshot count.

### 4. Complete Source Evidence Capture

For every inventoried page and meaningful state, capture through managed Playwright:

- desktop full-view or full-page evidence;
- mobile full-view or full-page evidence;
- readable section images for every visible section;
- state images where a real interaction changes appearance;
- relevant theme images;
- geometry and pre/post-scroll evidence when layout ownership matters.

Use deterministic waits. Audit all custom scripts for fixed waits before relying on them.

Open every gate-critical image after capture. If the evidence set is large, use readable inspection sheets in addition to individual images, but every image must be visibly inspected at a useful scale and mapped to its inventory row. A manifest entry or filename alone is not inspection.

If an image is blank, unsettled, faded, clipped, stale, unreadable, or captures an entrance animation, fix the script/state and recapture it.

### Source Evidence Identity And Inspection

Give every image a stable evidence ID and a unique non-reused path containing source, page/state, theme, viewport, section/full-view identity, and revision. Record dimensions, capture time, lifecycle run, opened time, and concrete visible findings for each row.

Never reuse one path for desktop and mobile or overwrite an earlier revision. If a recapture is required, create a new revision path and mark the prior row invalidated. Opening a contact sheet does not prove that unreadable constituent images were inspected.

Inspect source evidence in small readable packets. Use one image at a time for very tall full views and compact related batches for smaller section/state images. Record findings in the Phase 0 artifact after each meaningful packet and keep `progress.md` current enough to resume. This protects visual attention and context without capping pages, states, sections, themes, viewports, or screenshots.

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

### 6. Design And Target Research

After complete source evidence has been captured and opened:

1. read `task-workflow/spec.json` completely;
2. inspect target routes, layouts, existing components, styling owners, tokens, themes, assets, and relevant commands read-only;
3. identify real target owners for every source contract item;
4. record UI-only boundaries and explicit exclusions.

Use the real repository logo when available. Record unsupported navigation destinations so Phase 1 can disable them instead of inventing routes.

## Reproduction Contract

Write one contract row for every required source-backed item:

| Contract field | Required content |
| --- | --- |
| Contract ID | stable unique ID |
| Source evidence | opened page/state/section image paths and observations |
| Required target outcome | exact route/state/section/interaction/theme behavior |
| Target owner | existing or planned target file/module |
| Responsive adaptation | behavior at represented and omitted sizes |
| Exclusions | behavior/content that must not be invented |
| Status | `Pass` only when evidence and owner are concrete |

The contract must cover all pages, states, sections, interaction families, themes, assets, navigation, shell/sidebar/drawer behavior, and responsive safety.

For a sidebar contract, name the planned shell owner, sidebar owner, and content-scroll owner. The target outcome must state that document scroll remains unchanged while content scroll increases; a contract that merely says `sticky 100vh` is incomplete.

## Phase 0 Model Gate

Score the Phase 0 artifact row by row:

| Category | Points |
| --- | ---: |
| Fresh scaffold and target-read-only integrity | 10 |
| Complete HTML/browser inventory and real-input reachability | 10 |
| Desktop/mobile/state/section source evidence | 12 |
| Sidebar/drawer/scroll/theme discovery | 8 |
| Design/target research and reproduction contract | 10 |
| **Total** | **50** |

Required score: at least `48/50`.

Every critical item must independently pass:

- old workflow state was removed and fresh artifacts were created;
- no target implementation/config/package/generated/build/test file changed;
- first source browser evidence was captured and opened through managed lifecycle before bulk HTML reading;
- the complete HTML/CSS/JavaScript was read to EOF;
- every source page, meaningful state, visible section, and interaction family is inventoried;
- every discovery packet passed the model-owned review checklist;
- every inventory item has desktop and mobile evidence plus readable section/state evidence where applicable;
- every cited image was opened and inspected;
- custom Playwright scripts contain no fixed waits and ran through lifecycle ownership;
- sidebar/drawer/scroll/theme behavior is proved when applicable;
- observed source scroll behavior and required target scroll behavior are recorded separately, with a named viewport shell and content scroller in the target contract;
- design JSON and target architecture were inspected after source discovery;
- every contract row has source evidence, a target owner, responsive behavior, and explicit exclusions;
- no required placeholder, unsupported assumption, or ordinary discovery gap remains.

The Agent must calculate the score from the artifact's evidence. Do not use a checker or promotion script. If any critical item fails or the score is below `48/50`, keep `CURRENT_PHASE.txt` on Phase 0, record the earliest failure and next repair, perform the repair, refresh evidence, and rescore.

## Promotion Lock

Before promoting:

1. reopen the Phase 0 artifact;
2. reopen gate-critical source images across all pages and both desktop/mobile;
3. verify every evidence row has a unique path, dimensions, lifecycle run, opened time, and concrete findings;
4. verify the inventory and contract have identical coverage;
5. verify score arithmetic and every critical row;
6. reconcile and reopen `open-gaps.md`;
7. update and reopen `progress.md` and confirm it names Phase 0's promotion as the sole next action;
8. write and read back `Decision: Pass` and the promotion lock;
9. set `CURRENT_PHASE.txt` to `phase-1-ui-implementation`;
10. immediately update `progress.md`, then read `references/phase-1-ui-implementation.md` before implementation.

If any check fails, remain in Phase 0 and continue the loop.
