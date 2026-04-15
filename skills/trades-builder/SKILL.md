---
name: trades-builder
license: MIT
compatibility: Works with any AI coding assistant that supports the Agent Skills specification. Requires a running Customware SPA instance to consume the generated config.
metadata:
  author: ryan-price
  version: "1.1"
description: >
  Trades Operations vertical skill for the Customware SPA. Defines the section
  layout, config schema, and mapping rules for transforming a DOMAIN.md into a
  trades operations tool. Use this skill when the Builder Agent classifies a
  customer's domain as construction, field service, or trades project tracking.
  Trigger signals: estimates, job specs, scope items, square footage, field scheduling,
  subtrade payments, trade invoices, customer invoices, project stages, crew tracking.
---

# Trades Operations Skill

## What This Skill Does

This skill defines how to build a **trades operations tool** — the estimate-to-payment workflow that construction trades and field service businesses run daily.

It is NOT a generic project management tool (Jira/Asana). It is NOT a CPQ tool (no product configuration). It is a workflow tracker specifically shaped for businesses that:
- Create estimates based on measured scope items (square footage, linear feet, units)
- Schedule and assign field work to crews or subtrades
- Track progress by scope item and location
- Pay subtrades based on completed measured work
- Invoice customers and collect payment

**Common verticals:** drywall, roofing, HVAC, plumbing, electrical, painting, flooring, concrete, landscaping, general contracting.

The builder reads this skill, reads the DOMAIN.md for the specific trade and terminology, and generates a working prototype that uses the customer's actual scope items, pricing, and workflow stages.

## When to Use This Skill

Use this skill when the transcript or DOMAIN.md contains these signals:

| Signal | Examples |
|---|---|
| **Scope items with measurements** | square footage, linear feet, board feet, units per area |
| **Field scheduling** | crew assignment, job calendar, field work planning |
| **Subtrade payments** | paying subs, trade payments, per-sqft pay rates |
| **Estimate-to-invoice workflow** | estimate → schedule → work → invoice cycle |
| **Trade-specific scopes** | insulation, drywall, taping, roofing, framing, plumbing rough-in |
| **Location-based specs** | different specs per floor, per room, per zone |
| **Dual invoicing** | trade invoices (outgoing to subs) AND customer invoices (incoming from clients) |

**Do NOT use this skill for:**
- Product configuration with dependencies → use cpq-builder
- Inventory and stock management → use erp-builder (future)
- Generic CRM or contact management → use crm-builder (future)

## Section Definitions

The trades-builder tool has **FIVE sections**. These are fixed — they come from this skill, not from the business process described in the transcript.

### Section 1: Estimate

**What it does:** Capture the project details and build the scope-based estimate.

**Fields from DOMAIN.md:**
- Project name, customer name, address (always)
- Lead source (if DOMAIN.md mentions how projects originate)
- Estimator notes (free text)

**Scope items table:**
- Each row is a scope item from the DOMAIN.md entity registry (e.g., insulation, drywall, taping, sanding, cleaning)
- Columns: scope name, location, quantity (sqft/lft/units), unit rate, line total
- Multiple rows per scope if location-based specs exist (BR-005 pattern: "Basement — Type X — 1680 sqft")
- Add/remove rows
- Auto-calculate subtotal, tax, total

**Data from DOMAIN.md to use:**
- Entity Registry → Job Specification sub-items become scope item rows
- Business Rules → unit of measure (sqft, lft), tax type and rate, payment terms
- Terminology Glossary → exact scope names (not generic labels)

### Section 2: Schedule

**What it does:** Plan field work assignments and sequence.

**Fields:**
- Assigned roles/people (from DOMAIN.md Stakeholder Map — use `Select` dropdowns, not free text)
- Scope sequence (which scope items happen in what order — from DOMAIN.md flow or domain notes)
- Start date, target completion date
- Notes for field crew

**If DOMAIN.md mentions scheduling tools** (e.g., "Bold for scheduling"), reference them in the section description: "Use Bold to line up the field crew."

### Section 3: In Progress

**What it does:** Track work completion per scope item and location.

**Display:**
- Table view: Location | Quantity (sqft) | Scope Type | Status
- Rows come from the Estimate's scope items — this is the same data, now being tracked for completion
- Status per row: Not Started / In Progress / Completed
- "Mark completed" action button per row or for the whole section

**This section implements BR-004/BR-006 patterns** — scope items tracked by square footage, subtrade pay tied to measured work.

