---
name: cpq-builder
license: MIT
compatibility: Works with any AI coding assistant that supports the Agent Skills specification. Requires a running Customware SPA instance to consume the generated config.
metadata:
  author: ryan-price
  version: "4.5"
description: >
  Configure-Price-Quote (CPQ) vertical skill for the Customware SPA. Defines the patterns,
  minimum standards, layout patterns, business rule templates, and mapping rules for
  transforming a DOMAIN.md into a CPQ-shaped application. Targeted at SMB customers
  (5-50 employees) migrating from spreadsheets and email-based quoting workflows. The
  prototype must feel dramatically better than Excel without feeling enterprise-overcomplicated.
  Patterns are defaults, not mandates — adapt them when the actual workflow deviates.
  Trigger signals: quoting, pricing, product configuration, calculators, guided intake forms,
  assessment tools, estimate builders, proposal workflows, eligibility checkers, any
  "fill in fields → calculate → produce a deliverable" pattern.
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

**The patterns in this skill are defaults, not mandates.** When the actual workflow deviates from the canonical CPQ shape — has fewer stages, has a different layout, produces a different output — adapt the patterns. Each major section names the deviations explicitly.

---

## Customer Context

Customware's CPQ customers are typically **SMB businesses (5-50 employees)** going through growing pains. They are NOT migrating from another CPQ system. They are migrating from:

- Excel spreadsheets that have grown unwieldy (multiple tabs, copy-paste errors, broken formulas)
- Word document quote templates that get manually edited per customer
- Email-based approval workflows where the boss approves a quote in a reply-all thread
- Tribal knowledge about which products require which accessories, which lives in the senior rep's head
- Hand-keyed pricing where margin gets eroded through inconsistent discounting

The prototype's job is to feel **dramatically better than spreadsheets** without feeling **enterprise-overcomplicated**. A small team that's been quoting in Excel for 5 years should look at the prototype and immediately think "this is so much faster" — not "this looks complicated."

This positioning shapes every design decision in this skill:

- Inline line editing IS the comparison point. Excel users expect a grid they can edit directly.
- Live totals matter. Customers have been doing math in formulas; they expect to see numbers update as they change inputs.
- Role gating is impressive. Customers have never had "only Jeff can approve over $50K" enforced by software — it was a verbal rule that got broken.
- Branded PDF output is impressive. Customers have been hand-formatting Word docs.
- Customer-facing portals, AI suggestions, e-signature integrations are NOT impressive at this stage. They're enterprise complexity that solves problems the customer doesn't have yet.

Build for the customer who's tired of broken Excel formulas, not the customer migrating from Salesforce.

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

**Common false positives:**
- A "stock quote viewer" — has the word "quote" but is a display tool (criterion 1 missing)
- A "tax calculator" with no review step — utility, not CPQ (criterion 3 + 4 missing)
- A "product catalog" with prices — display, not CPQ (criterion 2 + 3 missing)
- A "feedback form" — data entry, not CPQ (criterion 2 missing)

If the four criteria don't hold, do not force-fit the patterns below. Build from the task description and DOMAIN.md using frontend-design's principles instead.

---

## Domain Type

Most CPQ-shaped workflows fall into one of two domain types. Identify which type the build is before applying patterns:

**Product domain.** The user configures sellable products/services. Pricing is the central calculation. Output is a quote document with line items, totals, tax, and terms. Examples: equipment sales (HB Material Handling cranes), service proposals (consulting bids), software licensing.

**Calculator/intake domain.** The user enters case/applicant details. Calculation applies guidelines/rules/rate tables. Output is a summary report with inputs, calculated values, and disclaimers. Examples: spousal support calculators (Clarity Legal), insurance estimators, loan qualification, benefits eligibility.

The skill's patterns adapt to both. When a section or rule is domain-specific, this skill says so explicitly.

---

## Minimum Standards

Every CPQ build MUST meet Tier 1 standards. Tier 2 standards are built when DOMAIN.md signals the need. Tier 3 capabilities are mentioned in the completion summary as future work but not built in the prototype.

### Tier 1 — Non-negotiable (every CPQ build)

These are the capabilities that make the prototype feel dramatically better than Excel + Word. If any are missing, the build is incomplete regardless of how clean the UI looks.

**1. Direct inline line-item editing.** A spreadsheet-style table where users add rows, edit any cell, and see totals update live. NOT a "Configure form → Add to Quote → Build Quote table → Edit" round trip. The line items table IS the workspace. See "Section Pattern" below for the canonical implementation.

**2. Bundle / required-child products.** When a parent product requires a child component (HB Material Handling: "single girder crane requires Motor A or Motor C"), the child selection is part of configuring the parent. The line item shows the parent + the chosen child as one cohesive entry. Never two separate line items where the user might forget the child.

**3. Constraint rules surfaced visibly.** Requires / excludes / recommends rules from DOMAIN.md must be visible to the user — not just enforced silently. When the user adds a crane, the UI shows "Motor selection required (BR-001)" before they can save. When they try to add an excluded combination, the UI shows the rule and rationale. Customers used to Excel have NEVER had rules enforced — making the rules visible is half the value.

