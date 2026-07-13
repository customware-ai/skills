# Phase 2: Integrity And Responsive Safety

## Integrity And Scope Audit

| Critical item | Pass/Fail | Evidence/repair |
| --- | --- | --- |
| Target is authored app code with no source runtime dependency | Fail |  |
| No wrapper/viewer/raw injection or forbidden embedding exists | Fail |  |
| No backend, API, database, persistence, auth, or business logic changed | Fail |  |
| Routes/states/sections/interactions/mobile contract is complete | Fail |  |
| Route boundaries, local interactions, disabled nav, and real logo are correct | Fail |  |
| Required evidence tables and rows remain auditable | Fail |  |

## Required Repo Checks And Build

| Recorded target instruction | Exact command/action | Result | Evidence |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

## Managed Paired Playwright Evidence

| Item | Evidence |
| --- | --- |
| Source helper command, source-only port, `task-workflow/runtime/source/` logs, fixed-wait audit | Pending |
| Target helper command, target-only port, `task-workflow/runtime/target/` logs, fixed-wait audit | Pending |
| Matching route/state/viewport pairs and real-input interaction states | Pending |
| Timeout values and diagnosis-before-extension evidence | Pending |
| First real comparison replaced the fresh Phase 0 gap row | Pending |

## Paired Full-View And Section Images

| Route/state | Page section/full view | Viewport | Source image | Target image | Geometry/state findings | Result/repair |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Structural Scroll Ownership

| Requirement | Pass/Fail | Evidence/repair |
| --- | --- | --- |
| Shell owns viewport structurally | Fail |  |
| Document does not own vertical scroll when sidebar exists | Fail |  |
| Content pane owns overflow and sidebar remains full-height/stable by structure | Fail |  |
| No blank lower-sidebar region is structurally possible | Fail |  |

## Responsive Safety Audit

| Viewport/state | Overlap | Clipping/cutoff | Canvas/horizontal overflow | Accidental page scroll | Control usability | Result/evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop | Pending | Pending | Pending | Pending | Pending | Pending |
| Tablet | Pending | Pending | Pending | Pending | Pending | Pending |
| Mobile | Pending | Pending | Pending | Pending | Pending | Pending |
| Short-height desktop when relevant | Pending | Pending | Pending | Pending | Pending | Pending |

## Browser Geometry And Interaction-State Audit

| Paired route/state/viewport | Overlap/clipping/cutoff | Horizontal canvas overflow | Vertical/document/content overflow | Control usability | Real-input state proof | Result/evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Theme Safety Audit

| Theme | Source represented? | Derivation authority if omitted | Readability/contrast | No invented direction/switch | Result/evidence |
| --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending |

## Binary Critical Checklist

| Critical item | Pass/Fail | Evidence/repair |
| --- | --- | --- |
| Integrity and UI-only scope audit passes | Fail |  |
| Required repo checks/build pass | Fail |  |
| Structural scroll ownership passes | Fail |  |
| Managed paired source-target full-view/section image evidence passes | Fail |  |
| Browser geometry and important real-input interaction-state evidence passes | Fail |  |
| Every responsive safety row passes | Fail |  |
| Source themes and required conservative derived themes pass with image/readability evidence | Fail |  |

- Critical checklist: Fail
- Promotion lock: Pending
- Decision: Fail
