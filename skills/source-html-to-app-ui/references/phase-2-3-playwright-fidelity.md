# Phases 2-3: Paired Playwright Fidelity

This reference is mandatory whenever `CURRENT_PHASE.txt` equals `phase-2-paired-responsive-proof` or `phase-3-fidelity-repair-signoff`.

## Verification Authority

<verification_authority>

Playwright is the primary proof system for these phases. Build, check, code review, DOM inspection, geometry measurements, and screenshots support different claims; none substitutes for another.

The required proof is paired and visual:

```text
same route + same state + same theme + same viewport
source full view  <->  target full view
source section N  <->  target section N
```

Capturing target screenshots alone is a failure. Capturing screenshots without opening them is a failure. Writing "looks correct" without mismatch evidence is a failure. A user can lose an approved project or their job because a visually incorrect implementation was signed off without a real comparison. Treat the image comparison and repair loop as do-or-die work.

</verification_authority>

## Shared Paired-Evidence Contract

<paired_evidence_contract>

### Pair Identity

Every paired row must use identical:

- route or state identity;
- real-input reach steps;
- viewport width and height;
- theme;
- scroll position or interaction state;
- section boundaries and framing intent.

If source and target cannot use the same state or framing, record the exact reason and corrective action. Do not compare unrelated images.

### Required Image Matrix

| Coverage | Source evidence | Target evidence |
| --- | --- | --- |
| Every route/state | full-page or full-view | matching full-page or full-view |
| Every visible section | readable section image | matching readable section image |
| Every visible interaction state | state image when appearance changes | matching state image |
| Desktop | source-represented plus standard desktop | exact match or conservative target adaptation pair |
| Tablet | source-represented or conservative adaptation authority | matching target evidence |
| Mobile | source-represented plus target-safe mobile | matching target evidence |
| Short-height desktop | pre-scroll and post-scroll when sidebar exists | matching target plus geometry proof |
| Themes | every source theme | matching target theme and required derived target theme |

Open every image after capture. Record the visible findings. A filename is inventory, not proof.

### Section Comparison Dimensions

For every section, compare:

- presence and order;
- width, height, alignment, grid, and spacing;
- typography family, size, weight, line-height, and hierarchy;
- colors, borders, radii, shadows, backgrounds, and separators;
- copy, labels, icons, logos, and imagery;
- control type, dimensions, state, and affordance;
- overflow, clipping, wrapping, and scroll behavior;
- responsive transformation;
- theme behavior.

Record specific mismatches such as "target heading is one hierarchy level too large" or "target sidebar ends 280px above viewport bottom." Do not write only "minor styling differences."

</paired_evidence_contract>

## Phase 2: Paired Responsive Proof

<phase_2_protocol>

### Phase 2 Purpose

Phase 2 proves the implementation is structurally legitimate, passes target-required repo checks, and behaves safely across matching source-target viewport pairs. It is the first real comparison phase.

Phase 2 is not a shallow build/check phase. It must run Playwright, produce paired images, open those images, record mismatches, and repair structural or responsive failures before promotion.

### Integrity Review

Inspect code and diff for:

- authored target app with no runtime source dependency;
- no forbidden wrapper, raw injection, or embedded source;
- no backend/API/database/persistence/auth/business changes;
- real route modules and target-native components;
- complete contract ownership;
- correct local state and interaction wiring;
- target-native tokens/primitives;
- structural shell/sidebar/content overflow ownership;
- no warning suppression or configuration edits made only to hide workflow files or failures.

Route missing implementation back to Phase 1. Do not patch around a Phase 1 contract failure inside Phase 2 without correcting the marker and artifacts.

### Repo Checkpoint

Run only commands required by recorded target instructions, in their required order. Capture complete enough output to identify all failures and warnings.

When a check or build fails:

1. inspect complete output;
2. identify every visible issue group;
3. fix all locally related groups;
4. record what changed;
5. rerun only when evidence can change.

Do not truncate output so aggressively that warnings disappear. A green build cannot raise visual evidence scores.

### Managed Paired Browser Run

Use separate helper-owned source and target runs:

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

Use actual commands discovered from the source and target. Do not copy placeholders literally.

### Responsive Safety Matrix

At minimum prove:

| Viewport | Required checks |
| --- | --- |
| Desktop | hierarchy, spacing, shell ownership, no horizontal overflow |
| Tablet | wrapping/reflow, usable controls, no clipping or overlap |
| Mobile | intended stacking/drawer behavior, readable text, no canvas overflow |
| Short-height desktop | content-only scroll, full-height sidebar, no blank lower region |

For every viewport, record geometry and image evidence for overlap, clipping, cutoff, horizontal overflow, document/content scroll ownership, and control usability.

### Deterministic Sidebar Proof

When a sidebar exists, Phase 2 must create enough content overflow or use an existing long route at a short desktop height. Then use real wheel or scroll input and record:

| Proof | Pass condition |
| --- | --- |
| Document ownership | document `scrollTop` stays unchanged during content scrolling |
| Content ownership | content `scrollTop` increases when overflow exists |
| Sidebar stability | sidebar top/bottom bounds remain stable |
| Viewport coverage | shell and sidebar cover the viewport height |
| Visual continuity | post-scroll image contains no blank lower-sidebar region |

