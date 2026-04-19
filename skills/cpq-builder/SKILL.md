---
name: cpq-builder
license: MIT
compatibility: Works with any AI coding assistant that supports the Agent Skills specification. Requires a running Customware SPA instance to consume the generated config.
metadata:
  author: ryan-price
  version: "4.1"
description: >
  Configure-Price-Quote (CPQ) vertical skill for the Customware SPA. Defines the section
  layout, config schema, business rule templates, and deterministic mapping rules for
  transforming a DOMAIN.md into a CPQ application. Use this skill when the Builder Agent
  classifies a customer's domain as any system that collects structured inputs, applies
  calculation rules, produces an output document, and optionally routes it for review.
  Trigger signals: quoting, pricing, product configuration, calculators, guided intake forms,
  assessment tools, estimate builders, proposal workflows, eligibility checkers, any
  "fill in fields → calculate → produce a document" pattern.
---

# CPQ Builder Skill

## What This Skill Does

This skill defines how to build a **Configure-Price-Quote** tool — any system where users configure inputs, the system applies rules to calculate results, and the output is a formatted document that may require review/approval.

CPQ is NOT limited to product pricing. The same structural pattern covers:

| Domain | "Configure" | "Price" (Calculate) | "Quote" (Output) |
|---|---|---|---|
| **Equipment sales** | Select product, pick options | Apply markup, calculate totals | Sales quote PDF |
| **Legal calculators** | Enter case details (income, duration) | Apply guideline formulas | Summary report with estimates |
| **Insurance estimators** | Enter coverage details | Apply rate tables | Premium estimate document |
| **Loan qualification** | Enter financial details | Apply lending criteria | Qualification letter |
| **Benefits eligibility** | Enter personal details | Apply eligibility rules | Benefits summary |
| **Service proposals** | Select services, set scope | Apply labor rates | Service proposal |

The builder reads this skill, reads the DOMAIN.md for the specific domain terminology and rules, and generates a working prototype. The DOMAIN.md determines whether the tool is about crane quotes or divorce calculations — the skill defines the structure.

## When to Use This Skill

The Builder Agent should select this skill when the customer's DOMAIN.md contains:

**Classic CPQ signals:**
- Products or services that are quoted/priced for customers
- Configuration options (sizes, models, variants, materials)
- Dependencies between products (requires, recommends, excludes)
- Markup or margin-based pricing (cost-plus, vendor list + percentage)
- A quoting or proposal workflow (draft → review → approve → send)

**Broader "configure-calculate-output" signals:**
- A calculator, estimator, or assessment tool
- Guided intake forms where inputs drive calculated outputs
- Multi-step data collection with rules applied to produce results
- Output documents (reports, summaries, estimates, proposals)
- A preparer/reviewer workflow (client fills in → professional reviews)
- "Fill out this form based on these guidelines and get an estimate"

**Classification signals from the Clarence transcript:**
- "quoting is a mess," "inconsistent pricing," "reps don't know what goes with what"
- "calculator," "estimator," "guided form," "step-through guide"
- "fill out fields and get a result," "apply the guidelines," "produce a report"
- "client submits, then the [professional] reviews"
- Products with accessories, parts, or services that must go together

**Do NOT use this skill when** the domain is primarily about inventory tracking (use ERP skill), ongoing project execution with field tracking and payments (use trades-builder), online product sales (use e-commerce skill), or customer relationship management (use CRM skill).

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

The CPQ application uses a **three-panel layout** with **FIVE sections** (not four). The builder MUST follow this layout — not a single scrolling page with all sections stacked.

The five sections are: **Configure, Build Quote, Preview, Approve, Quote Document.** The task description from the project agent may only list four stages — the Quote Document is always added as the fifth section by this skill regardless of what the task says. Do not skip it.

### Left sidebar (always visible, collapsible)

This content goes INTO the template's existing sidebar slot — it REPLACES the template's default navigation. Do not create a second sidebar next to the template's default one. One left sidebar total.

**The most common mistake:** The builder keeps the template sidebar as a thin dark brand strip (company name + logo) on the far left, then builds the workflow stepper as a SECOND column next to it. This creates two left columns. **This is WRONG.** The company name and logo belong in the HEADER BAR, not in a separate sidebar strip. The sidebar slot gets the workflow stepper and saved items — nothing else.

