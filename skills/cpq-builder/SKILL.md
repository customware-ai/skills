---
name: cpq-builder
license: MIT
compatibility: Works with any AI coding assistant that supports the Agent Skills specification. Requires a running Customware SPA instance to consume the generated config.
metadata:
  author: ryan-price
  version: "4.4"
description: >
  Configure-Price-Quote (CPQ) vertical skill for the Customware SPA. Defines section
  patterns, layout patterns, business rule templates, and mapping rules for transforming
  a DOMAIN.md into a CPQ-shaped application. The patterns are defaults, not mandates —
  adapt them when the actual workflow deviates. Use this skill when the Builder Agent
  classifies a customer's domain as a "guided intake → calculation/rules → reviewable
  deliverable → handoff" workflow. Trigger signals: quoting, pricing, product configuration,
  calculators, guided intake forms, assessment tools, estimate builders, proposal workflows,
  eligibility checkers, any "fill in fields → calculate → produce a deliverable" pattern.
---

# CPQ Builder Skill

## What This Skill Does

This skill defines patterns for building **Configure-Price-Quote**-shaped tools — systems where users configure inputs, the system applies rules to calculate results, and the output is a formatted deliverable that may require review/approval.

CPQ is NOT limited to product pricing. The same structural pattern covers:

| Domain | "Configure" | "Calculate" | "Output" |
|---|---|---|---|
| **Equipment sales** | Select product, pick options | Apply markup, calculate totals | Sales quote PDF |
| **Legal calculators** | Enter case details (income, duration) | Apply guideline formulas | Summary report with estimates |
| **Insurance estimators** | Enter coverage details | Apply rate tables | Premium estimate document |
| **Loan qualification** | Enter financial details | Apply lending criteria | Qualification letter |
| **Benefits eligibility** | Enter personal details | Apply eligibility rules | Benefits summary |
| **Service proposals** | Select services, set scope | Apply labor rates | Service proposal |

The builder reads this skill, reads the DOMAIN.md for the specific domain terminology and rules, and generates a working prototype. The DOMAIN.md determines whether the tool is about crane quotes or divorce calculations; this skill provides the structural pattern that fits.

**The patterns in this skill are defaults, not mandates.** When the actual workflow deviates from the canonical CPQ shape — has fewer stages, has a different layout, produces a different output — adapt the patterns. Each major section below names the deviations explicitly.

---

## Is This Even CPQ?

Before applying any pattern in this skill, confirm the workflow is actually CPQ-shaped. The CPQ pattern fits when ALL FOUR of these hold:

1. **The user collects structured inputs** that determine the outcome (configuration choices, customer details, requirements, financial data, case details).
2. **Business rules or calculation logic transforms those inputs** into a deliverable (markup formulas, guideline calculations, rate tables, eligibility rules).
3. **A review or approval gate exists** between input and finalization, OR the deliverable goes through some kind of stakeholder review (preparer/reviewer pattern).
4. **The work product feels like it gets handed off** — to a customer, an internal stakeholder, a regulatory body, a downstream system.

If criterion 1 is missing → it's a dashboard or display tool, not CPQ. Bail.
If criterion 2 is missing → it's a data entry form, not CPQ. Bail.
If criterion 3 is missing → it's "intake-and-deliver" — apply CPQ patterns but skip the Approve section.
If criterion 4 is missing → it's a personal calculator/utility, not CPQ. Bail.

**When this skill doesn't fit:** the picker prompt may have loaded this skill based on surface signals ("quoting tool," "calculator," "estimator") that don't actually match the workflow shape. If the four criteria don't hold, do not force-fit the patterns below. Build from the task description and DOMAIN.md using frontend-design's principles instead.

**Common false positives:**
- A "stock quote viewer" — has the word "quote" but is a display tool (criterion 1 missing)
- A "tax calculator" with no review step — utility, not CPQ (criterion 3 + 4 missing)
- A "product catalog" with prices — display, not CPQ (criterion 2 + 3 missing)
- A "feedback form" — data entry, not CPQ (criterion 2 missing)

---

## When to Use This Skill

When the four criteria above hold AND the customer's DOMAIN.md contains:

**Classic CPQ signals:**
- Products or services that are quoted/priced for customers
- Configuration options (sizes, models, variants, materials)
- Dependencies between products (requires, recommends, excludes)
- Markup or margin-based pricing (cost-plus, vendor list + percentage)
- A quoting or proposal workflow (draft → review → approve → send)

**Broader "configure-calculate-output" signals:**
- A calculator, estimator, or assessment tool with a review/handoff step
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

## Domain Type

Most CPQ-shaped workflows fall into one of two domain types. Identify which type the build is before applying patterns:

**Product domain.** The user configures sellable products/services. Pricing is the central calculation. Output is a quote document with line items, totals, tax, and terms. Examples: equipment sales (HB Material Handling cranes), service proposals (consulting bids), software licensing.

