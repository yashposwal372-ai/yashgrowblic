import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type IconBoxSize = "small" | "default" | "large";

export type IconBoxProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  children: ReactNode;
  size?: IconBoxSize;
};

export function IconBox({
  children,
  className,
  size = "default",
  ...props
}: IconBoxProps) {
  return (
    <span className={cn("icon-box", `icon-box--${size}`, className)} {...props}>
      {children}
    </span>
  );
}
