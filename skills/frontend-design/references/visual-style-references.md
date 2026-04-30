# Visual Style References

Use this reference for the visual quality bar. Domain skills still own product structure.

## Target

Modern operational app UI with minimal visual noise, generous spacing, brand-aware color, and one clear working surface. Not a marketing page, admin template, Bootstrap dashboard, or generic AI/SaaS screen.

For CPQ, CRM, trades, and similar business/domain skills, keep the selected skill's product structure while applying the shared visual quality rules here: brand-aware color, actual logo usage, airy spacing, airy inner density, rounded controls, strong input contrast, soft/tight shadows, minimal visual noise, and cardless defaults.

When no selected business/domain skill provides a stronger product-specific visual pattern, raise the ambition of the visual system instead of settling for a safe default shell.

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
- First check `public/brand/logos/`. If that folder contains a usable logo file, use the real logo from there in the header or primary chrome. Only create or invent a logo if that folder does not exist or has no usable logo files.
- Commit to a cohesive aesthetic. Use CSS variables consistently.
- Dominant colors with sharp accents are usually stronger than timid, evenly distributed palettes.
- If a surface exists, it must separate from the canvas through tone first, border second, shadow last.
- White or near-white surface on white or near-white canvas with only a faint border fails.
- Editable controls must clearly separate from the surrounding page or panel.
- In light mode, inputs, selects, textareas, search bars, date fields, and similar controls must use near-white or very light tinted backgrounds.
- In dark mode, those same controls must use near-black backgrounds.
- Editable controls must not use `bg-transparent`, `bg-background`, `bg-muted`, or the same fill as the page/panel.
- `--input` must be visibly lighter than `--background` in light mode and visibly darker than the canvas in dark mode.
- Search bars, filter inputs, and command-row controls must be among the clearest control surfaces on the screen.
- This does not require pure white. A very light shade close to white is usually better than same-tone blending.
- Avoid generic purple/blue defaults and loud raw-brand floods.

## Space

Airiness is mandatory.

- Use large gutters and clear gaps between groups, rows, controls, and sections.
- Prefer fewer visible modules with more breathing room.
- Carry that breathing room into inner content too: table rows, list rows, cards, metadata stacks, inline actions, and badges should not collapse into tight clusters.
- If a row starts feeling cramped, reduce the number of same-line columns and let supporting information stack more naturally.
- Surfaced tables should use more generous header padding and row padding than default starter tables.
- When unsure, increase spacing.
- Cramped, dense, compressed layouts must be revised.

## Typography

- Choose fonts that are beautiful, unique, and interesting.
- Avoid generic fonts like Arial and Inter.
- Pair a distinctive display font with a refined body font when the product can support it.
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

If a sidebar is required, keep it quiet and secondary, but never cramped. Never pair it with a card-heavy workspace.
Navigation chrome should be tonally distinct from the main canvas. Same-white navigation and content surfaces fail.
Header/topbar surfaces should usually use a near-white or very light tinted treatment in light mode, and near-black in dark mode, so the chrome reads clearly without becoming a heavy slab.
If `public/brand/logos/` contains a real logo, header chrome should use it instead of a generated placeholder logo.
If a sidebar is required by the domain skill, prefer a much darker primary-derived tone for the sidebar background or active navigation field so the chrome feels intentional and anchored.
Required sidebars must have enough width, row height, padding, and overflow handling for readable labels, descriptions, badges, icons, and active states. Clip only secondary descriptions, not primary labels or action/status affordances.

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
- surfaced tables with `shadow-xs` and comfortable header/body padding
- rows that group related metadata with breathing room instead of forcing every fact into its own narrow column
- selected row, inline lane, or drawer for focus
- sparse command bar for filters/actions
- tinted band for focus instead of another panel

If no selected business/domain skill is steering the composition, push for a more intentional structure:

- asymmetry
- overlap
- diagonal flow
- grid-breaking moments
- generous negative space or deliberately controlled density

Do not apply this expressive fallback as a reason to ignore a selected business/domain skill. Business apps should still be minimal, airy, rounded, brand-aware, low-noise, and sparse on a single page.

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
- Prefer `shadow-2xs` for buttons and compact interactive controls, `shadow-xs` for cards/tables/similar contained surfaces, `shadow-xl` for popovers and banners, and `shadow-2xl` for dialogs.

## Motion

- Use animation for effects and micro-interactions when it improves the UI.
- Prefer CSS-first motion where possible.
- In React, use a motion library when available and appropriate.
- Prioritize high-impact moments over scattered noise.
- One well-orchestrated page-load sequence with staggered reveals is often better than many tiny unrelated effects.
- Use scroll-triggered moments and hover states that feel intentional and surprising, not ornamental.

## Backgrounds And Visual Details

- Build atmosphere and depth instead of defaulting to flat solid fills.
- Add contextual effects and textures that match the aesthetic.
- Use gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, or grain overlays when they improve the product direction.
- If no selected business/domain skill is narrowing the visual language, these details should help the UI feel authored rather than generic.

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
- editable controls are not near-white/lightest-surface in light mode or near-black in dark mode
- editable controls use transparent, muted, background, or same-fill treatments that hide their control boundary
- inner row/table/card content is tight or over-columned instead of airy
- a surfaced table is flat because it lacks `shadow-xs` or comfortable header/body padding
- spacing feels cramped
- a required sidebar is cramped, clips important text/actions, or uses too little item padding
- all modules have equal visual weight
- the UI would still look the same if the domain name changed
- it looks like a starter admin template or default shadcn screen
