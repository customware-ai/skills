# Phases 2–3: Paired Playwright Fidelity

Read this reference when `CURRENT_PHASE.txt` is `phase-2-paired-responsive-proof` or `phase-3-fidelity-repair-signoff`. Read `references/playwright-lifecycle.md` for all browser/server work.

## Shared evidence contract

Build/check, code review, real-input interaction checks, measurements, and opened screenshots prove different claims; none substitutes for another. Capture source and target in separate lifecycle-owned runs. For each reachable source state, pair the same route/state, theme, browser viewport, scroll/section framing, and real-input reach steps. A source-unavailable state uses the recorded error or unavailable UI and its HTML/CSS/design declarations instead of a fabricated source image; its target state still needs complete screenshots and real-input proof. Do not reopen source JavaScript diagnostics during target comparison.

Cover every page-like surface, layout-distinct state, readable section, represented theme, desktop/mobile size, relevant tablet and short-height size, and important interaction state. A readable image may cover multiple adjacent sections. Local state changes need the changed area plus context, not duplicate full-page images of unchanged content. Let actual source structure determine evidence volume; no fixed screenshot cap applies.

Give each image a unique ID/path; never overwrite a prior revision. The PNG, capture script, and lifecycle log establish actual dimensions, viewport/state, and run ownership. Do not require a separate manifest or duplicate those facts in Markdown. Keep one concise comparison index keyed by accepted/current pair ID with source/target paths, separate opened findings, concrete visual comparison, and mismatch or pass decision. Do not duplicate the same pair in full-view, section, packet-review, and final matrices. Failed/invalidated images remain in runtime evidence with reasons, but are not counted as the passing corpus.

Open every newly accepted source and target image separately at readable scale, one very tall pair or up to four related smaller images per review; reuse already opened Phase 0 source findings when current. Verify pair identity, dimensions/framing, lifecycle ownership, and target freshness. Compare content/order, geometry, spacing, typography, colors, borders/radii/shadows, backgrounds, controls/assets, clipping/overlap, state, scroll, theme, and responsive behavior. Record one concrete finding per image and a pair conclusion. A contact sheet or representative sample alone is not visual proof. Capture scripts collect evidence; the Agent judges scores and gaps. Do not write scoring, packet-permit, or promotion scripts.

After a meaningful capture group, update only its accepted pair findings and actual unresolved gaps. Update the compact checkpoint only when the next action or phase changes. Batch related code repairs before rebuilding and recapturing; use the code diff to identify affected states, then reopen only replacement images. A later packet failure or missing optional manifest does not invalidate earlier images whose identity, state, framing, and lifecycle remain provable. If an image lacks valid visual content or provenance, recapture that image; do not discard an entire packet by default.

## Phase 2: Broad paired comparison and correction

Enter Phase 2 only when Phases 0–1 pass at `48/50` or higher and target code is current. Inspect the complete target diff for real routes/components/local state, UI-only scope, source-backed assets, structural shell, and unchanged lifecycle helper. Use the task's exact target checks/build; reuse Phase 1 output only if no later code changed, otherwise rerun and retain complete output. A green build cannot compensate for missing visual evidence.

Run focused, lifecycle-owned source and target capture scripts sequentially; do not keep both servers alive manually. Use real controls, not evaluated DOM mutation, to reach states. Build the pair corpus in focused groups; after each group, compare the whole UI across routes, sections, states, themes, and viewports. Repair missing content, major layout/design-system differences, broken interactions, and responsive defects in Phase 2 before capturing affected target evidence again. Record material mismatches with owner and next repair in `open-gaps.md`; repair evidence-script defects in Phase 2 as well. Revalidate affected Phase 1 code/check claims after target edits, but do not roll the marker back for visual correction. Do not rerun an unchanged check/build or capture merely for reassurance.

Prove desktop, tablet when relevant, mobile, and short-height overflow. Inspect overlap, clipping/cutoff, horizontal canvas overflow, control usability, theme and visible interaction states. When a sidebar exists, use real scrolling with pre/post screenshots and current target metrics. Compute and record once:

- target document scroll delta `= 0`;
- target named content-scroller delta `> 0`;
- absolute sidebar top and bottom deltas `<= 1px`;
- sidebar height and bottom within `1px` of viewport height;
- no blank lower-sidebar region in the opened post-scroll image.

