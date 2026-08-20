import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export type SectionProps = HTMLAttributes<HTMLElement>;

export const Section = forwardRef<HTMLElement, SectionProps>(function Section({ className, ...props }, ref) {
  return <section className={cn("section", className)} ref={ref} {...props} />;
});
