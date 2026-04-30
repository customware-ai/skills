---
name: frontend-design
description: >
  Strict frontend design guardrails for building modern, minimal-visual-noise, airy,
  non-generic app UIs. Use whenever creating or changing frontend UI, React components,
  shadcn/ui themes, Tailwind styles, app layouts, or first-version product screens.
  This skill complements vertical/domain skills like CPQ, CRM, and similar app builders:
  follow the selected domain skill's workflow and layout requirements, then enforce
  this skill's shared visual rules for brand-aware theming, generous spacing,
  typography, contrast, roundedness, shadows, surface hierarchy, cardless defaults,
  no-sidebar defaults, and anti-pattern avoidance.
---

# Frontend Design

This is a visual design guardrail skill, not a domain workflow skill. Domain skills own required product structure, terminology, workflows, and output views. This skill owns visual quality and must be applied inside that structure.

## Mandatory References

Before visual planning or implementation, read both files. Skipping either file is a skill violation.

- `.agents/skills/frontend-design/references/visual-style-references.md`
- `.agents/skills/frontend-design/references/shadcn-setup-and-theming.md`

## Required Workflow

1. Read the active task, domain context, and selected domain skills.
2. Read `.tasks/domain.md` when it exists. Extract brand colors, company name, domain tone, terminology, workflows, entities, statuses, roles, and constraints.
3. Read both frontend-design references.
4. Produce the design pass before coding:
   - **Vision**: domain-specific product and visual direction. Reject generic SaaS purple, card-heavy dashboards, and generic admin shells.
   - **First-version features**: working screens, controls, routes, dialogs, and localStorage-backed state.
   - **Design tokens**: primary, secondary/accent, background, canvas, focal contrast treatment, text, border, radius, contact shadow, status colors, typography, generous spacing, and cardless plan.
   - **Shared visual rules**: for every app, including CPQ/CRM/trades-like business apps, enforce brand color usage, actual logo usage, airy spacing, airy inner density, rounded controls, strong input contrast, soft/tight shadows, minimal visual noise, and cardless defaults.
   - **Fallback creative direction**: only when no selected domain skill defines a business/product pattern, choose a more vivid intentional direction for color, motion, composition, and background atmosphere rather than falling back to a generic admin shell.
5. Pass the design compliance gate.
6. Configure CSS variables and Tailwind/shadcn theme tokens before building screen details.
7. Build the UI with those tokens.
8. Run the pre-completion audit and revise before finishing.

## Non-Negotiables

