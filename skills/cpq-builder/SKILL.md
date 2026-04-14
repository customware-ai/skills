---
name: cpq-builder
license: MIT
compatibility: Works with any AI coding assistant that supports the Agent Skills specification. Requires a running Customware SPA instance to consume the generated config.
metadata:
  author: ryan-price
  version: "3.2"
description: >
  Configure-Price-Quote (CPQ) vertical skill for the Customware SPA. Defines the section
  layout, config schema, business rule templates, and deterministic mapping rules for
  transforming a DOMAIN.md into a CPQ config object. Use this skill when the Builder Agent
  classifies a customer's domain as a quoting, pricing, or product configuration system.
  Trigger signals: products with dependencies, price lists, markup/margin calculations,
  quote generation, proposal workflows, accessory compatibility, product configuration options.
---

# CPQ Builder Skill

## What This Skill Does

This skill tells the Builder Agent how to configure the Customware SPA as a Configure-Price-Quote system. It provides:

1. **Section definitions** — the four views that make up a CPQ application
2. **Layout pattern** — the three-panel layout (sidebar stepper, main content, quote summary) with RBAC and saved quotes
3. **Config schema** — the data shape for products, options, dependencies, pricing, and quotes
4. **Deterministic mapping rules** — if-then rules for transforming DOMAIN.md into config.json
5. **Business rule templates** — patterns for the SPA's rules engine
6. **Vertical presets** — defaults for Manufacturing, Wholesale, and Services verticals

The Builder Agent does NOT generate code. It generates a config object that the SPA renders.

## When to Use This Skill

The Builder Agent should select this skill when the customer's DOMAIN.md contains:

- Products or services that are quoted/priced for customers
- Configuration options (sizes, models, variants, materials)
- Dependencies between products (requires, recommends, excludes)
- Markup or margin-based pricing (cost-plus, vendor list + percentage)
- A quoting or proposal workflow (draft → review → approve → send)
- Roles involved in pricing, approving, or sending quotes

**Classification signals from the Clarence transcript:**
- "quoting is a mess," "inconsistent pricing," "reps don't know what goes with what"
- "we copy paste from old quotes," "pricing is in someone's head"
- "we mark up the vendor price," "cost plus 35-40%"
- Products with accessories, parts, or services that must go together

**Do NOT use this skill when** the domain is primarily about inventory tracking (use ERP skill), online product sales (use e-commerce skill), or customer relationship management (use CRM skill). If the domain includes quoting AND inventory, use this skill — the quoting workflow is the primary interaction.

---

## Section Definitions

The CPQ application has four sections. These are fixed — the Builder Agent uses them as-is.

```json
{
  "sections": [
    {
      "id": "configure",
      "label": "Configure",
      "icon": "Settings2",
      "order": 1,
      "component": "card-selector",
      "componentConfig": {
        "itemLayout": "grid",
        "showPrice": true,
        "showDescription": true,
        "showOptions": true,
        "selectionMode": "add-to-list",
        "groupBy": "category"
      },
      "dataSource": "data.products",
      "actions": [
        { "label": "Add to Quote", "action": "addSelected", "variant": "primary" }
      ]
    },
    {
      "id": "quote",
      "label": "Build Quote",
      "icon": "FileText",
      "order": 2,
      "component": "data-table",
      "componentConfig": {
        "columns": [
          { "key": "product", "label": "Product", "width": "auto" },
          { "key": "options", "label": "Configuration", "width": "auto" },
          { "key": "quantity", "label": "Qty", "width": "80px", "editable": true },
          { "key": "unitPrice", "label": "Unit Price", "width": "120px", "format": "currency" },
          { "key": "total", "label": "Total", "width": "120px", "format": "currency", "computed": true }
        ],
        "showRowActions": true,
        "rowActions": ["edit", "duplicate", "remove"]
      },
      "dataSource": "data.lineItems",
      "actions": [
        { "label": "Preview Quote", "action": "navigateTo:preview", "variant": "primary" },
        { "label": "Clear All", "action": "clearItems", "variant": "ghost", "confirm": true }
      ]
    },
    {
      "id": "preview",
      "label": "Preview",
      "icon": "Eye",
      "order": 3,
      "component": "summary",
      "componentConfig": {
        "showLineItems": true,
        "showSubtotal": true,
        "showMarkup": false,
        "showTax": true,
        "showTotal": true,
        "showTerms": true,
        "showNotes": true
      },
      "dataSource": "data.lineItems",
      "actions": [
        { "label": "Export PDF", "action": "exportPDF", "variant": "primary" },
        { "label": "Back to Quote", "action": "navigateTo:quote", "variant": "ghost" }
      ]
    },
    {
      "id": "approve",
      "label": "Approve",
      "icon": "CheckCircle",
      "order": 4,
      "component": "form",
      "componentConfig": {
        "fields": [
          { "key": "customerName", "label": "Customer Name", "type": "text", "required": true },
          { "key": "customerEmail", "label": "Customer Email", "type": "email" },
          { "key": "paymentTerms", "label": "Payment Terms", "type": "select", "default": "net30" },
          { "key": "notes", "label": "Notes", "type": "textarea" },
          { "key": "validUntil", "label": "Valid Until", "type": "date" }
        ]
      },
      "dataSource": "data.quoteSettings",
      "gated": {
        "requires": ["customerName", "hasLineItems", "noErrors"],
        "message": "Complete these before approving: customer name, at least one product, no unresolved dependency errors."
      },
      "actions": [
        { "label": "Approve & Send", "action": "approveQuote", "variant": "primary", "confirm": true },
        { "label": "Save Draft", "action": "saveDraft", "variant": "secondary" }
      ]
    }
  ],
  "navMode": "stepper"
}
```

