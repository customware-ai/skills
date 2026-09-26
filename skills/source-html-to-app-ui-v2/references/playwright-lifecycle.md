# Managed Playwright Lifecycle

Use these instructions for every source/target browser or server check. They are required in Phases 0, 2 and 3, and for any Phase 1 browser probe; keep them loaded while context remains intact.

## 1. Authority And Paths

<lifecycle_authority>

The supplied helper owns server startup, readiness, browser environment, bounded commands, runtime output and PID-scoped cleanup. A stale/wrong server, failed readiness or abandoned process can produce convincing but false evidence.

- Copy `assets/scripts/playwright-lifecycle.mjs` byte-for-byte into the workflow's `scripts/` directory. Inspect it if needed, but never modify or replace it with an Agent-authored approximation. Byte identity is a gate.
- Source inputs, skill resources and workflow artifacts may be inspected before the first packet. Target implementation/asset research belongs to Phase 1.
- The first real helper packet establishes browser/server availability and ownership. There is no separate preflight or exploratory-browser exception.

All runtime paths below are relative to the target repo's `task-workflow/`:

| Concern | Source | Target |
| --- | --- | --- |
| Task-owned `.mjs` packets | `source-playwright/` | `target-playwright/` |
| Images | `source/` | `verification/` |
| Logs | `runtime/source/` | `runtime/target/` |
| Port and exact ready URL | Source-only | Target-only |

Do not share ports/runtime directories or infer one side's success from the other. The helper creates unique image/runtime subdirectories per invocation and exposes `CW_EVIDENCE_DIR` and `CW_LIFECYCLE_RUN_DIR`. Write PNGs only under the generated image directory; retries never overwrite earlier proof.

</lifecycle_authority>

## 2. Invocation And Batching

### Command Contract

<helper_invocation>

Run from the target repo, selecting the correct side's values:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<bounded server command>" \
  --ready-url "<exact successful URL>" \
  --runtime-dir "task-workflow/runtime/<source-or-target>" \
  --evidence-dir "task-workflow/<source-or-verification>" \
  --run "node task-workflow/<source-or-target-playwright>/<packet>.mjs" \
  --ready-timeout-ms 15000 \
  --command-timeout-ms 20000
