---
name: source-html-to-app-ui
description: Rebuild a provided source HTML application as a real, authored, high-fidelity target-repository UI. Use for approved design implementation tasks that require interactive source discovery, design-system translation, real routes/components/local UI interactions, responsive and theme adaptation, and rigorous paired source-target Playwright proof.
---

# Source HTML To App UI

## Quality Objective And Operating Contract

Use this canonical five-phase workflow to reproduce the approved source HTML as a high-quality target UI.

Judge success primarily from the finished experience:

- every source page, meaningful state, section, and interaction is represented;
- the target UI closely preserves the source layout, styling, content, hierarchy, and behavior;
- responsive layouts remain usable without overlap, clipping, cutoff, or incorrect overflow;
- a desktop sidebar stays full-height while the intended content pane scrolls, and mobile uses the source-backed drawer pattern;
- paired Playwright images show the source and implementation at matching routes, states, themes, and viewports;
- the final audit finds any missing quality work, routes it back to the owning phase, and calls task completion after the repaired gates pass.

Treat each phase gate as an AI self-review. Inspect the work, award points from concrete evidence, identify weak areas, repair them, and rescore. A failed gate means continue the phase loop; it is not a stopping report. Preserve phase order and the important proof requirements while allowing sensible task-specific variation in packet size, artifact wording, and implementation technique.

## Scope Contract

Implement UI only:

- real routes and route modules;
- layouts, components, styling, design tokens, themes, and assets;
- local UI state and source-backed interactions;
- responsive behavior and safe adaptation where the source is incomplete.

Keep implementation UI-only: routes, components, styling, assets, responsive behavior, and local interaction state. Use realistic static data and local UI state where needed, leaving backend, API, persistence, database, authentication, server behavior, and business logic unchanged.

Author the target as a real application. Use the source HTML for discovery and comparison rather than injecting, embedding, iframing, importing, parsing, or wrapping it at runtime.

## Core Execution Invariant

<core_execution_invariant>

The Agent owns every phase evaluation. Use evidence-backed model reviews—not executable validator scripts—to score gates. Quality gates are internal control points that identify and drive the next repair until the UI and evidence are good enough to promote.

Do not create or use phase-check, phase-promotion, packet-closeout, receipt, forced-read, hash-acknowledgement, or scoring scripts. The only supplied runtime script in this skill is `playwright-lifecycle.mjs`, which owns browser/server lifecycle. Custom Playwright interaction and capture scripts are allowed and required, but run them through the lifecycle helper.

A phase is complete only when its phase artifact:

1. contains concrete, inspectable evidence for every required row;
2. meets the numeric threshold through the Agent's honest row-by-row calculation;
3. passes every non-compensating critical item;
4. contains no required placeholder or unresolved ordinary gap;
5. records a promotion lock after the Agent reopens and audits the artifact.

An overall score cannot compensate for a failed critical item. A screenshot path is not visual proof until the Agent opens and compares the image. A target screenshot is not parity proof without its matching source screenshot. Build/check results are not visual evidence.

If later work invalidates earlier evidence, return to the earliest affected phase, mark it failed, repair it, refresh the evidence, rescore it, and loop forward again.

Promote from current phase artifacts, ledgers, opened evidence, and readback proof rather than from a summary claim alone.

</core_execution_invariant>

## Mandatory Process Shape

<mandatory_process_shape>

| Phase | Runtime marker | Owns | Numeric gate | Critical outcome |
| --- | --- | --- | ---: | --- |
| 0 | `phase-0-source-contract` | fresh workflow artifacts, managed source discovery, complete source inventory, target research, reproduction contract | at least `48/50` | every source page/state/section understood and evidenced |
| 1 | `phase-1-ui-implementation` | ordered authored UI implementation in auditable packets | at least `48/50` | every contracted route/state/section/interaction implemented |
| 2 | `phase-2-paired-responsive-proof` | code integrity, repo checks, paired source-target responsive/theme/scroll Playwright proof | at least `48/50` | paired evidence and responsive safety pass |
| 3 | `phase-3-fidelity-repair-signoff` | section-by-section fidelity repair, adversarial checks, real-input interaction proof | at least `49/50`; desktop and mobile each at least `48/50` | one-to-one visual and behavioral signoff |
| 4 | `phase-4-final-audit-completion` | artifact review, final diff/scope audit, literal-final completion command | exactly `50/50` | every previous gate remains valid and completion is unlocked |

