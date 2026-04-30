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

## Light Surface System

- Page background: tinted pale gray, stone, cream, porcelain, glacier, or brand-derived tint.
- App canvas: lighter off-white/porcelain, not raw white everywhere.
- Navigation chrome: quiet tone, not saturated slab.
- Focal surface: clear tonal difference, not a repeated large card.
- Inputs: near-white and clearly editable.
- Borders: soft but visible and selective.
- Popovers/sheets/dialogs: clear separation with contact-edge depth.

Do not use the same white for body, app frame, cards, popovers, inputs, and controls.
Navigation chrome must remain visibly distinct from the main canvas.
Do not rely on a faint border alone to separate a major surface from the canvas.

## Brand Mapping

- Main brand/accent -> `--primary`, primary buttons, links, active navigation, selected records, focus.
- Secondary brand colors -> supporting accents only when useful.
- Compatible tints -> backgrounds, muted surfaces, borders, status colors.
- Destructive stays red.
- No generic purple/blue unless brand/domain supports it.

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

Avoid `shadow-md`, `shadow-lg`, `shadow-xl`, blur halos, muddy gray clouds, colored glows, and heavy card shadows.
Depth should read as soft, tight edge contact, not lift.

## shadcn Components

Add only components required by the workflow. Common examples:

```bash
npx shadcn@latest add button input label select textarea badge separator dialog dropdown-menu table avatar tooltip scroll-area sheet popover tabs checkbox radio-group
```

Do not install components because dashboard examples usually include them.

## QA

Before finishing:

- Theme variables are configured before component styling.
- Domain brand colors are mapped when present.
- Major groups have generous gaps.
- No top-level cards exist.
- Any remaining card is unavoidable and justified.
- No large hero/detail/inspector surface still reads like a card.
- Major surfaces separate from the canvas through tone, not only border.
- No sidebar exists unless explicitly requested or required by selected domain skill.
- No heavy Tailwind shadows remain.
- Buttons, links, menus, dialogs, tabs, forms, routes, and localStorage-backed state work.
