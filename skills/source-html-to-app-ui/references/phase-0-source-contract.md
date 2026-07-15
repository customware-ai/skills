# Phase 0: Source Contract

This reference is mandatory whenever `CURRENT_PHASE.txt` is missing or equals `phase-0-source-contract`.

## Phase Authority

<phase_authority>

Phase 0 builds the complete evidence-backed contract that controls implementation. It is not a quick screenshot pass and not a planning shortcut.

<hard_stop>

During Phase 0, do not inspect browser caches, executable paths, browser revisions, `browsers.json`, package browser directories, or process/port state before invoking the real lifecycle packet. Do not probe a server/runtime with `which`, `command -v`, `--version`, `--help`, or similar availability commands. Do not inspect the target root at all: `ls`, `find`, `tree`, `rg --files`, `git status`, `test -d`, `test -e`, `test -f`, `stat`, `file`, `wc`, `du`, `head`, `tail`, `sed`, `grep`, or an equivalent directory listing/metadata check that merely reveals target or source state is already target inspection. Do not inspect target `app/`, `public/`, `server/`, packages, config, package files, `node_modules`, build/dist, tests, runtime logs, or target assets until source orientation has been captured and opened, HTML/CSS/JavaScript has been read to EOF, the complete source inventory has been captured and opened, and the Phase 0 artifact has been updated. Do not run a packet containing fixed waits, even once. These are run-invalidating process failures, not optional cleanup items; stop, record the failure, reset the fixture, and restart Phase 0.

The task message may call a brand-logo path the “one and only exception.” It is not an exception to this source lock. It means the real logo must be used when Phase 1 asset research becomes legal. Do not inspect `public/`, `build/`, or any target asset path to find that logo before the source checkpoint. If the checkpoint has not been explicitly passed in the artifact and the marker has not moved to `phase-1-ui-implementation`, target inspection is forbidden; when uncertain, remain source-only.

</hard_stop>

Before the first successful lifecycle orientation, the only files the Agent may read are the exact `SKILL.md`, this Phase 0 reference, and `references/playwright-lifecycle.md`. This is a closed allowlist. Do not read `assets/scripts/playwright-lifecycle.mjs`, any template, copied helper, copied artifact, source HTML/CSS/JavaScript, design JSON, target file, or runtime file. Blind byte-for-byte copying is allowed; opening a copied helper or template to learn its flags or contents is not. Breaking this allowlist invalidates the run: stop, reset the fixture, and restart Phase 0.

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

After these scaffold and copy writes, the write command must end. Setup is write-only: `cp ... && ls ...`, `mkdir ... && cp ... && ls ...`, a separate `ls`, a trailing `echo`/`printf`, or appended `cat`, `test`, `stat`, `git status`, `find`, `rg`, or any other verification is a hard process failure. Do not use a second shell command to verify or announce setup. Do not list `task-workflow/`, reopen the copied helper, reopen a template, inspect a ledger, or run an existence or metadata check. The only allowed pre-orientation artifact sequence is exactly: write the orientation packet, read that packet once for the fixed-wait and exact-URL audit, then invoke the first lifecycle orientation at the exact approved HTML URL with `SOURCE_URL` supplied to the packet. After the packet write, the next tool action must be its complete file-read; only that read may precede the helper. Setup write success is not a separate checkpoint; the lifecycle run is the first permitted source readback and availability test.

## Model-Owned Discovery Packet Loop

Treat each source-discovery group as a small auditable packet: initial orientation, complete source reading, page/state inventory, full-view capture, section/state capture, shell/sidebar/drawer/theme discovery, and source/design handoff.

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
| Real-input reachability | pages and states were reached through Playwright user-facing input APIs; no evaluated DOM mutation or dispatched event created the evidenced state |
| Evidence completeness | required desktop/mobile/full-view/section/state images exist |
| Visual inspection | every gate-critical image was opened at a useful scale |
| Source reconciliation | browser findings and complete HTML declarations agree |
| Fixed-wait audit | custom Playwright scripts use deterministic waits |
| Scope boundary | target implementation remained read-only and later work was not pulled forward |
| Artifact synchronization | Phase 0, progress, and gaps record this packet and the same sole next action |
| Gap ledger | missing or contradictory evidence has an owner and next repair |

