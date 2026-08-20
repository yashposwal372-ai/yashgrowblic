"use client";

import { useThree } from "@react-three/fiber";
import type { MutableRefObject } from "react";

import { RouteNetwork } from "./effects/RouteNetwork";
import { MasterRoutes } from "./effects/MasterRoutes";
import { WorldCamera } from "./WorldCamera";
import { WorldLighting } from "./WorldLighting";
import { WorldStructures } from "./structures/WorldStructures";
import { MajorDistricts } from "./structures/MajorDistricts";
import { LogoConvergence } from "./effects/LogoConvergence";
import { HomeDistrict } from "./structures/HomeDistrict";

export function WorldScene({ activeIndex, overview, progress, progressRef, reducedMotion }: { activeIndex: number; overview?: boolean; progress: number; progressRef?: MutableRefObject<number>; reducedMotion?: boolean }) {
  const simplified = useThree((state) => state.size.width < 600);
  return (
    <>
      <color attach="background" args={["#dceaf4"]} />
      <fog attach="fog" args={["#dceaf4", 18, 52]} />
      <WorldLighting />
      <WorldCamera overview={overview} progress={progress} progressRef={progressRef} reducedMotion={reducedMotion} />
      <group>
        <HomeDistrict simplified={simplified} />
        <RouteNetwork overview={overview} progress={progress} progressRef={progressRef} simplified={simplified} />
        <MasterRoutes progressRef={progressRef} simplified={simplified} />
        <WorldStructures activeIndex={activeIndex} progress={progress} progressRef={progressRef} simplified={simplified} />
        <MajorDistricts progressRef={progressRef} simplified={simplified} />
      </group>
      <group position={[-55,0,-284]}><LogoConvergence progressRef={progressRef} simplified={simplified} /></group>
    </>
  );
}
