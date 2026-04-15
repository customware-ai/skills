---
name: frontend-design
description: Prevents generic AI/GPT UI patterns when generating frontend code. Use this skill whenever generating HTML, CSS, React, Vue, Svelte, or any frontend UI code to enforce clean, human-designed aesthetics inspired by real product teams instead of typical AI-generated UI.
---

# Frontend Design

This document exists to teach you how to act as non-GPT as possible when building UI.

GPT UI is the default AI aesthetic: soft gradients, floating panels, eyebrow labels, decorative copy, hero sections in dashboards, oversized rounded corners, transform animations, dramatic shadows, and layouts that try too hard to look premium. It's the visual language that screams "an AI made this" because it follows the path of least resistance.

This file is your guide to break that pattern. Everything listed below is what GPT UI does by default. Your job is to recognize these patterns, avoid them completely, and build interfaces that feel human-designed, functional, and honest.

When you read this document, you're learning what NOT to do. The banned patterns are your red flags. The normal implementations are your blueprint. Follow them strictly.

This is how you Un-GPTify.

## Internal Business Tool Context

The applications built with this skill are **internal business tools** — not public-facing marketing sites, consumer SaaS dashboards, or developer tools. The users are small to mid-size teams (3–30 people) accessing the app through an internal URL with role-based access control. They use these tools daily for operational work like quoting, inventory, ordering, and customer management.

**This changes several default assumptions:**

### Multi-panel layouts ARE appropriate
When a vertical skill (CPQ, CRM, ERP) defines a Layout Pattern with sidebars, that layout takes priority over the general density rules in this file. Internal tools often need:
- **Left sidebar** — navigation, role switcher, saved items list. This IS a sticky left rail and it IS appropriate for these tools. Do not fight it.
- **Right sidebar** — live summaries, contextual info. When the user is configuring a quote and needs to see the running total, a right sidebar IS the correct pattern. Do not hide it behind progressive disclosure.
- **Three-panel layout** — left nav + main content + right summary. This is standard for quoting, CRM, and operational tools. It is NOT "two dense columns competing for attention" — the sidebars are reference panels, the main content is the work area.

If a skill's Layout Pattern defines panels, follow it. The density rules below apply when NO skill layout is defined.

### Information density is higher than consumer apps
Internal tool users work in the app all day. They want to see relevant data at a glance, not click through progressive disclosure to find it:
- Show prices, totals, and status badges inline — don't hide them
- Tables can be denser than consumer UIs — users expect to scan rows quickly
- Form fields can use two-column layouts on wide screens to reduce scrolling
- Status indicators, role badges, and workflow notes are functional, not decorative

### Design references for internal tools
When making aesthetic decisions for these apps, think of these references:
- **Salesforce Lightning** — clean data tables, record detail views, action bars
- **HubSpot** — pipeline views, contact cards, deal summaries
- **Monday.com** — board views, status columns, assignment badges
- **Linear** — clean aesthetics AND density. The density of Linear is what matters, not just its minimalism
- **Notion** — sidebar navigation, page-based content, inline databases
- **Freshdesk** — ticket views, assignment, status workflows

### Metric cards ARE appropriate in operational summaries
Subtotal / Tax / Total displayed as metric cards in a quote preview is correct. This is not "metric-card grid as the first instinct" — it's a functional summary of calculated values the user needs to review. The ban on metric cards targets decorative KPI dashboards with fake charts, not operational summaries tied to real user actions.

### What still applies from the rules below
All anti-AI-aesthetic rules apply in full:
- No gradients, glassmorphism, or decorative effects
- No hero sections inside the app
- No decorative copy or eyebrow labels
- No oversized corners, dramatic shadows, or glow effects
- No pill-shaped everything
- No "premium dark SaaS" aesthetic
- No transform animations on hover
- Normal typography, spacing, borders, and shadows
- Brand colors from the project, not invented palettes

The goal is the same: build UI that looks human-designed and functional. The difference is that "functional" for an internal tool means showing more information in organized panels, not hiding it behind clicks.

## Layout Principles (Apply to All Verticals)

These principles apply regardless of which vertical skill is loaded. They define the universal patterns for every internal business tool.

