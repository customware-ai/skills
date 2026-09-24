# Progress Ledger

After compaction, resume, retry, or reconnect, reread the skill, this file, `CURRENT_PHASE.txt`, `open-gaps.md`, the current or earliest failing phase artifact and reference, and the task inputs needed for the next action. Do not act from conversation memory. If records disagree, return to the earliest failing phase.

## Current State

| Field | Value |
| --- | --- |
| Current phase marker and artifact | Pending |
| Earliest failing phase | Pending |
| Last completed gate or meaningful event | Pending |
| Sole next local action | Pending |
| Current packet or evidence record | Pending |
| External blocker | None |
| Last updated | Pending |

Update this resume pointer when the next action changes, evidence is invalidated, a gate is scored, or work resumes. Keep detailed inventory, image findings, and packet decisions in the owning phase's canonical evidence record, not here.

## Binding Inputs

| Input | Exact path/value |
| --- | --- |
| Target repository and UI-only boundary | Pending |
| Task prompt and approved source HTML | Pending |
| Approved design JSON and copied `spec.json` | Pending |
| Exact task completion command | Pending |

## Phase Decisions

| Phase | Artifact | Score/critical decision | Evidence record |
| --- | --- | --- | --- |
| 0 | `phase-0-source-contract.md` | Pending | `source/coverage.md` |
| 1 | `phase-1-ui-implementation.md` | Pending | Pending |
| 2 | `phase-2-paired-responsive-proof.md` | Pending | Pending |
| 3 | `phase-3-fidelity-repair-signoff.md` | Pending | Pending |
| 4 | `phase-4-final-audit-completion.md` | Pending | Pending |

Completion requires the exact task command only after every phase gate passes.
