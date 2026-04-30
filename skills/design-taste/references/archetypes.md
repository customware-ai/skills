# Archetypes — encoded token sets

This reference contains the full archetype catalog and the encoded token sets for v0.2. Read in full before writing the token block to `app.css`. Do not skim.

---

## Catalog

| Archetype | Use when the app is for... | Status |
|---|---|---|
| **Neutral / Default** | safe default — works for any app, professional and clean | **Encoded** |
| **Wellness & Health** | health, fitness, sleep, mindfulness, habit tracking, calm tools | **Encoded** |
| **Editorial-Clinical** | medical, professional services, document-heavy review, broadsheet feel | **Encoded** |
| Productivity & Focus | tasks, projects, time blocking, focus sessions | Pending |
| Finance & Trust | money, banking, professional services, B2B SaaS | Pending |
| Creator & Social | journals, creative work, sharing, lightweight social | Pending |
| Lifestyle & Travel | trips, restaurants, places, recommendations | Pending |
| Education & Knowledge | courses, flashcards, study tools, learning paths | Pending |
| Utility & Tools | calculators, converters, timers, single-purpose tools | Pending |
| Reading & Content | long-form reading, articles, notes, libraries | Pending |
| Enterprise & Professional | confident B2B feel — heavy CPQ, CRM, industrial workflows | Pending |

## Picking the archetype

- **DOMAIN.md has brand colors** → use the brand colors for the palette layer; pick the archetype whose structural feel matches the customer.
- **No DOMAIN.md and no clear emotional cue** → use Neutral / Default.
- **No DOMAIN.md but a clear cue from the task** → match the archetype to the cue.
- **Multiple cues** → pick the most dominant. Don't blend.

Do not invent a new archetype mid-build.

---

## Shared structural tokens (read FIRST — apply to every archetype)

These tokens are identical across all archetypes in v0.2 unless an archetype explicitly overrides them. They represent the rhythm and structure of every Customware build.

### Text colors (3 levels — used as a hierarchy)

```css
--text-foreground: #0F172A;  /* primary text, headings, key numbers */
--text-muted:      #64748B;  /* labels, metadata, secondary info */
--text-subtle:     #94A3B8;  /* helper text, footnotes, decorative numerals */
```

Why three: most AI builds use one or two and lose information density. The three-level hierarchy lets you put primary content, secondary context, and tertiary metadata in the same row without visual collision.

### Typography sizes (4 levels — hard ceiling)

```css
--type-display: 32px / 1.1 / 600;  /* big numbers, primary scores, page titles */
--type-title:   20px / 1.3 / 500;  /* section headings, card titles */
--type-body:    14px / 1.5 / 400;  /* body text, row labels, button text */
--type-caption: 12px / 1.4 / 400;  /* metadata, helper text, status badges */
```

Body weight goes to 500 inside buttons and primary labels. Display is reserved for the single most important number/title on each screen. Do NOT introduce a 5th size. If you reach for 16px or 24px, push back to 14px or 20px.

Default font family: **Inter** for all four sizes. Some archetypes declare an optional display font pairing — see archetype sections.

### Radius scale (5 levels)

```css
--radius-sm:   12px;   /* small chips, dense elements */
--radius-md:   16px;   /* status badges, small cards */
--radius-lg:   20px;   /* primary cards, rows */
--radius-xl:   24px;   /* large hero cards, modals */
--radius-full: 9999px; /* pill chips, primary CTAs, avatars */
```

Components at the same hierarchy use the same radius. Mixing radii (12px card next to 20px card) is the second-most-common AI failure after color invention.

### Borders (NEVER use shadows for elevation)

```css
--border-subtle: 1px solid rgba(16, 24, 40, 0.07);
--border-strong: 1px solid rgba(16, 24, 40, 0.12);
```

