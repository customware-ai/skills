# Target Implementation

Use this reference for Phase 2, Phase 3, Phase 4, and Phase 5.

These phases are internal build gates, not user confirmation points. When a gate passes, continue automatically. When a gate fails, fix the work and rerun the gate automatically.

## Target Repo First

Read the target repo `AGENTS.md` before editing. Follow its stack, routing, testing, and style rules.

This skill adds source-fidelity gates on top of the repo rules. It does not replace them.

When this reference sends the Agent back to source or target browser work, use `references/playwright-interactive.md`. In this skill, that browser work is standalone interactive Playwright scripts, not the repo's normal Playwright E2E test flow.

## Implementation Authority

Implementation authority is:

1. accepted source screenshots and section crops
2. `design/source-inventory.md`
3. `design/spec.json`

The provided source HTML file is not implementation material. It is discovery input only.

The target UI must render from authored repo code, not from the provided source HTML file at runtime.

## Phase 2: Planning Discipline

Before coding:

- map each source route/state row to target files or target extension points
- map each visible section to the target component or route region that will own it
- map each interaction family to a real target interaction model
- map the design-system foundation in order: `app/app.css` first, `tailwind.config.ts` second, shared `app/components/ui/*` primitives third
- fill the ordered implementation checklist with the exact target files or extension points that will satisfy each step
- list the highest-risk visual drift areas
- cite the exact source screenshots the build will follow

If any route, state, or section still lacks evidence strong enough to reproduce confidently, return to discovery.

## Implementation Order

Build in this order:

1. `app/app.css` CSS-variable and global-token foundation
2. `tailwind.config.ts` theme mapping from those CSS variables
3. component demo or reference-surface inspection
4. shared component treatment in `app/components/ui/*`
5. shell and viewport ownership
6. primary routes
7. route-specific sections
8. interaction states
9. mobile behavior
10. polish and visual parity

Record this order in the implementation artifacts as a blocking checklist, not loose notes.

- Each row must be marked `Not Started`, `Done`, `Failed`, or `Blocked`.
- Each completed row must cite concrete file evidence.
- If a later row starts while an earlier required row is not `Done`, the implementation phase fails and must be reworked.

## Ordered Checklist Discipline

Treat the implementation checklist as enforcement, not documentation after the fact.

- Phase 2 plans the checklist.
- Phase 3 clears the design-system and shell rows.
- Phase 4 clears the route/state rows.
- Phase 5 audits the full checklist before visual verification begins.

The checklist should make it obvious whether the build happened in the right order:

1. `app/app.css`
2. `tailwind.config.ts`
3. demo/reference surface inspection
4. shared `app/components/ui/*` primitives
5. shell/sidebar ownership
6. `app/routes.ts` or equivalent route registration
7. real route files
8. route sections and states
9. mobile states and behavior
10. final pre-visual integrity pass

## Theme Translation

Use `design/spec.json` as the styling-system contract. Treat it as the primary structured source for the design system. Use accepted source screenshots and source HTML inspection only to fill real gaps or clarify application.

Patch the target repo's real theme entry points, such as:

- global CSS variables
- Tailwind or equivalent theme config
- font imports or font-family tokens
- radius tokens
- border and shadow tokens
- sidebar, nav, header, and surface tokens
- status tokens
- chart tokens when visible

The expected order is:

1. define or update the shared CSS variables in `app/app.css`
2. map Tailwind theme entries in `tailwind.config.ts` to those variables with `var(--...)`
3. consume those tokens through shared primitives and page code

If tokens alone do not reproduce the source style, patch shared components too.

## Tailwind And Custom CSS

Tailwind is preferred, but not mandatory.

If Tailwind utilities alone cannot reproduce the source UI cleanly, custom CSS is allowed and expected.

Rules:

- reusable design-system concerns must flow through the shared CSS variables in `app/app.css`
- do not hardcode repeated color, radius, border, or shadow values across many files when those belong in the token layer
- `app/app.css` may contain global tokens, app shell styling, structural layout classes, and page-level custom CSS needed for fidelity
- do not use `app/app.css` to define fake reusable component classes such as `.btn`, `.btn-primary`, `.input`, `.badge`, or equivalent design-system stand-ins

