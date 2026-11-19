import { cn } from "cn";
import { memo, type ComponentProps, type ReactElement } from "react";
import { Streamdown } from "streamdown";

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps): ReactElement => (
    <Streamdown
      className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
      {...props}
    />
  ),
);

MessageResponse.displayName = "MessageResponse";