**Calculator/intake domain.** The user enters case/applicant details. Calculation applies guidelines/rules/rate tables. Output is a summary report with inputs, calculated values, and disclaimers. Examples: spousal support calculators (Clarity Legal), insurance estimators, loan qualification, benefits eligibility.

The skill's patterns adapt to both. When a section or rule is domain-specific, this skill says so explicitly.

---

## Template Contract

Before you start building, understand what the template gives you and what this skill adds. This is the contract:

**The template (`app/layouts/MainLayout.tsx`) ships with:**
- `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarInset`, `SidebarTrigger` — already wired
- `SidebarContent` is **empty** — this is your landing zone
- One brand slot in the header (logo placeholder + company name)
- `ModeToggle` and user menu in the header's right cluster

**This skill fills:**
- `SidebarContent` — with section navigation (see Layout Pattern below)
- The brand slot in the header — with the client's logo and company name from DOMAIN.md
- The header's right cluster — adds a role switcher `DropdownMenu` before the existing user menu when the workflow has multiple roles
- The `<Outlet />` in `<main>` — via route components for each section

**This skill does NOT:**
- Add a second `Sidebar` component. There is one sidebar.
- Put a brand tile inside `SidebarContent`. Brand lives in the header only.
- Rewire `SidebarProvider` or replace the collapsible behavior. Use what's there.

If the workflow doesn't fit a sidebar layout (see Layout Pattern alternatives below), the build may use a different shell. In that case, document the deviation in the completion summary.

---

## Section Pattern

The canonical CPQ workflow has four sections in this order:

1. **Configure** — collect structured inputs
2. **Build Quote** (or **Calculate**) — assemble/review the calculated result
3. **Approve** — review/approval gate
4. **Quote Document** (or **Output Document**) — final formatted deliverable

This is the default. Adapt to the actual workflow:

### Deviations

**Skip Build Quote / Calculate** when configuration directly produces the output. Example: a simple two-input calculator (income A + income B → support estimate) where there's nothing to "build" between input and output. Configure → Approve → Output. Three sections.

**Skip Approve** when the workflow has no review gate. Example: a self-service calculator where the user just wants their own estimate. Configure → Calculate → Output. Three sections. (This is the "intake-and-deliver" case — criterion 3 from "Is This Even CPQ?" is borderline-missing.)

**Replace Quote Document with the actual deliverable** when the output isn't a document. Examples:
- A confirmation page ("Your application has been submitted")
- An order summary that pushes to a downstream system
- An inline result panel (no separate "document" view, just a results section)

**Add a Discover or Intake section before Configure** when the workflow has a discovery phase. Example: enterprise quoting that captures customer requirements before configuration begins. Discover → Configure → Build Quote → Approve → Quote Document. Five sections.

**Add a Submit or Send section after Quote Document** when the workflow has an explicit handoff step. Example: legal calculators that submit to a lawyer queue after the report is generated.

**Pick the section count that matches the actual workflow.** A three-section build that fits is better than a four-section build that's padded. A five-section build that captures real workflow phases is better than collapsing them into four.

### Canonical Four-Section Definition (use as starting point)

The configuration below is the default pattern for product/pricing domains. Adapt section count, names, and components based on the deviations above.

```json
{
  "sections": [
    {
      "id": "configure",
      "label": "Configure",
      "icon": "Settings2",
      "order": 1,
      "component": "selector",
      "componentConfig": {
        "itemLayout": "grid",
        "showPrice": true,
        "showDescription": true,
        "showOptions": true,
        "selectionMode": "add-to-list",
        "groupBy": "category",
        "capturePricing": true
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
          { "key": "unitPrice", "label": "Unit Price", "width": "120px", "format": "currency", "editable": true },
          { "key": "total", "label": "Total", "width": "120px", "format": "currency", "computed": true }
        ],
        "showRowActions": true,
        "rowActions": ["edit", "duplicate", "remove"],
        "showTotalsFooter": true
      },
      "dataSource": "data.lineItems",
      "actions": [
        { "label": "Continue to Approval", "action": "navigateTo:approve", "variant": "primary" },
        { "label": "Clear All", "action": "clearItems", "variant": "ghost", "confirm": true }
      ]
    },
    {
      "id": "approve",
      "label": "Approve",
      "icon": "CheckCircle",
      "order": 3,
      "component": "form",
      "componentConfig": {
        "fields": [
          { "key": "customerName", "label": "Customer Name", "type": "text", "required": true },
          { "key": "customerEmail", "label": "Customer Email", "type": "email" },
          { "key": "paymentTerms", "label": "Payment Terms", "type": "select", "default": "net30" },
          { "key": "notes", "label": "Notes", "type": "textarea" },
          { "key": "validUntil", "label": "Valid Until", "type": "date" }
        ],
        "confirmBeforeSubmit": true
      },
      "dataSource": "data.quoteSettings",
      "gated": {
        "requires": ["customerName", "hasLineItems", "hasPricing", "noErrors"],
        "message": "Complete these before approving: customer name, at least one product with unit price, no unresolved dependency errors."
      },
      "actions": [
        { "label": "Approve & Send", "action": "approveQuote", "variant": "primary", "confirm": true },
        { "label": "Save Draft", "action": "saveDraft", "variant": "secondary" }
      ]
    },
    {
      "id": "document",
      "label": "Quote Document",
      "icon": "FileOutput",
      "order": 4,
      "component": "quote-document",
      "componentConfig": {
        "readOnly": true,
        "printable": true,
        "showBrandHeader": true,
        "showLineItemsTable": true,
        "showTotalsBlock": true,
        "showTermsBlock": true
      },
      "dataSource": "data.currentQuote",
      "actions": [
        { "label": "Back to Approve", "action": "navigateTo:approve", "variant": "ghost" }
      ]
    }
  ],
  "navMode": "stepper"
}
```

