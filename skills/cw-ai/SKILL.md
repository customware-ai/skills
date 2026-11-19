---
name: cw-ai
description: Use when adding or changing server-side AI chat, generation, classification, or structured output in a CW Agents app through AI as a Service.
---

# CW Agents AI as a Service

1. Use the app's server. In the Hono template, add any feature route before static serving and the SPA fallback in `apps/api/src/index.ts`. The browser calls the app, never the gateway.
2. Build the gateway base URL in one server module: `https://agents.customware.ai/api/features/ai/v1/<projectId>`. Read `projectId` from the Builder's raw task record at `.tasks/task.json` (the Markdown brief `.tasks/task.md` lists it in its frontmatter) and write it into that constant. Don't render placeholders; if the ID can't be determined, report it in the task outcome.
3. Read `CUSTOMWARE_AI_GATEWAY_KEY` (secret bearer key) from the server environment. CW Agents injects it in the dev sandbox and live app when AI as a Service is on. If it's missing, report that AI as a Service isn't available in the task outcome. Don't invent credentials or expose the key in browser code, bundles, responses, logs, or the repo.
4. Send `Authorization: Bearer ${CUSTOMWARE_AI_GATEWAY_KEY}` on every request.

## Models

Use these defaults unless the user asks for another OpenRouter model ID (other IDs are allowed):

| Use | Model |
| --- | --- |
| Small workhorse and chatbots (reasoning up to `high`) | `meta/muse-ember` |
| Medium, more intelligent chat | `openai/gpt-6.1-terra` |
| Most powerful frontier model, only when the user explicitly wants the best regardless of price | `openai/gpt-6.2-sol` |
| Image generation (`modalities: ["image", "text"]`) | `google/gemini-nano-banana-2.1` |
| Classification and decisions | Decisions API below (the gateway picks the model) |

`meta/muse-ember` always reasons, and reasoning tokens count against `max_tokens`: at its default effort a 500-word reply spends 2,000–5,500 reasoning tokens first, so a small cap ends with `finish_reason: "length"` and no text. For chat, send `reasoning: { effort: "minimal" }` (about 90 reasoning tokens, fastest first word); raise the effort only when the task needs more thinking, and leave `max_tokens` unset or at least 16000.

The free tier replaces the model with `openrouter/free`, supports text output only, and has no decisions. Don't reject a successful response because its `model` differs from the request.

## Chat Completions

`POST {base}/chat/completions` takes the OpenAI Chat Completions shape. The gateway accepts only these top-level fields (unknown fields return 400):

- `model`, `messages`, `stream`, `stream_options`
- `temperature`, `top_p`, `top_k`, `max_tokens`, `max_completion_tokens`, `stop`, `seed`
- `frequency_penalty`, `presence_penalty`, `repetition_penalty`, `logit_bias`, `logprobs`, `top_logprobs`
- `tools`, `tool_choice`, `parallel_tool_calls`, `response_format`, `reasoning`, `modalities`

```ts
import OpenAI from "openai";

const AI_GATEWAY_URL = "https://agents.customware.ai/api/features/ai/v1/<projectId>";

function gateway() {
  const apiKey = process.env.CUSTOMWARE_AI_GATEWAY_KEY;
  if (!apiKey) throw new Error("AI as a Service isn't available.");
  return new OpenAI({ baseURL: AI_GATEWAY_URL, apiKey });
}

export async function generateText(prompt: string) {
  const result = await gateway().chat.completions.create({
    model: "meta/muse-ember",
    messages: [{ role: "user", content: prompt }],
  });
  return result.choices[0]?.message.content;
}

// Streaming: the SDK parses the gateway's server-sent events (SSE).
export async function* streamText(prompt: string, signal?: AbortSignal) {
  const stream = await gateway().chat.completions.create(
    { model: "meta/muse-ember", messages: [{ role: "user", content: prompt }], stream: true },
    { signal },
  );
  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta.content;
    if (text) yield text;
  }
}
```

Handle failures both before and during streaming. Stop the upstream stream when the client disconnects.

## Decisions: classify, score, yes/no

Use `POST {base}/decisions` to classify items (for example, routing incoming emails to a team), score them, or answer yes/no questions. The body is exactly `{ state, questions }`; the gateway chooses the decision model. `state` is a JSON object holding the item being judged. Each named question is one of:

- `{ type: "choice", instructions, criteria: { <option>: <description or null> } }` → answer `{ choice: "<option>" }`
- `{ type: "score", instructions, criteria: [<non-empty strings>] }` → a numeric score
- `{ type: "noul", instructions, criteria?: { true, false } }` → answer `{ noul: <probability 0..1> }`

```ts
export async function classifyEmail(email: { from: string; subject: string; body: string }) {
  const response = await fetch(`${AI_GATEWAY_URL}/decisions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CUSTOMWARE_AI_GATEWAY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state: email,
      questions: {
        team: {
          type: "choice",
          instructions: "Which team should handle this customer email?",
          criteria: {
            billing: "Payments, invoices, refunds, charges.",
            support: "Product problems, bugs, how-to questions.",
            sales: "Pricing questions from prospects, demos, upgrades.",
            spam: "Unsolicited marketing or irrelevant mail.",
          },
        },
        replyToday: { type: "noul", instructions: "Does this email need a reply today?" },
      },
    }),
  });
  if (!response.ok) throw new Error(`Decisions failed with status ${response.status}`);
  // { answers: { team: { choice: "billing" }, replyToday: { noul: 0.87 } } }
  return (await response.json()) as unknown;
}
```

Validate the response with the app's schema at this boundary before using `answers`.

## Errors

Show the user a friendly message, never raw provider errors: 401 means a missing or invalid key; 403 means AI as a Service is off for the org or the tier doesn't include the feature (free tier and decisions); 404 means the project wasn't found; 408 or 413 means the request body was too slow or too large (20 MB limit); 502 or 503 means the provider failed or is unreachable. Upstream 4xx refusals pass through.

## Verify before handing off

Exercise a small app server route with one real call through the gateway in the dev sandbox. Check the returned content or stream, not just the status. For structured output and decisions, validate the actual response against the app's schema. Report any blocker in the task outcome; do not ship a mocked gateway.
