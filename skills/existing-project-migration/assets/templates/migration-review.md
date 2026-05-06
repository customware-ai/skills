# Migration Review

- Date:
- Task:
- Source app:
- Comparison pass number:
- Review inputs:
- Pre-interactive code fidelity pass:
- Shared shell elements checked before browser QA:
- Verification host or URL:
- Checklist critical result: `pass` | `fail`
- Checklist score:
- Failed item numbers:
- Verified workflows:
- Routes visited interactively in this pass:
- Visible layout or control markers checked in this pass:
- Basic page-native actions exercised in this pass:
- First-user boot result (`/`, `/login`, seeded login, first landing page):
- Fatal console or runtime errors seen:
- Automated test suites run:
- Commands run:
- Pass/fail call:
- Short rationale:

## Fidelity Ledger

Use one row per source-visible screen, plus shared shell or runtime rows when needed.
Do not group unrelated screens into one row.
Do not replace this table with freeform prose.
Each row must judge product fidelity, workflow fidelity, and stack/runtime fidelity together when relevant.
Any user-noticeable difference must be called out under `Drift found`, even if it seems minor.
If a deviation is claimed as unavoidable, record the exact source evidence and stack reason.
If a visible source element such as sidebar, header, nav group, filter bar, form section, table, chart, or action row is missing, record it as drift even if other nearby text exists in the DOM.

| Route or screen | Source evidence | Current evidence | Required source contract | What matches | Drift found | Severity (`blocking` or `non-blocking`) | Next fix | Resolved? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| App shell and branding |  |  |  |  |  |  |  |  |
| Navigation and route map |  |  |  |  |  |  |  |  |
| First-user boot and login flow |  |  |  |  |  |  |  |  |
| Runtime and target stack |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |

## Adversarial Final Pass

After the migration seems done, assume it still drifted and try to find at least five concrete route or screen mismatches.
Do not replace this table with a narrative paragraph.

| Route or screen | Suspected drift | Evidence | Real blocker? | If not a blocker, why not? | Action taken |
| --- | --- | --- | --- | --- | --- |
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |
| 4 |  |  |  |  |  |
| 5 |  |  |  |  |  |

## Current Call

- Pass/fail:
- Why:
- Are any source-visible drifts still unresolved?:
- Are any user-visible UI or UX differences still unresolved?:
- Did the pre-interactive code fidelity pass confirm shared shell and route-level structure before browser QA?:
- Did the real review or preview app boot cleanly for an unauthenticated user?:
- Does this file still use the required ledger tables?:
