import { useChat } from "@ai-sdk/react";
import type { ChatTools } from "@cw/api/trpc";
import { AI_NOT_AVAILABLE } from "@cw/shared/ai-errors";
import { CHAT_HISTORY_LIMIT, CHAT_TEXT_LIMIT } from "@cw/shared/chat-limits";
import {
  DefaultChatTransport,
  isTextUIPart,
  type InferUITools,
  type PrepareSendMessagesRequest,
  type UIDataTypes,
  type UIMessage,
} from "ai";
import { Result } from "better-result";
import { useRef, useState, type ReactElement } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "~/components/ai-elements/conversation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
} from "~/components/ai-elements/message-layout";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "~/components/ai-elements/prompt-input";
import { Shimmer } from "~/components/ai-elements/shimmer";
import { Suggestion, Suggestions } from "~/components/ai-elements/suggestion";
import { AiResponse } from "~/components/ai-response";

type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<ChatTools>>;

const STARTERS = ["Which todos are still open?", "What should I do first today?"];

/** The answer is the text after the last lookup; text before it is "checking…" filler. */
function messageText(message: ChatMessage): string {
  const answerStart = message.parts.reduce(
    (start, part, index) => (part.type.startsWith("tool-") ? index + 1 : start),
    0,
  );
  return message.parts
    .slice(answerStart)
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("\n\n");
}

const transport = new DefaultChatTransport<ChatMessage>({
  api: "/api/chat",
  prepareSendMessagesRequest: ({
    messages,
  }): ReturnType<PrepareSendMessagesRequest<ChatMessage>> => ({
    body: {
      messages: messages.slice(-CHAT_HISTORY_LIMIT).flatMap((message) => {
        const content = messageText(message).trim().slice(0, CHAT_TEXT_LIMIT);
        return message.role !== "system" && content ? [{ role: message.role, content }] : [];
      }),
    },
  }),
});