**Navigation mode is `stepper`** — the sidebar shows all four sections as sequential steps. All steps are clickable at any time (not a wizard). The Approve step shows gating indicators when requirements aren't met.

---

## Layout Pattern

The CPQ application uses a **three-panel layout**. The builder MUST follow this layout — not a single scrolling page with all sections stacked.

### Left sidebar (always visible)

| Component | Content |
|---|---|
| **Stepper** | The four CPQ sections as clickable steps. Each step shows: step number, label, and completion state (pending / active / done). Clicking a step navigates to that section's panel. Only ONE section is visible in the main content at a time. |
| **Role switcher** | "View as role" — lists every named person from DOMAIN.md's Stakeholder Map with their role. Clicking changes what the user can see and do. Active role persists in localStorage. |
| **Saved quotes** | List of quotes stored in localStorage. Each shows name + status badge (Draft / Sent / Approved). Clicking loads the quote. "New quote" button at top creates a fresh one. |

### Main content (center — changes per section)

**Only the active section renders.** Do NOT stack all four sections on one scrolling page. Each stepper step shows its corresponding panel:

| Section | What renders |
|---|---|
| **Configure** | Product card with base price. Option selectors (motors, accessories) with prices next to each. Toggles for optional items (installation). A "Continue" button to advance to Build Quote. |
| **Build Quote** | Line items table: item, option/variant, quantity, unit price, line total. Editable rows — add, remove, duplicate. Route specialist work section with assignment dropdowns (from DOMAIN.md roles). |
| **Preview** | Read-only summary: subtotal, tax line (HST/GST with rate), total. Payment terms. Currency. Formatted for review — this is what the customer would see. |
| **Approve** | Approval owner display, status badge (Pending / Approved / Rejected). Approve and reject buttons. **Gated by role** — only roles with approval permission can approve. Other roles see a message: "You are viewing as [Name]. Only [approver names] can approve." |

### Right sidebar (always visible)

| Component | Content |
|---|---|
| **Current quote summary** | Live-updating card: selected product, chosen options, running subtotal, tax, total. Updates immediately when the user changes configuration. |
| **Workflow notes** | Business rules and routing info from DOMAIN.md displayed as contextual guidance cards. |

### RBAC behavior

- Seed localStorage with roles from DOMAIN.md User Roles or Stakeholder Map.
- Role switcher in the left sidebar lets users preview the app as any role.
- **Approval gating**: If DOMAIN.md says "only Andy or Jeff can approve," disable the Approve button when viewing as Dre or Manish. Show a clear message explaining why.
- **Routing visibility**: If a role handles specific work types (e.g., "Dre handles maintenance"), show relevant routing info when that role is active.

### Price visibility

- Show prices on EVERY screen where products or options appear.
- Option selection (motors, accessories) immediately updates the right sidebar total.
- Preview section calculates: subtotal + tax = total.
- Use the tax type from DOMAIN.md (HST = 13%, GST = 5%).
- Currency from DOMAIN.md (CAD, USD) appears in all price displays.

### shadcn/ui component mapping

Use these shadcn components for each CPQ element. Do not build custom equivalents when a shadcn component exists.

