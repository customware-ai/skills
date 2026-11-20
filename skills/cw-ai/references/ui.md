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
| Generated image | `Image` |

Streamdown repairs half-written Markdown while a reply streams and redraws only the block still being written, so long replies stay fast.

## Look

Mirror the [AI Elements chatbot example](https://elements.ai-sdk.dev/examples/chatbot). Its defaults already look right:

- Keep `Message` and `MessageContent` styling as generated: the user's message is a bubble on the right, the reply is plain text on the left. No role labels ("You", "Assistant"), no extra borders or cards around the conversation.
- Each reply ends with the answer. Anything about how the answer was found, such as a lookup, goes above the text as one muted line ("Looked up todos"). Don't use `Tool`: its status badge and expand arrow read as an error card.
- Show only the text written after a reply's last lookup. Models often write a "checking…" line before calling a tool, and the prompt can't reliably stop it.
- A chat inside an existing app, such as a help chat, opens as a docked panel on the right, at least 420px wide on desktop and full screen on phones. The page beside it stays sharp and usable, because people read their data while they ask about it. Build it as a plain fixed `aside`, not `Sheet` or `Dialog`: those are modal, so they blur the page and block clicks on it. On desktop the page makes room while the panel is open (the layout's main area gets the panel's width as right padding), so nothing hides under it.
- The button that opens the panel hides while it's open, and the panel's header has the close button. A floating button left on screen covers the chat's Send and Stop.

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
  https://elements.ai-sdk.dev/api/registry/image.json
mv components/ai-elements app/components/
rmdir components
cd ../..

# Remove only the add-ons the installer added; pnpm refuses names that aren't direct dependencies.
for p in @streamdown/code @streamdown/math @streamdown/mermaid @streamdown/cjk nanoid shiki; do
  if grep -q "\"$p\"" apps/app/package.json; then pnpm --filter @cw/app remove "$p"; fi
done
pnpm --filter @cw/app add -E streamdown@2.8.0 motion@14.14.0 use-stick-to-bottom@1.1.6
# Upgrading the old reference? Also remove direct react-markdown, remark-gfm, and remend.
pnpm install --frozen-lockfile
```

The generated files fail `pnpm run check` with about 140 errors. Fix them in place; don't replace them with hand-written stand-ins, because the generated markup carries the template's theme and the behaviour below. When done, the components must:

- keep only the parts these screens use: drop attachments, sources, model select, screenshot, microphone, export, branching, toolbar, and `code-block.tsx`;
- use the template's Base UI components and the `render` prop instead of Radix `asChild`, with explicit return types;
- send on Enter (Shift+Enter adds a line), keep the draft until a send is accepted, and make Stop a plain button, not a submit;
- split `message-layout.tsx` (`Message`, `MessageContent`, `MessageActions`, `MessageAction`) from `message.tsx` (`MessageResponse` only), so Streamdown loads only with the first reply;
- run Streamdown without its add-ons and the generated `plugins` prop; add them only when the task description asks for code highlighting, maths, diagrams or CJK text;
- keep the real shimmer animation, respecting reduced motion, and label every icon button;
- take the server's `{ base64, mediaType }` in `Image`.

In `apps/app/app/app.css`, import `"streamdown/styles.css"` and add `@source "../node_modules/streamdown/dist";` so Tailwind sees Streamdown's classes.

## Safe response: `AiResponse`

Copy [`ai-response.tsx`](../assets/examples/apps/app/app/components/ai-response.tsx) and [`ai-response-markdown.tsx`](../assets/examples/apps/app/app/components/ai-response-markdown.tsx) into `apps/app/app/components/` unchanged. All AI-written text renders through `<AiResponse text={…} partial={…} isAnimating={…} />`:

- `partial` while a reply is streaming, stopped or cut off: half-written Markdown is repaired and links show as text.
- `isAnimating` only on the reply that is still streaming.
- Raw HTML is dropped before it's parsed, images are blocked, and Streamdown loads only when the first reply arrives.
