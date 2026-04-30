# Shadcn Setup And Theming

Use this reference when implementing shadcn/ui + Tailwind.

## Order

1. Inspect `components.json`, global CSS, `tailwind.config.*`, app routes/layouts, `components/ui/*`, and `package.json`.
2. Read domain/brand inputs and selected domain skill rules.
3. Define tokens.
4. Update global CSS variables and Tailwind theme extension.
5. Verify the tokens exist in the real files.
6. Build screen details.

Do not build screens first and theme later.

## Required Token Roles

Set or verify:

- `--background`
- `--foreground`
- `--card`
- `--card-foreground`
- `--popover`
- `--popover-foreground`
- `--primary`
- `--primary-foreground`
- `--secondary`
- `--secondary-foreground`
- `--muted`
- `--muted-foreground`
- `--accent`
- `--accent-foreground`
- `--destructive`
- `--destructive-foreground`
- `--border`
- `--input`
- `--ring`
- `--radius`
- chart/status colors when used

Map tokens by role. Do not copy brand colors into every variable.
If the selected domain skill does not define a sharper or specific radius system, set `--radius` and component radii to a clearly rounded modern default rather than timid enterprise values.
If no selected domain skill defines a stronger visual system, use the theme tokens to commit to a cohesive aesthetic rather than a neutral default.

## Light Surface System

- Page background: tinted pale gray, stone, cream, porcelain, glacier, or brand-derived tint.
- App canvas: lighter off-white/porcelain, not raw white everywhere.
- Navigation chrome: quiet near-white or very light tinted tone, not saturated slab.
- Required sidebars: much darker primary-derived tone or a darker companion tone from the same palette, not a pale washed-out sidebar.
- Focal surface: clear tonal difference, not a repeated large card.
- Inputs: near-white and clearly editable.
- Borders: soft but visible and selective.
- Popovers/sheets/dialogs: clear separation with contact-edge depth.

Do not use the same white for body, app frame, cards, popovers, inputs, and controls.
Navigation chrome must remain visibly distinct from the main canvas.
Do not rely on a faint border alone to separate a major surface from the canvas.
Inputs, selects, textareas, tables, and nav/header chrome should usually be lighter than the page background in light mode.
In dark mode, those same working surfaces should usually move to near-black so they still read distinctly against the overall canvas.
Pure white is not required. Near-white is usually enough when the separation is obvious.
Search inputs, filter fields, and command-row controls should usually use one of the clearest light surfaces on the screen in light mode so they remain obvious at a glance.

## Brand Mapping

- Main brand/accent -> `--primary`, primary buttons, links, active navigation, selected records, focus.
- Secondary brand colors -> supporting accents only when useful.
- Compatible tints -> backgrounds, muted surfaces, borders, status colors.
- Destructive stays red.
- No generic purple/blue unless brand/domain supports it.
- If `.tasks/domain.md` provides a usable logo path, including an org logo file inside a `logos` folder, use that actual logo in the header or primary app chrome.

## Tailwind Use

Use Tailwind for:

- shell dimensions
- topbar/tabs/command rows or explicitly required sidebar behavior
- spacing/gutters/grid tracks
- row rhythm
- table density
- status chips
- responsive behavior

Prefer larger section padding, wider gutters, taller row rhythm, and more space between control groups. Slightly over-spaced is acceptable; cramped is not.
Carry that spacing into inner content as well. Table rows, list rows, cards, badges, metadata groups, and inline actions should breathe; do not solve a data-dense view by cramming too many narrow columns onto one line.
When a table is surfaced as a primary or secondary working object, give it `shadow-xs`, generous header padding, and generous row padding by default.
If no selected domain skill overrides radius language, prefer rounded/pill-like controls and avoid defaulting to 4px/6px/8px-style admin radii.
If no selected domain skill defines the visual language, let the layout become more asymmetrical, expressive, and product-shaped instead of defaulting to safe symmetry.

## Cards

Do not import `Card` by default.