This checklist is an Agent review recorded in the Phase 0 artifact, never a script result.

## Source-First Discovery Order

Follow this order exactly. Until step 6 begins, target implementation, build output, runtime logs, assets, dependencies, and configuration are source-locked and must not be opened, listed, searched, or inspected. Do not treat a target-research need, a stale build, a missing logo, or an asset requirement from the task message as permission to break this order. The first target read occurs only in step 6, after the managed source orientation and complete source inventory evidence have been captured and opened, the HTML/CSS/JavaScript has been read to EOF, the Phase 0 artifact has been written, reopened, scored at least `48/50`, and all critical rows have passed. The marker must then be moved to `phase-1-ui-implementation` before any target command is run. If any one of those conditions is absent, step 6 has not begun.

Before the first managed orientation, copy the approved source file into `task-workflow/` without opening it. Do not read or search the source HTML, inline CSS, or JavaScript to design the orientation packet. The only source content that may be read before orientation is the task/design metadata needed to locate and serve the copied file. First run the orientation packet through the lifecycle helper at desktop and mobile. After a successful helper result, the next two tool calls must be exactly the desktop orientation-image read followed immediately by the mobile orientation-image read; no source/design read, packet write, search, shell command, or other tool call may occur between them. Record a concrete finding for each image. Only after both image-read events may the complete source read begin. If either image is not opened before source/design inspection, the run is invalid and Phase 0 must be reset. If the helper fails, the source remains locked and Phase 0 is paused: the only legal next action is to inspect the helper-owned failure, repair the bounded invocation, read the repaired packet, and rerun the helper. Do not read source HTML/CSS/JavaScript or design JSON, write the handoff, or treat logs/partial screenshots as orientation evidence until a helper-owned rerun succeeds and every successful orientation image has been opened.

Until that first helper run begins, use no target-repository read or environment probe at all—not even a root listing, `task-workflow` existence check, `git status`, `which`, `command -v`, `python --version`, `node --version`, or `--help`. Do not enumerate the skill root or any skill `references/` or `assets/` directory; do not inspect source-file metadata or content with `wc`, `stat`, `file`, `du`, `head`, `tail`, `sed`, `grep`, `rg`, or equivalent. Read only this reference, the exact lifecycle reference path, and the exact task/design input paths needed for setup. Use only the exact asset paths named in the skill's Asset Map when copying; never list, glob, search, or read the asset directories to discover them. Do not read the copied helper or templates after setup; reading `task-workflow/scripts/playwright-lifecycle.mjs` to learn its flags or parameters is explicitly forbidden because the helper command contract in the reference is sufficient. Write the task-owned orientation packet, read that packet for audit, and invoke the helper with the known server command directly. The helper is the availability test.

### 1. First Managed Browser Inspection

Before bulk-reading the source HTML, create a small custom Playwright script under `task-workflow/source-playwright/` that:

- opens the supplied HTML through its real source launch method;
- receives the exact served HTML URL through `SOURCE_URL` (or an equivalent explicit packet input), navigates to that URL rather than the server directory root, and asserts response success, exact final URL identity, and non-directory content so a directory listing, blank page, or wrong route cannot count as orientation evidence. Assert task-supplied identity when available; otherwise record the title and reconcile it after the complete HTML read;
- waits deterministically for the visible UI;
- captures exactly one initial desktop image;
- captures exactly one initial mobile image;
- records page title, visible navigation, viewport, document dimensions, and obvious interactive controls;
- leaves all full-page, section, state, theme, and per-page capture work to the complete inventory packet;

