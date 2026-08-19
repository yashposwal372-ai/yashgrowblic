import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn("card", interactive && "card--interactive", className)}
      {...props}
    />
  );
}
