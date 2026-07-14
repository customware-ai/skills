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

## Workflow Planning Authority

<workflow_planning_authority>

The phase artifacts, work-packet ledgers, `progress.md`, and `open-gaps.md` are the task's only planning system. Never call `todowrite`, `update_plan`, another planning/task-list tool, delegation, or a subagent at any point in this workflow. Do not create a second private plan in tool state, prose, or another file.

Reason only about the current phase and its sole next local action. Do not draft implementation, build/check, verification, completion, or future-phase steps before the owning marker is set and its mapped references have been read. A future-phase plan created during Phase 0 is work performed out of phase and contaminates the run even when it changes no repository file.

If a workflow step needs decomposition, record it in the current phase's required table and `progress.md`; do not mirror it into a todo list. A plan that omits Playwright evidence, Phases 2–4, or the literal-final completion lock is proof that the workflow has been displaced and the run must be clean-reset.

</workflow_planning_authority>

## Immediate First-Action Lock

<first_action_lock>

After reading this `SKILL.md`, the Agent's next actions are fixed. Do not explore the repository first. Do not bulk-read the approved HTML first. Do not substitute an Agent-authored plan. The ordered workflow and evidence artifacts are the only permitted plan.

Execute this exact entry sequence:

1. Read `references/phase-0-source-contract.md` in one read tool call and wait for its result.
2. Then read `references/playwright-lifecycle.md` in a second read tool call and wait for its result. Never batch or parallelize these two reads.
3. Without reading, listing, searching, globbing, or checking any other path, run the supplied Phase 0 bootstrap as the next tool action. Use the actual source and design paths from the task prompt. The bootstrap validates that both inputs exist; do not `ls`, `stat`, `find`, `glob`, or otherwise pre-validate them:

   ```bash
   node <skill-root>/assets/scripts/bootstrap-phase-0.mjs \
     --source-html <approved-source-html-path> \
     --design-json <approved-design-json-path>
   ```