Run it through `task-workflow/scripts/playwright-lifecycle.mjs`. Open both orientation images immediately and record one concrete finding for each before reading the source. These images are startup orientation only; they are never the final inventory and never establish a screenshot limit. If the packet produces any additional image, open that image before continuing.

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

Use deterministic waits. Before every helper invocation, read the complete packet being run from line 1 through EOF and confirm it contains no `page.waitForTimeout(`, `waitForTimeout(`, `setTimeout(`, `setInterval(`, shell `sleep`, or arbitrary polling/timer settling. Repeat the complete readback after every packet write or edit before relying on the packet, making another edit, or invoking the helper; a targeted slice can confirm a local change but does not replace the complete audit. Record the readback and fixed-wait review as packet evidence. Do not run a packet with a fixed wait and plan to repair it afterward. Any fixed wait is a hard packet failure, not a harmless settling aid; remove it, record the repair, replace it with a visible-state, URL, DOM, response, geometry, or assertion condition, and rerun the packet through the lifecycle helper before scoring.

Complete an image-by-image visual closure after every capture. Read the complete manifest, process every image path in manifest order, open each image individually or in a small readable batch, and record one opened result plus a concrete finding for each exact image identity. The walk is complete only when the opened-image count exactly equals the manifest-image count. Readable inspection sheets may supplement the walk, but they never replace opening and recording every constituent image. Do not open only “key images,” one image per route, representative samples, one viewport, one full-page image per route, or a manifest without image review; any such sampling is a failed visual-inspection gate. Do not score or promote until the complete walk is recorded.

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

### 6. Source Design And Target Research Handoff

After complete source evidence has been captured and opened, and the Phase 0 artifact reflects that evidence:

1. read `task-workflow/spec.json` completely;
2. record source/design requirements, target roles, required shell adaptations, and Phase 1 research actions;
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
- first source browser evidence was captured and opened through managed lifecycle before bulk HTML reading;
- the complete HTML/CSS/JavaScript was read to EOF;
- every source page, meaningful state, visible section, and interaction family is inventoried;
- every discovery packet passed the model-owned review checklist;
- every inventory item has desktop and mobile evidence plus readable section/state evidence where applicable;
- every manifest image was opened and inspected individually or in a readable batch with a per-image finding, and the opened count exactly equals the manifest count;
- custom Playwright scripts contain no fixed waits and ran through lifecycle ownership; any fixed wait is a critical failure;
- sidebar/drawer/scroll/theme behavior is proved when applicable;
- observed source scroll behavior and required target scroll behavior are recorded separately, with a named viewport shell and content scroller in the target contract;
- the copied design JSON and source/design handoff were inspected after source discovery; exact target architecture research is explicitly deferred to Phase 1;
- every contract row has source evidence, a required target outcome/role, responsive behavior, and explicit exclusions; exact target file ownership is mapped in Phase 1;
- no required placeholder, unsupported assumption, or ordinary discovery gap remains.

The Agent must calculate the score from the artifact's evidence. Do not use a checker or promotion script. If any critical item fails or the score is below `48/50`, keep `CURRENT_PHASE.txt` on Phase 0, record the earliest failure and next repair, perform the repair, refresh evidence, and rescore.

## Promotion Lock

Before promoting:

1. reopen the Phase 0 artifact;
2. read the complete source manifest and reopen every manifest image across all pages and both desktop/mobile; verify the opened count equals the manifest count rather than reviewing a subset;
3. verify every evidence row has a unique path, dimensions, lifecycle run, opened time, and concrete findings;
4. verify the inventory and contract have identical coverage;
5. verify score arithmetic and every critical row;
6. reconcile and reopen `open-gaps.md`;
7. update and reopen `progress.md` and confirm it names Phase 0's promotion as the sole next action;
8. write and read back `Decision: Pass` and the promotion lock;
9. set `CURRENT_PHASE.txt` to `phase-1-ui-implementation`;
10. immediately update `progress.md`, then read `references/phase-1-ui-implementation.md` before implementation.

If any check fails, remain in Phase 0 and continue the loop.
