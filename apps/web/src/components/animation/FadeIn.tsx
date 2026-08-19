"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  distance = 18,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("fade-in", className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: distance }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
