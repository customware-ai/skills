# AI Elements In The React Router SPA

This guidance adapts the relevant parts of the official [`vercel/ai-elements`](https://github.com/vercel/ai-elements) skill for the Customware full-stack template. AI Elements components are installed as React source files, so they do not require Next.js.

## Install Only What The UI Needs

Use pnpm and the shadcn registry only. Do not use npm, npx, yarn, bun, or the interactive AI Elements CLI.

The current registry components require the shadcn primitive versions shipped with them. Overwriting the template's shared primitives breaks existing template component contracts, while keeping the older primitives breaks AI Elements. Use the bundled installer to isolate the registry-matched primitives under `app/components/ai-elements/ui/`.

For the minimal chat:

```bash
pnpm exec node <customware-ai-skill>/scripts/install-ai-elements.mjs conversation message prompt-input --cwd .
```

Resolve `<customware-ai-skill>` to this skill's real directory. The installer runs one pnpm/shadcn invocation with `--yes`, stages files under `.tmp/`, places selected AI Elements under `app/components/ai-elements/`, places their matching primitives under `app/components/ai-elements/ui/`, rewrites only their internal primitive imports, and removes the staging directory.

Do not bypass the installer with `--overwrite` against `app/components/ui/`. That changes shared template primitive APIs and can break unrelated existing UI.

The shadcn registry installs `ai` and component dependencies, but the chat integration still requires the React hook and OpenRouter provider:

```bash
pnpm add ai @ai-sdk/react @openrouter/ai-sdk-provider zod
```

For every available component and its exact pnpm/shadcn command, use [ai-elements-catalog.md](ai-elements-catalog.md). After choosing components, read only their linked files under `components/`; do not load all component references.

The template already has shadcn configuration with `rsc: false`, Tailwind, and `~/components` aliases. Keep AI Elements under `app/components/ai-elements/` and imports under `~/components/ai-elements/...`.

Do not:

- create a Next.js app or `app/api/.../route.ts` files
- treat a generated `"use client"` directive as a Next.js dependency; it is harmless in this React Router SPA
- replace the Hono server with React Router server actions
- install every AI Elements component by default
- edit generated components unless the product needs a real customization

## Basic Streaming Chat

Use `assets/ai-chat/` for the copy-ready frontend and Hono route. It connects browser `useChat` through `DefaultChatTransport({ api: "/api/chat" })`; the browser never receives the gateway key or URL.

For the component APIs, read only:

- [components/conversation.md](components/conversation.md)
- [components/message.md](components/message.md)
- [components/prompt-input.md](components/prompt-input.md)

Give the chat region a concrete height. In flex/grid layouts, include `min-h-0` so the conversation owns internal scrolling.

## Message Parts

AI SDK UI messages are part-based. Render only the parts the feature supports:

- `text` -> `MessageResponse`
- `reasoning` -> one consolidated `Reasoning` block per assistant message
- `tool-*` or dynamic tool parts -> `Tool`, `ToolHeader`, `ToolInput`, and `ToolOutput`
- `source-url` -> group under `Sources`, `SourcesTrigger`, `SourcesContent`, and `Source`

Reasoning models can emit several reasoning parts. Join them into one block to avoid multiple “Thinking” sections:

```tsx
const reasoning = message.parts
  .filter((part) => part.type === "reasoning")
  .map((part) => part.text)
  .join("\n\n");
```

Set `isStreaming` only for reasoning in the last message while chat status is `streaming`. The Hono response must use `sendReasoning: true` for reasoning parts and `sendSources: true` for source parts.

Render tool state as status/details, not as a second action button. Use the part's state (`input-streaming`, `input-available`, `output-available`, `output-error`, or approval states) and keep tool execution on the server.

## Model Selection

Add a model selector only when the product requires end-user choice. Show friendly labels from [models.md](models.md), send only a catalog key such as `default` or `complex`, and validate that key on the Hono server. Never send provider options, the gateway key, org id, or project id from the selector.

## UI Fit

- Follow the app's existing visual system and layout before customizing AI Elements source.
- Preserve accessible labels, keyboard submission, focus behavior, and streaming status.
- Disable duplicate submission while appropriate, but preserve the AI SDK stop behavior when the product exposes it.
- Keep browser code unaware of the Customware gateway URL and secret.