**Preserve the template's collapsible sidebar behavior.** If the template has a sidebar toggle button (hamburger icon, collapse arrow, etc.), keep it working. Inject the skill content (stepper, saved items) INTO the existing collapsible component — do not rebuild the sidebar from scratch and lose the collapse feature. If you must create a new sidebar component, include a collapse toggle that hides the sidebar and expands the main content area.

**Sidebar heading:** Use a contextual label like "Quote workflow" or "Business process" — not the company name (which is already in the header). The sidebar heading describes what the navigation IS, not who it's for.

| Component | Content |
|---|---|
| **Stepper** | A VERTICAL list of ALL FIVE CPQ sections in the left sidebar: (1) Configure, (2) Build Quote, (3) Preview, (4) Approve, (5) Quote Document. Each step shows: step number, label, subtitle, and completion state (pending / active / done with checkmark). Clicking a step navigates to that section's panel. **This is a vertical stepper in the sidebar — NOT horizontal tabs in the main content area.** If you cannot put the stepper in the sidebar without modifying the layout file, modify the layout file. The skill layout overrides template preservation. |
| **Saved items** | List of saved records stored in localStorage. Each shows name + status badge (Draft / Awaiting Review / Approved). Clicking loads the record. "New" button at top. **Pin this section to the bottom of the sidebar** so it's always visible without scrolling — use flexbox with stepper taking available space and saved items fixed at the bottom. Double-click a name to rename inline. The label should match the domain: "Saved quotes" for product domains, "Saved submissions" for intake/calculator domains, or whatever DOMAIN.md calls them. |

The **role switcher** is in the header bar as a dropdown — not in the left sidebar. See Layout Principles in the builder prompt.

### Main content (center — changes per section)

**Only the active section renders.** Do NOT stack all four sections on one scrolling page. Do NOT render sections as side-by-side cards. Each stepper step shows its corresponding panel at FULL WIDTH of the main content area. All other panels are hidden.

**Do NOT put the stepper as horizontal tabs at the top of the main content area.** The stepper belongs in the left sidebar as a vertical list. Horizontal tabs are a common wrong interpretation — the builder defaults to them because they avoid modifying the layout file. Modify the layout file instead.

Implementation: use a `currentStep` state variable (0–4, not 0–3). Render only the panel that matches `currentStep`. When the user clicks a stepper step, update `currentStep` and only that panel appears.

```tsx
// Correct: ALL FIVE panels, conditional rendering
{currentStep === 0 && <ConfigurePanel />}
{currentStep === 1 && <BuildQuotePanel />}
{currentStep === 2 && <PreviewPanel />}
{currentStep === 3 && <ApprovePanel />}
{currentStep === 4 && <QuoteDocumentPanel />}
```

If you define a WorkflowStep type, it must include all five:
```tsx
type WorkflowStep = "configure" | "build" | "preview" | "approve" | "document";
```

```tsx
// WRONG: all panels visible, scroll to find the right one
<ConfigurePanel />
<BuildQuotePanel />
<PreviewPanel />
<ApprovePanel />
<QuoteDocumentPanel />
```

| Section | What renders |
|---|---|
| **Configure** | Input selection or data entry. For product domains: product cards with options and prices. For calculator/intake domains: guided form sections with input fields, dropdowns, and validation. The DOMAIN.md determines which pattern — if entities have prices and options, use product cards. If entities are form fields with rules, use guided form sections. |
| **Build Quote** | Results assembly and review. For product domains: line items table with quantities, prices, editable rows. For calculator/intake domains: calculated results table showing inputs → applied rules → outputs. Editable where the domain allows adjustments. |
| **Preview** | Read-only summary: subtotal, tax line (HST/GST with rate), total (for pricing domains) or calculated results summary (for calculator domains). Payment terms or output parameters. Formatted for internal review before approval. |
| **Approve** | Approval owner display, status badge (Pending / Approved / Rejected). Approve and reject buttons. **Gated by role** — only roles with approval permission can approve. Other roles see a message: "You are viewing as [Name]. Only [approver names] can approve." For intake domains: the reviewer (lawyer, underwriter, advisor) reviews the submission. |
| **Quote Document** | The final formatted output — what you would send to the customer or print. For product domains: a sales quote. For calculator/intake domains: a summary report with inputs, calculations, results, and any disclaimers. See details below. |

### Quote Document (final output view)

This is the polished, recipient-facing summary. It renders as a clean, printable document inside the main content area — not a modal, not a PDF viewer, just a formatted card.