### Section-based navigation, not single-page scroll
- **Only the active section renders in the main content area.** Clicking a stepper step or nav item shows ONLY that section's panel. All other sections are hidden.
- **Never stack all sections on one scrolling page.** This is the most common first-shot mistake. Each section occupies the FULL main content area by itself.
- **The stepper MUST control which section is visible.** Clicking "Configure" shows only the Configure panel. Use React state or React Router routes — not a dropdown buried inside the page.
- **Do NOT use a "current stage" dropdown for navigation.** The stepper IS the navigation.
- **Metadata (name, source, customer) belongs inside the relevant section** — not in a persistent top section above all panels. The only persistent elements are the left sidebar, right sidebar, and header.

### Navigation flow
- **Each section has a primary action button at the bottom** that advances to the next step. This is the happy path.
- **The stepper also allows free navigation.** The user can click any step at any time — the stepper is not a locked wizard. Completed steps show checkmarks.
- **"Back" buttons are optional** since the stepper provides backward navigation.
- **The primary action button should be the brand accent color.** Secondary buttons (Back, Delete) use outline style.

### Role switching (RBAC)
- If DOMAIN.md defines User Roles or a Stakeholder Map with named people, include a role switcher.
- **Place it in the header bar as a SINGLE dropdown** using shadcn `DropdownMenu`. The dropdown trigger shows the active role name and badge (e.g., "Jeff — Approver"). Clicking it opens a list of all roles. Selecting a role updates the view immediately.
- **Do NOT render roles as separate horizontal buttons in the header.** Four names as four buttons is wrong — it wastes space and looks like navigation, not a role switcher. One dropdown trigger, one dropdown menu. This is the same pattern as user profile menus in every SaaS app.
- Clicking a role changes what the user can see and do:
  - Buttons and actions gated by role should disable with a message when the active role lacks permission.
  - Filtered views should show only the work relevant to that role when appropriate.
- Store the active role in localStorage so it persists across refreshes.
- **Do NOT put non-functional buttons in the header.** The only header elements should be: company name/logo, current item name, role switcher dropdown, and theme toggle (if applicable).

### Persistent sidebars
- **Left sidebar** — always visible. Contains navigation (stepper or list) and any saved-items list. The role switcher lives in the header, NOT in the sidebar.
- **The skill's left sidebar content REPLACES the template's default sidebar.** This overrides template preservation rules. Modify the template's layout file to inject the skill's sidebar content into the existing sidebar slot. Do not render two separate sidebars. Do not implement the stepper as horizontal tabs because you're avoiding layout file changes. The skill layout takes priority. One left sidebar, not two.
- **Sidebar heading** should describe the navigation context (e.g., "Quote workflow," "Business process") — not repeat the company name, which is already in the header.
- **Preserve collapsible sidebar behavior.** If the template's sidebar has a toggle/collapse feature, keep it working. Do not rebuild the sidebar from scratch and lose the collapse.
- **Right sidebar** — if the skill defines one, it stays visible across all sections and updates in real time.
- If the skill does not define a right sidebar, use a two-panel layout (left sidebar + main content only).

### Prices and calculations
- If the domain involves pricing (quotes, orders, invoices), show prices on EVERY screen where products or options appear.
- Selection changes should immediately update any summary totals.
- Use the tax type from DOMAIN.md (HST = 13%, GST = 5%, etc.) and the currency (CAD, USD, etc.) in all price displays.

### Saved items
- If the domain involves creating records (quotes, orders, contacts, projects), include a saved-items list in the left sidebar showing items stored in localStorage.
- Each item shows its name and a status badge.
- Clicking an item loads it. A "New [item]" button creates a fresh one.
- **The saved items list must be visible without scrolling.** Use a split layout in the sidebar: stepper at the top (scrollable if needed), saved items pinned to the bottom (always visible). Do not push saved items below the fold.
- **Inline title editing.** Users should be able to rename a saved item quickly — either by double-clicking the name in the sidebar list, or by clicking a small edit icon next to the name.

