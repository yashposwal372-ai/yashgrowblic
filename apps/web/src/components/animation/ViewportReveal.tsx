"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ViewportRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ViewportReveal({
  children,
  className,
  delay = 0,
}: ViewportRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("viewport-reveal", className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
      viewport={{ amount: 0.18, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
