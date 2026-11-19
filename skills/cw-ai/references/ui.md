# AI screens: AI Elements and the safe response

Do this once per app, before building any AI screen (chat, summaries, drafts, images). Then follow [chat.md](chat.md) or [tasks.md](tasks.md).

**Rules:**

- Every AI screen uses AI Elements, so it matches the template's theme and handles streaming, scrolling and half-written Markdown.
- All AI-written text renders only through `AiResponse` below. It drops raw HTML, images and half-written links, which model output can't be trusted with.
- If the install or `pnpm run check` fails, fix the cause. Never fall back to plain template components or a bare `Streamdown`.

Keep AI pages as lazy routes; `AiResponse` also defers Streamdown until there is model output.

| Need | Element |
| --- | --- |
| Message list that sticks to the newest reply, with a jump-to-bottom button and an empty state | `Conversation`, `ConversationContent`, `ConversationScrollButton`, `ConversationEmptyState` |
| One message, with Retry or Copy | `Message`, `MessageContent`, `MessageActions`, `MessageAction` |
| Any AI-written text, in chat or anywhere else | `AiResponse` (below), which wraps `MessageResponse` (Streamdown) |
| Input box whose send button becomes Stop while a reply streams | `PromptInput`, `PromptInputTextarea`, `PromptInputSubmit` with `status` and `onStop` |
| Waiting for the first words | `Shimmer` |
| Starter questions | `Suggestions`, `Suggestion` |
| A tool the assistant used | `Tool` with a plain label only, never its raw input or output |
| Generated image | `Image` |

Streamdown repairs half-written Markdown while a reply streams and redraws only the block still being written, so long replies stay fast.

## Install and adapt

Use pnpm only. The template already pins shadcn at 4.23.0; the installer writes under `apps/app/components` before moving the files under `app/components`.

```sh
# From the template root
pnpm install --frozen-lockfile
pnpm add -w -E @openrouter/ai-sdk-provider@3.1.0
pnpm add -w -E ai@7.0.177 --save-catalog-name default
pnpm --filter @cw/app add -E ai@7.0.177 --save-catalog-name default
pnpm --filter @cw/app add -E @ai-sdk/react@4.0.181

# Use the template's already-pinned shadcn 4.23.0 via pnpm.
cd apps/app
# `yes n` answers No to every overwrite prompt, so the template's Base Nova components stay and the command never waits for input.
yes n | pnpm exec shadcn add -y \
  https://elements.ai-sdk.dev/api/registry/conversation.json \
  https://elements.ai-sdk.dev/api/registry/message.json \
  https://elements.ai-sdk.dev/api/registry/prompt-input.json \
  https://elements.ai-sdk.dev/api/registry/shimmer.json \
  https://elements.ai-sdk.dev/api/registry/suggestion.json \
  https://elements.ai-sdk.dev/api/registry/tool.json \
  https://elements.ai-sdk.dev/api/registry/image.json
mv components/ai-elements app/components/
rmdir components
cd ../..

# Remove unused registry extras; apply the generated-component edits before building.
pnpm --filter @cw/app remove @streamdown/code @streamdown/math @streamdown/mermaid @streamdown/cjk nanoid shiki
pnpm --filter @cw/app add -E streamdown@2.8.0 motion@14.14.0 use-stick-to-bottom@1.1.6
# Upgrading the old reference? Also remove direct react-markdown, remark-gfm, and remend.
pnpm install --frozen-lockfile
```

- Fix the generated files until `pnpm run check` passes; expect about 140 errors on a fresh install. Delete exported parts the app doesn't use (attachments, sources, model select, screenshot, microphone, export, branching, toolbar, raw `ToolInput`/`ToolOutput` and `code-block.tsx`), add explicit return types, replace Radix-only props (`asChild`, Radix event and hover-card props) with Base UI's `render` and props, and fix ref errors. Keep the generated markup and variants of the parts you use, so they stay on the template's theme.
- Move `Message`, `MessageContent`, `MessageActions` and `MessageAction` from `message.tsx` into `message-layout.tsx`, leaving only `MessageResponse` in `message.tsx`. `message.tsx` imports Streamdown, so this keeps it out of the chat page until the first reply.
- Retain the template's Base Nova primitives. AI Elements' Radix trigger composition uses Base UI's `render` prop after installation.
- Keep the text-only composer: its Enter handler requires an enabled submit button, Stop is not a submit action, and only an accepted send clears the controlled draft.
- Leave out Streamdown's four optional add-ons and the generated `plugins` prop unless a task explicitly needs them.
- Keep the AI Elements Tool disclosure, but show a safe label only; do not render provider tool inputs, raw output or tool error text.
- In `apps/app/app/app.css`, import `"streamdown/styles.css"` and register `@source "../node_modules/streamdown/dist";` for Tailwind utilities.
- When using registry Image with the task response, narrow its props to `Pick<Experimental_GeneratedImage, "base64" | "mediaType">` rather than decoding duplicate bytes.

## Safe response: `AiResponse`

Copy both files as they are.

### `apps/app/app/components/ai-response.tsx`

```tsx
import { lazy, Suspense, type ReactElement } from "react";

import { Shimmer } from "~/components/ai-elements/shimmer";

// Keep Streamdown out of the initial app and chat route until there is an AI response.
const SafeMessageResponse = lazy(() => import("~/components/ai-response-markdown"));

type AiResponseProps = {
  text: string;
  partial?: boolean;
  isAnimating?: boolean;
};

/** Renders an AI response without loading its Markdown renderer before it is needed. */
export function AiResponse(props: AiResponseProps): ReactElement {
  return (
    <Suspense
      fallback={
        <output>
          <Shimmer>Formatting reply…</Shimmer>
        </output>
      }
    >
      <SafeMessageResponse {...props} />
    </Suspense>
  );
}
```

### `apps/app/app/components/ai-response-markdown.tsx`

```tsx
import type { ReactElement } from "react";
import { defaultRehypePlugins } from "streamdown";

import { MessageResponse } from "~/components/ai-elements/message";

const BLOCKED_ELEMENTS = ["img"];
const PARTIAL_BLOCKED_ELEMENTS = ["img", "a"];
const PARTIAL_LINKS = { linkMode: "text-only" } as const;
// skipHtml only sees raw nodes. Keep sanitization and URL hardening without first parsing HTML.
const REHYPE_PLUGINS = Object.entries(defaultRehypePlugins)
  .filter(([name]) => name !== "raw")
  .map(([, plugin]) => plugin);

/** Applies the same HTML, image and link policy to all model-written text. */
export default function SafeMessageResponse({
  text,
  partial = false,
  isAnimating = false,
}: {
  text: string;
  partial?: boolean;
  isAnimating?: boolean;
}): ReactElement {
  return (
    <MessageResponse
      className="min-w-0 max-w-full [overflow-wrap:anywhere]"
      mode={partial ? "streaming" : "static"}
      isAnimating={isAnimating}
      skipHtml
      disallowedElements={partial ? PARTIAL_BLOCKED_ELEMENTS : BLOCKED_ELEMENTS}
      unwrapDisallowed
      remend={PARTIAL_LINKS}
      rehypePlugins={REHYPE_PLUGINS}
    >
      {text}
    </MessageResponse>
  );
}
```