| CPQ Element | shadcn Component | Usage Notes |
|---|---|---|
| Product card | `Card`, `CardHeader`, `CardContent` | Show product name, description, base price. Use `CardDescription` for the price line. |
| Motor / option selection | `RadioGroup`, `RadioGroupItem` | Mutually exclusive options. Show price next to each label. Wrap in a Card. |
| Optional items (installation) | `Checkbox` with label | Toggle on/off. Show description below the label. |
| Status badges | `Badge` | Use `variant="outline"` for Draft, `variant="default"` for Sent, `variant="secondary"` for Approved. Apply semantic colors via className. |
| Role badges | `Badge` | `variant="outline"` for Staff, `variant="default"` for Approver, `variant="secondary"` for View only. |
| Line items table | `Table`, `TableHeader`, `TableRow`, `TableCell` | Clean header row, right-align price columns. Use `TableFooter` for subtotal row. |
| Form inputs | `Input`, `Label` | Quote name, customer name, notes. Stack label above input. |
| Dropdowns | `Select`, `SelectContent`, `SelectItem` | Lead source, assigned-to, motor selection (alternative to RadioGroup for compact layouts). |
| Action buttons | `Button` | Primary action: `variant="default"` with brand accent. Secondary: `variant="outline"`. Destructive: `variant="destructive"`. |
| Section dividers | `Separator` | Between sections within a panel. Horizontal, subtle. |
| Stepper navigation | Custom (no shadcn stepper) | Build as a vertical list of clickable items. Use `cn()` for active/done/pending states. |
| Role switcher | Custom list with `Button variant="ghost"` | Each role is a ghost button. Active role gets accent background via className. |
| Saved quotes list | Custom list | Each item is a clickable row with `Badge` for status. Use `ScrollArea` if the list could overflow. |
| Quote summary sidebar | `Card` with stacked label/value rows | Compact. Labels are `text-muted-foreground text-sm`. Values are `font-medium`. Total row is `text-lg font-semibold`. |
| Workflow notes sidebar | `Card` with `text-sm text-muted-foreground` | Reference material, not primary content. Small text, muted colors. |
| Confirmation dialogs | `AlertDialog` | For destructive actions (delete quote, reject quote). |
| Toast notifications | `Sonner` / `toast()` | After save, approve, reject, delete. Brief confirmation messages. |

---

## Config Schema

See `references/config-schema.md` for full TypeScript interfaces. Summary:

```
config
├── app                    ← Branding, theme (from brandfetch)
├── sections[]             ← Fixed (from this skill, above)
├── data
│   ├── products[]         ← Catalog of available products with options
│   ├── lineItems[]        ← Current quote contents (starts empty)
│   └── quoteSettings      ← Currency, tax, terms, markup
├── rules[]                ← Business rules (dependencies, validations)
└── roles[]                ← User roles and permissions
```

---

## Deterministic Mapping Rules

The Builder Agent follows these rules mechanically to transform DOMAIN.md into config.json. No reasoning, no interpretation — execute the rules.

### Entity → Product Mapping

```
FOR EACH entity in DOMAIN.md Entity Registry
  WHERE entity description suggests a sellable product, equipment, service, or part:
    → CREATE config.data.products[] entry
    → SET id = slugify(entity name)
    → SET name = entity name (exact, from DOMAIN.md)
    → SET category = entity parent grouping or category (from Entity Registry or Relationship Map)
    → SET basePrice = entity price if stated (number, no currency symbol)
    → SET pricingSource = determine from context:
        IF "price list" or "vendor list" or "catalog price" → "catalog"
        IF "get a quote from vendor" or "depends on specs" → "vendor_rfq"
        IF "we know our cost and mark it up" → "cost_plus"
        IF no pricing discussed → "tbd"
    → SET options[] = from entity's "what varies" attributes:
        FOR EACH variation mentioned (size, model, capacity, material, type):
          → CREATE option entry
          → SET option.id = slugify(variation name)
          → SET option.label = variation name
          → SET option.type = "select" (default for enumerated choices)
          → SET option.choices = the specific values mentioned

  WHERE entity has NO price, NO options, and is NOT referenced in a relationship:
    → SKIP — it's probably not a product (may be a role, process, or system)
    → ADD to Open Questions: "Is [entity] a quotable product?"
```

### Relationship → Rule Mapping

