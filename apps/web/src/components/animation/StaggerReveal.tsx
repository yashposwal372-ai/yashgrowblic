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
            animate={{ filter: "blur(0px)", opacity: 1, rotateX: 0, rotateY: 0, y: "0%" }}
            className={cn(
              "headline-reveal__line",
              gradientLine === index && "gradient-text",
            )}
            initial={
              shouldReduceMotion ? false : { filter: "blur(4px)", opacity: 0, rotateX: 76, rotateY: -5, y: "48%" }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    delay: 0.035 + index * 0.06,
                    duration: 0.46,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
            style={{ transformOrigin: "50% 100%" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
