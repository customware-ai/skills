import type { ReactElement } from "react";

import Chat from "~/components/chat";

export default function ChatPage(): ReactElement {
  return (
    <section className="mx-auto flex h-[calc(100dvh-5rem)] min-h-80 w-full max-w-3xl flex-col lg:h-[calc(100dvh-6rem)]">
      <Chat />
    </section>
  );
}
