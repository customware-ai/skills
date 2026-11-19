import { cn } from "cn";
import type { Experimental_GeneratedImage } from "ai";
import type { ReactElement } from "react";

export type ImageProps = Pick<Experimental_GeneratedImage, "base64" | "mediaType"> & {
  className?: string;
  alt?: string;
};

export const Image = ({ base64, mediaType, ...props }: ImageProps): ReactElement => (
  <img
    {...props}
    alt={props.alt}
    className={cn("h-auto max-w-full overflow-hidden rounded-md", props.className)}
    src={`data:${mediaType};base64,${base64}`}
  />
);