4. Read `task-workflow/phase-0-entry-receipt.json` only. Confirm every copied row says `byteIdentical: true`. The bootstrap already created and named it; do not insert `ls`, `stat`, `find`, glob, search, `wc`, or any existence check before the read.
5. Run the exact `MANDATORY NEXT ACTION` lifecycle command printed by the bootstrap. Do not rewrite or replace it. This renders the byte-identical approved HTML and runs the supplied Playwright script to capture desktop, mobile, and section images.
6. Read `task-workflow/source/initial-capture.json` directly; the lifecycle already created and named it, so do not insert `ls`, `stat`, `find`, glob, search, `wc`, or an existence check. Then open the four paths in `requiredInspectionImages` in their listed order: desktop full page, labeled desktop section contact sheet, mobile full page, labeled mobile section contact sheet. Use four separate, sequential image-read tool calls. Do not batch or parallelize any of the four reads, because parallel completion cannot prove inspection order. Wait for each image result and inspect it before issuing the next image read. Do not read `spec.json`, source HTML, target files, or another reference between those four image reads. These four images are only a startup sanity corpus for the default view. They are never the Phase 0 page/state evidence set or a completion limit.
7. Only after steps 1-6 have inspectable evidence, read `task-workflow/source-input/approved.html` directly and completely to EOF, including all embedded CSS and JavaScript. Do not precede the read with `wc`, `ls`, `stat`, `find`, glob, search, or another probe. If one read is truncated, continue reading from its reported next offset until every line has been inspected. Determine exactly how many pages exist and identify every page, destination, state, wizard step, tab, filter, drawer, dialog, and disabled control from the HTML itself. Your immediate next action after finishing that source read must be `node task-workflow/scripts/initialize-source-inventory.mjs`; insert no summary command or tool probe.
8. Read the generated `task-workflow/source/discovery/source-inventory.json`. Compare it with the complete source audit, add anything runtime heuristics missed, correct every mapping and owner, set `sourceOnlyDeclarationsReviewed` to `true`, set `sourceAuditStatus` to `Pass`, and add concrete `sourceAuditNotes`. Then run `node task-workflow/scripts/finalize-source-inventory.mjs` and separately read its `source-inventory-audit-receipt.json` in full. Confirm that the receipt lists the exact count and identity of every page and state from the HTML.
9. Without reading the design JSON or target files, run exactly `node task-workflow/scripts/validate-source-discovery.mjs task-workflow/source-playwright/inventory-source-discovery.mjs`. Both paths must remain literally repo-relative; do not resolve or rewrite either one as an absolute path because the validator rejects that invocation. Run every command printed by the validator separately and sequentially without rewriting their paths. The validated runner automatically shards large inventories into bounded lifecycle-owned execution batches, but the supplied script must still capture every finalized page at desktop and mobile, every visible section, every state at desktop and mobile, and desktop/mobile shell evidence after motion settles. Batch size is never an evidence limit; there is no page, state, section, or image limit. Read the completed manifest. Its dynamic `inspectionImages` contact sheets visibly cover every raw `images` evidence file exactly once, grouped only for readable inspection. Open every `inspectionImages` sheet in listed order—never a representative subset. A faded, blank, partially populated, moving, or transition-corrupted panel is invalid evidence and fails Phase 0. Only after every sheet has been inspected and found complete may you add `imagesOpened` as an exact ordered copy of `inspectionImages`.
10. Immediately after that one manifest edit, read `task-workflow/spec.json` directly and completely as the next tool action. Do not insert `ls`, `find`, glob, search, `stat`, a target file read, or repository probe. Only after the design JSON read may you inspect target implementation and existing target brand assets read-only and finish the Phase 0 contract. From that completed read-only inspection, run `prepare-phase-1-packet.mjs` with exact first-packet contract IDs, existing source evidence, existing target owner files, and one UI-only outcome; then read `task-workflow/phase-1-entry-plan.json` back. Do not score or invoke promotion until the handoff, every Phase 0 artifact row, `open-gaps.md`, score, and promotion lock are complete. The promotion gate is a final audit, not a missing-item discovery loop. Do not fetch, download, or open any externally referenced source brand asset in Phase 0; record its URL and intended Phase 1 destination only. Do not author or modify source capture code. Do not read another phase reference until its marker is set by the supplied promotion script.

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

Phase 0 is target-read-only throughout. Until `scripts/promote-phase-0.mjs` passes and sets the Phase 1 marker, every task-related write is permitted only under `task-workflow/`. Do not use `/tmp` or another external directory. Do not run `mkdir`, `touch`, `cp`, `mv`, `rm`, an installer, a formatter, a generator, or any command that creates, removes, or changes even an empty/preparatory target path. The bootstrap records a hash-and-directory baseline; promotion rejects any target file, symlink, or directory change, including an otherwise invisible empty directory. After the ordered target-instruction/design reads in step 10, inspect existing target-repository brand assets read-only to learn whether a real repository logo exists. If the expected asset directory is absent, record that fact in the contract; do not create it yet. Do not `curl`, fetch, download, copy, or open an externally referenced source logo/brand asset yet; any task-level source-brand exception starts only in Phase 1. Record its URL and intended Phase 1 destination in the reproduction contract only. Do not install a dependency or edit a target route, component, layout, style, config, package, public file, test, generated file, or build file. Any out-of-workflow task artifact or target write during Phase 0 invalidates the run and requires a clean reset.

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
| 0 | `phase-0-source-contract` | fresh workflow scaffold, managed interactive source discovery, target architecture, reproduction contract | at least `48/50` | complete source evidence and contract |
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