### Section 4: Close Out

**What it does:** Handle the dual payment flow — pay subtrades and invoice the customer.

**Display:**
- Two cards side by side:
  - **Trade Invoice** — status: Ready to pay / Paid. Shows subtrade payment amount based on completed scope sqft.
  - **Customer Invoice** — status: Ready to send / Sent / Paid. Shows customer-facing total with tax.
- "Close out job" action button that marks the project as Completed

**If DOMAIN.md mentions invoicing tools** (e.g., "Arvest for invoices"), reference them: "Send Bold trade invoice and Arvest customer invoice."

### Section 5: Job Summary

**What it does:** Read-only summary of the completed project — the final output view.

**Layout (top to bottom):**
1. **Company header** — brand logo + company name + placeholder address
2. **Project metadata** — project name, customer, address, estimate number, dates, assigned to
3. **Scope summary table** — all scope items with location, quantity, unit rate, line total
4. **Totals block** — subtotal, tax (with rate label), total
5. **Payment status** — trade invoice status + customer invoice status
6. **Terms** — payment terms, currency

**This view is read-only.** Users click back to Estimate or Schedule to make changes.

## Layout Pattern

The trades-builder tool uses a **three-panel layout** with **FIVE sections** (not four). The builder MUST follow this layout.

### Left sidebar (always visible, collapsible)

This content goes INTO the template's existing sidebar slot — it REPLACES the template's default navigation. Do not create a second sidebar next to the template's default one. One left sidebar total.

**Preserve the template's collapsible sidebar behavior.** If the template has a sidebar toggle, keep it working. Inject skill content into the existing collapsible component — do not rebuild from scratch.

**If you cannot put the stepper in the template's sidebar without modifying the layout file, modify the layout file.** The skill layout overrides template preservation. Do not create a second sidebar column just to avoid touching `MainLayout.tsx`.

**Sidebar heading:** Use a contextual label like "Workflow" or "Project workflow" — not the company name.

| Component | Content |
|---|---|
| **Stepper** | A VERTICAL list of ALL FIVE sections: (1) Estimate, (2) Schedule, (3) In Progress, (4) Close Out, (5) Job Summary. Each step shows: step number, label, subtitle from section description, and completion state. **Vertical stepper in the sidebar — NOT horizontal tabs.** Modify the layout file if needed — skill layout overrides template preservation. |
| **Saved projects** | List of projects stored in localStorage. Each shows name + customer + status badge (Estimated / Scheduled / In Progress / Completed). Pin this section to the bottom of the sidebar so it's always visible without scrolling. Double-click a project name to rename inline. |

### Main content (center — changes per section)

**Only the active section renders.** Do NOT stack all sections on one scrolling page. Do NOT combine multiple sections into one panel (e.g., "Schedule / In Progress / Close Out" as one section is WRONG — each is its own panel). Do NOT use horizontal tabs. Each stepper step shows its corresponding panel at FULL WIDTH of the main content area. All other panels are hidden.

Implementation: use a `currentStep` state variable (0–4). Render only the panel that matches `currentStep`.

```tsx
// ALL FIVE panels, conditional rendering
{currentStep === 0 && <EstimatePanel />}
{currentStep === 1 && <SchedulePanel />}
{currentStep === 2 && <InProgressPanel />}
{currentStep === 3 && <CloseOutPanel />}
{currentStep === 4 && <JobSummaryPanel />}
```

| Section | What renders |
|---|---|
| **Estimate** | Project details form + scope items table with add/remove rows, quantities, rates, auto-calculated totals. "Save estimate" and "Continue to Schedule" buttons. |
| **Schedule** | Role/crew assignment dropdowns (from DOMAIN.md), scope sequence, date fields, field notes. "Continue to In Progress" button. |
| **In Progress** | Location-based scope tracking table with status per row. "Mark completed" button. |
| **Close Out** | Trade invoice card + customer invoice card, side by side. "Close out job" button. |
| **Job Summary** | Read-only formatted project summary with company header, scope table, totals, payment status. |

### Right sidebar (always visible)

| Component | Content |
|---|---|
| **Project summary** | Live-updating card: current stage, estimate number, payment terms, subtotal, tax, total. Updates when scope items change. |
| **Workflow notes** | Business rules from DOMAIN.md displayed as contextual guidance. Reference BR-IDs. |
| **Actions** | Back, Continue, and Delete project buttons. Primary action uses brand accent color. |

### RBAC behavior