For calculator/intake domains, the equivalent shape uses different labels and components:

```json
{
  "sections": [
    { "id": "intake", "label": "Submission Details", "component": "form" },
    { "id": "calculate", "label": "Calculation", "component": "results-panel" },
    { "id": "review", "label": "Lawyer Review", "component": "review-form" },
    { "id": "report", "label": "Final Report", "component": "summary-document" }
  ]
}
```

The skill's structural pattern is the same; the labels, components, and data shapes adapt to the domain.

### Pricing/Calculation Capture

The "calculation" step is the heart of the CPQ pattern. Skipping it means the build is intake routing, not CPQ.

**For product domains** — pricing capture is mandatory when DOMAIN.md has any pricing signal:

- Entity Registry mentions prices, rates, or costs ("Example price: $15,000")
- Approved Pricing Reference, rate card, or pricing table is present
- Business Rules reference monetary thresholds or calculations
- The customer mentioned currency, tax, payment terms, quotes, estimates, proposals

What the build must include:

1. **Unit price field** — number input or product picker that loads price from a pricing table. Never as a hardcoded constant.
2. **Quantity field** — defaults to 1, editable.
3. **Line total** — unit price × quantity, displayed per line and as footer subtotal.
4. **Tax line** — IF DOMAIN.md mentions tax. Tax name (HST, GST, VAT, Sales Tax) and rate from DOMAIN.md. If rate not specified but tax type is, default to jurisdiction standard (HST → 13% Ontario, GST → 5% Canada-wide). If DOMAIN.md doesn't mention tax at all, omit the tax line — don't invent one.
5. **Grand total** — subtotal + tax (or just subtotal if no tax).
6. **Payment terms** — from DOMAIN.md.
7. **Currency** — from DOMAIN.md.

**For calculator/intake domains** — calculation capture is mandatory:

1. **Calculation logic** — implements the guidelines/formulas/rate tables from DOMAIN.md as actual JavaScript. The calculation must produce real outputs from real inputs, not placeholder values.
2. **Result display** — calculated values (estimate ranges, scores, recommendations) shown clearly with the formula or rule basis labeled.
3. **Disclaimers** — any mandatory legal/regulatory language from DOMAIN.md (e.g., "This calculator provides estimates only. Consult a qualified [professional] for [advice type].").

**When calculation info is partial:** if the domain is clearly a calculation domain but DOMAIN.md doesn't have specific rates/values, build the calculation UI with placeholder rates and note the gap in the completion summary. Don't skip the calculation logic.

**Failure mode to avoid (product domain):** A prototype showing "Quote Document" with Customer/Product/Motor/Status/Terms but no price/subtotal/tax/grand total. That's routing masquerading as a quote.

**Failure mode to avoid (calculator domain):** A prototype showing "Calculation Result" with $0 or "TBD" because the formulas weren't implemented. That's a form, not a calculator.

---

## Layout Pattern

The default CPQ layout is **three panels** (left sidebar nav + main content + right context panel) with **section navigation in the sidebar**. This is the most common because most CPQ workflows are sequential and benefit from persistent navigation + persistent context.

The default isn't always right. Pick the layout that fits the workflow:

### Default: Sidebar Stepper Layout

```
+----------+--------------------------------+--------------------+
|          |                                 |                   |
| Stepper  |  [Active section panel]         |  Live summary     |
|          |  (configure / build / approve   |  Workflow notes   |
| Saved    |   / document — only one         |                   |
| items    |   shows at a time)              |                   |
|          |                                 |                   |
+----------+--------------------------------+--------------------+
```

Use when:
- Workflow has 3+ sequential sections
- Each section has substantial UI (forms, tables, document views)
- Users move through sections in roughly forward order
- Persistent context (running totals, saved items) helps the user

This covers most product CPQ and most preparer/reviewer calculator workflows.

### Alternative 1: Catalog-Driven Layout

```
+----------+--------------------------------+--------------------+
|          |                                 |                   |
| Category |  [Product browse / pick]        |  Cart / line      |
| nav      |                                 |  items            |
|          |                                 |                   |
|          |                                 |  [Checkout]       |
+----------+--------------------------------+--------------------+
```

