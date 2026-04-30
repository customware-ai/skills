# Mechanics — non-optional implementation rules

These are the structural and theming rules that every Customware build must follow. They were previously in the frontend-design skill (now disabled). They live here because they are inseparable from the visual language design-taste defines.

Skipping any of these is a failed build, even when tokens and components are perfect.

Read in full before writing the token block AND before building the layout shell.

---

## 1. Template Contract

The starter template ships with a structural contract you preserve unless the task explicitly asks for a shell redesign.

### What the template provides

`app/layouts/MainLayout.tsx` ships with sidebar infrastructure already wired:

- `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarInset`, `SidebarTrigger`
- `SidebarContent` is **empty by default** — this is the slot the build fills with task-specific navigation
- The header has a single brand slot (BrandMark + company name) on the left
- The header has a right cluster (role switcher, theme toggle, user menu)
- Light/dark theme support via `app/components/theme-provider.tsx`

### What the build fills

- `SidebarContent` — with task-specific navigation (route links, stepper, entity nav, or section list)
- The brand slot — with BrandMark + company name from DOMAIN.md (or a chosen identity if no DOMAIN.md)
- The header's right cluster — see "Header right cluster" below
- The main content area via `<Outlet />` — with route-specific content following the chosen layout pattern

### What the build does NOT do (unless task explicitly requires shell redesign)

- Add a second `Sidebar` component (one sidebar only)
- Put a brand tile inside `SidebarContent` (brand stays in the header)
- Rewire `SidebarProvider` to a different parent
- Remove the `SidebarTrigger` from the header
- Build a top-nav layout when the template ships with a sidebar layout

### When shell redesign IS appropriate

- Task explicitly says "redesign the shell" or "use top navigation"
- The product's primary surface (e.g., a calendar canvas, a writing editor) doesn't fit a sidebar paradigm
- A reading-style app needs a single-column layout

In these cases, change the shell deliberately. Update all consumers. Note the shell change in the completion summary so downstream agents know the contract shifted.

---

## 2. Brand Theming — CSS Variable Mapping

### The mapping (when DOMAIN.md has Brand Details)

```
domain.md brand color    →    CSS variable
─────────────────────────────────────────────
accent (primary brand)   →    --primary
                              --sidebar-primary
dark (lightened ~15%)    →    --sidebar
light                    →    --background
```

**`--primary`** drives action — primary buttons, active state borders, focal accents. Used in roughly 8-10% of pixels (per restraint rule).

**`--sidebar-primary`** is the sidebar's accent color — used for active nav item background or border. Often the same as `--primary` but can be slightly adjusted for contrast against the dark sidebar.

**`--sidebar`** is the sidebar background. Use the brand's dark color, but lighten it ~15% if it's too saturated or too dark. Pure black sidebars are jarring; aim for a deep tinted slate that feels related to the brand.

**`--background`** is the page background. The brand's "light" color, but check it: if HSL lightness is below 85%, use near-white instead. Vivid backgrounds destroy readability and the airy aesthetic.

### Scope boundaries — what brand colors do NOT touch

These CSS variables stay neutral regardless of brand:

- `--input` — keep near-white so form inputs are scannable
- `--muted` — keep neutral grey so muted text is readable everywhere
- `--secondary` — keep neutral grey for secondary buttons
- `--card` — keep `--surface-canvas` value (slightly off-white)
- `--popover` — keep near-white so popovers are scannable
- `--border` — keep `--border-subtle` so borders stay invisible-by-default
- `--destructive` — keep `--status-error` regardless of brand (red is universal for destructive actions)

If you tint these with the brand color, you produce the "everything is brand-colored" failure that violates the 8-10% restraint rule.

### When DOMAIN.md has no brand colors

Use the chosen archetype's palette from `references/archetypes.md`. The archetype IS the brand identity in this case.

### Fallback pattern in code

```css
:root {
  /* Brand-mapped values from DOMAIN.md, or archetype defaults */
  --primary: <brand-accent-or-archetype-primary>;
  --sidebar: <brand-dark-lightened-or-archetype-navigation>;
  --background: <brand-light-or-archetype-stage>;

  /* Scope-bounded — never tinted with brand */
  --input: #FFFFFF;
  --muted: #F1F5F9;
  --secondary: #F1F5F9;
  --card: var(--surface-canvas);
  --popover: #FFFFFF;
  --border: rgba(16, 24, 40, 0.07);
  --destructive: var(--status-error);
}
```

---

## 3. Light Mode in BOTH Places (CRITICAL — most-skipped step)

CSS-only changes do not stick. The ThemeProvider applies a `dark` class to `<html>` based on its default value. If the default is `system` or `dark`, the dark-mode CSS variables override everything in `:root` regardless of what you set.

### The fix — update both:

**1. `app.css`** — set the light-mode tokens under `:root`:

```css
:root {
  --background: var(--surface-stage);
  /* ... rest of tokens ... */
}

.dark {
  /* dark-mode overrides — leave defaults if not implementing dark mode */
}
```

**2. `app/lib/theme.ts` (or wherever defaultTheme is configured)** — set the ThemeProvider default to `light`:

```typescript
<ThemeProvider defaultTheme="light">
  <Outlet />
</ThemeProvider>
```

If you only update CSS, the build ships in dark mode for new users even when the brand is a light palette. This is the single most-skipped step in the entire pipeline.

For brand-light apps (the default for v0.2), always set both. Do not skip the ThemeProvider edit.

---

## 4. BrandMark — never use a bare `<img>` for logos

