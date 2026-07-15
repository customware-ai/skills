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
import type { GetWeatherInput, WeatherCardData } from "../../../shared/ai/weather-card";

type WeatherToolPart = ToolUIPart<{
  show_weather_card: {
    input: GetWeatherInput;
    output: WeatherCardData;
  };
}>;

export function GenerativeWeatherChat(): ReactElement {
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
              title="Ask for a weather card"
              description='Try "What is the weather like in Perth?"'
            />
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return <MessageResponse key={`${message.id}-text-${index}`}>{part.text}</MessageResponse>;
                    }

                    const toolPart = getWeatherToolPart(part);
                    if (!toolPart) {
                      return null;
                    }

                    if (toolPart.state === "output-available") {
                      return <WeatherCard key={`${message.id}-card-${index}`} data={toolPart.output} />;
                    }

                    if (toolPart.state === "output-error") {
                      return <WeatherCardError key={`${message.id}-error-${index}`} />;
                    }

                    return (
                      <WeatherCardLoading
                        key={`${message.id}-loading-${index}`}
                        city={getWeatherInputCity(toolPart)}
                      />
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
          placeholder="Ask for a city weather card..."
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

function getWeatherToolPart(part: { type: string }): WeatherToolPart | null {
  if (part.type !== "tool-show_weather_card") {
    return null;
  }

  return part as WeatherToolPart;
}

function WeatherCardLoading({ city }: { city: string }): ReactElement {
  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <p className="text-sm font-medium">Loading weather card</p>
      <p className="text-sm text-muted-foreground">Fetching the latest summary for {city}…</p>
    </div>
  );
}

function WeatherCardError(): ReactElement {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-medium text-red-800">Weather card failed</p>
      <p className="text-sm text-red-700">The server tool did not return a valid weather card.</p>
    </div>
  );
}

function WeatherCard({ data }: { data: WeatherCardData }): ReactElement {
  return (
    <article className="overflow-hidden rounded-2xl border bg-gradient-to-br from-sky-100 via-white to-cyan-50 shadow-sm">
      <div className="border-b bg-white/70 px-5 py-4 backdrop-blur">
        <div className="text-sm text-muted-foreground">{data.condition}</div>
        <div className="text-2xl font-semibold">{data.city}</div>
        <p className="mt-1 text-sm text-muted-foreground">{data.summary}</p>
      </div>

      <div className="grid gap-4 px-5 py-4 md:grid-cols-[auto_1fr]">
        <div>
          <div className="text-4xl font-semibold">{data.temperatureC}°C</div>
          <div className="mt-1 text-sm text-muted-foreground">
            High {data.highC}°C · Low {data.lowC}°C
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-4">
          {data.hourly.map((point) => (
            <div className="rounded-xl border bg-white/80 p-3" key={point.time}>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{point.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{point.time}</div>
              <div className="mt-2 text-lg font-medium">{point.temperatureC}°C</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function getWeatherInputCity(toolPart: WeatherToolPart): string {
  if (
    typeof toolPart.input === "object" &&
    toolPart.input !== null &&
    "city" in toolPart.input &&
    typeof toolPart.input.city === "string" &&
    toolPart.input.city.trim().length > 0
  ) {
    return toolPart.input.city;
  }

  return "the selected city";
}