### Constrained fields
- **Any field that references people, roles, or statuses from DOMAIN.md must be a dropdown (`Select`), not a free text input.** If the domain defines named people (Jeff, Andy, Dre, Manish), the "Assigned to" field is a `Select` with those four names — not an `Input` where someone could type anything. Same for lead source, request type, status, or any other field where valid values are defined by business rules. Free text inputs are only for fields where the user genuinely needs to enter arbitrary content (quote name, customer name, notes).

## Brand Theming (Apply to All Builds)

**Always read domain.md for brand colors before writing any CSS.** The domain.md Brand Details section contains `accent`, `dark`, and `light` colors. These are the source of truth for the app's visual identity. Do not leave the default template theme in place when brand colors are available. Do not invent a color palette when the brand provides one.

Map brand colors to the template's existing CSS variables in `app.css`. The variables already exist — you are REPLACING values, not creating new variables.

```css
:root {
  /* Main theme — replace these existing variables */
  --primary: hsl([accent color in HSL]);           /* buttons, links, active states */
  --primary-foreground: hsl(0 0% 100%);            /* text on primary buttons */
  --background: hsl([light color in HSL]);         /* main content background */
  --ring: hsl([accent color in HSL]);              /* focus rings */

  /* Sidebar theme — these variables also already exist in the template */
  --sidebar: hsl([dark color, LIGHTENED to ~30-35% lightness]);  /* mid-tone, not full dark */
  --sidebar-foreground: hsl(0 0% 100%);             /* light text on mid-tone sidebar */
  --sidebar-primary: hsl([accent color in HSL]);   /* active items in sidebar */
  --sidebar-primary-foreground: hsl(0 0% 100%);    /* text on active sidebar items */
  --sidebar-accent: hsl([dark color, slightly lighter than sidebar]); /* hover state */
  --sidebar-accent-foreground: hsl(0 0% 100%);     /* text on hover */
  --sidebar-border: hsl([dark color, slightly lighter than sidebar]); /* borders */
}
```

**Critical mapping rules:**
- **`accent` from domain.md → `--primary` AND `--sidebar-primary`** — this colors buttons, links, and active states. The most common mistake is mapping the `dark` color here instead — don't.
- **`dark` from domain.md → `--sidebar`, BUT LIGHTENED.** Do not use the raw dark color — it's too heavy. Take the dark color's HSL values and increase lightness to ~30-35%. The sidebar should feel like a tinted panel, not a black wall.
- **`light` from domain.md → `--background`** — main content area background.
- **Convert hex to HSL.** The template wraps values in `hsl()`.
- Also update the `.dark` section's sidebar variables to match.
- **Use the brand logo** in the top-left header if a logo path is provided.
- **Use the company name** in the header, not "Customware Template."
- **Light mode by default.** Set light mode as the default. Do not ship in dark mode. The sidebar uses a mid-tone tinted version of the brand's dark color. The main content area and right sidebar use the brand's light color or white.

## Visual Quality (Apply to All Builds)

### Whitespace and density
- **Generous spacing.** Use `gap: 16px` to `24px` between cards and sections. Avoid cramming content.
- **Section padding.** Main content area should have `24px` to `32px` padding. Sidebar padding should be `16px`.
- **Card breathing room.** Cards should have `16px` to `20px` internal padding.
- **Visual hierarchy.** Section headings are large and bold. Descriptions under headings are smaller and muted. Labels are small and secondary-colored. Values are normal weight, primary-colored.

### Component styling
- **Cards** — light backgrounds (`--card` or white), subtle borders, rounded corners (`8px` to `12px`). No heavy borders or drop shadows.
- **Badges** — small, pill-shaped, colored by semantic meaning (draft = amber/warning, sent = blue/info, approved = green/success).
- **Buttons** — primary action uses the brand accent color. Secondary actions use outline style. Destructive actions use red/danger.
- **Form inputs** — clean borders, adequate height (`36px` to `40px`), clear focus states with the brand accent color.
- **Tables** — clean header row with subtle background, aligned columns. No heavy grid lines — use subtle bottom borders only.

### Stepper and navigation styling
- **Active step** — highlighted with the brand accent color on the left border and background tint.
- **Completed steps** — show a checkmark icon in the step number circle, with a success-colored background.
- **Pending steps** — muted text and empty circle.

