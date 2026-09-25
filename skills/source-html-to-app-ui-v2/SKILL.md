---
name: source-html-to-app-ui
description: Rebuild an approved source HTML application as a real, high-fidelity UI in the target repository. Use for source-to-app design tasks requiring interactive source discovery, authored routes and components, local UI behavior, responsive/theme adaptation, and paired Playwright evidence.
---

# Source HTML To App UI

## Objective

Reproduce the approved source HTML as a real target application. The finished experience is the primary measure of success:

- every source page, meaningful state, visible section, and interaction family is represented;
- the target preserves source content, hierarchy, layout, styling, controls, and behavior wherever evidence exists;
- desktop, mobile, short-height, theme, drawer, and overflow behavior remain usable;
- paired Playwright evidence shows the source and target at matching routes, states, themes, viewports, and sections;
- the final audit finds and repairs missing quality work before the exact task-completion command runs.

Use the source HTML for discovery and comparison. Author the target as a normal application with real routes, components, styles, assets, and local UI state. Keep the task UI-only: do not add backend, API, database, persistence, authentication, server, or business logic.

The approved HTML and design JSON are immutable reference inputs. Never patch either file or alter the source DOM/scripts to make its runtime pass. Record source page/console errors and failed source interactions without filtering them. If source JavaScript errors or a normal input cannot reveal an intended UI state, note the error or unavailable state and move on: do not debug the source exception, trace handler registration, create a diagnostic source packet, or retry the same no-op. Use the HTML/CSS and design JSON for that state's intended appearance and behavior, then implement and verify it in the target. Continue capturing every reachable distinct source surface with desktop/mobile/section evidence and paired visual review. Unavailable source states need complete target screenshots and real-input verification, not fabricated source screenshots. Target errors remain failures.

## Strict execution contract

<execution_contract>

This is an end-to-end implementation workflow, not optional advice. A passing phase unlocks the next phase; it is not a successful stopping point. Do not stop after source discovery, Phase 0, target research, implementation, or a partial verification run. If the next phase is locally unblocked, continue into it automatically. The task is not complete until Phase 4 passes and the exact task-completion command has run successfully.

The Agent owns every gate. Browser scripts collect evidence; the Agent reviews the evidence, scores the phase, repairs failures, and promotes the marker. A failed packet requires inspection and repair; rerun through the managed lifecycle only when the image, browser result, or provenance remains invalid or missing. A procedural mistake does not erase valid work, but an unproven gate cannot pass until its missing evidence is completed.

Complete the required coverage promptly: thoroughness means proving each distinct requirement, not capturing every transition or repeating a valid check. Use the existing evidence, runtime logs, and compact checkpoint before repeating work; beyond required boundary/resume reads and the focused packet review, do not add workflow reads or checks that answer no unresolved question. A run that produces no new defect, repair, or missing proof is not progress; do not repeat it for confidence.

After compaction, resume, retry, reconnect, or a new session, read this skill, the compact `progress.md` checkpoint, current marker and phase reference/artifact, open gaps, and only the linked evidence and input excerpts needed for the next action. Never rely on conversation memory or an old `Pass` label as proof.

</execution_contract>

## Phase 0 boundary

Complete source orientation, inspection of HTML/CSS and UI-relevant JavaScript declarations for intended pages, states, styles, and interactions, a source-backed visual capture plan, screenshot review, and the Phase 0 score before implementing the target. Do not audit source JavaScript execution or handler wiring. Inventory declared interactions as target requirements, but do not prove every source interaction in the browser before building. Use real input to reach distinct source visual states; if an action returns to an already evidenced appearance, its declaration and existing image suffice for Phase 0. Verify the implemented interactions rigorously in the target phases. The approved source and design inputs remain immutable. The Agent may read source inputs, skill resources, and task-workflow artifacts in any useful order during Phase 0; there is no required sequence of individual tool calls. Keep target implementation and asset research for Phase 1.

