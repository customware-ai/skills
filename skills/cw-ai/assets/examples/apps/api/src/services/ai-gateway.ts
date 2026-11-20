import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { APICallError } from "ai";
import { Result } from "better-result";
import { z } from "zod";

import { logServerEvent } from "./logging.js";

// The project ID comes from .tasks/task.json; never a placeholder.
const AI_GATEWAY_URL = "https://agents.customware.ai/api/features/ai/v1/<projectId>";

export const TEXT_MODEL = "meta/muse-ember";
export const TEXT_PROVIDER_OPTIONS = { openrouter: { reasoning: { effort: "minimal" } } };

export type AiError =
  | "NOT_CONFIGURED"
  | "NOT_AVAILABLE"
  | "NOT_FOUND"
  | "TOO_LONG"
  | "GATEWAY_FAILED";

const apiKey = Result.try({
  try: () => z.string().min(1).parse(process.env.CUSTOMWARE_AI_GATEWAY_KEY),
  catch: () => "NOT_CONFIGURED" as const,
});

export const gateway = apiKey.map((key) =>
  createOpenRouter({ baseURL: AI_GATEWAY_URL, apiKey: key }),
);

/**
 * Logs the gateway's error body ({ error: { code, message, request_id } }) so failures can be
 * diagnosed from the server log, and maps the status to a typed error for the UI.
 */
function failure(status: number | undefined, body: string | undefined): AiError {
  logServerEvent("error", "AI gateway call failed.", { status, body: body?.slice(0, 2_000) }).unwrapOr(
    undefined,
  );
  if (status === 403) return "NOT_AVAILABLE";
  if (status === 404) return "NOT_FOUND";
  if (status === 400 && body?.includes("maximum context length")) return "TOO_LONG";
  return "GATEWAY_FAILED";
}

/** Classifies a rejected AI SDK call. */
export function sdkError(error: unknown): AiError {
  return APICallError.isInstance(error)
    ? failure(error.statusCode, error.responseBody)
    : failure(undefined, error instanceof Error ? error.message : undefined);
}

/** POSTs JSON to a gateway endpoint the AI SDK doesn't cover and parses the reply. */
export async function gatewayJson<T>(
  path: string,
  schema: z.ZodType<T>,
  json: object,
): Promise<Result<T, AiError>> {
  if (apiKey.isErr()) return apiKey;
  const key = apiKey.value;
  const response = await Result.tryPromise({
    try: () =>
      fetch(`${AI_GATEWAY_URL}/${path}`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(90_000),
      }),
    catch: () => "GATEWAY_FAILED" as const,
  });
  if (response.isErr()) return response;
  if (!response.value.ok) {
    const body = await Result.tryPromise(() => response.value.text());
    return Result.err(failure(response.value.status, body.unwrapOr(undefined)));
  }
  return Result.tryPromise({
    try: async () => schema.parse(await response.value.json()),
    catch: () => "GATEWAY_FAILED" as const,
  });
}