Use when the user browses a catalog and adds to a quote like a shopping cart. Replaces the stepper with category navigation. Build → Approve → Document still happen but as discrete actions from the cart, not stepper steps.

### Alternative 2: Calculator-Style Layout

```
+--------------------------------------------------------------+
|  [Single-column form]                                         |
|                                                               |
|  Personal details                                             |
|    [field rows]                                               |
|                                                               |
|  Financial details                                            |
|    [field rows]                                               |
|                                                               |
|  ─────────────────────────────────────                       |
|                                                               |
|  Calculated result                                            |
|    [inline output panel — updates as user types]              |
|                                                               |
|  [Submit for review]                                          |
+--------------------------------------------------------------+
```

Use when:
- The calculation is simple enough to show inline alongside the inputs
- There's no separate "build" or "approve" stage from the user's perspective (they fill, they submit)
- A multi-section stepper would feel like over-engineering

The Clarity Legal spousal support calculator client-facing flow fits this pattern (intake form with progress indicator across the top, results inline). The reviewer-facing flow uses the default sidebar stepper.

### Alternative 3: List/Detail with Workflow Inside

```
+----------+--------------------------------+--------------------+
|          | [List of quotes/submissions]   |  [Detail of       |
| Sidebar  |                                 |   selected item]  |
| (filters | row                             |                   |
|  / nav)  | row                             |  [Stepper appears |
|          | row                             |   inside this     |
|          |                                 |   detail panel]   |
|          |                                 |                   |
+----------+--------------------------------+--------------------+
```

Use when the primary surface is managing many quotes/submissions in parallel. The stepper applies to individual quotes, not as a global navigation. This is what the Clarity Legal lawyer review portal uses (Submission Review list with status sections).

### Picking the Layout

If the workflow is single-quote-at-a-time and sequential → Default Stepper.
If the user shops a catalog → Catalog-Driven.
If the calculation is the primary feature and it's simple → Calculator-Style.
If managing multiple in-flight workflows is the primary use → List/Detail.

When in doubt → Default Stepper. It's the most common because it works for most CPQ shapes.

### Sidebar Stepper Details (when using the default layout)

The template ships `SidebarProvider`, `Sidebar`, `SidebarContent`, and `SidebarTrigger` already wired. `SidebarContent` is empty — that's the slot this skill fills. Do not re-wire the sidebar, do not add a second `Sidebar` component, and do not put a brand tile inside it.

**Sidebar heading:** Use a contextual label like "Quote workflow" or "Submission workflow" — not the company name. The heading describes what the navigation IS.

| Component | Content |
|---|---|
| **Stepper** | Vertical list of all sections inside `SidebarContent`. Each step shows: step number, label, subtitle, completion state (pending / active / done with checkmark). All steps clickable at any time (not a wizard). Approve step shows gating indicators when requirements aren't met. Document step becomes clickable once approved/saved. |
| **Saved items** | List of saved records from localStorage. Shows name + status badge. "New" button at top. Pin to bottom of sidebar via flexbox. Double-click to rename. Label matches domain: "Saved quotes," "Saved submissions," "Saved estimates." |

**Implementation:** use a `currentStep` state variable. Render only the active panel. When user clicks a stepper step, update `currentStep` and only that panel appears.

```tsx
{currentStep === "configure" && <ConfigurePanel />}
{currentStep === "build" && <BuildQuotePanel />}
{currentStep === "approve" && <ApprovePanel />}
{currentStep === "document" && <DocumentPanel />}
```

Define the `WorkflowStep` type to match the actual sections in this build (3, 4, or 5 — whatever the deviations produced).

### Main Content Behavior

**Only the active section renders.** Do not stack sections on a single scrolling page. Do not render sections as side-by-side cards.

| Section | What renders |
|---|---|
| **Configure** | Inputs. Product domain: product/options selector with unit price fields. Calculator domain: form sections with input fields, dropdowns, validation. |
| **Build Quote / Calculate** | Assembly/review. Product domain: line items table with editable quantities, unit prices, computed totals, totals footer. Calculator domain: results panel showing inputs → applied rules → outputs. |
| **Approve / Review** | Approval owner display, status badge, approve/reject buttons. Gated by data presence and role. Confirmation dialog on approve summarizing the deliverable. |
| **Document / Report** | Final formatted output — see Output Document section below. |

### Right Sidebar (when using default layout)

| Component | Content |
|---|---|
| **Live summary** | Live-updating context. Product: selected product, options, running subtotal, tax, total. Calculator: key inputs entered so far, preliminary results. Updates immediately when inputs change. |
| **Workflow notes** | Business rules and routing info from DOMAIN.md as compact contextual notes. For calculators: "Guidelines applied" or rule basis. |

If the layout doesn't have a right sidebar (calculator-style, list/detail), inline the live summary into the main content area instead. The function is necessary; the sidebar position is not.

---

## Output Document