**Layout — top to bottom:**

1. **Company header** — brand logo (from domain.md brand assets) + company name + placeholder address ("123 Main St, City, Province, Postal Code — update in settings"). Clean horizontal layout.
2. **Document metadata** — document name, date, reference number (auto-generated), recipient name, source, assigned to. Two-column grid of label/value pairs.
3. **Configuration / input summary** — what was configured or entered. For product domains: selected product, chosen options, optional items. For calculator/intake domains: all input values organized by section.
4. **Results table** — For product domains: line items with item name, description, quantity, unit price, line total. For calculator domains: calculated results with labels, formulas applied, and output values. Clean table with a footer row.
5. **Totals block** — subtotal, tax line (if applicable), grand total or final calculated result. The primary result should be visually prominent (larger text, bold).
6. **Terms and disclaimers** — payment terms, currency, validity period, and any legal disclaimers from DOMAIN.md. For legal/financial calculators: mandatory disclaimer text.
7. **Status badge** — current status (Draft / Awaiting Review / Approved / Complete) displayed clearly.

**This view is read-only.** No edit controls. If the user wants to change something, they click back to Configure or Build Quote in the stepper. The Quote Document is the output, not the workspace.

### Right sidebar (always visible)

| Component | Content |
|---|---|
| **Live summary** | Live-updating card: For product domains — selected product, chosen options, running subtotal, tax, total. For calculator domains — key inputs entered so far, preliminary results. Updates immediately when the user changes any input. |
| **Workflow notes** | Business rules and routing info from DOMAIN.md displayed as contextual guidance cards. For calculator domains, this can include "Guidelines applied" or "Rules being used." |

### RBAC behavior

- Seed localStorage with roles from DOMAIN.md User Roles or Stakeholder Map.
- Role switcher is a **single `DropdownMenu` dropdown in the header bar** — not separate buttons for each role. The dropdown trigger shows the active role name and badge (e.g., "Jeff — Approver"). Clicking opens the menu listing all roles. **Do NOT render each role as a separate button in the header row.** One trigger, one dropdown menu. Selecting a new role updates the view immediately.
- **Approval gating**: If DOMAIN.md says "only Andy or Jeff can approve," disable the Approve button when viewing as Dre or Manish. Show a clear message explaining why.
- **Routing visibility**: If a role handles specific work types (e.g., "Dre handles maintenance"), show relevant routing info when that role is active.

### Price and results visibility

- **For pricing domains:** Show prices on EVERY screen where products or options appear. Option selection immediately updates the right sidebar total. Preview section calculates: subtotal + tax = total. Use the tax type from DOMAIN.md (HST = 13%, GST = 5%). Currency from DOMAIN.md (CAD, USD) appears in all price displays.
- **For calculator/intake domains:** Show calculated results as they become available. If partial results can be computed from the inputs entered so far, show them in the right sidebar. The Preview section shows the full calculation results. Use the output format specified in DOMAIN.md (monetary amounts, percentages, ranges, scores).

### shadcn/ui component mapping

Use these shadcn/ui components for each CPQ element. Do not build custom equivalents when an existing component does the job. Import from `~/components/ui/*`.

