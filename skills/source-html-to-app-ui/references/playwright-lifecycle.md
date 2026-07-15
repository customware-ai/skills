# Managed Playwright Lifecycle

This reference is mandatory in Phases 0, 2, and 3.

<hard_stop>

This is a strict test gate. Before the first helper invocation, do not inspect browser caches, executable paths, browser revisions, `browsers.json`, package browser directories, or process/port state with `ls`, `find`, `cat`, `ps`, `lsof`, `test -d`, `test -e`, `test -f`, `stat`, `file`, `wc`, `du`, or equivalent commands. Do not read/list the target root or check whether `task-workflow` exists. Do not probe a server/runtime with `which`, `command -v`, `--version`, `--help`, or similar availability commands. Do not run a direct browser command, manual server, readiness probe, or fixed-wait packet. The helper's first real packet is the only availability test for the browser, server, and runtime. Any one of those actions invalidates the run; stop, record it, reset, and restart the phase.

</hard_stop>

Before the first successful orientation, the read allowlist is closed: only `SKILL.md`, the exact Phase 0 reference, and this lifecycle reference may be read. Do not read the helper asset, any template, copied helper, task-workflow artifact, source HTML/CSS/JavaScript, design JSON, target file, or runtime file. Copying the helper or templates byte-for-byte is allowed without opening them. Reading any forbidden path is a hard run failure; stop, reset, and restart.

## Lifecycle Authority

<lifecycle_authority>

Use the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` copied from this skill's assets. It owns server startup, readiness, browser command bounds, logs, and PID-scoped cleanup. The command contract in this reference is complete: copy the helper but do not read `.agents/skills/source-html-to-app-ui/assets/scripts/playwright-lifecycle.mjs` or the copied helper to discover flags or parameters, especially not between setup and the first orientation packet.

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

## Helper Command Contract

Use the discovered source/target command values in this shape:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<bounded server command>" \
  --ready-url "<exact URL expected to return successfully>" \
  --runtime-dir "task-workflow/runtime/<source-or-target>" \
  --run "node task-workflow/<source-playwright-or-target-playwright>/<script>.mjs" \
  --ready-timeout-ms 15000 \
  --command-timeout-ms 20000
```

The first source browser command and first target browser command must establish helper ownership. Do not run browser scripts against an assumed or manually started server first.

For browser, server, readiness, runtime, or evidence commands, the helper is the only process owner. Do not manually start or background a server, use `nohup`, shell `sleep`, `curl`/`wget` probes, `pkill`, `lsof`, or broad process hunting. A manual process/probe/cleanup command is a hard lifecycle failure; stop the packet, record it, and rerun through the helper before scoring. The only `curl` exception is downloading an approved brand asset after Phase 0; it is never readiness or UI evidence.

There is no one-off diagnostic exception. A selector probe, animation investigation, computed-style read, console check, layout measurement, or screenshot reproduction is browser evidence work. Put it in a task-owned packet under `task-workflow/source-playwright/` or `task-workflow/target-playwright/`, keep its output under `task-workflow/`, and run it through the helper. Never write a browser script to `/tmp`, generate one with a shell heredoc or redirection, run a packet directly with `node`, or launch `chromium` outside the helper-run packet. These are hard failures even when the diagnostic is read-only and even when the next attempt uses the helper.

The first helper packet is the only browser-availability check. Never inspect `/ms-playwright`, `~/Library/Caches/ms-playwright`, `node_modules/playwright-core`, `browsers.json`, executable paths, browser revisions, `.runtime.logs`, or process/port state to decide whether Playwright works. Never use `ls`, `find`, `cat`, `ps`, `lsof`, or package/runtime probes for that purpose. If the helper packet fails, inspect only its runtime output and repair the bounded invocation or packet. Cache, executable, revision, and availability inspection is a hard process failure.

Source and target are sequential helper-owned lifecycles, not two manually managed simultaneous servers:

1. invoke the helper with the source server, source ready URL, source runtime directory, and source script;
2. let the helper stop and clean up the source server;
3. invoke the helper with the target server, target ready URL, target runtime directory, and target script;
4. let the helper stop and clean up the target server;
5. compare the saved source and target evidence after both runs.

For the first source orientation specifically, after the helper reports success the next two tool calls are locked: read the desktop orientation image, then read the mobile orientation image. Do not read source/design content or use any other tool between those reads. Source inspection begins only after both image-read events and a concrete finding for each.

For equivalent interaction proof, use the same focused manifest in separate source and target helper runs. Do not keep both servers alive, create a dual-background-server command, or use process inspection to imitate lifecycle ownership.

## Browser Script Rules

<browser_script_rules>