### Right sidebar styling
- **Summary cards** — compact rows with label (muted) on the left and value (bold) on the right. A divider before the total row. Total should be the largest text in the card.
- **Workflow notes** — smaller text, muted, with bullet points or small colored dots. Reference material, not primary content.

### Avoid these common first-shot mistakes
- Full dark theme when the brand has light colors
- Generic template branding left in place
- Dense, cramped layouts with no breathing room
- All text the same size and weight
- Heavy borders and thick dividers
- Buttons without the brand accent color
- Status badges that are all the same color
- Tables with heavy grid lines instead of subtle row borders
- RBAC roles as horizontal buttons instead of a dropdown
- Saved items pushed below the fold
- Free text inputs where dropdowns should enforce valid options

## Generic Layout Fallback

When NO skill is loaded, or the loaded skill does not include a Layout Pattern section, use this default:

### Two-panel layout
- **Left sidebar** — navigation listing the main entities from the task or DOMAIN.md. Saved items list below.
- **Main content** — list/detail pattern. Each nav item shows a list view. Clicking an item opens a detail/edit view.
- **CRUD for each entity** — create, read, update, delete with localStorage persistence.
- **No right sidebar** — keep it simple without a skill to define what goes there.
- **Role switcher in the header** if DOMAIN.md has roles — same dropdown pattern as all other apps.

## Component Libraries

- **Use shadcn/ui components** from `~/components/ui/*` as the primary building blocks. Prefer `Card`, `Button`, `Badge`, `Input`, `Select`, `Checkbox`, `RadioGroup`, `Table`, `Separator`, `ScrollArea`, and `Popover` over custom HTML. If a needed component is not installed, install it with `npx shadcn@latest add [component]`.

## Keep It Normal (Un-GPTified UI Standard)

- Sidebars: normal (240-260px fixed width, solid background, simple border-right, no floating shells, no rounded outer corners)
- Headers: normal (simple text, no eyebrows, no uppercase labels, no gradient text, just h1/h2 with proper hierarchy)
- Sections: normal (standard padding 20-30px, no hero blocks inside dashboards, no decorative copy)
- Navigation: normal (simple links, subtle hover states, no transform animations, no badges unless functional)
- Buttons: normal (solid fills or simple borders, 8-10px radius max, no pill shapes, no gradient backgrounds)
- Cards: normal (simple containers, 8-12px radius max, subtle borders, no shadows over 8px blur, no floating effect)
- Forms: normal (standard inputs, clear labels above fields, no fancy floating labels, simple focus states)
- Inputs: normal (solid borders, simple focus ring, no animated underlines, no morphing shapes)
- Modals: normal (centered overlay, simple backdrop, no slide-in animations, straightforward close button)
- Dropdowns: normal (simple list, subtle shadow, no fancy animations, clear selected state)
- Tables: normal (clean rows, simple borders, subtle hover, no zebra stripes unless needed, left-aligned text)
- Lists: normal (simple items, consistent spacing, no decorative bullets, clear hierarchy)
- Tabs: normal (simple underline or border indicator, no pill backgrounds, no sliding animations)
- Badges: normal (small text, simple border or background, 6-8px radius, no glows, only when needed)
- Avatars: normal (simple circle or rounded square, no decorative borders, no status rings unless functional)
- Icons: normal (simple shapes, consistent size 16-20px, no decorative icon backgrounds, monochrome or subtle color)
- Typography: normal (system fonts or simple sans-serif, clear hierarchy, no mixed serif/sans combos, readable sizes 14-16px body)
- Spacing: normal (consistent scale 4/8/12/16/24/32px, no random gaps, no excessive padding)
- Information density: normal (one primary task or reading surface per screen, secondary context revealed progressively, no competing columns by default)
- Borders: normal (1px solid, subtle colors, no thick decorative borders, no gradient borders)
- Shadows: normal (subtle 0 2px 8px rgba(0,0,0,0.1) max, no dramatic drop shadows, no colored shadows)
- Transitions: normal (100-200ms ease, no bouncy animations, no transform effects, simple opacity/color changes)
- Layouts: normal (standard grid/flex, no creative asymmetry, predictable structure, clear content hierarchy, and a clear primary surface)
- Grids: normal (consistent columns, standard gaps, no creative overlaps, responsive breakpoints, and only use multi-column when the content benefits from side-by-side comparison)
- Flexbox: normal (simple alignment, standard gaps, no creative justify tricks)
- Containers: normal (max-width 1200-1400px, centered, standard padding, no creative widths)
- Wrappers: normal (simple containing divs, no decorative purposes, functional only)
- Panels: normal (simple background differentiation, subtle borders, no floating detached panels, no glass effects, and no always-open companion panels unless they are essential or defined by a skill Layout Pattern)
- Toolbars: normal (simple horizontal layout, standard height 48-56px, clear actions, no decorative elements)
- Footers: normal (simple layout, standard links, no decorative sections, minimal height)
- Breadcrumbs: normal (simple text with separators, no fancy styling, clear hierarchy)