| CPQ Element | Component | Source | Usage Notes |
|---|---|---|---|
| Product card | `Card`, `CardHeader`, `CardContent` | shadcn | Show product name, description, base price. |
| Motor / option selection | `RadioGroup`, `RadioGroupItem` | shadcn | Mutually exclusive options. Show price next to each label. Wrap in a Card. |
| Optional items (installation) | `Checkbox` with label | shadcn | Toggle on/off. Show description below the label. |
| Status badges | `Badge` | shadcn | Use `variant="outline"` for Draft, `variant="default"` for Awaiting Approval, `variant="secondary"` for Approved. Apply semantic colors via className. |
| Role badges | `Badge` | shadcn | `variant="outline"` for Staff, `variant="default"` for Approver, `variant="secondary"` for View only. |
| Line items table | `Table`, `TableHeader`, `TableRow`, `TableCell` | shadcn | Clean header row, right-align price columns. Use `TableFooter` for subtotal row. |
| Saved quotes list | Custom list with `Badge` | shadcn | Each item is a clickable row with `Badge` for status. Use `ScrollArea` if the list could overflow. |
| Form inputs | `Input`, `Label` | shadcn | Quote name, customer name, notes. Stack label above input. |
| Dropdowns | `Select`, `SelectContent`, `SelectItem` | shadcn | Lead source, assigned-to, motor selection (alternative to RadioGroup for compact layouts). |
| Action buttons | `Button` | shadcn | Primary: `variant="default"` with brand accent. Secondary: `variant="outline"`. Destructive: `variant="destructive"`. |
| Section dividers | `Separator` | shadcn | Between sections within a panel. Horizontal, subtle. |
| Stepper navigation | Custom (no library component) | — | Build as a vertical list of clickable items in the left sidebar. Use `cn()` for active/done/pending states. Step number in a circle, label, subtitle, completion checkmark. |
| Role switcher | `DropdownMenu` | shadcn | In the header. Shows active role name and badge. Dropdown lists all roles. |
| Quote summary sidebar | `Card` with stacked label/value rows | shadcn | Labels are `text-muted-foreground text-sm`. Values are `font-medium`. Total row is `text-lg font-semibold`. |
| Workflow notes sidebar | `Card` with `text-sm text-muted-foreground` | shadcn | Reference material, not primary content. Small text, muted colors. |
| Confirmation dialogs | `AlertDialog` | shadcn | For destructive actions (delete quote, reject quote). |
| Toast notifications | `Sonner` / `toast()` | shadcn | After save, approve, reject, delete. Brief confirmation messages. |
| Quote document header | `Card` with logo image + company name | shadcn | Brand logo from domain.md assets. Placeholder address below. |
| Quote document pricing table | `Table` with `TableFooter` | shadcn | Clean itemized rows. Footer shows subtotal. Totals block below with large bold total. |
| Quote notes | `Textarea` | shadcn | Plain text editing for internal notes. |

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

### Entity → Configurable Item Mapping

```
FOR EACH entity in DOMAIN.md Entity Registry:

  — PRODUCT DOMAINS (entities have prices, options, accessories):
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
          → CREATE option entry with id, label, type, choices

  — CALCULATOR / INTAKE DOMAINS (entities are input fields with rules):
  WHERE entity description suggests an input field, data point, or parameter:
    → CREATE config.data.inputSections[] entry
    → GROUP related inputs into sections (e.g., "Personal details," "Financial details")
    → SET field.id = slugify(field name)
    → SET field.label = field name (exact, from DOMAIN.md)
    → SET field.type = infer from context:
        IF enumerated values → "select" with options
        IF yes/no → "checkbox"
        IF date → "date"
        IF number (income, amount, duration) → "number"
        IF free text → "text"
    → SET field.required = true if DOMAIN.md marks it as mandatory
    → SET field.validation = from business rules (min/max, format, constraints)

  WHERE entity has NO price, NO options, NO input role, and is NOT referenced:
    → SKIP — it's probably not configurable
    → ADD to Open Questions: "Is [entity] an input or a quotable item?"
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

| Vertical | "Configure" Inputs | Calculation Model | Key Rule Pattern | Output Style |
|---|---|---|---|---|
| **Manufacturing / BOM** | Products with options, accessories | Cost-plus or vendor RFQ | Equipment requires parts/installation | Itemized quote with scope of work |
| **Wholesale / Distribution** | Catalog items, bulk goods | Price list with volume tiers | Product bundles, case/pallet quantities | Itemized quote with quantity breaks |
| **Services / Integrator** | Equipment + installation + PM | Mixed (catalog + labor rates) | Equipment requires service, service includes consumables | Itemized quote with service schedule |
| **Legal / Compliance** | Case details, personal/financial data | Guideline formulas, statutory tables | Input dependencies (field X required when Y = Z) | Summary report with calculations + disclaimer |
| **Financial / Insurance** | Coverage details, risk factors | Rate tables, actuarial formulas | Eligibility rules, coverage limits | Estimate document with ranges + terms |
| **Assessment / Eligibility** | Personal/business details | Scoring models, threshold rules | Pass/fail criteria, tiered outcomes | Assessment report with recommendations |

The Builder Agent uses the vertical preset as a starting point, then overrides with specifics from DOMAIN.md. For product domains, "Configure" means product selection. For calculator/intake domains, "Configure" means guided data entry.

---

## Mapping Log

After executing the mapping rules, the Builder Agent should produce a brief mapping log as an audit trail:

```markdown
## Mapping Log

**Skill:** cpq-builder v3.8
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
