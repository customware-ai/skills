# Archetypes — encoded token sets

This reference contains the full archetype catalog and the encoded token sets for v0.1. Read at the moment of writing the token block to `app.css`.

## Catalog

| Archetype | Use when the app is for... | Status in v0.1 |
|---|---|---|
| **Neutral / Default** | safe default — works for any app, professional and clean | **Encoded below** |
| **Wellness & Health** | health, fitness, sleep, mindfulness, habit tracking, calm tools | **Encoded below** |
| Productivity & Focus | tasks, projects, time blocking, focus sessions | Pending |
| Finance & Trust | money, banking, professional services, B2B SaaS | Pending |
| Creator & Social | journals, creative work, sharing, lightweight social | Pending |
| Lifestyle & Travel | trips, restaurants, places, recommendations | Pending |
| Education & Knowledge | courses, flashcards, study tools, learning paths | Pending |
| Utility & Tools | calculators, converters, timers, single-purpose tools | Pending |
| Reading & Content | long-form reading, articles, notes, libraries | Pending |
| Enterprise & Professional | confident B2B feel — heavy CPQ, CRM, industrial workflows | Pending |

## Picking the archetype

- **DOMAIN.md has brand colors** → use the brand colors for the palette layer; pick the archetype whose structural feel matches the customer (industrial CPQ → Enterprise; wellness clinic → Wellness; creative agency CRM → Creator). The brand colors override the archetype's palette; everything else (typography, radius, elevation) comes from the archetype.
- **No DOMAIN.md and no clear emotional cue** → use Neutral / Default.
- **No DOMAIN.md but a clear cue from the task** → match the archetype to the cue.
- **Multiple cues** → pick the most dominant. Don't blend.

Do not invent a new archetype mid-build.

---

## Neutral / Default archetype (v0.1)

The safe, professional, palette-flexible option. Restrained, modern, works for any app where there's no strong emotional cue. Suitable for productivity tools, dashboards, generic SaaS, and as a fallback when the archetype isn't obvious.

### Foundation surfaces (4 layers)

```css
--surface-stage:      #F5F6F8;  /* page background — soft cool neutral */
--surface-canvas:     #FAFBFC;  /* card surfaces — slightly off-white */
--surface-focal:      #FFFFFF;  /* elevated focal cards — pure white */
--surface-navigation: #1E293B;  /* sidebar — deep slate */
```

### Palette

```css
--primary:    #3B82F6;  /* Confident blue — the one accent for action */
--accent-2:   #60A5FA;  /* Lighter blue for chart fills, soft accents */
--accent-3:   #DBEAFE;  /* Lightest tint for chip backgrounds, selected state tint */
```

### Status palette (5 named slots)

```css
--status-success: #DCFCE7;
--status-warning: #FEF3C7;
--status-info:    #DBEAFE;
--status-error:   #FEE2E2;
--status-neutral: #F1F5F9;
```

### Shared structural tokens

