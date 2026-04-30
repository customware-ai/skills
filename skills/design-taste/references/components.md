# Component recipes and layout patterns

This reference defines:
- Layout pattern catalog — pick the right shape for the product surface
- Component recipes with exact specs
- When to use cards vs. inline composition

Read in full whenever building any UI screen or component. Do not skim.

---

## Part 1 — Layout pattern catalog

The dashboard layout is overused. Pick the layout pattern that matches the product's primary surface, not the layout that AI defaults to. Each pattern below is a complete option.

### Surface-first layout (DEFAULT for most apps)

The product's primary working surface IS the page. No KPI cards above it, no card framing around it. The surface gets the screen.

```
+----------+--------------------------------+--------------------+
|          |                                 |                   |
| Sidebar  | [PRIMARY PRODUCT SURFACE]       |  Side context     |
| (nav)    | (calendar timeline / editor /   |  (filters,        |
|          |  board / map / pipeline)        |   queue,          |
|          |                                 |   selected item)  |
|          |                                 |                   |
+----------+--------------------------------+--------------------+
```

**Use for:** calendar/scheduling apps, kanban/board apps, writing/editing apps, mapping apps, pipeline apps, any app where the user spends most of their time interacting with one large surface.

**Side panel content:** narrow, supporting. "Up next" queue, filter chips, selected-item details, related records. Never KPI cards as decoration.

This is the layout Marigold used for the dental scheduler — day timeline as the page, "Up next" as a narrow right column.

### List-detail layout

Two columns: a scannable list on the left, a detail/preview pane on the right. The list is the index; the right pane shows whatever the user selected.

```
+----------+----------------------+--------------------------------+
|          | [List of items]      | [Detail of selected item]      |
| Sidebar  | (rows or compact     |                                |
|          |  cards)              |  (form, content, properties,   |
|          |                      |   related items)               |
|          |                      |                                |
+----------+----------------------+--------------------------------+
```

**Use for:** email-style apps, any "browse and review" workflow, settings pages with categories, file managers, contact/people apps.

### Reading layout (single column, centered)

A single column of content centered on the page with generous side margins. No sidebar nav (or minimal/collapsed). The content is the page.

```
+--------+---------------------------------------+---------+
|        |                                        |         |
|  ←     |  [Title]                               |  TOC    |
| (back) |                                        | (opt.)  |
|        |  Long-form content body                |         |
|        |  with generous line height             |         |
|        |  and serif body font.                  |         |
|        |                                        |         |
+--------+---------------------------------------+---------+
```

**Use for:** article/document reading, long-form notes, blog-style content, knowledge bases, settings explanations, editorial content. Width capped around 640-720px for readability.

### Board layout

Multiple parallel columns scrolling horizontally, each holding a stack of cards. The board itself IS the surface.

```
+----------+--------------------------------------------------+
|          | [Col 1]    [Col 2]    [Col 3]    [Col 4]         |
| Sidebar  |  card       card       card       card           |
|          |  card       card                  card           |
|          |             card                                  |
|          |  + Add      + Add      + Add      + Add           |
|          |                                                   |
+----------+--------------------------------------------------+
```

**Use for:** kanban tools, sales pipelines, content workflows, any "drag between stages" app. Cards here are appropriate because each card is a distinct repeatable unit (this is the "repetition" justification for cards).

### Form layout

Single column of grouped sections. Primary save action bottom-right.

```
+----------+--------------------------------+
|          | [Title]                         |
| Sidebar  | --------------------------     |
|          |                                 |
|          | Section name                    |
|          |   [Field row]                   |
|          |   [Field row]                   |
|          |                                 |
|          | Section name                    |
|          |   [Field row]                   |
|          |                                 |
|          |        [Cancel] [Save]         |
+----------+--------------------------------+
```

Single-column by default. Two-column field layouts only when fields are conceptually paired (first/last name, start/end date) and both are short. Field width matches expected content — currency/date/code fields constrained, names/addresses full-width. Never a wall of full-width fields.

### Focal layout (use sparingly — this is the dashboard pattern)

Sidebar + KPIs/focal element on top + supporting content below. **Only use when the user genuinely monitors metrics** — not as the default layout.

