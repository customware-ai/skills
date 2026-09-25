# Phases 2–3: Paired Playwright Fidelity

Read this reference when `CURRENT_PHASE.txt` is `phase-2-paired-responsive-proof` or `phase-3-fidelity-repair-signoff`. Read `references/playwright-lifecycle.md` for all browser/server work.

## Shared evidence contract

Build/check, code review, real-input interaction checks, measurements, and opened screenshots prove different claims; none substitutes for another. Capture source and target in separate lifecycle-owned runs. Pair a reachable source appearance with the target at matching route/state, theme, viewport, and section framing. A source-unavailable state uses the recorded error or unavailable UI and its HTML/CSS/design declarations instead of a fabricated source image; Phase 3 still verifies its target appearance and interaction. Do not reopen source JavaScript diagnostics during target comparison.

Across Phases 2–3, cover every page-like surface, materially distinct visual state, readable section, represented theme, desktop/mobile size, relevant tablet and short-height size, and interaction family. A readable image may cover multiple adjacent sections. An interaction without a new appearance needs real-input proof, not another screenshot. Local state changes need the changed area plus context, not duplicate full-page images of unchanged content. Let actual source structure determine evidence volume; no fixed screenshot cap applies.

Give each image a unique ID/path; never overwrite a prior revision. The PNG, capture script, and lifecycle log establish dimensions, viewport/state, and run ownership. Keep one concise comparison index: one pass/fail entry per compared UI area with its accepted source/target paths, the actual visual finding, and any material mismatch or fix. Several images may support one entry; do not make a separate finding row for each image, command, or metadata field. Update the same entry when a failed area is repaired and rechecked. Failed/invalidated images remain in runtime evidence with reasons, but are not counted as passing.

Open every newly accepted source and target image at readable scale, one tall pair or a small related batch; reuse Phase 0 source findings when current. Verify pair identity, framing, lifecycle ownership, and target freshness from the existing evidence. Compare content/order, geometry, spacing, typography, colors, borders/radii/shadows, backgrounds, controls/assets, clipping/overlap, state, scroll, theme, and responsive behavior. Write the area's pass/fail note at the first comparison, not after collecting an entire corpus. A contact sheet or representative sample alone is not visual proof. Capture scripts collect evidence; the Agent judges scores and gaps. Do not write scoring, packet-permit, or promotion scripts.

If the first comparison of an area fails materially, record the gap and owner, fix it, review its replacement evidence, and mark the same entry pass with a brief fail → fix → pass note before moving to the next area. Batch related fixes when they share a token or component rule; do not continue gathering unrelated comparisons while a known material mismatch remains. Update the compact checkpoint only when the next action or phase changes. A later packet failure does not invalidate earlier proven images; recapture only missing, invalid, or changed evidence.

## Phase 2: Broad paired comparison and correction

Enter Phase 2 only when Phases 0–1 pass at `48/50` or higher and target code is current. Reuse Phase 1 code, check, and build evidence until a relevant change invalidates it; do not repeat a complete diff audit or build merely to enter this phase. A green build cannot compensate for missing visual evidence.

Phase 2 is the broad one-to-one visual pass: compare source and target styling, placement, content, design-system consistency, and overall layout across routes, major visual states, readable sections, themes, desktop, and mobile. Use focused lifecycle-owned captures and real controls only as needed to reach those appearances. For each UI area, capture/open the pair, immediately record a concise pass/fail comparison, repair a material failure, recheck only that area, and then move on. Fix obvious broken controls encountered while reaching a view, but leave exhaustive interaction-family and small-detail checks for Phase 3. Do not build an interaction screenshot matrix in Phase 2. Revalidate only code/check claims invalidated by a repair; do not roll the marker back to Phase 1 for visual correction.

Inspect desktop/mobile layout, responsive transformation, represented themes, visible scroll regions, overlap, clipping, cutoff, and horizontal overflow. Use a tablet or short-height view in Phase 2 when it reveals a materially different layout or suspected defect. Repair broad layout and visual problems here. Phase 3 owns the final focused tablet/short-height, sidebar metric, drawer, and interaction checks; a visible Phase 2 failure must still be fixed immediately, not deferred.

### Phase 2 gate