The first target-repository write must be the supplied bootstrap, which removes any previous `task-workflow/` directory and reseeds a fresh one from this skill's assets. Before that write, follow only the Immediate First-Action Lock. Only after the complete HTML-derived source manifest has been captured and every complete inspection sheet opened, read the design JSON, then inspect target implementation files read-only. Do not list, find, search, inspect assets, or reason from target code before the design read. Record the target architecture before Phase 0 promotion.

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
- byte-identical `task-workflow/source-playwright/inventory-source-discovery.mjs`
- byte-identical `task-workflow/scripts/initialize-source-inventory.mjs`
- byte-identical `task-workflow/scripts/finalize-source-inventory.mjs`
- byte-identical `task-workflow/source-input/approved.html`
- `task-workflow/phase-0-entry-receipt.json`
- `task-workflow/phase-0-target-baseline.json`
- `task-workflow/source/discovery/source-inventory.json`
- `task-workflow/source/discovery/source-inventory-audit-receipt.json`
- byte-identical `task-workflow/scripts/promote-phase-0.mjs`
- byte-identical `task-workflow/scripts/validate-source-discovery.mjs`
- byte-identical `task-workflow/scripts/run-validated-source-discovery.mjs`
- byte-identical `task-workflow/scripts/prepare-phase-1-packet.mjs`
- `task-workflow/phase-1-entry-plan.json` prepared and read back before Phase 0 promotion
- `task-workflow/phase-0-promotion-receipt.json` after the executable gate passes
- `task-workflow/phase-1-target-baseline.json` after the executable gate passes
- byte-identical `task-workflow/scripts/begin-phase-1-packet.mjs`
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

After any compaction, resume, retry, reconnect, continuation message, restored OpenCode session, or new coding session, the literal next tool action must be one read of `.agents/skills/source-html-to-app-ui/SKILL.md`. Do not read `CURRENT_PHASE.txt`, `progress.md`, a task input, an artifact, or any other path first. Do not explain, summarize, inspect state, or choose work before that read. Reading the marker first is an automatic resume failure because it chooses state before reloading authority.

After that first skill read completes, choose exactly one branch from already-known session state. Do not probe paths to choose the branch. Branch 0 has precedence over every other branch.

### Branch 0: interrupted atomic sequence

Use this branch whenever the interruption happened inside a hard ordered sequence or the last completed tool result/main phase lock already identifies one sole mandatory next action. Examples include:

- after reading `source/initial-capture.json` and before all four initial images are opened;
- between the four sequential initial image reads;
- between sequential validator-printed source capture commands;
- between sequential `inspectionImages` reads;
- between a lifecycle command and its mandatory named result read;
- between a gate command and its mandatory receipt/artifact readback.
- anywhere inside the Immediate First-Action Lock's chained Phase 0 sequence.

After the mandatory skill reread, perform the exact next unfinished mandatory action immediately. Do not inject task-input, progress, marker, gaps, artifact, reference, list, search, or probe reads before it. If that action's result identifies another mandatory next action, continue the chain. Use Branch B only when the chain reaches a safe boundary with no explicit immediate next action; never insert Branch B between chained Phase 0 actions.

Do not use Branch 0 from conversational recollection alone. The preceding completed tool result or named receipt must make the sole next action explicit. If it does not, use Branch B.

### Branch A: bootstrap never completed

Use this branch when the interrupted session had not successfully run `bootstrap-phase-0.mjs` and therefore no Phase 0 entry receipt was produced. Restart the Immediate First-Action Lock from its first reference read:

1. read `references/phase-0-source-contract.md`;
2. read `references/playwright-lifecycle.md`;
3. run the bootstrap as the immediate next action using task-prompt paths.

Do not read or probe `task-workflow/`, the source HTML, design JSON, marker, progress, or gaps in this branch. Missing-artifact probes are violations, not resume evidence.

### Branch B: bootstrap completed

Use this branch only when the interrupted session had already produced `task-workflow/phase-0-entry-receipt.json`. Read in this exact order:

