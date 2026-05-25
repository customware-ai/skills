# Visual Verification

Use this reference for Phase 6, Phase 7, and final signoff.

The purpose is to prove parity against the accepted source corpus, not merely to prove that the target app loads.

Do not enter this reference's workflow until the separate implementation-integrity gate has already passed in writing.

Read `references/playwright-interactive.md` first. In this phase, `Playwright` means standalone interactive Node.js Playwright scripts for the target app, not the repo's normal Playwright E2E testing flow.

Phase 6, Phase 7, and signoff are internal verification gates, not user confirmation points. If the scores pass, continue automatically. If the scores fail, fix the code, rerun the scripts, rescore, and keep looping automatically.

## Main Verification Loop

1. Start the target app using the repo's normal command.
2. Write and run dedicated target verification scripts.
3. Capture target screenshots matching every accepted source route/state row.
4. Capture focused target evidence for every accepted source section that cannot be judged well from the full viewport.
5. Compare source and target route by route, state by state, and section by section.
6. Update `design/implementation-review.md`.
7. Update `design/implementation-open-gaps.md`.
8. Fix mismatches.
9. Rerun the interactive Playwright scripts from a clean process.
10. Rescore.

Five to ten passes are normal. More are acceptable. Do not stop while ordinary visible drift remains.

## Required Evidence

Save target screenshots under `mocks/verification/`.

Required final files:

- `mocks/verification/final-desktop.png`
- `mocks/verification/final-mobile.png`

Also capture focused evidence for:

- shell/navigation
- header/context
- dominant workflow surface
- support/secondary modules
- each interaction family
- mobile above-the-fold
- every source-listed page section that needs a focused crop

## Phase 6 Score

Phase 6 uses `50` items:

- `8` route coverage items
- `8` interaction fidelity items
- `8` layout and scale items
- `8` styling-system items
- `6` mobile fidelity items
- `6` component-state items
- `6` artifact and verification-discipline items

Critical failures:

- target app does not boot
- missing primary route
- missing mobile implementation
- missing source interaction family
- target app depends on the provided source HTML file at runtime
- static imitation of a visible interactive control
- target is wrapped in a presentation or gallery shell
- obvious typography, spacing, surface, or component styling drift on ordinary UI
- missing or failing page-section review row for any visible source section
- unresolved ordinary drift remains in `design/implementation-open-gaps.md`
- required review tables have been replaced by prose

Pass gate:

- every critical item passes
- score is at least `49/50`
- desktop fidelity score is at least `48/50`
- mobile fidelity score is at least `48/50`
- final desktop and mobile screenshots exist
- every source route/state row has target evidence
- every source-listed page section has target evidence and a passing section-review row
- `design/implementation-open-gaps.md` has no unresolved ordinary drift

If the score is below `49/50`, stay in the verification loop.
If desktop fidelity is below `48/50`, fix the desktop implementation, rerun the scripts, and rescore.
If mobile fidelity is below `48/50`, fix the mobile implementation, rerun the scripts, and rescore.
If one viewport passes and the other fails, the phase still fails.

## Comparison Checklist

For each route/state row compare:

- same route or state exists
- same navigation and reach path
- same shell ownership
- same major regions and proportions
- same section order
- same headings and labels
- same data density
- same typography hierarchy and weight
- same surface and chrome roles
- same border strength
- same radius language
- same shadow or contact treatment
- same accent and status roles
- same control styling
- same dialog, drawer, and menu geometry
- same table or list rhythm
- same mobile stacking and priority
- same real interaction behavior

If structure is close but styling reads like a different design system, the row fails.
If styling is close but source states are missing or fake, the row fails.

## Page Section Review

Every visible section from `design/source-inventory.md` must have a matching row in the `Page Section Review` table in `design/implementation-review.md`.

For each section compare:

- section exists
- section sits in the same route/state and relative order
- section proportions match
- internal spacing and density match
- headings, labels, and action placement match
- component styling matches
- borders, radius, shadows, and surface tone match
- interactive controls behave like the source
- mobile behavior matches when visible on mobile

Section rows fail independently from route rows. A route cannot pass if any ordinary section in that route fails.

## Open-Gaps Discipline

`design/implementation-open-gaps.md` is the blocking ledger.

Each unresolved gap must include:

- phase
- route or state
- page section when applicable
- source reference
- target reference
- visible mismatch
- severity
- next fix
- resolved status

Do not replace the table with prose.

The first real comparison pass is not allowed to declare the ledger empty. If it appears empty, run the adversarial pass first and explain why no blocking differences were found.

## Phase 7: Adversarial And Functional Proof

After the UI seems done:

1. Hide optimism.
2. Find at least five serious possible mismatches.
3. Check each against source evidence.
4. Fix true mismatches.
5. Defend only real non-blocking differences.
6. Exercise each interaction family with real user input.
7. Capture at least one proof screenshot per interaction family.
8. Include mobile in the pass.

Phase 7 uses `20` points:

- `8` adversarial-search points
- `8` functional-proof points
- `4` artifact-discipline points

Critical failures:

- fewer than five serious suspected mismatches were checked
- a checked mismatch is ignored without resolution or defense
- an interaction family lacks functional proof
- mobile is not included

Pass gate:

- every critical item passes
- score is at least `19/20`

## Signoff Rule

Verification is complete only when all of the following pass together:

- Phase 6 score gate
- desktop fidelity gate
- mobile fidelity gate
- page-section review gate
- open-gaps gate
- Phase 7 adversarial gate

A generally good-looking page is never enough to pass.
