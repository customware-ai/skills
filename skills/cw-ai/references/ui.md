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

Then make each generated file match its example in [`assets/ai-elements/`](../assets/ai-elements/): same exports, props and behaviour. The examples pass the template's checks and build; copying an example over its generated file is fine. The generated files fail `pnpm run check` with about 140 errors, so don't keep them as generated.

The examples already:

- keep only the parts these screens use and drop raw tool input and output (and `code-block.tsx`);
- use the template's Base UI components and `render` prop instead of Radix `asChild`;
- send on Enter (Shift+Enter adds a line), keep the draft until a send is accepted, and make Stop a plain button;
- split `message-layout.tsx` (Message, MessageContent, actions) from `message.tsx` (`MessageResponse`), so Streamdown loads only with the first reply;
- run Streamdown without its add-ons; add them only when the task description asks for code highlighting, maths, diagrams or CJK text;
- label icon buttons and respect reduced motion in `Shimmer`;
- take the server's `{ base64, mediaType }` in `Image`.

In `apps/app/app/app.css`, import `"streamdown/styles.css"` and add `@source "../node_modules/streamdown/dist";` so Tailwind sees Streamdown's classes.

## Safe response: `AiResponse`

Copy [`assets/ai-response.tsx`](../assets/ai-response.tsx) and [`assets/ai-response-markdown.tsx`](../assets/ai-response-markdown.tsx) into `apps/app/app/components/` unchanged. All AI-written text renders through `<AiResponse text={…} partial={…} isAnimating={…} />`:

- `partial` while a reply is streaming, stopped or cut off: half-written Markdown is repaired and links show as text.
- `isAnimating` only on the reply that is still streaming.
- Raw HTML is dropped before it's parsed, images are blocked, and Streamdown loads only when the first reply arrives.
