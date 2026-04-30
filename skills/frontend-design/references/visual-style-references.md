# Visual Style References

Use this reference for the visual quality bar. Domain skills still own product structure.

## Target

Modern operational app UI with minimal visual noise, generous spacing, brand-aware color, and one clear working surface. Not a marketing page, admin template, Bootstrap dashboard, or generic AI/SaaS screen.

## Surface Hierarchy

Create readable layers without boxing everything:

- page/stage background
- app canvas/workspace
- focal working surface or active object
- popovers/sheets/dialogs only when needed

Use tone, spacing, typography, and selective dividers before borders, shadows, or panels.

## Color

- Start from `.tasks/domain.md` brand colors when present.
- Use the main brand/accent color for primary action, selected state, focus, active navigation, and links.
- Use secondary brand colors only when they clarify hierarchy.
- Derive backgrounds, surfaces, borders, muted text, and statuses from compatible tints.
- Avoid generic purple/blue defaults and loud raw-brand floods.

## Space

Airiness is mandatory.

- Use large gutters and clear gaps between groups, rows, controls, and sections.
- Prefer fewer visible modules with more breathing room.
- When unsure, increase spacing.
- Cramped, dense, compressed layouts must be revised.

## Typography

- Use readable, modern UI fonts.
- Avoid typewriter/blog/editorial fonts unless the domain explicitly needs them.
- Use clear hierarchy: titles, section labels, muted details, strong values.
- Avoid decorative marketing copy inside working app screens.

## Navigation

Do not use sidebars unless the user explicitly asks or a selected domain skill explicitly requires one.

Prefer:

- topbar
- tabs
- segmented controls
- breadcrumbs
- command rows
- stepped flows
- drawers, sheets, or detail routes for secondary context

If a sidebar is required, keep it quiet, narrow, and secondary. Never pair it with a card-heavy workspace.

## Cards

Target zero cards.

- No top-level cards.
- No card grids.
- No cards as default grouping or spacing.
- No cards inside cards.
- No equal-weight panel fields under a header.

Allowed only when unavoidable:

- repeated item separation
- selected/detail framing
- dialog, popover, sheet, or drawer containment
- concise notice or true emphasis

Before using a card, try open sections, rows, dividers, tonal bands, tables, drawers, sheets, dialogs, or detail routes. If that works, the card is not allowed.

## Layout Patterns

Good defaults:

- open context/header zone plus one main working section
- one dominant operational object
- table/list rows with generous rhythm
- selected lane or selected row for focus
- sparse command bar for filters/actions
- tinted band for focus instead of another panel

Avoid:

- title + filters + KPI strip + card grid + table
- permanent inspector unless simultaneous detail is required
- helper panels added to fill whitespace
- generic left-sidebar shell
- dense equal-weight modules

## Depth

- Prefer no shadow plus low-contrast divider/border.
- Use crisp contact-edge depth only for selected rows, floating controls, popovers, sheets, dialogs, or one focal surface.
- Avoid heavy drop shadows, broad blur, glow, glassmorphism, and decorative gradients.

## Completion Check

Reject and revise if:

- the screen is mostly cards/panels
- any avoidable card remains
- a sidebar exists without explicit requirement
- the app ignores available brand colors
- spacing feels cramped
- all modules have equal visual weight
- the UI would still look the same if the domain name changed
- it looks like a starter admin template or default shadcn screen