| Category | Points |
| --- | ---: |
| Current UI-only code and required checks/build | 8 |
| Paired routes and major visual states | 12 |
| Readable section/content and overall layout parity | 12 |
| Design-system styling, assets, and controls | 10 |
| Desktop/mobile responsive and visible scroll safety | 8 |
| **Total** | **50** |

Required: at least `48/50`. Every critical item independently passes: current required checks/build and UI-only code; managed lifecycle; broad source-target comparison of every route, major visual state, readable section, represented theme, and desktop/mobile layout; a concise first-comparison pass/fail entry for each area with material failures repaired and rechecked before moving on; no missing content, unusable layout, or material style/placement mismatch; no unresolved Phase 2 visual gap. The Phase 2 gate does not require final interaction-family proof, every small-detail correction, or Phase 3's sidebar/drawer measurements. Score once from current evidence, not per-capture paperwork.

On pass, record `Decision: Pass` with evidence pointers, promote the marker to `phase-3-fidelity-repair-signoff`, and update the checkpoint. The stated passing threshold is sufficient when all critical items pass; do not pursue `50/50` through harmless micro-adjustments. On failure, repair within Phase 2 and refresh only invalidated evidence, including affected Phase 1 claims.

## Phase 3: Fine-detail fidelity and signoff

Enter only when Phases 0–2 pass and Phase 2's broad visual comparisons and checks remain current. Phase 3 completes the final checks: verify each interaction family with real input and focused assertions, capture only materially distinct resulting appearances, check tablet/short-height and shell safety, then review smaller differences in typography, spacing, color, borders, radii, assets, controls, and state details. Aim for the closest practical visual match, not literal pixel identity. Reuse unchanged Phase 2 pass entries and repair remaining material visual or behavioral mismatches; recapture only affected target images under new paths and update their comparison entry. Keep only unresolved material gaps in `open-gaps.md`.

Check smaller details against the accepted pairs while confirming Phase 2's broad layout, section, theme, and responsive proof still represents current code. Record genuine mismatches and their fix or source-backed defense without another table. Complete real-input interaction checks and, when applicable, the sidebar's document/content scroll deltas, stable bounds, viewport coverage, and post-scroll image plus the mobile drawer's open/close, overlay, body lock, and restoration. Reuse any current proof already produced in Phase 2; do not run a second check for the same claim. If a larger defect escaped Phase 2, repair it and refresh only affected visual evidence rather than replaying the whole comparison.

Before signoff, ensure a current, opened desktop and mobile pair for every route and materially distinct visual state, plus readable section evidence; a documented source-unavailable state has target visual and real-input proof. Reuse a Phase 2 pair if it is still current after relevant code changes; do not reopen, recapture, or duplicate it merely to label it “final.” Do not require a screenshot for an interaction whose resulting appearance is already evidenced. Inspect the final target diff and current build/check result; rerun only invalidated checks. Independently pass layout, style, route, state, section, interaction, desktop, mobile, responsive, scroll/sidebar, drawer, and theme fidelity.

### Phase 3 gate

Apply these weights overall and independently to desktop and mobile:

| Category | Points |
| --- | ---: |
| Route/state/section coverage | 10 |
| Layout and spacing fidelity | 10 |
| Typography, color, control, and asset fidelity | 10 |
| Interaction and visible state fidelity | 8 |
| Responsive, scroll, drawer, and theme safety | 8 |
| Evidence, lifecycle, and artifact integrity | 4 |
| **Total** | **50** |

Required: overall at least `49/50`; desktop and mobile each at least `48/50`. Every independent and critical fidelity category passes. Every route, readable section, and materially distinct visual state has a current opened pair; every source-defect-unreachable state has declaration-to-target proof; every interaction family has real-input proof; final desktop/mobile evidence is current and opened; applicable sidebar/drawer/theme safety passes; and `open-gaps.md` has no unresolved item. A harmless isolated pixel/line-wrap variance can receive an honest minor deduction without another capture or repair; repeated small deviations from one wrong token/component rule are material. A visual deduction can be re-reviewed only under the skill's bounded scoring-adjustment rule; missing evidence or objective failures cannot be offset.

On pass, record the three scores, critical results, and evidence pointers once; promote to `phase-4-final-audit-completion` and update the checkpoint. On failure, repair within Phase 3 and refresh only invalidated evidence and affected earlier gate claims. Do not call task completion from Phase 3.