- No top-level cards.
- No large sibling `Card` panels.
- No card grids.
- No cards inside cards.
- Do not use card wrappers as generic spacing/grouping.
- No large rounded bordered hero/detail/inspector regions that still read like cards.

If a card-like wrapper remains, justify it inline. Acceptable reasons: unavoidable repeated item separation after row/divider options fail, dialog/popover/sheet containment, concise notice, or true emphasis.
If a card is unavoidable, it must have intentional tonal contrast from the canvas plus a visible but soft border. Same-white cards fail.

## Sidebars

Do not build a sidebar by default.

- Use a sidebar only when the user explicitly requested one or a selected domain skill explicitly requires one.
- Prefer topbar, tabs, segmented controls, breadcrumbs, command rows, step flows, sheets, drawers, or detail routes.
- If required, keep the sidebar narrow, quiet, and secondary.
- Never combine a sidebar with top-level cards or a card-heavy workspace.

## Depth

Use contact-edge depth only:

- Contact 0: no shadow plus low-opacity border.
- Contact 1: `0 0 0 1px rgba(16,24,40,0.07), 0 1px 0 rgba(16,24,40,0.08)`.
- Contact 2: `0 0 0 1px rgba(16,24,40,0.08), 0 1px 2px rgba(16,24,40,0.10)`.
- Contact 3: `0 0 0 1px rgba(16,24,40,0.08), 0 2px 3px rgba(16,24,40,0.10)` for floating UI only.

Prefer `shadow-2xs` for buttons and compact interactive controls.
Prefer `shadow-xs` for cards, tables, and similar contained surfaces.
Reserve `shadow-xl` for popovers and banners.
Reserve `shadow-2xl` for dialogs.
Avoid `shadow-sm`, `shadow-md`, `shadow-lg`, blur halos, muddy gray clouds, colored glows, and heavy card shadows as broad defaults.
Depth should read as soft, tight edge contact, not lift.
Soft means the edge is diffused and not harsh. It does not mean the shadow must be extremely faint; a decently gray tight shadow is acceptable when needed for contrast.

## shadcn Components

Add only components required by the workflow. Common examples:

```bash
npx shadcn@latest add button input label select textarea badge separator dialog dropdown-menu table avatar tooltip scroll-area sheet popover tabs checkbox radio-group
```

Do not install components because dashboard examples usually include them.

## Typography

- Avoid generic defaults like Arial and Inter.
- Choose a more beautiful and distinctive font direction.
- Prefer a characterful display face plus a refined body face when the product can support it.
- Encode that choice into the actual theme and component styling instead of mentioning it only in planning text.

## QA

Before finishing:

- Theme variables are configured before component styling.
- Domain brand colors are mapped when present.
- Major groups have generous gaps.
- Inner row/table/card content has generous gaps too and is not cramped by too many same-line columns.
- Surfaced tables use `shadow-xs` and generous header/body padding.
- No top-level cards exist.
- Any remaining card is unavoidable and justified.
- No large hero/detail/inspector surface still reads like a card.
- Major surfaces separate from the canvas through tone, not only border.
- Inputs, search/filter controls, and header/nav chrome read clearly against the page background in both light and dark modes.
- If no selected domain skill overrides radius language, controls and key UI surfaces read clearly as a rounded modern system.
- Typography feels intentional and distinctive rather than default.
- If a sidebar is required, it uses a darker primary-derived tone rather than a pale generic surface.
- If no selected domain skill fit the app, the theme and composition still feel authored rather than like a default admin shell.
- No sidebar exists unless explicitly requested or required by selected domain skill.
- No heavy Tailwind shadows remain.
- `shadow-2xs` is used for buttons/small interactive items when shadow is needed.
- `shadow-xs` is used for cards/tables/similar contained surfaces when shadow is needed.
- Any use of `shadow-xl` is limited to popovers and banners.
- Any use of `shadow-2xl` is limited to dialogs.
- Buttons, links, menus, dialogs, tabs, forms, routes, and localStorage-backed state work.
