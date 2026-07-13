---
name: source-html-to-app-ui
description: Rebuild a provided source HTML application as a real, authored, high-fidelity target-repository UI. Use for approved design implementation tasks that require interactive source discovery, design-system translation, real routes/components/local UI interactions, responsive and theme adaptation, and rigorous paired source-target Playwright proof.
---

# Source HTML To App UI

## Strict Instruction Contract

This file is strict implementation instruction. It is not loose guidance, optional reference material, or one possible workflow.

If the Agent reads this skill, it must execute it exactly as written, in phase order, to the letter.

Required behavior:

- Do not reinterpret, reorder, combine, skip, abbreviate, or replace phases.
- Do not replace evidence with confidence, prose, a green build, or broad visual similarity.
- Do not replace paired Playwright verification with target-only screenshots.
- Do not reduce verification because it appears difficult, expensive, repetitive, time-consuming, or "pragmatic" to do less.
- Do not treat a partial artifact, screenshot existence, or an Agent-authored claim as proof.
- Do not promote while a required row is `Pending`, `Fail`, missing, stale, contradicted, or unsupported by inspectable evidence.
- Do not call task completion before Phase 4 passes.

## Immediate First-Action Lock

<first_action_lock>

After reading this `SKILL.md`, the Agent's next actions are fixed. Do not explore the repository first. Do not bulk-read the approved HTML first. Do not substitute an Agent-authored plan. Do not call `todowrite`, `update_plan`, or any planning/task-list tool before the initial source image corpus has been opened and inspected; the ordered entry sequence itself is the only permitted plan.

Execute this exact entry sequence:

1. Read `references/phase-0-source-contract.md`.
2. Read `references/playwright-lifecycle.md`.
3. Without reading, listing, searching, globbing, or checking any other path, run the supplied Phase 0 bootstrap as the next tool action. Use the actual source and design paths from the task prompt. The bootstrap validates that both inputs exist; do not `ls`, `stat`, `find`, `glob`, or otherwise pre-validate them:

   ```bash
   node <skill-root>/assets/scripts/bootstrap-phase-0.mjs \
     --source-html <approved-source-html-path> \
     --design-json <approved-design-json-path>
   ```

4. Read `task-workflow/phase-0-entry-receipt.json` only. Confirm every copied row says `byteIdentical: true`.
5. Run the exact `MANDATORY NEXT ACTION` lifecycle command printed by the bootstrap. Do not rewrite or replace it. This renders the byte-identical approved HTML and runs the supplied Playwright script to capture desktop, mobile, and section images.
6. Read `task-workflow/source/initial-capture.json`, then open the four paths in `requiredInspectionImages` in their listed order: desktop full page, labeled desktop section contact sheet, mobile full page, labeled mobile section contact sheet. Use four separate, sequential image-read tool calls. Do not batch or parallelize any of the four reads, because parallel completion cannot prove inspection order. Wait for each image result and inspect it before issuing the next image read. Do not read `spec.json`, source HTML, target files, or another reference between those four image reads. Record what is visibly present, missing, clipped, overlapping, scrollable, or stateful. The contact sheets contain every separately captured initial section; do not treat them as optional summaries.
7. Only after steps 1-6 have inspectable evidence may the Agent inspect target implementation files read-only, bulk-read source HTML, or continue the rest of Phase 0 discovery. Do not read another phase reference until its marker is set by the supplied promotion script.

After reading this skill and until step 3 completes, the Agent may read only the two required Phase 0 references. Use the task prompt's already-supplied input paths without reading or checking those files. Reading a Phase 1, 2, 3, or 4 reference before step 6 completes is an automatic run failure. Before step 6 completes, the Agent must not:

- read `app/`, `src/`, `server/`, route, layout, component, style, package, build, test, or other implementation files;
- bulk-read or reason primarily from the approved HTML source text instead of its browser rendering;
- run build, check, lint, type generation, tests, or a target app server;
- call a planning, todo, task-list, delegation, or subagent tool;
- list, stat, find, glob, search, or pre-validate the task inputs after the two required reference reads; the bootstrap is the required next tool action and owns input validation;
- edit any implementation, configuration, package, generated, database, or build file;
- claim source understanding from HTML/CSS/JS text alone.
- stop the four required image reads early because desktop and mobile appear similar or a full-page image appears sufficient.

