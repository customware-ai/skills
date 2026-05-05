# Existing Project Migration Checklist

## Build Context Reload
- [ ] Read root AGENTS.md
- [ ] Read existing-project-migration SKILL.md
- [ ] Read phase 1 overview
- [ ] Read phase 1 artifacts
- [ ] Read phase 1 grading
- [ ] Read `.import/verification.json`

## Source Intake
- [ ] Identify the actual source frontend root and backend root
- [ ] Enumerate the visible source route map and navigation structure
- [ ] Inspect source shell, layout, theme, typography, and brand assets
- [ ] Inspect source entities, API routes, and major workflows
- [ ] Inspect CSV headers and representative rows
- [ ] Resolve any source/domain conflicts toward `.import/` authority

## Migration Planning
- [ ] Create or update `.import/migration-plan.json`
- [ ] Record full source routes, pages, and workflows
- [ ] Record seed data sources and proposed Drizzle tables
- [ ] Record preservation targets, warnings, and verification targets

## Stack Migration
- [ ] Keep the target runtime on React Router + tRPC + Hono + Drizzle + SQLite
- [ ] Merge `client-only-spa` `app/` and preserve required files
- [ ] Remove conflicting template demo leftovers
- [ ] Implement source-derived schema, data flows, routes, and pages
- [ ] Use CSV row data as seed authority when present

## Product Fidelity
- [ ] Preserve product name and domain framing from the imported source
- [ ] Preserve visible route map and navigation labels
- [ ] Preserve page hierarchy, major layout blocks, and workflows
- [ ] Preserve styling language, theme tokens, typography direction, and logos
- [ ] Avoid migration-themed or generic filler UI

## Base Verification
- [ ] Run the app locally
- [ ] Exercise the highest-priority source workflows with Playwright
- [ ] Update `.import/migration-review.md` after each grading pass
- [ ] Update `.import/migration-open-gaps.md` after each grading pass
- [ ] Reach a passing phase 1 grade

## Verify Context Reload
- [ ] Re-read root AGENTS.md
- [ ] Re-read existing-project-migration SKILL.md
- [ ] Read phase 2 overview
- [ ] Read phase 2 artifacts
- [ ] Read phase 2 grading
- [ ] Re-read `.import/migration-plan.json`
- [ ] Re-read build warnings and open gaps

## Interactive Verification
- [ ] Verify the highest-priority source workflows interactively
- [ ] Verify representative secondary routes or workflows
- [ ] Compare route map and navigation against the source frontend
- [ ] Compare page hierarchy and major layout blocks against the source frontend
- [ ] Compare theme, typography, shell, and logo usage against the source frontend
- [ ] Record verified workflows and skipped workflows with reasons

## Runtime And Coverage
- [ ] Confirm runtime or review startup works on a fresh SQLite database
- [ ] Confirm migrations and seed paths work on a fresh database
- [ ] Add or repair Playwright coverage for verified workflows
- [ ] Re-run automated validation after fixes

## Final Drift Check
- [ ] Confirm the migrated app still matches the imported product framing
- [ ] Confirm source-visible routes were not collapsed into a generic subset
- [ ] Confirm source-visible pages were not replaced with filler dashboards or prose
- [ ] Confirm no legacy runtime or back-compat crutch remains
- [ ] Confirm no ordinary migration gap remains open
- [ ] Reach a passing phase 2 grade

## Verify Cleanup
- [ ] Remove temporary template clones or execution notes
- [ ] Remove `.import/migration-checklist.md` after final pass if cleanup is expected
- [ ] Remove `.import/migration-review.md` after final pass if cleanup is expected
- [ ] Remove `.import/migration-open-gaps.md` after final pass if cleanup is expected
- [ ] Leave `.import/` source artifacts and durable migration records as instructed
