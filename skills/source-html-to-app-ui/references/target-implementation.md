# Target Implementation

Use this reference before and during target repo edits.

## Target Repo First

Read the target repo `AGENTS.md` before editing. Follow its stack, routing, testing, and style rules.

This skill adds source-fidelity gates on top of the repo rules. It does not replace them.

## Implementation Order

Build in this order:

1. Design-system JSON into global theme tokens.
2. Shared component wrappers and primitive states.
3. App shell and viewport ownership.
4. Route map.
5. Route content.
6. Interaction states.
7. Mobile behavior.
8. Fine visual parity.

## Theme Translation

Use the supplied JSON as the styling-system contract.

Patch the target repo's real theme entry points, such as:

- global CSS variables
- Tailwind or equivalent theme config
- font imports or font-family tokens
- radius tokens
- shadow/contact-depth tokens
- status tokens
- sidebar/header/nav tokens when present
- chart or data visualization tokens when present

If tokens alone do not reproduce the source app, patch shared components too.

## Shared Component Translation

Patch shared UI wrappers when the source app has specific styling for:

- buttons
- inputs
- selects
- textareas
- checkboxes and switches
- tabs
- badges and chips
- tables and rows
- cards or panels
- dialogs
- drawers/sheets
- popovers and menus
- tooltips
- navigation items

Do not scatter one-off class fixes everywhere when a shared component treatment is clearly needed.

Do not accept stock component-library styling if the source app uses a different design language.

## Viewport Ownership

The target must feel like the product app itself.

Failures:

- app placed inside a centered presentation shell
- extra page padding that makes the product look like an exhibit
- recreated source screenshot or board frame as literal UI
- phone/device hardware reproduced as product UI
- route content trapped inside a demo/catalog wrapper

If the source has an outer app shell, implement it as the actual product boundary.

## Route And State Reproduction

Build from `design/source-inventory.md`.

- Every inventory row needs target coverage.
- The target UI must render from authored repo code, not from the provided source HTML file at runtime.
- Route labels, headings, section order, primary actions, and state controls must match the source.
- If the source is state-driven rather than URL-driven, preserve the visible state model in the target even if the route structure is cleaner.
- Use local state and realistic mock data when no backend is required.

Visible interactions must be real:

- tabs switch panels
- filters/search alter visible data or state labels
- rows/cards can select and show detail state
- dialogs/drawers open and close
- dropdowns/menus are actual controls
- mobile nav opens/collapses
- forms show focus, disabled, validation, or success states when those appear in the source

Static imitation of interactive states is a failure.

## Checkpoints

Each checkpoint should end with screenshots, review updates, and open-gap updates.

### Checkpoint 1: Theme And Shell

Done means:

- design-system JSON is reflected in the target theme
- shared shell exists
- app owns the viewport
- early desktop screenshot shows the right atmosphere and surface hierarchy

### Checkpoint 2: Primary Routes

Done means:

- all primary source routes exist
- navigation reaches them
- labels and section order match the inventory
- desktop screenshots exist

### Checkpoint 3: Interaction States

Done means:

- all source interaction families exist
- at least one screenshot exists per family
- controls are real components with state

### Checkpoint 4: Mobile

Done means:

- mobile layout matches source priorities
- mobile navigation and key states work
- content does not clip, overflow, or become illegible

### Checkpoint 5: Full Grading

Done means:

- target evidence mirrors the full source inventory
- scorecard passes
- ordinary open gaps are closed
- adversarial pass is complete

## Testing

Run the target repo's required checks and tests. If tests are expected for UI changes, write focused tests for the reproduced routes and states.

Do not let automated tests replace visual proof. A green test suite does not mean the target matches the source.