Subtle border for default cards and rows. Strong border for selected state or focal emphasis. Both are nearly invisible on a casual look — they create the *suggestion* of an edge without weight. AI's default is to reach for a drop shadow; that's wrong. Borders, not shadows.

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
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
```

Generosity bias: when in doubt, prefer the larger space. Premium aesthetic is built on whitespace. Card padding 24px feels right; 16px feels cramped; 12px feels broken.

---

## Neutral / Default archetype

**Use when:** safe default. Productivity tools, dashboards, generic SaaS, internal business apps, anything where there's no strong emotional cue. The archetype to fall back on when others don't fit.

**Reference apps (north stars):** Linear, Stripe Dashboard, Vercel.

**Typography pairing:** Inter only. No display pairing.

**Foundation surfaces (4 layers):**

```css
--surface-stage:      #F5F6F8;  /* page background — soft cool neutral */
--surface-canvas:     #FAFBFC;  /* card surfaces — slightly off-white */
--surface-focal:      #FFFFFF;  /* elevated focal cards — pure white */
--surface-navigation: #1E293B;  /* sidebar — deep slate */
```

**Palette:**

```css
--primary:    #3B82F6;  /* Confident blue — the one accent for action */
--accent-2:   #60A5FA;  /* Lighter blue for chart fills, soft accents */
--accent-3:   #DBEAFE;  /* Lightest tint for chip backgrounds, selected state */
```

**Status palette:**

```css
--status-success: #DCFCE7;
--status-warning: #FEF3C7;
--status-info:    #DBEAFE;
--status-error:   #FEE2E2;
--status-neutral: #F1F5F9;
```

---

## Wellness & Health archetype

**Use when:** health tracking, fitness, sleep, mindfulness, habit building, calm tools, any app where calm and clarity dominate.

**Reference apps (north stars):** Headspace, Apple Health, Calm, Whoop.

**Typography pairing:** Inter only. No display pairing. Wellness apps are more effective with restrained typography.

**Foundation surfaces:**

```css
--surface-stage:      #F4F6F2;  /* page background — softest sage tint */
--surface-canvas:     #FAFBF8;  /* card surfaces — slightly warmer than white */
--surface-focal:      #FFFFFF;  /* elevated focal cards — pure white */
--surface-navigation: #2E362E;  /* sidebar — deep sage charcoal */
```

Why four surfaces: layered surfaces create depth without shadows. A card on the stage (`F4F6F2`) sits naturally on a slightly warmer canvas (`FAFBF8`). Pure white (`FFFFFF`) is reserved for the most focal element.

**Palette:**

```css
--primary:    #6BA46F;  /* Sage — drives action */
--accent-2:   #8DBA8F;  /* Moss — chart fills, soft accents */
--accent-3:   #CFE8D2;  /* Mint — chip backgrounds, selected state tint */
```

Restraint rule: primary appears in roughly 8% of pixels. NEVER body text, NEVER full-background tints, NEVER decorative icons.

**Status palette:**

```css
--status-success: #D7EBD9;
--status-warning: #F7E7B5;
--status-info:    #E2EDE6;
--status-error:   #F7D7D7;
--status-neutral: #E5E6E4;
```

Each status is a light fill background. Text on these backgrounds is `--text-foreground` at body or caption size. Do not invent solid-color status badges, do not use the primary green for status, do not introduce a sixth status.

---

## Editorial-Clinical archetype

**Use when:** medical scheduling, professional services, document-heavy review, calendar/booking apps, any context where the app should feel like an editorial publication or premium clinical tool. The archetype to use for healthcare front-office, legal calendars, financial advisory portals, premium boutique services.

This archetype is the answer to "make this feel like Cal.com meets Linear with warmth."

**Reference apps (north stars):** Cal.com, Linear (with warmth), Notion (when used for document-heavy workflows), high-end medical practice management.

**Typography pairing:** Fraunces (display serif) + Inter (body). The Fraunces serif on display-size headings — page titles, day-of-week, primary timestamps — is the editorial signature. Inter handles everything else (titles, body, captions).

```css
/* Override --type-display font family for this archetype only */
--type-display: 32px / 1.1 / 500 'Fraunces', Georgia, serif;
/* All other type sizes use Inter (default) */
```

The Fraunces serif at display size is what makes this archetype feel intentional rather than generic. Without it, this archetype is just a softer Default. Use it.

**Foundation surfaces:**

```css
--surface-stage:      #F8F7F2;  /* page background — warm cream, broadsheet feel */
--surface-canvas:     #FCFBF7;  /* card/panel surfaces — slightly warmer than stage */
--surface-focal:      #FFFFFF;  /* elevated focal elements — pure white */
--surface-navigation: #1F2A2A;  /* sidebar — deep teal-charcoal */
```

The warm cream stage is what differentiates this archetype from cool-neutral Default. Cream feels printed, premium, calm — perfect for medical/professional contexts where trust matters.

**Palette:**

```css
--primary:    #2C9388;  /* Soft teal — clinical, trustworthy, calm */
--accent-2:   #5AAFA5;  /* Lighter teal for chart fills */
--accent-3:   #D6EAE7;  /* Lightest teal tint for chip backgrounds */
```

**Status palette:** uses pastel category colors that double as treatment/category coding. When the archetype is used for scheduling/calendar apps, these can be used as a category palette (e.g., treatment types in a dental scheduler):

```css
--status-success: #D6EAE7;  /* mint — confirmed, on-track */
--status-warning: #F4E4D0;  /* peach — pending, attention */
--status-info:    #DCE6F0;  /* slate-blue — informational */
--status-error:   #F2D5D0;  /* coral — declined, missed */
--status-neutral: #E5E5E0;  /* warm grey — inactive */
```

For category-coding (treatment types, appointment types), extend with additional pastels: lavender (`#E0DAEF`), pink (`#F0DCE2`), olive (`#E2E5D0`). Each follows the same light-fill-with-foreground-text pattern.

---

## When to override structural tokens

The structural tokens (text, type, radius, borders, elevation, spacing) are deliberately shared. An archetype only overrides them when the override is essential to the feel:

- Editorial-Clinical overrides `--type-display` font family to introduce Fraunces. This is essential — without it the archetype loses its identity.
- Reading & Content (pending) might override typography to increase body line-height for sustained reading.
- Wellness might override `--radius-lg` to a slightly larger value for softer feel.

If an archetype doesn't NEED to override a structural token, it doesn't. Consistency across archetypes is part of what makes Customware builds feel coherent across customers.

---

## Extending with new archetypes

To add a new archetype to a future version:

1. Pick a name from the catalog above
2. Write the archetype-specific overrides: foundation surfaces, palette, status palette
3. Optionally add a typography pairing if the archetype's feel demands one
4. Identify 2-3 reference apps as north stars
5. Use the shared structural tokens unchanged unless an override is essential
6. Add an "Encoded" entry in the catalog table
7. Validate by running at least one build with the new archetype before adding another

Do not encode multiple new archetypes at once. Each archetype is a hypothesis about what a category of app should feel like — that hypothesis needs to be tested by a real build before the next is added.
