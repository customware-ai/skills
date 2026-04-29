# Component recipes

These are exact specs for the most common UI components. The agent implements them using the active token set — same recipe across all archetypes; different tokens; different visual results; always coherent.

Read this reference whenever building any UI component. Each recipe lists background, text, typography, radius, padding, height, hover, disabled, and transition specs — implementable directly without further design decisions.

---

## Buttons

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

One per screen. Two only when the secondary primary is clearly subordinate ("Save and continue" / "Save and exit" pairs).

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

For actions with low visual weight — "Cancel," "Skip," in-content links.

---

## Chips

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

Active and inactive chips sit next to each other in segmented controls (Today / Week, Day / Month / Year). Active chip is filled-light; inactive chip is outlined-white.

---

## Status

### Status Badge

```
background:  --status-{type}        /* success, warning, info, error, neutral */
text:        --text-foreground       /* always foreground — never colored text */
typography:  --type-caption, weight 500
radius:      --radius-md (16px)
padding:     4px 10px
border:      none
```

Five status badges only — one per status slot. Text is always foreground; the readability comes from contrast between dark text and light tinted background. Don't make the text colored to "match" the background.

---

## Rows

### Row (Default)

```
background:  --surface-canvas
border:      --border-subtle
radius:      --radius-lg (20px)
padding:     20px 24px
gap:         16px between elements
icon:        in a tinted square (32-40px), --radius-md, --accent-3 background
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

The selected state is the primary color's role in row stacks. It's the strongest visual signal in the list and the only place primary appears as a border.

---

## Cards

### Card (Primary)

```
background:  --surface-canvas for default cards
             --surface-focal (white) for THE focal card on the screen
border:      --border-subtle  (NOT shadow)
radius:      --radius-lg (20px) or --radius-xl (24px) for hero cards
padding:     24px
header:      --type-title for the card heading
content:     --type-body for body, --type-caption for metadata
```

One focal card per screen. Everything else uses canvas. White-on-canvas-on-stage is the three-tier depth that produces airiness without shadows.

---

## Forms & Toggles

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

---

## Layout components

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

The dark sidebar with white pill-active state is the signature navigation pattern — strong contrast, immediate location signal.

---

## Feedback components

### Empty State

```
container:   centered, 48px+ vertical padding
illustration: optional, single-color in --text-subtle or --accent-3 wash
title:       --type-title, --text-foreground
description: --type-body, --text-muted
action:      Primary Button, optional
```

Never leave a list view blank. Empty states signal "nothing yet, here's what to do" rather than "broken, no data."

### Toast

```
position:    fixed bottom-right, 24px from edges
background:  --surface-navigation (dark) for high contrast
text:        white
typography:  --type-body
radius:      --radius-md
padding:     12px 16px
icon:        optional, 16px, color matched to message type (success/info/error)
duration:    3-4 seconds, then auto-dismiss
animation:   slide in from bottom over 200ms, fade out over 150ms
```

### Loading Skeleton (Row)

```
height:      matches the row it replaces
background:  --status-neutral or a slightly tinted --surface-canvas
radius:      --radius-lg (matches row radius)
animation:   gentle shimmer or pulse, 1.2s loop
```

Skeletons match the actual content shape, not generic spinners. A row skeleton is a tinted rectangle the size of a row. A card skeleton is a tinted rectangle the size of a card with internal placeholder lines.