The final formatted deliverable. This is what the user receives, prints, or sends downstream. The default name is "Quote Document" for product domains; for calculator/intake domains, name it according to what the deliverable actually is — "Summary Report," "Estimate Report," "Eligibility Result," "Qualification Letter," "Final Report."

Treat it as a real document, not a summary card. **Minimum quality bar:** if you would be embarrassed to email this to the customer/recipient as "the deliverable," it is not done.

### Layout (top to bottom)

**1. Document header block** — two columns:
- Left: brand logo (with onError fallback to a tinted initials square — never a bare img tag). Company name. Company address (placeholder if not in DOMAIN.md).
- Right: document title (matches the deliverable type — "Quote," "Estimate," "Summary Report," etc.). Reference number (auto-generated, e.g., "Q-2026-0001," "EST-2026-0042," "SS-2026-0103"). Document date. Validity date if applicable.

**2. Prepared-for block** — labeled section with the recipient's name, contact email, any company name. Visual weight — most important identity on the document.

**3. Content block** — domain-specific:

For **product domains**: line items table.
| Column | Content |
|---|---|
| # | Line number |
| Description | Product name + configuration |
| Qty | Quantity |
| Unit Price | Per-unit, formatted with currency |
| Line Total | Qty × Unit Price |

For **calculator/intake domains**: inputs table + results table.
- Inputs table: each input field name → value (e.g., "Your Annual Gross Income → $45,000"; "Spouse's Annual Gross Income → $95,000")
- Results table: each calculated output → value with rule basis (e.g., "Low Estimate → $1,250 / month"; "Mid Estimate → $1,625 / month"; "High Estimate → $2,000 / month")

**4. Totals or Summary block** — domain-specific:

Product domain: right-aligned totals stack:
```
Subtotal:                    $XX,XXX.00
HST (13%):                    $X,XXX.00      [omit if no tax]
─────────────────────────────────────────
Total:                       $XX,XXX.00 CAD
```

Calculator domain: prominent display of the primary calculated value (or value range). Three-card layout (Low / Mid / High) with the primary value visually emphasized works well for range outputs. Single bold display works for single-value outputs.

**5. Terms or Disclaimer block** — clearly delimited:

Product domain: payment terms, currency, validity period, mandatory terms.

Calculator/intake domain: **mandatory disclaimers from DOMAIN.md**. Legal calculators must include "this is an estimate, not legal advice." Insurance estimators must include actuarial disclaimer language. The disclaimers are not optional — they're often regulatory requirements.

**6. Status block** — status badge (Draft / Awaiting Review / Approved / Finalized). Approved-by name and date if applicable.

**7. Footer** — small print, contact info, signature lines if domain requires.

### Read-only

No edit controls on the document view. Only action available is "Back to [previous section]" or "Print" / "Download PDF."

### Reference Implementation (product domain)

```tsx
<article className="bg-background border rounded-lg p-8 max-w-4xl mx-auto print:border-0 print:shadow-none">
  {/* 1. Header */}
  <header className="flex justify-between items-start pb-6 border-b">
    <div className="flex items-center gap-4">
      {BRAND_LOGO_URL ? (
        <img
          src={BRAND_LOGO_URL}
          alt={COMPANY_NAME}
          className="h-10 w-auto"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
          {COMPANY_INITIALS}
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold">{COMPANY_NAME}</h1>
        <p className="text-sm text-muted-foreground">{COMPANY_ADDRESS}</p>
      </div>
    </div>
    <div className="text-right">
      <h2 className="text-2xl font-bold">{DOCUMENT_TITLE}</h2>
      <p className="text-sm">{quote.ref}</p>
      <p className="text-sm text-muted-foreground">Date: {quote.date}</p>
      {quote.validUntil && <p className="text-sm text-muted-foreground">Valid until: {quote.validUntil}</p>}
    </div>
  </header>

  {/* 2. Prepared for */}
  <section className="py-6">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
      Prepared for
    </h3>
    <p className="text-lg font-medium">{quote.customerName}</p>
    {quote.customerEmail && <p className="text-sm">{quote.customerEmail}</p>}
  </section>

  {/* 3. Line items (product domain) OR inputs+results (calculator domain) */}
  {/* For product domain — see Table example below */}
  {/* For calculator domain — replace with inputs table + results table */}

  {/* 4. Totals — for product domain */}
  <section className="flex justify-end py-6">
    <dl className="w-80 space-y-2">
      <div className="flex justify-between text-sm">
        <dt>Subtotal:</dt>
        <dd>{formatCurrency(quote.subtotal, quote.currency)}</dd>
      </div>
      {quote.taxRate > 0 && (
        <div className="flex justify-between text-sm">
          <dt>{quote.taxName} ({quote.taxRate}%):</dt>
          <dd>{formatCurrency(quote.taxAmount, quote.currency)}</dd>
        </div>
      )}
      <div className="flex justify-between text-lg font-bold pt-2 border-t">
        <dt>Total:</dt>
        <dd>{formatCurrency(quote.total, quote.currency)} {quote.currency}</dd>
      </div>
    </dl>
  </section>

  {/* 5. Terms / Disclaimer */}
  {/* 6. Status */}
</article>
```

