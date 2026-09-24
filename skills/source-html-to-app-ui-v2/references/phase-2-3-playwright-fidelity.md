# Phases 2–3: Paired Playwright Fidelity

Read this reference when `CURRENT_PHASE.txt` is `phase-2-paired-responsive-proof` or `phase-3-fidelity-repair-signoff`. Read `references/playwright-lifecycle.md` for all browser/server work.

## Shared evidence contract

Build/check, code review, real-input interaction checks, measurements, and opened screenshots prove different claims; none substitutes for another. Capture source and target in separate lifecycle-owned runs. For each reachable source state, pair the same route/state, theme, browser viewport, scroll/section framing, and real-input reach steps. A source-unavailable state uses the recorded error or unavailable UI and its HTML/CSS/design declarations instead of a fabricated source image; its target state still needs complete screenshots and real-input proof. Do not reopen source JavaScript diagnostics during target comparison.

Cover every page-like surface, layout-distinct state, readable section, represented theme, desktop/mobile size, relevant tablet and short-height size, and important interaction state. A readable image may cover multiple adjacent sections. Local state changes need the changed area plus context, not duplicate full-page images of unchanged content. Let actual source structure determine evidence volume; no fixed screenshot cap applies.

Give each image a unique ID/path; never overwrite a prior revision. Keep objective identity, viewport, actual dimensions, capture time, lifecycle run, freshness, and invalidation status in packet output or one machine-readable manifest. Keep one concise comparison index keyed by accepted/current pair ID with source/target paths, separate opened findings, concrete visual comparison, and mismatch or pass decision. Do not duplicate the same pair in full-view, section, packet-review, and final matrices. Failed/invalidated images remain in runtime evidence with reasons, but are not counted as the passing corpus.

Open every accepted/current source and target image separately at readable scale, one very tall pair or up to four related smaller images per review. Verify pair identity, dimensions/framing, lifecycle ownership, and target freshness. Compare content/order, geometry, spacing, typography, colors, borders/radii/shadows, backgrounds, controls/assets, clipping/overlap, state, scroll, theme, and responsive behavior. Record one concrete finding per image and a pair conclusion. A manifest, contact sheet, or representative sample alone is not visual proof. Capture scripts collect evidence; the Agent judges scores and gaps. Do not write scoring, packet-permit, or promotion scripts.

After a meaningful capture group, update only its accepted pair findings and actual unresolved gaps. Update the compact checkpoint only when the next action or phase changes. Repair the affected script/code and recapture only evidence invalidated by that change, then reopen the replacement images. Do not copy runtime commands or metadata into Markdown tables. If an image is visually valid but a recoverable metadata field is missing, reconstruct it from the actual image/runtime record; recapture only if image validity or provenance cannot be established.

## Phase 2: Responsive proof

Enter Phase 2 only when Phases 0–1 pass at `48/50` or higher and target code is current. Inspect the complete target diff for real routes/components/local state, UI-only scope, source-backed assets, structural shell, and unchanged lifecycle helper. Use the task's exact target checks/build; reuse Phase 1 output only if no later code changed, otherwise rerun and retain complete output. A green build cannot compensate for missing visual evidence.

Run focused, lifecycle-owned source and target capture scripts sequentially; do not keep both servers alive manually. Use real controls, not evaluated DOM mutation, to reach states. For every accepted pair, review images and record findings in the one comparison index. Record mismatches with owner and next repair in `open-gaps.md`; implementation defects return to Phase 1, evidence-script defects remain in Phase 2.

Prove desktop, tablet when relevant, mobile, and short-height overflow. Inspect overlap, clipping/cutoff, horizontal canvas overflow, control usability, theme and visible interaction states. When a sidebar exists, use real scrolling with pre/post screenshots and current target metrics. Compute and record once:

- target document scroll delta `= 0`;
- target named content-scroller delta `> 0`;
- absolute sidebar top and bottom deltas `<= 1px`;
- sidebar height and bottom within `1px` of viewport height;
- no blank lower-sidebar region in the opened post-scroll image.

Source metrics describe the reference, not a substitute for target predicates. If a target predicate fails, return to Phase 1 for shell repair and recapture affected target proof. When a mobile drawer exists, prove real-input open/close, full-height geometry, overlay interception, body/document scroll lock and restoration, with opened images and measurements.

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

On pass, record `Decision: Pass` with evidence pointers, promote the marker to `phase-3-fidelity-repair-signoff`, and update the checkpoint. On failure, repair the owning phase and refresh only invalidated evidence.

## Phase 3: Fidelity repair and signoff

Enter only when Phases 0–2 pass and the Phase 2 pair corpus and checks remain current. Phase 3 compares and repairs the actual visual and behavioral differences. Review each current pair and section at readable scale, name concrete mismatches, prioritize affected groups, inspect the owning code/diff, repair, and recapture only invalidated target images under new paths. Reopen the new target against its matching source before closing a mismatch; a capture alone does not establish a pass. Keep only unresolved gaps in `open-gaps.md`, with resolution evidence in the existing comparison index/runtime history.

Actively challenge shell/sidebar height, section presence/order, typography, spacing/grid, theme, mobile overflow/drawer, controls, route/state content, and other actual risks. Record genuine suspected mismatches and their fix or source-backed defense; do not invent a fixed number to fill a table. Recompute current sidebar predicates from target metrics when applicable; a prior `Pass` label is not proof. Exercise every visible interaction family through real desktop/mobile controls when present and record expected/actual state with current evidence.

Before signoff, ensure a current, opened desktop and mobile pair for every route and meaningful state, plus readable section/state evidence. Reuse a Phase 2 pair if it is still current after all relevant code changes; do not recapture or duplicate it merely to label it “final.” Do not overwrite generic final filenames. Inspect the final target diff and current build/check result; rerun invalidated checks. Independently pass layout, style, route, state, section, interaction, desktop, mobile, responsive, scroll/sidebar, drawer, and theme fidelity.

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

Required: overall at least `49/50`; desktop and mobile each at least `48/50`. Every independent and critical fidelity category passes. Every reachable route/state/section has a current opened pair, every source-defect-unreachable state has declaration-to-target proof, every interaction family has real-input proof, final desktop/mobile evidence is current and opened, applicable sidebar/drawer/theme safety passes, and no ordinary gap remains. A visual deduction can be re-reviewed only under the skill's bounded scoring-adjustment rule; missing evidence or objective failures cannot be offset.

On pass, record the three scores, critical results, and evidence pointers once; promote to `phase-4-final-audit-completion` and update the checkpoint. On failure, return to the earliest owning phase, repair, and repass only invalidated evidence. Do not call task completion from Phase 3.
