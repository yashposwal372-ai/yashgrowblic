import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingAlignment = "left" | "center";

export type SectionHeadingProps = {
  align?: SectionHeadingAlignment;
  className?: string;
  description?: string;
  eyebrow?: string;
  title: ReactNode;
};

export function SectionHeading({
  align = "left",
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className={cn("section-heading", `section-heading--${align}`, className)}>
      {eyebrow ? <p className="text-eyebrow">{eyebrow}</p> : null}
      <h2 className="text-section-heading">{title}</h2>
      {description ? <p className="text-body-large">{description}</p> : null}
    </div>
  );
}