## Shared Component Translation

Patch shared UI wrappers or primitives when the source app has specific treatment for:

- sidebar and navigation shell
- buttons
- inputs
- selects
- textareas
- switches and checkboxes
- tabs
- badges and chips
- tables and rows
- cards or panels
- dialogs and drawers
- menus and popovers
- tooltips
- navigation items

Inspect the repo's existing component demo or reference surface first so the available primitives and their intended usage are clear before patching or composing them.

Reusable component styling belongs in the matching primitive. Example:

- sidebar shell and nav treatment belong in the shared sidebar layer when the repo provides one
- button styling and variants belong in `app/components/ui/Button.tsx`
- input styling belongs in the input primitive
- reusable chips, badges, tabs, or menu treatments belong in their primitive layer

Do not accept stock library styling if the source app uses a different design language.
Do not re-create a component design system in global CSS when the repo already provides a primitive layer for it.

This primitive layer work must be completed before route modules and page sections are implemented.

## Viewport Ownership

The target must feel like the product app itself.

Blocking failures:

- app placed inside a centered showcase shell
- extra poster padding around the app
- board frame or device frame recreated as product UI
- route content trapped inside a demo or catalog wrapper

If the source app has a shell, implement that shell as the actual product boundary.

If the source app has a sidebar shell and the repo provides a shared sidebar component or shell layer, update and use that shared sidebar rather than inventing a separate page-local sidebar system.

If the accepted source screenshots are long because Playwright captured a scrolling page, determine whether the overflow belongs only to the page content beside a fixed sidebar. Do not make the whole page scroll unless the accepted source evidence explicitly proves that full-page scrolling is correct.

## Route Architecture

Primary source pages or views should be real router routes or repo-native route modules.

Blocking failures:

- a single large component switches between major pages in memory
- primary navigation only changes local component state
- back/forward or reload behavior cannot preserve the page model the source implies
- shell navigation links to invented destinations that do not exist in the accepted source corpus

If the source is visibly state-driven rather than URL-driven, preserve that visible state model inside the correct route boundary. Do not use that as an excuse to collapse obvious pages into one state machine.

## Route, State, And Section Reproduction

Build from `design/source-inventory.md`.

- every route/state row needs target coverage
- every page section row needs target coverage
- labels, section order, major proportions, actions, and support modules must match
- if the source is state-driven rather than URL-driven, preserve the visible state model
- use realistic local state when no backend is needed

Visible interactions must be real:

- tabs switch panels
- filters and search change visible results or state labels
- rows or cards can select and show detail states
- dialogs and drawers open and close
- menus are actual controls
- mobile navigation opens and closes
- forms show visible focus, disabled, validation, or success states when those appear in the source

Static imitation of interactive controls is a failure.

If a shell nav item is visible but no accepted source page/state exists for it, disable that item or mark it unavailable. Do not invent a fake page just to keep the nav looking full.

## Phase 3 Score

Phase 3 uses `20` points:

- `5` design-system foundation points
- `5` shared-component treatment points
- `5` shell ownership and geometry points
- `5` screenshot and review-discipline points

Critical failures:

- `app/app.css` token layer is not the first design-system foundation step
- `tailwind.config.ts` does not consume the shared CSS variables for theme tokens
- reusable component styles are being introduced as fake global component classes
- source sidebar shell exists but the shared sidebar component or shell layer is not updated and used when available
- route or page implementation started before the design-system foundation and primitive adaptation passed
- Phase 3 checklist rows are missing, out of order, or lack file evidence
- target still reads like a stock starter app
- shell does not own the viewport
- source shell or navigation is missing
- no early screenshot evidence exists

Pass gate:

- score is at least `19/20`
- every critical item passes
- `mocks/verification/01-theme-shell-desktop.png` exists

## Phase 4 Score

Phase 4 uses `30` points:

- `8` route architecture and coverage points
- `8` page-section coverage points
- `6` interaction-reality points
- `4` mobile route/state coverage points
- `4` artifact-discipline points

