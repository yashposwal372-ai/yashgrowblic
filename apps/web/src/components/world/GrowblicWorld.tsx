"use client";

import { useInView, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { type MutableRefObject, useRef } from "react";

const WorldCanvas = dynamic(() => import("./WorldCanvas").then((module) => module.WorldCanvas), { ssr: false, loading: () => <div className="growblic-world__fallback" /> });

export function GrowblicWorld({ activeIndex = 0, className = "", overview = false, progress = 0, progressRef }: { activeIndex?: number; className?: string; overview?: boolean; progress?: number; progressRef?: MutableRefObject<number> }) {
  const reducedMotion = Boolean(useReducedMotion());
  const worldRef = useRef<HTMLDivElement>(null);
  const visible = useInView(worldRef, { amount: 0.02 });
  return (
    <div aria-hidden="true" className={`growblic-world ${className}`} ref={worldRef}>
      <WorldCanvas activeIndex={activeIndex} overview={overview} progress={progress} progressRef={progressRef} reducedMotion={reducedMotion} visible={visible} />
    </div>
  );
}