**4. Discount stack with visible math.** When discounts apply, show the layered calculation:
```
List Price:                  $15,000.00
Volume Discount (5%):           -$750.00
Promotional Discount (3%):      -$427.50
─────────────────────────────────────
Net Price:                   $13,822.50
```
Each discount is a row; the math is transparent. Customers used to negotiating discounts in email threads with no audit trail need to see exactly how the price was reached.

**5. Live quote summary.** Running totals (subtotal, tax, grand total) update in real-time as the user edits line items. No "click Calculate" button. This is the single biggest "wow" moment for Excel-coming customers — the totals just update.

**6. Branded quote document.** Generated PDF/print view with the customer's logo, line items table, totals, terms, and any required disclaimers. This replaces the hand-formatted Word document. Quality bar: it should look like a quote a real business would send.

**7. Multi-tier approval routing.** Most SMB workflows have 2+ levels of approval (rep configures → manager reviews → owner approves). Even simple cases have at least one approver and one final-signoff role. The prototype must show role-based routing that respects DOMAIN.md's stakeholder map. HB Material Handling routes through Jeff → Andy/Dre/Manish based on request type — that's multi-tier and table stakes.

**8. Multi-quote management.** Users have multiple quotes in flight simultaneously. The prototype must show a list of quotes with status indicators, support filtering/sorting, and let the user click into any quote to edit. NOT just a single-quote workspace with a "saved quotes" sidebar list.

**9. Save / load / clone quotes.** localStorage-backed. The user can create a new quote, save it, load a saved quote, and clone an existing quote as a starting point for a similar one. Excel users do this by copying tabs; the prototype gives them a Clone button.

**10. Role-based view and action gating.** Different roles see different things. Approvers see Approve buttons; preparers don't. Sensitive numbers (margin, cost) hide from non-approver roles. This is the "only the boss can see margin" pattern that customers know intuitively but have never had enforced.

### Tier 2 — Build when DOMAIN.md justifies it

These are valuable capabilities but only worth building when DOMAIN.md provides clear signals.

- **Guided selling** (step-through Q&A for complex configurations) — when DOMAIN.md describes a discovery flow with the customer
- **Volume / tier pricing** — when DOMAIN.md mentions volume breaks, quantity tiers, or bulk discounts
- **Customer-facing read-only quote link** — when DOMAIN.md mentions emailing/sharing quotes with customers
- **Subscription / renewal handling** — when the domain is SaaS-like with recurring revenue
- **Multiple pricing models in one build** (cost-plus + catalog + custom) — when DOMAIN.md describes mixed pricing strategies
- **Quote document templates by customer type** — when DOMAIN.md describes different output formats per audience

### Tier 3 — Future work (mention in completion summary, don't build)

These belong in production builds, not prototypes. The completion summary should name them so the customer knows what comes next.

- AI-suggested quotes from CRM/email/call context
- Quote versioning and amendment tracking
- Subscription billing logic and proration
- CRM/ERP integration (handled in full-stack phase)
- E-signature integration (DocuSign, HelloSign, etc.)
- Tax engine integration (Avalara, Vertex)
- Multi-currency with dynamic FX
- Self-serve customer configuration portal
- Deal Rooms / branded proposal microsites
- Native mobile app

### Completion Summary Template

Every CPQ build's completion summary must include:

```markdown
## What this prototype includes

**Tier 1 (always built):**
- [confirm each Tier 1 capability is present, or note why a specific one was omitted]

**Tier 2 (built for this domain):**
- [list any Tier 2 capabilities that were built and why]

## What this prototype does NOT include

This is a frontend prototype demonstrating the core CPQ workflow. The following capabilities
would come in production:

- [list relevant Tier 3 items based on the customer's likely future needs]

To move from prototype to production, add: real authentication, CRM/ERP integration,
e-signature, real PDF generation, and any Tier 3 capabilities listed above.
```

This sets honest expectations and shows the customer that more is coming, while being clear about what was delivered.

---

## When to Use This Skill

When the four criteria in "Is This Even CPQ?" hold AND the customer's DOMAIN.md contains:

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

**Do NOT use this skill when** the domain is primarily about inventory tracking (use ERP skill), ongoing project execution with field tracking and payments (use trades-builder), online product sales (use e-commerce skill), or customer relationship management (use CRM skill).

---

## Template Contract

Before you start building, understand what the template gives you and what this skill adds:

**The template (`app/layouts/MainLayout.tsx`) ships with:**
- `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarInset`, `SidebarTrigger` — already wired
- `SidebarContent` is **empty** — this is your landing zone
- One brand slot in the header (logo placeholder + company name)
- `ModeToggle` and user menu in the header's right cluster

**This skill fills:**
- `SidebarContent` — with section navigation appropriate to the chosen layout
- The brand slot — with the client's logo and company name from DOMAIN.md
- The header's right cluster — adds a role switcher `DropdownMenu` before the existing user menu when the workflow has multiple roles
- The `<Outlet />` in `<main>` — via route components for each section

**This skill does NOT:**
- Add a second `Sidebar` component. There is one sidebar.
- Put a brand tile inside `SidebarContent`. Brand lives in the header only.
- Mount MainLayout inside route components. Routes render in `<Outlet />`; the layout is the parent. Mounting MainLayout inside a route causes duplicate sidebars/headers.
- Rewire `SidebarProvider` or replace the collapsible behavior.