Use the managed lifecycle helper to confirm the exact approved HTML URL and capture the initial desktop and mobile images. Open both images and record findings before scoring Phase 0. Capture and review the complete inventory, not just the orientation pair. A failed packet requires diagnosis and repair of that packet; a procedural misstep does not invalidate otherwise valid evidence or require restarting the whole phase.

Do not use a wrong page, directory listing, blank document, or missing image as source evidence. Keep browser/server work under the lifecycle helper and use deterministic waits. These are evidence requirements, not next-tool-call locks.


## Managed verification lock after Phase 0

<managed_verification_lock>

Passing Phase 0 does not relax lifecycle ownership. From Phase 1 through completion, every target browser check, screenshot, layout measurement, scroll test, or runtime inspection must be a lifecycle-owned packet. Do not run `pnpm run dev`, `npm run dev`, `vite`, or `react-router dev` directly; do not background a server; do not use shell `sleep`, `curl`, `wget`, port probes, or manual process cleanup to start, wait for, inspect, or stop it. A successful build or typecheck is not browser verification.

The only legal target-browser flow is the lifecycle helper with the target server, readiness URL, runtime directory, and packet supplied explicitly:

```bash
cd <target-repository>
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<target-start-command>" \
  --ready-url "<target-readiness-url>" \
  --runtime-dir "task-workflow/runtime/target" \
  --run "node task-workflow/target-playwright/<packet>.mjs"
```

If this flow fails, repair the task-owned packet or the bounded helper invocation and rerun it through the helper. Never substitute a manual smoke test. A direct target server, shell wait, readiness probe, or browser check does not count as managed evidence; rerun the affected check through the lifecycle helper.

</managed_verification_lock>

## Operating Contract

<operating_contract>

Treat this file as the canonical five-phase execution protocol. Read it before work, reread it at every phase boundary, and reread it after compaction, resume, retry, reconnect, or a new coding session. Load the reference mapped to the current phase before doing that phase's work.

### Phase 0 write lock — read before any command

Until `task-workflow/phase-0-source-contract.md` has been written, reopened, scored at least `48/50`, all critical rows pass, and `task-workflow/CURRENT_PHASE.txt` is set to `phase-1-ui-implementation`, this is a source-only run. You may write only `task-workflow/**`, including source runtime files, source payloads, manifests, screenshots, and logs. Do not write `app/**`, `public/**`, `server/**`, packages, configuration, package files, build/dist, tests, or any target asset. Do not run `curl` or any download command whose output is a target path. Keep downloaded source assets inside `task-workflow/`; move or copy them to a target path only after the Phase 0 gate. The brand-logo exception changes the Phase 1 asset choice only; it never permits a pre-gate `public/` write. If a pre-gate target write occurs, revert only that premature write, record the correction, and complete the Phase 0 gate before implementation.

For every browser, server, readiness, runtime, or evidence command, the lifecycle helper is the only process owner. Before and during the task, never run a browser or Playwright preflight through `node -e`, `node --eval`, a heredoc, a standalone script, cache/executable inspection, or an availability probe; never probe a server runtime with `which`, `command -v`, `--version`, `--help`, or similar; never manually start a server, background a server with `&`, use `nohup`, use shell `sleep`, probe with `curl`/`wget`, or clean up with `pkill`, `lsof`, or broad process hunting. Use the helper's real packet to discover whether the existing browser and server work. A `curl` used only to download the approved brand asset after the Phase 0 gate is the sole exception; it is never a readiness or UI-proof mechanism. A direct browser or manual server check does not count as managed evidence; record it and run the affected packet through `playwright-lifecycle.mjs` before scoring or promoting the phase.

There is no exploratory-browser exception. A selector check, animation diagnosis, screenshot investigation, console probe, layout measurement, or one-off reproduction is still browser evidence work. Do not create `/tmp` diagnostics, shell-generated browser files, inline browser programs, or temporary Playwright scripts outside `task-workflow/`; do not run a task-owned packet directly just because it is short. Add the diagnostic to the appropriate task-workflow packet, keep its outputs under task-workflow, and invoke that packet through the lifecycle command shape below. `chromium.launch()` is permitted only inside a packet that the helper is currently running. Running it any other way does not provide managed browser evidence.

