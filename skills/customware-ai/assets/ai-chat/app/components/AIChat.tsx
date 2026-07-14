import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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

export function AIChat(): ReactElement {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  async function handleSubmit(message: PromptInputMessage): Promise<void> {
    if (!message.text.trim()) return;

    await sendMessage({ text: message.text });
    setInput("");
  }

  return (
    <section className="flex h-[600px] min-h-0 flex-col rounded-lg border bg-background">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState title="Start a conversation" description="Ask anything to begin." />
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  <MessageResponse>
                    {message.parts
                      .filter((part) => part.type === "text")
                      .map((part) => part.text)
                      .join("")}
                  </MessageResponse>
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
          placeholder="Ask anything..."
        />
        <PromptInputSubmit disabled={!input.trim()} status={status} />
      </PromptInput>
    </section>
  );
}
