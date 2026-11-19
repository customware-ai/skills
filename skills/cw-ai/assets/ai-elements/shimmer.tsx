import { cn } from "cn";
import { motion, useReducedMotion } from "motion/react";
import { memo, type CSSProperties, type ReactElement } from "react";

type TextShimmerProps = {
  children: string;
  className?: string;
};

type ShimmerStyle = CSSProperties & { "--spread": string };
const ShimmerComponent = ({ children, className }: TextShimmerProps): ReactElement => {
  const reduceMotion = useReducedMotion();
  const style: ShimmerStyle = {
    "--spread": `${children.length * 2}px`,
    backgroundImage:
      "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))",
  };

  return (
    <motion.span
      animate={reduceMotion ? undefined : { backgroundPosition: "0% center" }}
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className,
      )}
      initial={{ backgroundPosition: "100% center" }}
      style={style}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </motion.span>
  );
};

export const Shimmer = memo(ShimmerComponent);
