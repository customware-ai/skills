import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type ToolUIPart } from "ai";
import { useState } from "react";
import type { ReactElement } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "~/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "~/components/ai-elements/message";
import {
  PromptInput,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "~/components/ai-elements/prompt-input";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "~/components/ai-elements/tool";
import type { ListProjectsInput, ListProjectsOutput } from "../../../shared/ai/project-tools";

type ListProjectsToolPart = ToolUIPart<{
  list_projects: {
    input: ListProjectsInput;
    output: ListProjectsOutput;
  };
}>;

export function SQLToolChat(): ReactElement {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  async function handleSubmit(message: PromptInputMessage): Promise<void> {
    if (!message.text.trim()) return;

    await sendMessage({ text: message.text });
    setInput("");
  }

  return (
    <section className="flex h-[640px] min-h-0 flex-col rounded-lg border bg-background">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Ask about project data"
              description='Try "Show 3 active projects owned by Asha".'
            />
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return <MessageResponse key={`${message.id}-text-${index}`}>{part.text}</MessageResponse>;
                    }

                    const toolPart = getListProjectsToolPart(part);
                    if (!toolPart) {
                      return null;
                    }

                    return (
                      <Tool key={`${message.id}-tool-${index}`} defaultOpen={toolPart.state !== "input-streaming"}>
                        <ToolHeader title="Read-only project query" type={toolPart.type} state={toolPart.state} />
                        <ToolContent>
                          <ToolInput input={toolPart.input} />
                          <ToolOutput
                            errorText={toolPart.errorText}
                            output={
                              toolPart.state === "output-available" ? (
                                <ProjectQueryResult result={toolPart.output} />
                              ) : (
                                <p className="text-sm text-muted-foreground">Running the server query…</p>
                              )
                            }
                          />
                        </ToolContent>
                      </Tool>
                    );
                  })}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput className="m-4 mt-0" onSubmit={handleSubmit}>
        <PromptInputTextarea
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          placeholder="Ask for a filtered project list..."
        />
        <PromptInputSubmit
          disabled={status === "ready" && !input.trim()}
          onStop={stop}
          status={status}
        />
      </PromptInput>
    </section>
  );
}

function getListProjectsToolPart(part: { type: string }): ListProjectsToolPart | null {
  if (part.type !== "tool-list_projects") {
    return null;
  }

  return part as ListProjectsToolPart;
}

function ProjectQueryResult({ result }: { result: ListProjectsOutput }): ReactElement {
  return (
    <div className="space-y-3 text-sm">
      <div>
        <p className="font-medium">Generated SQL</p>
        <pre className="mt-1 overflow-x-auto rounded-md bg-muted p-3 text-xs">{result.sql}</pre>
      </div>

      <div>
        <p className="font-medium">Parameters</p>
        <pre className="mt-1 overflow-x-auto rounded-md bg-muted p-3 text-xs">
          {JSON.stringify(result.params, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Rows ({result.rowCount})</p>
        <ul className="space-y-2">
          {result.rows.map((row) => (
            <li className="rounded-md border p-3" key={row.id}>
              <div className="font-medium">{row.name}</div>
              <div className="text-muted-foreground">
                {row.ownerName} · {row.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