The first lifecycle packet is also the only browser-availability check. Never inspect `/ms-playwright`, `~/Library/Caches/ms-playwright`, `node_modules/playwright-core`, `browsers.json`, executable paths, browser revisions, `.runtime.logs`, or process/port state to decide whether Playwright works. Never use `ls`, `find`, `cat`, `ps`, `lsof`, or a package/runtime probe for that purpose. Invoke the real helper packet; if it fails, inspect only the helper-owned runtime output and repair the packet or bounded invocation. These inspections cannot substitute for a managed browser packet.

Before invoking the helper, review the current custom packet for the exact URL, required assertions, and prohibited fixed waits. A focused diff or targeted read is sufficient after an edit when it covers the changed behavior; a full read is useful when the packet is new or substantially rewritten. The code review itself suffices; record a failure or repair, not a duplicate review row. No particular tool-call order is required. A packet is invalid and must not be run if it contains `page.waitForTimeout(`, `waitForTimeout(`, `setTimeout(`, `setInterval(`, shell `sleep`, arbitrary polling/timer code used to settle the UI, or a catch/fallback that suppresses a browser wait, navigation, screenshot, console, page-error, or assertion failure. Browser packets must fail loudly: never use `.catch(() => ...)`, broad `try/catch`, ignored promises, or optional fall-through to continue after required browser work fails. Replace timer settling with a visible-state, URL, DOM, response, or geometry condition such as `locator.waitFor`, `waitForSelector`, `waitForURL`, `waitForResponse`, or an assertion. This is a model-owned packet check, not a scoring script; a packet with a prohibited construct cannot supply passing evidence; correct and rerun that packet before scoring.

The Agent owns each gate. A phase gate is an evidence-backed self-review: inspect the work, calculate the score honestly, identify weak rows, repair them, refresh invalidated evidence, and rescore. A failed gate is a repair loop, not a report to the user. Process details may vary with the task when coverage, evidence quality, and the required outcome remain intact. Passing the stated threshold with every critical item satisfied is enough; do not chase `50/50` in Phases 0–3 by repeatedly tuning harmless visual differences.

Keep the weighted rubrics and stated thresholds. If a subjective visual deduction appears too severe, re-review the actual source and target evidence and revise that phase's score by at most two points total for the current evidence, documenting the original category score, revised score, and specific reason. Do not accumulate repeated adjustments or add points merely because a score is near the threshold. Missing evidence, broken interactions, build/check failures, and other critical or objective failures cannot be offset by scoring. Phase 4 may correct an evidenced scoring mistake, but its `50/50` audit gate is not a discretionary bonus.

Browser scripts collect evidence; they do not score or promote phases. Do not create phase-check, scoring, closeout, receipt, forced-read, or promotion scripts. The only supplied runtime script is `playwright-lifecycle.mjs`, which owns browser/server lifecycle. Custom Playwright scripts are expected for discovery, interaction, capture, measurement, and comparison, and they run through that helper.

Promote only from the current artifacts, opened evidence, readbacks, and actual target files. A summary claim, green build, screenshot path, or prior `Pass` label is not proof by itself. If later work invalidates a gate, return to the earliest affected phase and repass forward.

</operating_contract>

## Phase Map

<phase_map>

| Phase | Marker | Owns | Gate | Outcome |
| --- | --- | --- | ---: | --- |
| 0 | `phase-0-source-contract` | fresh artifacts, managed visual discovery, declared-interaction inventory, source/design handoff, reproduction contract | `48/50` | every distinct source visual state is evidenced and every declared interaction is handed to target work |
| 1 | `phase-1-ui-implementation` | target research and cohesive target-native implementation, with code/diff and current checks as proof | `48/50` | every declared route/state/section/interaction has a real target owner and authored target UI |
| 2 | `phase-2-paired-responsive-proof` | code integrity, checks/build, paired source-target Playwright proof | `48/50` | responsive, theme, scroll, sidebar, drawer, and paired evidence pass |
| 3 | `phase-3-fidelity-repair-signoff` | section comparison, mismatch repair, adversarial checks, real-input proof | `49/50`; desktop/mobile `48/50` each | one-to-one visual and behavioral signoff |
| 4 | `phase-4-final-audit-completion` | artifact integrity, current evidence, final diff, completion lock | exactly `50/50` | every gate remains valid and completion is unlocked |

