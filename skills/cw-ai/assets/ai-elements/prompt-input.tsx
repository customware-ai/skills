import type { ChatStatus } from "ai";
import { cn } from "cn";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import type { ComponentProps, FormEvent, ReactElement } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "~/components/ui/input-group";

type PromptInputProps = Omit<ComponentProps<"form">, "onSubmit"> & {
  onSubmit: (message: { text: string }) => void;
};

/** Sends only the text supported by these endpoints. The caller owns clearing accepted drafts. */
export function PromptInput({
  className,
  children,
  onSubmit,
  ...props
}: PromptInputProps): ReactElement {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("message");
    if (typeof value === "string" && value.trim()) onSubmit({ text: value });
  }

  return (
    <form className={cn("w-full", className)} {...props} onSubmit={handleSubmit}>
      <InputGroup>{children}</InputGroup>
    </form>
  );
}

type PromptInputTextareaProps = ComponentProps<typeof InputGroupTextarea> & {
  submitOnEnter?: boolean;
};

/** Preserves multiline input and consults the actual enabled Send button before submitting. */
export function PromptInputTextarea({
  className,
  placeholder = "What would you like to know?",
  submitOnEnter = true,
  onKeyDown,
  ...props
}: PromptInputTextareaProps): ReactElement {
  return (
    <InputGroupTextarea
      className={cn("field-sizing-content max-h-48 min-h-16", className)}
      placeholder={placeholder}
      {...props}
      name="message"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          !submitOnEnter ||
          event.key !== "Enter" ||
          event.shiftKey ||
          event.nativeEvent.isComposing ||
          event.keyCode === 229
        ) {
          return;
        }
        event.preventDefault();
        const { form } = event.currentTarget;
        const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]:enabled');
        if (submit) form?.requestSubmit(submit);
      }}
    />
  );
}

/** Keeps composer controls in the Base Nova input group's footer. */
export function PromptInputFooter({
  className,
  ...props
}: Omit<ComponentProps<typeof InputGroupAddon>, "align">): ReactElement {
  return (
    <InputGroupAddon
      align="block-end"
      className={cn("justify-between gap-1", className)}
      {...props}
    />
  );
}

type PromptInputSubmitProps = ComponentProps<typeof InputGroupButton> & {
  status?: ChatStatus;
  onStop?: () => void;
};

/** Stop is a separate button action, never a form submission. */
export function PromptInputSubmit({
  className,
  status,
  onStop,
  onClick,
  children,
  size = "icon-sm",
  variant = "default",
  ...props
}: PromptInputSubmitProps): ReactElement {
  const canStop = Boolean(onStop) && (status === "submitted" || status === "streaming");
  return (
    <InputGroupButton
      aria-label={canStop ? "Stop reply" : "Send message"}
      className={cn("min-h-11 min-w-11", className)}
      size={size}
      variant={variant}
      {...props}
      type={canStop ? "button" : (props.type ?? "submit")}
      onClick={canStop ? () => onStop?.() : onClick}
    >
      {children ?? (canStop ? <SquareIcon /> : <ArrowUpIcon />)}
    </InputGroupButton>
  );
}
