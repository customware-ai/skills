# Phase 1: UI Implementation

This reference is mandatory whenever `CURRENT_PHASE.txt` equals `phase-1-ui-implementation`.

## Phase Authority

<phase_authority>

Phase 1 authors the target-native UI from the accepted Phase 0 reproduction contract. It is not a verification-only phase and not permission to implement everything in one uncontrolled rewrite.

The Agent plans, reviews, and scores Phase 1 directly from code, diffs, readbacks, the reproduction contract, and source evidence. Do not create or use scripts for packet permits, owner selection, forced reads, diff acknowledgement, packet closeout, phase scoring, or promotion.

A packet fails when its code exceeds its declared contract, omits required work, changes an undeclared owner, or lacks readback/diff evidence. Repair the packet in Phase 1 and review it again. Do not advance on intent.

</phase_authority>

## Managed target verification lock

All Phase 1 target verification remains lifecycle-owned. After implementation or a build, do not launch `pnpm run dev`, `npm run dev`, `vite`, or `react-router dev` in the shell, background a server, wait with shell `sleep`, probe with `curl`/`wget`, inspect a port, or clean up processes manually. Build and typecheck output confirms code integrity only; it is not browser evidence.

Write the target packet under `task-workflow/target-playwright/`, read it, and run it only through `playwright-lifecycle.mjs` with explicit `--server`, `--ready-url`, `--runtime-dir`, and `--run` arguments. Use that helper for screenshots, DOM assertions, measurements, scroll tests, interaction checks, and runtime inspection. If it fails, repair and rerun the packet through the helper. Do not replace the lifecycle run with a manual smoke test. Any direct target server, shell wait, readiness probe, or browser check is a hard process failure and invalidates the run.

## Entry Conditions

Before the first implementation edit:

- `CURRENT_PHASE.txt` says `phase-1-ui-implementation`;
- Phase 0 says `Decision: Pass` and scores at least `48/50`;
- the Phase 0 inventory, reproduction contract, source evidence, and target-owner research are current;
- target-owner research is performed after the Phase 0 marker and before the first implementation packet; it is not required to pass the source-only Phase 0 gate;
- the Agent has reread `SKILL.md`, this reference, Phase 0, Phase 1's artifact, `progress.md`, and `open-gaps.md`;
- the first work packet is written in the Phase 1 artifact.

If any condition fails, return to Phase 0 or repair the Phase 1 entry artifact before editing.

## Ordered Implementation Layers

Implement in this order unless the Phase 0 target architecture proves two adjacent layers must be combined:

0. target repository research and exact owner mapping from the Phase 0 handoff;
1. design tokens, typography, and source/required derived themes;
2. shared visual primitives;
3. viewport shell, sidebar, content scroll ownership, and mobile drawer structure;
4. real route registration and page modules;
5. every visible section in source order;
6. local interactions and visible states;
7. responsive/mobile transformations and overflow safety;
8. supported navigation and real target assets.

Do not hide later-layer behavior inside an earlier packet. For example, a token packet may define values and typography but may not quietly add sidebar layout, route shells, component selectors, responsive media behavior, or animations. If the diff contains later-layer work, split or reclassify the packet before marking it complete.

## Model-Owned Work Packet Loop

Use small, auditable packets. Before each packet, record:

- contract IDs and opened source evidence;
- intended target owners;
- exact UI-only outcome;
- exclusions and later-layer work that this packet must not include;
- the one expected verification/readback action after editing.

Then:

1. read every intended owner and its connected shared contract;
2. implement only the declared packet;
3. reopen every changed file;
4. inspect the focused diff and connected callers/consumers;
5. compare the result against the packet's source evidence and exclusions;
6. record actual files, readback/diff findings, and remaining gaps;
7. update and read back the Phase 1 artifact, `progress.md`, and `open-gaps.md`;
8. mark every packet-review row `Pass` or `Fail`;
9. if any row fails, repair the same packet and repeat the review;
10. begin the next packet only when all packet rows pass.

### Packet Review Checklist

| Required review | Pass condition |
| --- | --- |
| Contract coverage | every declared contract item is implemented |
| Owner scope | only intended/connected target owners changed |
| Layer boundary | no later-layer behavior is hidden in this packet |
| Source fidelity | code reflects opened source evidence, not memory or invention |
| Target-native architecture | real routes/components/styles/local state are used |
| UI-only scope | no backend/API/database/auth/business behavior |
| Readback | every changed file was reopened after the edit |
| Focused diff | additions and removals were inspected for accidental scope |
| Artifact synchronization | Phase 1, progress, and gaps record this packet and the same sole next action |
| Gap ledger | new or unresolved issues are recorded with an owner and next fix |