</phase_map>

Keep work in the phase that owns it. Each phase has different work; do not use a later phase to avoid an earlier gate. Continue through Phase 4 whenever local repair is possible. An external blocker is a valid stop only when it is proven, recorded in the current artifact and `task-workflow/open-gaps.md`, and has no local recovery.

## Phase Gate Loop

For each phase:

1. Set `task-workflow/CURRENT_PHASE.txt` before phase work; read this skill and that phase's reference at the boundary or on resume.
2. Work in cohesive code slices and bounded lifecycle-owned browser capture groups. The script/code and its output/diff define the work; do not maintain a separate packet dossier, command table, or per-action review row.
3. Inspect changed code and focused diffs. Open every newly accepted or changed browser image at readable scale and record its concrete finding once in the owning evidence index; reuse findings for unchanged images. Use the image, capture script, and lifecycle log for its viewport, dimensions, state, and provenance; a separate manifest is optional.
4. Record actual unresolved gaps. Update `progress.md` only when a meaningful group completes or fails, the next action changes, or a phase changes—not after each tool call.
5. At the phase gate, score each weighted rubric row once from current evidence and evaluate every critical item independently. On failure, repair the earliest owning defect and refresh only invalidated evidence. On pass, record the decision and promote to the next phase.

The marker, phase artifact, checkpoint, open gaps, evidence, and actual files must agree on the current phase, unresolved failures, and next action; they need not repeat the same event or facts. `CURRENT_PHASE.txt` and `progress.md` are resume pointers, not proof.

Keep browser work and visual review in bounded packets. A source or target packet should own one route/state family and a coherent viewport/theme set, with a reviewable number of outputs. Do not create one monolithic corpus packet that must be rerun after an unrelated selector or state failure. On failure, retain earlier images whose identity, state, framing, and lifecycle are still provable; repair and recapture only failed or invalidated states. A missing optional manifest or later packet failure does not invalidate an earlier valid screenshot. Use new paths for changed images and retain actual invalidation reasons in runtime evidence.

## Fresh Task Workspace

The first target-repository write creates a clean `task-workflow/` from the supplied assets. Remove stale `task-workflow/` state, then create:

- `CURRENT_PHASE.txt`, `progress.md`, `open-gaps.md`, and `spec.json`;
- one artifact for each of the five phases;
- `source-playwright/`, `source/`, `target-playwright/`, `verification/`;
- `runtime/source/`, `runtime/target/`;
- `scripts/playwright-lifecycle.mjs` copied byte-for-byte from this skill.

Copy the supplied design JSON byte-for-byte to `task-workflow/spec.json`. Keep generated screenshots, scripts, runtime logs, notes, and decisions under `task-workflow/`; a capture manifest is optional. Preserve the supplied templates and their scorecards, critical gates, and promotion locks. Exact wording may be shortened only when the same evidence remains explicit and scorable.

During Phase 0, keep target implementation, configuration, packages, assets, build output, and tests unchanged. Inspect the approved HTML/CSS and UI-relevant JavaScript sufficiently to identify every declared page, section, distinct visual state, style, and intended interaction; use targeted reads/parsing rather than mechanically copying or rereading the document. Plan captures from those declarations, capture and open the initial desktop/mobile orientation and the complete planned visual inventory through the lifecycle helper, then score the source contract with all critical rows passing before target research. Record declared interactions for implementation without adding source-browser packets that reveal no new visual evidence. These source tasks may be performed in any useful tool order. The Phase 0 handoff names target roles and adaptations; exact target files are mapped in Phase 1. If target work happens early, revert only premature changes and finish the missing source evidence rather than restarting valid work.

## Evidence Contract

<evidence_contract>

### Source discovery

