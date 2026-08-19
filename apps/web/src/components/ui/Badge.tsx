import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  indicator?: boolean;
};

export function Badge({
  children,
  className,
  indicator = false,
  ...props
}: BadgeProps) {
  return (
    <span className={cn("badge", className)} {...props}>
      {indicator ? <span aria-hidden="true" className="badge__indicator" /> : null}
      {children}
    </span>
  );
}
