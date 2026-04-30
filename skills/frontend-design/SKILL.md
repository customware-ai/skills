---
name: frontend-design
description: >
  Strict frontend design guardrails for building modern, minimal-visual-noise, airy,
  non-generic app UIs. Use whenever creating or changing frontend UI, React components,
  shadcn/ui themes, Tailwind styles, app layouts, or first-version product screens.
  This skill complements vertical/domain skills like CPQ, CRM, and similar app builders:
  follow the selected domain skill's workflow and layout requirements, then use this
  skill for brand-aware theming, generous spacing, typography, surface hierarchy,
  cardless defaults, no-sidebar defaults, and anti-pattern avoidance.
---

# Frontend Design

This is a visual design guardrail skill, not a domain workflow skill. Domain skills own required product structure, terminology, workflows, and output views. This skill owns visual quality and must be applied inside that structure.

## Mandatory References

Before visual planning or implementation, read both files. Skipping either file is a skill violation.

- `.agents/skills/frontend-design/references/visual-style-references.md`
- `.agents/skills/frontend-design/references/shadcn-setup-and-theming.md`

## Required Workflow

1. Read the active task, domain context, and selected domain skills.
2. Read `.tasks/domain.md` when it exists. Extract brand colors, logo/company name, domain tone, terminology, workflows, entities, statuses, roles, and constraints.
3. Read both frontend-design references.
4. Produce the design pass before coding:
   - **Vision**: domain-specific product and visual direction. Reject generic SaaS purple, card-heavy dashboards, and generic admin shells.
   - **First-version features**: working screens, controls, routes, dialogs, and localStorage-backed state.
   - **Design tokens**: primary, secondary/accent, background, canvas, focal contrast treatment, text, border, radius, contact shadow, status colors, typography, generous spacing, and cardless plan.
5. Pass the design compliance gate.
6. Configure CSS variables and Tailwind/shadcn theme tokens before building screen details.
7. Build the UI with those tokens.
8. Run the pre-completion audit and revise before finishing.

## Non-Negotiables

- **Brand first**: If `.tasks/domain.md` provides brand colors, use them. Map the main brand/accent color to primary actions, active navigation, selected state, focus, and links. Derive neutral surfaces, borders, muted text, and statuses from compatible tints. Do not default to generic purple/blue.
- **Cardless by default**: Aim for zero cards. If the UI works without a card, the card is not allowed. A bordered rounded surface occupying a major region of the page is a card even if `Card` is not imported. Cards are only allowed for dialog/popover/sheet containment, concise notice, or truly repeated items when rows, dividers, or tonal separation fail.
- **No top-level cards**: Never compose the main page from large sibling cards, a stack/grid of rounded panels, or a large framed hero/detail container. Top-level structure must be open sections, tonal bands, rows, dividers, workspace areas, or one open focal working zone.
- **No sidebars by default**: Use a sidebar only when the user explicitly asks for one or a selected domain skill explicitly requires one. Do not add a sidebar because the app is operational, business, admin-like, multi-step, or has multiple sections.
- **Airy spacing**: Use generous gaps, gutters, row rhythm, and section spacing. Slightly too much spacing is acceptable; cramped, dense, or compressed UI is failure.
- **One dominant working surface**: The first screen should focus on one clear operational object or working section. Do not try to show the whole product at once.
- **No major-region framed surfaces**: Do not turn the main working area, hero, inspector, or detail lane into a big bordered rounded panel. Prefer open layout, split rows, tonal bands, dividers, or a drawer/sheet for secondary detail.
- **Token-first shadcn**: Configure `app.css`/global CSS variables and Tailwind theme values before component work. Do not accept default shadcn colors as the design.
- **Strong soft contrast**: If a surface exists, it must separate from the canvas through tone first, border second, shadow last. Same-white or near-white surfaces with faint borders fail.
- **Interactive surface contrast**: Inputs, selects, textareas, tables, and header/nav chrome must read as distinct working surfaces. In light mode they should usually sit on a near-white or very light brand-tinted surface; in dark mode they should usually sit on a near-black surface. Do not let controls or header chrome disappear into the page background.
- **Contact depth only**: Avoid `shadow-md`, `shadow-lg`, `shadow-xl`, broad blur, glow, halo, glassmorphism, and heavy card shadows. Use soft, tight, contact-edge depth only when needed. Depth should read as edge contact, not lift.
- **Domain specificity**: The UI should not look unchanged if the domain name and labels are swapped.

## Design Compliance Gate

Do not code until all answers are acceptable.

- Did I read `.tasks/domain.md` and summarize brand colors when present?
- Did I read both frontend-design references?
- Did I define exact CSS/Tailwind/shadcn token updates?
- Can this UI be built with zero cards? If not, is every remaining card unavoidable under the narrow allowed cases?
- Are there no top-level cards?
- Am I avoiding sidebars unless explicitly requested or required by a selected domain skill?
- Does the first screen focus on one dominant working surface instead of title + filters + KPI strip + card grid + table?
- Am I avoiding large framed hero/detail/inspector surfaces?
- Is the layout airy with generous spacing, not dense?
- Do page background, canvas, nav chrome, and any focal surface separate clearly at thumbnail scale?
- Do inputs, form controls, tables, and header/nav chrome have enough tonal separation from the page background?
- Are shadows limited to contact-edge depth?
- Does the design feel specific to this domain and task?

## Implementation Rules

- Prefer topbar, tabs, segmented controls, breadcrumbs, command rows, stepped flows, drawers, sheets, dialogs, or detail routes over sidebars.
- Before adding any card-like wrapper, try open spacing, typography, dividers, rows, tonal bands, tables, drawers, sheets, dialogs, or detail routes.
- Detail views should prefer inline split layout, selected rows, dividers, tonal sections, drawers, or sheets before any framed panel.
- If a `Card` component is imported or a card-like wrapper remains, add a nearby inline justification explaining why it is unavoidable under the allowed cases.
- Use good readable UI fonts. Avoid typewriter/blog fonts unless the domain explicitly requires that character.
- Keep surfaces distinct through tone, spacing, and hierarchy rather than borders and boxes around everything.
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
- Inputs, form controls, data rows, or header/nav chrome blend into the page background.
- Brand colors from `.tasks/domain.md` are not reflected in primary/active/focus treatment.
- Theme variables were not configured before component styling.
- The screen feels cramped or all modules have equal weight.
- The UI looks like a starter admin template, Bootstrap dashboard, or generic AI/SaaS app.