For calculator domains, replace the line items + totals blocks with the inputs + results pattern. The header, prepared-for, terms/disclaimer, status, and footer are the same.

### Failure Modes

**Product domain failure:** A 5-line key-value list "Customer: X, Product: Y, Motor: Z, Status: Awaiting Review, Terms: Net 45" inside a single card. Not a Quote Document — a summary blurb.

**Calculator domain failure:** A "Final Report" with placeholder values, missing inputs, no rule basis labels, missing disclaimers. Not a Report — an empty template.

If your output document would fit inside the Live Summary panel, you have not built an output document.

---

## RBAC Behavior

When the workflow has multiple roles:

- Seed localStorage with roles from DOMAIN.md User Roles or Stakeholder Map.
- **Role switcher** is a single `DropdownMenu` in the header. Trigger shows active role name and badge. Dropdown lists all roles. One trigger, one menu.
- **Approval gating:** if DOMAIN.md says "only Andy or Jeff can approve," disable Approve when viewing as Dre or Manish. Show a clear message: "You are viewing as [Name]. Only [approver names] can approve."
- **Routing visibility:** if a role handles specific work types, show relevant routing info when that role is active.

When the workflow has only one role (single-role calculators, lawyer-as-user apps), omit the role switcher entirely. Don't fabricate roles to fill the UI.

When the workflow has roles but no approval gate (criterion 3 borderline), the role switcher is informational — it changes what content the user sees but doesn't gate actions.

---

## shadcn/ui component mapping

Use these shadcn/ui components for each CPQ element. Import from `~/components/ui/*`.

Treat cards as an exception, not the default layout primitive. Inline content into the page body whenever possible. Use cards only when something truly needs emphasis, separation, repetition, or framing. This aligns with the frontend-design skill's zero-card bias — see that skill for the full visual quality bar.

| CPQ Element | Component | Source | Usage Notes |
|---|---|---|---|
| Product/options selector | `RadioGroup`, `Checkbox`, `Select`, `Table` | shadcn | Show product name, description, base price, configuration fields inline. Use a card only for genuine emphasis. |
| Mutually exclusive options | `RadioGroup`, `RadioGroupItem` | shadcn | Show price next to each label. Inline or compact list. |
| Optional toggles | `Checkbox` with label | shadcn | Description below label. |
| Status badges | `Badge` | shadcn | `variant="outline"` Draft, `variant="default"` Awaiting, `variant="secondary"` Approved. Semantic colors via className. |
| Role badges | `Badge` | shadcn | `variant="outline"` Staff, `variant="default"` Approver, `variant="secondary"` View only. |
| Line items table | `Table`, `TableHeader`, `TableRow`, `TableCell` | shadcn | Right-align price columns. `TableFooter` for subtotal. |
| Saved quotes list | Custom list with `Badge` | shadcn | Clickable rows with status badges. `ScrollArea` if overflow. |
| Form inputs | `Input`, `Label` | shadcn | Stack label above input. |
| Dropdowns | `Select`, `SelectContent`, `SelectItem` | shadcn | Compact alternative to RadioGroup. |
| Action buttons | `Button` | shadcn | Primary `default` (brand accent). Secondary `outline`. Destructive `destructive`. |
| Section dividers | `Separator` | shadcn | Subtle horizontal between panel sections. |
| Stepper navigation | Custom | — | Vertical clickable list inside `SidebarContent`. `cn()` for state. Step number circle, label, subtitle, checkmark. |
| Role switcher | `DropdownMenu` | shadcn | Header. Active role name + badge in trigger. |
| Live summary sidebar | Inline label/value rows | shadcn primitives | Labels `text-muted-foreground text-sm`. Values `font-medium`. Total `text-lg font-semibold`. |
| Workflow notes | Compact muted note block | shadcn primitives | Reference material. Small text, muted. |
| Confirmation dialogs | `AlertDialog` | shadcn | Destructive actions. |
| Toast notifications | `Sonner` / `toast()` | shadcn | After save/approve/reject/delete. |
| Output document header | Header block with logo fallback + company name | shadcn primitives | Brand logo from DOMAIN.md with onError. Placeholder address below. |
| Output document table | `Table` with `TableFooter` | shadcn | Itemized rows. Footer shows subtotal. Totals block below with bold total. |
| Notes | `Textarea` | shadcn | Plain text editing. |

---

## Config Schema

See `references/config-schema.md` for full TypeScript interfaces. Summary:

```
config
├── app                    ← Branding, theme (from brandfetch)
├── sections[]             ← Section definitions (3-5 depending on workflow)
├── data
│   ├── products[]         ← Product domain — catalog with options
│   ├── inputSections[]    ← Calculator domain — input field groups
│   ├── lineItems[]        ← Product domain — current quote contents
│   ├── currentSubmission  ← Calculator domain — current submission state
│   └── quoteSettings      ← Currency, tax, terms, markup (product) OR calculation settings (calculator)
├── rules[]                ← Business rules (dependencies, validations, calculations)
└── roles[]                ← User roles and permissions (when multi-role)
```

