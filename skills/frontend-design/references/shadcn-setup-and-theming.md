# Shadcn Setup And Theming

Use this reference when implementing a shadcn/ui + Tailwind app or updating an existing app theme.

## Core Rule

Theme before building detailed UI. shadcn/ui and Tailwind are accelerators, not fidelity limits. If the component defaults do not match the desired product direction, configure CSS variables, Tailwind tokens, and targeted component styles instead of accepting drift.

Skipping token setup before screen construction is a design failure.

## Implementation Order

1. Inspect the generated or existing project structure before editing:
   - `components.json`
   - global CSS such as `src/index.css`, `src/app.css`, or `app.css`
   - `tailwind.config.*` or equivalent theme config
   - `src/App.tsx`, routes, layouts, and existing `components/ui/*`
   - `package.json`
2. Read brand/domain inputs and selected domain skill rules.
3. Define design tokens before component work.
4. Update global CSS variables and Tailwind theme extension first.
5. Add only the shadcn components needed by the actual UI.
6. Build screens using the theme tokens rather than hardcoded visual decisions.

After step 4, explicitly verify the intended variables exist in the real CSS/config files before continuing.

## Theme Variables

Configure both light and dark variables when the project supports dark mode. Light mode is the default unless explicitly requested otherwise.

At minimum, set or verify these exact roles:

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
- chart/status colors when charts or statuses appear

Map tokens by role, not by copying brand colors into every variable.

Do not proceed to component layout until these roles are configured in the real theme layer. If the project uses `tailwind.config.*`, confirm it consumes the variables or exposes equivalent theme tokens.

## Light Mode Surface System

Light mode must have visible surface hierarchy:

- Page background: tinted pale cool gray, glacier, porcelain, stone, cream, or faint blue-gray.
- App canvas: lighter off-white or porcelain, not raw white.
- Navigation chrome: slightly darker, cooler, or more tinted than the app canvas.
- Focal surfaces: subtly brighter than the app canvas, but not repeated everywhere.
- Inputs: near-white and clearly editable.
- Borders: low-contrast and selective.
- Popovers/sheets: clear but calm separation from the canvas.

Do not use the same white for body, app frame, cards, popovers, inputs, and controls.

## Brand Color Mapping

- Use the primary brand/accent color for `--primary`, primary buttons, links, selected records, and active navigation.
- Use secondary brand colors for supporting accents only when useful.
- Derive backgrounds and surfaces from compatible tints, not raw brand fills.
- Keep `--input`, `--muted`, `--border`, and neutral surfaces readable and restrained.
- Keep destructive actions red, not brand-colored.
- Avoid defaulting to purple or blue unless the brand/domain supports it.
- If `.tasks/domain.md` lists brand colors, read and summarize them before choosing tokens.

## Tailwind And Component Overrides

Use theme variables for common visual roles. Use Tailwind utilities for app-specific composition:

- shell dimensions
- sidebar/topbar width and behavior
- spacing and grid tracks
- table density
- row treatment
- status chip variants
- responsive behavior

Do not fight shadcn defaults one component at a time when a variable would solve the issue globally. Do not overgeneralize one-off details into global variables.

If Tailwind utilities are not enough, add small custom CSS classes based on the chosen design tokens.

Default spacing should be generous. Prefer larger section padding, wider gutters, taller row rhythm, and more space between control groups. A slightly over-spaced layout is acceptable; a cramped layout is not.

## Radius System

Use a consistent radius scale:

- Largest radius for app shells or major containers.
- Smaller shared radius for focal surfaces.
- Medium radius for rows, inputs, buttons, tabs, and popovers.
- Pill or small radius for badges, chips, and icon buttons.

Avoid random radius values. Avoid timid default 4/6/8px ladders unless the whole UI is intentionally sharp and editorial. Avoid making every object a large rounded card.

## Elevation System

Prefer crisp contact-edge elevation over classic drop shadows:

- Contact 0: no shadow plus a low-opacity border.
- Contact 1: `0 0 0 1px rgba(16,24,40,0.07), 0 1px 0 rgba(16,24,40,0.08)`.
- Contact 2: `0 0 0 1px rgba(16,24,40,0.08), 0 1px 2px rgba(16,24,40,0.10)`.
- Contact 3: `0 0 0 1px rgba(16,24,40,0.08), 0 2px 3px rgba(16,24,40,0.10)` for popovers or floating controls only.

Use elevation selectively on active nav, selected rows, popovers, compact floating controls, important notices, and one focal surface when needed.

Avoid `shadow-md`, `shadow-lg`, `shadow-xl`, broad blur halos, muddy gray clouds, colored glows, and heavy card shadows.

## Cards And Panels

Cards are not the default unit of layout.

- Do not use top-level cards. The app's main layout must not be large sibling `Card` panels.
- Top-level structure should use open sections, tonal bands, rows, dividers, workspace areas, and at most one authored focal surface.
- Do not import `Card` by default.
- If importing `Card`, justify the specific usage inline. Acceptable reasons are repeated item separation, selected/detail framing, dialog/popover containment, concise notice, or true emphasis.
- Use open sections, rows, dividers, bands, and typography first.
- Use a card only for a highlighted state, repeated item that truly needs separation, popover/dialog/detail framing, or a concise notice.
- Do not build card grids by default.
- Do not put cards inside cards.
- Do not separate every major region by a bordered rounded shell.

## shadcn Component Use

Add only components the UI needs. Common components:

```bash
npx shadcn@latest add button input label select textarea badge separator dialog dropdown-menu table avatar tooltip scroll-area sheet popover tabs checkbox radio-group
```

Adjust the list to the workflow. Do not install components just because they are common in dashboards.

## Practical QA

Before considering UI work complete:

- Theme variables are configured before component-specific styling.
- The exact theme variables exist in the real CSS/Tailwind files.
- Domain brand colors were read and mapped when present.
- Light mode does not collapse into one flat white surface.
- Major groups have generous gaps and the screen does not feel compressed.
- Primary and selected states use the intended accent.
- Inputs look editable.
- Cards are scarce and justified.
- Shadows are tight and contact-like.
- No unjustified `Card` imports or heavy Tailwind shadows remain.
- All buttons, links, menus, dialogs, tabs, and forms work.
- LocalStorage-backed state persists after refresh when the app is frontend-only.