Do not accept sticky positioning alone as proof. Do not accept a normal-height screenshot that never forces overflow.

### Mobile Drawer Proof

When a mobile drawer exists, prove through real input:

- open and close controls;
- overlay visibility and background interception;
- full-height drawer geometry;
- body/document scroll lock while open;
- restored scroll behavior after close;
- open and closed screenshots.

### Phase 2 Gate

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

Every critical item must pass:

- integrity and UI-only scope;
- target-required checks/build without unresolved errors or warnings;
- every contracted route/state has matching source-target full-view evidence;
- every visible section has matching readable source-target images;
- every cited image was opened and compared;
- desktop, tablet, mobile, and relevant short-height rows pass;
- sidebar proof passes when a sidebar exists;
- mobile drawer proof passes when a drawer exists;
- themes and important real-input states pass;
- scripts have no fixed waits and lifecycle contract passes;
- Phase 0's fresh gap row is replaced by real comparison rows or explicit comparison evidence;
- no ordinary responsive/integrity gap remains open.

Before promotion, reopen the artifact and all gate-critical images, confirm score and critical rows, write the promotion lock, read it back, update progress, set the marker to `phase-3-fidelity-repair-signoff`, and reread this reference plus the lifecycle reference.

</phase_2_protocol>

## Phase 3: Fidelity Repair And Signoff

<phase_3_protocol>

### Phase 3 Purpose

Phase 3 turns Phase 2's valid paired corpus into one-to-one fidelity. It owns detailed comparison, repair, selective recapture, adversarial inspection, and final visual scoring.

Do not recapture unchanged valid evidence merely to create activity. After a code fix, recapture every target image invalidated by that fix. Recapture source evidence only when missing, stale, unreadable, or incorrectly paired.

### Mandatory Fidelity Loop

For each route/state and viewport:

1. Open the source full-view image.
2. Open the matching target full-view image.
3. Compare overall shell, hierarchy, route content, and visual rhythm.
4. Open each source section image.
5. Open each matching target section image.
6. Record every visible mismatch in the Phase 3 artifact and `open-gaps.md`.
7. Fix the highest-severity mismatch group.
8. Read back the changed code and inspect the diff.
9. Recapture invalidated target full-view and section images through managed Playwright.
10. Open the new images and re-evaluate the rows.
11. Repeat until ordinary mismatch, responsive, interaction, and theme gaps are closed.

Do not mark the artifact `Pass` while the last action was capture. Comparison must happen after capture.

### Non-Compensating Fidelity Gates

Independently pass:

- layout fidelity;
- style fidelity;
- route fidelity;
- state fidelity;
- section fidelity;
- interaction fidelity;
- desktop fidelity;
- mobile fidelity;
- responsive safety;
- scroll/sidebar safety;
- drawer safety;
- theme safety.

An excellent style score cannot compensate for a missing section. A high desktop score cannot compensate for broken mobile. A working interaction cannot compensate for the wrong visual state.

### Adversarial Mismatch Search

Actively investigate at least five serious suspected mismatches. Choose high-risk issues from different categories, such as:

- shell/sidebar height and scroll ownership;
- section omission or order;
- typography hierarchy;
- spacing/grid alignment;
- theme mismatch;
- mobile overflow or drawer behavior;
- wrong control state;
- route/state content mismatch.

For each, cite source and target evidence, decide whether it is blocking, and either fix it or defend a genuinely non-blocking difference with a source/adaptation contract.

### Real-Input Functional Proof

Exercise every visible interaction family on desktop and mobile when present. Record trigger, expected state, actual state, screenshots or DOM/geometry proof, and result. Programmatic state mutation does not count when a real control exists.

### Final Images

Save current final images:

- `task-workflow/verification/final-desktop.png`
- `task-workflow/verification/final-mobile.png`

Open both after the final capture and record what each proves.

### Phase 3 Scoring

Apply this `50`-point rubric overall and independently to desktop and mobile:

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
- every non-compensating gate `Pass`;
- every paired route/state/section row `Pass`;
- at least five adversarial checks complete;
- every interaction family proved with real input;
- final desktop and mobile images current and opened;
- no ordinary open gap.

### Promotion Lock

Before promotion:

1. Reopen Phase 0-3 artifacts and identify any invalidated earlier evidence.
2. Reopen all final score-critical source-target image pairs.
3. Reopen final desktop and mobile images.
4. Reconcile `open-gaps.md`.
5. Confirm overall, desktop, and mobile thresholds.
6. Confirm every independent and critical gate passes.
7. Confirm no fixed wait, lifecycle violation, unsupported `N/A`, or uninspected screenshot remains.
8. Write the promotion lock and `Decision: Pass`.
9. Read the artifact back.
10. Update progress.
11. Set `CURRENT_PHASE.txt` to `phase-4-final-audit-completion`.
12. Read `references/phase-4-final-audit-completion.md` before final audit work.

If any check fails, remain in or return to the earliest failing phase. Do not call task completion.

</phase_3_protocol>
