# Phase 2: Paired Responsive Proof

Reuse accepted Phase 0 source images and their framing; capture only the target in this phase. Use the PNG, capture script, and lifecycle log for capture identity. Keep one concise comparison index with accepted/current pair paths, opened findings, concrete comparisons, and mismatch/pass decisions. Link it here; do not copy every pair into multiple tables or require a separate manifest. Failed revisions stay in runtime evidence with reasons and are excluded from the passing count.

## Evidence Pointers

<evidence_pointers>

- Phase 0 and 1 decisions/current source and target code: Pending
- Current UI-only code/diff and required check/build results (reuse Phase 1 proof until invalidated): Pending
- Source and target lifecycle run/packet output paths: Pending
- Accepted/current pair comparison index: Pending
- Broad page/section-layout coverage, representative structural states, and opened findings: see the accepted/current pair comparison index above
- Source-defect-unreachable states relevant to broad comparison (or `None`; final target proof belongs to Phase 3): Pending
- Desktop/mobile, represented theme, readable section, and materially different tablet/short-height coverage: Pending
- Actual unresolved mismatches: see `open-gaps.md`

</evidence_pointers>

## Objective Safety Proof

<objective_safety_proof>

- Responsive overlap/clipping/horizontal-overflow/control usability findings and evidence: Pending
- Visible scroll, sidebar, or drawer defects found during broad review and their repairs (or `None`; final measurements belong to Phase 3): Pending

</objective_safety_proof>

## Scorecard

<scorecard>

| Category | Passed | Total | Evidence |
| --- | ---: | ---: | --- |
| Current UI-only code and required checks/build | Pending | 8 | Pending |
| Paired page layouts and representative structural states | Pending | 12 | Pending |
| Readable section/content and overall layout parity | Pending | 12 | Pending |
| Design-system styling, assets, and controls | Pending | 10 | Pending |
| Desktop/mobile responsive and visible scroll safety | Pending | 8 | Pending |
| **Total** | **Unscored** | **50** | Pending |

Required: at least `48/50`. `Unscored` is not a pass.

</scorecard>

## Non-Compensating Critical Gate

<non_compensating_critical_gate>

| Critical item | Pass/Fail | Evidence or repair |
| --- | --- | --- |
| Current required checks/build and UI-only code pass | Pending | Pending |
| Source and target broad comparisons use managed lifecycles, real input where needed, and opened current images | Pending | Pending |
| Every page's broad layout and readable section hierarchy at desktop/mobile sizes and represented themes has an opened source-target comparison; needed representative structural states are included, and source-unavailable states use declarations rather than fabricated images | Pending | Pending |
| Each compared area's first finding records pass/fail; material broad-layout failures are repaired and rechecked before moving on, while smaller differences are handed to Phase 3 | Pending | Pending |
| No missing content, unusable layout, material style/placement mismatch, or unresolved Phase 2 broad visual gap remains | Pending | Pending |

</non_compensating_critical_gate>

## Decision And Transition

<decision_and_transition>

Phase 3 owns final interaction/sidebar/drawer proof; do not perform it to unlock this gate.

Evaluate the scorecard and critical requirements once from their cited evidence. Record `Decision: Pass` before updating the marker and compact checkpoint to Phase 3. Updating those pointers is not a second review or separate promotion scorecard.

- Score: Unscored
- Critical items: Pending
- Decision: Pending

</decision_and_transition>
