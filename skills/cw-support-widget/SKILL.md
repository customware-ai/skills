---
name: cw-support-widget
description: Use when adding, moving, or sizing the embedded CW Agents support chat widget in a project app.
---

# CW Agents support widget

1. Read `orgId` and `projectId` from the Builder's raw task record at `.tasks/task.json`. The Markdown brief (`.tasks/task.md`) lists `projectId` in its frontmatter. If the raw record is unavailable, get both IDs from the CW Agents project URL `/<orgId>/projects/<projectId>`. Don't render placeholders. If an ID still can't be determined, report what's missing in the task outcome.
2. Load the script once in the client app shell (for example, `apps/app/index.html` in the current template). Place one `<customware-chat>` in the shared layout. If IDs arrive at runtime, render it only when both are present.
3. Verify on the project's dev sandbox URL. The org's Support widget feature must be on. The widget works on the project's own app hosts (live or dev sandbox) and on localhost in development. Open the app directly, not inside an iframe.

```html
<script src="https://agents.customware.ai/support-widget/customware-chat.js" defer></script>
<customware-chat org-id="<orgId>" project-id="<projectId>"></customware-chat>
```

## Placement and options

- `mode="chat-bubble"` (default): floating launcher and chat panel. Keep it outside clipped containers.
- `mode="full"`: fills a host region. Give the region a definite height and let the widget handle its own scrolling.
- `style-options`: JSON object with string values, for example `style-options='{"width":"100%","height":"100%"}'`. In JS, the same object can be assigned to the element's `styleOptions` property.
- `meta`: optional JS property `{ email?: string; name?: string }` for visitor identity. Assign it on the DOM element after registration (for example, await `customElements.whenDefined("customware-chat")` before using a ref). Never pass tokens, cookies, or other secrets.

| Supported `style-options` keys | Controls |
| --- | --- |
| `width`, `height`, `minHeight`, `maxHeight` | Host element size |
| `panelWidth`, `panelHeight`, `panelMinHeight`, `panelMaxHeight` | Floating panel size |
| `launcherSize`, `launcherIconScale` | Launcher size and icon scale (e.g. `"1.16"`) |
| `gap` | Spacing at the floating anchor |

Position and size the host element or its wrapper with CSS and the options above. Don't restyle the widget internals, reach into its Shadow DOM, or call support endpoints directly from the app.

The widget answers from the project's Customer Help document. Filed requests become draft Support tasks for the team. In the dev sandbox, check that the widget opens and answers a question covered by the document. Verify draft creation only with an approved test request.
