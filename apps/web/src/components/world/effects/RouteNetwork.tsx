"use client";

import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, CatmullRomCurve3, Color, Line, LineBasicMaterial, Vector3 } from "three";

import { worldStages } from "@/data/world";

function RouteTrack({ color, index, offset, overview, progress, progressRef, route }: { color: string; index: number; offset: number; overview: boolean; progress: number; progressRef?: MutableRefObject<number>; route: [number, number, number][] }) {
  const line = useMemo(() => {
    const curve = new CatmullRomCurve3(route.map(([x, y, z]) => new Vector3(x + offset, y, z + offset * .35)), false, "catmullrom", .08);
    const points = curve.getPoints(72);
    const geometry = new BufferGeometry().setFromPoints(points);
    return new Line(geometry, new LineBasicMaterial({ color: new Color(color), transparent: true, opacity: .94 }));
  }, [color, offset, route]);
  const brandColor = useMemo(() => new Color("#356dff"), []);
  const lineRef = useRef(line);

  useFrame(() => {
    const master = progressRef?.current ?? progress;
    const scaled = Math.min(1, Math.max(0, (master - .12) / .17)) * worldStages.length;
    const local = overview ? .08 : Math.min(1, Math.max(0, scaled - index));
    const currentLine = lineRef.current;
    const count = currentLine.geometry.getAttribute("position").count;
    currentLine.geometry.setDrawRange(0, Math.max(0, Math.ceil(count * local)));
    const material = currentLine.material as LineBasicMaterial;
    material.opacity = overview ? .2 : local > 0 && local < 1 ? .94 : local >= 1 ? .28 : 0;
    material.color.set(color).lerp(brandColor, Math.min(1, Math.max(0, (master - .9) / .085)));
    if (master > .985) material.opacity *= Math.max(0, (1 - master) / .015);
  });

  useEffect(() => () => {
    line.geometry.dispose();
    (line.material as LineBasicMaterial).dispose();
  }, [line]);

  return <primitive object={line} />;
}

function StageRoute({ index, overview, progress, progressRef, simplified }: { index: number; overview: boolean; progress: number; progressRef?: MutableRefObject<number>; simplified: boolean }) {
  const stage = worldStages[index];
  const offsets = simplified ? [0] : [-.075, 0, .075];
  const shown = overview ? .08 : 0;
  return <group>
    {offsets.map((offset) => <RouteTrack color={stage.color} index={index} key={offset} offset={offset} overview={overview} progress={progress} progressRef={progressRef} route={stage.route} />)}
    {stage.route.slice(1, -1).map(([x, y, z], nodeIndex) => {
      const reached = shown >= (nodeIndex + 1) / (stage.route.length - 1);
      return <mesh key={`${x}-${z}`} position={[x, y + .02, z]}><cylinderGeometry args={[.09,.09,.055,16]} /><meshStandardMaterial color={reached ? stage.color : "#a9c1cf"} emissive={reached ? stage.color : "#000000"} emissiveIntensity={reached ? .28 : 0} transparent opacity={overview ? .42 : .95} /></mesh>;
    })}
    <mesh position={stage.route.at(-1)}><cylinderGeometry args={[.13,.13,.065,20]} /><meshStandardMaterial color={shown > .88 ? stage.color : "#b4c8d4"} emissive={shown > .88 ? stage.color : "#000000"} emissiveIntensity={shown > .88 ? .55 : 0} /></mesh>
  </group>;
}

export function RouteNetwork({ overview = false, progress = 0, progressRef, simplified = false }: { overview?: boolean; progress?: number; progressRef?: MutableRefObject<number>; simplified?: boolean }) {
  return <group position={[0,0,-42]}>{worldStages.map((stage, index) => <StageRoute index={index} key={stage.id} overview={overview} progress={progress} progressRef={progressRef} simplified={simplified} />)}</group>;
}
