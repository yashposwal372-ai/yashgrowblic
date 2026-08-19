import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("section", className)} {...props} />;
}
