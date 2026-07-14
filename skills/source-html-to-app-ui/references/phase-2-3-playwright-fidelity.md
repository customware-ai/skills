# Phases 2-3: Paired Playwright Fidelity

This reference is mandatory whenever `CURRENT_PHASE.txt` equals `phase-2-paired-responsive-proof` or `phase-3-fidelity-repair-signoff`.

## Shared Verification Authority

<shared_verification_authority>

Playwright is the primary proof system for Phases 2 and 3. Build, check, code review, DOM inspection, geometry measurements, and screenshots support different claims; none substitutes for another.

The required proof is paired and visual:

```text
same route + same state + same theme + same viewport + same scroll/section framing
source evidence  <->  target evidence
```

The Agent plans, reviews, and scores these phases directly from opened source-target images, browser measurements, real-input results, code/diff evidence, lifecycle logs, and phase artifacts. Do not create or use scripts for packet review, phase scoring, closeout, or promotion. Custom Playwright scripts collect evidence; they never decide whether a phase passes.

Base visual signoff on opened source-target pairs and concrete findings. Target-only screenshots or an unsupported "looks correct" claim leave the gate incomplete and send the work back through the comparison-and-repair loop.

</shared_verification_authority>

## Shared Paired-Evidence Contract

<paired_evidence_contract>

Every pair must use identical:

- route/state identity and real-input reach steps;
- viewport width and height;
- theme;
- scroll position or interaction state;
- section boundary and framing intent.

Required coverage:

| Coverage | Source evidence | Target evidence |
| --- | --- | --- |
| Every route/state | full-page or full-view | matching full-page or full-view |
| Every visible section | readable section image | matching readable section image |
| Every visible interaction state | state image when appearance changes | matching state image |
| Desktop | represented and standard desktop | matching target pair |
| Tablet | represented or conservative adaptation authority | matching target pair |
| Mobile | represented and target-safe mobile | matching target pair |
| Short-height desktop | pre/post-scroll when sidebar exists | matching images plus geometry |
| Themes | every source theme | matching and required derived target theme |

Open every gate-critical image after capture. A filename or manifest row is inventory, not proof.

For every section compare presence/order, geometry, spacing, typography, colors, borders, radii, shadows, backgrounds, copy, labels, controls, icons, logos, imagery, state, overflow, responsive transformation, and theme behavior. Record specific mismatches, not "minor differences."

</paired_evidence_contract>

## Evidence Identity, Freshness, And Inspection Contract

<evidence_integrity_contract>

Every source-target comparison row must have a stable evidence ID and record:

| Required field | Passing evidence |
| --- | --- |
| Identity | route, state, theme, viewport width/height, scroll/section framing, side, and revision |
| Unique paths | distinct source and target paths; neither path is used by another identity or revision |
| Dimensions | matching browser viewport plus actual source/target image dimensions; explain and repair material full-page or section-size differences |
| Capture ownership | exact lifecycle run and capture time for each side |
| Freshness | target capture occurred after the latest code change affecting that row |
| Open proof | separate source-opened and target-opened entries after the latest capture |
| Visual findings | concrete findings for every required comparison category |
| Decision | `Pass`, or a mismatch ID with owner and next repair |

File existence, a screenshot count, a manifest path, or a blanket statement that all images were opened does not satisfy this contract. One path may represent exactly one image identity. An overwrite or conflicting identity mapping invalidates every affected row and requires new uniquely named captures. An unchanged source image may be cited by a later target-repair comparison only when its identity/framing remains exact and that reuse is explicit in the ledger.

Use names that encode side, route/state, theme, viewport, section/full-view identity, and revision. Before opening a pair, verify both files exist, paths are distinct, browser viewports/framing intent match, actual image dimensions are recorded, and target freshness is valid. Continue the comparison when full-page heights differ; record that difference as layout evidence.

### Bounded Visual Review

Review the screenshot corpus in small, readable packets. For tall full-page images, use one source-target pair at a time; for smaller section images, a compact related batch is acceptable:

1. verify identity, viewport/framing, actual dimensions, lifecycle ownership, and freshness;
2. open the source image;
3. open the target image;
4. compare content presence/order, geometry/layout, spacing, typography, color, borders/radii/shadows, backgrounds, controls/assets, clipping/overlap, state, scroll, and responsive behavior;
5. write the findings, open proof, decision, gaps, and next action to the phase artifact before leaving the packet;
6. update `progress.md` and `open-gaps.md` after the meaningful comparison packet, then read back the gate-relevant updates.

For very tall pages, use readable same-framed section pairs plus a full-page overview. Packet discipline protects useful visual attention and resumability without reducing required routes, states, sections, themes, viewports, or screenshots.

Blank or black blocks, omitted branding/content, clipped actions, wrong colors, text collisions, unreadable text, incorrect section order, or visibly wrong shell/sidebar/drawer geometry are automatic mismatches. A row containing one of these cannot receive visual-fidelity points until repaired, recaptured, and reopened.

</evidence_integrity_contract>

## Phase 2: Paired Responsive Proof

<phase_2_protocol>

### Phase 2 Authority

Phase 2 proves the implementation is structurally legitimate, passes required repo checks, and behaves safely across matching source-target viewport/state pairs. It is not a shallow build/check phase.

Missing implementation belongs to Phase 1. If Phase 2 finds a Phase 1 contract failure, move the marker and artifacts back to Phase 1, repair and repass Phase 1, then re-enter Phase 2. Do not hide implementation repair inside a later gate.

### Entry Conditions

Before Phase 2 work:

- `CURRENT_PHASE.txt` says `phase-2-paired-responsive-proof`;
- Phases 0 and 1 say `Decision: Pass` and score at least `48/50`;
- the source corpus, reproduction contract, implementation mapping, and target diff are current;
- the Agent has reread `SKILL.md`, this reference, the lifecycle reference, Phase 2's artifact, `progress.md`, and `open-gaps.md`;
- the first verification packet is recorded before capture or checks.

If any condition fails, repair the earliest owning phase before continuing.

### Model-Owned Verification Packet Loop

Use small packets grouped by one route/state family and viewport/theme set. Before each packet, record:

- contract IDs and opened source evidence;
- exact source and target reach steps;
- matching viewport, theme, state, scroll, and section framing;
- custom source/target Playwright scripts and lifecycle commands;
- checks, images, and measurements the packet must produce;
- the one expected review decision after evidence capture.

Then:

1. inspect relevant code and focused diff;
2. run only required checks owned by the packet or Phase 2 checkpoint;
3. capture matching source and target evidence through separate lifecycle-owned runs using unique revisioned paths;
4. verify every pair's path identity, matching browser viewport/framing, recorded actual dimensions, lifecycle ownership, and freshness;
5. review each pair through the bounded visual-review sequence above;
6. inspect every measurement/result and record concrete comparison findings;
7. record mismatches in the Phase 2 artifact and `open-gaps.md`;
8. update and read back the Phase 2 artifact, `progress.md`, and `open-gaps.md`;
9. mark every packet-review row `Pass` or `Fail`;
10. route implementation defects to Phase 1 and verification-script/evidence defects to Phase 2;
11. repair, recapture invalidated evidence under new revision paths, and repeat the same packet review;
12. begin the next packet only when every row passes.

### Verification Packet Review Checklist

| Required review | Pass condition |
| --- | --- |
| Pair identity | route/state/theme/viewport/scroll/section framing matches |
| Coverage | every contracted full view, section, and visible state is included |
| Lifecycle ownership | separate unchanged-helper source/target runs passed |
| Visual inspection | every cited image was opened after its latest capture |
| Evidence integrity | identity-safe paths, matching browser viewport/framing, reviewed dimensions, capture times, freshness, and separate open proof pass |
| Objective fidelity | no blank/black block, omission, clipping, collision, unreadable content, or gross style/layout mismatch remains |
| Geometry/safety | overlap, clipping, overflow, scroll ownership, and usability were measured |
| Real input | visible interactions use actual controls on desktop/mobile |
| Code integrity | target-native UI and UI-only scope remain intact |
| Freshness | evidence is newer than every invalidating change |
| Artifact synchronization | Phase 2, progress, gaps, and evidence rows record the same latest packet and next action |
| Gap ledger | each mismatch has the correct owner and next repair |