---

## Deterministic Mapping Rules

The Builder Agent follows these rules mechanically to transform DOMAIN.md into config.json. No reasoning, no interpretation — execute the rules.

### Domain Type Detection

```
INSPECT DOMAIN.md to determine domain type:

  IF Entity Registry has products with prices/options/accessories:
    → DOMAIN TYPE: product
  ELSE IF Entity Registry has input fields with rules and DOMAIN.md has guidelines/formulas/rate tables:
    → DOMAIN TYPE: calculator
  ELSE IF Entity Registry has both products AND extensive input fields:
    → DOMAIN TYPE: hybrid (rare — usually one dominates; pick the dominant)
  ELSE:
    → AMBIGUOUS — note in completion summary, default to product
```

### Entity → Configurable Item Mapping

```
FOR EACH entity in DOMAIN.md Entity Registry:

  — PRODUCT DOMAIN:
  WHERE entity description suggests a sellable product, equipment, service, or part:
    → CREATE config.data.products[] entry
    → SET id = slugify(entity name)
    → SET name = entity name (exact, from DOMAIN.md)
    → SET category = entity parent grouping or category
    → SET basePrice = entity price if stated
    → SET pricingSource = determine from context:
        IF "price list" or "vendor list" or "catalog price" → "catalog"
        IF "get a quote from vendor" or "depends on specs" → "vendor_rfq"
        IF "we know our cost and mark it up" → "cost_plus"
        IF no pricing discussed → "tbd"
    → SET options[] = from entity's "what varies" attributes

  — CALCULATOR DOMAIN:
  WHERE entity description suggests an input field, data point, or parameter:
    → CREATE config.data.inputSections[] entry (grouping related inputs)
    → SET field.id = slugify(field name)
    → SET field.label = field name (exact, from DOMAIN.md)
    → SET field.type = infer from context:
        enumerated values → "select"
        yes/no → "checkbox"
        date → "date"
        number → "number"
        free text → "text"
    → SET field.required = true if DOMAIN.md marks it mandatory
    → SET field.validation = from business rules

  WHERE entity has NO price, NO options, NO input role, and is NOT referenced:
    → SKIP — probably not configurable
    → ADD to Open Questions
```

### Relationship → Rule Mapping

```
FOR EACH relationship in DOMAIN.md Relationship Map:

  IF relationship type = "requires":
    → CREATE config.rules[] entry (type: "requires", severity: "error")

  IF relationship type = "recommends":
    → CREATE config.rules[] entry (type: "recommends", severity: "warning")

  IF relationship type = "excludes":
    → CREATE config.rules[] entry (type: "excludes", severity: "error")
```

### Business Rule → Validation Mapping

```
FOR EACH rule in DOMAIN.md Business Rules:

  IF rule mentions "approval" or "requires authorization":
    → CREATE config.rules[] entry (type: "validates", action: requireApproval)

  IF rule mentions "cannot" or "must not" or "not allowed":
    → CREATE config.rules[] entry (type: "validates", action: block)

  IF rule mentions pricing/calculation constraint:
    → CREATE config.rules[] entry (type: "computes")
```

### Section Count Decision

```
EVALUATE the workflow against the four canonical sections:

  Configure: Always present (the input collection step)
  Build/Calculate: Present IF there's an assembly/review stage between input and approval
                   ABSENT IF input directly produces output (simple calculator)
  Approve: Present IF there's a review/approval gate
           ABSENT IF self-service flow with no review
  Output Document: Present IF the deliverable is a formatted document
                   REPLACED IF the deliverable is a confirmation, push to system, or inline result

Count the sections that apply. Section count = 2 (rare) to 5 (rare). Default = 4.

Add Discover/Intake before Configure IF the workflow has a discovery phase.
Add Submit/Send after Output Document IF the workflow has explicit handoff.
```

### Layout Decision

```
PICK layout based on workflow shape:

  IF section count >= 3 AND user works on one quote/submission at a time AND sections are sequential:
    → Default Stepper layout

  IF user browses a catalog and adds to cart-like quote:
    → Catalog-Driven layout

  IF section count <= 2 AND calculation can be shown inline with inputs:
    → Calculator-Style layout

  IF user manages many in-flight workflows in parallel:
    → List/Detail layout (stepper applies inside detail panel)

  WHEN IN DOUBT:
    → Default Stepper
```

### State Model → Workflow Mapping

```
IF DOMAIN.md State Models contains payment terms or approval statuses:
  → MAP to config.data.quoteSettings.availableTerms[]
  → SET defaultTerms = the default mentioned

IF DOMAIN.md State Models contains workflow statuses:
  → MAP to section gating logic
```

### Branding → Theme Mapping