During Phase 0, create fresh task-workflow artifacts, capture and open the initial desktop/mobile source images, inspect its HTML/CSS/JavaScript declarations, and inventory every page-like surface, distinct visual state, section, declared interaction family, theme, breakpoint, scroll owner, and source-declared item not initially visible. Map each visual item to planned desktop/mobile evidence before the complete capture; map interactions without a distinct appearance to declarations and later target verification. Revise the capture plan when discovery reveals a distinct state or unreadable area, not merely another transition into an already covered view. Then capture the full visual inventory and perform an image-by-image review of accepted/current images: open each at a readable scale, with one concrete finding per image. The opened-image count must match the accepted/current count before Phase 0 passes; key-image samples or one-viewport review do not suffice. The exact tool order is flexible; the evidence and Phase 0 gate are not.

Use Playwright's user-facing input APIs to reach visual states that require interaction: locator/page `click`, `fill`, `selectOption`, `press`, `wheel`, drag, or touch as appropriate. Do not use `evaluate(() => element.click())`, `dispatchEvent(...)`, synthetic routing, direct handler calls, or DOM mutation to stand in for a real interaction. This includes assigning `el.value`, `el.checked`, or classes and then dispatching `input`, `change`, or click events. A browser-evaluated function may observe or measure state, but it may not create the state being evidenced. If a source JavaScript error or failed normal input leaves an intended state unavailable, note it and use the relevant declarations for complete target proof; do not investigate the source failure. Do not run a separate source packet merely to prove a navigation or action whose resulting appearance is already covered; record its declared behavior for target verification. Scope selectors to the active route/state and assert the intended control or section is unique before using it. Required captures of reachable surfaces must fail the packet when their locator, assertion, screenshot, or finding fails; do not catch, log, and continue with partial evidence. Let the inventory determine evidence volume: there is no fixed page, state, section, or screenshot limit. Capture desktop and mobile full views for every reachable page-like surface and layout-distinct state, plus readable section/state/theme evidence where applicable. Section coverage is not one screenshot per DOM element: one image may cover multiple sections when each is readable at review scale. Record the sections each image proves; capture a focused image when an overview is not readable. A local state change needs the changed area and enough context to locate it, not another full-page image of unchanged content by default. Do not add an image that proves only the same unchanged content at the same readable framing.

### Paired proof

Capture source and target separately through lifecycle-owned runs. Pair images for reachable source states by route, state, theme, viewport, section, and framing. For a documented unreachable source state, use its source declarations and defect record instead of a fabricated source image; still capture and verify the corresponding target state. Give every image a unique stable ID/path. The capture script sets viewport/state, the PNG gives actual dimensions, and the lifecycle log proves the run; record only the paths, coverage, opened findings, and pair conclusion in one concise evidence index. Do not create or repair a separate metadata manifest solely to pass a gate. If a packet fails after saving images, review and keep each image whose identity, state, framing, and lifecycle remain provable; recapture only missing, invalid, or stale images under new paths.

Complete the source image review in Phase 0 and the paired source/target visual closure in Phase 2. Open every accepted/current image once at readable scale, individually or in small batches of no more than four related images; record one concrete finding per image and pair conclusion in the evidence index. Reuse already opened Phase 0 source findings when they remain current. Phase 3 and Phase 4 reuse those findings for unchanged images and reopen only changed, stale, unclear, or unresolved pairs. Update the checkpoint only when the next action changes and gaps only for unresolved problems. “Key images,” representative samples, a contact sheet without constituent-image review, or opening only one viewport cannot replace complete Phase 2 coverage. Compare content/order, geometry, spacing, typography, color, backgrounds, borders, radii, shadows, assets, controls, clipping, overlap, responsive transformation, interaction state, and scroll behavior.

Repair source-backed design-system errors, missing or wrong content/states, broken interactions, unusable layout, and visible differences that alter hierarchy, rhythm, or readability. Do not repeatedly recapture or tune an isolated tiny pixel or line-wrap difference that does not materially change those outcomes; record an honest minor score deduction if warranted. Several small differences sharing one wrong token or component rule are a systemic defect and must be fixed. A critical or material mismatch can never be waived by score arithmetic.

