# Phase 1: UI Implementation

This reference is mandatory whenever `CURRENT_PHASE.txt` equals `phase-1-ui-implementation`.

## Phase Authority

<phase_1_authority>

Phase 1 converts the accepted reproduction contract into real target-repository UI. It does not rediscover the source, perform final visual signoff, or implement backend behavior.

The implementation must be complete enough for paired verification. "Main page done," "representative sections," "inspired by the design," and "close enough" are failures. Every contracted route, state, section, interaction, theme, and responsive behavior needs a real target owner.

Do not weaken source fidelity to save time. Delivering a partial or generic UI can cost the user the approved project and their job. Implement the accepted contract, not the Agent's preferred redesign.

</phase_1_authority>

## Pre-Implementation Gate

Before any implementation write, prove:

- Phase 0 artifact says `Decision: Pass` and scores at least `48/50`;
- `CURRENT_PHASE.txt` is already `phase-1-ui-implementation`;
- this reference has been read after setting the marker;
- the reproduction contract and source evidence paths are current;
- `progress.md` identifies the first ordered work packet;
- no critical Phase 0 gap is open.

If any condition fails, return to Phase 0. Implementation performed before this boundary is invalid.

## Ordered Implementation Contract

<ordered_implementation_contract>

Implement in this order unless target architecture proves a small local ordering dependency. Record that dependency before deviating.

| Order | Layer | Required outcome |
| ---: | --- | --- |
| 1 | Design tokens and typography | source colors, type, spacing, radii, borders, shadows, sizing translated into target-native tokens |
| 2 | Themes | source themes and required conservative target theme mapping |
| 3 | Shared primitives | inspect and adapt existing primitives before creating duplicates |
| 4 | Shell and viewport ownership | header/sidebar/content structure, full-height shell, content-only overflow |
| 5 | Routes | real repository-native route registration and route modules |
| 6 | Page sections | every contracted visible section in source order and hierarchy |
| 7 | Local interactions and states | real controls, local state transitions, visible feedback, disabled states |
| 8 | Responsive/mobile behavior | source-backed behavior plus conservative safety at omitted sizes |
| 9 | Navigation and assets | supported destinations, disabled unsupported links, real repository logo |

Do not begin later layers while an earlier required layer is materially incomplete. The shell must be structurally correct before pages rely on it. Routes must be real routes, not one large in-memory page switch.

</ordered_implementation_contract>

## Work Packet Discipline

<work_packet_discipline>

Use small, auditable implementation packets. Before each packet, add a row to the Phase 1 artifact containing:

- contract IDs and source evidence paths;
- intended target files;
- UI-only scope statement;
- exact acceptance outcome.

After the packet:

1. read back every changed file that matters to the packet;
2. inspect the diff;
3. search for connected route/component/token owners that may need consistent changes;
4. update the artifact with actual files and evidence;
5. update `progress.md` with the sole next action;
6. update `open-gaps.md` for unresolved implementation gaps.

Do not complete multiple significant packets while leaving the execution table blank. Do not describe a failed write as completed. Repair and read back invalid edits before continuing.

</work_packet_discipline>

## UI-Only Implementation Rules

- Use local state for selections, steps, tabs, drawers, forms, filters, toasts, and visible feedback.
- Use realistic static data only when source evidence requires visible content.
- Preserve exact source-backed product copy and content where supplied.
- Reuse target architecture, shared components, tokens, and route conventions.
- Keep reusable styling in target-native shared tokens or component styles.
- Use accessible semantic controls and labels.
- Disable unsupported navigation instead of inventing destinations.
- Use the real repository logo when present.
- Do not add API calls, server handlers, databases, persistence, authentication, or business calculations.
- Do not import or inject the source HTML.
- Do not use `srcDoc`, `object`, `embed`, `iframe`, `webview`, raw HTML injection, a source viewer, or a runtime source dependency.
- Do not wrap the app in a gallery, poster, presentation, design board, showcase, or device frame.

## Shell And Sidebar Structural Contract

When a sidebar exists, implement the structure so correctness does not depend on a lucky content height.

Required desktop intent:

```text
viewport-height shell
├── full-height non-content sidebar
└── content region
    ├── optional fixed/sticky top bar
    └── sole vertical scrolling content pane
```

The document must not become the ordinary vertical scroll owner. The sidebar must cover the viewport height and remain visually continuous while content scrolls. A sidebar whose background ends when its own content ends is a failure even if the first screenshot looks correct.

For mobile, use the source-backed pattern. When it becomes a drawer, implement overlay, full-height geometry, body lock, close paths, and restoration so Phase 2 can prove them.

## Responsive And Theme Implementation

- Implement every source-represented viewport behavior.
- Add conservative breakpoints only where needed to prevent objective failures.
- Do not use viewport-width font scaling as a shortcut.
- Ensure text fits controls and containers without overlap or clipping.
- Preserve source hierarchy and visual direction at tablet and mobile sizes.
- Implement source themes exactly enough for later paired comparison.
- If target architecture already exposes a source-omitted theme, derive it from source tokens without adding an alternate visual language.

## Phase 1 Gate

<phase_1_gate>

### Scorecard

| Category | Points |
| --- | ---: |
| Tokens, typography, themes, and primitives | 10 |
| Shell, sidebar, scroll ownership, and navigation | 10 |
| Routes and visible section coverage | 12 |
| Local interactions and UI states | 10 |
| Responsive/mobile implementation and UI-only integrity | 8 |
| **Total** | **50** |

Required score: at least `48/50`.

### Non-Compensating Critical Items

Every item must pass:

- implementation began only after the Phase 1 boundary;
- every Phase 0 contract row has a real target owner;
- every route is a real route or repository-native route module;
- every visible section is implemented in source-backed order and hierarchy;
- every visible interaction family has a real local UI behavior;
- tokens, themes, primitives, shell, and routes were implemented in the required order;
- sidebar/content scroll ownership is structurally correct when a sidebar exists;
- responsive/mobile behavior is implemented, not deferred entirely to Phase 2;
- unsupported navigation is disabled and real repository branding is used;
- no route, content, behavior, or alternate design direction was invented;
- no backend, persistence, API, database, auth, or business logic was added;
- no source-runtime shortcut or forbidden wrapper exists;
- every significant work packet has readback and diff evidence;
- no required evidence row is `Pending` and no locally repairable implementation gap remains open.

### Promotion Lock

Before promotion:

1. Reopen the Phase 0 contract and map every row to Phase 1 implementation evidence.
2. Reopen `phase-1-ui-implementation.md`.
3. Inspect the final Phase 1 diff and connected owners.
4. Confirm score at least `48/50` and every critical item passes.
5. Confirm no required placeholder or ordinary implementation gap remains.
6. Write the promotion lock and `Decision: Pass`.
7. Read the artifact back.
8. Update `progress.md`.
9. Set `CURRENT_PHASE.txt` to `phase-2-paired-responsive-proof`.
10. Read `references/phase-2-3-playwright-fidelity.md` and `references/playwright-lifecycle.md` before any Phase 2 check or browser work.

If any mapping or critical item fails, remain in Phase 1 and repair it. Do not use Phase 2 screenshots to excuse missing implementation.

</phase_1_gate>