1. `task-workflow/progress.md`;
2. `task-workflow/CURRENT_PHASE.txt`;
3. `task-workflow/open-gaps.md`;
4. every earlier phase artifact needed to identify the earliest failing phase;
5. the current or earliest failing phase artifact;
6. the reference files mapped to that phase;
7. task inputs, source HTML, or design only when the current phase's ordering contract requires that read.

Do not choose the next action from conversational memory. If the marker, progress ledger, gap ledger, and phase artifacts disagree, artifact gates win. Reset the marker and progress ledger to the earliest failing phase before continuing.

If any tool action occurred before the mandatory first skill read, the wrong branch was selected, a path was probed to select a branch, or the selected branch was reordered, stop immediately. Do not repair the resume evidence in place. Clean-reset and restart the task; a read-only ordering violation still contaminates the restored context.

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
- batching or parallelizing the two mandatory Phase 0 reference reads instead of reading them sequentially in order;
- calling a planning, todo, task-list, delegation, or subagent tool at any point in this workflow;
- drafting or recording future-phase work before the owning marker is set and its mapped references are read, including a Phase 0 implementation/build/check/completion plan;
- after compaction, resume, retry, reconnect, continuation, session restoration, or a new coding session, performing any tool action before rereading this `SKILL.md`, or reordering the mandatory reload sequence;
- inspecting target implementation files or bulk-reading the approved HTML before the initial managed source screenshots are captured and opened;
- implementing before the fresh Phase 0 scaffold exists and passes its first-write boundary;
- writing any target implementation, asset, dependency, configuration, package, public, test, generated, or build file while the marker remains Phase 0;
- creating, deleting, renaming, formatting, or otherwise mutating any target path during Phase 0, including an empty directory, preparatory asset folder, lockfile side effect, or generated cache outside `task-workflow/`;
- writing a task artifact to `/tmp` or anywhere outside `task-workflow/`, or fetching/downloading/inspecting a source logo or brand asset during Phase 0;
- attempting Phase 0 promotion using only the supplied initial capture instead of a second helper-owned real-input discovery run;
- treating the four initial default-view images or any fixed screenshot count as the Phase 0 evidence set;
- hardcoding a sampled page/state target array instead of iterating every finalized `inventory.pages` and `inventory.states` entry;
- satisfying a validator token with a comment while executable code writes elsewhere or uses another shape;
- emitting separate partial coverage manifests instead of the canonical inventory-complete `source/discovery/manifest.json` with array `surfaceCoverage` and `stateCoverage` entries;
- reading the design JSON or target implementation before completely reading the approved HTML, finalizing and confirming the complete inventory, running every supplied inventory capture mode, and opening every dynamic inspection sheet that collectively covers all manifest evidence;
- after completing source inspection, listing/searching target paths, inspecting target implementation/assets, or reasoning about implementation before reading `task-workflow/spec.json` completely;
- authoring or modifying Phase 0 source-capture code instead of using the byte-identical supplied `inventory-source-discovery.mjs`;
- scoring or marking Phase 0 `Pass` before every inventoried page, state, and visible section has lifecycle-owned desktop/mobile evidence and every image has been opened;
- running the supplied inventory source discovery script before `scripts/validate-source-discovery.mjs` confirms its unchanged bootstrap hash;
- invoking `playwright-lifecycle.mjs` directly for custom Phase 0 discovery instead of `scripts/run-validated-source-discovery.mjs`;
- invoking multiple `run-validated-source-discovery.mjs` commands in parallel; all supplied capture modes must run sequentially under the runner's exclusive lifecycle lock and have matching receipts;
- using `waitForTimeout`, `setTimeout`, `setInterval`, shell sleep, or a `60000` ms first attempt in source discovery;
- manually advancing the Phase 0 marker instead of passing `scripts/promote-phase-0.mjs`;
- skipping a phase or combining its gate into another phase;
- advancing a marker while the current or an earlier artifact says `Decision: Fail`;
- advancing with required `Pending`, missing evidence, stale screenshots, or unresolved ordinary gaps;
- replacing tables with prose or self-authored summaries;
- capturing screenshots without opening and comparing them;
- failing to open all four `requiredInspectionImages` in order before reading the spec, source text, target implementation, or another reference;
- using lifecycle stdout as a substitute for the mandatory separate `source/initial-capture.json` artifact read, or opening any initial image before that read completes;
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
- using `lsof`, `ps`, `kill`, `pkill`, shell `sleep`, or a manual server command to recover a Phase 0 source port; bootstrap and validated discovery must allocate fresh loopback ports and remain the only lifecycle owners;
- running any non-read action in Phase 1 before `begin-phase-1-packet.mjs` passes against the unchanged Phase 0 target baseline and its receipt is read back; the gate command itself must be Phase 1's first non-read action;
- after Phase 0 promotion, reading the Phase 1 artifact, progress ledger, target owner, or any other path before freshly rereading `phase-1-entry-plan.json` immediately after the Phase 1 reference; the plan read performed in Phase 0 never counts for Phase 1 entry;
- creating, downloading, copying, moving, removing, formatting, generating, installing, starting, or changing anything anywhere before the Phase 1 first-packet permit, including under `task-workflow/`, the target tree, `/tmp`, another directory, or a remote service;
- using shell inspection, `curl`, `wget`, a browser, Playwright, a server, a build, an asset fetch, or a network probe during Phase 1 entry before the first-packet permit;
- calling a planning, todo, delegation, or subagent tool during Phase 1 entry before the first-packet permit; the packet receipt is the required entry plan;
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
| `source-playwright/inventory-source-discovery.mjs` | [Inventory-driven complete source capture](assets/scripts/inventory-source-discovery.mjs) |
| `scripts/initialize-source-inventory.mjs` | [Source inventory initializer](assets/scripts/initialize-source-inventory.mjs) |
| `scripts/finalize-source-inventory.mjs` | [Executable source inventory finalizer](assets/scripts/finalize-source-inventory.mjs) |
| `scripts/promote-phase-0.mjs` | [Executable Phase 0 gate](assets/scripts/promote-phase-0.mjs) |
| `scripts/prepare-phase-1-packet.mjs` | [Executable Phase 1 packet handoff prepared during Phase 0](assets/scripts/prepare-phase-1-packet.mjs) |
| `scripts/begin-phase-1-packet.mjs` | [Executable Phase 1 first-write gate](assets/scripts/begin-phase-1-packet.mjs) |
| `scripts/validate-source-discovery.mjs` | [Source discovery pre-run validator](assets/scripts/validate-source-discovery.mjs) |
| `scripts/run-validated-source-discovery.mjs` | [Bounded validated source runner](assets/scripts/run-validated-source-discovery.mjs) |

## Phase Summary

<multi_phase_protocol>

### Phase 0: Source Contract

Reset and seed artifacts, launch and inspect the source through managed Playwright, then read the design JSON and inspect the target repo read-only. Discover every route/state/section/interaction/theme/viewport, capture source full-view and section evidence, write the reproduction contract, and mechanically prepare the exact Phase 1 packet-1 handoff before the final Phase 0 audit and promotion.

### Phase 1: UI Implementation

Follow the exact Phase 1 sequence printed by promotion: read the reference, prepared entry plan, Phase 1 artifact, progress ledger, and each exact planned target owner using file-read tools. Then run `node task-workflow/scripts/begin-phase-1-packet.mjs` with no arguments as Phase 1's first non-read action. Pass it against the unchanged baseline and prepared-plan hash, then read its receipt before any local, external, or remote side effect. Implement the reproduction contract in ordered, auditable frontend packets: tokens/themes, primitives, shell and scroll ownership, routes, sections, local interactions, responsive behavior, and supported navigation/assets.

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