### Responsive and theme safety

Check desktop, tablet when relevant, mobile, omitted-size extrapolation, short-height overflow, source themes, target-required themes, and important interaction states. Derive missing target themes conservatively from the accepted source/design system. Repair objective defects such as overlap, clipping, cutoff, horizontal canvas overflow, unusable controls, accidental document scroll, or blank regions.

When a source entrance animation interferes with a readable capture, reach the state with a real control and wait for the source's own settled DOM, geometry, opacity, or transition condition. Do not inject styles, set opacity/classes, disable animations, or otherwise mutate source DOM/CSS merely to make a screenshot readable. If the source has no stable settled state, record that behavior and its evidence instead of rewriting the source inside the packet.

</evidence_contract>

## Sidebar, Content Scroll, And Drawer Contract

<sidebar_contract>

When a sidebar exists, treat its scroll architecture as a target requirement, not a cosmetic detail. Prove it at a forced-overflow short desktop height with real scroll input and before/after screenshots.

Record two separate contracts:

| Contract | What to record |
| --- | --- |
| Source observation | source document/content scroll values, sidebar bounds, sticky/fixed behavior, and visible result |
| Target requirement | viewport-bounded shell, named sidebar, named content scroller, document scroll unchanged, content scroll increasing, sidebar fixed to the viewport |

The target proof must record the measured values from the browser packet output and calculate:

- document scroll delta = `0`;
- content-pane scroll delta `> 0`;
- sidebar top and bottom deltas within `1px`;
- sidebar height and bottom cover the viewport within `1px`;
- the post-scroll image has no blank lower-sidebar region.

Source values describe the reference; they cannot satisfy or relax target predicates. A target that relies on document scrolling, sticky positioning alone, a fixed-height strip, or an unnamed overflow owner returns to Phase 1 for shell repair.

When a mobile drawer exists, prove real-input open/close, overlay interception, full-viewport geometry, body/document scroll lock, and scroll restoration with screenshots and measurements.

</sidebar_contract>

## Managed Playwright Lifecycle

### Lifecycle-only entry rule

Every browser or runtime UI check is lifecycle-owned. A custom Playwright file is a payload for the helper, never a standalone command. Do not run `node task-workflow/source-playwright/<script>.mjs`, `node task-workflow/target-playwright/<script>.mjs`, `node -e`/`node --eval` with Playwright, an inline heredoc browser program, or any equivalent direct browser command. Debug browser behavior by editing a task-owned `.mjs` packet and rerunning that packet through the helper; never write a diagnostic to `/tmp` or another temporary location and never use a shell heredoc or redirection to manufacture a browser script. Do not start a background server for a smoke test, readiness test, or browser run; do not attach Playwright to a manually started server; do not use shell `sleep`, `curl`, or another manual request as a substitute for the helper’s ready URL. After a build, validate the running target by invoking the lifecycle helper with the bounded server command, ready URL, runtime directory, and custom Playwright payload. Do not invoke `playwright install`, `playwright install --dry-run`, or any equivalent browser-install or browser-availability command; use the existing browser cache through the lifecycle helper.

Use this shape for every source and target packet, changing only the owned server, readiness check, and payload:

```bash
node task-workflow/scripts/playwright-lifecycle.mjs \
  --server "<bounded server command>" \
  --ready-url "http://127.0.0.1:<port>/<ready-path>" \
  --run "node task-workflow/<source-or-target-playwright>/<packet>.mjs"
```

The helper must own startup, readiness, browser environment, runtime logs, and PID-scoped cleanup. If the browser or server fails, inspect the helper-owned logs and repair the invocation or packet. Never bypass the helper to test whether the payload works; a direct Playwright command, including a one-off debug command, is a hard process failure even when it produces useful output. A lifecycle failure remains a gate failure until a helper-owned rerun produces usable evidence.

Start the source through the helper, capture and stop it; start the target through the helper, capture and stop it; then compare saved evidence. Keep ports, scripts, screenshots, and runtime logs separate.

