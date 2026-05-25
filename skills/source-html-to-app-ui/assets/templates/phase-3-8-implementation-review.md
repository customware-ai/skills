# Implementation Review

## Ordered Implementation Checklist

Keep this checklist current through Phase 3, Phase 4, and Phase 5. Every row needs a status and concrete file evidence.

| Order | Required Step | Phase Owner | Status | Evidence | Blocking If Not Done? | Notes |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `app/app.css` token foundation | Phase 3 | Not Started |  | Yes |  |
| 2 | `tailwind.config.ts` token mapping | Phase 3 | Not Started |  | Yes |  |
| 3 | Demo/reference surface inspection | Phase 3 | Not Started |  | Yes |  |
| 4 | Shared `app/components/ui/*` primitive updates | Phase 3 | Not Started |  | Yes |  |
| 5 | Shell/sidebar ownership | Phase 3 | Not Started |  | Yes |  |
| 6 | `app/routes.ts` or equivalent route registration | Phase 4 | Not Started |  | Yes |  |
| 7 | Real route files | Phase 4 | Not Started |  | Yes |  |
| 8 | Route sections and states | Phase 4 | Not Started |  | Yes |  |
| 9 | Mobile states and behavior | Phase 4 | Not Started |  | Yes |  |
| 10 | Pre-visual integrity review | Phase 5 | Not Started |  | Yes |  |

## Phase 5 Integrity Checklist

All rows must be `Done` before visual verification starts.

| Check | Status | Evidence | Blocking? | Notes |
| --- | --- | --- | --- | --- |
| Ordered checklist rows 1 through 9 are complete and in order | Not Started |  | Yes |  |
| `app/app.css` is the shared token source of truth | Not Started |  | Yes |  |
| `tailwind.config.ts` consumes shared CSS variables | Not Started |  | Yes |  |
| Shared reusable control styling lives in `app/components/ui/*` or equivalent primitive layer | Not Started |  | Yes |  |
| No fake global component classes such as `.btn` or `.input` are used for reusable controls | Not Started |  | Yes |  |
| Sidebar shell uses the shared sidebar component or equivalent shell layer when the source has a sidebar | Not Started |  | Yes |  |
| `app/routes.ts` or equivalent route registration matches the accepted route map | Not Started |  | Yes |  |
| Primary pages use real route modules rather than an in-memory page-state switch | Not Started |  | Yes |  |
| Nav items without accepted source destinations are disabled instead of routing to invented pages | Not Started |  | Yes |  |
| If a sidebar shell exists, vertical overflow belongs only to the content pane and never to the full page | Not Started |  | Yes |  |
| Visible interaction families are real and affect rendered state | Not Started |  | Yes |  |
| Distinct source states remain distinct in the target | Not Started |  | Yes |  |
| Required repo checks for the authored implementation passed | Not Started |  | Yes |  |
| Implementation artifacts are filled with real content, not template placeholders | Not Started |  | Yes |  |

## Phase 3 Gate Scorecard

| Category | Passed | Total | Failed Items | Notes |
| --- | ---: | ---: | --- | --- |
| Design-system foundation | 0 | 5 | Pending |  |
| Shell ownership and geometry | 0 | 5 | Pending |  |
| Shared-component treatment | 0 | 5 | Pending |  |
| Screenshot and review discipline | 0 | 5 | Pending |  |

### Phase 3 Decision

- Score: `0/20`
- Required score: `19/20`
- Pass/Fail: `Fail`

## Phase 4 Gate Scorecard

| Category | Passed | Total | Failed Items | Notes |
| --- | ---: | ---: | --- | --- |
| Route architecture and coverage | 0 | 8 | Pending |  |
| Page-section coverage | 0 | 8 | Pending |  |
| Interaction reality | 0 | 6 | Pending |  |
| Mobile route/state coverage | 0 | 4 | Pending |  |
| Artifact discipline | 0 | 4 | Pending |  |

### Phase 4 Decision

- Score: `0/30`
- Required score: `28/30`
- Pass/Fail: `Fail`

## Phase 5 Gate Scorecard

| Category | Passed | Total | Failed Items | Notes |
| --- | ---: | ---: | --- | --- |
| Design-system and primitive discipline | 0 | 6 | Pending |  |
| Route architecture | 0 | 6 | Pending |  |
| Interaction truth | 0 | 6 | Pending |  |
| State distinction | 0 | 4 | Pending |  |
| Build, runtime, and test integrity | 0 | 4 | Pending |  |
| Ordered checklist and artifact discipline | 0 | 4 | Pending |  |

### Phase 5 Decision

- Score: `0/30`
- Required score: `28/30`
- Pass/Fail: `Fail`

## Phase 6 Gate Scorecard

| Category | Passed | Total | Failed Items | Notes |
| --- | ---: | ---: | --- | --- |
| Route coverage | 0 | 8 | Pending |  |
| Interaction fidelity | 0 | 8 | Pending |  |
| Layout and scale | 0 | 8 | Pending |  |
| Styling system | 0 | 8 | Pending |  |
| Mobile fidelity | 0 | 6 | Pending |  |
| Component states | 0 | 6 | Pending |  |
| Artifact and verification discipline | 0 | 6 | Pending |  |

### Phase 6 Decision

- Score: `0/50`
- Required score: `49/50`
- Pass/Fail: `Fail`

