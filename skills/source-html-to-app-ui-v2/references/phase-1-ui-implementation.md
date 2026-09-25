# Phase 1: UI Implementation

Read this reference when `CURRENT_PHASE.txt` is `phase-1-ui-implementation`.

## Authority and entry

Phase 1 authors the target application; research or a plan cannot pass it. Start only after Phase 0 is `Pass` at `48/50` or higher, its accepted source evidence is current, and the marker is Phase 1. Inspect the relevant target routes, layout, styles, components, assets, connected tests, and build/check commands before editing. The HTML/design inputs remain authoritative for declared content and behavior; accepted source images show runtime appearance. Do not recreate a source inventory or contract table.

Use code and the focused diff as implementation proof. Before a coherent edit, identify its target owners and source evidence; then implement it. A slice may span tokens, shell, routes, sections, state, and responsive rules when those changes are coupled. Do not fragment a working feature merely to close an artificial layer. After a meaningful slice, reopen changed files and inspect the diff and connected callers/tests. Record only non-obvious adaptations, actual unresolved gaps, and the next action in the compact checkpoint. Do not create per-slice ledger or review rows, and do not reread phase artifacts after each edit.

The target must have real route modules, source-ordered sections, source-backed copy/assets, usable local UI state and controls, responsive/theme adaptation, and no source HTML runtime dependency or invented backend/API/database/persistence/auth/business behavior. Implement intended source interactions that its documented runtime defect made unreachable, then prove them in the target. Disable unsupported navigation rather than inventing destinations. Use the real repository logo when available. Target browser inspection, including exploratory inspection, runs only through the lifecycle helper; build/check is not browser proof.

## Shell and UI safety

When a sidebar exists, name the outer viewport-bounded shell, full-height sidebar, main column, and content scroller in the target code. The document must not be the normal vertical scroll owner; the content pane must scroll while sidebar bounds stay viewport-stable. A sticky sidebar or fixed decorative strip is insufficient. A mobile drawer, when present, needs full-height geometry, overlay interception, body scroll lock, and restoration. Phase 1 checks code structure; Phases 2–3 measure actual behavior and inspect screenshots.

Implement the source-represented breakpoints and adapt omitted sizes conservatively. Avoid overlap, clipping, horizontal canvas overflow, inaccessible controls, accidental document scroll, blank lower-sidebar space, or unreadable theme combinations. Do not add a theme switch unless required. Once the main shell is browser-ready, use a focused lifecycle-owned desktop/mobile comparison of the main view and highest-risk responsive state to catch broad layout or design-system defects before Phase 2's full pair corpus. This is an early repair check, not a second inventory or an extra scorecard.

## Gate

At the end of implementation, inspect the complete target diff and connected owners. Run the task's required target checks/build once after a coherent implementation batch; retain full output under `task-workflow/` and rerun only after related changes invalidate it. Do not run check/build after each visual tweak. Phase 2 independently requires current checks/build but may reuse these results if no code changed. Fix failures before scoring. Score the Phase 1 artifact once from actual code, diff, source evidence, and checks—not from packet paperwork. Browser claims still require later managed evidence.

| Category | Points |
| --- | ---: |
| Tokens, typography, themes, and primitives | 10 |
| Shell, sidebar, scroll ownership, and navigation | 10 |
| Routes and visible section coverage | 12 |
| Local interactions and visible states | 10 |
| Responsive/mobile implementation and UI-only integrity | 8 |
| **Total** | **50** |

Required: at least `48/50`. Every critical item independently passes:

- every source page, state, section, interaction family, theme, and target-specific adaptation has a real target owner and implementation; exact file names can be found in code/diff rather than copied into a contract table;
- target research led to authored routes/components/styles/local state, not merely a plan;
- all visible sections remain in source order and every intended interaction works through real controls;
- target shell, sidebar, content scroll, mobile drawer, responsive layout, theme, navigation, and real assets are implemented where applicable;
- no source runtime embedding, wrapper/gallery shortcut, invented destination, backend/API/database/persistence/auth/business logic, or weakened check configuration was introduced;
- changed files, connected callers/tests, and the complete diff were inspected; required target checks/build pass on current code;
- no unresolved Phase 1 gap or placeholder remains.

If a critical item fails or score is below threshold, keep the marker in Phase 1, repair the owning code, update invalidated evidence, and rescore. Do not create a scoring or promotion script.

## Promotion

Review the final code/diff, check/build output, source-backed coverage, score arithmetic, critical items, and actual open gaps once. Record `Decision: Pass` and the evidence pointers in the Phase 1 artifact, set the marker to `phase-2-paired-responsive-proof`, update the checkpoint's phase/next action, and read the paired-fidelity and lifecycle references. If later work invalidates Phase 1, return here and repass only affected evidence; do not repeat valid research or source capture.
