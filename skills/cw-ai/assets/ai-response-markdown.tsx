import type { ReactElement } from "react";
import { defaultRehypePlugins } from "streamdown";

import { MessageResponse } from "~/components/ai-elements/message";

const BLOCKED_ELEMENTS = ["img"];
const PARTIAL_BLOCKED_ELEMENTS = ["img", "a"];
const PARTIAL_LINKS = { linkMode: "text-only" } as const;
// skipHtml only sees raw nodes. Keep sanitization and URL hardening without first parsing HTML.
const REHYPE_PLUGINS = Object.entries(defaultRehypePlugins)
  .filter(([name]) => name !== "raw")
  .map(([, plugin]) => plugin);

/** Applies the same HTML, image and link policy to all model-written text. */
export default function SafeMessageResponse({
  text,
  partial = false,
  isAnimating = false,
}: {
  text: string;
  partial?: boolean;
  isAnimating?: boolean;
}): ReactElement {
  return (
    <MessageResponse
      className="min-w-0 max-w-full [overflow-wrap:anywhere]"
      mode={partial ? "streaming" : "static"}
      isAnimating={isAnimating}
      skipHtml
      disallowedElements={partial ? PARTIAL_BLOCKED_ELEMENTS : BLOCKED_ELEMENTS}
      unwrapDisallowed
      remend={PARTIAL_LINKS}
      rehypePlugins={REHYPE_PLUGINS}
    >
      {text}
    </MessageResponse>
  );
}
