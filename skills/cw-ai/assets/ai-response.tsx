import { lazy, Suspense, type ReactElement } from "react";

import { Shimmer } from "~/components/ai-elements/shimmer";

// Keep Streamdown out of the initial app and chat route until there is an AI response.
const SafeMessageResponse = lazy(() => import("~/components/ai-response-markdown"));

type AiResponseProps = {
  text: string;
  partial?: boolean;
  isAnimating?: boolean;
};

/** Renders an AI response without loading its Markdown renderer before it is needed. */
export function AiResponse(props: AiResponseProps): ReactElement {
  return (
    <Suspense
      fallback={
        <output>
          <Shimmer>Formatting reply…</Shimmer>
        </output>
      }
    >
      <SafeMessageResponse {...props} />
    </Suspense>
  );
}
