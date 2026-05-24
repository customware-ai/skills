# Source Discovery

Use this reference before implementing the target app.

The goal is to convert the source HTML app into a complete, auditable visual and interaction reference set.

## Launch Contract

- Open the provided source HTML app with Playwright.
- The source file is expected to be self-contained.
- If direct file loading breaks in-app navigation, serve the file locally with a minimal SPA fallback.
- Trust screenshots only after the source app behaves correctly under the chosen launch method.

## Required Viewports

Capture at least:

- Desktop: `1440x960`
- Mobile: `390x844`

Add route-specific or crop screenshots when those two viewports hide important details.

## Discovery Inventory

Inventory every visible route and meaningful state.

Routes include:

- top-level navigation destinations
- nested route destinations
- menu-driven pages
- hash or History API destinations
- state-only screens that behave like separate pages

States include:

- tabs
- dialogs
- drawers and sheets
- dropdowns and menus
- filters and search results
- selected row/card/detail states
- empty/loading/error states when visible
- mobile nav open and closed
- form focus, validation, disabled, success, or destructive states when visible

If two states would need different target code or styling, capture them separately.

## Source Contract Extraction

For every inventory row, record exact visible details:

- route or state id
- how to reach it through the UI
- desktop screenshot path
- mobile screenshot path
- page title and headings
- section names and section order
- navigation labels
- primary and secondary actions
- tabs, filters, menus, and field labels
- table columns or list row content
- visible status labels and badges
- dialog/drawer content and actions
- mobile above-the-fold content priority
- notes on any animation or transition that affects final state

Do not use generic descriptions like `main panel`, `filters`, or `settings dialog` when exact labels are visible.

## Page Section Ledger

Every route/state row must enumerate its visible sections. Sections are the units the implementation will later grade one by one.

For each section record:

- stable section id
- source route/state id
- section name or visible heading
- section role
- desktop source screenshot or crop
- mobile source screenshot or crop when visible on mobile
- exact structure contract
- exact style contract
- behavior contract when controls exist in that section

Common section types:

- shell/navigation
- header/context
- toolbar/action row
- tab/filter area
- primary workflow surface
- table/list/grid
- detail/inspector
- summary/support module
- dialog/drawer/menu
- mobile top area
- mobile navigation

If a section is visible, it must be listed. Do not rely on one full-page row to imply section coverage.

## Source Acceptance Score

Score `design/source-quality-review.md` against 50 items:

- 10 route coverage items
- 10 interaction-state coverage items
- 10 desktop visual-reference items
- 10 mobile visual-reference items
- 10 exact-contract extraction items

Critical failures:

- no desktop source screenshot
- no mobile source screenshot
- missing primary route
- missing obvious interaction family
- unclear route/state reach steps
- source screenshots are broken, blank, clipped, or captured in a launch mode that does not match the app behavior
- visible page sections are not enumerated

Pass gate:

- every critical item passes
- score is at least `46/50`
- every failed non-critical item is either fixed with more discovery or recorded as a real source limitation
- every route/state row has section rows detailed enough to grade later

If the score fails, do not implement. Continue source discovery.

## Screenshot Naming

Use stable relative names:

- `mocks/source/desktop-home.png`
- `mocks/source/mobile-home.png`
- `mocks/source/desktop-settings-dialog.png`
- `mocks/source/mobile-settings-dialog.png`

The exact names can vary, but every artifact table should cite the actual screenshot path.

## Discovery Completion

Discovery is complete only when a later implementation agent can build the app from the inventory without guessing what pages, states, labels, or mobile priorities exist.
