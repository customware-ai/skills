# Phase 0: Source Contract

## Instruction-First Scaffold

Before the first target-repo write, read target `AGENTS.md` and every task-relevant instruction it requires. Confirm mode, target repo, source HTML path, and design JSON path. Use task-one delivery mode by default; use validation only for an explicitly requested throwaway target.

After instruction loading and before any implementation write, delete the existing target-repo `task-workflow/` directory completely. Make this deletion plus fresh reseed the first target-repo write packet. Recreate only the four phase templates, empty approved evidence/script/runtime roots, verbatim `task-workflow/spec.json`, `CURRENT_PHASE.txt`, `progress.md`, `open-gaps.md`, and the unchanged lifecycle helper.

Do not reuse, copy forward, cite, or infer from an old task-workflow artifact, image, script, log, gap, score, or decision. Record readback/diff evidence that the reset/reseed was the first target-repo write and no implementation file changed before Phase 1 began. Copy design JSON byte-for-byte to `task-workflow/spec.json` and prove identity. Keep every generated task artifact inside `task-workflow/`.

Inspect and record target routes, layouts, theme/tokens, shared primitives, checks/builds, and required docs before planning implementation. Select direct-file or managed-server source launch and explain why it preserves routes, assets, scripts, state, themes, and interaction behavior.

## Managed Source Discovery

Use `task-workflow/source-playwright/`, a source-only port, `task-workflow/source/`, and `task-workflow/runtime/source/`. Use real input to discover every:

- route and state-only view;
- visible section and interaction family;
- desktop/mobile state and source-represented viewport;
- dialog, menu, drawer, form, selection, filter, tab, empty/loading/success/warning/disabled state;
- source theme and source theme behavior;
- shell/sidebar scroll owner, sidebar stability, viewport-height behavior, and mobile drawer behavior.

Record exact reach steps and screenshot paths. Audit every source browser script for fixed waits; use deterministic waits instead.

## Reproduction Contract

Create one auditable contract covering:

- one-to-one source-backed routes, states, sections, interactions, layouts, styling, themes, desktop, and mobile behavior;
- responsive states the source omits but target safety requires;
- target-exposed themes omitted by source, conservatively derived from source visuals, `task-workflow/spec.json`, and tokens;
- objective layout corrections required at unrepresented sizes;
- explicit exclusions: invented routes/content/behavior, backend/business logic, and alternate design direction.

Source HTML remains discovery-only. Do not infer a route/state/scroll/theme contract from raw source code without interactive evidence.

## Source Acceptance

Score `50` items: route coverage `10`, state/interaction coverage `10`, desktop evidence `10`, mobile evidence `10`, section/behavior/theme contract `10`.

Pass only at least `48/50` plus every critical item. Critical failures include a stale or partial reset, reuse of prior-run state, missing first-write/no-early-implementation proof, missing inputs/spec identity/instruction evidence/target inspection/launch rationale, missing route/state/section/interaction/mobile evidence, broken paths, unclear reach steps, missing source scroll/drawer/theme contract, missing fixed-wait audit, vague adaptation rules, or a contract that permits non-UI work or invention.

If any item fails, remain in Phase 0 and continue locally.
