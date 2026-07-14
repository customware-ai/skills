---
name: customware-ai
description: Use this skill when adding or changing AI chat, text generation, reasoning, tools, model selection, or structured JSON output in a Customware-generated React Router and Hono app. It covers the server-only Customware AI Gateway, AI SDK with the OpenRouter adapter, AI Elements UI, supported model choices, and mandatory live model and structured-output checks.
---

# Customware AI

Build AI features through the Customware AI Gateway. Use AI SDK on the Hono backend and AI Elements in the React Router SPA when a chat UI is needed.

This is the single skill for the complete integration. Do not install or ask the agent to use a separate AI Elements skill; the relevant AI Elements guidance is adapted into this skill's references.

## Read First

- Always read [references/gateway-backend.md](references/gateway-backend.md).
- Always read [references/models.md](references/models.md).
- For chat or other conversational UI, read [references/ai-elements-ui.md](references/ai-elements-ui.md).
- For AI UI, read [references/ai-elements-catalog.md](references/ai-elements-catalog.md), select the needed components, then read only those linked files under `references/components/`. Open a component's linked example files only while implementing it. Never load the entire components folder or all examples.
- For JSON or other typed output, read [references/structured-output.md](references/structured-output.md).
- When starting from bundled code, read [references/examples.md](references/examples.md).
- Before finishing any implementation, read and follow [references/verification.md](references/verification.md).

## Non-Negotiables

- Call the Customware AI Gateway only from server code. Browser code calls the app's own Hono endpoint.
- Read the gateway secret only from `CUSTOMWARE_AI_GATEWAY_KEY`.
- Never expose the key through `VITE_*`, browser bundles, API responses, logs, HTML, or client-side state.
- Hardcode the Customware gateway base URL in server code. Do not add a gateway URL environment variable.
- Use this exact adapter base URL:
  `https://app.customware.ai/api/orgs/${orgId}/projects/${projectId}/ai/v1`
- Always use the real Customware `orgId` and `projectId`. Never use placeholders or accept them from the browser for each request.
- Use `@openrouter/ai-sdk-provider`; do not use provider-specific SDKs or call OpenRouter directly.
- Do not pass a preset, provider routing, fallback model list, metadata, trace id, or OpenRouter user id. The gateway owns these controls.
- Default to `google/gemini-3-flash-preview` unless the user selects another model or the task clearly requires one of the documented alternatives.
- If the user names or changes a model during development, send a live `hi` request through that exact model before finishing.
- If the feature generates JSON, run the one-key structured-output check before finishing.
- AI Elements works in the React Router client-only SPA. Do not introduce Next.js or App Router route handlers. Generated `"use client"` directives are harmless React boundary markers and do not require Next.js.
- Use pnpm only. Install AI Elements through the bundled installer, which runs non-interactive `pnpm dlx shadcn@latest add ... --yes` commands and isolates registry-matched primitives from the template's existing UI contracts.

## Workflow

1. Inspect the generated app and identify its package manager, Hono entry point, React Router structure, and real Customware org/project ids.
2. Read the relevant references listed above.
3. Add `ai`, `@ai-sdk/react`, `@openrouter/ai-sdk-provider`, and `zod` with pnpm only when missing.
4. Add a focused server provider helper using `CUSTOMWARE_AI_GATEWAY_KEY` and the fixed gateway URL.
5. Add the Hono endpoint before static-file serving and SPA fallback routes.
6. Keep the model and its reasoning configuration server-owned. If the UI offers model selection, validate it against the small allow-list in [references/models.md](references/models.md).
7. For chat, install only the selected AI Elements with `scripts/install-ai-elements.mjs`, then connect `useChat` to the app's Hono endpoint.
8. For structured output, use the current AI SDK `generateText` with `Output.object` and a Zod schema.
9. Run the mandatory live checks in [references/verification.md](references/verification.md), then run the app's normal type/check/build command.

## Copy-Ready Examples

- Use `assets/ai-chat/` for a minimal AI Elements chat with a Hono streaming route.
- Use `assets/email-parser/` for an internal server-only email parser returning typed JSON.
- Copy only the files needed by the target feature, adapt their import paths, and supply the real org/project ids where the route or service is mounted.
- Treat assets as starting code, not files to execute inside the skill repository.

## Boundaries

- Use `customware-support-widget` instead when the request is only to embed the existing support agent widget.
- Do not build a second browser-to-gateway path alongside the Hono path.
- Do not silently replace an unavailable user-selected model with another model.
- Do not create a second key, per-project key, or direct OpenRouter key in the generated app.
- Do not display, mask, copy, or otherwise surface `CUSTOMWARE_AI_GATEWAY_KEY` in the UI. It is not an AI Elements environment-variable display use case.
