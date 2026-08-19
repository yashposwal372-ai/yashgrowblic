"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

export type StaggerRevealProps = {
  className?: string;
  gradientLine?: number;
  lines: string[];
};

export function StaggerReveal({
  className,
  gradientLine,
  lines,
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <h1 className={cn("headline-reveal text-hero", className)}>
      {lines.map((line, index) => (
        <span className="headline-reveal__mask" key={line}>
          <motion.span
            animate={{ opacity: 1, y: "0%" }}
            className={cn(
              "headline-reveal__line",
              gradientLine === index && "gradient-text",
            )}
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: "105%" }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    delay: 0.12 + index * 0.09,
                    duration: 0.62,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