## Density Rules

**Exception: Skill-defined layouts.** When a vertical skill (e.g., cpq-builder, crm-builder) includes a Layout Pattern section that specifies panels, sidebars, or multi-column layouts, follow the skill's layout. The density rules below apply as defaults when no skill layout is defined.

- A screen should have one dominant surface. If the main job is filling a form, the form is the surface. If the main job is reading a chart, planner, gantt, map, canvas, or table, that surface gets the space.
- Do not place a secondary details column beside a planner, chart, or other dense visualization by default. Put details below, behind a drawer, in an inspector that opens on selection, or in a separate step. **Exception: live quote/order summaries that update as the user configures — these DO require simultaneous visibility and belong in a side panel.**
- Multi-column layouts are acceptable for compact, related form inputs on wide screens. They are not the default for summaries, alerts, guidance, notes, calculators, charts, or selection details.
- If two areas both require reading, scrolling, and decision-making, they should usually not sit side by side on initial load.
- Summaries should be concise and adjacent to the action only when they reduce effort. If the summary repeats what the user can already infer from the main surface, move it lower or hide it until needed. **Exception: CPQ and order-building workflows where the user needs running totals while selecting options — the summary MUST be visible during configuration.**
- Warnings, tips, and helper notes should not all be visible at once. Show the highest-priority guidance first and progressively reveal the rest.
- On desktop, extra width is not a reason to add another column. Empty space is better than a cluttered second rail. **Exception: when a skill defines a right sidebar for a specific purpose (live totals, workflow notes), that sidebar is justified.**
- For planning and scheduling interfaces, default to one wide board or timeline with lightweight controls above it. Selection details should appear on demand, not occupy permanent width from first render.

Think Salesforce. Think HubSpot. Think Linear. Think Monday.com. They don't try to grab attention. They organize information so people can do their jobs. Make normal UI for people who use it all day.

## Hard No

- Everything you are used to doing and is a basic "YES" to you.
- No oversized rounded corners.
- No pill overload.
- No floating glassmorphism shells as the default visual language.
- No soft corporate gradients used to fake taste.
- No generic dark SaaS UI composition.
- No decorative sidebar blobs.
- No "control room" cosplay unless explicitly requested.
- No serif headline + system sans fallback combo as a shortcut to "premium."
- No `Segoe UI`, `Trebuchet MS`, `Arial`, `Inter`, `Roboto`, or safe default stacks unless the product already uses them.
- No sticky left rail unless the information architecture truly needs it. **Exception: when a skill Layout Pattern defines a left sidebar with navigation, role switcher, or saved items — that IS a true need.**
- No metric-card grid as the first instinct. **Exception: operational summaries (subtotal/tax/total) tied to real user actions — these are functional, not decorative.**
- No fake charts that exist only to fill space.
- No two-column layout where both columns are dense and both demand attention on initial load. **Exception: three-panel layouts defined by a skill where sidebars are reference panels and the center is the work area — these are not competing columns.**
- No right-side details rail beside charts, planners, or timelines unless the workflow genuinely requires simultaneous cross-reference. **Exception: live quote/order summaries that update as the user configures options.**
- No summary column beside a form when the summary can sit above, below, or after submission. **Exception: CPQ and order-building workflows where running totals must be visible during configuration, not after.**
- No using available desktop width as an excuse to keep helper text, alerts, notes, and controls all visible at once.
- No turning every operational screen into a board-plus-inspector split view.
- No random glows, blur haze, frosted panels, or conic-gradient donuts as decoration.
- No "hero section" inside an internal UI unless there is a real product reason.
- No alignment that creates dead space just to look expensive.
- No overpadded layouts.
- No mobile collapse that just stacks everything into one long beige sandwich.
- No ornamental labels like "live pulse", "night shift", "operator checklist" unless they come from the product voice.
- No generic startup copy.
- No style decisions made because they are easy to generate.

