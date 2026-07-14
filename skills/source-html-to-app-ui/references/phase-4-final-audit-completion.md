# Phase 4: Final Audit And Completion

This reference is mandatory whenever `CURRENT_PHASE.txt` equals `phase-4-final-audit-completion`.

## Phase Authority

<phase_authority>

Phase 4 does not assume earlier phases were honest or correct. It reopens and audits their evidence before unlocking completion. Build/check success is one audit row and can never substitute for paired, opened, section-level Playwright evidence.

The Agent plans, reviews, and scores Phase 4 directly from reopened artifacts, current images, lifecycle evidence, the complete target diff, gap reconciliation, and the exact task completion command. Do not create or use scripts for audit review, phase scoring, completion unlock, or promotion. The task completion command itself is the only completion operation.

Calling completion with weak, stale, fabricated, target-only, or contradictory evidence can ship a visibly broken project and put the user's job at risk. Do not complete because the build passes, screenshots exist, the task took a long time, or the Agent wants to stop.

</phase_authority>

## Entry Conditions

Before Phase 4 work:

- `CURRENT_PHASE.txt` says `phase-4-final-audit-completion`;
- Phase 0 scores at least `48/50` and says `Decision: Pass`;
- Phase 1 scores at least `48/50` and says `Decision: Pass`;
- Phase 2 scores at least `48/50` and says `Decision: Pass`;
- Phase 3 overall scores at least `49/50`, desktop/mobile each at least `48/50`, and says `Decision: Pass`;
- every prior promotion lock exists;
- no critical or ordinary open gap exists;
- the Agent has reread `SKILL.md`, this reference, Phase 4's artifact, `progress.md`, and `open-gaps.md`.

If any condition fails, return the marker and ledger to the earliest failing phase, repair and repass it, then re-enter Phase 4.

## Model-Owned Audit Packet Loop

Use four auditable packets in order:

1. cross-phase artifact integrity;
2. evidence existence, inspection, pairing, and freshness;
3. final diff, UI-only scope, and open-gap reconciliation;
4. exact completion-command lock and literal-final readiness.

Before each packet, record:

- exact artifacts, evidence, images, diff paths, or command source under review;
- the claims the packet must prove;
- stale/contradictory conditions that would send work back to an earlier phase;
- the one expected audit decision.

Then:

1. reopen every declared input completely;
2. inspect evidence rows, cited paths, images, and current state—not only `Pass` labels;
3. record contradictions, stale evidence, missing proof, and affected owning phase;
4. mark every packet-review row `Pass` or `Fail`;
5. if any row fails, return to the earliest owning phase, repair and repass forward through every invalidated phase;
6. re-enter Phase 4 and repeat the failed audit packet;
7. begin the next packet only when every row passes.

### Audit Packet Review Checklist

| Required review | Pass condition |
| --- | --- |
| Complete reopening | every declared artifact/evidence input was read or opened |
| Score integrity | arithmetic maps to concrete evidence and thresholds remain met |
| Critical integrity | every non-compensating item still passes independently |
| Cross-artifact consistency | marker, ledger, gaps, contracts, images, and diff agree |
| Evidence pairing | every visual claim has matching opened source-target proof |
| Evidence freshness | target proof is newer than every invalidating change |
| UI-only scope | final diff contains no forbidden behavior or shortcut |
| Gap reconciliation | no ordinary/critical/stale/placeholder gap remains |
| Completion safety | exact command is copied, unrun, and not unlocked early |

This checklist is an Agent review recorded in the Phase 4 artifact, never a script result.

## Artifact Integrity Packet

Reopen and audit:

| Artifact | Required proof |
| --- | --- |
| `CURRENT_PHASE.txt` | correct final marker |
| `progress.md` | current pointers, last gate, exact next action |
| `open-gaps.md` | no ordinary/critical/stale gap or placeholder |
| `spec.json` | still byte-identical to the design input |
| Phase 0 | current source corpus, complete contract, threshold/critical pass |
| Phase 1 | complete implementation mapping and packet reviews, threshold/critical pass |
| Phase 2 | paired responsive corpus and verification packet reviews, threshold/critical pass |
| Phase 3 | fidelity packet reviews, repairs, independent scores/gates, final images |