## Desktop Fidelity Gate

| Metric | Score | Required | Pass/Fail | Notes |
| --- | ---: | ---: | --- | --- |
| Desktop fidelity | `0/50` | `48/50` | Fail |  |

## Mobile Fidelity Gate

| Metric | Score | Required | Pass/Fail | Notes |
| --- | ---: | ---: | --- | --- |
| Mobile fidelity | `0/50` | `48/50` | Fail |  |

## Phase 7 Gate Scorecard

| Category | Passed | Total | Failed Items | Notes |
| --- | ---: | ---: | --- | --- |
| Adversarial-search discipline | 0 | 8 | Pending |  |
| Functional proof coverage | 0 | 8 | Pending |  |
| Artifact discipline | 0 | 4 | Pending |  |

### Phase 7 Decision

- Score: `0/20`
- Required score: `19/20`
- Pass/Fail: `Fail`

## Critical Items

| Critical Item | Pass/Fail | Evidence | Fix If Failed |
| --- | --- | --- | --- |
| Target app boots | Pending |  |  |
| `app/app.css` token layer is updated first and Tailwind consumes those shared CSS variables | Pending |  |  |
| Shared reusable component styling lives in `app/components/ui/*` or the repo's equivalent primitive layer | Pending |  |  |
| Sidebar shell uses the shared sidebar component or equivalent shell layer when the source has a sidebar | Pending |  |  |
| Ordered implementation checklist rows are complete and in order for the current phase | Pending |  |  |
| Primary routes exist | Pending |  |  |
| Primary routing uses real route modules, not an in-memory page-state machine | Pending |  |  |
| Nav items without accepted source destinations are disabled instead of routing to invented pages | Pending |  |  |
| Mobile implementation exists | Pending |  |  |
| Source interaction families exist as real interactions | Pending |  |  |
| Target owns the viewport as the product UI | Pending |  |  |
| If a sidebar shell exists, vertical overflow belongs only to the content pane rather than the full page | Pending |  |  |
| Target does not depend on the provided source HTML file at runtime | Pending |  |  |
| Every source-listed page section has a target review row | Pending |  |  |
| Ordinary styling drift is closed | Pending |  |  |
| Open gaps contain no unresolved ordinary drift | Pending |  |  |
| Review tables are intact | Pending |  |  |
| Implementation artifacts are filled with real content, not template placeholders | Pending |  |  |
| Required repo checks for the changed implementation passed before visual verification started | Pending |  |  |

## Route And State Review

| Route Or State | Source Reference | Target Reference | Structure Match | Styling Match | Behavior Match | Next Fix |
| --- | --- | --- | --- | --- | --- | --- |
| home-default | `mocks/source/desktop-home.png` | `mocks/verification/desktop-home.png` | Pending | Pending | Pending | Fill after first target capture. |

## Page Section Review

Use one row per visible section listed in `design/source-inventory.md`.

| Section ID | Route Or State | Source Reference | Target Reference | Structure Match | Styling Match | Behavior Match | Mobile Match | Next Fix |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| home-shell | home-default | `mocks/source/desktop-home.png` | `mocks/verification/desktop-home.png` | Pending | Pending | Pending | Pending | Fill after first target capture. |

## Functional Proof

| Interaction Family | Source Reference | Target Reference | Result | Notes |
| --- | --- | --- | --- | --- |
| Pending |  |  | Pending | Capture after interactions exist. |

## Adversarial Pass

| Suspected Difference | Source Reference | Target Reference | Blocking? | Resolution |
| --- | --- | --- | --- | --- |
| Pending |  |  | Pending | Run after implementation appears complete. |

## Overall Gate Summary

| Phase | Score | Required | Critical Items | Pass/Fail |
| --- | --- | --- | --- | --- |
| Phase 3 | `0/20` | `19/20` | Pending | Fail |
| Phase 4 | `0/30` | `28/30` | Pending | Fail |
| Phase 5 | `0/30` | `28/30` | Pending | Fail |
| Phase 6 | `0/50` | `49/50` | Pending | Fail |
| Desktop Fidelity | `0/50` | `48/50` | Pending | Fail |
| Mobile Fidelity | `0/50` | `48/50` | Pending | Fail |
| Phase 7 | `0/20` | `19/20` | Pending | Fail |

## Phase 8 Signoff Gate

| Signoff Item | Pass/Fail | Evidence | Notes |
| --- | --- | --- | --- |
| All earlier gates passed and are current | Pending |  |  |
| Desktop fidelity gate passed at `48/50` or better | Pending |  |  |
| Mobile fidelity gate passed at `48/50` or better | Pending |  |  |
| All required artifacts exist | Pending |  |  |
| Final desktop and mobile screenshots exist | Pending |  |  |
| Open gaps contain no unresolved ordinary drift | Pending |  |  |
| Required review tables remain intact | Pending |  |  |
| Required repo checks for code changes have been run | Pending |  |  |
| App is interactive | Pending |  |  |
| App does not depend on the provided source HTML file at runtime | Pending |  |  |
| App owns the viewport as the product UI | Pending |  |  |
| No placeholder or generic route remains | Pending |  |  |
| No ordinary section remains unreviewed | Pending |  |  |
| No critical item remains failing | Pending |  |  |

### Phase 8 Decision

- Score: `0/12`
- Required score: `12/12`
- Pass/Fail: `Fail`
