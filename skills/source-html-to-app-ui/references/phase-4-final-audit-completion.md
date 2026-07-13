# Phase 4: Final Audit And Completion

This reference is mandatory whenever `CURRENT_PHASE.txt` equals `phase-4-final-audit-completion`.

## Final Audit Authority

<final_audit_authority>

Phase 4 does not assume earlier phases were honest or correct. It reopens and audits their evidence before unlocking completion. Build/check success is only one audit row. It can never unlock the completion command when paired, opened, section-level Playwright evidence is missing, target-only, or stale.

The completion command is irreversible external signaling: it tells the system and user that the approved product UI is finished. Calling it with weak, stale, fabricated, or contradictory evidence can deliver a broken project and put the user's job at risk. It is do-or-die. Do not call completion because the build passes, screenshots exist, the task has taken a long time, or the Agent wants to stop.

Phase 4 is an evidence validator, not a routine rerun phase. Reuse current valid evidence. Return to the owning phase when evidence is absent, stale, contradicted, or invalidated.

</final_audit_authority>

## Entry Conditions

Before Phase 4 work:

- marker is `phase-4-final-audit-completion`;
- Phase 0 scores at least `48/50` and says `Decision: Pass`;
- Phase 1 scores at least `48/50` and says `Decision: Pass`;
- Phase 2 scores at least `48/50` and says `Decision: Pass`;
- Phase 3 overall scores at least `49/50`, desktop/mobile each at least `48/50`, and says `Decision: Pass`;
- every prior promotion lock exists;
- no critical open gap exists.

If any condition fails, reset the marker and progress ledger to the earliest failing phase and repair it.

## Artifact Integrity Review

<artifact_integrity_review>

Reopen every required artifact:

| Artifact | Audit |
| --- | --- |
| `CURRENT_PHASE.txt` | correct final marker |
| `progress.md` | current pointers, last gate, exact next action |
| `open-gaps.md` | no critical/ordinary open or stale gap; no placeholder |
| `spec.json` | still byte-identical to design input |
| Phase 0 | current source corpus, complete contract, threshold and critical pass |
| Phase 1 | complete implementation mapping, threshold and critical pass |
| Phase 2 | paired responsive corpus, checks, threshold and critical pass |
| Phase 3 | image comparisons, repairs, independent gates, scores, final images |

For each phase artifact, verify:

- file exists;
- decision is `Pass`;
- score meets threshold;
- every required row contains concrete evidence;
- every cited path exists;
- screenshots cited as visual proof were opened and compared;
- evidence is current after the last relevant code change;
- no contradiction exists with another artifact or gap row;
- promotion lock was written after gate evidence.

Do not audit by searching only for the word `Pass`. Read the evidence rows.

</artifact_integrity_review>

## Evidence Freshness Audit

For the last implementation change, identify which routes, states, sections, themes, and viewports it could affect. Confirm every affected target image and browser measurement was recaptured afterward.

Confirm:

- source images remain valid and correctly paired;
- target images are newer than their invalidating changes;
- final desktop/mobile images represent the final code;
- every final score point maps to an evidence row;
- desktop and mobile scores were evaluated independently;
- no screenshot was merely captured without being opened;
- no full-page image substitutes for unreadable section proof;
- sidebar and drawer evidence is present when those components exist.

If evidence freshness cannot be proved, return to Phase 2 or 3 as appropriate.

## Final Diff And Scope Audit

Inspect the complete target diff and connected source files.

Pass only when:

- changes are authored UI and workflow artifacts only;
- no backend, API, database, persistence, auth, or business logic was introduced;
- no source HTML runtime dependency or forbidden wrapper exists;
- no lifecycle helper modification exists;
- no workflow artifact was generated outside `task-workflow/`;
- no lint/check configuration was weakened merely to hide errors from skill/workflow files;
- no debug logging, temporary server code, or manual process workaround remains;
- target-required checks/build evidence is current after the last invalidating code change;
- routes, content, behavior, and styling remain source-backed.

## Completion Command Lock

<completion_command_lock>

Copy the exact completion command from the task instructions. Never synthesize identifiers.

The command is forbidden unless the preceding Phase 0 source Playwright proof, Phase 2 paired responsive proof, and Phase 3 section-by-section fidelity proof are all current and passing. The task instructions may require build/check, but those commands are not an alternate completion gate. A browser failure is a failed audit item, not permission to skip visual proof.

Record in the Phase 4 artifact:

| Required proof | Evidence |
| --- | --- |
| Exact command source | task instruction path or prompt |
| Exact literal command | complete command with supplied identifiers |
| Not run early | build-log/tool-history or artifact evidence |
| Every previous gate valid | artifact integrity audit rows |
| Sole remaining action | `progress.md` exact next action |
| No later tool action planned | explicit lock |

Do not run completion while any other read, write, check, build, browser, server, or repair action remains.

</completion_command_lock>

## Phase 4 Gate

<phase_4_gate>

### Scorecard

| Category | Points |
| --- | ---: |
| Artifact integrity and cross-phase consistency | 12 |
| Evidence existence, inspection, and freshness | 12 |
| Gap, responsive, sidebar, drawer, and theme closure | 8 |
| Final diff, UI-only scope, and shortcut audit | 8 |
| Exact completion command lock and final-response readiness | 10 |
| **Total** | **50** |

Required score: exactly `50/50`.

### Non-Compensating Critical Items

Every item must pass:

- all prior artifacts were reopened and audited row by row;
- all prior scores and critical gates remain valid;
- marker, progress, gaps, artifacts, images, and diff agree;
- every cited visual proof exists, is current, and was opened;
- paired route/state/section evidence remains complete;
- final desktop/mobile images are current and inspected;
- sidebar, drawer, responsive, interaction, and theme proof remains valid when applicable;
- no ordinary or critical open gap, stale gap, or placeholder remains;
- final diff is UI-only and contains no forbidden shortcut or helper modification;
- target-required checks/build evidence is current;
- exact completion command was copied from the task instructions and has not run early;
- the completion command is the sole remaining action;
- no tool action is planned after completion.

### Final Lock Procedure

1. Complete every Phase 4 audit table.
2. Set score to `50/50` only from concrete evidence.
3. Set every critical item to `Pass`.
4. Set `Decision: Pass` and write the completion lock.
5. Update `progress.md` so the exact command is the sole next action.
6. Read back Phase 4 and `progress.md`.
7. Run the exact completion command as the literal final tool action.
8. Do not run any tool afterward.
9. Respond directly from the command result.

If any step before command execution fails, return to the earliest owning phase. Do not call completion and do not produce a completion-style response.

</phase_4_gate>
