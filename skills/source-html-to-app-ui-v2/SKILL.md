---
name: source-html-to-app-ui
description: Rebuild an approved source HTML design as a real, high-fidelity target UI. Use when source HTML is a visual reference—even if its scripts are incomplete or broken—and the finished target must provide correct responsive layout and interactions.
---

# Source HTML To App UI

## Objective

Build the approved product experience as a normal target application with real routes, components, styles, assets, and
local UI state. Match the source's visible content, hierarchy, layout, styling, responsive behavior, and intended
interactions.

The source HTML is a **design reference**, not a runtime dependency or executable acceptance test. Its JavaScript may be
incomplete or broken. Source runtime correctness never blocks implementation when the approved design can still be
understood from rendered output, HTML/CSS, design metadata, or declared handlers.

The target application is the acceptance boundary. Do not reuse the source HTML at runtime.

## Required interpretation

- Keep the approved source HTML and design JSON immutable.
- Use source screenshots for visual understanding, then use HTML/CSS and design JSON for exact values such as content,
  colors, spacing, typography, breakpoints, and component structure.
- Treat source JavaScript and handlers as descriptions of intended behavior. Implement that behavior correctly in the
  target even when it cannot be exercised in the source.
- Record source errors briefly. Do not repair the approved source, suppress its errors to manufacture a passing source
  test, or repeatedly rerun an unchanged failing interaction.
- Do not turn source discovery into a test of every DOM node, section, intermediate state, or viewport. Capture only the
  evidence needed to understand the design.
- Do not create phase scores, progress ledgers, gap ledgers, evidence matrices, or restart loops. Use a short working note
  only when the task is large enough to need one.

## Workflow

### 1. Understand the inputs

Read the task, approved HTML, design JSON, and relevant target repository instructions. Inspect the target architecture
early enough to plan a native implementation; there is no source-only lock.

Identify:

- distinct page-like surfaces and navigation destinations;
- visible desktop and mobile structure;
- important content, assets, visual tokens, and responsive changes;
- intended interactions and states declared by controls, markup, or source handlers;
- target files that should own the implementation.

### 2. Capture bounded source evidence

Use the managed lifecycle helper described in
[references/playwright-lifecycle.md](references/playwright-lifecycle.md).

Normally capture:

- one desktop and one mobile full-page image of the initial surface;
- one additional image for each distinct page, modal, drawer, or materially different state needed to understand the
  approved experience.

Do not capture separate images for every section when the full-page image already shows them. Do not repeat equivalent
states. Once the approved visual system and intended surfaces are understood, stop inspecting the source and implement
the target.

#### Broken source behavior

If the source returns the expected document and renders useful visual content, browser page errors, console errors,
failed remote fonts, and broken source interactions are **non-blocking source findings**. Preserve their diagnostics in
the capture output and continue.

When an intended state cannot be reached:

1. inspect the relevant HTML, CSS, design metadata, and handler declarations;
2. infer the intended user-visible result;
3. implement and verify that result in the target.

Block only when the available source and design inputs are insufficient to determine the approved UI. State the exact
missing design information instead of entering a retry loop.

### 3. Implement the target

Build the smallest target-native implementation that completely represents the approved experience.

- Preserve the target stack and existing architecture.
- Reuse real repository brand assets when required.
- Implement navigation and interactions with real target state and events.
- Keep the task UI-only unless the task explicitly requires backend work.
- Fix source defects in the target behavior rather than reproducing them.
- Preserve unrelated target behavior and files.

Work in coherent implementation packets. Read back changed owners and run relevant checks after meaningful changes, not
after every small edit.

### 4. Verify the target

Read [references/target-verification.md](references/target-verification.md) and verify the actual target application.

Required evidence:

- repository build and check commands required by the task pass without errors or warnings;
- target desktop and mobile views match the approved visual reference;
- all required target interactions work through real user input;
- target browser console and page errors are empty;
- responsive layout has no accidental clipping or horizontal page overflow.

Compare against the bounded source captures. Recapture the source only when the approved input changed or a genuinely
missing visual detail cannot be resolved from the existing capture and source files.

### 5. Complete

Review the final target diff, confirm task scope, and run the exact task-completion command once as the final step.

## Failure rules

- A **source defect** is evidence about the reference, not a target failure.
- A **target defect** must be repaired and reverified.
- A **lifecycle/environment failure** may be repaired and rerun without resetting otherwise valid work.
- A mistaken workflow action should be corrected in place. Do not delete completed implementation or restart the entire
  task merely to recreate procedural history.
- Never claim a command, browser check, screenshot comparison, or interaction was completed unless it was actually run.

## Assets

The managed lifecycle helper is available at:

`/workspace/development/.agents/skills/source-html-to-app-ui/assets/scripts/playwright-lifecycle.mjs`
