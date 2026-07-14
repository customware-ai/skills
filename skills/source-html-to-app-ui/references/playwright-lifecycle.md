# Managed Playwright Lifecycle

This reference is mandatory in Phases 0, 2, and 3.

## Lifecycle Authority

<lifecycle_authority>

Use the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` copied from this skill's assets. It owns server startup, readiness, browser command bounds, logs, and PID-scoped cleanup.

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

Source and target are sequential helper-owned lifecycles, not two manually managed simultaneous servers:

1. invoke the helper with the source server, source ready URL, source runtime directory, and source script;
2. let the helper stop and clean up the source server;
3. invoke the helper with the target server, target ready URL, target runtime directory, and target script;
4. let the helper stop and clean up the target server;
5. compare the saved source and target evidence after both runs.

For equivalent interaction proof, use the same focused manifest in separate source and target helper runs. Do not keep both servers alive, create a dual-background-server command, or use process inspection to imitate lifecycle ownership.

## Browser Script Rules

<browser_script_rules>

- Use real input: click, fill, select, press, wheel, drag, or touch as appropriate.
- Use deterministic waits tied to visible state, URL, DOM, response, or geometry.
- Do not use fixed waits such as `waitForTimeout`, shell `sleep`, or arbitrary polling delays.
- Use explicit viewport dimensions.
- Record route/state/theme/viewport identity in output or evidence metadata.
- Fail loudly on wrong routes, missing selectors, console errors, page errors, or invalid geometry.
- Capture full-view and section images to the correct evidence root.
- Measure scroll and geometry in the browser when layout ownership matters.
- Close browser/context resources in a `finally` path.
- Keep scripts focused enough that a failure identifies the affected evidence group.

A script that silently catches state, navigation, screenshot, or assertion failures cannot pass a gate.

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
- background server chains combined with fixed sleeps;
- arbitrary port hunting;
- `lsof`, broad process listings, or process-name/port enumeration as lifecycle management;
- repeated manual server start/curl/screenshot loops;
- a server inherited from an unknown previous command;
- browser installation or downloads;
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