This is a hard execution boundary, not an optimization. A violation contaminates the run. Do not continue from a violated boundary: restore a clean target fixture, reseed the current skill, and restart from step 1. The user can lose the project or job if the approved design is implemented from guessed source structure instead of inspected browser evidence.

Phase 0 remains target-read-only after the initial image gate. Until `scripts/promote-phase-0.mjs` passes and sets the Phase 1 marker, every task-related write is permitted only under `task-workflow/`. Do not use `/tmp` or another external directory. Do not `curl`, fetch, download, copy, open, or inspect a logo/brand asset yet; record its URL and intended Phase 1 destination in the reproduction contract only. Do not install a dependency or edit a target route, component, layout, style, config, package, public file, test, generated file, or build file. Any out-of-workflow task artifact or target write during Phase 0 invalidates the run and requires a clean reset.

</first_action_lock>

If the Agent is uncertain, resolve the uncertainty inside this workflow. Do not invent a simpler workflow. If a gate cannot be proved, the gate has failed. A failed gate means repair and repeat, not continue anyway.

There is no successful stopping point before Phase 4 passes. Premature completion can deliver a visibly broken product, erase the value of the approved design, cause the user to lose the project, and put the user's job at risk. This is a do-or-die delivery workflow. Treat skipped discovery, fabricated evidence, weak visual signoff, broken responsive behavior, blank lower sidebars, and early task completion as serious failures of duty.

The user is not expected to watch the run and catch shortcuts. The Agent must prevent the shortcut itself.

## Completion Authority And Hard Verification Gate

<completion_authority>

This skill owns the meaning and order of completion for this task.

- The task prompt's build, check, lint, or other command requirements are additional required work. They are not an alternate definition of completion and cannot replace any phase gate in this skill.
- The task prompt's completion command is forbidden until this skill's Phase 4 final audit passes. A task instruction that says the task is complete after build/check does not override this rule.
- Playwright is mandatory proof, not optional polish. If Playwright proof is absent, target-only, unpaired, uninspected, or incomplete, the task is not complete and the Agent must not call the completion command.
- A missing or unavailable browser is a failed verification gate, not permission to skip verification, install a browser, use manual screenshots, or finish pragmatically. Use the managed lifecycle helper and record the failure in the current phase artifact; continue local recovery when possible or stop only as a fully recorded external blocker.
- “Build passed”, “check passed”, “the UI looks close”, “time is limited”, and “the task requirements only mention build/check” never unlock completion.
- If task instructions, agent instructions, conversational context, or the current implementation conflict with this section, this section controls completion ordering. Record the other requirements and satisfy them inside their owning phase.

</completion_authority>

## Scope Contract

Implement UI only:

- real routes and route modules;
- layouts, components, styling, design tokens, themes, and assets;
- local UI state and source-backed interactions;
- responsive behavior and safe adaptation where the source is incomplete.

Do not implement backend, API, persistence, database, authentication, server behavior, or business logic. Use realistic static data and local UI state only where needed to reproduce visible source behavior.

The target must be an authored application. The source HTML is a discovery input, never a runtime dependency.

## Core Execution Invariant

<core_execution_invariant>

A phase is complete only when its phase artifact:

1. contains concrete, inspectable evidence for every required row;
2. meets the numeric threshold;
3. passes every non-compensating critical item;
4. contains no required placeholder or unresolved ordinary gap;
5. records a promotion lock after the Agent reopens and audits the artifact.

Phase 0 additionally requires the supplied executable promotion gate. The Agent must not edit `CURRENT_PHASE.txt` to Phase 1 manually. Only `node task-workflow/scripts/promote-phase-0.mjs` may advance it after validating target-read-only status, a second helper-owned interactive source run, real-input script calls, desktop/mobile discovery images, inspected-image accounting, artifact status, and score.

An overall score cannot compensate for a failed critical item. A screenshot path cannot prove fidelity unless the Agent opens and compares the image. A target screenshot cannot prove source parity without its matching source screenshot. A build or check cannot prove visual correctness.