Use deterministic readiness and state conditions rather than fixed sleeps. `page.waitForTimeout`, shell `sleep`, arbitrary polling delays, and timer-only settling are hard packet failures; remove them, record the gate failure, and rerun through the helper before scoring. Start readiness and focused script timeouts at `15,000`–`20,000` ms. If a run ends only from a timer with no useful diagnostic, record clean triage before one `60,000` ms retry; keep one targeted script within `120,000` ms by splitting the work. A useful failure is a repair ticket: inspect its logs, DOM/state, console, network, and server output before rerunning.

Keep lifecycle ownership with the helper and its PID-scoped cleanup. Prefer explicit task-owned ports, bounded scripts, and focused reruns. Preserve the helper byte-for-byte; keep process hunting, background-server loops, arbitrary port sweeping, browser downloads, and manual lifecycle outside the normal workflow.

## Adaptation Rules

- Match accepted source evidence one-to-one wherever it exists.
- Preserve source content, hierarchy, spacing, typography, colors, controls, states, routes, interactions, themes, and assets.
- Apply the required target-safe viewport shell/content-scroller architecture while preserving the source's visible result.
- Extrapolate omitted breakpoints conservatively from source evidence, design JSON, and target tokens.
- Use the real repository logo when available.
- Disable unsupported navigation rather than inventing destinations.
- Keep implementation UI-only and source-backed.

## Resume And Reference Loading

After compaction, resume, retry, reconnect, or a new session, read in this order:

1. this `SKILL.md`;
2. `task-workflow/progress.md`;
3. `task-workflow/CURRENT_PHASE.txt`;
4. `task-workflow/open-gaps.md`;
5. the current or earliest failing phase artifact;
6. the reference mapped to that marker;
7. only the task input, source HTML/design excerpts, active target files, and evidence linked to the next action. The HTML remains authoritative; reopen relevant sections when needed rather than copying them into workflow ledgers or rereading the whole document by default.

Reference map:

| Marker | Read |
| --- | --- |
| missing workflow or Phase 0 | `references/phase-0-source-contract.md`, `references/playwright-lifecycle.md` |
| Phase 1 | `references/phase-1-ui-implementation.md` |
| Phase 2 or 3 | `references/phase-2-3-playwright-fidelity.md`, `references/playwright-lifecycle.md` |
| Phase 4 | `references/phase-4-final-audit-completion.md` |

## Completion Lock

Before completion, verify that:

1. `CURRENT_PHASE.txt` is `phase-4-final-audit-completion`;
2. every phase artifact says `Decision: Pass` at its required threshold;
3. every critical item, promotion lock, and actual unresolved gap has concrete current evidence;
4. every cited image exists and was opened, with a matching source-target comparison for reachable source states or a documented source-defect/declaration-to-target comparison for unreachable source states;
5. final desktop/mobile/section/sidebar/drawer evidence represents final target code;
6. the final diff is UI-only and all required checks/build evidence remains current;
7. the exact completion command from the task instructions is copied, unrun, and the next required task.

Use the exact supplied command, for example:

```bash
node /workspace/builder/task_complete.mjs --projectId "<projectId>" --taskId "<taskId>" --status completed --summary "<brief summary>"
```

Run the exact completion command only after Phase 4 passes. It need not be the literal final tool call, but do not claim completion before its successful result.

## Asset Map

| Runtime artifact | Source asset |
| --- | --- |
| `phase-0-source-contract.md` | `assets/templates/phase-0-source-contract.md` |
| `phase-1-ui-implementation.md` | `assets/templates/phase-1-ui-implementation.md` |
| `phase-2-paired-responsive-proof.md` | `assets/templates/phase-2-paired-responsive-proof.md` |
| `phase-3-fidelity-repair-signoff.md` | `assets/templates/phase-3-fidelity-repair-signoff.md` |
| `phase-4-final-audit-completion.md` | `assets/templates/phase-4-final-audit-completion.md` |
| `progress.md` | `assets/templates/progress.md` |
| `open-gaps.md` | `assets/templates/open-gaps.md` |
| `scripts/playwright-lifecycle.mjs` | `assets/scripts/playwright-lifecycle.mjs` |