```
FOR EACH relationship in DOMAIN.md Relationship Map:

  IF relationship type = "requires":
    → CREATE config.rules[] entry
    → SET type = "requires"
    → SET severity = "error"
    → SET trigger = "addItem"
    → SET condition = { "item.category": [source entity category] }
    → SET action = { "suggest": [target entity id] }
    → IF relationship mentions size/model matching:
        → SET action.matchField = the matching attribute
    → SET message = relationship rationale from DOMAIN.md (the "because")
    → IF no rationale captured:
        → SET message = "[source] requires [target] — rationale not captured"

  IF relationship type = "recommends":
    → CREATE config.rules[] entry
    → SET type = "recommends"
    → SET severity = "warning"
    → SET trigger = "addItem"
    → SET condition = { "item.category": [source entity category] }
    → SET action = { "suggest": [target entity id] }
    → SET message = relationship rationale from DOMAIN.md

  IF relationship type = "excludes":
    → CREATE config.rules[] entry
    → SET type = "excludes"
    → SET severity = "error"
    → SET trigger = "addItem"
    → SET condition = { "item.category": [source entity category] }
    → SET action = { "block": [target entity id] }
    → SET message = relationship rationale from DOMAIN.md
```

### Business Rule → Validation Mapping

```
FOR EACH rule in DOMAIN.md Business Rules:

  IF rule mentions "approval" or "requires authorization":
    → CREATE config.rules[] entry
    → SET type = "validates"
    → SET trigger = the action being gated (e.g., "setTerms", "approveQuote")
    → SET condition = the triggering condition
    → SET action = { "requireApproval": [role] }
    → SET severity = "warning"
    → SET message = rule rationale

  IF rule mentions "cannot" or "must not" or "not allowed":
    → CREATE config.rules[] entry
    → SET type = "validates"
    → SET trigger = the blocked action
    → SET condition = the triggering condition
    → SET action = { "block": true }
    → SET severity = "error"
    → SET message = rule rationale

  IF rule mentions pricing constraint (markup, margin, discount limit):
    → CREATE config.rules[] entry
    → SET type = "computes"
    → SET trigger = "priceCalculation"
    → SET condition = the pricing formula or constraint
    → SET action = { "compute": [formula description] }
    → SET message = rule rationale
```

### State Model → Quote Settings Mapping

```
IF DOMAIN.md State Models contains payment terms or approval statuses:
  → MAP to config.data.quoteSettings.availableTerms[]
  → SET config.data.quoteSettings.defaultTerms = the default mentioned

IF DOMAIN.md State Models contains quote statuses:
  → MAP to section gating logic
  → The CPQ skill handles this through the fixed section definitions (Configure → Quote → Preview → Approve)
```

### Branding → Theme Mapping

```
→ SET config.app.companyName = DOMAIN.md Project Overview company name
→ SET config.app.theme.primaryColor = from brandfetch (or fallback "#1a1a2e")
→ SET config.app.theme.accentColor = from brandfetch (or fallback "#3b82f6")
→ SET config.app.theme.logoUrl = from brandfetch
→ SET config.app.theme.mode = "light"
```

### Quote Settings Mapping

```
→ SET config.data.quoteSettings.currency = from DOMAIN.md (or default "USD")
→ SET config.data.quoteSettings.taxEnabled = true/false based on DOMAIN.md
→ SET config.data.quoteSettings.taxLabel = from DOMAIN.md (e.g., "HST", "GST", "Sales Tax")
→ SET config.data.quoteSettings.taxRate = from DOMAIN.md (decimal, e.g., 0.13 for 13%)
→ SET config.data.quoteSettings.defaultTerms = from DOMAIN.md (e.g., "net30")
→ SET config.data.quoteSettings.markup = from DOMAIN.md (decimal, e.g., 0.375 for 37.5%)
→ SET config.data.quoteSettings.quoteFormat = "itemized" (default, unless DOMAIN.md says otherwise)
```

### Role Mapping

```
FOR EACH role in DOMAIN.md User Roles:
  → CREATE config.roles[] entry
  → SET id = slugify(role name)
  → SET label = role name (exact, from DOMAIN.md)
  → SET permissions = infer from DOMAIN.md role description:
      IF role creates quotes → ["createQuote", "editQuote", "selectProducts"]
      IF role approves → ["approveQuote", "approveTerms", "viewReports"]
      IF role manages catalog → ["editCatalog", "editPricing"]
      IF role is view-only → ["viewQuotes"]
  → IF permissions cannot be inferred → SET permissions = ["createQuote", "editQuote"] (safe default)
```