- Seed localStorage with roles from DOMAIN.md User Roles or Stakeholder Map.
- Role switcher is a **single `DropdownMenu` dropdown in the header bar** — not separate buttons. Shows active role name and badge.
- **Approval gating**: If DOMAIN.md says only certain roles can close out or approve, disable those buttons for other roles.
- **Role-specific views**: If roles handle specific stages (e.g., estimator handles Estimate, project manager handles Schedule), show relevant context when that role is active.

### Price visibility

- Show prices on the Estimate panel — unit rates, line totals, subtotal, tax, total.
- Show running totals in the right sidebar Project Summary.
- Use the currency, tax type, and tax rate from DOMAIN.md.
- Format prices with the currency code (e.g., "$3,900.40 CAD" or "$3,900.40" with "CAD" shown in the summary).

### shadcn/ui component mapping

| Trades-ops Element | shadcn Component | Usage Notes |
|---|---|---|
| Project details form | `Input`, `Label`, `Select` | Project name, customer, address. Stack label above input. |
| Scope items table | `Table`, `TableHeader`, `TableRow`, `TableCell` | Add/remove rows. Right-align numeric columns. |
| Scope item status | `Badge` | Not Started = outline, In Progress = blue, Completed = green. |
| Project status badges | `Badge` | Estimated = amber, Scheduled = blue, In Progress = blue, Completed = green. |
| Role badges | `Badge` | Staff = outline, Approver = default. |
| Assignment dropdowns | `Select`, `SelectContent`, `SelectItem` | Populate from DOMAIN.md stakeholder names. NOT free text inputs. |
| Invoice status cards | `Card`, `CardHeader`, `CardContent` | Trade invoice + customer invoice side by side. |
| Action buttons | `Button` | Primary: brand accent, "Continue." Secondary: outline, "Back." Destructive: "Delete project." |
| Stepper navigation | Custom vertical list | Step number in circle, label, subtitle, completion checkmark. Use `cn()` for states. |
| Role switcher | `DropdownMenu` | Single dropdown trigger in header. |
| Project summary sidebar | `Card` with stacked label/value rows | Labels muted, values bold. Total row large and prominent. |
| Workflow notes | `Card` with `text-sm text-muted-foreground` | Reference material with BR-IDs. |
| Date fields | `Input` with `type="date"` | Start date, target completion. |
| Notes/textarea | `Textarea` | Estimator notes, field crew notes. |
| Confirmation dialogs | `AlertDialog` | Delete project, close out job. |
| Toast notifications | `Sonner` / `toast()` | After save, mark complete, close out. |

## Deterministic Mapping Rules

### Entity → Scope Item Mapping

When the Knowledge Agent extracts entities from the transcript, map them to the trades-builder structure:

| DOMAIN.md entity | Maps to | In section |
|---|---|---|
| Project / Job | Project record (top-level) | All sections |
| Estimate | Estimate data (prices, terms) | Estimate panel |
| Job Specification / Scope | Scope items table rows | Estimate + In Progress |
| Invoice | Customer invoice card | Close Out |
| Trade Invoice | Trade invoice card | Close Out |
| Subtrade Payment | Payment status on trade invoice | Close Out |
| Field Schedule | Schedule data | Schedule panel |

### Business Rule → Validation Mapping

| DOMAIN.md rule pattern | Implementation |
|---|---|
| "tracked by square footage" | Scope items table uses sqft as quantity column |
| "paid per square footage" | Trade invoice amount = sum of (sqft × rate) for completed scope items |
| "different [type] per location" | Scope items table includes Location column, multiple rows per scope type |
| "stages: estimated, scheduled, in progress, completed" | Stepper stages match exactly |
| "manually entered" | Project creation form, no import flow |
| "GST/HST at X%" | Tax line in estimate and invoice, tax type as label |
| "Net 30/45" | Payment terms shown in summary and invoice |
| "only [role] can [action]" | RBAC gate on the relevant button |

### Integration → Reference Mapping

If DOMAIN.md lists integration points (e.g., Bold, Arvest, QuickBooks), reference them in section descriptions and workflow notes — but do NOT build integration UI. The prototype is localStorage-only. Integration comes in the full build.

## Reference Files

This skill expects these files to exist:

| File | Purpose |
|---|---|
| `DOMAIN.md` or `.tasks/domain.md` | Business terminology, entities, rules, roles, brand data |
| `frontend-design/SKILL.md` | Universal layout principles, brand theming, visual quality rules |

The builder should read BOTH before writing any code.