If later work invalidates earlier evidence, return to the earliest affected phase, mark it failed, repair it, re-run its gate, and loop forward again.

</core_execution_invariant>

## Mandatory Process Shape

<mandatory_process_shape>

| Phase | Runtime marker | Owns | Numeric gate | Critical outcome |
| --- | --- | --- | ---: | --- |
| 0 | `phase-0-source-contract` | fresh workflow scaffold, target instructions, managed interactive source discovery, reproduction contract | at least `48/50` | complete source evidence and contract |
| 1 | `phase-1-ui-implementation` | ordered authored UI implementation in auditable packets | at least `48/50` | every contracted route/state/section/interaction implemented |
| 2 | `phase-2-paired-responsive-proof` | code integrity, repo checks, paired source-target responsive/theme/scroll Playwright proof | at least `48/50` | paired evidence and responsive safety pass |
| 3 | `phase-3-fidelity-repair-signoff` | section-by-section fidelity repair loop, adversarial checks, real-input interaction proof | at least `49/50`; desktop and mobile each at least `48/50` | one-to-one visual and behavioral signoff |
| 4 | `phase-4-final-audit-completion` | artifact integrity review, final diff/scope audit, literal-final completion command | `50/50` | every previous gate remains valid and completion is unlocked |

The phases perform different work. Do not move work to a later phase to avoid an earlier gate.

The only acceptable end state is Phase 4 passed and the exact task completion command run as the literal final tool action. The only acceptable earlier stop is a proven external blocker with no local recovery, recorded in the current phase artifact and `task-workflow/open-gaps.md`.

</mandatory_process_shape>

## Looped Gate Contract

Every phase must follow this exact loop:

1. Set `task-workflow/CURRENT_PHASE.txt` to the phase marker before phase work begins.
2. Re-read this `SKILL.md` and the phase references from the reference map.
3. Perform the phase work.
4. Update the phase artifact and `task-workflow/open-gaps.md` with concrete evidence.
5. Open every cited screenshot or visual artifact that the gate relies on.
6. Score the phase and evaluate every critical item independently.
7. If the gate fails, keep the marker on that phase, repair the failure, refresh invalidated evidence, and repeat from step 2.
8. If the gate passes, write the promotion lock, reopen the artifact, confirm no placeholder or contradiction remains, update `progress.md`, then set the next marker.
9. Immediately load the next phase references and continue without asking the user whether to proceed.

Do not lower a threshold to escape a loop. Do not mark a row `Pass` because implementation exists. Do not defer a locally repairable issue to the user. Do not stop after implementation, build, check, screenshot capture, or a partial verification pass while a later phase remains available.

## Artifact Enforcement System

<artifact_enforcement_system>

The first target-repository write must be the supplied bootstrap, which removes any previous `task-workflow/` directory and reseeds a fresh one from this skill's assets. Before that write, follow only the Immediate First-Action Lock. Read target `AGENTS.md`, its required docs, and target implementation files read-only after the initial managed source screenshot corpus has been opened, then record those instructions and architecture before Phase 0 promotion.

Required runtime artifacts:

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
- byte-identical `task-workflow/source-playwright/initial-source-capture.mjs`
- byte-identical `task-workflow/source-input/approved.html`
- `task-workflow/phase-0-entry-receipt.json`
- byte-identical `task-workflow/scripts/promote-phase-0.mjs`
- byte-identical `task-workflow/scripts/validate-source-discovery.mjs`
- byte-identical `task-workflow/scripts/run-validated-source-discovery.mjs`
- `task-workflow/phase-0-promotion-receipt.json` after the executable gate passes
- `task-workflow/source/`
- `task-workflow/target-playwright/`
- `task-workflow/verification/`
- byte-identical `task-workflow/scripts/playwright-lifecycle.mjs`
- `task-workflow/runtime/source/`
- `task-workflow/runtime/target/`

Keep every generated task artifact under `task-workflow/`. Source evidence belongs in `task-workflow/source/`; matching target evidence belongs in `task-workflow/verification/`. Do not generate task screenshots, scripts, logs, or ledgers elsewhere.

Copy the supplied design JSON byte-for-byte to `task-workflow/spec.json`. Do not normalize, rewrite, or infer a replacement. Treat all old workflow artifacts, screenshots, scripts, logs, gaps, scores, and decisions as contaminated prior-run state.