Text, typography, radius, borders, elevation, and spacing are shared with all archetypes — see [Shared structural tokens](#shared-structural-tokens) below.

---

## Wellness & Health archetype (v0.1)

The premium-matte, broadsheet aesthetic. Sage palette, warm neutrals, generous whitespace, light borders instead of shadows. Calm and clarity dominate. Suitable for any app where calm and clarity are the dominant feelings — health tracking, fitness, sleep, mindfulness, habit building.

### Foundation surfaces

```css
--surface-stage:      #F4F6F2;  /* page background — softest sage tint */
--surface-canvas:     #FAFBF8;  /* card surfaces — slightly warmer than white */
--surface-focal:      #FFFFFF;  /* elevated focal cards — pure white */
--surface-navigation: #2E362E;  /* sidebar — deep sage charcoal */
```

Why four surfaces, not one: layered surfaces create depth without shadows. A card on the stage (`F4F6F2`) sits naturally on a slightly warmer canvas (`FAFBF8`). Pure white (`FFFFFF`) is reserved for the most focal element. Most AI builds use one flat background for everything; the four-tier system is what makes the layout breathe.

### Palette

```css
--primary:    #6BA46F;  /* Sage — drives action */
--accent-2:   #8DBA8F;  /* Moss — chart fills, soft accents */
--accent-3:   #CFE8D2;  /* Mint — chip backgrounds, selected state tint */
```

**Restraint rule:** the primary color appears in roughly 8% of pixels — primary buttons, active state borders, the score badge fill. NEVER use it for body text, NEVER tint entire backgrounds with it, NEVER use it for icon decoration. Restraint is what makes the accent feel premium.

### Status palette

```css
--status-success: #D7EBD9;
--status-warning: #F7E7B5;
--status-info:    #E2EDE6;
--status-error:   #F7D7D7;
--status-neutral: #E5E6E4;
```

Each status is a **light fill background**. Text on these backgrounds is the foreground (`#0F172A`) at body or caption size. Do not invent solid-color status badges, do not use the primary green for status (it's reserved for action), do not introduce a sixth status.

---

## Shared structural tokens

These tokens are identical across all archetypes in v0.1. Only foundation surfaces, palette, and status colors differ between archetypes. Future archetypes may introduce different typography pairings (serif/sans for Reading, mono accents for Utility) — that's why typography is in the token block, not declared globally.

### Text colors (3 levels — used as a hierarchy)

```css
--text-foreground: #0F172A;  /* primary text, headings, key numbers */
--text-muted:      #64748B;  /* labels, metadata, secondary info */
--text-subtle:     #94A3B8;  /* helper text, footnotes, decorative numerals */
```

Why three: most AI builds use one or two colors and lose information density. The three-level hierarchy lets you put primary content (`8h 12m`), secondary context (`Last night`), and tertiary metadata (`Sleep window 10:30 PM – 6:30 AM`) on the same row without visual collision.

### Typography (Inter, 4 sizes ONLY — hard ceiling)

```css
--type-display: 32px / 1.1 / 600;  /* big numbers, primary scores */
--type-title:   20px / 1.3 / 500;  /* page and card titles */
--type-body:    14px / 1.5 / 400;  /* body text, row labels, button text */
--type-caption: 12px / 1.4 / 400;  /* metadata, helper text, status badges */
```

Body weight goes to 500 inside buttons and primary labels. Display is reserved for the single most important number on each screen. **Do not introduce a 5th size.** If you find yourself wanting one, you're probably reaching for 16px or 24px — push back to 14px or 20px instead.

### Radius scale (5 levels)

```css
--radius-sm:   12px;   /* small chips, dense elements */
--radius-md:   16px;   /* status badges, small cards */
--radius-lg:   20px;   /* primary cards, rows */
--radius-xl:   24px;   /* large hero cards, modals */
--radius-full: 9999px; /* pill chips, primary CTAs, avatars */
```

**Consistency rule:** components at the same hierarchy use the same radius. All primary cards use `--radius-lg`. All chips use `--radius-full`. Mixing radii (a 12px card next to a 20px card) is the second-most-common AI failure after color invention.

### Borders (NEVER use shadows for elevation)

```css
--border-subtle: 1px solid rgba(16, 24, 40, 0.07);
--border-strong: 1px solid rgba(16, 24, 40, 0.12);
```

Subtle border for default cards and rows. Strong border for selected state or focal emphasis. Both are nearly invisible on a casual look — they create the *suggestion* of an edge without weight. AI's default is to reach for a drop shadow; that's wrong here. Borders, not shadows.

### Elevation (4 levels, all border-based)

```css
--elevation-0: none;                                    /* flat, no border, no shadow */
--elevation-1: 0 0 0 1px rgba(16,24,40,0.07);          /* subtle border only */
--elevation-2: 0 0 0 1px rgba(16,24,40,0.07),
               0 1px 2px rgba(16,24,40,0.07);          /* gentle lift */
--elevation-3: 0 0 0 1px rgba(16,24,40,0.08),
               0 2px 3px rgba(16,24,40,0.10);          /* focal elevation */
```

`--elevation-3` is the highest. There is no `--elevation-4`. If something needs to feel more important than `--elevation-3`, change its size, color, or position — not its shadow.

### Spacing scale (8px rhythm)

```css
--space-1:  4px;   /* hairline */
--space-2:  8px;   /* tight */
--space-3:  12px;  /* compact */
--space-4:  16px;  /* default */
--space-5:  20px;  /* generous */
--space-6:  24px;  /* breath */
--space-8:  32px;  /* section gap */
--space-10: 40px;  /* page rhythm */
```

**Generosity bias:** when in doubt, prefer the larger space. The premium aesthetic is built on whitespace. A card padding of 24px feels right; 16px feels cramped; 12px feels broken.

---

## Extending with new archetypes

To add a new archetype to a future version:

1. Pick a name from the catalog above
2. Provide the 3 archetype-specific token blocks: foundation surfaces, palette, status palette
3. Use the shared structural tokens unchanged (or override specific ones if the archetype demands a different feel — e.g., Reading might use serif display type)
4. Add an "encoded below" entry in the catalog table
5. Validate by running at least one build with the new archetype before adding another

Do not encode multiple new archetypes at once. Each archetype is a hypothesis about what a category of app should feel like — that hypothesis needs to be tested by a real build before the next is added.
