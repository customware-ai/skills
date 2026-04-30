---
name: frontend-design
description: >
  General frontend design guidance for building modern, minimal, airy, non-generic app UIs.
  Use whenever creating or changing frontend UI, React components, shadcn/ui themes,
  Tailwind styles, app layouts, or first-version product screens. This skill complements
  vertical/domain skills like CPQ, CRM, and similar app builders: follow the selected domain
  skill's required workflow and layout first, then use this skill for visual direction,
  theming quality, spacing, typography, surface hierarchy, and anti-pattern avoidance.
---

# Frontend Design

Use this skill to make app UI feel intentionally designed rather than generated from default component-library patterns.

This is not a domain workflow skill. It does not decide the app category or required product flow. If another selected vertical/domain skill, like CPQ or CRM, defines required sections, navigation, tables, documents, entity flows, or output views, follow that structure. Apply this skill to improve the visual language, theme, spacing, hierarchy, component treatment, and implementation quality inside that structure.

## Required References

Before designing or implementing UI, read both reference files for the full design context. Skipping either reference is a skill violation. In the sandbox, the files are installed at:

- `.agents/skills/frontend-design/references/visual-style-references.md` for the visual quality bar, composition principles, card avoidance, spacing, typography, colors, shadows, and common failure modes.
- `.agents/skills/frontend-design/references/shadcn-setup-and-theming.md` for the implementation order, CSS variable setup, Tailwind/shadcn theming, radius/elevation tokens, and component treatment.

Do not rely only on this `SKILL.md` when making visual decisions. The reference files contain the detailed rules.

## Required Domain And Brand Read

Before any visual planning:

1. Read the active task and domain context.
2. Read `.tasks/domain.md` when it exists.
3. Extract and summarize the available brand colors, logo notes, domain tone, and product constraints.
4. Map brand colors to theme roles before choosing UI colors:
   - primary: main brand/accent color for primary action, active navigation, selected state, and focus.
   - secondary/accent: supporting brand color only when it helps hierarchy.
   - background/surface/border/muted/status: derived compatible tints, not raw brand floods.

If `domain.md` provides brand colors, ignoring them or defaulting to generic purple/blue is a failure.

## Role Of This Skill

- Preserve the app's required workflow and layout from the task, domain context, or selected domain skill.
- Use brand colors when provided, but build a full supporting palette from color theory instead of applying brand colors everywhere.
- Prefer modern, minimal, clean, airy interfaces with strong product specificity.
- Bias strongly toward airy layouts with generous gaps, gutters, and breathing room. Too much spacing is acceptable; cramped spacing is a failure.
- Avoid generic AI/SaaS defaults, especially purple/blue bias, card grids, bootstrap-like panels, and enterprise admin clutter.
- Use shadcn/ui as the component foundation, not as the visual ceiling.

## Design Pass Before Code

Before building a new UI or major screen, produce a short internal design pass:

1. **Vision**: define the app's design direction from the domain and user task. State the mood, palette direction, layout idea, and what generic pattern it must avoid.
2. **First-version features**: identify the specific working screens, controls, routes, dialogs, and localStorage-backed state needed for the first version.
3. **Design tokens**: choose the primary, secondary, background, surface, text, border, radius, shadow/contact, status, and typography direction.

Iterate on those three steps until the design is specific and coherent. Only then start implementation.

## Design Compliance Gate

Before coding, pass this gate. If any answer is weak, revise the design pass first.

- Brand: Did I read and summarize `.tasks/domain.md` brand colors when present, and map them into theme roles?
- References: Did I read both frontend-design references from `.agents/skills/frontend-design/references/`?
- Theme: Do I know the exact CSS variables and Tailwind tokens I will update before component work?
- Surface hierarchy: Does the screen have clear page, canvas, and focal layers without many cards?
- Cards: Can each planned card be justified as repeated separation, selected/detail framing, dialog/popover containment, or a concise highlighted state?
- Shadows: Are shadows limited to contact-edge tokens and not Tailwind `shadow-md`, `shadow-lg`, broad blur, glow, or halo effects?
- Domain fit: Does the UI feel specific to this domain and task, not a generic admin template with renamed labels?

## Implementation Order

