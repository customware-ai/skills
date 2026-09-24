# Target Verification

Verify the finished target application, not the runtime quality of the source reference.

## Static gates

- Run the task-required build command.
- Run the task-required check, lint, and typecheck commands.
- Treat warnings as failures when the task explicitly requires warning-free output.
- Do not weaken project checks or exclude task files merely to obtain a pass.

## Browser gates

Use managed Playwright packets with real user input to verify:

- each required route or page-like surface;
- primary navigation and workflow progression;
- forms, selections, calculations, modals, drawers, and other required interactions;
- desktop and mobile layout;
- short-height scrolling when the approved design has fixed or sticky regions;
- absence of target page errors, console errors, and accidental horizontal document overflow.

Capture one useful target image for each distinct surface or materially different state. Prefer a full-page image plus a
focused image only when the full-page capture cannot show the relevant detail. Do not create duplicate evidence.

## Visual comparison

Compare target captures to the approved source captures and source/design values. Check:

- content and information hierarchy;
- layout proportions, alignment, spacing, and density;
- typography, colors, borders, radii, shadows, and imagery;
- responsive stacking, navigation transformations, and scroll ownership;
- visible interaction results.

Repair material mismatches in the target and rerun only affected checks. Source JavaScript defects and unavailable
source-only network assets are not target failures.

## Completion

Review the final target diff for scope and unrelated changes. Run the exact task-completion command once, only after all
required target gates pass.