### Edge Cases

```
→ IF entity has no price → SET pricingSource = "tbd", ADD to config metadata openQuestions
→ IF relationship rationale is missing → SET message = "[source] [relationship] [target] — rationale not captured"
→ IF entity cannot be classified as a product → SKIP, ADD to config metadata openQuestions
→ IF DOMAIN.md has Open Questions → COPY to config.metadata.openQuestions for reference
→ IF no roles are defined in DOMAIN.md → CREATE one default role: { id: "user", label: "User", permissions: ["createQuote", "editQuote", "selectProducts"] }
→ IF no pricing information at all → SET quoteSettings.markup = 0, quoteSettings.currency = "USD", ADD note to openQuestions
```

---

## Business Rule Templates

Common CPQ rule patterns the Builder Agent can use when DOMAIN.md describes rules in natural language:

### Product Dependency (hard)
```json
{
  "id": "BR-XXX",
  "type": "requires",
  "trigger": "addItem",
  "condition": { "item.category": "[source_category]" },
  "action": { "suggest": "[target_product_id]", "matchField": "[matching_attribute]" },
  "message": "[rationale from DOMAIN.md]",
  "severity": "error"
}
```

### Product Recommendation (soft)
```json
{
  "id": "BR-XXX",
  "type": "recommends",
  "trigger": "addItem",
  "condition": { "item.category": "[source_category]" },
  "action": { "suggest": "[target_product_id]" },
  "message": "[rationale from DOMAIN.md]",
  "severity": "warning"
}
```

### Product Exclusion
```json
{
  "id": "BR-XXX",
  "type": "excludes",
  "trigger": "addItem",
  "condition": { "item.category": "[source_category]" },
  "action": { "block": "[target_product_id]" },
  "message": "[rationale from DOMAIN.md]",
  "severity": "error"
}
```

### Approval Gate
```json
{
  "id": "BR-XXX",
  "type": "validates",
  "trigger": "[gated_action]",
  "condition": { "[field]": { "$ne": "[default_value]" } },
  "action": { "requireApproval": "[role_id]" },
  "message": "[rationale from DOMAIN.md]",
  "severity": "warning"
}
```

### Price Computation
```json
{
  "id": "BR-XXX",
  "type": "computes",
  "trigger": "priceCalculation",
  "condition": { "item.pricingSource": "cost_plus" },
  "action": { "compute": "sellingPrice = cost * (1 + markup)" },
  "message": "Cost-plus pricing: [markup]% markup applied",
  "severity": "info"
}
```

---

## Vertical Presets

See `references/vertical-presets.md` for full details. Summary:

| Vertical | Products Are | Pricing Model | Key Dependency Pattern | Quote Style |
|---|---|---|---|---|
| **Manufacturing / BOM** | Fabricated equipment, assemblies | Cost-plus or vendor RFQ | Equipment requires accessories, parts, installation | Itemized with scope of work |
| **Wholesale / Distribution** | Catalog items, bulk goods | Price list with volume tiers | Product bundles, case/pallet quantities | Itemized with quantity breaks |
| **Services / Equipment Integrator** | Equipment + installation + PM | Mixed (catalog + vendor RFQ + labor rates) | Equipment requires service, service includes consumables | Itemized with service schedule |

The Builder Agent uses the vertical preset as a starting point, then overrides with specifics from DOMAIN.md.

---

## Mapping Log

After executing the mapping rules, the Builder Agent should produce a brief mapping log as an audit trail:

```markdown
## Mapping Log

**Skill:** cpq-builder v3.0
**DOMAIN.md:** [company name]
**Vertical preset:** [manufacturing / wholesale / services / none]

### Products mapped: [N]
- [entity name] → config.data.products[0] ([pricingSource], [N] options)
- [entity name] → config.data.products[1] ([pricingSource], [N] options)

### Rules mapped: [N]
- BR-001: [source] requires [target] → severity: error
- BR-002: [source] recommends [target] → severity: warning

### Skipped entities: [N]
- [entity name] — not a quotable product (added to openQuestions)

### Open questions carried forward: [N]
- [question from DOMAIN.md]
```

This log is NOT part of the config. It's a separate output that can be reviewed if the config seems wrong.

---

## Reference Files

- `references/config-schema.md` — Full TypeScript interfaces for the CPQ config shape
- `references/vertical-presets.md` — Detailed presets for Manufacturing, Wholesale, and Services
- `references/example-config.json` — Fully populated Total Water example config