1. Read the domain/task and any selected domain skill.
2. Read both references in `.agents/skills/frontend-design/references/`.
3. Decide the vision, first-version features, and design tokens.
4. Update theme foundations first:
   - `app.css` or the app's global CSS variables.
   - Tailwind config or theme extension when the project uses one.
   - shadcn/ui CSS variables for `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, `radius`, and chart/status colors when needed.
5. Build the UI using those tokens instead of hardcoding one-off colors.
6. Verify all buttons, links, routes, dialogs, menus, inputs, and localStorage state actually work.

After token setup, verify the exact variables exist in the actual files before building screen details. Do not assume shadcn defaults are acceptable.

## Default Design Direction

- Light mode first unless the product, brand, or user explicitly calls for dark mode.
- Use tinted off-white, porcelain, glacier, stone, or warm neutral page backgrounds instead of raw white everywhere.
- Separate page background, app canvas, navigation chrome, focal surfaces, popovers, and inputs with subtle but visible tonal differences.
- Use one or two accents purposefully for active states, primary actions, selected records, and important inline signals.
- Choose good UI fonts with personality and readability. Do not use typewriter/blog fonts for app UI.
- Use generous spacing and fewer visible modules. Empty space is a design material, not unused capacity.
- When choosing between compact and spacious, choose spacious. Prefer noticeably large gaps between major groups, controls, records, and sections.
- Prefer inline sections, bands, rows, dividers, typography, and tonal grouping over boxes around everything.

## Cards Rule

Cards are an exception, not the default layout primitive.

- Never use top-level cards as the primary page layout. The main screen should not be a grid or stack of large rounded panels.
- Top-level regions must be open layout, tonal bands, rows, dividers, workspace sections, or authored surfaces directly on the app canvas.
- Do not import or use a `Card` component by default.
- If importing `Card`, add an inline justification near the import or first usage explaining why a card is needed for that specific element.
- Do not turn every section into a floating rounded rectangle.
- Do not build dashboards from repeated KPI cards, helper cards, note cards, and summary cards.
- Inline content into the page body whenever spacing, typography, dividers, or a tinted band can provide enough structure.
- Use cards only when an element truly needs emphasis, separation, repetition, dialog/detail framing, or a concise highlighted state.
- Avoid cards inside cards and grids of equal-weight panels.
- If a selected domain skill requires a specific navigation model, document, table, workflow, entity view, or output surface, keep that structure but make the internal treatment de-carded and airy where possible.

## Brand And Theming

- Use project/domain brand colors when available.
- Map the main brand/accent color to primary actions and selected states.
- Use a secondary brand color only when it supports the hierarchy.
- Derive backgrounds, surfaces, borders, muted text, and status colors from compatible tones; do not flood the UI with raw brand colors.
- Avoid generic purple/blue defaults unless the brand or domain clearly supports them.
- Configure theme values in the actual theme layer, not scattered hardcoded classes.
- If a logo exists, render it robustly with a fallback initials mark. Do not reference app-specific components that may not exist.

## Relationship To Domain Skills

- Domain skills own product structure, workflow requirements, information architecture, and domain-specific UI patterns.
- This skill owns visual quality: theme, spacing, typography, surface hierarchy, card restraint, color treatment, radius, shadow, and polish.
- Do not copy domain-specific layout decisions into this skill. If a domain skill changes, follow that skill directly.
- Make selected domain-skill layouts more modern, minimal, and intentional without replacing their required structure.

If a selected skill's design suggestion would make the UI ugly, dated, over-carded, or bootstrappy, preserve the functional structure but improve the visual treatment using this skill.

## Hard Avoids

- Generic SaaS purple/blue look.
- Bootstrap/admin-template surfaces.
- Card-heavy dashboards.
- Same-white page, canvas, nav, panels, inputs, and popovers.
- Heavy shadows, shadow halos, glassmorphism, glow effects, decorative gradients.
- Enterprise slabs, dense KPI strips, helper-card walls, and generic left-sidebar-plus-card-grid layouts.
- Decorative marketing hero sections inside operational apps.
- Fake charts, fake metrics, and filler modules.
- Oversized pill everything or inconsistent radius scales.
- Broken logo images, invalid links, dead buttons, inert menus, and placeholder routes.

## Pre-Completion Anti-Card Audit

Before finishing UI work, inspect the implementation and revise if needed:

- Search for `Card`, `card`, `shadow-md`, `shadow-lg`, `shadow-xl`, and repeated `rounded-* border bg-card` patterns.
- Reject top-level cards. Convert large page-level panels into open sections, tonal bands, rows, dividers, workspace areas, or a single authored focal surface.
- Remove cards that can become open sections, rows, dividers, tonal bands, or inline groups.
- Keep only cards with a clear purpose: repeated item separation, selected/detail framing, popover/dialog/sheet containment, concise notice, or true emphasis.
- Replace heavy Tailwind shadows with contact-edge token classes or explicit contact-edge box shadows.
- Confirm brand-derived `primary`, `secondary/accent`, `background`, `surface/card`, `muted`, `border`, `input`, `ring`, `radius`, and status variables are configured in CSS/Tailwind.
- Confirm the final screen would not look identical if the domain name and labels were swapped.