Critical failures:

- primary route missing
- primary route implemented as an in-memory page-state switch instead of a real route boundary
- source interaction family missing
- visible section missing
- mobile route/state coverage missing
- target route is placeholder, generic, or fake
- `app/routes.ts` or the repo's equivalent route-registration file was not updated when real multi-route structure is required
- route files were not created even though the accepted source corpus contains multiple primary pages
- shell nav item routes to an invented destination instead of being disabled when no accepted source page exists
- full-page vertical overflow is used where the accepted source shell shows a fixed sidebar plus scrolling content region
- reusable controls bypass the shared primitive layer and rely on fake global component classes
- Phase 4 checklist rows are missing, out of order, or lack route-file evidence
- route/state review rows are missing

Pass gate:

- score is at least `28/30`
- every critical item passes
- every source-listed page section has a target review row

## Phase 5: Implementation Integrity Gate

This phase exists after the authored UI pass and before any screenshot-based target verification begins.

Its purpose is to stop structurally weak implementations from reaching visual verification.

Review the authored implementation for:

- design-system foundation order is correct:
  - `app/app.css` shared CSS variables first
  - `tailwind.config.ts` theme mapping second
  - shared `app/components/ui/*` primitive treatment before route/page styling
- reusable control styling belongs in the primitive layer, not fake global classes
- primary pages or views are real route modules or repo-native route boundaries
- major navigation is not a single in-memory page-state switch
- if the source shell has a sidebar, the shared sidebar component or equivalent shell layer is updated and used when available
- if the source shell has nav items without accepted destinations, those items are disabled rather than routed to invented pages
- vertical overflow belongs to the correct shell region; do not let a long source screenshot trick the implementation into making the entire page scroll when only the content pane should scroll
- visible interactions are real and affect rendered state
- distinct source states remain distinct in the target
- targeted tests and repo checks reflect the real implementation instead of weakened shortcut coverage
- implementation artifacts are filled honestly and no longer template-default
- the ordered implementation checklist is fully complete, in order, and backed by file evidence

Phase 5 must fail if the build sequence is wrong even when the UI looks close.

## Phase 5 Score

Phase 5 uses `30` points:

- `6` design-system and primitive-discipline points
- `6` route architecture points
- `6` interaction-truth points
- `4` state-distinction points
- `4` build, runtime, and test-integrity points
- `4` artifact-discipline points

Critical failures:

- reusable design-system foundation is not rooted in `app/app.css` and consumed by `tailwind.config.ts`
- reusable component styling is implemented through fake global classes such as `.btn`, `.input`, `.badge`, or equivalent
- shared primitives are bypassed for reusable controls that should live in the primitive layer
- a primary page or view is implemented as an in-memory page-state machine instead of a real route boundary
- source sidebar shell exists but the shared sidebar layer is bypassed without a real repo-specific reason
- shell nav item routes to an invented destination instead of being disabled when no accepted source page exists
- vertical overflow is owned by the full page when the accepted shell shows a fixed sidebar plus scrolling content pane
- a visible interaction family is static or decorative
- distinct source states collapse into one generic target state
- required implementation artifacts remain placeholder or template-default
- required code checks, build checks, or targeted tests fail
- any ordered checklist row required before visual verification is still `Not Started`, `Failed`, or `Blocked`
- route work began before shared primitive work was complete
- page sections were authored before route registration and real route files were in place

Pass gate:

- score is at least `28/30`
- every critical item passes
- the implementation is ready for screenshot-based verification

## Promotion Rule

Phase 5 is blocked until both Phase 3 and Phase 4 have passed in writing.
Phase 6 visual verification is blocked until Phase 5 has passed in writing.
Do not stop after Phase 2, Phase 3, Phase 4, or Phase 5 to ask whether to continue. The purpose of these written gates is to decide the next step without needing user approval mid-run.

Do not treat these as acceptable reasons to advance early:

- the route map exists
- the page looks broadly similar
- the build succeeds
- tests are green

The target is not ready for visual verification until the authored UI exists across the full accepted route/state and section corpus.
