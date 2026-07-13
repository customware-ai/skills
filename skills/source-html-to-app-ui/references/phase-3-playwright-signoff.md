# Phase 3: Playwright Signoff

## Managed Target Loop

Enter only after Phase 2 passes. Reuse the current valid Phase 0/2 source corpus and Phase 2 target evidence. Do not recapture unchanged valid evidence. After a fix, recapture every invalidated route/state/viewport/section pair through managed Playwright using `task-workflow/target-playwright/`, a target-only port, `task-workflow/verification/`, and `task-workflow/runtime/target/`; recapture source evidence only when its corresponding evidence is missing or invalid.

Compare source and target full images and every visible section image side by side and row by row. Test source-represented viewports plus desktop, tablet, mobile, and short-height desktop when relevant. Fix and rerun until ordinary mismatch, responsive failure, and theme failure are gone. Each rerun requires a material fix or diagnostic change.

Confirm Phase 2's first real comparison replaced Phase 0's fresh `None` gap row with mismatch rows or explicit route/section comparison evidence. If it did not, return to Phase 2 before continuing.

## Non-Compensating Proof

Independently pass layout, style, route, state, interaction, desktop, mobile, responsive, and theme fidelity. No overall score compensates for any failed independent gate.

When a sidebar exists, use real scroll input and a forced-overflow short-height desktop. Prove document non-scroll ownership, content `scrollTop` movement when overflow exists, stable sidebar bounds, shell/sidebar viewport-height coverage, and no blank lower-sidebar region in a post-scroll screenshot. Permit `N/A` only for content movement after a genuine forced-overflow attempt cannot create overflow; geometry remains mandatory.

For each mobile drawer, separately prove real open input, real close input, full-viewport geometry, overlay presence, overlay interception, body/document lock while open, scroll restoration after close, and open/close screenshots.

## Adversarial And Functional Proof

Check at least five serious suspected mismatches against source-target evidence. Fix true mismatches and defend only genuine non-blocking differences. Exercise every visible interaction family with real input, including mobile. Audit target scripts for fixed waits.

Save `task-workflow/verification/final-desktop.png` and `task-workflow/verification/final-mobile.png`.

Score final visual proof against one overall `50`-item rubric. Apply the same category totals separately to Desktop and Mobile in the viewport table, with passed/total/evidence values that independently total `50` for each viewport. Pass only overall at least `49/50`, desktop at least `48/50`, mobile at least `48/50`, every independent gate `Pass`, every explicit critical row `Pass`, every paired route/state/section row passing, at least five serious mismatch checks complete, every visible interaction family proved through real input, current final screenshots present, lifecycle/fixed-wait/timeout evidence passing, and no ordinary open gap.

## Final Audit And Completion

After the visual gate passes, complete the compact final audit in the Phase 3 artifact. Confirm Phase 0 numeric gate, Phase 1/2 binary gates, Phase 3 evidence, artifacts, fixed-wait/lifecycle/timeout proof, gap ledger, final diff, UI-only scope, shortcut bans, responsive/theme proof, and exact completion command.

Record proof the command has not run early. Set `progress.md` so the command is the sole next action. Mark audit `Decision: Pass`, then read back Phase 3 and progress.

Use the exact command supplied by the task instructions. The expected shape is `node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary of what was done>"`. Never synthesize or guess identifiers.

Run the exact completion command as the literal final tool action. Do not write its result or run any tool afterward.