If the workflow doesn't fit a sidebar layout (see Layout Pattern alternatives below), the build may use a different shell. Document the deviation in the completion summary.

---

## Section Pattern

The default CPQ workflow has **three logical phases**: configure inputs, review/approve, deliver document. The default UI maps these to three or four sections depending on whether the user benefits from a separate "review/edit lines" stage.

### Default Section Structure (SMB direct-editing model)

For SMB CPQ where one role takes the quote from creation through approval (the most common case), the default is **three sections**:

1. **Edit Quote** — direct inline editing of all line items + customer details. This is the primary workspace where the user spends 90% of their time. Line items are added, edited, removed inline. Customer info, terms, and notes are inline. Live totals on the right or below.
2. **Approve** — review and approve action. Surfaces the final state, runs gating checks, and produces the approve action. May show change history if quote was previously approved/amended.
3. **Quote Document** — the deliverable. Read-only, printable, brand-formatted.

This collapses the v4.3 "Configure → Build Quote" round-trip into one direct-editing surface. **Most SMB CPQ builds should use this three-section model.**

### Four-Section Structure (when handoff between roles exists)

When configuration and line-item assembly are done by different people (e.g., engineer configures → sales rep prices → manager approves), four sections are appropriate:

1. **Configure** — engineer or technical role specs the products
2. **Build Quote** — sales role adds pricing, terms, customer info
3. **Approve** — manager role approves
4. **Quote Document** — the deliverable

Use this only when DOMAIN.md describes genuine handoffs between roles at each stage. HB Material Handling does NOT need this — Jeff can configure, build, and approve. Use three sections.

### Calculator Domain Section Structure

For calculator/intake domains (Clarity Legal pattern):

1. **Submission Details** — the intake form (client-facing)
2. **Calculation** — the computed result (auto-generated from inputs)
3. **Lawyer Review** — the reviewer-facing approval (lawyer-facing)
4. **Final Report** — the delivered output

The structural pattern is the same; the labels and components adapt to the domain.

### Deviations

**Skip "Approve"** when the workflow has no review gate (self-service flow). Edit Quote → Document.
**Skip "Quote Document"** when the deliverable isn't a document (push to system, inline result, confirmation page).
**Add Discover/Intake before Edit Quote** when the workflow has a discovery phase before configuration.
**Pick the section count that matches the actual workflow.** Don't pad to four. Don't truncate to fit.

### Edit Quote Section — Direct Inline Editing (Tier 1 mandatory)

The Edit Quote section uses an **Excel-like line items table** as the primary workspace. This is non-negotiable for product CPQ.

**Required behavior:**

- Each line item is a row in a table
- Cells are editable inline — click a cell, edit value, totals update
- Add a new row via "+ Add Line" button below the table (or auto-add when user clicks into an empty placeholder row)
- Remove a row via row-action menu (trash icon, "Remove" option)
- Clone a row via row-action menu ("Duplicate" option)
- Total computes per row (qty × unit price - discount)
- Footer row computes subtotal across all line items
- Discount stack appears below subtotal (if applicable)
- Tax line appears below discount (if DOMAIN.md mentions tax)
- Grand total appears in bold at the bottom

**Required columns (product domain):**

| # | Description | Configuration | Qty | List Price | Discount | Net Price | Line Total | Actions |
|---|---|---|---|---|---|---|---|---|

The Description column shows the product name. The Configuration column shows the chosen options (e.g., "Motor A — Standard Duty"). For products with required configurations (bundle/required-child pattern), clicking the row opens a configurator drawer/popover where the user picks options before the row is committed. The configuration shows inline once chosen, and is editable by clicking it again.

**Required behavior for bundle / required-child products:**

When DOMAIN.md describes a parent product that requires a child component (e.g., "single girder crane requires Motor A or Motor C"):

- Adding the parent automatically prompts for the required child
- The line item displays as one cohesive entry: "Single Girder Crane — Motor A — Standard Duty"
- The price aggregates: parent base price + child upcharge
- The user cannot save the line until the required child is selected
- A visible rule indicator surfaces: "Motor selection required (BR-001)"

**Required behavior for constraint rules:**

When DOMAIN.md has requires / excludes / recommends rules:

- "Requires" rules block save until satisfied; show inline "Required: [explanation]"
- "Excludes" rules block invalid combinations; show inline "Cannot combine X with Y because [rationale]"
- "Recommends" rules surface as a soft suggestion; show "Customers often add Z with this. Add?"
- Each rule shows its rule ID (BR-001, BR-002) so the user can trace back to the source

This visible rule enforcement is one of the biggest "wow" moments for customers coming from Excel. Make it prominent.

**Reference implementation pattern:**