The `BrandMark` component (scaffold at `app/components/brand-mark.tsx`) handles logo failure gracefully. Use it in:

- The MainLayout header
- Any document-style view that shows the brand (Quote Document, Job Summary, invoices, customer-facing output)
- Email templates if rendered in-app

### Why

Logo URLs in DOMAIN.md fail more often than expected:

- Relative paths (`/logo.png`) that don't resolve in the deployed environment
- Expired or rotated CDN URLs
- Blocked by content security policy
- Hashed paths from a sandbox that no longer exists

A bare `<img>` produces a broken-icon state. BrandMark handles this with a tinted initials square fallback.

### The component pattern

```tsx
type BrandMarkProps = {
  logoUrl?: string;
  companyName: string;
  size?: 'sm' | 'md' | 'lg';  // 28 / 40 / 56 px
  className?: string;
};

export function BrandMark({ logoUrl, companyName, size = 'md', className }: BrandMarkProps) {
  const [failed, setFailed] = useState(false);
  const showImage = logoUrl && /^https?:\/\//.test(logoUrl) && !failed;

  if (showImage) {
    return (
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        className={cn(sizeClasses[size], 'rounded-md', className)}
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback: tinted initials square
  const initials = getInitials(companyName);  // 1-2 chars
  return (
    <div className={cn(
      sizeClasses[size],
      'rounded-md flex items-center justify-center',
      'bg-[--accent-3] text-[--text-foreground]',
      'font-semibold',
      className
    )}>
      {initials}
    </div>
  );
}
```

### Critical details

- **Only `http://` or `https://` URLs render as `<img>`.** Relative paths fall through to the initials fallback.
- **`onError` fallback** catches runtime failures (expired URL, blocked, CORS).
- **Initials fallback uses `--accent-3` background and `--text-foreground` text** — the lightest accent tint with high-contrast text. Looks intentional, not broken.
- **Three sizes:** sm (28px) for compact contexts, md (40px) for header default, lg (56px) for document-style brand display.

---

## 5. Header Right Cluster

The header has a right cluster containing (in order, left-to-right):

1. **Role switcher** (prototype phase only) — `DropdownMenu` showing the active role and badge. Clicking opens the menu of all roles from DOMAIN.md's Stakeholder Map. Updates the view immediately on selection. Removed in full-stack builds where real authentication drives permissions.

2. **Theme toggle** — `ModeToggle` for light/dark mode switching. Always present.

3. **User menu** (person icon) — Permanent. Contents differ by phase.

### User menu — prototype phase

The menu must contain:

- **Visible "Log out" placeholder** that is intentionally non-functional. Clicking shows a brief toast or inline message: "Log out is not yet configured — available when authentication is enabled." Must NOT clear localStorage or terminate the session (no real session exists).
- **A short demo-mode note** at the top or as a subtle footer: "Demo mode — authentication controls arrive in production."

This prevents the user menu from appearing empty/broken and distinguishes it from the temporary role switcher.

### User menu — full-stack phase

- Real auth controls: Profile, Settings, Log out, organization switcher (if applicable)
- Demo-mode note removed
- Role switcher also removed (permissions come from real auth)

### Anti-patterns

- Empty user menu showing only "Workspace / Account controls" and nothing else
- Working Log out that wipes localStorage in prototype phase
- Role switching embedded inside the user menu (mixes temporary and permanent affordances)
- User menu absent in prototype builds

---

## 6. Currency Formatting

When displaying money, use `Intl.NumberFormat` for proper locale-aware formatting:

```typescript
// app/lib/format.ts
export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
```

Examples:
- ✓ `$15,000.00`
- ✓ `$1,234.56`
- ✓ `€1.234,56` (locale-aware)
- ✗ `$15000.00` (no thousands separator)
- ✗ `$15000` (no decimals)
- ✗ `15000` (no symbol)

When DOMAIN.md specifies a locale or currency (e.g., Canadian customer using CAD), use those values. Default to `en-US` and `USD` when unspecified.

---

## 7. Common first-shot mistakes (build verification checklist)

Verify each item before completion:

- [ ] Brand colors mapped in `app.css` (if DOMAIN.md has them)
- [ ] Light mode set in BOTH `app.css` AND ThemeProvider default
- [ ] Every logo uses `BrandMark`, no bare `<img>` tags for brand
- [ ] User menu has placeholder Log out + demo-mode note (prototype phase)
- [ ] Header right cluster order: role switcher → theme toggle → user menu
- [ ] Role switcher and user menu are separate, not merged
- [ ] Form inputs have near-white background (not tinted with brand)
- [ ] Currency uses `Intl.NumberFormat` with thousands separators
- [ ] Sidebar uses `--sidebar` (lightened brand dark or archetype navigation), not pure black
- [ ] Page background uses `--background` (light), not the saturated brand color
- [ ] Role switcher trigger shows name + role badge with no "ROLE" label prefix
- [ ] One sidebar only, with `SidebarContent` as the navigation slot

---

## How this fits with the rest of design-taste

- **archetypes.md** declares the visual values (palette, typography, status colors, structural tokens)
- **mechanics.md** (this file) declares HOW those values are applied to the actual codebase (variable mapping, ThemeProvider, BrandMark, header structure)
- **components.md** declares what to build with the values
- **anti-patterns.md** declares what to NOT do

archetypes.md is "what the design IS." mechanics.md is "how it gets into the code." components.md is "what to build." anti-patterns.md is "what to avoid." All four are required reads.
