# Phase 3: Playwright Signoff

## Managed Target Lifecycle

| Item | Evidence |
| --- | --- |
| Target-only port, helper command, readiness, and `task-workflow/runtime/target/` logs | Pending |
| Target browser scripts and fixed-wait audit | Pending |
| Timeout values and diagnosis-before-extension evidence | Pending |
| Valid Phase 0/2 source corpus and Phase 2 target pairs reused | Pending |
| Invalidated route/state/viewport/section pairs recaptured after fixes | Pending |

## Paired Source-Target Evidence

| Route/state | Page section | Source evidence | Target evidence | Viewport | Structure/style/behavior result | Next fix |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Viewport Proof

| Viewport/state | Dimensions | Source represented or conservative adaptation | Responsive/theme result | Screenshot evidence |
| --- | --- | --- | --- | --- |
| Desktop | Pending | Pending | Pending | Pending |
| Tablet | Pending | Pending | Pending | Pending |
| Mobile | Pending | Pending | Pending | Pending |
| Short-height desktop when relevant | Pending | Pending | Pending | Pending |

## Non-Compensating Independent Gates

| Fidelity gate | Required | Actual | Evidence |
| --- | --- | --- | --- |
| Layout fidelity | Pass | Pending | Pending |
| Style fidelity | Pass | Pending | Pending |
| Route fidelity | Pass | Pending | Pending |
| State fidelity | Pass | Pending | Pending |
| Interaction fidelity | Pass | Pending | Pending |
| Desktop fidelity | Pass and at least `48/50` | Pending | Pending |
| Mobile fidelity | Pass and at least `48/50` | Pending | Pending |
| Responsive safety | Pass | Pending | Pending |
| Theme safety | Pass | Pending | Pending |

## Deterministic Sidebar Proof

| Proof | Result | Evidence |
| --- | --- | --- |
| Forced-overflow short-height desktop and real scroll input | Pending |  |
| Document remains non-scroll owner | Pending |  |
| Content `scrollTop` moves when overflow exists, or permitted narrow N/A | Pending |  |
| Sidebar bounds remain stable | Pending |  |
| Shell/sidebar cover viewport height | Pending |  |
| Post-scroll screenshot has no blank lower-sidebar region | Pending |  |

## Detailed Mobile Drawer Proof

| Proof | Result | Evidence |
| --- | --- | --- |
| Opens through real input | Pending |  |
| Closes through real input | Pending |  |
| Full-viewport geometry | Pending |  |
| Overlay present | Pending |  |
| Overlay intercepts background interaction | Pending |  |
| Body/document scroll locked while open | Pending |  |
| Scroll restored after close | Pending |  |
| Open and close screenshots exist | Pending |  |

## Adversarial Mismatch Search

| Suspected serious mismatch | Source evidence | Target evidence | Blocking | Resolution/defense |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Real-Input Functional Proof

| Visible interaction family | Real input | Desktop/mobile evidence | Result | Repair |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Final Visual Score

| Category | Passed | Total | Evidence |
| --- | ---: | ---: | --- |
| Route/state/section coverage | 0 | 10 | Pending |
| Interaction fidelity | 0 | 8 | Pending |
| Layout/style fidelity | 0 | 10 | Pending |
| Desktop/mobile fidelity | 0 | 8 | Pending |
| Responsive/theme safety | 0 | 8 | Pending |
| Artifact/lifecycle discipline | 0 | 6 | Pending |

## Viewport Score Audit

Apply the same 50-item category totals independently to each viewport. Cite row-level evidence; do not derive either viewport total from the overall score.

| Category | Desktop passed | Desktop total | Desktop evidence | Mobile passed | Mobile total | Mobile evidence |
| --- | ---: | ---: | --- | ---: | ---: | --- |
| Route/state/section coverage | 0 | 10 | Pending | 0 | 10 | Pending |
| Interaction fidelity | 0 | 8 | Pending | 0 | 8 | Pending |
| Layout/style fidelity | 0 | 10 | Pending | 0 | 10 | Pending |
| Desktop/mobile fidelity | 0 | 8 | Pending | 0 | 8 | Pending |
| Responsive/theme safety | 0 | 8 | Pending | 0 | 8 | Pending |
| Artifact/lifecycle discipline | 0 | 6 | Pending | 0 | 6 | Pending |
| **Total** | **0** | **50** | Pending | **0** | **50** | Pending |

- Overall: `0/50` (required at least `49/50`)
- Desktop: `0/50` (required at least `48/50`)
- Mobile: `0/50` (required at least `48/50`)
- Every independent gate: Pending
- Scored decision: Fail

## Expanded Critical Gate

| Critical item | Status | Evidence/repair |
| --- | --- | --- |
| Every paired route/state/section evidence row passes | Pending |  |
| Every independent fidelity gate passes without compensation | Pending |  |
| Responsive safety passes across the required viewport matrix | Pending |  |
| Theme safety and readability pass | Pending |  |
| Deterministic sidebar proof passes when present, or evidence-backed N/A | Pending |  |
| Detailed mobile drawer proof passes when present, or evidence-backed N/A | Pending |  |
| At least five serious mismatch checks are recorded and resolved/defended | Pending |  |
| Every visible interaction family passes real-input proof | Pending |  |
| Managed lifecycle, separate roots/ports/logs, and helper byte identity pass | Pending |  |
| Source and target browser-script fixed-wait audits pass | Pending |  |
| Bounded timeout and diagnosis-before-extension evidence passes | Pending |  |
| Final desktop and mobile screenshots exist and are current | Pending |  |
| No ordinary open gap remains | Pending |  |

- Critical items: Pending

## Compact Final Audit

| Audit item | Pass/Fail | Evidence |
| --- | --- | --- |
| Phase 0 source gate and Phase 1/2 binary gates remain current | Fail |  |
| Phase 3 score, independent gates, screenshots, adversarial/functional proof pass | Fail |  |
| Artifacts, links, lifecycle, fixed-wait, timeout, and gap evidence agree | Fail |  |
| UI-only scope, shortcut bans, responsive/theme adaptation, and final diff pass | Fail |  |
| Exact completion command/source recorded and command has not run early | Fail |  |
| `progress.md` names exact command as sole next action; both files read back | Fail |  |

## Literal-Final Completion Command

Expected shape: `node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary of what was done>"`. Copy the exact command from the task instructions; never synthesize or guess identifiers.

| Command source | Exact literal command | Proof not run early | No later tool action planned |
| --- | --- | --- | --- |
| Pending | Pending | Pending | Pending |

- Final audit decision: Fail

After changing the audit to `Pass`, read back this artifact and `progress.md`. Run the exact command as the literal final tool action. Do not write its result.
