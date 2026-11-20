import { MessageCircleQuestion, X } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, type ReactElement } from "react";

import { Button } from "~/components/ui/button";

// Keep the streaming client and Streamdown out of the initial bundle.
const Chat = lazy(() => import("~/components/chat"));

/**
 * A chat docked on the right of every page. The layout owns `open` so it can make room for the
 * panel; the chat mounts on first open and stays mounted, so closing the panel keeps the conversation.
 */
export function ChatPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}): ReactElement {
  const [started, setStarted] = useState(false);
  const helpButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Move focus with the panel, so keyboard users land in it and return to Help after closing.
  useEffect(() => {
    if (started) (open ? closeButton : helpButton).current?.focus();
  }, [open, started]);

  function show(): void {
    setStarted(true);
    onOpenChange(true);
  }

  return (
    <>
      {!open && (
        <Button
          ref={helpButton}
          className="fixed right-4 bottom-4 z-40 min-h-11 shadow-lg"
          onClick={show}
        >
          <MessageCircleQuestion />
          Help
        </Button>
      )}
      {started && (
        <aside
          aria-label="Help chat"
          className={`${open ? "flex" : "hidden"} fixed inset-0 z-40 flex-col border-l bg-background lg:left-auto lg:w-[420px]`}
        >
          <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
            <h2 className="font-semibold">Help</h2>
            <Button
              ref={closeButton}
              variant="ghost"
              size="icon"
              className="size-11"
              aria-label="Close help chat"
              onClick={() => onOpenChange(false)}
            >
              <X />
            </Button>
          </header>
          <Suspense fallback={<p className="p-4 text-sm text-muted-foreground">Loading…</p>}>
            <Chat />
          </Suspense>
        </aside>
      )}
    </>
  );
}
