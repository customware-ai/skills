# Progress Ledger

## Mandatory Resume Sequence

After compaction, resume, retry, reconnect, or a new coding session, read in this order before choosing work:

1. target `AGENTS.md` and every recorded binding target instruction;
2. exact task inputs, source HTML, and design JSON;
3. `.agents/skills/source-html-to-app-ui/SKILL.md`;
4. this `progress.md`;
5. `CURRENT_PHASE.txt`;
6. `open-gaps.md`;
7. earlier artifacts needed to identify the earliest failing phase;
8. the current or earliest failing phase artifact;
9. references mapped to that phase.

Do not act from conversation memory. If marker, ledger, gaps, and artifacts disagree, set the marker and this ledger back to the earliest failing phase before work.

## Current Phase Pointers

| Field | Value |
| --- | --- |
| Current phase marker | Pending |
| Current phase artifact | Pending |
| Current phase references | Pending |
| Earliest failing phase | Pending |
| Last completed gate | Pending |
| Sole next local action | Pending |
| Active files | Pending |
| External blocker | None |
| Last updated | Pending |

## Task And Binding Inputs

| Input | Exact path/value | Reloaded this session? |
| --- | --- | --- |
| Target repo and mode | Pending | No |
| Target `AGENTS.md` and required instructions | Pending | No |
| Task instructions | Pending | No |
| Source HTML | Pending | No |
| Design JSON | Pending | No |
| Byte-identical `task-workflow/spec.json` | Pending | No |
| Exact task completion command | Pending | No |

## Current Work Packet

| Owning phase | Contract/evidence scope | Active files | Last readback/result | Sole next action |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Phase Artifact Index

| Phase | Marker/status | Artifact | Required references | Gate |
| --- | --- | --- | --- | --- |
| 0 | `phase-0-source-contract` - Pending | `phase-0-source-contract.md` | `phase-0-source-contract.md`; `playwright-lifecycle.md` | at least `48/50` plus critical pass |
| 1 | `phase-1-ui-implementation` - Pending | `phase-1-ui-implementation.md` | `phase-1-ui-implementation.md` | at least `48/50` plus critical pass |
| 2 | `phase-2-paired-responsive-proof` - Pending | `phase-2-paired-responsive-proof.md` | `phase-2-3-playwright-fidelity.md`; `playwright-lifecycle.md` | at least `48/50` plus critical pass |
| 3 | `phase-3-fidelity-repair-signoff` - Pending | `phase-3-fidelity-repair-signoff.md` | `phase-2-3-playwright-fidelity.md`; `playwright-lifecycle.md` | overall `49/50`; desktop/mobile `48/50`; critical pass |
| 4 | `phase-4-final-audit-completion` - Pending | `phase-4-final-audit-completion.md` | `phase-4-final-audit-completion.md` | exactly `50/50` plus critical pass |

## Evidence Pointers

| Group | Path | Owning phase | Freshness/status |
| --- | --- | --- | --- |
| Source browser scripts | `task-workflow/source-playwright/` | 0/2 | Pending |
| Source screenshots | `task-workflow/source/` | 0/2/3 | Pending |
| Source runtime logs | `task-workflow/runtime/source/` | 0/2/3 | Pending |
| Target browser scripts | `task-workflow/target-playwright/` | 2/3 | Pending |
| Target screenshots | `task-workflow/verification/` | 2/3 | Pending |
| Target runtime logs | `task-workflow/runtime/target/` | 2/3 | Pending |
| Lifecycle helper | `task-workflow/scripts/playwright-lifecycle.mjs` | 0/2/3 | Pending |
| Gap ledger | `task-workflow/open-gaps.md` | all | Pending |

## Gate And Invalidation Ledger

| Event | Phase | Evidence invalidated | Marker correction required? | Repair/next action |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Final Completion State

This section may be completed only in Phase 4.

| Requirement | Value |
| --- | --- |
| Every phase decision/score | Pending |
| Open gaps | Pending |
| Final desktop/mobile evidence | Pending |
| Exact completion command | Pending |
| Sole next action | Pending |
| No later tool action planned | Pending |
