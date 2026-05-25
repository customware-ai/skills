# Source Discovery

Use this reference for Phase 1.

The goal is to turn the provided source HTML app into an accepted source corpus that a later implementation phase can reproduce without guessing.

Read `references/playwright-interactive.md` first. In this phase, `Playwright` means standalone interactive Node.js Playwright scripts for the source app, not the repo's normal Playwright E2E testing flow.

Phase 1 is an internal discovery gate, not a user handoff point. A passing discovery score means continue into planning automatically. A failing discovery score means rerun discovery automatically.

## Discovery Rule

Use interactive Playwright scripts as the discovery engine.

- Write and run dedicated source discovery scripts.
- Open the source app in those scripts.
- Interact with it to reveal routes, states, menus, dialogs, drawers, filters, selected states, and mobile navigation.
- Capture screenshots only after the launch method is rendering correctly.

Reading the source HTML, CSS, or JS can clarify labels or behavior, but it does not satisfy discovery on its own. Discovery is not complete until the screenshots and written inventory are complete.

## Launch Contract

- Prefer opening the file directly if it behaves correctly.
- If file loading breaks navigation or assets, serve it locally with the minimum setup needed for correct behavior.
- Trust screenshots only after the rendered app behaves like the source app is meant to behave.

## Required Viewports

Capture at least:

- Desktop: `1440x960`
- Mobile: `390x844`

Add route-specific or section-specific captures whenever those viewports hide important detail.

## Discovery Surface

Treat all of these as in scope:

- top-level destinations
- nested destinations
- state-only screens that behave like pages
- dialogs
- drawers and sheets
- dropdowns and menus
- tabs
- search and filter states
- selected item or detail states
- empty, loading, disabled, success, warning, and destructive states when visible
- mobile navigation open and closed
- mobile versions of major pages

If two states would require different target code, different target styling, or different target layout, capture them separately.

## Source Inventory Contract

For every route/state row in `design/source-inventory.md`, record:

- stable id
- visible route or state name
- how to reach it through the UI
- desktop screenshot path
- mobile screenshot path
- visible sections
- interaction families present
- exact visible contract
- coverage status

The contract must name real headings, labels, controls, row types, panel roles, and visual priorities. Do not use vague placeholders like `main panel` or `toolbar`.

## Page Section Ledger Contract

Every visible section inside every route/state needs its own row.

For each section record:

- stable section id
- source route/state id
- section name
- section role
- desktop screenshot or crop
- mobile screenshot or crop when visible on mobile
- exact structure contract
- exact style contract
- behavior contract when controls exist
- scroll ownership contract when the shell is scroll-sensitive
- coverage status

Common section types:

- shell/navigation
- header/context
- toolbar/action row
- filter/tab area
- primary workflow surface
- table/list/grid
- detail/inspector
- summary/support module
- dialog/drawer/menu
- mobile top area
- mobile navigation

If a section is visible, it must be listed. Full-page screenshots do not remove the need for section rows.

Important interpretation rule:

- a long or stitched Playwright screenshot does not automatically mean the whole app shell scrolls
- when a sidebar shell is present, treat the sidebar as stable and treat only the content beside it as vertically scrollable
- record that scroll ownership explicitly in the section contract so implementation never makes the whole page scroll when a sidebar exists

## Source Acceptance Score

Score `design/source-quality-review.md` against `50` items:

- `10` route coverage items
- `10` interaction-state coverage items
- `10` desktop evidence items
- `10` mobile evidence items
- `10` section and contract extraction items

Critical failures:

- no desktop source evidence for a discovered route/state
- no mobile source evidence for a discovered route/state without a real source limitation
- mobile evidence covers only one default shell view instead of every accepted primary route/state and major mobile interaction state
- missing primary route
- missing obvious interaction family
- unclear reach steps
- screenshots are blank, clipped, broken, or captured from the wrong launch method
- visible page sections are not enumerated
- inventory rows cite non-existent screenshot paths

Pass gate:

- every critical item passes
- score is at least `48/50`
- every failed non-critical item is either fixed or recorded as a real source limitation
- every route/state row has section rows detailed enough to implement from
- every accepted primary route/state and major mobile interaction state has dedicated mobile evidence, not just a single mobile-shell screenshot

If the score fails, do not implement. Return to interactive Playwright discovery.

## Promotion Rule

Phase 2 is blocked until the source-acceptance score passes in writing.
Do not stop after Phase 1 to summarize the source corpus and ask whether to continue. The gate exists so the Agent can continue autonomously once the source corpus is strong enough.

The following do not count as acceptable substitutes for a passing source corpus:

- route inference from raw HTML
- DOM inspection alone
- a single full-page screenshot
- desktop-only capture
- prose that refers to screens without screenshot evidence

## Screenshot Naming

Use stable names under `mocks/source/`, for example:

- `mocks/source/desktop-home.png`
- `mocks/source/mobile-home.png`
- `mocks/source/desktop-settings-dialog.png`
- `mocks/source/mobile-settings-dialog.png`
- `mocks/source/desktop-home-table-crop.png`

Names may vary, but every artifact row must cite the exact path that exists.

## Discovery Completion

Discovery is complete only when a later implementation pass can build every route, state, and section from the accepted source corpus without guessing what is visible, how it behaves, or how mobile reprioritizes it.
