# Phase 3: Fidelity Repair And Signoff

Reuse the Phase 2 comparison index and already-opened findings. Add only changed/replacement pair findings and actual mismatch resolutions there; do not reopen unchanged pairs or rebuild a second full-view/section/final matrix. Runtime history retains invalidated revisions. The HTML/design, code/diff, and accepted images remain the authorities for their respective facts.

## Fidelity Evidence

- Phase 0–2 current decisions and accepted pair index: Pending
- Genuine visual mismatches found, owning fixes, and replacement pair IDs (or `None`): Pending
- Adversarial review of layout, style, route, state, sections, desktop/mobile, responsive/scroll/drawer, and themes: Pending
- Every visible interaction family tested with real controls on applicable desktop/mobile surfaces and current outcomes: Pending
- Current final desktop/mobile pair for every route and materially distinct visual state, plus readable section evidence: Pending
- Current recorded sidebar metrics and post-scroll image; drawer/theme safety (or `N/A`): Pending
- Target changes since the last current diff review and current required checks/build (reuse unchanged results): Pending
- Actual unresolved gaps: see `open-gaps.md`

## Independent Fidelity Gates

Each category passes separately; one cannot compensate for another. Fill this once at final signoff, not after each image or fix.

| Gate | Pass/Fail/N/A | Evidence |
| --- | --- | --- |
| Layout fidelity | Pending | Pending |
| Style fidelity | Pending | Pending |
| Route fidelity | Pending | Pending |
| State fidelity | Pending | Pending |
| Section fidelity | Pending | Pending |
| Interaction fidelity | Pending | Pending |
| Desktop fidelity | Pending | Pending |
| Mobile fidelity | Pending | Pending |
| Responsive safety | Pending | Pending |
| Scroll/sidebar safety | Pending | Pending |
| Drawer safety | Pending | Pending |
| Theme safety | Pending | Pending |

## Overall And Viewport Scorecards

Apply the same weights three times, with separate current evidence for overall, desktop, and mobile.

| Category | Total | Overall | Desktop | Mobile | Evidence pointers |
| --- | ---: | ---: | ---: | ---: | --- |
| Route/state/section coverage | 10 | Pending | Pending | Pending | Pending |
| Layout and spacing fidelity | 10 | Pending | Pending | Pending | Pending |
| Typography, color, control, and asset fidelity | 10 | Pending | Pending | Pending | Pending |
| Interaction and visible state fidelity | 8 | Pending | Pending | Pending | Pending |
| Responsive, scroll, drawer, and theme safety | 8 | Pending | Pending | Pending | Pending |
| Evidence, lifecycle, and artifact integrity | 4 | Pending | Pending | Pending | Pending |
| **Total** | **50** | **Unscored** | **Unscored** | **Unscored** | Pending |

Required: overall `49/50`; desktop and mobile `48/50` each. `Unscored` is not a pass.

## Non-Compensating Critical Gate

| Critical item | Pass/Fail | Evidence or repair |
| --- | --- | --- |
| Every independent fidelity gate above passes and source-backed mismatches are repaired | Pending | Pending |
| Every route, materially distinct visual state, and readable section has current opened source-target proof; unreachable source states have declaration-to-target proof | Pending | Pending |
| Final desktop/mobile images and pair identities/framing/dimensions/freshness/opened findings are current | Pending | Pending |
| Every interaction family has real-input target proof on applicable desktop/mobile surfaces | Pending | Pending |
| Responsive/sidebar/drawer/theme safety and target sidebar predicates pass | Pending | Pending |
| Target changes since the last current diff review and required checks/build pass; no UI-only boundary violation remains | Pending | Pending |
| `open-gaps.md` has no unresolved item; no material mismatch, stale evidence, or placeholder remains | Pending | Pending |

## Promotion Lock

- After all Phase 3 capture, interactions, and repairs, review overall/desktop/mobile arithmetic, independent and critical gates, current evidence, and empty open gaps: Pending
- After recording `Decision: Pass`, promote the marker and checkpoint to Phase 4; do not claim promotion before it happens.
- Any later Phase 3 browser packet or target-code change resets `Decision` to Pending until the affected gate is reviewed again.

- Overall score: Unscored
- Desktop score: Unscored
- Mobile score: Unscored
- Critical items: Pending
- Promotion lock: Pending
- Decision: Pending