For every artifact verify existence, decision, score arithmetic, concrete rows, cited paths, image inspection, evidence freshness, cross-artifact consistency, and a promotion lock written after the gate evidence.

Searching for the word `Pass` is not an audit. Read the evidence rows.

## Evidence Freshness Packet

Identify every route, state, section, theme, viewport, interaction, and geometry claim affected by the last implementation change. Confirm:

- source evidence remains correctly paired;
- every affected target image/measurement was recaptured afterward;
- every gate-critical image was opened after its latest capture;
- final desktop/mobile images represent final code;
- desktop and mobile were evaluated independently;
- section images remain readable and are not replaced by an unreadable full-page image;
- sidebar/drawer/scroll proof remains current when applicable;
- every final score point maps to current evidence.

Missing or stale proof belongs to Phase 2 or 3. Return there, repair it, repass the affected phase, and then audit again.

## Final Diff And Scope Packet

Inspect the complete target diff and connected owners. Pass only when:

- changes are authored UI and workflow artifacts only;
- no backend/API/database/persistence/auth/business logic exists;
- no source HTML runtime dependency, wrapper, iframe, or raw injection exists;
- the lifecycle helper remains byte-identical;
- no task artifact exists outside `task-workflow/`;
- no lint/check configuration was weakened to hide errors;
- no debug code, temporary server code, or process workaround remains;
- required checks/build evidence is current;
- routes, sections, interactions, themes, content, assets, and styling remain source-backed;
- shell/sidebar/content scroll ownership remains structurally and visually proved.

Reconcile every resolved and open gap against the final diff and current source-target evidence.

## Completion Command Packet

Copy the exact completion command from the task instructions. Never synthesize identifiers.

Record:

| Required proof | Evidence |
| --- | --- |
| Exact command source | task instruction path or prompt |
| Exact literal command | complete command with supplied identifiers |
| Not run early | tool history/artifact evidence |
| Every previous gate valid | completed audit packet rows |
| Sole remaining action | `progress.md` exact next action |
| No later tool action planned | explicit completion lock |

Do not run completion while any read, write, check, build, browser, server, comparison, repair, or audit action remains.

## Phase 4 Model Gate

| Category | Points |
| --- | ---: |
| Artifact integrity and cross-phase consistency | 12 |
| Evidence existence, inspection, pairing, and freshness | 12 |
| Gap, responsive, sidebar, drawer, interaction, and theme closure | 8 |
| Final diff, UI-only scope, and shortcut audit | 8 |
| Exact completion command lock and final-response readiness | 10 |
| **Total** | **50** |

Required score: exactly `50/50`.

Every critical item must independently pass:

- every audit packet passed the model-owned review checklist;
- every prior artifact was reopened and audited row by row;
- every prior score, packet review, critical gate, and promotion lock remains valid;
- marker, ledger, gaps, contracts, images, evidence, and diff agree;
- every visual claim has current opened paired source-target proof;
- every route/state/section/interaction/theme/viewport remains complete;
- final desktop/mobile images are current and opened;
- responsive/sidebar/drawer/scroll proof remains valid when applicable;
- no ordinary, critical, stale, or placeholder gap remains;
- final diff is UI-only and contains no forbidden shortcut;
- required checks/build evidence is current;
- exact completion command was copied and has not run early;
- completion is the sole remaining action and no later tool action is planned.

The Agent calculates the score from audit evidence. Do not use a checker or unlock script. If any packet review or critical item fails, or the score is not exactly `50/50`, return to the earliest owning phase, repair, repass forward, and rerun the affected Phase 4 packet.

## Completion Lock

Before completion:

1. reopen Phase 4 and `progress.md`;
2. independently verify audit packet reviews, `50/50` arithmetic, and every critical row;
3. verify the exact command is the sole remaining action;
4. write `Decision: Pass` and the completion lock;
5. run the exact completion command as the literal final tool action;
6. do not run any tool afterward;
7. respond directly from the command result.

If any check before command execution fails, continue the repair loop. Do not call completion or produce a completion-style response.