```tsx
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Description</th>
      <th>Configuration</th>
      <th>Qty</th>
      <th className="text-right">List Price</th>
      <th className="text-right">Discount</th>
      <th className="text-right">Net Price</th>
      <th className="text-right">Line Total</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {lineItems.map((item, i) => (
      <tr key={item.id}>
        <td>{i + 1}</td>
        <td>
          <ProductPicker value={item.productId} onChange={(p) => updateItem(item.id, { productId: p })} />
        </td>
        <td>
          <ConfigurationCell item={item} onChange={(config) => updateItem(item.id, { configuration: config })} />
          {item.requiredRules.map(rule => (
            <RuleIndicator key={rule.id} rule={rule} satisfied={item.satisfiedRules.includes(rule.id)} />
          ))}
        </td>
        <td>
          <Input type="number" value={item.qty} onChange={(e) => updateItem(item.id, { qty: e.target.value })} />
        </td>
        <td className="text-right">{formatCurrency(item.listPrice)}</td>
        <td className="text-right">
          <DiscountCell item={item} onChange={(d) => updateItem(item.id, { discount: d })} />
        </td>
        <td className="text-right">{formatCurrency(item.netPrice)}</td>
        <td className="text-right font-medium">{formatCurrency(item.lineTotal)}</td>
        <td>
          <RowActions onClone={() => cloneItem(item.id)} onRemove={() => removeItem(item.id)} />
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr><td colSpan={7} className="text-right">Subtotal:</td><td className="text-right">{formatCurrency(subtotal)}</td><td /></tr>
    {discountRows.map(d => (
      <tr key={d.id}><td colSpan={7} className="text-right text-muted-foreground">{d.label}:</td><td className="text-right">-{formatCurrency(d.amount)}</td><td /></tr>
    ))}
    {taxRate > 0 && (
      <tr><td colSpan={7} className="text-right">{taxName} ({taxRate}%):</td><td className="text-right">{formatCurrency(taxAmount)}</td><td /></tr>
    )}
    <tr className="font-bold text-lg"><td colSpan={7} className="text-right">Total:</td><td className="text-right">{formatCurrency(grandTotal)} {currency}</td><td /></tr>
  </tfoot>
</table>

<Button onClick={addNewLine}>+ Add Line</Button>
```

The customer info, payment terms, valid-until date, and notes appear as a section below the line items table — inline on the same page, NOT a separate route or step.

---

## Discount Stack Pattern (Tier 1 mandatory when discounts apply)

When DOMAIN.md mentions any form of discount (volume, promotional, manual, negotiated), the build must show discounts as a layered, transparent calculation.

**Required visible math:**

```
List Price (5 × $15,000):       $75,000.00
─────────────────────────────────────────
Volume Discount (5%):              -$3,750.00
Promotional Discount (3%):         -$2,137.50
Manual Discount ($1,000):          -$1,000.00
─────────────────────────────────────────
Net Price:                       $68,112.50
HST (13%):                         $8,854.63
─────────────────────────────────────────
Total:                           $76,967.13 CAD
```

**Required behavior:**

- Each discount is a separate row in the totals stack
- Each row shows: discount type, percentage or amount, the dollar amount removed
- Discounts apply in stacked order (volume → promotional → manual)
- Manual discount triggers approval routing if it exceeds DOMAIN.md's threshold
- The user sees what was removed and why; nothing is hidden in formulas

**Discount approval thresholds:**

When DOMAIN.md describes discount approval rules ("discounts over 15% require manager approval"), the prototype enforces them:

- Discount under threshold → user can apply without approval
- Discount at/above threshold → user can apply but quote enters "Pending Approval" status
- The approval routing routes to the role authorized at that discount level

This is the most common "we lose margin" complaint from SMB businesses. Surfacing the rule in the UI is high-value.

---

## Multi-Tier Approval Chain Pattern (Tier 1 mandatory)

Most SMB CPQ workflows have 2+ approval levels. The prototype must reflect this.

### Approval Chain Definition

DOMAIN.md describes approvers in the Stakeholder Map. The prototype derives the approval chain from this map:

- **Single approver** → simple gate ("Pending approval from Jeff")
- **Sequential approvers** → chain ("Pending approval from Jeff, then Mary")
- **Conditional approvers** → routing based on quote attributes ("Routes to Andy if standard, Dre if inspection, Manish if maintenance")

### Approval Chain UI

Surface the chain visibly so users understand where the quote is and what's next:

```
Quote Status: Pending Approval
─────────────────────────────────────────
✓ Submitted by Sarah               (May 5, 2:30 PM)
✓ Approved by Jeff (Quoting)       (May 5, 3:15 PM)
○ Pending approval from Mary (Finance)
○ Pending final signoff from Tom (Owner)
```

Each approver:
- Sees the quote in their queue (filtered list view: "Awaiting My Approval")
- Can approve, reject, or request changes
- Their action advances or halts the chain
- A rejected/changed quote returns to the previous approver with notes

**Required for the build:**

- The approval chain is derived from DOMAIN.md's Stakeholder Map automatically
- The role switcher lets the user view as any approver to see how the queue looks
- The "Awaiting My Approval" filter in the multi-quote list shows quotes pending the active role
- Approval actions update the chain state and trigger toast confirmations
- Rejection/changes capture a comment that's visible to the next/previous role

### Approval Routing Rules

When DOMAIN.md describes routing rules ("route maintenance requests to Manish, inspection requests to Dre"), the prototype implements the routing:

