import { AI_NOT_AVAILABLE, AI_TEXT_TOO_LONG } from "@cw/shared/ai-errors";
import { AI_EMAIL_LIMIT, AI_PROMPT_LIMIT } from "@cw/shared/ai-limits";
import { useState, type ReactElement, type ReactNode } from "react";

import { Image } from "~/components/ai-elements/image";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "~/components/ai-elements/prompt-input";
import { Shimmer } from "~/components/ai-elements/shimmer";
import { AiResponse } from "~/components/ai-response";
import { trpc } from "~/lib/trpc";

const SAMPLE_EMAIL =
  "Hi, I’m Alex Example (alex@example.com). I was charged twice for test order TEST-0001. Could you correct the invoice today?";

/** A submit button that shows the pending state of its own action. */
function Submit({
  pending,
  disabled,
  children,
  onClick,
}: {
  pending: boolean;
  disabled: boolean;
  children: ReactNode;
  onClick?: () => void;
}): ReactElement {
  return (
    <PromptInputSubmit
      type={onClick ? "button" : "submit"}
      aria-label={undefined}
      className="min-h-11"
      size="sm"
      variant={onClick ? "outline" : "default"}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? <Shimmer>Working…</Shimmer> : children}
    </PromptInputSubmit>
  );
}

/** Maps the known organization availability error without exposing raw error text. */
function Failure({
  error,
}: {
  error: { message: string; data?: { code?: string } | null } | null;
}): ReactElement | null {
  if (!error) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {error.data?.code === "FORBIDDEN"
        ? AI_NOT_AVAILABLE
        : error.message === AI_TEXT_TOO_LONG
          ? AI_TEXT_TOO_LONG
          : "Something went wrong. Please try again."}
    </p>
  );
}

/** Runs one selected action on the current email. */
function EmailTools(): ReactElement {
  const [email, setEmail] = useState(SAMPLE_EMAIL);
  const [action, setAction] = useState<"classify" | "extract" | "write">("classify");
  const classify = trpc.ai.classify.useMutation({ onMutate: () => setAction("classify") });
  const extract = trpc.ai.extract.useMutation({ onMutate: () => setAction("extract") });
  const write = trpc.ai.write.useMutation({ onMutate: () => setAction("write") });
  const { error } = { classify, extract, write }[action];
  const disabled = !email.trim() || classify.isPending || extract.isPending || write.isPending;

  return (
    <section className="space-y-4 rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="text-lg font-semibold">Email analysis</h2>
      <label htmlFor="ai-email" className="text-sm font-medium">
        Email
      </label>
      <PromptInput
        onSubmit={({ text }) => {
          if (!disabled) classify.mutate({ email: text.trim() });
        }}
      >
        <PromptInputTextarea
          id="ai-email"
          rows={3}
          maxLength={AI_EMAIL_LIMIT}
          submitOnEnter={false}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PromptInputFooter className="flex-wrap justify-start gap-2">
          <Submit pending={classify.isPending} disabled={disabled}>
            Classify email
          </Submit>
          <Submit
            pending={extract.isPending}
            disabled={disabled}
            onClick={() => extract.mutate({ email: email.trim() })}
          >
            Extract fields
          </Submit>
          <Submit
            pending={write.isPending && write.variables.task === "summary"}
            disabled={disabled}
            onClick={() => write.mutate({ email: email.trim(), task: "summary" })}
          >
            Summarize
          </Submit>
          <Submit
            pending={write.isPending && write.variables.task === "draft"}
            disabled={disabled}
            onClick={() => write.mutate({ email: email.trim(), task: "draft" })}
          >
            Draft reply
          </Submit>
        </PromptInputFooter>
      </PromptInput>
      <Failure error={error} />
      {classify.data && (
        <output className="text-sm">
          <strong className="capitalize">{classify.data.team}</strong> ·{" "}
          {classify.data.replyTodayPercent}% needs a reply today
        </output>
      )}
      {extract.data && (
        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="font-medium">Customer</dt>
            <dd>{extract.data.customerName || "Unknown"}</dd>
          </div>
          <div>
            <dt className="font-medium">Order</dt>
            <dd>{extract.data.orderNumber ?? "None"}</dd>
          </div>
          <div>
            <dt className="font-medium">Sentiment</dt>
            <dd className="capitalize">{extract.data.sentiment}</dd>
          </div>
          <div>
            <dt className="font-medium">Summary</dt>
            <dd>
              <AiResponse text={extract.data.summary} />
            </dd>
          </div>
        </dl>
      )}
      {write.data !== undefined && (
        <div className="space-y-2">
          <h3 className="font-medium">
            {write.variables.task === "summary" ? "Summary" : "Draft reply"}
          </h3>
          <AiResponse text={write.data} />
        </div>
      )}
    </section>
  );
}

/** Generates an in-memory raster image. */
function ImageTool(): ReactElement {
  const [prompt, setPrompt] = useState("");
  const image = trpc.ai.image.useMutation();
  return (
    <section className="space-y-4 rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="text-lg font-semibold">Image generation</h2>
      <label htmlFor="ai-image-prompt" className="text-sm font-medium">
        Image prompt
      </label>
      <PromptInput
        onSubmit={({ text }) => {
          if (!image.isPending) image.mutate({ prompt: text.trim() });
        }}
      >
        <PromptInputTextarea
          id="ai-image-prompt"
          rows={3}
          maxLength={AI_PROMPT_LIMIT}
          submitOnEnter={false}
          value={prompt}
          onChange={(event) => setPrompt(event.currentTarget.value)}
        />
        <PromptInputFooter className="justify-start">
          <Submit pending={image.isPending} disabled={!prompt.trim()}>
            Generate image
          </Submit>
        </PromptInputFooter>
      </PromptInput>
      <Failure error={image.error} />
      {image.data && (
        <Image
          className="max-h-96 rounded-lg object-contain"
          alt={image.variables.prompt}
          {...image.data}
        />
      )}
    </section>
  );
}

export default function AiTasksPage(): ReactElement {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-semibold">AI tasks</h1>
      <EmailTools />
      <ImageTool />
    </div>
  );
}
