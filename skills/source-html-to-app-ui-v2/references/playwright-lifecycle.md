# Managed Playwright Lifecycle

Use the provided lifecycle helper to own server startup, readiness, browser command execution, logs, and cleanup. Do not
start a second manual server around the same packet.

## Command shape

```bash
node .agents/skills/source-html-to-app-ui/assets/scripts/playwright-lifecycle.mjs \
  --server "<server command>" \
  --ready-url "<health or page URL>" \
  --runtime-dir "<task-owned runtime directory>" \
  --run "node <playwright packet>" \
  --env KEY=value
```

Use separate runtime directories and ports for source and target runs. Give every run a bounded timeout and preserve the
helper-owned logs when it fails.

## Source packets

A source packet must confirm that it reached the expected document and that useful visible content exists. Capture page
errors, console errors, failed requests, final URL, viewport, and image paths in its output.

Source diagnostics are descriptive. Do **not** assert that source page or console error arrays are empty. The reference
may have broken scripts, unavailable remote fonts, or interactions that never bind. If it renders enough to communicate
the approved design, capture the useful views and continue. Do not edit the source or filter diagnostics to pretend it
is error-free.

If a source interaction fails, inspect its declaration and capture another reachable view only when it adds necessary
visual information. Do not repeatedly retry the same unchanged source failure.

## Target packets

Target verification is strict. Packets must fail on:

- target page or console errors;
- failed same-origin target requests;
- missing required controls or content;
- interaction results that do not reach their expected visible state;
- accidental document-level horizontal overflow;
- missing screenshots or measurements required by the current verification.

Use observable conditions such as locators, URLs, responses, and geometry. Do not use fixed sleeps to hide readiness or
interaction problems.

## Failure triage

1. Read the helper's command and server logs.
2. Decide whether the failure belongs to the source reference, target implementation, packet, or environment.
3. Record source defects and continue when the design remains understandable.
4. Repair target, packet, or environment failures at their owner and rerun only the affected verification.
5. Preserve previously valid implementation and evidence unless the change actually invalidated them.
