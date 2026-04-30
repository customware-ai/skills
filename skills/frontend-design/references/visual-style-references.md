# Visual Style References

Use this reference as the default visual language for modern operational apps when the user does not provide a stricter competing style.

## Quality Bar

The UI should feel modern, minimal, airy, and intentionally designed. It should not feel like a generic enterprise admin template, bootstrap dashboard, or default AI-generated SaaS screen.

The target is working app software, not a marketing page. Keep real navigation, controls, records, forms, tables, status, actions, and state visible. Make the app feel premium through composition, hierarchy, restraint, and domain specificity.

When domain context provides brand colors, use them as the starting point for the visual system. Do not ignore them and fall back to default purple/blue or generic shadcn colors.

Airiness is mandatory. If spacing feels slightly too generous, that is acceptable. If spacing feels cramped, dense, or compressed, revise.

## Core Principles

### Surface Hierarchy

Create at least three readable layers:

- outer stage/page background
- app canvas/workspace
- focal surface or active object

Separate these through subtle tone, spacing, radius, and selective elevation. Do not rely on heavy borders or repeated cards.

### Restrained Color

- Keep most of the screen neutral: porcelain, stone, cool gray, cream, graphite, charcoal, or muted brand-derived tints.
- Use accent color selectively for active state, selected item, primary action, or one important signal.
- Avoid default blue/purple bias.
- Status colors should be soft, readable, and systemized.
- Do not wrap large surfaces in loud colored borders.
- Read and summarize `.tasks/domain.md` brand colors when present before choosing the palette.

### Typography

- Use confident hierarchy: clear titles, strong values, smaller muted labels.
- Use fonts that suit app UI: readable, modern, and purposeful.
- Avoid typewriter/blog fonts for operational apps.
- Avoid all text being the same size and weight.
- Avoid decorative marketing copy and hero headlines inside app workspaces.

### Navigation Chrome

Navigation should anchor the product without overpowering it.

- Sidebar, topbar, rail, tabs, or command surfaces should have enough tonal contrast to be readable at thumbnail scale.
- Use quiet product chrome: mist, stone, porcelain, muted primary tint, or soft graphite.
- Do not use a heavy saturated slab unless explicitly required.
- Do not force a sidebar if the workflow does not need one.
- If a selected domain skill requires a navigation or layout structure, keep it, but make it quiet and ensure the main workspace remains designed and airy.

### Shape And Controls

- Use a coherent radius scale.
- Controls should feel like one system.
- Buttons, inputs, badges, rows, tabs, and popovers should not each invent their own geometry.
- Avoid pill-shaped everything.

### Borders, Shadows, And Depth

- Structure should mostly come from spacing, tone, grouping, and typography.
- Borders are 1px, low-contrast, and selective.
- Elevation should be crisp and close to the surface, not fluffy.
- Avoid heavy drop shadows, broad blur halos, glows, and glassmorphism.

### Space

Use space as a design material.

- Leave large gutters and quiet areas.
- Use generous gaps between major groups, rows, controls, and sections.
- Prefer fewer visible modules with more breathing room over more modules packed tightly.
- When unsure, increase spacing rather than decrease it.
- Show fewer modules with stronger hierarchy.
- Do not fill every grid cell because it is available.
- Move secondary content behind navigation, drawers, tabs, drill-down pages, or scroll.

## Cards Rule

Cards are an anti-pattern when used as the default answer.

Top-level cards are not allowed. Do not compose the main page from large rounded panels. Use open page structure, tonal bands, authored workspace areas, rows, dividers, and one focal working surface instead.

Prefer:

- open page sections
- tonal bands
- inline rows
- dividers
- embedded controls
- selected lanes
- sidebars with stacked label/value rows
- tables with generous row treatment
- one authored working surface

Use cards only when:

- a repeated item needs real separation
- a notice or selected item needs emphasis
- a dialog, sheet, popover, or detail frame needs containment
- a concise highlighted state must stand apart

Avoid:

- KPI card grids
- helper-card walls
- cards inside cards
- equal-weight panel grids
- full-page layouts made from rounded rectangles
- a main screen that resolves as two or three large neighboring cards

Before completion, audit the UI for excessive cards. If top-level cards exist or cards dominate the first screen, revise toward open sections, rows, dividers, tonal bands, and one authored working surface.

## Layout Direction

Business and operational apps still need strong design. Do not let the app become a CRUD template because it has a sidebar, data, approvals, pricing, or workflows.

Good default patterns:

- open context/header zone plus one main working section
- slim tonal rail or quiet sidebar when needed
- one dominant operational object
- sparse adjustable rows inside one continuous surface
- compact filters/actions grouped as pills or controls
- tables used when they are the right interaction, but styled with air and hierarchy
- sidebars used for live summaries only when they materially help the current task

Avoid:

- title + filter row + KPI strip + card grid + table as the default
- dense board plus permanent inspector unless the workflow requires simultaneous detail
- helper panels added only to fill whitespace
- generic left sidebar plus many cards because the app is "business software"

## Domain Skill Compatibility

If a selected domain skill defines structure, preserve it. Do not duplicate domain-skill-specific layout rules here. This reference should not need edits when any current or future domain skill changes its own UI pattern.

Improve the visual treatment:

- Make summaries inline and compact when possible.
- Use tables and rows with strong spacing instead of mini-card piles.
- Use one main working section instead of many competing panels.
- Let output views look like polished deliverables, not dashboard cards.
- Keep navigation and supporting context functional and quiet.

## Strong Light-Mode Patterns

- De-carded hero/object: main active area sits directly on the app canvas or a subtle band.
- Selected lane: only the active row/record lifts slightly.
- Open workflow route: stepper/timeline dots and labels live in open space, not heavy boxes.
- Sparse command bar: filters/actions grouped with room around them.
- Tinted module: faint wash behind a focused area instead of another white card.
- App-first object: the focal area contains controls, state, and actions, not just decoration.

## Hard Avoids

- Generic purple SaaS UI.
- Default blue primary unless justified.
- Bootstrap-like admin panels.
- Same-white page/canvas/cards/nav/inputs.
- Heavy shadows, glow effects, frosted glass, decorative gradients.
- Decorative marketing hero sections in app screens.
- Fake charts or filler metrics.
- Overcrowded side panels.
- Giant rings, donuts, or gauges as the main answer unless the product truly requires them.
- Dense equal-weight cards under a header.
- Repeated mini-cards around a central price/status card.
- Standard alert-card framing for every issue.
- Decorative blobs, landscapes, plant shadows, lifestyle imagery, or scenic backgrounds in operational UI.

## Completion Check

Reject and revise the design if:

- it looks like a starter admin template
- the main screen is mostly cards
- the chosen colors feel generic or AI-default
- the domain brand colors were available but not reflected in primary/active/focus treatment
- the first screen tries to show everything
- the app has no strong product-specific working surface
- spacing is cramped or all modules have equal weight
- the UI would still look the same if the domain name changed
- it uses heavy shadows, glow effects, or repeated Tailwind shadow utilities instead of crisp contact-edge depth
