# One-off AI tasks: decide, extract, generate

**What:** single requests that return one result, such as a decision, extracted fields, a draft or an image.

**Why this shape:** each runs as a tRPC mutation calling a server service, like any other app action. The browser never sees the gateway, and the template's pending and error patterns apply unchanged. Copy only the pattern the task needs.

## Server

`packages/shared/src/ai-limits.ts`, shared with the UI for `maxLength`; export it as `"./ai-limits"` in `packages/shared/package.json`:

```ts
export const AI_EMAIL_LIMIT = 8_000;
export const AI_PROMPT_LIMIT = 1_000;
```

`apps/api/src/contracts/ai-tools.ts`: zod schemas for inputs and for the gateway's answers. Validating answers here means a changed or malformed reply fails safely instead of reaching the UI or database.

```ts
import { AI_EMAIL_LIMIT, AI_PROMPT_LIMIT } from "@cw/shared/ai-limits";
import { z } from "zod";

export const EmailInput = z.strictObject({ email: z.string().trim().min(1).max(AI_EMAIL_LIMIT) });
export const PromptInput = z.strictObject({
  prompt: z.string().trim().min(1).max(AI_PROMPT_LIMIT),
});
export const EmailFields = z.object({
  customerName: z.string(),
  orderNumber: z.string().nullable(),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  summary: z.string(),
});
export const DecisionsResponse = z.object({
  answers: z.object({
    team: z.object({
      type: z.literal("choice"),
      choice: z.enum(["billing", "support", "sales", "spam"]),
    }),
    replyToday: z.object({ type: z.literal("noul"), noul: z.number().min(0).max(1) }),
  }),
});

export const EmailWritingInput = EmailInput.extend({
  task: z.enum(["summary", "draft"]),
});
export type EmailWritingTask = z.infer<typeof EmailWritingInput>["task"];
```

`apps/api/src/services/ai-tools.ts` uses `gateway`, `gatewayJson`, `sdkError`, `TEXT_MODEL` and `TEXT_PROVIDER_OPTIONS` from `ai-gateway.ts` ([chat.md](chat.md#server)).

- **Decisions** don't need the AI SDK, so they use `gatewayJson`.
- **Extraction** uses `Output.object` with the schema the app saves.
- **Images** read `files` from a `generateText` call with image `modalities`.
- **For a plain summary or draft,** use the shared `writeEmail` service with no object output and return `reply.text`.
- Every prompt treats user content as data.

Example: [`apps/api/src/services/ai-tools.ts`](../assets/examples/apps/api/src/services/ai-tools.ts). Read it before writing this file, then adapt it to the app.

`apps/api/src/trpc/router.ts` maps typed failures to safe tRPC errors once. Add one procedure per task, with imports for `Result`, `AiError`, the input schemas and the services:

```ts
/** Converts typed gateway failures to safe tRPC responses. */
function aiResult<T>(result: Result<T, AiError>): T {
  if (result.isOk()) return result.value;
  switch (result.error) {
    case "NOT_AVAILABLE":
      throw new TRPCError({ code: "FORBIDDEN", message: AI_NOT_AVAILABLE });
    case "NOT_FOUND":
      throw new TRPCError({ code: "NOT_FOUND", message: "The AI resource was not found." });
    case "NOT_CONFIGURED":
    case "GATEWAY_FAILED":
      logServerEvent("error", "AI tool request failed.", { code: result.error }).unwrapOr(
        undefined,
      );
      throw new TRPCError({
        code: "BAD_GATEWAY",
        message: "The AI tool is unavailable. Please try again.",
      });
  }
}

// inside appRouter
ai: t.router({
  write: t.procedure.input(EmailWritingInput).mutation(async ({ input }) => aiResult(await writeEmail(input.email, input.task))),
  classify: t.procedure.input(EmailInput).mutation(async ({ input }) => aiResult(await classifyEmail(input.email))),
  extract: t.procedure.input(EmailInput).mutation(async ({ input }) => aiResult(await extractEmail(input.email))),
  image: t.procedure.input(PromptInput).mutation(async ({ input }) => aiResult(await generateImage(input.prompt))),
}),
```

## Client

First complete [ui.md](ui.md): AI Elements installed and `AiResponse` in place. Use real textareas for prompts, Shimmer on pending actions and Image for the server's raster payload. Keep structured fields and decisions in semantic HTML. Mount this page as a lazy route in `apps/app/app/routes.ts`.

Example: [`apps/app/app/routes/ai-tasks.tsx`](../assets/examples/apps/app/app/routes/ai-tasks.tsx). Read it before writing this file, then adapt it to the app.

**After generating:**

- Store generated images with the app's normal file storage; never link to provider URLs.
- Treat an uncertain decision (low probability or confidence) as a case for a person to review, not as permission to act.