- Use Playwright's user-facing input APIs: locator/page `click`, `fill`, `selectOption`, `press`, `wheel`, drag, or touch as appropriate. Do not use `evaluate(() => element.click())`, `dispatchEvent(...)`, synthetic routing, direct handler calls, or DOM mutation to stand in for a real interaction. This includes assigning `el.value`, `el.checked`, or classes and then dispatching `input`, `change`, or click events. A browser-evaluated function may observe or measure state, but it may not create the state being evidenced. If a normal action fails, diagnose and repair the page or interaction target; do not bypass the failure with a DOM-dispatched event.
- Use deterministic waits tied to visible state, URL, DOM, response, or geometry.
- Before the helper invocation, read the complete packet from line 1 through EOF and remove every fixed-wait construct. After every packet write or edit, the very next tool call must be that same complete line-1-through-EOF read; do not run `grep`/`rg`, make another edit, invoke the helper, or use any other tool between the edit and the read. A targeted slice may confirm a local edit only after that mandatory complete read; it never replaces the audit. The write/edit response, write preview, grep/ripgrep result, or remembered contents is not packet evidence. Record the complete-read and fixed-wait review in the packet or phase artifact. `page.waitForTimeout(`, `waitForTimeout(`, `setTimeout(`, `setInterval(`, shell `sleep`, arbitrary polling/timer settling, and catch/fallback code that suppresses a browser wait, navigation, screenshot, console, page-error, or assertion failure are forbidden. Browser packets must fail loudly: never use `.catch(() => ...)`, broad `try/catch`, ignored promises, or optional fall-through to continue after required browser work fails. Do not run a packet containing one and plan to repair it afterward. Finding one is a hard packet failure: do not score it; record the failure, replace it with a visible-state, URL, DOM, response, geometry, or assertion condition, and rerun through the helper.
- Treat visual/debug diagnostics as ordinary browser packets: edit the task-owned packet and rerun the full helper invocation. Do not create `/tmp` scripts, use shell-generated browser files, run `node <packet>.mjs` directly, or launch `chromium` from any process the helper did not start.
- Use explicit viewport dimensions.
- Record route/state/theme/viewport identity in output or evidence metadata.
- Fail loudly on wrong routes, missing selectors, console errors, page errors, or invalid geometry.
- Capture full-view and section images to the correct evidence root.
- Measure scroll and geometry in the browser when layout ownership matters.
- Close browser/context resources in a `finally` path.
- Keep scripts focused enough that a failure identifies the affected evidence group.

A script that silently catches or suppresses any state, navigation, screenshot, console, page-error, or assertion failure cannot pass a gate. Required browser work must fail loudly; a broad catch or optional fall-through is a hard packet failure even when the helper ultimately produces screenshots.

</browser_script_rules>

## Timeout And Retry Rules

Start with:

- readiness timeout: `15000`-`20000` ms;
- targeted browser command timeout: `15000`-`20000` ms.

If a run fails with useful evidence, diagnose that evidence. Do not increase the timeout.

One `60000` ms retry is permitted only when all are true:

1. the first run ended only because its timer expired;
2. no useful error or state explanation was produced;
3. helper logs were inspected;
4. readiness and URL were confirmed;
5. page state, browser console, network, inputs, and selectors were triaged;
6. the artifact records why more time can change the result;
7. the rerun remains helper-owned.

Never exceed `120000` ms for one targeted script. Split or diagnose work that cannot complete within that bound.

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

Choose explicit, distinct task-owned source and target ports before invoking the lifecycle helper and record them in the phase artifact. If the ready URL already responds before helper ownership begins, do not inspect or kill the unknown process; select another explicit task-owned port. The helper owns the server process and PID-scoped cleanup for the run. Never respond to a port failure with broad process inspection or cleanup, shell `sleep`, or manual background-server management. Preserve lifecycle logs, diagnose the specific invocation, choose another task-owned port when necessary, and rerun through the helper.

## Evidence Required For A Passing Lifecycle Gate

| Item | Required evidence |
| --- | --- |
| Helper identity | byte comparison to skill asset |
| Command | exact helper invocation |
| Ownership | source/target port, runtime dir, and ready URL |
| Readiness | successful readiness evidence |
| Browser run | exit result and relevant output |
| Cleanup | helper-owned PID cleanup result |
| Fixed-wait audit | inspected script paths and deterministic waits used |
| Timeout record | values plus triage for any timeout/retry |
| Screenshot ownership | files written only to the correct source/target root |
| Sequential ownership | source helper finished/cleaned up before target helper began |

Missing lifecycle evidence blocks the owning phase. "Screenshots were captured successfully" is not enough.
