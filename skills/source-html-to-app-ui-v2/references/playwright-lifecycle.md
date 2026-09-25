# Managed Playwright Lifecycle

This reference is mandatory in Phases 0, 2, and 3.

<evidence_boundary>
Use the lifecycle helper for source and target browser evidence. It owns the server, readiness, logs, bounded commands, and cleanup. Browser or server probes outside the helper do not count as evidence; repair and rerun only affected packets through the helper. Source inputs, skill resources, and task-workflow artifacts may be inspected before the first packet.
</evidence_boundary>

Read the relevant skill/reference instructions and inspect source inputs as needed to design accurate packets. Keep target implementation and asset research for Phase 1.

## Lifecycle Authority

<lifecycle_authority>

Use the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` copied from this skill's assets. It owns server startup, readiness, browser command bounds, logs, and PID-scoped cleanup. The command contract in this reference is complete. The helper may be inspected when needed, but the copied helper must remain byte-identical to the skill asset.

Lifecycle discipline protects evidence integrity. A stale server, wrong route, failed readiness probe, abandoned process, or modified helper can produce convincing but false screenshots. Use the helper so each screenshot has a known server, route, readiness result, log, and cleanup owner.

Do not edit the copied helper. Do not replace it with an Agent-authored approximation. Byte identity is a gate.

</lifecycle_authority>

## Required Source And Target Separation

| Concern | Source | Target |
| --- | --- | --- |
| Browser scripts | `task-workflow/source-playwright/` | `task-workflow/target-playwright/` |
| Images | `task-workflow/source/` | `task-workflow/verification/` |
| Runtime logs | `task-workflow/runtime/source/` | `task-workflow/runtime/target/` |
| Port | source-only | target-only |
| Ready URL | exact source URL | exact target URL |

Do not reuse one runtime directory or port for both sides. Do not infer source success from target success or vice versa.
The helper creates a unique subdirectory under each side's runtime and image base on every invocation. Capture scripts write images only under `process.env.CW_EVIDENCE_DIR`; the helper prints both generated paths and exposes its runtime path as `process.env.CW_LIFECYCLE_RUN_DIR`. Re-running the same packet cannot overwrite earlier logs or images.

## Helper Command Contract

Use the discovered source/target command values in this shape:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<bounded server command>" \
  --ready-url "<exact URL expected to return successfully>" \
  --runtime-dir "task-workflow/runtime/<source-or-target>" \
  --evidence-dir "task-workflow/<source-or-verification>" \
  --run "node task-workflow/<source-playwright-or-target-playwright>/<script>.mjs" \
  --ready-timeout-ms 15000 \
  --command-timeout-ms 20000
```

This is a short-probe example, not a fixed timeout for every script. Choose bounded values from the actual server startup and script work before running.

The first source browser command and first target browser command must establish helper ownership. Do not run browser scripts against an assumed or manually started server first.

For browser, server, readiness, runtime, or evidence commands, the helper is the only process owner. Do not manually start or background a server, use `nohup`, shell `sleep`, `curl`/`wget` probes, `pkill`, `lsof`, or broad process hunting. A manual process/probe/cleanup command is a hard lifecycle failure; stop the packet, record it, and rerun through the helper before scoring. The only `curl` exception is downloading an approved brand asset after Phase 0; it is never readiness or UI evidence.

There is no one-off diagnostic exception. A selector probe, animation investigation, computed-style read, console check, layout measurement, or screenshot reproduction is browser evidence work. Put it in a task-owned packet under `task-workflow/source-playwright/` or `task-workflow/target-playwright/`, keep its output under `task-workflow/`, and run it through the helper. Never write a browser script to `/tmp`, generate one with a shell heredoc or redirection, run a packet directly with `node`, or launch `chromium` outside the helper-run packet. These are hard failures even when the diagnostic is read-only and even when the next attempt uses the helper.

The first helper packet is the only browser-availability check. Never inspect `/ms-playwright`, `~/Library/Caches/ms-playwright`, `node_modules/playwright-core`, `browsers.json`, executable paths, browser revisions, `.runtime.logs`, or process/port state to decide whether Playwright works. Never use `ls`, `find`, `cat`, `ps`, `lsof`, or package/runtime probes for that purpose. If the helper packet fails, inspect only its runtime output and repair the bounded invocation or packet. These inspections do not substitute for managed browser evidence.

Source and target are sequential helper-owned lifecycles, not two manually managed simultaneous servers:

1. invoke the helper with the source server, source ready URL, source runtime directory, and source script;
2. let the helper stop and clean up the source server;
3. invoke the helper with the target server, target ready URL, target runtime directory, and target script;
4. let the helper stop and clean up the target server;
5. compare the saved source and target evidence after both runs.

For the first source orientation, open both desktop and mobile images and record a concrete finding for each before scoring Phase 0. No immediate next-tool-call ordering is required.

For equivalent interaction proof, use the same focused state and viewport plan in separate source and target helper runs. Do not keep both servers alive, create a dual-background-server command, or use process inspection to imitate lifecycle ownership.

The helper accepts multiple `--run` commands under one server start and writes a separate result log for each. Batch independent focused scripts that use the same source or target build; do not restart the server between them merely to create separate packets. The helper creates unique runtime and screenshot directories for each invocation. A later failed command stops the helper, but earlier screenshots with proven identity, state, framing, and lifecycle stay valid. Never combine source and target under one helper run or replace the helper with a manual server.

## Browser Script Rules

<browser_script_rules>

- Use Playwright's user-facing input APIs: locator/page `click`, `fill`, `selectOption`, `press`, `wheel`, drag, or touch as appropriate. Do not use `evaluate(() => element.click())`, `dispatchEvent(...)`, synthetic routing, direct handler calls, or DOM mutation to stand in for a real interaction. This includes assigning `el.value`, `el.checked`, or classes and then dispatching `input`, `change`, or click events. A browser-evaluated function may observe or measure state, but it may not create the state being evidenced. If a source action fails because of a source defect, record it without repairing or bypassing the approved source; implement and verify the intended behavior in the target. Diagnose and repair target action failures.
- Use deterministic waits tied to visible state, URL, DOM, response, or geometry.
- Before the helper invocation, review the current packet and remove every fixed-wait construct. The authored patch or focused diff can be this review; do not reread the same unchanged script solely for a second review. `page.waitForTimeout(`, `waitForTimeout(`, `setTimeout(`, `setInterval(`, shell `sleep`, arbitrary polling/timer settling, and catch/fallback code that suppresses a browser wait, navigation, screenshot, console, page-error, or assertion failure are forbidden. Browser packets must fail loudly: never use `.catch(() => ...)`, broad `try/catch`, ignored promises, or optional fall-through to continue after required browser work fails. Do not run a packet containing one and plan to repair it afterward. Finding one is a hard packet failure: do not score it; record the failure, replace it with a visible-state, URL, DOM, response, geometry, or assertion condition, and rerun through the helper.
- Treat visual/debug diagnostics as ordinary browser packets: edit the task-owned packet and rerun the full helper invocation. Do not create `/tmp` scripts, use shell-generated browser files, run `node <packet>.mjs` directly, or launch `chromium` from any process the helper did not start.
- Use explicit viewport dimensions.
- Make route/state/theme/viewport identity clear from the image name and capture script; use the generated image directory and lifecycle log for run ownership.
- Fail loudly on wrong routes, missing selectors for reachable required views, invalid geometry, and target console/page errors. Record source console/page errors without filtering them or failing an otherwise useful source capture.
- Capture full-view and section images to the correct evidence root.
- Measure scroll and geometry in the browser when layout ownership matters.
- Close browser/context resources in a `finally` path.
- Keep scripts focused enough that a failure identifies the affected evidence group.

A script that silently catches or suppresses any state, navigation, screenshot, console, page-error, or assertion failure cannot pass a gate. Record source diagnostics as data rather than asserting they are empty; this is not suppression. Required browser work must fail loudly except for a documented source interaction made unreachable by the approved source's own defect. A broad catch or optional fall-through is a hard packet failure even when the helper ultimately produces screenshots.

</browser_script_rules>

## Timeout And Retry Rules

Choose the command timeout before the first run from the focused script's navigation, real-input steps, asset readiness, and screenshots. Use `15000`–`20000` ms for a short probe; a multi-state packet may start at a justified value up to `60000` ms. The timeout bounds the command, not each screenshot. Keep readiness bounded to the selected server's actual startup behavior. If one script would need more than `120000` ms, split it into focused scripts and, when they share a build, pass them as separate `--run` commands in one lifecycle.

If a run fails with useful evidence, diagnose that evidence and repair the cause rather than increasing the timeout. A longer rerun is justified only after a timer-only failure with no useful error, helper logs and readiness/URL inspected, and page state, browser console, network, inputs, and selectors triaged. Record why more time changes the result and keep the rerun helper-owned and within `120000` ms. Never retry blindly or use a fixed sleep to consume a larger timeout.

## Failure Triage

<failure_triage>

After a helper failure, inspect before rerunning:

| Evidence | Question |
| --- | --- |
| server stdout/stderr | did the intended command start and stay alive? |
| readiness result | did the exact URL become available? |
| run stdout/stderr | did the browser launch and reach the script? |
| exit/timeout record | which owner ended the run? |
| URL and route state | was the expected page actually loaded? |
| browser console/page errors | did runtime code fail? |
| network state | did required assets fail? |
| selectors and inputs | did the script target current visible UI? |
| screenshot directory | was any partial or stale evidence produced? |

Record the diagnosis and material change before rerun so the next attempt can produce new evidence.

If the helper itself appears broken, first compare it byte-for-byte with the skill asset. Restore the byte-identical asset if modified. Diagnose the invocation and server command. Do not patch the helper.

</failure_triage>

## Lifecycle Safeguards

Prefer the helper-owned lifecycle and avoid:

- `pkill -f` or broad process-name cleanup;
- `nohup` or `disown`;
- background server chains, manual smoke checks, shell `sleep`, or `curl` readiness probes;
- arbitrary port hunting;
- `lsof`, broad process listings, or process-name/port enumeration as lifecycle management;
- repeated manual server start/curl/screenshot loops;
- a server inherited from an unknown previous command;
- `playwright install`, `playwright install --dry-run`, browser-availability probes, or browser downloads;
- direct browser scripts after an undiagnosed helper failure;
- edits to `playwright-lifecycle.mjs`.

Choose explicit, distinct task-owned source and target ports before invoking the lifecycle helper. If the ready URL already responds before helper ownership begins, do not inspect or kill the unknown process; select another explicit task-owned port. The helper owns the server process and PID-scoped cleanup for the run. Never respond to a port failure with broad process inspection or cleanup, shell `sleep`, or manual background-server management. Preserve lifecycle logs, diagnose the specific invocation, choose another task-owned port when necessary, and rerun through the helper.

The unchanged helper and its generated runtime log are the lifecycle evidence: they show the command, URL, readiness, browser result, and cleanup. Cite the relevant log and image directory in the phase artifact. Do not copy those facts into a lifecycle table. A failed or missing helper run cannot support a passing visual gate.
