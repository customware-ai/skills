---
name: source-html-to-app-ui
description: Rebuild a provided source HTML application as a real, high-fidelity target-repository UI. Use for approved design implementation tasks requiring interactive source discovery, design-system translation, authored routes/components/local UI state, responsive adaptation, and paired desktop/mobile visual proof.
---

# Source HTML To App UI

## Execute Strictly

Execute exactly four phases. Reuse the continuation, resume, promotion, evidence, and managed Playwright mechanics defined here; do not import another workflow’s phase count.

Continue while a local repair or verification action exists. Route every failure to its owning or earliest failing phase, repair it, and loop forward. Report only a proven external blocker with no local resolution.

After compaction, resume, retry, reconnect, or a new session, reload target `AGENTS.md`, every recorded task-relevant target instruction, the task inputs, this `SKILL.md`, `task-workflow/progress.md`, `task-workflow/CURRENT_PHASE.txt`, `task-workflow/open-gaps.md`, the earliest failing phase artifact, and the current phase reference. Do not choose or perform work from conversational memory. If an earlier artifact fails or conflicts, first set `CURRENT_PHASE.txt` back to that earliest failing marker and update `progress.md` current-phase and earliest-failing fields to match; then continue there.

Implement UI only: routes, layouts, components, local UI state/interactions, styling, themes, and responsiveness. Do not implement backend, persistence, API, database, authentication, or business logic.

## Phase Ownership

| Phase | Runtime marker | Owns | Gate |
| --- | --- | --- | --- |
| 0 | `phase-0-source-contract` | fresh scaffold, repo/input contract, managed source discovery, reproduction contract | source acceptance at least `48/50` plus all critical items |
| 1 | `phase-1-ui-implementation` | ordered authored UI implementation | binary critical checklist `Pass` |
| 2 | `phase-2-integrity-responsive` | code/repo integrity plus managed paired responsive/theme Playwright proof | binary critical checklist `Pass` |
| 3 | `phase-3-playwright-signoff` | strict fidelity comparison, selective recapture/fix loops, adversarial/functional proof, final audit and completion | final visual at least `49/50`; desktop/mobile each at least `48/50`; every independent gate `Pass` |

Do not move work between phase owners. Phase 2 owns responsive/integrity browser evidence; Phase 3 owns final one-to-one fidelity and signoff.

## Runtime Artifacts

On a new run, keep all generated artifacts under `task-workflow/` and nowhere else:

- `task-workflow/CURRENT_PHASE.txt`, `task-workflow/progress.md`, `task-workflow/open-gaps.md`, and byte-identical `task-workflow/spec.json`;
- `task-workflow/phase-0-source-contract.md`, `task-workflow/phase-1-ui-implementation.md`, `task-workflow/phase-2-integrity-responsive.md`, and `task-workflow/phase-3-playwright-signoff.md`;
- `task-workflow/source-playwright/`, `task-workflow/source/`, `task-workflow/target-playwright/`, and `task-workflow/verification/`;
- `task-workflow/scripts/playwright-lifecycle.mjs`, `task-workflow/runtime/source/`, and `task-workflow/runtime/target/`.

Write every source full-page/section screenshot under `task-workflow/source/` and every implemented-target full-page/section screenshot under `task-workflow/verification/`.

Read target `AGENTS.md` and required repo instructions before any target-repo write. Then, before any implementation write, delete the target repo's existing `task-workflow/` directory completely. Make that reset and fresh reseed the first target-repo write. Recreate only the four phase templates, empty source/target evidence, script, and runtime roots, verbatim `spec.json`, marker, progress, open-gaps, and byte-identical lifecycle helper listed above.

Treat every old `task-workflow/` artifact, image, script, log, gap, score, and decision as contaminated prior-run state: do not reuse, copy forward, cite, or infer from it. Copy the supplied design JSON verbatim to `task-workflow/spec.json`; never normalize or silently mutate it. Generate no task artifact outside `task-workflow/`; this root is intentionally cleared by the next task using task-workflow. Record Phase 0 evidence that reset/reseed was the first target-repo write and that no implementation file changed before Phase 1 began.

## Continuation And Evidence

Keep `progress.md` current at every phase start, meaningful Phase 1 packet, gate, blocker, and promotion. Track current/earliest failing phase, last gate, sole next action, active files, current artifact/reference, and phase artifact index/status. Treat `CURRENT_PHASE.txt` as a resume pointer, not proof.

Before promotion, reopen the phase artifact. Require `Decision: Pass`, every critical row passing, no required placeholder, complete evidence, and a written promotion lock. Set the next marker before starting its work, load its references, and update `progress.md`.

Keep `open-gaps.md` current with separate route/state, page section, visible mismatch, severity, status, owner/next fix, source evidence, and target evidence fields. The first real Phase 2 comparison must replace Phase 0’s fresh `None` row with mismatches or explicit route/section comparison evidence.

Do not replace required evidence tables with prose or remove rows/columns needed for auditability.

## Reproduction And Adaptation Policy

- Match accepted source evidence one-to-one wherever evidence exists.
- For an omitted breakpoint or theme state, extrapolate conservatively from the source visual system, `spec.json`, and target tokens.
- Correct objective layout failures at unrepresented sizes: overlap, clipping, cutoff, wrong overflow, accidental page scroll, horizontal canvas overflow, unusable controls, and blank lower-sidebar regions.
- Reproduce source themes. If the source lacks a theme that the target already exposes, conservatively derive it and verify readability/contrast without inventing another visual direction.
- Do not add a theme switch unless the target requires one.
- Never invent routes, product content, product behavior, backend logic, business logic, or an alternate visual direction.
- Use the real repo logo when available. Disable navigation without an accepted destination.

## Forbidden Shortcuts

Do not use a presentation, gallery, poster, design-board, showcase, or device-frame wrapper. Do not use `srcDoc`, `object`, `embed`, `webview`, injected/raw source HTML, a runtime source viewer, or any source HTML runtime dependency.

## Lifecycle Contract

Use only the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` helper. Keep source and target scripts, evidence, ports, and runtime logs separate. Use real input, deterministic waits, bounded commands, and clean Node processes.

Never advocate or use `pkill -f`, `disown`, `nohup`, fixed sleeps, blind reruns, repeated manual server loops, arbitrary port sweeping, or browser downloads. Start targeted readiness/command timeouts at `15000`–`20000` ms. Diagnose logs, readiness, URL, page state, console, network, inputs, and selectors before extension. Permit one `60000` ms retry only after a timer-only quiet failure and recorded clean triage; never exceed `120000` ms for one targeted script.

Read [references/playwright-lifecycle.md](references/playwright-lifecycle.md) in Phases 0, 2, and 3, [references/phase-0-source-contract.md](references/phase-0-source-contract.md) in Phase 0, [references/phase-1-2-ui-integrity.md](references/phase-1-2-ui-integrity.md) in Phases 1–2, and [references/phase-3-playwright-signoff.md](references/phase-3-playwright-signoff.md) in Phase 3.

## Literal-Final Completion Command

After Phase 3’s scored gate passes, fully populate its compact final audit, exact command/source, and proof the command has not run early. Mark the audit `Decision: Pass`, update `progress.md` so the exact command is the sole next action, and read both files back.

The task instructions provide the exact completion command. Its expected shape is:

```bash
node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary of what was done>"
```

Never synthesize or guess project/task identifiers. Use the exact command supplied by the task instructions.

Run the exact task completion command as the literal final tool action. Do not write its result afterward. Do not perform any read, write, browser/server command, check/test, implementation action, or other tool action after it. Respond directly from the command result.