```
+----------+--------------------------------+--------------------+
|          | [Focal element / KPIs]          |  Right panel      |
| Sidebar  | --------------------------     |  (up next,        |
|          | [Section]                       |   trends)         |
|          | [Row stack]                     |                   |
|          |                                 |                   |
+----------+--------------------------------+--------------------+
```

**Appropriate for:** monitoring/observability dashboards, ops control panels, sales leaderboards, finance overviews where the user looks at metrics every visit. **Inappropriate for:** scheduling apps, writing apps, content apps, intake apps, any app where the user is *doing work* rather than *checking numbers*.

If you reach for this layout, ask: does the user open this app to check numbers, or to do work? If the latter, use surface-first instead.

### Single-page layout (no sidebar)

For simple apps or focused workflows, no sidebar at all. Header + content.

```
+--------------------------------------------------+
|  Header (brand, primary action)                   |
+--------------------------------------------------+
|                                                   |
|  Content (one focal element + supporting)         |
|                                                   |
|                                                   |
+--------------------------------------------------+
```

**Use for:** single-purpose tools (calculator, converter, timer), onboarding flows, focused intake/wizard flows, mobile-first apps.

---

## Part 2 — Cards: when to use, when to inline

Cards are NOT the default layout primitive. Inline content into the page body whenever possible. Cards are an exception.

### Use cards when:

- **Emphasis** — this one element is the focal point and needs visual lift from its surroundings (e.g., the day's primary score, the active document being worked on)
- **Separation** — multiple unrelated content blocks need to be visually distinct (e.g., a settings page with multiple unrelated sections)
- **Repetition** — a list of equivalent things benefits from each one being self-contained (e.g., kanban cards, product tiles, request items in a list)
- **Framing** — modal, dialog, popover, or overlay content needs framing for focused attention

### Don't use cards for:

- A page title (use heading text)
- A primary number (use display-size text on the page)
- A simple list of items (use rows or styled list)
- A form (use field rows on the page)
- KPIs that aren't actively monitored (omit them or inline)
- Generic "metric containers" that just frame numbers
- Wrapping every content block on a page (flatten to inline)

### The dashboard reflex test

If you find yourself building a screen that has KPI cards on top, a "Today's X" card below, an "Up next" card on the right — stop and ask: *is this app actually a dashboard, or am I building one because cards are easy?*

For Marigold, the answer was "scheduler, not dashboard" — and the layout became surface-first with the day timeline as the page. For an HVAC dispatch app, the answer might be "schedule canvas, not dashboard" — same shift. For a writing app, "editor, not dashboard." Most apps are not dashboards.

---

## Part 3 — Component recipes

Components consume the active token set. Same recipes across all archetypes; different tokens; different visual results; always coherent.

### Primary Button

```
background:  --primary
text:        white (always — high-contrast, regardless of primary color)
typography:  --type-body, weight 500
radius:      --radius-full  (or --radius-md for more formal/enterprise feel)
padding:     12px 20px
height:      40px
icon:        16px, white, optional, on the right side
hover:       darken --primary by 8%
disabled:    opacity 60%, no hover
transition:  150ms ease-out on background
```

One per screen. Two only when the secondary primary is clearly subordinate.

### Secondary Button

```
background:  --surface-focal (white)
text:        --text-foreground
typography:  --type-body, weight 500
radius:      --radius-md (16px)
padding:     10px 16px
height:      36px
border:      --border-subtle
hover:       background to --surface-stage
transition:  150ms ease-out on background, border
```

For non-primary actions sitting near the primary. "View details," "Edit," "See all."

### Tertiary / Text Button

```
background:  transparent
text:        --primary
typography:  --type-body, weight 500
radius:      --radius-sm
padding:     8px 12px
hover:       background to a translucent --primary tint (~8% opacity)
transition:  150ms ease-out on background
```

For low-weight actions — "Cancel," "Skip," in-content links.

### Chip (Active)

```
background:  --accent-3 (lightest accent tint)
text:        --text-foreground
typography:  --type-caption, weight 500
radius:      --radius-full
padding:     6px 12px
border:      none
```

### Chip (Inactive)

```
background:  --surface-focal (white)
text:        --text-muted
typography:  --type-caption, weight 500
radius:      --radius-full
padding:     6px 12px
border:      --border-subtle
hover:       background to --surface-stage
```

Active and inactive chips sit next to each other in segmented controls. Active is filled-light; inactive is outlined-white.

### Status Badge

```
background:  --status-{type}
text:        --text-foreground       /* always foreground — never colored text */
typography:  --type-caption, weight 500
radius:      --radius-md (16px)
padding:     4px 10px
border:      none
```

Five status badges only — one per status slot. Text is always foreground; readability comes from contrast between dark text and light tinted background. Don't make the text colored.

### Row (Default)

```
background:  --surface-canvas
border:      --border-subtle
radius:      --radius-lg (20px)
padding:     20px 24px
gap:         16px between elements
icon:        in a tinted square (32-40px), --radius-md, --accent-3 background (when an icon is appropriate)
title:       --type-body, weight 500, --text-foreground
subtitle:    --type-caption, --text-muted
right:       primary value (--type-body, foreground), then status badge or chevron
transition:  150ms ease-out on background, border
```

### Row (Hover)

```
background:  slight tint shift toward --surface-stage
cursor:      pointer
```

### Row (Selected)

```
background:  --surface-canvas (unchanged)
border:      --border-strong, with --primary as the border color
```

The selected state is the primary color's role in row stacks. The strongest visual signal in the list.

### Card (when justified — see Part 2)

```
background:  --surface-canvas for default cards
             --surface-focal (white) for THE focal card (rare — usually only one per screen)
border:      --border-subtle  (NOT shadow)
radius:      --radius-lg (20px) or --radius-xl (24px) for hero cards
padding:     24px
header:      --type-title for the card heading (only when card has a title)
content:     --type-body for body, --type-caption for metadata
```

Apply only when justified by emphasis, separation, repetition, or framing (Part 2). Otherwise inline the content.

### Toggle (On)

```
track:       --primary
knob:        white
size:        track 36px wide × 20px tall, knob 16px
shape:       --radius-full
transition:  150ms ease-out on knob position and track color
```

### Toggle (Off)

```
track:       --status-neutral
knob:        white
size:        track 36px wide × 20px tall, knob 16px
shape:       --radius-full
```

### Form Input

```
background:  --surface-focal (white)
border:      --border-subtle
radius:      --radius-md
padding:     10px 14px
text:        --type-body, --text-foreground
placeholder: --text-subtle
focus:       border becomes --primary, with 2px outline at --primary 20% opacity
disabled:    background --surface-stage, text --text-muted
transition:  150ms ease-out on border
```

Field width matches expected content. Currency/date/code fields constrained; names/addresses full-width.

### Section Header

```
title:       --type-title
description: --type-body, --text-muted, optional below title
action:      right-aligned, Secondary or Tertiary Button, optional
spacing:     32-40px above the section content (--space-8 or --space-10)
```

### Sidebar Navigation Item

```
default:
  background:  transparent
  icon:        white (on dark sidebar) or --text-muted (on light sidebar), 20px
  label:       --type-caption, white or --text-muted, weight 500
  padding:     12px 0  (vertical column rhythm)

active:
  background:  --surface-focal (white) with --radius-md
  icon:        --primary
  label:       --primary
```

Dark sidebar with white pill-active state is the signature navigation pattern — strong contrast, immediate location signal.

### Empty State

```
container:   centered, 48px+ vertical padding
illustration: optional, single-color in --text-subtle or --accent-3 wash
title:       --type-title, --text-foreground
description: --type-body, --text-muted
action:      Primary Button, optional
```

Never leave a list view blank.

### Toast

```
position:    fixed bottom-right, 24px from edges
background:  --surface-navigation (dark) for high contrast
text:        white
typography:  --type-body
radius:      --radius-md
padding:     12px 16px
icon:        optional, 16px, color matched to message type
duration:    3-4 seconds, then auto-dismiss
animation:   slide in from bottom over 200ms, fade out over 150ms
```

### Loading Skeleton

```
height:      matches the element it replaces
background:  --status-neutral or a slightly tinted --surface-canvas
radius:      matches the element's radius
animation:   gentle shimmer or pulse, 1.2s loop
```

Skeletons match actual content shape, not generic spinners.
