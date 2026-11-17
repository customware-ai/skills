---
name: cw-ai
description: Use when adding or changing server-side AI chat, generation, or structured output in a CW Agents app through AI as a Service.
---

# CW Agents AI as a Service

1. Use the app's server. In the Hono template, add any feature route before static serving and the SPA fallback in `apps/api/src/index.ts`. The browser calls the app, never the gateway.
2. Read `CUSTOMWARE_AI_GATEWAY_URL` (base URL ending in `/v1`) and `CUSTOMWARE_AI_GATEWAY_KEY` (secret bearer key) from the server environment. CW Agents injects both in the dev sandbox and live app when AI as a Service is on. If either is missing, report that AI as a Service isn't available in the task outcome. Don't invent credentials or expose the key in browser code, bundles, responses, logs, or the repo.
3. Use the official `openai` npm SDK with `baseURL` set to the gateway URL, or use server-side `fetch` to send `POST ${CUSTOMWARE_AI_GATEWAY_URL}/chat/completions` with `Authorization: Bearer ${CUSTOMWARE_AI_GATEWAY_KEY}`.

## Gateway contract

Use the OpenAI Chat Completions request shape. The gateway accepts only these top-level fields (unknown fields return 400):

- `model`, `messages`, `stream`, `stream_options`
- `temperature`, `top_p`, `top_k`, `max_tokens`, `max_completion_tokens`, `stop`, `seed`
- `frequency_penalty`, `presence_penalty`, `repetition_penalty`, `logit_bias`, `logprobs`, `top_logprobs`
- `tools`, `tool_choice`, `parallel_tool_calls`, `response_format`, `reasoning`, `modalities`

Use OpenRouter model IDs, not presets. The org's tier can limit model pricing or substitute a cheaper model (the free tier forces `openrouter/free`). Don't reject a successful response because its `model` differs from the request.

Handle gateway errors at the app boundary with a user-facing message, not raw provider errors: 401 means a missing or invalid key; 403 means AI as a Service is off for the org; upstream 4xx refusals pass through (for example, a model above the tier's price ceiling); 503 means the provider is unreachable.

## Server examples

```ts
import OpenAI from "openai";

function gateway() {
  const { CUSTOMWARE_AI_GATEWAY_URL: baseURL, CUSTOMWARE_AI_GATEWAY_KEY: apiKey } = process.env;
  if (!baseURL || !apiKey) throw new Error("AI as a Service isn't available.");
  return new OpenAI({ baseURL, apiKey });
}

// Non-streaming text completion
export async function generateText(model: string, prompt: string) {
  const result = await gateway().chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
  });
  return result.choices[0]?.message.content;
}

// Streaming: the SDK parses the gateway's server-sent events (SSE).
export async function* streamText(model: string, prompt: string, signal?: AbortSignal) {
  const stream = await gateway().chat.completions.create(
    { model, messages: [{ role: "user", content: prompt }], stream: true },
    { signal },
  );
  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta.content;
    if (text) yield text;
  }
}
```

Handle failures both before and during streaming. Stop the upstream stream when the client disconnects.

## Verify before handing off

Exercise a small app server route with one real call through the gateway in the dev sandbox. Check the returned content or stream, not just the status. For structured output, validate the actual response against the app's schema. Report any blocker in the task outcome; do not ship a mocked gateway.
