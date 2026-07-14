---
name: source-html-to-app-ui
description: Rebuild a provided source HTML application as a real, authored, high-fidelity target-repository UI. Use for approved design implementation tasks that require interactive source discovery, design-system translation, real routes/components/local UI interactions, responsive and theme adaptation, and rigorous paired source-target Playwright proof.
---

# Source HTML To App UI

## Strict Instruction Contract

This file is strict implementation instruction, not loose guidance or optional reference material.

If the Agent reads this skill, execute it exactly as written, in phase order, to the letter.

- Do not reinterpret, reorder, combine, skip, abbreviate, or replace phases.
- Do not replace evidence with confidence, prose, a green build, or broad visual similarity.
- Do not replace paired Playwright verification with target-only screenshots.
- Do not reduce verification because it appears difficult, expensive, repetitive, or time-consuming.
- Do not promote while a required row is `Pending`, `Fail`, missing, stale, contradicted, or unsupported.
- Do not call task completion before Phase 4 passes.

If a gate cannot be proved, it has failed. A failed gate means remain in that phase, repair the work or evidence, rescore it, and repeat. Do not stop while a local repair remains.

There is no successful stopping point before Phase 4 passes. Premature completion can deliver a visibly broken product, erase the approved design's value, cost the user the project, and put the user's job at risk. Treat skipped discovery, fabricated evidence, target-only proof, broken responsive behavior, blank lower sidebars, and early completion as serious failures of duty.

## Scope Contract

Implement UI only:

- real routes and route modules;
- layouts, components, styling, design tokens, themes, and assets;
- local UI state and source-backed interactions;
- responsive behavior and safe adaptation where the source is incomplete.

Do not implement backend, API, persistence, database, authentication, server behavior, or business logic. Use realistic static data and local UI state only where required to reproduce visible behavior.

The target must be an authored application. The source HTML is a discovery input, never a runtime dependency. Do not inject, embed, iframe, import, parse at runtime, or wrap the source HTML as the implementation.

## Core Execution Invariant

<core_execution_invariant>

The Agent owns every phase evaluation. Phase gates are evidence-backed model reviews, not executable validator scripts.

Do not create or use phase-check, phase-promotion, packet-closeout, receipt, forced-read, hash-acknowledgement, or scoring scripts. The only supplied runtime script in this skill is `playwright-lifecycle.mjs`, which owns browser/server lifecycle. Custom Playwright interaction and capture scripts are allowed and required, but run them through the lifecycle helper.

A phase is complete only when its phase artifact:

1. contains concrete, inspectable evidence for every required row;
2. meets the numeric threshold through the Agent's honest row-by-row calculation;
3. passes every non-compensating critical item;
4. contains no required placeholder or unresolved ordinary gap;
5. records a promotion lock after the Agent reopens and audits the artifact.

An overall score cannot compensate for a failed critical item. A screenshot path is not visual proof until the Agent opens and compares the image. A target screenshot is not parity proof without its matching source screenshot. Build/check results are not visual evidence.

If later work invalidates earlier evidence, return to the earliest affected phase, mark it failed, repair it, refresh the evidence, rescore it, and loop forward again.

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

The phases perform different work. Do not move work to a later phase to avoid an earlier gate.

The only acceptable end state is Phase 4 passed and the exact task completion command run as the literal final tool action. The only acceptable earlier stop is a proven external blocker with no local recovery, recorded in the current phase artifact and `task-workflow/open-gaps.md`.

</mandatory_process_shape>

## Looped Gate Contract

Every phase follows this model-owned loop:

1. Set `task-workflow/CURRENT_PHASE.txt` to the phase marker before phase work begins.
2. Re-read this `SKILL.md` and the mapped phase references.
3. Perform the phase work.
4. Update the phase artifact, `progress.md`, and `open-gaps.md` with concrete evidence.
5. Open every cited screenshot or visual artifact used by the gate.
6. Review every rubric row and calculate the score in the phase artifact.
7. Evaluate every critical item independently; one critical failure makes the phase fail regardless of score.
8. If the gate fails, keep the marker on that phase, record the failure and next repair, perform the repair, refresh invalidated evidence, and repeat from step 2.
9. If the gate passes, write the promotion lock, reopen the artifact, verify the arithmetic and evidence, update `progress.md`, then set the next marker.
10. Immediately load the next phase references and continue without asking the user whether to proceed.

Do not lower a threshold to escape the loop. Do not mark rows `Pass` merely because code or screenshots exist. Never invent points. Every awarded point must map to a concrete evidence row.

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

Keep every generated task artifact under `task-workflow/`. Source scripts, screenshots, manifests, and notes belong under its source paths. Target scripts and evidence belong under its target/verification paths. Do not generate task screenshots, scripts, logs, or ledgers elsewhere.

Copy the supplied design JSON byte-for-byte to `task-workflow/spec.json`. Treat all old workflow artifacts, screenshots, scripts, logs, gaps, scores, and decisions as contaminated prior-run state.

Copy the templates under `assets/templates/` without removing required tables, evidence categories, scorecards, critical gates, or promotion locks. Fill them as the work proceeds; do not prefill `Pass`.

`CURRENT_PHASE.txt` is a resume pointer, not proof. Phase artifacts and evidence decide whether a phase passed. `progress.md` is a compact resume ledger, not a substitute for phase evidence.

</artifact_system>

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

Do not act from conversational memory. If the marker, progress ledger, gap ledger, and artifacts disagree, artifact gates win. Move the marker and ledger back to the earliest failing phase before continuing.

After promotion, read the newly mapped references before work in the new phase.

</resume_contract>

## Evidence Rules

<evidence_rules>

- Use real user input for routes, drawers, menus, tabs, forms, filters, selections, and other visible interaction families.
- Record exact reach steps for every route and state.
- Capture every source page and meaningful state discovered from the HTML and browser behavior. Never impose a fixed page, state, section, or screenshot limit.
- Capture desktop and mobile source evidence for every discovered page and meaningful state.
- Capture paired source and target full-page/full-view images at matching route, state, theme, viewport, and scroll positions.
- Capture paired section images for every visible page section. A full-page image alone is insufficient when section details are unreadable.
- Open and compare every gate-critical image. Record actual mismatches, fixes, recapture paths, and final decisions.
- Record browser geometry and scroll measurements where layout behavior matters.
- Treat missing, unreadable, stale, mismatched, unpaired, or unopened evidence as `Fail`.
- Keep `open-gaps.md` current. A gap is not resolved until the owning phase updates it with source and target proof.
- Do not use one viewport's evidence to pass another viewport.

When a sidebar exists, visual proof must include a forced-overflow short-height desktop state, real scrolling, stable sidebar geometry, full viewport-height coverage, content-only scrolling, and a post-scroll screenshot proving no blank lower-sidebar region.

When a mobile drawer exists, separately prove open, close, overlay, full-viewport geometry, background interception, body/document scroll lock, and scroll restoration using real input and screenshots.

</evidence_rules>

## Reproduction And Adaptation Rules

- Match accepted source evidence one-to-one wherever evidence exists.
- Reproduce source-backed routes, content, sections, visual hierarchy, spacing, typography, colors, controls, states, interactions, themes, and layout behavior.
- For source-omitted breakpoints, extrapolate conservatively from the source, design JSON, and target tokens.
- Correct objective responsive defects at unrepresented sizes: overlap, clipping, cutoff, wrong overflow, accidental page scroll, horizontal canvas overflow, unusable controls, and blank lower-sidebar regions.
- Reproduce source themes. If the target exposes a theme omitted by the source, derive it conservatively and verify readability without inventing a new visual direction.
- Do not add a theme switch unless the target requires one.
- Use the real repository logo when available.
- Disable navigation that has no accepted destination.
- Never invent routes, product content, product behavior, backend logic, business logic, or an alternate design direction.