```

This is a short-probe timeout example, not a fixed value for every packet. Choose bounds from actual startup/work before the run.

- Source and target are separate, sequential helper-owned lifecycles: capture/cleanup source in Phase 0; target runs later compare against its saved evidence. Do not keep both servers alive or repeat source capture in Phases 2–3.
- Pass ready independent same-build scripts as multiple `--run` commands in one invocation; each gets its own output log. Do not restart the server merely to create another packet.
- A later command failure stops the helper but does not erase earlier images with valid identity/state/framing/ownership. Preserve that partial proof and refresh only missing/invalid work.

</helper_invocation>

### Prohibited Lifecycle Substitutes

<lifecycle_boundaries>

**IMPORTANT — No unmanaged browser/server work.** These do not count as evidence, even for read-only diagnostics or a useful screenshot:

- Running a browser packet directly, `node -e`/`node --eval` browser code, an inline/heredoc browser program, or launching Chromium outside a helper-run packet. Syntax-only `node --check` is permitted; it launches no browser.
- Writing diagnostics to `/tmp`/outside the task-owned packet directories, or manufacturing browser scripts with shell heredocs/redirection.
- Starting/backgrounding a server manually, attaching to an inherited server, or using `nohup`, `disown`, `&`, manual readiness requests, `curl`/`wget`, shell `sleep`, `pkill`, `lsof`, broad process inspection or arbitrary port sweeps as lifecycle management. Direct dev-server commands (`pnpm run dev`, `npm run dev`, `vite`, `react-router dev`) are also prohibited.
- Probing server runtime availability with `which`, `command -v`, `--version`, `--help` or similar.
- Browser downloads/install/availability probes, including `playwright install`, `--dry-run`, cache/executable inspection, `/ms-playwright`, `~/Library/Caches/ms-playwright`, `node_modules/playwright-core`, `browsers.json`, revisions, `.runtime.logs`, or process/port state; no `ls`/`find`/`cat`/`ps`/package probe for that purpose.

The only `curl` exception is downloading an approved brand asset after Phase 0; it never proves readiness/UI behavior.

For a violation, record the affected lifecycle failure, repair the invocation/packet and obtain missing usable proof through the helper before scoring. Never bypass it to test whether a packet works. Selector probes, animation/computed-style investigations, console/network checks, measurements and reproduction screenshots are all ordinary helper-owned browser work.

Choose distinct explicit task-owned ports. If a ready URL already responds before ownership, do not inspect/kill the unknown process; choose another explicit port. Diagnose a port failure through the specific helper output, not process hunting or sweeping. Preserve unrelated processes.

</lifecycle_boundaries>

## 3. Packet Design

### Real Input And Reliable Assertions

<browser_script_rules>

- Use Playwright's user-facing `click`, `fill`, `selectOption`, `press`, `wheel`, drag or touch APIs. Browser evaluation may observe/measure state, never create it: no evaluated click/handler call, `dispatchEvent`, synthetic routing or assignment of values/checks/classes followed by events.
- Wait for actual visible state, URL, DOM, response, geometry, opacity or transition completion. Never inject source styles, force opacity/classes, disable source animation or mutate source DOM/CSS to manufacture a settled capture; record a genuinely unstable source state.
- Set explicit viewports. Identify route/state/theme/viewport in image names and packet code; generated directories/logs establish run ownership. Capture readable full views or focused sections for required proof; measure geometry/scroll ownership when relevant.
- Derive target locators from implemented target code, not source-only IDs/attributes. Wait for UI initialization before asserting a client-rendered title/state. Scope to the active view/dialog/section and confirm the intended control is unique; use exact accessible names where labels overlap.
- Assert semantic DOM text/state rather than accidental rendered casing. CSS uppercase is not a behavior defect; verify visual casing in the comparison when needed.
- For outside-click dismissal, use real input on an exposed backdrop area. A dialog covering the backdrop's center does not prove dismissal is broken; never force/bypass the click.
- Fail loudly on wrong routes, missing required reachable selectors, invalid geometry, failed assertions and target console/page errors. Record source console/page errors as unfiltered data without rejecting otherwise useful source captures. A documented source-defect-unreachable action uses declaration-to-target proof, not a bypass.
- Close browser/context resources in a `finally` path. Keep packets focused enough that a failure identifies the affected group.

</browser_script_rules>

### Review Once, Reuse Working Steps

<packet_review>

Before invocation, review the exact URL, assertions, generated screenshot paths and current code. The authored patch/focused diff may supply this review; do not reread unchanged code to prove it was reviewed.

- Use valid JavaScript in `.mjs`, not TypeScript annotations. Run `node --check <new-or-substantially-rewritten-packet.mjs>` before its first invocation. No repeat for unchanged code or separate syntax-check dossier.
- Reuse working navigation/readiness/viewport/capture steps; extend or parameterize missing state work rather than cloning another largely identical script. A new focused script is appropriate for genuinely different work.
- Remove every fixed-wait construct: `page.waitForTimeout`, `waitForTimeout`, `setTimeout`, `setInterval`, shell `sleep`, arbitrary polling/timer settling. Replace with actual state/URL/DOM/response/geometry conditions; do not run an invalid packet intending to fix it later.
- Never suppress required waits/navigation/screenshots/console/page errors/assertions with `.catch(() => ...)`, broad `try/catch`, ignored promises or optional fall-through. Source diagnostics recorded as data are not suppression. Fixed waits or suppressed failures cannot support a passing gate: record/repair and rerun only affected proof.

After a relevant code/asset/config repair, rebuild before recording replacement evidence from a served bundle. Do not verify the old bundle. Reuse current checks/build and unchanged image findings otherwise; evidence writing does not invalidate them.

</packet_review>

## 4. Failure And Retry

### Choose Bounds Before Running

<timeout_rules>

- Short probe: `15000`–`20000` ms command bound. Focused multi-state packet: justified first bound up to `60000` ms. Select readiness from actual server startup.
- Never exceed `120000` ms per command. Split longer work into focused scripts; batch same-build scripts through repeated `--run` arguments.
- Useful failure output requires diagnosis/repair, not a larger timeout or blind retry. A timer-only failure may receive one justified longer bounded retry only after clean triage proves the app/test valid and explains why more time changes the outcome. No fixed sleeps to consume a longer bound.

</timeout_rules>

### Diagnose The Affected Owner

<failure_triage>

Inspect the existing helper-owned evidence before rerunning:

| Evidence | Question |
| --- | --- |
| Server stdout/stderr and readiness | Did the intended command start/stay alive at the exact URL? |
| Browser command output and exit/timeout | Did the browser reach the packet, and which owner ended it? |
| URL/route/visible state | Was the expected page actually loaded? |
| Console/page errors | Did runtime code fail? |
| Network/assets | Did required assets fail? |
| Selectors/inputs | Did the script target the current visible UI? |
| Generated image directory | Which partial images remain valid; which are stale/missing? |

Distinguish a real application defect from a bad test assumption. Fix target defects at their owning cause; repair a wrong selector/assertion in the existing packet. Note one short diagnosis/material change with the failed-log pointer in its owning finding/gap before rerun; do not mirror it in every artifact. Successful replacement proof closes the gap without another capture to repair its note.

Retain valid partial images and accepted findings. Rerun only failed/missing/invalid states under new paths; do not clone a whole replacement script merely to avoid recapturing valid images.

If the helper appears broken, first compare it to the supplied asset. Restore a byte-identical copy if modified, then diagnose invocation/server behavior. Never patch the helper or use manual lifecycle as a workaround. Its generated log proves command, URL, readiness, result and cleanup; cite the log/image directory rather than copying a lifecycle table. Failed/missing helper proof cannot support the affected gate.

</failure_triage>