```
→ SET config.app.companyName = DOMAIN.md Project Overview company name
→ SET config.app.theme.primaryColor = from brandfetch (or fallback)
→ SET config.app.theme.accentColor = from brandfetch (or fallback)
→ SET config.app.theme.logoUrl = from brandfetch
→ SET config.app.theme.mode = "light"
```

### Quote/Calculation Settings Mapping

```
For product domains:
→ SET config.data.quoteSettings.currency = from DOMAIN.md (or "USD" default)
→ SET config.data.quoteSettings.taxEnabled = true ONLY IF DOMAIN.md mentions tax
→ SET config.data.quoteSettings.taxLabel = from DOMAIN.md (e.g., "HST")
→ SET config.data.quoteSettings.taxRate = from DOMAIN.md
→ SET config.data.quoteSettings.defaultTerms = from DOMAIN.md
→ SET config.data.quoteSettings.markup = from DOMAIN.md
→ SET config.data.quoteSettings.quoteFormat = "itemized" (default)

For calculator domains:
→ SET config.data.calculationSettings.formulas = the rules/guidelines from DOMAIN.md
→ SET config.data.calculationSettings.outputFormat = match the deliverable type
→ SET config.data.calculationSettings.disclaimers = mandatory legal/regulatory text from DOMAIN.md
```

### Role Mapping

```
FOR EACH role in DOMAIN.md User Roles:
  → CREATE config.roles[] entry (id, label, permissions inferred from description)
  → IF permissions cannot be inferred → SET permissions = ["createQuote", "editQuote"]

IF DOMAIN.md has only one role OR no roles defined:
  → CREATE one default role
  → SKIP role switcher in UI (single-role workflow)
```

### Edge Cases

```
→ IF entity has no price → SET pricingSource = "tbd", ADD to openQuestions
→ IF relationship rationale missing → SET message = "[source] [rel] [target] — rationale not captured"
→ IF entity cannot be classified → SKIP, ADD to openQuestions
→ IF DOMAIN.md has Open Questions → COPY to config.metadata.openQuestions
→ IF only one role or no roles → CREATE default, OMIT role switcher
→ IF no pricing AND domain is product type → SET markup = 0, ADD to openQuestions
→ IF no calculation formulas AND domain is calculator type → BUILD with placeholder formulas, ADD to openQuestions
```

---

## Business Rule Templates

Common CPQ rule patterns. Use when DOMAIN.md describes rules in natural language.

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

### Calculator Formula (calculator domain)
```json
{
  "id": "BR-XXX",
  "type": "computes",
  "trigger": "inputChange",
  "condition": { "fields": ["incomeA", "incomeB", "duration"] },
  "action": { "compute": "supportLow = (incomeB - incomeA) * 0.015 * yearsOfMarriage" },
  "message": "[formula basis from DOMAIN.md — e.g., 'Federal Spousal Support Advisory Guidelines, with-children formula']",
  "severity": "info"
}
```

---

## Vertical Presets

See `references/vertical-presets.md` for full details. Summary:

| Vertical | Domain Type | "Configure" | Calculation Model | Output Style |
|---|---|---|---|---|
| **Manufacturing / BOM** | Product | Products with options, accessories | Cost-plus or vendor RFQ | Itemized quote with scope |
| **Wholesale / Distribution** | Product | Catalog items, bulk goods | Price list with volume tiers | Itemized quote with quantity breaks |
| **Services / Integrator** | Product | Equipment + installation + PM | Mixed (catalog + labor rates) | Itemized quote with service schedule |
| **Legal / Compliance** | Calculator | Case details, financial data | Guideline formulas, statutory tables | Summary report with calculations + disclaimer |
| **Financial / Insurance** | Calculator | Coverage details, risk factors | Rate tables, actuarial formulas | Estimate document with ranges + terms |
| **Assessment / Eligibility** | Calculator | Personal/business details | Scoring models, threshold rules | Assessment report with recommendations |

The Builder Agent uses the vertical preset as a starting point, then overrides with specifics from DOMAIN.md.

---

## Mapping Log

After executing the mapping rules, produce a brief mapping log:

```markdown
## Mapping Log

**Skill:** cpq-builder v4.4
**DOMAIN.md:** [company name]
**Domain type:** [product / calculator / hybrid / ambiguous]
**Vertical preset:** [manufacturing / wholesale / services / legal / financial / assessment / none]
**Section count:** [N] (deviations: [list])
**Layout:** [stepper / catalog / calculator-style / list-detail]

### Items mapped: [N]
- [entity name] → config.data.[products|inputSections][0]

### Rules mapped: [N]
- BR-001: [source] [rel] [target] → severity: [error|warning|info]

### Skipped entities: [N]
- [entity name] — [reason]

### Open questions carried forward: [N]
- [question from DOMAIN.md]
```

This log is NOT part of the config. It's an audit trail.

---

## Reference Files

- `references/config-schema.md` — Full TypeScript interfaces for the CPQ config shape
- `references/vertical-presets.md` — Detailed presets for product and calculator domains
- `references/example-config.json` — Fully populated example configs
