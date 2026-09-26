# Phase 1: UI Implementation

Read this reference when `CURRENT_PHASE.txt` is `phase-1-ui-implementation`.

## 1. Entry And Implementation

### Entry

<phase_1_entry>

- Phase 1 authors the target application; research or a plan cannot pass it.
- Start only after Phase 0 is `Pass` at `48/50` or higher, its accepted source evidence is current, and the marker is Phase 1.
- Inspect the relevant target routes, layout, styles, components, assets, connected tests, and build/check commands before editing.
- The HTML/design inputs remain authoritative for declared content and behavior; accepted source images show runtime appearance.
- Do not recreate a source inventory or contract table.

</phase_1_entry>

### Design System First

<implementation_sequence>

Use code and focused diffs as implementation proof. Identify target owners/source evidence once, then follow dependency stages:

1. Establish shared design-system tokens in the existing Tailwind configuration/theme.
2. Adapt reusable UI components in `app/components/ui/` when the template uses that path.
3. Build the app shell from those foundations.
4. Implement the full routes/pages.

- Within each stage, do independent work concurrently wherever possible, with separate file ownership for shared code.
- Complete shared contracts before dependent work, but do not serialize independent components or pages.
- A page slice may span sections, state, and responsive rules when coupled.
- Inspect changed files, the diff, and connected callers/tests after a coherent implementation batch rather than after every small edit.
- Record non-obvious adaptations in the owning phase artifact, unresolved defects in gaps, and only the phase/next-action pointer in the checkpoint. Do not create per-slice ledgers or reread artifacts after each edit.

</implementation_sequence>

### Scope And Verification Boundary

<implementation_scope>

- The target must have real route modules, source-ordered sections, source-backed copy/assets, usable local UI state and controls, responsive/theme adaptation, and no source HTML runtime dependency or invented backend/API/database/persistence/auth/business behavior.
- Implement intended source interactions that its documented runtime defect made unreachable, then prove them in the target phases.
- Disable unsupported navigation rather than inventing destinations.
- Use the real repository logo when available.
- Phase 1 is a time-bounded implementation pass: do not preemptively create browser packets or repeatedly check individual controls here.
- Target browser inspection, including exploratory inspection, runs only through the lifecycle helper; build/check is not browser proof.

</implementation_scope>

## 2. Shell And UI Safety

<shell_and_ui_safety>

- When a sidebar exists, name the outer viewport-bounded shell, full-height sidebar, main column, and content scroller in the target code.
- The document must not be the normal vertical scroll owner; the content pane must scroll while sidebar bounds stay viewport-stable.
- A sticky sidebar or fixed decorative strip is insufficient.
- A mobile drawer, when present, needs full-height geometry, overlay interception, body scroll lock, and restoration.
- Phase 1 checks code structure; Phases 2–3 measure actual behavior and inspect screenshots.

- Implement the source-represented breakpoints and adapt omitted sizes conservatively.
- Avoid overlap, clipping, horizontal canvas overflow, inaccessible controls, accidental document scroll, blank lower-sidebar space, or unreadable theme combinations.
- Do not add a theme switch unless required.
- Phase 1 completes implementation from source declarations, accepted source images, code review, and checks/build.
- Defer source-target screenshot comparison, browser measurements, and visual correction to Phase 2.

</shell_and_ui_safety>

## 3. Gate

<gate>

- At the end of implementation, inspect the complete target diff and connected owners.
- Run the task's required target checks/build once after a coherent implementation batch; retain full output under `task-workflow/` and rerun only after related changes invalidate it.
- Do not run check/build after each visual tweak.
- Phase 2 independently requires current checks/build but may reuse these results if no code changed.
- Fix failures before scoring.
- Score the Phase 1 artifact once from actual code, diff, source evidence, and checks—not from packet paperwork.
- Browser claims still require later managed evidence.

| Category | Points |
| --- | ---: |
| Tokens, typography, themes, and primitives | 10 |
| Shell, sidebar, scroll ownership, and navigation | 10 |
| Routes and visible section coverage | 12 |
| Local interactions and visible states | 10 |
| Responsive/mobile implementation and UI-only integrity | 8 |
| **Total** | **50** |

Required: at least `48/50`. Every critical item independently passes:

- [ ] every source page, state, section, interaction family, theme, and target-specific adaptation has a real target owner and implementation; exact file names can be found in code/diff rather than copied into a contract table;
- [ ] target research led to authored routes/components/styles/local state, not merely a plan;
- [ ] all visible sections are implemented in source order and every intended interaction has a real target control and local behavior; browser proof of working interactions belongs to Phases 2–3;
- [ ] target shell, sidebar, content scroll, mobile drawer, responsive layout, theme, navigation, and real assets are implemented where applicable;
- [ ] no source runtime embedding, wrapper/gallery shortcut, invented destination, backend/API/database/persistence/auth/business logic, or weakened check configuration was introduced;
- [ ] changed files, connected callers/tests, and the complete diff were inspected; required target checks/build pass on current code;
- [ ] no unresolved Phase 1 gap or placeholder remains.

If a critical item fails or score is below threshold, keep the marker in Phase 1, repair the owning code, update invalidated evidence, and rescore. Do not create a scoring or promotion script.

</gate>

## 4. Decision And Transition

<decision_and_transition>

- Review the final code/diff, check/build output, source-backed coverage, score arithmetic, critical items, and actual open gaps once.
- Record `Decision: Pass` and the evidence pointers in the Phase 1 artifact, set the marker to `phase-2-paired-responsive-proof`, update the checkpoint's phase/next action, and load the paired-fidelity reference plus any lifecycle instructions not already in the intact context.
- Later visual corrections remain in Phase 2 or 3; refresh affected Phase 1 code/check evidence before promoting further, without repeating valid research or source capture.

</decision_and_transition>
