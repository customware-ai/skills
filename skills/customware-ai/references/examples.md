# Copy-Ready Examples

Use these assets as starting code. Copy only the selected example into the target app and adapt existing route/component placement instead of creating a parallel app structure.

## AI Chat

Source files:

- `assets/ai-chat/app/components/AIChat.tsx`
- `assets/ai-chat/server/ai/customware-ai.ts`
- `assets/ai-chat/server/ai/chat-routes.ts`

Install the UI components and dependencies:

```bash
pnpm exec node <customware-ai-skill>/scripts/install-ai-elements.mjs conversation message prompt-input --cwd .
pnpm add ai @ai-sdk/react @openrouter/ai-sdk-provider zod
```

Copy the asset files to the matching `app/` and `server/` paths. Mount the Hono routes before static-file serving and the SPA fallback:

```ts
import { createAIChatRoutes } from "./ai/chat-routes.js";

app.route(
  "/",
  createAIChatRoutes({
    orgId: "<real Customware org id>",
    projectId: "<real Customware project id>",
  }),
);
```

Replace both id markers. Render `<AIChat />` in the requested React Router route or layout. Keep the app's existing design and size the chat region explicitly.

## Internal Email Parser

Source files:

- `assets/email-parser/server/ai/customware-ai.ts`
- `assets/email-parser/server/ai/email-parser.ts`

Copy both files under `server/ai/`. Call the parser from an existing internal server workflow:

```ts
const result = await parseEmail(emailContent, {
  orgId: "<real Customware org id>",
  projectId: "<real Customware project id>",
});

if (result.isErr()) {
  return result;
}

const parsedEmail = result.value;
```

The function returns a `ResultAsync` containing Zod-validated structured output with sender, subject, summary, category, urgency, and action items. Keep it internal unless the product explicitly requires an HTTP route.

## Verification

- Run the exact model `hi` check.
- For the email parser, run the one-key JSON gateway check before a representative email parse.
- For chat, exercise two turns through the mounted Hono endpoint.
- Run `pnpm run build` and `pnpm run check`.
