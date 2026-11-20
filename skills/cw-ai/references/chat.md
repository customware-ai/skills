# Streaming chat

**What:** a chat page whose replies stream in, built from AI Elements, with Stop, safe Markdown, and an optional read-only tool over the app's data.

**Why this shape:**

- The reply streams over one dedicated Hono route (`streamText(...).toUIMessageStreamResponse()`), read by `useChat` from `@ai-sdk/react`. tRPC doesn't carry the AI SDK stream format; the rest of the app stays on tRPC.
- The AI SDK carries the conversation end to end: `useChat` sends its UI messages intact, and the server only validates and converts them for the model. Lookups, their results and reasoning stay in the history, so follow-up questions work and each turn resends the same prefix for the provider's prompt cache. Don't rebuild, trim or re-shape messages in between; hide the text written before a lookup only when drawing the reply.
- The gateway is only a proxy for the key and usage. The OpenRouter provider talks to it as it would to OpenRouter.

The example files in [`assets/examples/`](../assets/examples/) mirror the app's paths. Copy their structure; rename the tool, prompts and copy for the app.

**Packages** (pin exactly; these versions were verified together):
- Root runtime: `ai@7.0.177` (shared catalog) and `@openrouter/ai-sdk-provider@3.1.0`.
- App workspace: `@ai-sdk/react@4.0.181`, plus the packages the AI Elements installer adds (see Client).

## Server

`apps/api/src/services/ai-gateway.ts` is shared by every AI feature. It keeps the URL and key server-only, maps failures to typed errors, and logs the gateway's error body. That body carries `code`, `message` and `request_id`, which is how you diagnose a failed call from the server log:

Example: [`apps/api/src/services/ai-gateway.ts`](../assets/examples/apps/api/src/services/ai-gateway.ts). Read it before writing this file, then adapt it to the app.

`packages/shared/src/ai-errors.ts` (shared with the UI):

```ts
export const AI_NOT_AVAILABLE = "This AI feature isn't available for your organization.";
export const AI_TOO_LONG = "This conversation is too long for the AI. Start a new chat.";
export const AI_TEXT_TOO_LONG = "This text is too long for the AI. Shorten it and try again.";
```

`apps/api/src/services/chat.ts`:

- The tool calls the app's existing service and query: allowlisted inputs, parameterized, with a row limit.
- It returns only fields the user may see, because tool results stream to the browser.
- The typed outcome lets the UI tell success from failure. Nothing found, such as an unknown name or an empty list, is a successful lookup, not a failure.
- The system prompt makes replies read like a person answering: no "Let me check…" lines, no internal names (organization, project ID, tool names), only the answer and what it rests on.
- `stopWhen` bounds the steps, and `timeout` bounds the whole reply.
- `experimental_download` returns `null` for every file, so the server never fetches a URL the browser put in the history.
- The browser can edit the history it sends, but that only changes its own conversation. `safeValidateUIMessages` checks each registered tool's parts against its `inputSchema` and `outputSchema`, so give every tool both. It can't prove a result is real, so each tool checks the caller's access itself when the app has users.
- Reasoning streams to the browser with the reply so it can come back in the history. The page doesn't show it, but anyone can read it in the network tab: keep secrets out of the system prompt.

Example: [`apps/api/src/services/chat.ts`](../assets/examples/apps/api/src/services/chat.ts). Read it before writing this file, then adapt it to the app.

`apps/api/src/routes/chat.ts`: put the app's auth check here when it has users. The 10 MiB body limit protects the app's memory and stays under the gateway's 20 MiB. A history over the model's context window is trimmed in the middle by OpenRouter's context compression, which the gateway turns on. When even that can't fit, or the body passes 10 MiB, the page shows `AI_TOO_LONG` with New chat.

```ts
import { AI_TOO_LONG } from "@cw/shared/ai-errors";
import { Result } from "better-result";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";

import { streamChat } from "../services/chat.js";
import { logServerEvent } from "../services/logging.js";

export const chat: Hono = new Hono();

chat.post(
  "/",
  bodyLimit({ maxSize: 10 * 1024 * 1024, onError: (c) => c.text(AI_TOO_LONG, 413) }),
  async (c): Promise<Response> => {
    if (
      c.req.header("Content-Type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json"
    ) {
      return c.text("Send a JSON chat request.", 415);
    }
    const body = await Result.tryPromise({
      try: () => c.req.json<{ messages?: unknown }>(),
      catch: () => "INVALID_CHAT" as const,
    });
    if (body.isErr()) return c.text("Invalid chat request.", 400);

    const reply = await streamChat(body.value?.messages, c.req.raw.signal);
    if (reply.isOk()) return reply.value;
    if (reply.error === "INVALID_CHAT") return c.text("Invalid chat request.", 400);
    logServerEvent("error", "Chat could not start.", { code: reply.error }).unwrapOr(undefined);
    return c.text("Chat is unavailable. Please try again.", 503);
  },
);
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

The example doesn't save conversations; the browser holds the whole history, and the gateway compresses it when it outgrows the model's context window. When the app saves conversations, follow the AI SDK's message persistence pattern: the browser sends only the new message, and the server loads the history and passes the loaded history as `originalMessages` to `toUIMessageStreamResponse` and saves `messages` from its `onEnd`, and Retry must replace the last reply on the server. When a transcript can grow past about 50 messages, render only the messages on screen with `@tanstack/react-virtual@3.14.26` inside `ConversationContent`, and keep auto-scroll to the newest reply. Streamdown keeps each reply cheap to draw, but a long list still slows the page.

## Wiring checklist

The template doesn't ship these; add each one:

1. `packages/shared/package.json` `exports`: `"./ai-errors": "./src/ai-errors.ts"`.
2. `apps/api/src/trpc/router.ts`: `export type { ChatMessage } from "../services/chat.js";`, so the page gets typed tool parts.
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
