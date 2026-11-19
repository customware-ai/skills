# Streaming chat

**What:** a chat page whose replies stream in, built from AI Elements, with Stop, safe Markdown, and an optional read-only tool over the app's data.

**Why this shape:**

- The reply streams over one dedicated Hono route (`streamText(...).toUIMessageStreamResponse()`), read by `useChat` from `@ai-sdk/react`. tRPC doesn't carry the AI SDK stream format; the rest of the app stays on tRPC.
- The browser sends plain text turns, never system prompts or tool output, so a user can't rewrite the instructions or fake a tool result.

The example files in [`assets/examples/`](../assets/examples/) mirror the app's paths. Copy their structure; rename the tool, prompts and copy for the app.

**Packages** (pin exactly; these versions were verified together):
- Root runtime: `ai@7.0.177` (shared catalog) and `@openrouter/ai-sdk-provider@3.1.0`.
- App workspace: `@ai-sdk/react@4.0.181`, plus the packages the AI Elements installer adds (see Client).

## Server

`apps/api/src/services/ai-gateway.ts` is shared by every AI feature. It keeps the URL and key server-only, maps failures to typed errors, and logs the gateway's error body. That body carries `code`, `message` and `request_id`, which is how you diagnose a failed call from the server log:

Example: [`apps/api/src/services/ai-gateway.ts`](../assets/examples/apps/api/src/services/ai-gateway.ts). Read it before writing this file, then adapt it to the app.

`packages/shared/src/chat-limits.ts` and `packages/shared/src/ai-errors.ts` (shared with the UI):

```ts
export const CHAT_HISTORY_LIMIT = 20;
export const CHAT_TEXT_LIMIT = 8_000;

export const AI_NOT_AVAILABLE = "This AI feature isn't available for your organization.";
```

`apps/api/src/contracts/chat.ts`:

```ts
import { CHAT_HISTORY_LIMIT, CHAT_TEXT_LIMIT } from "@cw/shared/chat-limits";
import { z } from "zod";

export const ChatRequestSchema = z.strictObject({
  messages: z
    .array(
      z.strictObject({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(CHAT_TEXT_LIMIT),
      }),
    )
    .min(1)
    .max(CHAT_HISTORY_LIMIT)
    .refine((messages) => messages.at(-1)?.role === "user"),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
```

`apps/api/src/services/chat.ts`:

- The tool calls the app's existing service and query: allowlisted inputs, parameterized, with a row limit.
- It returns only fields the user may see, because tool results stream to the browser.
- The typed outcome lets the UI tell success from failure.
- `stopWhen` bounds the steps, and `timeout` bounds the whole reply.

Example: [`apps/api/src/services/chat.ts`](../assets/examples/apps/api/src/services/chat.ts). Read it before writing this file, then adapt it to the app.

`apps/api/src/routes/chat.ts`: put the app's auth check here when it has users.

```ts
import { Result } from "better-result";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";

import { ChatRequestSchema } from "../contracts/chat.js";
import { streamChat } from "../services/chat.js";
import { logServerEvent } from "../services/logging.js";

export const chat: Hono = new Hono();

chat.post("/", bodyLimit({ maxSize: 1024 * 1024 }), async (c): Promise<Response> => {
  if (c.req.header("Content-Type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") {
    return c.text("Send a JSON chat request.", 415);
  }
  const input = await Result.tryPromise({
    try: async () => {
      const body: unknown = await c.req.json();
      return ChatRequestSchema.parse(body);
    },
    catch: () => "INVALID_CHAT" as const,
  });
  if (input.isErr()) return c.text("Invalid chat request.", 400);

  const reply = streamChat(input.value, c.req.raw.signal);
  if (reply.isOk()) return reply.value;
  logServerEvent("error", "Chat could not start.", { code: reply.error }).unwrapOr(undefined);
  return c.text("Chat is unavailable. Please try again.", 503);
});
```

## Client

First complete [ui.md](ui.md): AI Elements installed and `AiResponse` in place.

### Chat page: `apps/app/app/routes/chat.tsx`

Example: [`apps/app/app/routes/chat.tsx`](../assets/examples/apps/app/app/routes/chat.tsx). Read it before writing this file, then adapt it to the app.

The page must keep these behaviours:

- Send turns into Stop while a reply streams; **Stopped** marks a reply the user cut off.
- **The reply was interrupted**, with Retry, covers a stream that ended without finishing (a timeout or dropped connection). The SDK reports that as a normal finish, so check `finishReason`.
- A length notice covers a reply that ran out of output tokens.
- Starter questions send on tap.
- A polite live region announces progress to screen readers.

### Long or saved histories

The example keeps the last `CHAT_HISTORY_LIMIT` messages and doesn't save them, so every message renders. When the app saves conversations or a transcript can grow past about 50 messages, render only the messages on screen with `@tanstack/react-virtual@3.14.26` inside `ConversationContent`, and keep auto-scroll to the newest reply. Streamdown keeps each reply cheap to draw, but a long list still slows the page.

## Wiring checklist

The template doesn't ship these; add each one:

1. `packages/shared/package.json` `exports`: `"./chat-limits": "./src/chat-limits.ts"` and `"./ai-errors": "./src/ai-errors.ts"`.
2. `apps/api/src/trpc/router.ts`: `import type { tools } from "../services/chat.js";` and `export type ChatTools = typeof tools;`, so the page gets typed tool parts.
3. `apps/api/src/index.ts`: `app.route("/api/chat", chat);` before static serving and the SPA fallback.
4. `apps/app/vite.config.ts` dev proxy: `"/api/chat": "http://localhost:8080"` next to `/trpc`.
5. `apps/app/app/routes.ts`: register the page lazily under the main layout, and add a nav link:

```ts
const chatRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/chat",
  // Keep the streaming client and Streamdown out of the initial bundle.
  component: lazyRouteComponent(() => import("./routes/chat")),
});
// routeTree: rootRoute.addChildren([layoutRoute.addChildren([indexRoute, chatRoute])])
```
