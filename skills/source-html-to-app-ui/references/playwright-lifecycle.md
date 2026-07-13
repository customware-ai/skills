# Managed Browser Lifecycle

Use the unchanged `task-workflow/scripts/playwright-lifecycle.mjs` for both workstreams. Keep scripts, evidence, ports, and runtime logs separate. Generate nothing outside `task-workflow/`.

Ignore the helper's embedded generic `task-workflow/playwright/verify-flow.mjs` usage text for this skill. It is not the source-html invocation contract. Use only this reference's `task-workflow/source-playwright/` and `task-workflow/target-playwright/` commands; do not edit the helper.

## Source Discovery And Paired Evidence

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
	--server "<source server command on source-only port>" \
	--ready-url "http://127.0.0.1:4173" \
	--runtime-dir task-workflow/runtime/source \
	--run "node task-workflow/source-playwright/<script>.mjs" \
	--ready-timeout-ms 20000 \
	--command-timeout-ms 20000
```

Write full-page and section screenshots to `task-workflow/source/`.

## Implemented Target Evidence

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
	--server "<target server command on target-only port>" \
	--ready-url "http://127.0.0.1:4444" \
	--runtime-dir task-workflow/runtime/target \
	--run "node task-workflow/target-playwright/<script>.mjs" \
	--ready-timeout-ms 20000 \
	--command-timeout-ms 20000
```

Write full-page and section screenshots to `task-workflow/verification/`.

## Rules

- Establish helper ownership on the first browser command in each workstream.
- Use real input and deterministic locator, URL, response, visible-state, or persisted-state waits.
- Audit source scripts in Phase 0/2 and target scripts in Phase 2/3 for fixed waits.
- Reuse valid lifecycle evidence and screenshot pairs; recapture pairs invalidated by fixes.
- Do not use or advocate `pkill -f`, `disown`, `nohup`, fixed sleeps, blind reruns, repeated manual server loops, arbitrary port sweeping, or browser downloads.
- Start targeted readiness and command timeouts at `15000`–`20000` ms.
- Diagnose setup/server/run logs, readiness, URL, page state, console, network, inputs, and selectors before rerunning.
- Permit one `60000` ms retry only after a timer-only quiet failure and recorded clean triage. Never exceed `120000` ms for one targeted script.

Never share a script, output root, port, or runtime directory between source and target work.