The templates under `assets/templates/` are enforcement artifacts. Copy their structure. Do not replace required tables with prose, delete rows, collapse evidence categories, prefill `Pass`, or remove score and promotion sections.

`CURRENT_PHASE.txt` is a resume pointer, not proof. Phase artifacts and evidence decide whether a phase passed. `progress.md` is a compact resume ledger, not a substitute for phase evidence.

</artifact_enforcement_system>

## Compaction, Resume, And Reconnect Contract

<resume_contract>

Re-read this `SKILL.md` after every compaction before doing any new work. Also use this reload sequence after resume, retry, reconnect, or a new coding session:

1. target `AGENTS.md` and every task-relevant instruction recorded in `progress.md`;
2. the exact task inputs, source HTML, and design JSON;
3. this `SKILL.md`;
4. `task-workflow/progress.md`;
5. `task-workflow/CURRENT_PHASE.txt`;
6. `task-workflow/open-gaps.md`;
7. every earlier phase artifact needed to identify the earliest failing phase;
8. the current or earliest failing phase artifact;
9. the reference files mapped to that phase.

Do not choose the next action from conversational memory. If the marker, progress ledger, gap ledger, and phase artifacts disagree, artifact gates win. Reset the marker and progress ledger to the earliest failing phase before continuing.

After a phase promotion, read the newly mapped reference files before any work in the new phase. Work performed before that read is invalid and must be repeated.

</resume_contract>

## Evidence Rules

<evidence_rules>

- Use real user input for routes, drawers, menus, tabs, forms, filters, selections, and other visible interaction families.
- Record exact reach steps for every route and state.
- Capture paired source and target full-page or full-view images at matching route, state, theme, and viewport values.
- Capture paired section images for every visible page section. A full-page image alone is insufficient when section details cannot be inspected clearly.
- Open and compare images section by section. Record actual mismatches, fixes, recapture paths, and final decisions.
- Record browser geometry and scroll measurements where layout behavior matters.
- Treat missing, unreadable, stale, mismatched, or uninspected evidence as `Fail`.
- Keep `open-gaps.md` current. A gap is not resolved until the owning phase updates the ledger with source and target proof.
- Replace Phase 0's initial `None currently recorded` row during the first real paired comparison with actual mismatch rows or explicit route/section comparison evidence.
- Do not fabricate scores. Every point must map to a concrete evidence row.
- Do not use one viewport's evidence to pass another viewport.

When a sidebar exists, visual proof must include a forced-overflow short-height desktop state, real scrolling, stable sidebar geometry, full viewport-height coverage, content-only scrolling, and a post-scroll screenshot proving no blank lower-sidebar region.

When a mobile drawer exists, separately prove open, close, overlay, full-viewport geometry, background interception, body/document scroll lock, and scroll restoration using real input and screenshots.

</evidence_rules>

## Reproduction And Adaptation Rules

- Match accepted source evidence one-to-one wherever evidence exists.
- Reproduce source-backed routes, content, sections, visual hierarchy, spacing, typography, colors, controls, states, interactions, themes, and layout behavior.
- For source-omitted breakpoints, extrapolate conservatively from the source, design JSON, and target tokens.
- Correct objective responsive defects at unrepresented sizes: overlap, clipping, cutoff, wrong overflow, accidental page scroll, horizontal canvas overflow, unusable controls, and blank lower-sidebar regions.
- Reproduce source themes. If the target already exposes a theme omitted by the source, derive it conservatively and verify readability without inventing a new visual direction.
- Do not add a theme switch unless the target requires one.
- Use the real repository logo when available.
- Disable navigation that has no accepted destination.
- Never invent routes, product content, product behavior, backend logic, business logic, or an alternate design direction.

## Managed Playwright Contract