Keep each issue in the phase that owns it. Repair and repass that phase before continuing forward.

Continue through Phase 4, then run the exact task completion command as the literal final tool action. Pause earlier only for a proven external blocker with no local recovery, recorded in the current phase artifact and `task-workflow/open-gaps.md`.

</mandatory_process_shape>

## Looped Gate Contract

Every phase follows this model-owned loop:

1. Set `task-workflow/CURRENT_PHASE.txt` to the phase marker before phase work begins.
2. Re-read this `SKILL.md` and the mapped phase references.
3. Perform the phase work through the phase reference's small model-owned packet loop.
4. Update the phase artifact, `progress.md`, and `open-gaps.md` with concrete evidence.
5. Open every cited screenshot or visual artifact used by the gate.
6. Review every rubric row and calculate the score in the phase artifact.
7. Evaluate every critical item independently; one critical failure makes the phase fail regardless of score.
8. If the gate fails, keep the marker on that phase, record the failure and next repair, perform the repair, refresh invalidated evidence, and repeat from step 2.
9. If the gate passes, write the promotion lock, reopen the artifact, verify the arithmetic and evidence, update `progress.md`, then set the next marker.
10. Immediately load the next phase references and continue without asking the user whether to proceed.

Keep thresholds stable. Award points for concrete evidence and actual quality, not merely because code or screenshots exist.

## Artifact System

<artifact_system>

The first target-repository write must remove any previous `task-workflow/` directory and create a fresh one from this skill's templates and lifecycle helper. Before that write, only identify the target root and read the task, this skill, and its required Phase 0 references.

Create these runtime artifacts:

- `task-workflow/CURRENT_PHASE.txt`
- `task-workflow/progress.md`
- `task-workflow/open-gaps.md`
- byte-identical `task-workflow/spec.json`
- `task-workflow/phase-0-source-contract.md`
- `task-workflow/phase-1-ui-implementation.md`
- `task-workflow/phase-2-paired-responsive-proof.md`
- `task-workflow/phase-3-fidelity-repair-signoff.md`
- `task-workflow/phase-4-final-audit-completion.md`
- `task-workflow/source-playwright/`
- `task-workflow/source/`
- `task-workflow/target-playwright/`
- `task-workflow/verification/`
- byte-identical `task-workflow/scripts/playwright-lifecycle.mjs`
- `task-workflow/runtime/source/`
- `task-workflow/runtime/target/`

Keep every generated task artifact under `task-workflow/`. Source scripts, screenshots, manifests, and notes belong under its source paths. Target scripts and evidence belong under its target/verification paths. This single task-owned boundary keeps the next task's cleanup complete and predictable.

Copy the supplied design JSON byte-for-byte to `task-workflow/spec.json`. Treat all old workflow artifacts, screenshots, scripts, logs, gaps, scores, and decisions as contaminated prior-run state.

Copy the templates under `assets/templates/` and preserve their evidence categories, scorecards, critical gates, and promotion locks. Exact wording may be condensed or adapted when the same evidence remains clear and scorable. Fill them as work proceeds.

`CURRENT_PHASE.txt` is a resume pointer, not proof. Phase artifacts and evidence decide whether a phase passed. `progress.md` is a compact resume ledger, not a substitute for phase evidence.

</artifact_system>

## Artifact Truth And Update Cadence

<artifact_truth>

The artifact trail is the source of truth for the run. `CURRENT_PHASE.txt`, `progress.md`, `open-gaps.md`, the current phase artifact, prior promotion locks, the evidence ledger, and the actual files on disk must agree.

Update the current phase artifact, `progress.md`, and `open-gaps.md` after every:

- phase start;
- meaningful discovery, implementation, verification, comparison, or audit packet;
- newly found mismatch or invalidated evidence group;
- repair and recapture;
- gate result;
- phase promotion.

`progress.md` must always identify the current marker, current artifact and references, earliest failing phase, last completed gate, active packet, current evidence IDs, and sole next local action. It points to detailed phase evidence; it does not duplicate the full corpus.

After every gate-relevant file write, patch, generated artifact, screenshot capture, or ledger update, read it back before relying on it. A successful tool response is not readback. If a write is partial, missing, uncertain, or contradicted by another artifact, stop the packet, repair the write, read it back, and then continue.

Before a phase passes, confirm:

- the marker, phase artifact, `progress.md`, and `open-gaps.md` identify the same current phase and next action;
- the latest meaningful issue, fix, evidence packet, gate, and promotion state is recorded;
- every gap has a current owner/status and no passed phase owns an unresolved blocking gap;
- evidence rows point to current, correctly identified, opened media;
- required gate placeholders are replaced with real evidence or a justified `N/A`.

Before promotion, reopen the current and all earlier phase artifacts, `progress.md`, `open-gaps.md`, and the current evidence rows. Reconcile contradictions first. Do not change the phase marker until the artifact trail is current and the promotion lock has been read back.

</artifact_truth>

## Compaction, Resume, And Reconnect Contract

<resume_contract>

After every compaction, resume, retry, reconnect, or new coding session, re-read in this order before new work:

1. this `SKILL.md`;
2. `task-workflow/progress.md`;
3. `task-workflow/CURRENT_PHASE.txt`;
4. `task-workflow/open-gaps.md`;
5. earlier phase artifacts needed to identify the earliest failing phase;
6. the current or earliest failing phase artifact;
7. the references mapped to that phase;
8. task inputs, source HTML, design JSON, and active implementation files required by that phase.

Resume from the artifacts rather than conversational memory. If the marker, progress ledger, gap ledger, and artifacts disagree, let the artifact gates win and move the marker and ledger back to the earliest failing phase before continuing.

After promotion, read the newly mapped references before work in the new phase.

A provider interruption, compaction, malformed model/tool response, or image-context failure is not an external blocker while local artifacts remain readable. Resume from the ledgers, reduce the next comparison to one bounded evidence pair, and continue. Never reload a large screenshot corpus into one turn to reconstruct context.

</resume_contract>

## Evidence Rules

<evidence_rules>

- Use real user input for routes, drawers, menus, tabs, forms, filters, selections, and other visible interaction families.
- Record exact reach steps for every route and state.
- Capture every source page and meaningful state discovered from the HTML and browser behavior. Let the actual inventory determine the page, state, section, and screenshot count.
- Capture desktop and mobile source evidence for every discovered page and meaningful state.
- Capture paired source and target full-page/full-view images at matching route, state, theme, viewport, and scroll positions.
- Capture paired section images for every visible page section. A full-page image alone is insufficient when section details are unreadable.
- Assign every screenshot a stable image ID. Use a unique path that identifies side, route, state, theme, viewport, section/full-view framing, and revision. Keep one image identity per path and use a new revision path after recapture. An unchanged source image may support later target-repair comparisons when its identity and framing still match.
- Before comparison, verify each source-target pair has distinct paths, the same browser viewport and framing intent, recorded actual image dimensions, and a target capture newer than its latest invalidating implementation change. Treat a full-page height difference as useful layout-mismatch evidence rather than blocking the comparison.
- Open and compare every gate-critical image. Record separate source-opened and target-opened results, concrete visual findings, fixes, recapture paths, and final decisions. A blanket statement such as “all images opened” is not evidence.
- Inspect the corpus in small readable comparison packets and record findings before moving to unrelated work. For tall pages, open one source-target pair at a time or use same-framed section pairs so details remain readable. Packet size may vary with image size; coverage still includes every required route, state, section, viewport, and theme.
- Compare pairs across content presence/order, geometry/layout, spacing, typography, color, borders/radii/shadows, backgrounds, controls, assets, clipping/overlap, interaction state, scroll ownership, and responsive transformation. Record blank or black blocks, missing branding/content, clipped actions, wrong colors, collisions, and unreadable text as repairable mismatches.
- Record browser geometry and scroll measurements where layout behavior matters. Copy source and target measurements into separate side-labeled artifact fields directly from their own manifests, calculate target deltas from the target values, and score the target only from those target values.
- Keep missing, unreadable, stale, mismatched, unpaired, or unopened evidence unresolved until repaired or recaptured.
- Keep `open-gaps.md` current. A gap is not resolved until the owning phase updates it with source and target proof.
- Score desktop and mobile from their own evidence.

When a sidebar exists, visual proof must include a forced-overflow short-height desktop state, real scrolling, stable sidebar geometry, full viewport-height coverage, content-only scrolling, and a post-scroll screenshot proving no blank lower-sidebar region. The target passes this proof only when its own recorded values show: document `scrollTop` unchanged, content-pane `scrollTop` increased, sidebar top/bottom unchanged within one pixel, and sidebar height/bottom covering the viewport within one pixel. Record the arithmetic explicitly. Source measurements describe the reference; they never replace or relax the target predicates.

