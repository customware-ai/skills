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

## Phase 1 Interactive Verification
- [ ] Determine the real review or preview host for phase-1 verification when available
- [ ] Exercise `/`, `/login`, seeded login, and the first post-login landing page interactively
- [ ] Visit every available migrated page route interactively
- [ ] Exercise at least one basic page-native action on every visited route or record a blocker
- [ ] Record the visited routes and exercised actions in `.import/migration-review.md`
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

## Phase 2 Sanity Recheck
- [ ] Re-read the phase-1 interactive verification evidence and open gaps
- [ ] Recheck `/`, `/login`, seeded login, and the first post-login landing page on the real host
- [ ] Sanity-check the highest-risk or newly changed routes after phase-2 fixes
- [ ] Compare route map and navigation against the source frontend and phase-1 report
- [ ] Compare page hierarchy, shell, and major layout blocks against the source frontend and phase-1 report
- [ ] Record rechecked workflows and skipped workflows with reasons

## Runtime And Coverage
- [ ] Confirm runtime or review startup works on a fresh SQLite database
- [ ] Confirm migrations and seed paths work on a fresh database
- [ ] Add or repair unit tests for verified workflows
- [ ] Add or repair Playwright end-to-end coverage for verified workflows
- [ ] Re-run automated validation and automated test suites after fixes

## Final Drift Check
- [ ] Confirm the migrated app still matches the imported product framing
- [ ] Confirm source-visible routes were not collapsed into a generic subset
- [ ] Confirm source-visible pages were not replaced with filler dashboards or prose
- [ ] Confirm no legacy runtime or back-compat crutch remains
- [ ] Confirm no ordinary migration gap remains open
- [ ] Reach a passing phase 2 grade

## Verify Cleanup
- [ ] Remove temporary template clones or execution notes
- [ ] Remove generated Playwright screenshots, traces, videos, and other temporary verification output
- [ ] Remove `.import/` after final pass unless explicit instructions require retaining it
- [ ] Leave only durable application code, tests, and intentional repo files