This checklist is an Agent review recorded in the Phase 2 artifact, never a script result.

### Integrity And Repo Checkpoint

Inspect code and the complete target diff for authored target-native routes/components/local state, full contract ownership, correct shell/sidebar/content overflow structure, no source runtime dependency, no forbidden wrapper/raw injection, no backend/API/database/auth/business changes, and no warning/config suppression.

Run task-required checks and relevant package scripts in their required order. Capture complete output. On failure, inspect all issue groups, repair locally owned failures, and rerun only after evidence can change. A green build cannot raise visual scores.

### Managed Paired Browser Runs

Use separate helper-owned source and target commands:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<source server command>" \
  --ready-url "<source ready URL>" \
  --runtime-dir task-workflow/runtime/source \
  --run "node task-workflow/source-playwright/<script>.mjs" \
  --ready-timeout-ms 15000 \
  --command-timeout-ms 20000
```

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<target server command>" \
  --ready-url "<target ready URL>" \
  --runtime-dir task-workflow/runtime/target \
  --run "node task-workflow/target-playwright/<script>.mjs" \
  --ready-timeout-ms 15000 \
  --command-timeout-ms 20000
```

Use discovered commands; never copy placeholders literally.

Run these sequentially. The source helper owns and stops the source server; the target helper owns and stops the target server. Compare saved images afterward. Do not manually keep both servers alive, use `lsof` to hunt processes, or replace this sequence with a dual-background-server command. When interaction parity needs equivalent live proof, execute the same focused interaction manifest in two separate helper-owned runs and compare their recorded results.

### Responsive, Sidebar, And Drawer Proof

At minimum prove desktop, tablet, mobile, and relevant short-height desktop. Record overlap, clipping/cutoff, horizontal canvas overflow, document/content scroll ownership, control usability, and paired images for each.

When a sidebar exists, force overflow at a short desktop height and prove:

| Proof | Pass condition |
| --- | --- |
| Document ownership | document scroll position remains unchanged |
| Content ownership | content scroll position increases |
| Sidebar stability | sidebar top/bottom bounds remain stable |
| Viewport coverage | shell and sidebar cover viewport height |
| Visual continuity | post-scroll target has no blank lower-sidebar region |

Sticky positioning or a normal-height screenshot alone is not proof.

Record the raw measurements from each side in separate columns, then calculate the target predicates explicitly:

| Target calculation | Pass predicate |
| --- | --- |
| Document delta | `targetDocAfter - targetDocBefore = 0` |
| Content delta | `targetContentAfter - targetContentBefore > 0` |
| Sidebar top delta | absolute delta `<= 1px` |
| Sidebar bottom delta | absolute delta `<= 1px` |
| Viewport coverage | sidebar height and bottom equal viewport height within `1px` |

Read target values from the target manifest and source values from the source manifest. Copy the numbers verbatim before scoring. If a field is missing, an image contradicts the numbers, or any target predicate fails, mark the sidebar proof `Fail`, add the mismatch to `open-gaps.md`, return to Phase 1 for the shell repair, and recapture both target screenshots and measurements. Source behavior is comparison context and cannot satisfy a target predicate.

When a mobile drawer exists, prove real-input open/close, full-height geometry, overlay/background interception, body/document lock, restored scrolling, and opened open/closed screenshots.

### Phase 2 Model Gate

| Category | Points |
| --- | ---: |
| Authored-code and UI-only integrity | 8 |
| Required target checks/build | 6 |
| Paired route/state/full-view evidence | 10 |
| Paired section evidence | 10 |
| Responsive, scroll, sidebar, and drawer proof | 10 |
| Theme and interaction-state proof | 6 |
| **Total** | **50** |

Required score: at least `48/50`.

Every critical item must independently pass:

- every verification packet passed the model-owned review checklist;
- integrity, UI-only scope, and required checks/build pass;
- every contracted route/state has matching opened full-view evidence;
- every visible section has matching opened readable section evidence;
- every evidence row has distinct source/target paths mapped to the correct image identities, matching browser viewport/framing, reviewed image-dimension differences, current capture times, and separate source/target open findings;
- no objective blank/black block, omission, clipping, collision, unreadable content, or gross layout/style mismatch remains;
- desktop, tablet, mobile, and relevant short-height rows pass;
- sidebar and drawer proof passes when applicable;
- sidebar proof contains verbatim target before/after metrics, explicit deltas, and all target predicates pass;
- themes and important real-input states pass;
- lifecycle and fixed-wait audits pass;
- evidence is current after the last invalidating change;
- comparison gaps are concrete and no ordinary Phase 2 gap remains open.

The Agent calculates the score from artifact evidence. Do not use a checker or promotion script. If any critical item fails or the score is below `48/50`, keep the marker on Phase 2, repair the earliest failure, refresh invalidated evidence, and rescore.

### Promotion Lock

Before promotion:

1. reopen Phases 0-2, `progress.md`, `open-gaps.md`, and every Phase 2 evidence-ledger row;
2. reopen every gate-critical pair through bounded pair review, not one bulk image load;
3. verify packet reviews, score arithmetic, critical rows, path identity, viewport/framing, reviewed dimensions, freshness, and open findings;
4. reconcile evidence invalidation and `open-gaps.md`;
5. update and reopen `progress.md` and confirm promotion is the sole next action;
6. write and read back `Decision: Pass` and the promotion lock;
7. set `CURRENT_PHASE.txt` to `phase-3-fidelity-repair-signoff`;
8. immediately update `progress.md`, then reread this reference and the lifecycle reference.

If any check fails, remain in Phase 2 and continue the repair loop.

</phase_2_protocol>

## Phase 3: Fidelity Repair And Signoff

<phase_3_protocol>

### Phase 3 Authority

Phase 3 turns Phase 2's valid paired corpus into one-to-one fidelity. It owns detailed comparison, prioritized repair, selective recapture, adversarial inspection, real-input interaction proof, and final visual scoring.

The Agent reviews every fidelity packet directly from opened images and current evidence. Do not create scripts that score similarity, close a packet, or promote the phase. Browser scripts capture and measure; the Agent compares and decides.

### Entry Conditions

Before Phase 3 work:

- `CURRENT_PHASE.txt` says `phase-3-fidelity-repair-signoff`;
- Phases 0-2 remain passing at their thresholds;
- Phase 2's paired corpus and target checks are current;
- the Agent has reread `SKILL.md`, this reference, the lifecycle reference, Phase 3's artifact, `progress.md`, and `open-gaps.md`;
- the first fidelity-repair packet is recorded before a fix or recapture.

If any condition fails, return to the earliest owning phase.

### Model-Owned Fidelity Packet Loop

Use one packet per route/state/viewport/theme mismatch group:

1. record the pair identity and exact source/target evidence;
2. verify the pair's identity-safe paths, matching browser viewport/framing, recorded actual dimensions, lifecycle ownership, and freshness;
3. review the full view through the bounded visual-review sequence;
4. review every matching source-target section pair in small readable batches and record findings within the packet;
5. record specific mismatches and severity in Phase 3 and `open-gaps.md`;
6. choose the highest-severity related mismatch group;
7. record intended fix owners and every evidence ID the fix will invalidate;
8. implement the fix, reopen changed code, and inspect the focused diff;
9. mark invalidated evidence rows stale before recapture;
10. recapture every invalidated target image through managed Playwright under new revisioned paths;
11. verify viewport/framing, dimensions, and freshness, then reopen each new target against its matching source in readable packets;
12. update and read back Phase 3, `progress.md`, and `open-gaps.md`;
13. complete every packet-review row;
14. if any row fails, repair and repeat the same packet;
15. begin another packet only when the current one passes.

Do not mark a packet `Pass` while the last action was capture. Comparison must happen after capture.

### Fidelity Packet Review Checklist