/** A temporary conversation with streaming replies and no saved history. */
export default function ChatPage(): ReactElement {
  const [draft, setDraft] = useState("");
  const [unfinished, setUnfinished] = useState<ReadonlyMap<string, "stopped" | "partial">>(
    () => new Map(),
  );
  const [notice, setNotice] = useState<"length" | "interrupted">();
  const stopRequested = useRef(false);
  const { messages, setMessages, sendMessage, regenerate, stop, status, error } =
    useChat<ChatMessage>({
      transport,
      throttle: 40,
      onFinish: ({ message, messages: current, isAbort, isError, finishReason }): void => {
        const stoppedByUser = stopRequested.current && isAbort;
        stopRequested.current = false;
        const interrupted = finishReason !== "stop" && finishReason !== "tool-calls";
        if (stoppedByUser || isError || interrupted) {
          setUnfinished(
            (previous) =>
              new Map([
                ...Array.from(previous).slice(-(CHAT_HISTORY_LIMIT - 1)),
                [message.id, stoppedByUser ? "stopped" : "partial"],
              ]),
          );
        }
        if (stoppedByUser && current.at(-1)?.id !== message.id) {
          setMessages([...current, message]);
        } else if (!stoppedByUser && !isError && interrupted) {
          setNotice(finishReason === "length" ? "length" : "interrupted");
        }
      },
    });
  const pending = status === "submitted" || status === "streaming";
  const lastMessage = messages.at(-1);
  const lastAssistant = lastMessage?.role === "assistant" ? lastMessage : undefined;
  const waiting = pending && (!lastAssistant || !messageText(lastAssistant));

  /** Maps a rejected SDK action to the same safe recovery notice as an interrupted reply. */
  function runChatAction(action: () => Promise<void>): Promise<Result<void, "interrupted">> {
    return Result.tryPromise({
      try: action,
      catch: () => {
        setNotice("interrupted");
        return "interrupted" as const;
      },
    });
  }

  /** Show the user's message immediately and keep the transcript bounded. */
  function send(text: string): void {
    const content = text.trim();
    if (!content || pending) return;
    setDraft("");
    setNotice(undefined);
    stopRequested.current = false;
    setMessages((current) => current.slice(-(CHAT_HISTORY_LIMIT - 2)));
    void runChatAction(() => sendMessage({ text: content }));
  }

  /** Retry only when a turn exists; regenerate rejects for missing turns. */
  function retry(): void {
    if (!messages.length || pending) return;
    setNotice(undefined);
    stopRequested.current = false;
    void runChatAction(() => regenerate());
  }

  return (
    <section className="mx-auto flex h-[calc(100dvh-5rem)] min-h-80 w-full max-w-3xl flex-col divide-y overflow-hidden lg:h-[calc(100dvh-6rem)]">
      <Conversation className="min-h-0 flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Ask a question"
              description="Answers come from your todos. This conversation isn’t saved."
            />
          ) : (
            messages.map((message) => {
              const text = messageText(message);
              const lookups = message.parts.flatMap((part) =>
                part.type !== "tool-listTodos" ||
                (part.state !== "output-available" && part.state !== "output-error")
                  ? []
                  : [
                      {
                        id: part.toolCallId,
                        ok: part.state === "output-available" && part.output.ok,
                      },
                    ],
              );
              const outcome = unfinished.get(message.id);
              const wasStopped = outcome === "stopped";
              if (!text && !lookups.length && !wasStopped) return null;
              const isLatest = message.id === lastAssistant?.id;
              const streaming = status === "streaming" && isLatest;
              return (
                <Message key={message.id} from={message.role}>
                  {lookups.map(({ id, ok }) => (
                    <p key={id} className="text-xs text-muted-foreground">
                      {ok ? "Looked up todos" : "Couldn’t look up todos"}
                    </p>
                  ))}
                  {text && (
                    <MessageContent>
                      {message.role === "user" ? (
                        <p className="whitespace-pre-wrap">{text}</p>
                      ) : (
                        <AiResponse
                          text={text}
                          partial={
                            wasStopped || streaming || (isLatest && Boolean(notice || error))
                          }
                          isAnimating={streaming}
                        />
                      )}
                    </MessageContent>
                  )}
                  {wasStopped && <p className="text-xs text-muted-foreground">Stopped</p>}
                </Message>
              );
            })
          )}
          {waiting && <Shimmer>Thinking…</Shimmer>}
        </ConversationContent>
        <ConversationScrollButton aria-label="Scroll to latest reply" className="size-11" />
      </Conversation>
      <div className="grid shrink-0 gap-4 p-4">
        <div className="sr-only" aria-live="polite">
          {pending
            ? "Generating reply…"
            : lastAssistant && unfinished.get(lastAssistant.id) === "stopped"
              ? "Reply stopped"
              : ""}
        </div>
        {(error || notice) && !pending && (
          <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-1">
            <p role="alert" className="text-sm text-destructive">
              {error?.message === AI_NOT_AVAILABLE
                ? AI_NOT_AVAILABLE
                : notice === "length"
                  ? "The reply ran out of room before it could finish. Try asking for a shorter answer."
                  : notice === "interrupted"
                    ? "The reply was interrupted."
                    : "Could not get a reply. Please try again."}
            </p>
            <MessageActions>
              <MessageAction size="default" variant="outline" className="min-h-11" onClick={retry}>
                Retry
              </MessageAction>
            </MessageActions>
          </div>
        )}
        {messages.length === 0 && !pending && (
          <Suggestions>
            {STARTERS.map((starter) => (
              <Suggestion
                key={starter}
                suggestion={starter}
                onClick={send}
                className="min-h-11"
              />
            ))}
          </Suggestions>
        )}
        <PromptInput onSubmit={({ text }) => send(text)}>
          <PromptInputTextarea
            aria-label="Message"
            placeholder="Write a message…"
            maxLength={CHAT_TEXT_LIMIT}
            value={draft}
            onChange={(event) => setDraft(event.currentTarget.value)}
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              status={status}
              disabled={!pending && !draft.trim()}
              onStop={() => {
                stopRequested.current = true;
                void runChatAction(stop);
              }}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </section>
  );
}