```javascript
// Example routing logic from DOMAIN.md:
// - Standard quotes: route to Andy
// - Inspection requests: route to Dre  
// - Maintenance requests: route to Manish
// - All quotes finalized by Jeff

function getApprovalChain(quote) {
  const chain = [];
  
  if (quote.requestType === 'inspection') {
    chain.push({ role: 'inspection-reviewer', name: 'Dre' });
  } else if (quote.requestType === 'maintenance') {
    chain.push({ role: 'maintenance-reviewer', name: 'Manish' });
  } else {
    chain.push({ role: 'quoting-reviewer', name: 'Andy' });
  }
  
  chain.push({ role: 'final-approver', name: 'Jeff' }); // Always Jeff at end
  return chain;
}
```

The prototype shows the chain explicitly in the Approve section so the user can see the routing logic. This is one of the highest-value features for SMB customers — they've never had automatic routing before.

---

## Layout Pattern

The default layout is **list/detail** because SMB CPQ users always have multiple quotes in flight. They need to see their queue and drill into individual quotes.

### Default: List/Detail Layout

```
+----------+--------------------------------+
|          | [List of quotes]               |
| Filters  | row (status badge)             |
| Quick    | row                            |
| filters  | row                            |
|          |                                 |
|          | + New Quote                     |
+----------+--------------------------------+
```

When user clicks a quote, they navigate to a detail route:

```
+--------------------------------------------------------------+
| Header: HB Material Handling | Q-2026-0001 | Status: Draft   |
| ← All Quotes                                                  |
+--------------------------------------------------------------+
| [Edit Quote] [Approve] [Quote Document]   tabs               |
| ──────────────────────────────────────────────────────────── |
|                                                               |
| [Active section content — line items table by default]        |
|                                                               |
| [Live totals on right or below — collapsible]                |
+--------------------------------------------------------------+
```

**Why list/detail is the default:**

- Customers come from Excel where they have multiple tabs/files for different quotes
- They need to see all in-flight quotes at a glance (queue view)
- They need filters: by status, by customer, by approver, by date
- Drilling into one quote should not lose the queue context (back button always works)
- Approval queues are list-shaped by nature ("show me everything awaiting my approval")

**Sidebar in list view:** filters, role switcher, saved-quote shortcuts, link to "+ New Quote." NOT the workflow stepper (no active quote yet).

**Sidebar in detail view:** the four-section / three-section nav (Edit Quote / Approve / Quote Document). Or use top tabs in the detail view instead of sidebar — both are acceptable; pick based on visual density.

**Right rail / live summary:** collapsible. Default expanded on Edit Quote (totals are essential context). Default collapsed on Quote Document (the document IS the summary).

### Alternative: Single-Quote Layout

When DOMAIN.md describes a workflow where users only ever work on one quote at a time (rare for CPQ but valid for some calculators), use a single-page layout without a list view. The quote is the page.

### Alternative: Calculator-Style Layout (calculator domains)

For calculator/intake domains where the calculation is the primary feature:

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

The Clarity Legal client-facing flow uses this. The lawyer-facing review flow uses list/detail.

### Layout Decision Rules

```
IF the user manages multiple in-flight workflows in parallel (almost all CPQ):
  → List/Detail layout (DEFAULT)

IF the calculation is the primary feature AND can be shown inline with inputs:
  → Calculator-Style layout

IF the user only ever works on one item at a time (rare):
  → Single-Page layout

IF in doubt:
  → List/Detail layout
```

### Sidebar Behavior

When using list/detail, the sidebar shifts based on whether the user is in list view or detail view:

**List view:** filters, role switcher, "+ New Quote" button, optional saved-filter shortcuts.

**Detail view:** section navigation (Edit Quote → Approve → Quote Document), back-to-list link at the top.

Use `SidebarContent` for both — swap the contents based on route, don't add a second sidebar. This is the bug seen in the HB build (April 2026): the agent mounted MainLayout inside the detail route, producing duplicate sidebars. Don't do that.

### Right Rail Collapsible

The Quote Summary panel is a **collapsible right sidebar**, not a fixed panel. Use shadcn's `Sidebar` component with `side="right"`, or a `Sheet` for off-canvas behavior.

Default state by section:
- Edit Quote: expanded (totals are essential)
- Approve: expanded (final review needs context)
- Quote Document: collapsed (document is the summary)

User can toggle anytime via header trigger button.

---

## Quote Document (Final Output)

The deliverable. For product domains, this is the customer-facing quote PDF. For calculator domains, this is the summary report.

Treat as a real document, not a summary card. **Quality bar:** if you would be embarrassed to email this to the customer as "the quote/report," it is not done.

### Layout (top to bottom)

**1. Document header** — two columns:
- Left: brand logo (with onError fallback to a tinted initials square — never a bare img tag). Company name. Company address.
- Right: document title ("Quote", "Estimate", "Summary Report", etc.). Reference number (auto-generated, e.g., "Q-2026-0001"). Document date. Validity date if applicable.

**2. Prepared-for block** — recipient's name, contact email, customer company. Visual weight.

**3. Content block:**

For product domains: line items table.
| # | Description | Configuration | Qty | Unit Price | Line Total |

For calculator domains: inputs table + results table. (See Clarity Legal pattern.)

**4. Totals/Summary block:**