| Required review | Pass condition |
| --- | --- |
| Pair completeness | full-view and every section pair are present and opened |
| Evidence integrity | paths are identity-safe, browser viewport/framing matches, dimension differences were reviewed, target is fresh, and source/target open proof is separate |
| Mismatch specificity | findings name concrete layout/style/content/state differences |
| Fix ownership | code changes address only the declared mismatch group |
| Readback/diff | every changed owner and focused diff were inspected |
| Selective recapture | every invalidated target image was recaptured; valid evidence was not churned |
| Post-fix comparison | new target images were opened against matching source images |
| Interaction proof | relevant visible states pass through real controls |
| Responsive/theme safety | the fix did not break another viewport/theme/scroll state |
| Artifact synchronization | Phase 3, progress, gaps, and evidence rows record the same latest repair and next action |
| Gap closure | resolved rows contain current source and target proof |

This checklist is an Agent review recorded in the Phase 3 artifact, never a script result.

### Independent Fidelity Gates

Independently pass layout, style, route, state, section, interaction, desktop, mobile, responsive, scroll/sidebar, drawer, and theme fidelity. One category cannot compensate for another.

### Adversarial Mismatch Search

Actively investigate at least five serious suspected mismatches from different categories: shell/sidebar height, section omission/order, typography, spacing/grid, theme, mobile overflow/drawer, control state, or route/state content. Cite and open source/target evidence for each; fix it or provide a source-backed non-blocking defense.

When a sidebar exists, one adversarial row must recompute the target document delta, content delta, sidebar top delta, sidebar bottom delta, and viewport coverage from the current target manifest. A prior `Pass` label is not evidence for this row.

### Real-Input And Final Image Proof

Exercise every visible interaction family on desktop and mobile when present. Record trigger, expected state, actual state, screenshots/geometry, and result. Programmatic state mutation does not count when a real control exists.

Save and open a current, uniquely named final desktop and mobile pair for every route and meaningful state. Use revisioned paths recorded in the Phase 3 evidence ledger; do not overwrite a generic `final-desktop.png` or `final-mobile.png` across routes, viewports, states, or repairs.

### Phase 3 Model Gate

Apply this rubric overall and independently to desktop and mobile:

| Category | Points |
| --- | ---: |
| Route/state/section coverage | 10 |
| Layout and spacing fidelity | 10 |
| Typography, color, control, and asset fidelity | 10 |
| Interaction and visible state fidelity | 8 |
| Responsive, scroll, drawer, and theme safety | 8 |
| Evidence, lifecycle, and artifact integrity | 4 |
| **Total** | **50** |

Required:

- overall at least `49/50`;
- desktop at least `48/50`;
- mobile at least `48/50`;
- every fidelity packet passed its model-owned review;
- every independent and critical gate passes;
- every route/state/section pair passes;
- at least five adversarial checks complete;
- every interaction family has real-input proof;
- final desktop/mobile images are current and opened;
- every final pair has identity-safe paths, matching browser viewport/framing, reviewed image dimensions, current capture times, and separate source/target open findings;
- no ordinary open gap remains.

The Agent calculates all three scores from evidence. Do not use a checker or promotion script. If any threshold, packet review, independent gate, or critical item fails, keep the marker on Phase 3 or return to the earliest owning phase, repair, refresh evidence, and rescore.

### Promotion Lock

Before promotion:

1. reopen Phases 0-3 and identify invalidated earlier evidence;
2. reopen all final score-critical pairs and final desktop/mobile evidence through bounded pair review;
3. verify packet reviews, overall/desktop/mobile arithmetic, independent gates, and critical rows;
4. reconcile `open-gaps.md`;
5. update and reopen `progress.md` and `open-gaps.md` and confirm promotion is the sole next action;
6. write and read back `Decision: Pass` and the promotion lock;
7. set `CURRENT_PHASE.txt` to `phase-4-final-audit-completion`;
8. immediately update `progress.md`, then read the Phase 4 reference before final audit work.

If any check fails, remain in or return to the earliest failing phase. Do not call task completion.

</phase_3_protocol>