When a mobile drawer exists, separately prove open, close, overlay, full-viewport geometry, background interception, body/document scroll lock, and scroll restoration using real input and screenshots.

</evidence_rules>

## Reproduction And Adaptation Rules

- Match accepted source evidence one-to-one wherever evidence exists.
- Reproduce source-backed routes, content, sections, visual hierarchy, spacing, typography, colors, controls, states, interactions, themes, and layout behavior.
- Preserve source visual outcomes while applying the required target safety architecture. A desktop sidebar target uses a viewport-bounded shell with a named content-pane scroll owner even when the source happens to use document scrolling with sticky positioning.
- For source-omitted breakpoints, extrapolate conservatively from the source, design JSON, and target tokens.
- Correct objective responsive defects at unrepresented sizes: overlap, clipping, cutoff, wrong overflow, accidental page scroll, horizontal canvas overflow, unusable controls, and blank lower-sidebar regions.
- Reproduce source themes. If the target exposes a theme omitted by the source, derive it conservatively and verify readability without inventing a new visual direction.
- Add a theme switch only when the target requires one.
- Use the real repository logo when available.
- Disable navigation that has no accepted destination.
- Stay within accepted routes, product content, visible behavior, and design direction.

## Managed Playwright Contract

Use the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` helper for source and target browser runs. Run custom Playwright discovery, interaction, capture, measurement, and comparison scripts through the helper's `--run` command. Keep source and target ports, scripts, screenshots, and runtime logs separate.

Source and target capture are two separate lifecycle-owned runs. Start the source through the helper, capture and stop it; start the target through the helper, capture and stop it; then compare the saved evidence. When equivalent live interaction proof is needed, run the same focused interaction manifest once against source and once against target through separate helper-owned runs.

Keep lifecycle ownership clean through these preferred practices:

- choose explicit, distinct task-owned ports before each run;
- let the helper start the server, detect readiness, run the script, and perform PID-scoped cleanup;
- use deterministic browser conditions instead of fixed sleeps;
- diagnose recorded lifecycle evidence before a focused rerun;
- split broad capture work into bounded scripts whose failure points are clear;
- preserve the copied lifecycle helper byte-for-byte.

These practices replace broad process controls such as `pkill`, `lsof`, background-server loops, arbitrary port sweeping, and manual browser downloads.

Use deterministic waits and bounded commands. Start readiness and targeted script timeouts at `15000`-`20000` ms. If a run fails with useful evidence, diagnose and fix that evidence. Permit one `60000` ms retry only after a timer-only quiet failure and recorded clean triage. Keep one targeted script within `120000` ms by splitting larger verification work.

Establish helper ownership with the first browser command for each source or target lifecycle. Treat a lifecycle failure as a focused repair ticket and resume through managed lifecycle with paired evidence.

## Outcome Guardrails

<outcome_guardrails>

Preserve these core conditions. If one is missing, return to its owning phase, repair it, and rescore.

| Condition to preserve | Required outcome |
| --- | --- |
| Model-owned gates | the Agent scores and promotes from evidence; scripts collect evidence but do not decide pass/fail |
| Phase ownership | each phase begins after its predecessor passes and repairs return to the earliest affected phase |
| Complete source contract | discovery covers every source page, meaningful state, visible section, interaction family, desktop, and mobile |
| Authored UI-only target | the implementation uses real target routes/components/local state and does not run or embed the source HTML |
| Paired visual proof | source and target images are current, correctly paired, opened, and compared at readable scale |
| Responsive shell quality | desktop/mobile layouts avoid overlap and cutoff; the target document stays still while the named content pane scrolls, the sidebar bounds remain viewport-stable, and mobile drawer ownership is proved when applicable |
| Managed browser lifecycle | custom Playwright runs use the unchanged lifecycle helper with deterministic waits and focused recovery |
| Final completion | Phase 4 rechecks prior gates, routes any missing work back through the loop, then runs the exact task-completion command as the last tool action |

</outcome_guardrails>

## Final Response Guard

Before producing a completion response, verify:

1. `CURRENT_PHASE.txt` is `phase-4-final-audit-completion`.
2. Every phase artifact says `Decision: Pass` and meets its numeric threshold.
3. Every critical row contains concrete evidence and says `Pass`.
4. No required row contains `Pending`, a template default, or unsupported `N/A`.
5. `open-gaps.md` has no ordinary or critical open gap and no stale placeholder.
6. Every cited screenshot exists, was opened, and has matching source-target comparison evidence.
7. Final desktop and mobile screenshots are current.
8. The final artifact audit proves the marker, ledger, gaps, artifacts, screenshots, scores, and diff agree.
9. The exact task completion command has not run early.
10. The exact task completion command is the sole remaining action.

If any item fails and local repair exists, continue from the earliest failing phase.

## Reference Loading Rules

<reference_loading_rules>

| Current marker | Required references |
| --- | --- |
| missing `task-workflow/` or `phase-0-source-contract` | [Phase 0 source contract](references/phase-0-source-contract.md); [managed lifecycle](references/playwright-lifecycle.md) |
| `phase-1-ui-implementation` | [Phase 1 UI implementation](references/phase-1-ui-implementation.md) |
| `phase-2-paired-responsive-proof` | [Phases 2-3 paired fidelity](references/phase-2-3-playwright-fidelity.md); [managed lifecycle](references/playwright-lifecycle.md) |
| `phase-3-fidelity-repair-signoff` | [Phases 2-3 paired fidelity](references/phase-2-3-playwright-fidelity.md); [managed lifecycle](references/playwright-lifecycle.md) |
| `phase-4-final-audit-completion` | [Phase 4 final audit](references/phase-4-final-audit-completion.md) |

The mapped references are mandatory execution instructions for their phases.

</reference_loading_rules>

## Asset Map

| Runtime artifact | Fresh asset to copy |
| --- | --- |
| `phase-0-source-contract.md` | [Phase 0 template](assets/templates/phase-0-source-contract.md) |
| `phase-1-ui-implementation.md` | [Phase 1 template](assets/templates/phase-1-ui-implementation.md) |
| `phase-2-paired-responsive-proof.md` | [Phase 2 template](assets/templates/phase-2-paired-responsive-proof.md) |
| `phase-3-fidelity-repair-signoff.md` | [Phase 3 template](assets/templates/phase-3-fidelity-repair-signoff.md) |
| `phase-4-final-audit-completion.md` | [Phase 4 template](assets/templates/phase-4-final-audit-completion.md) |
| `progress.md` | [Progress template](assets/templates/progress.md) |
| `open-gaps.md` | [Open-gaps template](assets/templates/open-gaps.md) |
| `scripts/playwright-lifecycle.mjs` | [Managed lifecycle helper](assets/scripts/playwright-lifecycle.mjs) |

## Phase Summary

<multi_phase_protocol>

### Phase 0: Source Contract

Create fresh artifacts, then use model-reviewed discovery packets to inspect the source first through managed Playwright, read the complete HTML, discover and capture every page/state/section at desktop and mobile, open all evidence, inspect design and target architecture read-only, and write the reproduction contract.

### Phase 1: UI Implementation

Implement the reproduction contract in ordered model-reviewed packets: tokens/themes, primitives, shell/sidebar/scroll ownership, routes/sections, local interactions, responsive behavior, and supported navigation/assets.

### Phase 2: Paired Responsive Proof

Use model-reviewed verification packets to review code integrity, run required repo checks, and produce matching source-target Playwright images and geometry/state evidence across all routes, sections, themes, desktop, tablet, mobile, and short-height states.

### Phase 3: Fidelity Repair And Signoff

Use model-reviewed fidelity packets to open every paired image, compare section by section, record and repair mismatches, recapture invalidated evidence, exercise all interaction families, perform adversarial checks, and reach strict overall plus independent desktop/mobile visual gates.

### Phase 4: Final Audit And Completion

Use ordered model-reviewed audit packets to reopen every artifact and evidence set, verify all gates remain current, audit the final diff and UI-only scope, unlock the exact completion command, and run it as the literal final tool action.

</multi_phase_protocol>

## Literal-Final Completion Command

The task instructions provide the exact completion command. Its expected shape is:

```bash
node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary of what was done>"
```

Never synthesize identifiers. Copy the exact command supplied by the task instructions.

After Phase 4 reaches `50/50`, every critical item passes, and the Phase 4 artifact plus `progress.md` are read back, run the exact completion command as the literal final tool action. Do not perform another tool action afterward. Respond directly from the command result.