Product domain — right-aligned totals stack with full discount math:
```
Subtotal:                         $75,000.00
Volume Discount (5%):              -$3,750.00
Promotional Discount (3%):         -$2,137.50
─────────────────────────────────────
Net Subtotal:                     $69,112.50
HST (13%):                         $8,984.63
─────────────────────────────────────
Total:                            $78,097.13 CAD
```

Calculator domain — prominent display of the primary calculated value or value range. Three-card layout (Low/Mid/High) with primary value emphasized works well for ranges.

**5. Terms / Disclaimer block:**

Product: payment terms, currency, validity period.
Calculator: mandatory legal/regulatory disclaimers from DOMAIN.md.

**6. Approval chain block** — show the approval history:
```
Approved by:
  ✓ Jeff (Quoting Reviewer) — May 5, 2026
  ✓ Mary (Finance) — May 6, 2026
  ✓ Tom (Owner) — May 6, 2026
```

This is impressive to customers — proof the quote went through proper channels.

**7. Status badge** — Draft / Awaiting Review / Approved / Finalized. Visible.

**8. Footer** — small print, contact info, signature lines if domain requires.

### Read-only

No edit controls on the document view. Only available actions: "Back to Edit Quote," "Print," "Download PDF" (placeholder action with toast in prototype).

---

## RBAC Behavior

When the workflow has multiple roles:

- Seed localStorage with roles from DOMAIN.md User Roles or Stakeholder Map
- Role switcher is a single `DropdownMenu` in the header. Active role + badge in trigger
- **View gating:** different roles see different list filters by default ("Awaiting My Approval" for approvers; "My Drafts" for preparers)
- **Action gating:** approval buttons only appear for roles authorized to approve
- **Field gating:** sensitive numbers (cost, margin) hide from non-approver roles
- **Routing visibility:** when a role handles specific work types, show relevant routing info when active

When DOMAIN.md describes only one role or no roles, omit the role switcher. Don't fabricate roles to fill UI.

The action-oriented messaging when a role lacks permission:

- ❌ Disabled button (mystery — user doesn't know why)
- ✓ "Switch to the [approver role] role to [action]" (for prototype with role switcher)
- ✓ "This action requires the [approver role]. Contact [name] for approval." (for production)

---

## shadcn/ui Component Mapping

Use these shadcn/ui components. Import from `~/components/ui/*`. Treat cards as exception, not default — see frontend-design skill for visual quality bar.

| CPQ Element | Component | Notes |
|---|---|---|
| Line items table | `Table` with `TableHeader`, `TableBody`, `TableFooter` | Inline editable cells. `TableFooter` for totals stack. |
| Editable cell (number) | `Input type="number"` | Full-width within cell. Update on blur or change. |
| Editable cell (select) | `Select` | For dropdowns within table cells. |
| Configuration cell | Custom popover/drawer | Click to open configurator, shows summary inline. |
| Row actions | `DropdownMenu` | Trash icon trigger, options: Edit / Duplicate / Remove. |
| Add line button | `Button variant="outline"` | Below the table. Adds blank row or opens picker. |
| Status badges | `Badge` | `outline` Draft, `default` Awaiting, `secondary` Approved. |
| Role switcher | `DropdownMenu` | Header. Active role + badge. |
| Right sidebar (collapsible) | `Sidebar side="right"` | Or `Sheet` for off-canvas. Toggle from header. |
| Approval chain display | Custom list with status icons | Step-by-step visual with checkmarks/pending circles. |
| Quote list | `Table` or row list | Status filter chips above. Row click → detail route. |
| Filters | Chip group / `Select` | Above quote list. By status, customer, approver. |
| Confirmation dialogs | `AlertDialog` | Destructive actions (delete, reject). |
| Toast notifications | `Sonner` / `toast()` | After save, approve, reject, clone. |
| Quote document | Print-styled article | `print:border-0`, branded header, totals stack. |
| Discount row in stack | Inline label/value | Muted color for discount lines. |

---

## Config Schema

See `references/config-schema.md` for full TypeScript interfaces. Summary:

```
config
├── app                    ← Branding, theme
├── sections[]             ← Sections (3 default for SMB direct-editing)
├── layout                 ← list-detail | calculator-style | single-page
├── data
│   ├── products[]         ← Catalog with options, required-children
│   ├── inputSections[]    ← Calculator domain inputs
│   ├── quotes[]           ← All quotes (multi-quote management)
│   └── quoteSettings      ← Currency, tax, terms, markup
├── rules[]                ← Constraint rules + business rules + discount rules
├── approvalChain          ← Multi-tier approval routing
└── roles[]                ← Roles with permissions and view filters
```

---

## Deterministic Mapping Rules

### Domain Type Detection

```
INSPECT DOMAIN.md:
  IF Entity Registry has products with prices/options/accessories:
    → DOMAIN TYPE: product
  ELSE IF Entity Registry has input fields with rules and DOMAIN.md has guidelines/formulas:
    → DOMAIN TYPE: calculator
  ELSE IF both:
    → DOMAIN TYPE: hybrid (rare — pick dominant)
  ELSE:
    → AMBIGUOUS — note in completion summary, default to product
```

### Section Count Decision

```
EVALUATE workflow handoffs:
  IF same role does configure + line management + approval:
    → 3 sections: Edit Quote, Approve, Quote Document (DEFAULT for SMB)
  IF different roles for configure vs line management:
    → 4 sections: Configure, Build Quote, Approve, Quote Document
  IF no review gate exists:
    → Skip Approve section
  IF deliverable isn't a document:
    → Replace Quote Document with appropriate output (confirmation, push-to-system, inline result)
```

### Layout Decision

```
PICK based on workflow:
  IF user manages multiple quotes in parallel (almost all CPQ):
    → List/Detail layout (DEFAULT)
  IF calculation is primary feature, simple inputs/outputs:
    → Calculator-Style layout
  IF single-item workflow (rare):
    → Single-Page layout
```

### Entity → Configurable Item Mapping

```
FOR EACH entity in DOMAIN.md Entity Registry:

  PRODUCT DOMAIN:
  WHERE entity is sellable product/service/part:
    → CREATE config.data.products[] entry
    → SET id, name, category, basePrice, pricingSource
    → SET options[] from entity's "what varies" attributes
    → SET requiredChildren[] from "must include" relationships (e.g., crane requires motor)
    → SET optionalChildren[] from "may include" relationships

  CALCULATOR DOMAIN:
  WHERE entity is input field/parameter:
    → CREATE config.data.inputSections[] entry
    → GROUP related inputs into sections
    → SET field id, label, type, required, validation
```

### Relationship → Rule Mapping

```
FOR EACH relationship:
  "requires" → config.rules[] (type: requires, severity: error, surface visibly)
  "recommends" → config.rules[] (type: recommends, severity: info, surface as suggestion)
  "excludes" → config.rules[] (type: excludes, severity: error, block invalid combo)
  "includes child" → config.products[].requiredChildren[] (bundle pattern)
```

### Discount Stack Mapping

```
FOR EACH discount type in DOMAIN.md:
  → CREATE config.data.discountTypes[] entry
  → SET id, label, type (percentage|amount), rate, conditions
  → IF discount has approval threshold:
      → CREATE config.rules[] entry (type: approval-required, threshold: X)

EXAMPLES:
  "5% volume discount over 10 units" → percentage discount with quantity condition
  "Promotional 3% in Q4" → percentage discount with date condition  
  "Discounts over 15% require manager approval" → approval-required rule, threshold 0.15
```

### Approval Chain Mapping

```
FROM DOMAIN.md Stakeholder Map and routing rules:
  → CREATE config.approvalChain entry per quote type
  → IF routing rules exist (e.g., "inspections to Dre, maintenance to Manish"):
      → CREATE conditional routing in approvalChain
  → ALWAYS append final approver if DOMAIN.md describes one
  → SURFACE the chain visually in the Approve section
```

### State Model → Workflow Mapping

```
IF DOMAIN.md State Models contain workflow statuses:
  → MAP to quote.status enum (Draft, Awaiting Approval, Approved, Rejected, Finalized)
  → MAP transitions to action availability
```

### Branding → Theme Mapping

```
→ SET config.app.companyName from DOMAIN.md Project Overview
→ SET config.app.theme.primaryColor from brandfetch
→ SET config.app.theme.accentColor from brandfetch
→ SET config.app.theme.logoUrl from brandfetch (with onError fallback in BrandMark)
→ SET config.app.theme.mode = "light"
```

### Quote Settings Mapping

```
Product domain:
→ SET currency, taxEnabled (only if DOMAIN.md mentions tax), taxLabel, taxRate
→ SET defaultTerms, markup, quoteFormat

Calculator domain:
→ SET formulas from DOMAIN.md guidelines
→ SET outputFormat per deliverable type
→ SET disclaimers from DOMAIN.md mandatory text
```

### Role Mapping

```
FOR EACH role in DOMAIN.md User Roles:
  → CREATE config.roles[] entry
  → SET id, label, permissions, viewFilters, fieldVisibility
  → IF role appears in approval chain → mark as approver
  → IF only one role or no roles → omit role switcher in UI
```

### Edge Cases

```
→ IF entity has no price → SET pricingSource = "tbd", ADD to openQuestions
→ IF relationship rationale missing → SET message = "[source] [rel] [target] — rationale not captured"
→ IF entity unclassifiable → SKIP, ADD to openQuestions
→ IF DOMAIN.md has Open Questions → COPY to config.metadata.openQuestions
→ IF only one role → CREATE default role, OMIT role switcher
→ IF no pricing AND domain is product → SET markup = 0, ADD to openQuestions
→ IF no calculation formulas AND domain is calculator → BUILD with placeholder formulas, ADD to openQuestions
→ IF DOMAIN.md mentions discounts but no approval thresholds → use 15% default for "requires approval"
```

---

## Business Rule Templates

### Product Dependency (hard requires)
```json
{
  "id": "BR-XXX",
  "type": "requires",
  "trigger": "addItem",
  "condition": { "item.category": "[source_category]" },
  "action": { "suggest": "[target_product_id]", "matchField": "[matching_attribute]" },
  "message": "[rationale from DOMAIN.md]",
  "severity": "error",
  "surfaceVisibly": true
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
  "severity": "info",
  "surfaceVisibly": true
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
  "severity": "error",
  "surfaceVisibly": true
}
```

### Bundle / Required Child
```json
{
  "id": "BR-XXX",
  "type": "requires-child",
  "parent": "[parent_product_id]",
  "child": "[child_product_id_or_category]",
  "selectionMode": "required-one-of",
  "message": "[rationale]",
  "severity": "error"
}
```

### Discount Threshold Approval Gate
```json
{
  "id": "BR-XXX",
  "type": "approval-required",
  "trigger": "discountApplied",
  "condition": { "discount.percentage": { "$gte": 0.15 } },
  "action": { "requireApproval": "[approver_role_id]" },
  "message": "Discounts over 15% require [approver name] approval",
  "severity": "warning"
}
```

### Multi-Tier Approval Chain
```json
{
  "id": "BR-XXX",
  "type": "approval-chain",
  "trigger": "submitForApproval",
  "chain": [
    { "role": "quoting-reviewer", "name": "Andy", "condition": { "quote.requestType": "standard" } },
    { "role": "inspection-reviewer", "name": "Dre", "condition": { "quote.requestType": "inspection" } },
    { "role": "maintenance-reviewer", "name": "Manish", "condition": { "quote.requestType": "maintenance" } },
    { "role": "final-approver", "name": "Jeff" }
  ],
  "message": "Routed through quoting reviewer based on request type, finalized by Jeff"
}
```

### Calculator Formula
```json
{
  "id": "BR-XXX",
  "type": "computes",
  "trigger": "inputChange",
  "condition": { "fields": ["incomeA", "incomeB", "duration"] },
  "action": { "compute": "supportLow = (incomeB - incomeA) * 0.015 * yearsOfMarriage" },
  "message": "[formula basis from DOMAIN.md]",
  "severity": "info"
}
```

---

## Vertical Presets

| Vertical | Domain Type | Common Layout | Key Tier 1 Features |
|---|---|---|---|
| **Manufacturing / BOM** | Product | List/Detail | Bundle (parent + accessories), discount stack, multi-tier approval |
| **Wholesale / Distribution** | Product | List/Detail | Volume tiers (Tier 2), discount stack, customer-pricing |
| **Services / Integrator** | Product | List/Detail | Equipment + labor + materials bundle, approval chain |
| **Legal / Compliance** | Calculator | Calculator-Style + List/Detail | Formula calculation, mandatory disclaimers, lawyer review queue |
| **Financial / Insurance** | Calculator | Calculator-Style + List/Detail | Rate tables, eligibility rules, range output |
| **Assessment / Eligibility** | Calculator | Calculator-Style | Scoring models, threshold rules, recommendation output |

---

## Verification Before Completion

Before completing the build, verify all Tier 1 standards are met:

```
[ ] Direct inline editing — line items table with editable cells, no Configure-then-Build round trip
[ ] Bundle / required-child — parent products with required children handled in single line
[ ] Constraint rules visible — requires/excludes/recommends surfaced with rationale and rule IDs
[ ] Discount stack — visible math, layered calculation, no hidden formulas
[ ] Live quote summary — totals update in real-time as user edits
[ ] Branded quote document — logo, line items, totals, terms, approval chain, professional print layout
[ ] Multi-tier approval routing — chain derived from DOMAIN.md, surfaced visually
[ ] Multi-quote management — list view with filters, drill into detail
[ ] Save / load / clone — all persisted to localStorage
[ ] Role-based gating — view filters, action gating, sensitive field hiding
```

If any Tier 1 standard is missing, the build is incomplete. Fix before completing.

```
[ ] No duplicate sidebars — verify by routing through to detail view, count Sidebar components (should be 1)
[ ] No mounted MainLayout inside route — routes render in <Outlet />
[ ] Light mode set in BOTH app.css AND ThemeProvider default
[ ] BrandMark component used everywhere a logo appears (no bare <img>)
[ ] Currency uses Intl.NumberFormat with thousands separators
[ ] Footer text appears once, not duplicated by layout nesting
```

These are common implementation bugs that pass `npm run build` but break the user experience.

---

## Mapping Log

After executing the mapping rules, produce a mapping log:

```markdown
## Mapping Log

**Skill:** cpq-builder v4.5
**DOMAIN.md:** [company name]
**Domain type:** [product / calculator / hybrid / ambiguous]
**Vertical preset:** [manufacturing / wholesale / services / legal / financial / assessment / none]
**Section count:** [3 / 4 / 5] (deviations: [list])
**Layout:** [list-detail / calculator-style / single-page]

### Tier 1 standards: [all met / list any gaps]
- [confirm or note gap]

### Tier 2 capabilities built: [N]
- [list with rationale]

### Tier 3 capabilities mentioned in completion summary: [N]
- [list]

### Items mapped: [N]
- [entity name] → config.data.products[0] (with [N] required children, [N] options)

### Rules mapped: [N]
- BR-001: [source] [rel] [target] → [severity, action]

### Approval chain configured:
- [chain description]

### Discount stack configured:
- [list discount types and thresholds]

### Skipped entities: [N]
- [entity name] — [reason]

### Open questions carried forward: [N]
- [question from DOMAIN.md]
```

---

## Reference Files

- `references/config-schema.md` — Full TypeScript interfaces for the CPQ config shape
- `references/vertical-presets.md` — Detailed presets for product and calculator domains
- `references/example-config.json` — Fully populated example configs