Use only the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` helper for source and target browser runs. Keep source and target ports, scripts, screenshots, and runtime logs separate.

Never use or advocate:

- `pkill -f`;
- `disown` or `nohup`;
- fixed sleeps as readiness or state proof;
- blind reruns;
- repeated manual server loops;
- arbitrary port sweeping;
- browser downloads;
- editing the copied lifecycle helper.

Use deterministic waits and bounded commands. Start readiness and targeted script timeouts at `15000`-`20000` ms. If a run fails with useful evidence, diagnose and fix that evidence; do not increase the timeout. Permit one `60000` ms retry only after a timer-only quiet failure and recorded clean triage of lifecycle logs, readiness, URL, page state, console, network, inputs, and selectors. Never exceed `120000` ms for one targeted script.

The first browser command for each source or target lifecycle must establish managed ownership through the helper. A lifecycle failure is a repair ticket. It is not permission to switch immediately to manual background servers or target-only screenshots.

Before any implementation packet can pass Phase 1, Phase 0 must contain source screenshots captured through the managed helper. Before Phase 2 or Phase 3 can pass, the artifact must contain current paired source/target screenshots at matching route, state, theme, viewport, and section coordinates. A helper failure leaves the phase failed until diagnosed and recovered or documented as a real external blocker; it never converts the requirement into `N/A`.

## Forbidden Shortcuts And Automatic Fails

<automatic_fails>

These automatically fail the current phase or the entire run:

- performing any action out of order from the Immediate First-Action Lock;
- calling a planning, todo, task-list, delegation, or subagent tool before the initial source image corpus is opened and inspected;
- inspecting target implementation files or bulk-reading the approved HTML before the initial managed source screenshots are captured and opened;
- implementing before the fresh Phase 0 scaffold exists and passes its first-write boundary;
- writing any target implementation, asset, dependency, configuration, package, public, test, generated, or build file while the marker remains Phase 0;
- writing a task artifact to `/tmp` or anywhere outside `task-workflow/`, or fetching/downloading/inspecting a source logo or brand asset during Phase 0;
- attempting Phase 0 promotion using only the supplied initial capture instead of a second helper-owned real-input discovery run;
- running a custom source discovery script before `scripts/validate-source-discovery.mjs` passes at that script's current hash;
- invoking `playwright-lifecycle.mjs` directly for custom Phase 0 discovery instead of `scripts/run-validated-source-discovery.mjs`;
- invoking multiple `run-validated-source-discovery.mjs` commands in parallel; every custom source script must run sequentially under the runner's exclusive lifecycle lock, and every current script hash must have its own passing receipt;
- using `waitForTimeout`, `setTimeout`, `setInterval`, shell sleep, or a `60000` ms first attempt in source discovery;
- manually advancing the Phase 0 marker instead of passing `scripts/promote-phase-0.mjs`;
- skipping a phase or combining its gate into another phase;
- advancing a marker while the current or an earlier artifact says `Decision: Fail`;
- advancing with required `Pending`, missing evidence, stale screenshots, or unresolved ordinary gaps;
- replacing tables with prose or self-authored summaries;
- capturing screenshots without opening and comparing them;
- failing to open all four `requiredInspectionImages` in order before reading the spec, source text, target implementation, or another reference;
- batching or parallelizing any of the four initial image reads instead of using four separate sequential tool calls and inspecting each result before requesting the next;
- capturing only target screenshots;
- using one full-page screenshot as the only proof for a multi-section page;
- claiming responsive or sidebar correctness without short-height, scroll, geometry, and post-scroll evidence;
- claiming mobile correctness without real-input drawer and mobile viewport proof when a drawer exists;
- calling build/check evidence visual fidelity evidence;
- calling a screenshot file's existence visual fidelity evidence;
- treating Playwright as optional, a nice-to-have, or too time-consuming;
- using a "pragmatic", "best effort", "primary requirement", or time-pressure rationale to weaken the workflow;
- editing the lifecycle helper, using forbidden process commands, or bypassing managed lifecycle after an undiagnosed failure;
- signing off while any source-target pair, section, interaction family, critical gate, or viewport is unproved;
- calling task completion before Phase 4 passes;
- stopping or returning a completion-style response while the next local repair or phase action exists.

</automatic_fails>

## Final Response Guard

Before producing any final response or ending the tool-driven turn, verify:

1. `CURRENT_PHASE.txt` is `phase-4-final-audit-completion`.
2. Every phase artifact says `Decision: Pass` and meets its numeric threshold.
3. Every critical row contains concrete evidence and says `Pass`.
4. No required row contains `Pending`, a template default, or unsupported `N/A`.
5. `open-gaps.md` has no ordinary or critical open gap and no stale placeholder.
6. Every cited screenshot exists, has been opened, and has matching source-target comparison evidence.
7. The final desktop and mobile screenshots are current.
8. The final artifact integrity audit proves the marker, progress ledger, gaps, artifacts, screenshots, scores, and diff agree.
9. The exact task completion command has not run early.
10. The exact task completion command is the sole remaining action.

If any item fails and local repair exists, continue from the earliest failing phase. Do not answer as if the task is complete.

## Reference Loading Rules

<reference_loading_rules>

Read only the mapped references for the current phase, except this main skill which must be re-read after every compaction.

| Current marker | Required references |
| --- | --- |
| missing `task-workflow/` or `phase-0-source-contract` | [Phase 0 source contract](references/phase-0-source-contract.md); [managed lifecycle](references/playwright-lifecycle.md) |
| `phase-1-ui-implementation` | [Phase 1 UI implementation](references/phase-1-ui-implementation.md) |
| `phase-2-paired-responsive-proof` | [Phases 2-3 paired fidelity](references/phase-2-3-playwright-fidelity.md); [managed lifecycle](references/playwright-lifecycle.md) |
| `phase-3-fidelity-repair-signoff` | [Phases 2-3 paired fidelity](references/phase-2-3-playwright-fidelity.md); [managed lifecycle](references/playwright-lifecycle.md) |
| `phase-4-final-audit-completion` | [Phase 4 final audit](references/phase-4-final-audit-completion.md) |

The reference files are mandatory execution instructions for their phases. They are not optional expansion material.

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
| Phase 0 reset/reseed packet | [Phase 0 bootstrap](assets/scripts/bootstrap-phase-0.mjs) |
| `source-playwright/initial-source-capture.mjs` | [Initial source capture](assets/scripts/initial-source-capture.mjs) |
| `scripts/promote-phase-0.mjs` | [Executable Phase 0 gate](assets/scripts/promote-phase-0.mjs) |
| `scripts/validate-source-discovery.mjs` | [Source discovery pre-run validator](assets/scripts/validate-source-discovery.mjs) |
| `scripts/run-validated-source-discovery.mjs` | [Bounded validated source runner](assets/scripts/run-validated-source-discovery.mjs) |

## Phase Summary

<multi_phase_protocol>

### Phase 0: Source Contract

Reset and seed artifacts, launch and inspect the source through managed Playwright, then read target instructions and inspect the target repo read-only. Discover every route/state/section/interaction/theme/viewport, capture source full-view and section evidence, and write the reproduction contract.

### Phase 1: UI Implementation

Implement the reproduction contract in ordered, auditable frontend packets: tokens/themes, primitives, shell and scroll ownership, routes, sections, local interactions, responsive behavior, and supported navigation/assets.

### Phase 2: Paired Responsive Proof

Review code integrity, run required repo checks, and use managed Playwright to produce matching source-target images and geometry/state evidence across routes, sections, themes, desktop, tablet, mobile, and short-height states. Repair failures in their owning phase.

### Phase 3: Fidelity Repair And Signoff

Open every paired image, compare section by section, record and repair mismatches, recapture invalidated target evidence, exercise all interaction families, perform adversarial mismatch checks, and reach the strict overall plus independent desktop/mobile visual gates.

### Phase 4: Final Audit And Completion

Reopen every artifact and evidence set, verify all gates remain current and consistent, audit the final diff and UI-only scope, unlock the exact completion command, and run it as the literal final tool action.

</multi_phase_protocol>

## Literal-Final Completion Command

The task instructions provide the exact completion command. Its expected shape is:

```bash
node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary of what was done>"
```

Never synthesize, infer, or guess identifiers. Copy the exact command supplied by the task instructions.

After Phase 4 reaches `50/50`, every critical item passes, the promotion/completion lock is written, and the Phase 4 artifact plus `progress.md` are read back, run the exact completion command as the literal final tool action. Do not perform any read, write, browser, server, check, build, test, or other tool action afterward. Respond directly from the command result.