## Managed Playwright Contract

Use the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` helper for source and target browser runs. Run custom Playwright discovery, interaction, capture, measurement, and comparison scripts through the helper's `--run` command. Keep source and target ports, scripts, screenshots, and runtime logs separate.

Never use or advocate:

- `pkill -f`;
- `disown` or `nohup`;
- fixed sleeps as readiness or state proof;
- blind reruns;
- repeated manual server loops;
- arbitrary port sweeping;
- browser downloads;
- editing the copied lifecycle helper.

Use deterministic waits and bounded commands. Start readiness and targeted script timeouts at `15000`-`20000` ms. If a run fails with useful evidence, diagnose and fix that evidence. Permit one `60000` ms retry only after a timer-only quiet failure and recorded clean triage. Never exceed `120000` ms for one targeted script.

The first browser command for each source or target lifecycle must establish managed ownership through the helper. A lifecycle failure is a repair ticket, not permission to switch to manual server handling or target-only screenshots.

## Forbidden Shortcuts And Automatic Fails

<automatic_fails>

These automatically fail the current phase:

- creating or using a script to decide a phase score, phase pass, promotion, packet review, or closeout;
- implementing before the fresh Phase 0 artifacts exist and Phase 0 passes;
- skipping a phase or combining its gate into another phase;
- advancing while the current or earlier artifact says `Decision: Fail`;
- advancing with required `Pending`, missing evidence, stale screenshots, or unresolved ordinary gaps;
- replacing required evidence tables with prose;
- capturing screenshots without opening and comparing them;
- discovering only a sampled or fixed number of source pages/states;
- capturing only target screenshots;
- using one full-page screenshot as the only proof for a multi-section page;
- claiming responsive or sidebar correctness without short-height, scroll, geometry, and post-scroll evidence;
- claiming mobile correctness without real-input drawer and mobile viewport proof when a drawer exists;
- calling build/check evidence visual fidelity evidence;
- treating Playwright as optional or too time-consuming;
- editing the lifecycle helper or bypassing managed lifecycle after an undiagnosed failure;
- signing off while any source-target pair, section, interaction family, critical gate, or viewport is unproved;
- calling task completion before Phase 4 passes;
- stopping while the next local repair or phase action exists.

</automatic_fails>

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

Create fresh artifacts, inspect the source first through managed Playwright, read the complete HTML, discover and capture every page/state/section at desktop and mobile, open all evidence, then inspect design and target architecture read-only and write the reproduction contract.

### Phase 1: UI Implementation

Implement the reproduction contract in ordered model-reviewed packets: tokens/themes, primitives, shell/sidebar/scroll ownership, routes/sections, local interactions, responsive behavior, and supported navigation/assets.

### Phase 2: Paired Responsive Proof

Review code integrity, run required repo checks, and use managed Playwright to produce matching source-target images and geometry/state evidence across all routes, sections, themes, desktop, tablet, mobile, and short-height states.

### Phase 3: Fidelity Repair And Signoff

Open every paired image, compare section by section, record and repair mismatches, recapture invalidated evidence, exercise all interaction families, perform adversarial checks, and reach strict overall plus independent desktop/mobile visual gates.

### Phase 4: Final Audit And Completion

Reopen every artifact and evidence set, verify all gates remain current, audit the final diff and UI-only scope, unlock the exact completion command, and run it as the literal final tool action.

</multi_phase_protocol>

## Literal-Final Completion Command

The task instructions provide the exact completion command. Its expected shape is:

```bash
node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary of what was done>"
```

Never synthesize identifiers. Copy the exact command supplied by the task instructions.

After Phase 4 reaches `50/50`, every critical item passes, and the Phase 4 artifact plus `progress.md` are read back, run the exact completion command as the literal final tool action. Do not perform another tool action afterward. Respond directly from the command result.