- **Brand first**: If `.tasks/domain.md` provides brand colors, use them. Map the main brand/accent color to primary actions, active navigation, selected state, focus, and links. Derive neutral surfaces, borders, muted text, and statuses from compatible tints. Do not default to generic purple/blue.
- **Business-skill compatibility**: If the app fits a selected business/domain skill like CPQ, CRM, trades, or similar, follow that skill's workflow and layout mostly as written, but still enforce this skill's shared visual rules: airy spacing, airy inner density, rounded controls, strong input contrast, soft/tight shadows, brand colors, actual logo usage, minimal visual noise, and cardless defaults.
- **Creative fallback when no vertical skill fits**: Only if the app does not fit a selected business/domain skill like CPQ, CRM, trades, or similar, deliberately push the visual direction further. Commit to a cohesive aesthetic, use CSS variables consistently, prefer dominant colors with sharp accents over timid evenly distributed palettes, use motion for high-impact moments, favor unexpected composition, and build atmosphere through backgrounds and visual details instead of defaulting to a plain shell.
- **Use the real logo**: First look in `public/brand/logos/`. If that folder contains a usable logo file, use the correct actual logo from that folder in the header or primary app chrome. Only create or invent a logo if `public/brand/logos/` does not exist or has no usable logo files.
- **Cardless by default**: Aim for zero cards. If the UI works without a card, the card is not allowed. A bordered rounded surface occupying a major region of the page is a card even if `Card` is not imported. Cards are only allowed for dialog/popover/sheet containment, concise notice, or truly repeated items when rows, dividers, or tonal separation fail.
- **No top-level cards**: Never compose the main page from large sibling cards, a stack/grid of rounded panels, or a large framed hero/detail container. Top-level structure must be open sections, tonal bands, rows, dividers, workspace areas, or one open focal working zone.
- **No sidebars by default**: Use a sidebar only when the user explicitly asks for one or a selected domain skill explicitly requires one. Do not add a sidebar because the app is operational, business, admin-like, multi-step, or has multiple sections.
- **Airy spacing**: Use generous gaps, gutters, row rhythm, and section spacing. Slightly too much spacing is acceptable; cramped, dense, or compressed UI is failure.
- **Airy inner density**: Airiness must continue inside rows, tables, lists, cards, and compound components. Do not pack too many columns into one row when a cleaner stacked or richer row layout would breathe better. Inner content should use generous gaps between sub-elements, metadata, actions, and labels.
- **Table rhythm**: When using a surfaced table, give the table `shadow-xs` and use generous header padding, row padding, and taller row rhythm. Tables should not feel compressed, flat, or spreadsheet-tight.
- **Rounded by default**: If the selected domain skill does not explicitly require a sharper or specific radius language, prefer a clearly rounded modern system. Avoid timid 4px/6px/8px admin radii by default. Controls, chips, tabs, and key surfaces should usually feel distinctly rounded or pill-like.
- **Typography with character**: Choose fonts that are beautiful, distinctive, and interesting. Avoid generic defaults like Arial and Inter. Prefer a characterful display face paired with a refined body face when the product can support it. The typography should elevate the UI, not read like a default starter app.
- **One dominant working surface**: The first screen should focus on one clear operational object or working section. Do not try to show the whole product at once.
- **No major-region framed surfaces**: Do not turn the main working area, hero, inspector, or detail lane into a big bordered rounded panel. Prefer open layout, split rows, tonal bands, dividers, or a drawer/sheet for secondary detail.
- **Token-first shadcn**: Configure `app.css`/global CSS variables and Tailwind theme values before component work. Do not accept default shadcn colors as the design.
- **Strong soft contrast**: If a surface exists, it must separate from the canvas through tone first, border second, shadow last. Same-white or near-white surfaces with faint borders fail.
- **Interactive surface contrast**: Editable controls must be obvious. Inputs, selects, textareas, comboboxes, date fields, search fields, and command-bar controls must use a near-white or very light tinted background in light mode and a near-black background in dark mode. They must not use `bg-transparent`, `bg-background`, `bg-muted`, or the same fill as the page/panel. `--input` must be visibly lighter than `--background` in light mode and visibly darker than the canvas in dark mode. Search/filter controls must be among the clearest input surfaces on the screen.
- **Sidebar tone and space when required**: If a selected domain skill requires a sidebar, use a much darker shade derived from the primary color for the sidebar background or key sidebar surfaces. The sidebar must be wide enough for its labels, badges, and active states; do not clip text or squeeze actions off the edge. Use generous item padding, clear vertical rhythm, and deliberate truncation only for secondary descriptions.
- **Contact depth only**: Avoid `shadow-sm`, `shadow-md`, and `shadow-lg` as defaults for normal layout surfaces. Prefer `shadow-2xs` for buttons and other small interactive elements, `shadow-xs` for cards/tables/similar contained surfaces, `shadow-xl` for popovers and banners, and `shadow-2xl` for dialogs. Use soft, tight, contact-edge depth only when needed. Soft means no hard spread edge, not barely visible; the shadow can still be a clear gray if needed for contrast. Depth should read as edge contact, not lift.
- **Domain specificity**: The UI should not look unchanged if the domain name and labels are swapped.

## Design Compliance Gate

Do not code until all answers are acceptable.

- Did I read `.tasks/domain.md` and summarize brand colors when present?
- Did I check `public/brand/logos/` and plan to use an actual logo file from there if one exists?
- Did I read both frontend-design references?
- Did I define exact CSS/Tailwind/shadcn token updates?
- If no selected domain skill fits, did I choose a deliberate fallback direction for color, motion, spatial composition, and background atmosphere?
- If a selected business/domain skill fits, am I following it while still enforcing the shared visual rules?
- Can this UI be built with zero cards? If not, is every remaining card unavoidable under the narrow allowed cases?
- Are there no top-level cards?
- Am I avoiding sidebars unless explicitly requested or required by a selected domain skill?
- Does the first screen focus on one dominant working surface instead of title + filters + KPI strip + card grid + table?
- Am I avoiding large framed hero/detail/inspector surfaces?
- Is the layout airy with generous spacing, not dense?
- Is the inner density airy too: rows, tables, cards, and metadata blocks are not cramped or over-columned?
- If no domain skill overrides radius language, does the UI lean clearly rounded rather than vague enterprise 4/6/8 radii?
- Does the typography feel distinctive and intentional rather than default/generic?
- Do page background, canvas, nav chrome, and any focal surface separate clearly at thumbnail scale?
- Do inputs, search/filter controls, tables, and header/nav chrome have enough tonal separation from the page background?
- In light mode, do editable controls actually use near-white or very light tinted backgrounds rather than page-colored fills?
- Are editable controls free of `bg-transparent`, `bg-background`, `bg-muted`, and same-token page/panel fills?
- If a table is surfaced, is it using `shadow-xs` plus generous header and row padding?
- If a sidebar is required, is it using a darker primary-derived tone with enough width, padding, row height, and overflow handling?
- Are shadows limited to contact-edge depth?
- Does the design feel specific to this domain and task?

