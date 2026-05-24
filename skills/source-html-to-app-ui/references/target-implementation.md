# Target Implementation

Use this reference for Phase 2, Phase 3, and Phase 4.

## Target Repo First

Read the target repo `AGENTS.md` before editing. Follow its stack, routing, testing, and style rules.

This skill adds source-fidelity gates on top of the repo rules. It does not replace them.

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
- list the highest-risk visual drift areas
- cite the exact source screenshots the build will follow

If any route, state, or section still lacks evidence strong enough to reproduce confidently, return to discovery.

## Implementation Order

Build in this order:

1. theme tokens
2. shared component treatment
3. shell and viewport ownership
4. primary routes
5. route-specific sections
6. interaction states
7. mobile behavior
8. polish and visual parity

## Theme Translation

Use `design/spec.json` as the styling-system contract.

Patch the target repo's real theme entry points, such as:

- global CSS variables
- Tailwind or equivalent theme config
- font imports or font-family tokens
- radius tokens
- border and shadow tokens
- sidebar, nav, header, and surface tokens
- status tokens
- chart tokens when visible

If tokens alone do not reproduce the source style, patch shared components too.

## Shared Component Translation

Patch shared UI wrappers or primitives when the source app has specific treatment for:

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

Do not accept stock library styling if the source app uses a different design language.

## Viewport Ownership

The target must feel like the product app itself.

Blocking failures:

- app placed inside a centered showcase shell
- extra poster padding around the app
- board frame or device frame recreated as product UI
- route content trapped inside a demo or catalog wrapper

If the source app has a shell, implement that shell as the actual product boundary.

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

## Phase 3 Score

Phase 3 uses `20` points:

- `5` theme-token fidelity points
- `5` shell ownership and geometry points
- `5` shared-component treatment points
- `5` screenshot and review-discipline points

Critical failures:

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

- `8` route coverage points
- `8` page-section coverage points
- `6` interaction-reality points
- `4` mobile route/state coverage points
- `4` artifact-discipline points

Critical failures:

- primary route missing
- source interaction family missing
- visible section missing
- mobile route/state coverage missing
- target route is placeholder, generic, or fake
- route/state review rows are missing

Pass gate:

- score is at least `28/30`
- every critical item passes
- every source-listed page section has a target review row

## Promotion Rule

Phase 5 is blocked until both Phase 3 and Phase 4 have passed in writing.

Do not treat these as acceptable reasons to advance early:

- the route map exists
- the page looks broadly similar
- the build succeeds
- tests are green

The target is not ready for visual verification until the authored UI exists across the full accepted route/state and section corpus.