Source metrics describe the reference, not a substitute for target predicates. If a target predicate fails, repair the shell in Phase 2, refresh affected code/check and target proof, and re-evaluate the predicate. When a mobile drawer exists, prove real-input open/close, full-height geometry, overlay interception, body/document scroll lock and restoration, with opened images and measurements.

### Phase 2 gate

| Category | Points |
| --- | ---: |
| Authored-code and UI-only integrity | 8 |
| Required target checks/build | 6 |
| Paired route/state/full-view evidence | 10 |
| Paired section evidence | 10 |
| Responsive, scroll, sidebar, and drawer proof | 10 |
| Theme and interaction-state proof | 6 |
| **Total** | **50** |

Required: at least `48/50`. Every critical item independently passes: current checks/build and UI-only code integrity; managed lifecycle and deterministic waits; all reachable full views, distinct states and readable sections have current opened pairs; source-defect-unreachable states have declaration-to-target proof; every accepted pair has unique paths, matching viewport/framing, reviewed dimensions, separate opened findings and current target capture; no blank, omitted, clipped, colliding, unreadable, or grossly mismatched UI remains; responsive/theme and real-input states pass; applicable sidebar/drawer predicates pass; no unresolved Phase 2 gap remains. Score once from the current evidence and critical rows, not per-capture paperwork.

On pass, record `Decision: Pass` with evidence pointers, promote the marker to `phase-3-fidelity-repair-signoff`, and update the checkpoint. The stated passing threshold is sufficient when all critical items pass; do not pursue `50/50` through harmless micro-adjustments. On failure, repair within Phase 2 and refresh only invalidated evidence, including affected Phase 1 claims.

## Phase 3: Fine-detail fidelity and signoff

Enter only when Phases 0–2 pass and the Phase 2 pair corpus and checks remain current. Phase 3 uses that completed comparison to focus on smaller element-level differences: typography, spacing, color, borders, radii, assets, controls, and state details. Aim for the closest practical visual match, not literal pixel identity. Independently judge the current evidence and repair remaining material visual or behavioral mismatches; do not reopen or rewrite unchanged passing pairs. Inspect the owning code/diff, batch related repairs, recapture only affected target images under new paths, and reopen each replacement against its matching source before closing a mismatch. Keep only unresolved material gaps in `open-gaps.md`, with resolution evidence in the existing comparison index/runtime history.

Check the smaller details against the accepted pairs while confirming Phase 2's shell, section, theme, responsive, and interaction proof still represents the current code. Record genuine suspected mismatches and their fix or source-backed defense; do not invent a fixed number to fill a table. Recompute sidebar predicates or exercise controls only when prior proof is missing, unclear, or invalidated by a relevant change. A prior `Pass` label alone is not proof, but current Phase 2 measurements and real-input results may be reused. If a larger defect escaped Phase 2, repair it and refresh only its affected Phase 2 evidence rather than replaying the whole comparison.

Before signoff, ensure a current, previously opened desktop and mobile pair for every route and meaningful state, plus readable section/state evidence. Reuse a Phase 2 pair if it is still current after all relevant code changes; do not reopen, recapture, or duplicate it merely to label it “final.” Do not overwrite generic final filenames. Inspect the final target diff and current build/check result; rerun only invalidated checks. Independently pass layout, style, route, state, section, interaction, desktop, mobile, responsive, scroll/sidebar, drawer, and theme fidelity.

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

Required: overall at least `49/50`; desktop and mobile each at least `48/50`. Every independent and critical fidelity category passes. Every reachable route/state/section has a current opened pair, every source-defect-unreachable state has declaration-to-target proof, every interaction family has real-input proof, final desktop/mobile evidence is current and opened, applicable sidebar/drawer/theme safety passes, and no material gap remains. A harmless isolated pixel/line-wrap variance can receive an honest minor deduction without another capture or repair; repeated small deviations from one wrong token/component rule are material. A visual deduction can be re-reviewed only under the skill's bounded scoring-adjustment rule; missing evidence or objective failures cannot be offset.

On pass, record the three scores, critical results, and evidence pointers once; promote to `phase-4-final-audit-completion` and update the checkpoint. On failure, repair within Phase 3 and refresh only invalidated evidence and affected earlier gate claims. Do not call task completion from Phase 3.
