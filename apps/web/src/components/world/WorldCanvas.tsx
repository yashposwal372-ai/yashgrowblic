"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { MutableRefObject } from "react";

import { WorldScene } from "./WorldScene";

export function WorldCanvas({ activeIndex = 0, overview = false, progress = 0, progressRef, reducedMotion = false, visible = true }: { activeIndex?: number; overview?: boolean; progress?: number; progressRef?: MutableRefObject<number>; reducedMotion?: boolean; visible?: boolean }) {
  return (
    <Canvas dpr={[1, 1.45]} frameloop={reducedMotion || !visible ? "demand" : "always"} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
      <OrthographicCamera makeDefault position={[11, 12, 17]} zoom={overview ? 54 : 50} />
      <WorldScene activeIndex={activeIndex} overview={overview} progress={progress} progressRef={progressRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