- No Headlines of any sort

```html
<div class="headline">
  <small>Team Command</small>
  <h2>One place to track what matters today.</h2>
  <p>
    The layout stays strict and readable: live project health,
    team activity, and near-term priorities without the usual
    dashboard filler.
  </p>
</div>
```

This is not allowed.

- `<small>` headers are NOT allowed
- Big no to rounded `span`s
- Colors going towards blue -- **NOPE, bad.** Dark muted colors are best.

- Anything in the structure of this card is a **BIG no**.

```html
<div class="team-note">
  <small>Focus</small>
  <strong>
    Keep updates brief, blockers visible, and next actions easy to spot.
  </strong>
</div>
```

This one is **THE BIGGEST NO**.


## Specifically Banned (Based on Mistakes)

- Border radii in the 20px to 32px range across everything (uses 12px everywhere - too much)
- Repeating the same rounded rectangle on sidebar, cards, buttons, and panels
- Sidebar width around 280px with a brand block on top and nav links below (248px with brand block)
- Floating detached sidebar with rounded outer shell
- Canvas chart placed in a glass card with no product-specific reason
- Donut chart paired with hand-wavy percentages
- UI cards using glows instead of hierarchy
- Mixed alignment logic where some content hugs the left edge and some content floats in center-ish blocks
- Dense two-column application shells where the main work area and the supporting context panel both scroll and compete for attention (skill-defined three-panel layouts with reference sidebars are NOT this)
- Overuse of muted gray-blue text that weakens contrast and clarity
- "Premium dark mode" that really means blue-black gradients plus cyan accents (radial gradients in background)
- UI typography that feels like a template instead of a brand
- Eyebrow labels ("MARCH SNAPSHOT" uppercase with letter-spacing)
- Hero sections inside dashboards (full hero-strip with decorative copy)
- Decorative copy like "Operational clarity without the clutter" as page headers
- Section notes and mini-notes everywhere explaining what the UI does
- Transform animations on hover (translateX(2px) on nav links)
- Dramatic box shadows (0 24px 60px rgba(0,0,0,0.35))
- Status indicators with ::before pseudo-elements creating colored dots
- Muted labels with uppercase + letter-spacing (overuses this pattern)
- Pipeline bars with gradient fills (linear-gradient(90deg, var(--primary), #4fe0c0))
- KPI cards in a grid as the default dashboard layout (3-column kpi-grid)
- Form plus estimate-summary side-by-side layouts where the summary is visible before the user has entered enough data to need it (skill-defined CPQ summaries that update live ARE appropriate)
- Gantt, planner, and chart screens with a permanent details column that steals width from the main visualization
- "Team focus" or "Recent activity" panels with decorative internal copy
- Tables with tag badges for every status (overuses .tag class)
- Workspace blocks in sidebar with call-to-action buttons
- Brand marks with gradient backgrounds (linear-gradient(135deg, #2a2a2a, #171717))
- Nav badges showing counts or "Live" status (nav-badge class)
- Quota/usage panels with progress bars (three quota sections)
- Footer lines with meta information ("Northstar dashboard • dark mode • single-file HTML")
- Trend indicators with colored text (trend-up, trend-flat classes)
- Rail panels on the right side with "Today" schedule (full right rail) — unless the rail is defined by a skill Layout Pattern for a specific operational purpose
- Multiple nested panel types (panel, panel-2, rail-panel, table-panel)



## Rule

If a UI choice feels like a default AI UI move, ban it and pick the harder, cleaner option.
- Colors should stay calm, not fight.

- You are bad at picking colors follow this priority order when selecting colors:

1. **Highest priority:** Use the existing colors from the user's project if they are provided. Check the domain.md, brand details, or app.css for brand colors. Map the brand accent to `--primary`, brand dark to sidebar/header backgrounds, brand light to content backgrounds.
2. If the project does not provide a palette, **get inspired from one of the predefined palettes below**.
3. Do **not invent random color combinations** unless explicitly requested.
4. **Default to light mode** for internal business tools. Most business users expect light mode. Dark sidebars using the brand's dark color are acceptable. Full dark theme is NOT the default.

You do not have to always choose the first palette. Select one randomly when drawing inspiration.
---

# Dark Color Schemes

| Palette | Background | Surface | Primary | Secondary | Accent | Text |
|--------|-----------|--------|--------|----------|--------|------|
| Midnight Canvas | `#0a0e27` | `#151b3d` | `#6c8eff` | `#a78bfa` | `#f472b6` | `#e2e8f0` |
| Obsidian Depth | `#0f0f0f` | `#1a1a1a` | `#00d4aa` | `#00a3cc` | `#ff6b9d` | `#f5f5f5` |
| Slate Noir | `#0f172a` | `#1e293b` | `#38bdf8` | `#818cf8` | `#fb923c` | `#f1f5f9` |
| Carbon Elegance | `#121212` | `#1e1e1e` | `#bb86fc` | `#03dac6` | `#cf6679` | `#e1e1e1` |
| Deep Ocean | `#001e3c` | `#0a2744` | `#4fc3f7` | `#29b6f6` | `#ffa726` | `#eceff1` |
| Charcoal Studio | `#1c1c1e` | `#2c2c2e` | `#0a84ff` | `#5e5ce6` | `#ff375f` | `#f2f2f7` |
| Graphite Pro | `#18181b` | `#27272a` | `#a855f7` | `#ec4899` | `#14b8a6` | `#fafafa` |
| Void Space | `#0d1117` | `#161b22` | `#58a6ff` | `#79c0ff` | `#f78166` | `#c9d1d9` |
| Twilight Mist | `#1a1625` | `#2d2438` | `#9d7cd8` | `#7aa2f7` | `#ff9e64` | `#dcd7e8` |
| Onyx Matrix | `#0e0e10` | `#1c1c21` | `#00ff9f` | `#00e0ff` | `#ff0080` | `#f0f0f0` |

---

# Light Color Schemes

| Palette | Background | Surface | Primary | Secondary | Accent | Text |
|--------|-----------|--------|--------|----------|--------|------|
| Cloud Canvas | `#fafafa` | `#ffffff` | `#2563eb` | `#7c3aed` | `#dc2626` | `#0f172a` |
| Pearl Minimal | `#f8f9fa` | `#ffffff` | `#0066cc` | `#6610f2` | `#ff6b35` | `#212529` |
| Ivory Studio | `#f5f5f4` | `#fafaf9` | `#0891b2` | `#06b6d4` | `#f59e0b` | `#1c1917` |
| Linen Soft | `#fef7f0` | `#fffbf5` | `#d97706` | `#ea580c` | `#0284c7` | `#292524` |
| Porcelain Clean | `#f9fafb` | `#ffffff` | `#4f46e5` | `#8b5cf6` | `#ec4899` | `#111827` |
| Cream Elegance | `#fefce8` | `#fefce8` | `#65a30d` | `#84cc16` | `#f97316` | `#365314` |
| Arctic Breeze | `#f0f9ff` | `#f8fafc` | `#0284c7` | `#0ea5e9` | `#f43f5e` | `#0c4a6e` |
| Alabaster Pure | `#fcfcfc` | `#ffffff` | `#1d4ed8` | `#2563eb` | `#dc2626` | `#1e293b` |
| Sand Warm | `#faf8f5` | `#ffffff` | `#b45309` | `#d97706` | `#059669` | `#451a03` |
| Frost Bright | `#f1f5f9` | `#f8fafc` | `#0f766e` | `#14b8a6` | `#e11d48` | `#0f172a` |

---
