# Visual Verification

Use this reference for implementation grading and final signoff.

The purpose is to compare the working target app against the source screenshots, not merely prove that the target loads.

## Main Loop

1. Start the target app using the repo's normal command.
2. Capture target screenshots matching every source inventory row.
3. Capture focused section screenshots or crops for every source-listed page section that cannot be judged reliably from the full viewport.
4. Compare source and target route by route, state by state, and section by section.
5. Update `design/implementation-review.md`.
6. Update `design/implementation-open-gaps.md`.
7. Fix mismatches.
8. Rerun from a clean Playwright process.
9. Rescore.

Five to ten passes are normal. More are acceptable. Do not stop while ordinary drift remains.

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
- every source-listed page section, either through full-viewport evidence or a focused section crop

## Implementation Score

Score `design/implementation-review.md` against 50 items:

- 8 route coverage items
- 8 interaction fidelity items
- 8 layout and scale items
- 8 styling-system items
- 6 mobile fidelity items
- 6 component-state items
- 6 artifact and verification discipline items

Critical failures:

- target app does not boot
- missing primary route
- missing mobile implementation
- missing source interaction family
- target app depends on the provided source HTML file at runtime to render the product UI
- static imitation of a visible interactive control
- target is wrapped in a presentation/gallery shell
- obvious typography, spacing, surface, or component styling drift on ordinary UI
- missing or failing page-section review row for any visible source section
- `design/implementation-open-gaps.md` has unresolved ordinary drift
- required review tables have been replaced by prose

Pass gate:

- every critical item passes
- score is at least `48/50`
- final desktop and mobile screenshots exist
- every source inventory row has target evidence
- every source-listed page section has target evidence and a passing section-review row
- open gaps contain no unresolved ordinary drift

## Comparison Checklist

For each route/state row compare:

- same route or state exists
- same navigation and reach path
- same shell ownership
- same major regions and proportions
- same section order
- same headings and control labels
- same data density
- same typography hierarchy and weight
- same surface/background/chrome roles
- same border strength
- same radius language
- same shadow/contact treatment
- same accent/status color roles
- same button/input/chip/tab styling
- same dialog/drawer/menu geometry
- same table/list row rhythm
- same mobile stacking and above-the-fold priority
- same real interaction behavior

If the layout is close but styling reads like a different design system, the row fails.
If styling is close but a source state is missing or fake, the row fails.

## Page Section Review

Every visible section from `design/source-inventory.md` must have a matching row in the `Page Section Review` table in `design/implementation-review.md`.

For each section compare:

- section exists in the target
- section sits in the same route/state and relative order
- section proportions match
- internal spacing and density match
- headings, labels, and action placement match
- component styling matches
- borders, radius, shadows, and surface tone match
- interactive controls in the section behave like the source
- mobile behavior matches when the section appears on mobile

Section rows fail independently from route rows. A route cannot pass if any ordinary section in that route fails.

## Open-Gaps Discipline

`design/implementation-open-gaps.md` is the blocking ledger.

Each unresolved gap must include:

- route or state
- page section when applicable
- source reference
- target reference
- visible mismatch
- severity
- next fix
- resolved status

Do not replace the table with prose. When ordinary gaps are resolved, keep the template's explicit `None | n/a | ...` row.

The first real comparison pass is not allowed to declare the ledger empty. If it appears empty, run the adversarial pass first and document why no blocking differences were found.

## Scale Calibration

After the first complete desktop and mobile screenshots, explicitly inspect:

- shell width and page margins
- navigation item height and icon size
- header height and control sizes
- primary surface proportions
- row heights
- table/list density
- dialog/drawer dimensions
- mobile header, nav, row, card, and action density

Make at least one deliberate scale/polish pass unless the match is already extremely tight and the review explains why.

## Adversarial Pass

After the target seems done:

1. Hide optimism.
2. Find at least five possible mismatches.
3. Check each against source screenshots.
4. Fix true mismatches.
5. Record non-blocking suspected differences with concrete reasoning.

The adversarial pass must include mobile and at least one interaction state.

## Functional Checks

Visual fidelity is not enough. Exercise source-matched controls with real user input:

- click tabs
- type in search/filter inputs
- open and close dialogs/drawers
- open menus
- select rows/cards
- use mobile navigation
- submit or trigger visible form actions when present

Record at least one functional proof screenshot per interaction family.
