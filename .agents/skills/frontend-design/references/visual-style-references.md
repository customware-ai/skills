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

At thumbnail scale, the page/stage, app canvas, navigation chrome, and focal surface should still separate clearly. Same-white blending fails.

## Color

- Start from `.tasks/domain.md` brand colors when present.
- Use the main brand/accent color for primary action, selected state, focus, active navigation, and links.
- Use secondary brand colors only when they clarify hierarchy.
- Derive backgrounds, surfaces, borders, muted text, and statuses from compatible tints.
- If `.tasks/domain.md` provides a usable logo path, use the real logo in the header or primary chrome.
- If a surface exists, it must separate from the canvas through tone first, border second, shadow last.
- White or near-white surface on white or near-white canvas with only a faint border fails.
- Inputs, controls, and nav/header chrome should usually be lighter than the main page background in light mode and darker than the main page background in dark mode.
- Search bars, filter inputs, and command-row controls should usually be more contrasty than nearby passive pills, muted bands, or page sections.
- This does not require pure white. A very light shade close to white is usually better than same-tone blending.
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
Navigation chrome should be tonally distinct from the main canvas. Same-white navigation and content surfaces fail.
Header/topbar surfaces should usually use a near-white or very light tinted treatment in light mode, and near-black in dark mode, so the chrome reads clearly without becoming a heavy slab.
If a real brand logo exists, header chrome should use it instead of a generated placeholder logo.

## Radius

If the selected domain skill does not specify a sharper or specific radius language, default to a clearly rounded modern system.

- Prefer distinctly rounded controls and chips.
- Pill controls are usually a strong default for tabs, filters, segmented controls, and compact actions.
- Avoid the vague enterprise middle-radius look.
- A default range closer to `12/16/20/24/full` is usually stronger than `4/6/8`.
- Child radius should usually be slightly smaller than parent radius.
- Radius should feel coherent across buttons, inputs, chips, nav items, and emphasized surfaces.

## Cards

Target zero cards.

- No top-level cards.
- No card grids.
- No cards as default grouping or spacing.
- No cards inside cards.
- No equal-weight panel fields under a header.
- No large framed hero, inspector, or detail panel.

Allowed only when unavoidable:

- repeated item separation
- dialog, popover, sheet, or drawer containment
- concise notice or true emphasis

Before using a card, try open sections, rows, dividers, tonal bands, tables, drawers, sheets, dialogs, or detail routes. If that works, the card is not allowed.

A bordered rounded region occupying a major area of the page is a card even if `Card` is not imported.

## Layout Patterns

Good defaults:

- open context/header zone plus one main working section
- one dominant operational object
- table/list rows with generous rhythm
- selected row, inline lane, or drawer for focus
- sparse command bar for filters/actions
- tinted band for focus instead of another panel

Avoid:

- title + filters + KPI strip + card grid + table
- permanent inspector unless simultaneous detail is required
- large bordered hero block
- large bordered detail block
- helper panels added to fill whitespace
- generic left-sidebar shell
- dense equal-weight modules
- giant chart, ring, gauge, or infographic as the whole answer unless the product truly requires it

## Depth

- Prefer no shadow plus a clear tonal step and soft border.
- Use crisp contact-edge depth only for selected rows, floating controls, popovers, sheets, dialogs, or one focal surface.
- If a card is truly unavoidable, give it intentional tonal contrast from the canvas. Same-white cards with faint borders fail.
- Avoid heavy drop shadows, broad blur, glow, glassmorphism, and decorative gradients.
- Avoid lift-style shadows. Depth should read as edge contact, not floating.
- Soft shadow means soft-edged, not ultra-faint. It may still be a clearly visible gray when that improves separation.
- Prefer `shadow-xs` and `shadow-sm` only when needed. Reserve `shadow-xl` for dialogs/popovers.

## Hard Avoids

- decorative blobs, scenic art, lifestyle imagery, plant shadows, or marketing-style atmosphere inside operational UI
- giant hero treatment that makes the app feel like a landing page instead of working software

## Completion Check

Reject and revise if:

- the screen is mostly cards/panels
- any avoidable card remains
- a large hero/detail/inspector region still reads like a card
- a sidebar exists without explicit requirement
- the app ignores available brand colors
- surface separation depends mostly on borders
- same-white blending makes major surfaces merge together
- inputs, search/filter controls, or header/nav chrome do not read clearly against the page background
- spacing feels cramped
- all modules have equal visual weight
- the UI would still look the same if the domain name changed
- it looks like a starter admin template or default shadcn screen