## Implementation Rules

- Prefer topbar, tabs, segmented controls, breadcrumbs, command rows, stepped flows, drawers, sheets, dialogs, or detail routes over sidebars.
- Before adding any card-like wrapper, try open spacing, typography, dividers, rows, tonal bands, tables, drawers, sheets, dialogs, or detail routes.
- In tables and row-based views, prefer fewer columns, richer rows, taller row rhythm, and clearer vertical stacking when that makes the UI feel more airy and readable.
- Surfaced tables should usually use `shadow-xs`, generous header padding, and generous body row padding rather than relying only on borders.
- Detail views should prefer inline split layout, selected rows, dividers, tonal sections, drawers, or sheets before any framed panel.
- If a `Card` component is imported or a card-like wrapper remains, add a nearby inline justification explaining why it is unavoidable under the allowed cases.
- Use good readable UI fonts. Avoid typewriter/blog fonts unless the domain explicitly requires that character.
- When no selected domain skill is steering the design language, use more expressive composition, stronger accent hierarchy, and more atmospheric backgrounds instead of a safe generic shell.
- Keep surfaces distinct through tone, spacing, and hierarchy rather than borders and boxes around everything.
- Give inputs/selects/textareas/search fields explicit contrasting fills; do not leave them transparent or page-colored.
- For required sidebars, use enough width and item height for readable labels, visible active states, and non-clipping badges/actions.
- If a card is truly unavoidable, give it intentional tonal contrast from the canvas plus a visible but soft border. Weak same-white cards fail.
- Add only shadcn components required by the actual workflow.
- Keep all buttons, links, menus, dialogs, tabs, forms, routes, and localStorage-backed state functional.

## Pre-Completion Audit

Search the implementation for `Card`, `card`, `bg-card`, `shadow-md`, `shadow-lg`, `shadow-xl`, repeated `rounded-* border` wrappers, and large `rounded-* border p-*` sections.

Reject and revise if:

- Any top-level card exists.
- Any avoidable card remains.
- Any large rounded bordered region reads as a hero card, inspector card, or detail card.
- A sidebar exists without an explicit user request or selected domain-skill requirement.
- The first screen is mostly panels, cards, KPI blocks, helper boxes, or equal-weight modules.
- Surface separation depends mostly on borders instead of tone.
- Same-white or near-white panelization makes major surfaces blend together.
- Inputs, search/filter controls, data rows, or header/nav chrome blend into the page background.
- Editable controls in light mode are not near-white or very light tinted and therefore do not read clearly.
- Editable controls use `bg-transparent`, `bg-background`, `bg-muted`, or the same token/fill as the page or panel.
- Row/table content is cramped, over-columned, or too tight inside the first column and metadata blocks.
- A surfaced table is missing `shadow-xs` or its header/rows are padded too tightly.
- `public/brand/logos/` contains a usable logo file but the header still uses a placeholder logo or no logo without reason.
- Brand colors from `.tasks/domain.md` are not reflected in primary/active/focus treatment.
- No vertical/domain skill fit the app, but the UI still defaulted to a generic admin shell instead of using a stronger creative direction.
- A required sidebar uses a weak pale surface instead of a darker primary-derived tone.
- A required sidebar clips labels, badges, icons, or actions, or uses cramped item padding/row height.
- The UI falls back to vague enterprise middle-radius controls even though no domain skill asked for that.
- Typography falls back to generic fonts or lacks a distinctive display/body pairing when the product could support one.
- Theme variables were not configured before component styling.
- The screen feels cramped or all modules have equal weight.
- The UI looks like a starter admin template, Bootstrap dashboard, or generic AI/SaaS app.