This checklist is a model condition recorded in the Phase 1 artifact. It is never executed as a script.

## Shell, Sidebar, And Scroll Ownership

When a sidebar exists, implement the shell structurally so:

- the outer app shell owns the viewport height;
- the sidebar covers the full viewport height;
- the main content pane is the intended vertical scroll owner;
- ordinary document scrolling does not reveal a blank region below the sidebar;
- sidebar bounds remain stable while content scrolls;
- mobile changes to a full-height drawer or the source-backed mobile pattern.

Record the exact element/component that owns each role: viewport shell, sidebar, main column, and content scroller. Code review passes when the shell is viewport-bounded, document overflow is contained, the main column can shrink, and the named content pane has vertical overflow ownership. `position: sticky` plus `min-height: 100vh` does not establish that ownership because the document can still move the sidebar out of view.

Do not rely on a fixed pixel height, a decorative background strip, or sticky positioning alone. Code structure must make the blank-lower-sidebar failure impossible.

Phase 1 proves structural intent through code review and local inspection. Phases 2 and 3 must prove actual behavior through paired Playwright screenshots, scroll input, and geometry.

## Routes, Sections, And Interactions

- Create real target route modules for every contracted page.
- Preserve every visible section and its source order.
- Reproduce source-backed copy, labels, icons, controls, imagery, hierarchy, and states.
- Implement visible interactions with local UI state and real controls.
- Use real repository assets when available.
- Disable unsupported navigation instead of inventing destinations.
- Do not invent backend behavior to make a control appear functional.

## Responsive And Theme Adaptation

Implement every source-represented breakpoint and conservatively adapt omitted sizes.

At minimum prevent:

- overlap;
- clipping and cutoff;
- horizontal canvas overflow;
- inaccessible controls;
- accidental document scroll;
- wrong content/sidebar scroll ownership;
- blank lower-sidebar regions;
- unreadable theme combinations.

Do not add a theme switch unless the target requires one. Derive an omitted target-required theme from the accepted visual system, not a new design direction.

## Phase 1 Model Gate

After all packets pass their reviews, score the Phase 1 artifact row by row:

| Category | Points |
| --- | ---: |
| Tokens, typography, themes, and primitives | 10 |
| Shell, sidebar, scroll ownership, and navigation | 10 |
| Routes and visible section coverage | 12 |
| Local interactions and visible states | 10 |
| Responsive/mobile implementation and UI-only integrity | 8 |
| **Total** | **50** |

Required score: at least `48/50`.

Every critical item must independently pass:

- every Phase 0 contract row maps to a real target owner and implementation;
- every route and visible section is authored and source-backed;
- every visible interaction family has real local behavior;
- all packets passed the model-owned review checklist;
- no packet contains undeclared or later-layer behavior;
- shell/sidebar/content overflow ownership is structurally correct when applicable;
- sidebar ownership names a viewport-bounded shell and content scroller rather than relying on document scroll or sticky positioning;
- responsive/mobile implementation exists for every contracted surface;
- themes, navigation, and assets follow the reproduction contract;
- no source runtime dependency, wrapper, gallery, iframe, or raw injection exists;
- no backend/API/database/persistence/auth/business logic was introduced;
- every significant edit has current readback and focused-diff evidence;
- no required placeholder or ordinary implementation gap remains.

The Agent must calculate the score from evidence in the artifact. Do not use a checker or promotion script. If any critical item fails or the score is below `48/50`, keep the marker on Phase 1, repair the earliest failure, update code/evidence/artifacts, and rescore.

## Promotion Lock

Before promotion:

1. remap every Phase 0 contract row to final target ownership;
2. reopen the Phase 1 artifact and complete target diff;
3. reopen high-risk shell/sidebar/responsive owners;
4. independently verify score arithmetic and every critical item;
5. reopen Phase 0 and verify no Phase 1 change invalidated its contract or source evidence;
6. reconcile and reopen `open-gaps.md`;
7. update and reopen `progress.md` and confirm promotion is the sole next action;
8. write and read back `Decision: Pass` and the promotion lock;
9. set `CURRENT_PHASE.txt` to `phase-2-paired-responsive-proof`;
10. immediately update `progress.md`, then read the paired-fidelity and lifecycle references before Phase 2 work.

If any check fails, remain in Phase 1 and continue the repair loop.
