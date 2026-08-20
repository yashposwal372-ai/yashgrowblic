"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useRef } from "react";
import type { Group } from "three";

import { worldStages } from "@/data/world";

const shell = "#e4eef4";
const shellLight = "#f7fafc";
const shellShade = "#b8cdda";

function Material({ active, color, light = false }: { active: boolean; color: string; light?: boolean }) {
  return <meshStandardMaterial color={light ? shellLight : shell} emissive={active ? color : "#000000"} emissiveIntensity={active ? 0.075 : 0} metalness={0.02} roughness={0.62} />;
}

function Base({ active, color, size = [2.4, 2] }: { active: boolean; color: string; size?: [number, number] }) {
  return <><mesh position={[0,.012,0]} rotation={[-Math.PI/2,0,0]} scale={[size[0]*.62,size[1]*.62,1]}><circleGeometry args={[1,28]} /><meshBasicMaterial color="#66849a" depthWrite={false} opacity={.09} transparent /></mesh><RoundedBox args={[size[0], .16, size[1]]} position={[0, .08, 0]} radius={.1} smoothness={2}><meshStandardMaterial color={active ? color : "#d6e3eb"} roughness={.8} /></RoundedBox></>;
}

function Beacon({ active, color, y = 2 }: { active: boolean; color: string; y?: number }) {
  return <group position={[0, y, 0]}><mesh><cylinderGeometry args={[.045,.065,.48,10]} /><meshStandardMaterial color={shellShade} /></mesh><mesh position={[0,.3,0]}><sphereGeometry args={[.105,14,14]} /><meshStandardMaterial color={active ? color : "#b6c8d3"} emissive={active ? color : "#000"} emissiveIntensity={active ? .7 : 0} /></mesh></group>;
}

function Facade({ active, color, count = 3, yStart = .55, width = 1 }: { active: boolean; color: string; count?: number; yStart?: number; width?: number }) {
  return <>{Array.from({ length: count }, (_, index) => <mesh key={index} position={[0,yStart + index * .34,.515]}><boxGeometry args={[width,.055,.025]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} emissive={active ? color : "#000"} emissiveIntensity={active ? .22 : 0} /></mesh>)}</>;
}

function AIHub({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[2.15,1.8]} /><RoundedBox args={[1.25,2.2,1.05]} position={[0,1.25,0]} radius={.12} smoothness={3}><Material active={active} color={color} /></RoundedBox><Facade active={active} color={color} count={5} yStart={.55} width={.78} />{[-.48,.48].map((x) => <mesh key={x} position={[x,1.45,0]}><boxGeometry args={[.12,1.7,1.18]} /><meshStandardMaterial color={active ? color : shellShade} roughness={.72} /></mesh>)}<RoundedBox args={[.82,.22,.72]} position={[0,2.48,0]} radius={.06} smoothness={2}><meshStandardMaterial color={active ? color : "#b9ccd8"} /></RoundedBox><Beacon active={active} color={color} y={2.78} /></group>;
}

function WebStudio({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[3.15,2.15]} /><RoundedBox args={[2.65,1.05,1.55]} position={[0,.7,0]} radius={.15} smoothness={3}><Material active={active} color={color} light /></RoundedBox><mesh position={[0,.78,.79]}><boxGeometry args={[2.15,.55,.035]} /><meshStandardMaterial color="#dce8f0" /></mesh><mesh position={[-.72,.78,.82]}><boxGeometry args={[.55,.33,.025]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh><mesh position={[.2,.78,.82]}><boxGeometry args={[1.05,.08,.025]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh>{[-1.18,1.18].map((x) => <RoundedBox args={[.46,.62,.62]} key={x} position={[x,.42,-.85]} radius={.08} smoothness={2}><Material active={active} color={color} /></RoundedBox>)}</group>;
}

function MobileLab({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[1.65,2.3]} /><RoundedBox args={[.95,2.35,.55]} position={[0,1.32,0]} radius={.18} smoothness={4}><Material active={active} color={color} light /></RoundedBox><mesh position={[0,1.34,.295]}><boxGeometry args={[.7,1.72,.02]} /><meshStandardMaterial color="#d4e2ea" /></mesh><mesh position={[0,2.04,.32]}><boxGeometry args={[.3,.035,.02]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh><mesh position={[0,.58,.32]}><circleGeometry args={[.055,14]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh><Beacon active={active} color={color} y={2.72} /></group>;
}

function SaaSTower({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[2.25,2.1]} />{[0,1,2,3].map((level) => <RoundedBox args={[1.55 - level*.12,.64,1.32 - level*.08]} key={level} position={[0,.52 + level*.62,0]} radius={.1} smoothness={3}><Material active={active} color={color} light={level%2===0} /></RoundedBox>)}{[0,1,2,3].map((level) => <mesh key={level} position={[0,.55 + level*.62,.69 - level*.04]}><boxGeometry args={[.9,.08,.025]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh>)}<mesh position={[0,3.02,0]}><torusGeometry args={[.34,.07,8,20]} /><meshStandardMaterial color={active ? color : shellShade} /></mesh></group>;
}

function EducationCampus({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[3.35,2.65]} />{[[-.85,.66,-.35],[.85,.66,-.35],[-.85,.55,.65],[.85,.55,.65]].map(([x,y,z],index) => <RoundedBox args={[1.15,y*1.45,.85]} key={index} position={[x,y, z]} radius={.1} smoothness={3}><Material active={active} color={color} light={index<2} /></RoundedBox>)}<RoundedBox args={[.72,1.75,.72]} position={[0,1.02,0]} radius={.12} smoothness={3}><Material active={active} color={color} light /></RoundedBox><mesh position={[0,1.6,.38]}><boxGeometry args={[.4,.08,.02]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh><Beacon active={active} color={color} y={2.02} /></group>;
}

function SecurityCore({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[2.45,2.45]} /><RoundedBox args={[1.85,.55,1.85]} position={[0,.43,0]} radius={.08} smoothness={2}><Material active={active} color={color} /></RoundedBox><RoundedBox args={[1.42,.66,1.42]} position={[0,.98,0]} radius={.08} smoothness={2}><Material active={active} color={color} light /></RoundedBox><RoundedBox args={[.92,.82,.92]} position={[0,1.68,0]} radius={.08} smoothness={2}><Material active={active} color={color} /></RoundedBox><mesh position={[0,1.7,.48]}><boxGeometry args={[.45,.45,.03]} /><meshStandardMaterial color={active ? color : "#9fb7c6"} /></mesh><Beacon active={active} color={color} y={2.25} /></group>;
}

function GrowthSignal({ active, color }: { active: boolean; color: string }) {
  return <group><Base active={active} color={color} size={[2.15,2.15]} /><RoundedBox args={[.72,1.5,.72]} position={[0,.86,0]} radius={.1} smoothness={3}><Material active={active} color={color} /></RoundedBox><mesh position={[0,2,0]}><cylinderGeometry args={[.06,.11,1.15,10]} /><meshStandardMaterial color={shellShade} /></mesh>{[.28,.48,.68].map((radius) => <mesh key={radius} position={[0,2.25,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[radius,.025,6,24,Math.PI]} /><meshStandardMaterial color={active ? color : "#adc0cc"} emissive={active ? color : "#000"} emissiveIntensity={active ? .3 : 0} /></mesh>)}<mesh position={[0,2.56,0]}><sphereGeometry args={[.11,14,14]} /><meshStandardMaterial color={active ? color : "#adc0cc"} emissive={active ? color : "#000"} emissiveIntensity={.6} /></mesh></group>;
}

function CareStation({ active, color }: { active: boolean; color: string }) {
  return <group><mesh position={[0,.1,0]}><cylinderGeometry args={[1.45,1.55,.2,32]} /><meshStandardMaterial color={active ? color : "#d4e2ea"} roughness={.8} /></mesh><mesh position={[0,.58,0]}><cylinderGeometry args={[1.08,1.25,.82,32]} /><Material active={active} color={color} light /></mesh><mesh position={[0,1.05,0]}><torusGeometry args={[.72,.13,10,32]} /><meshStandardMaterial color={active ? color : shellShade} /></mesh><mesh position={[0,1.08,0]}><cylinderGeometry args={[.38,.38,.25,24]} /><Material active={active} color={color} /></mesh>{[0,Math.PI/2,Math.PI,Math.PI*1.5].map((angle) => <mesh key={angle} position={[Math.cos(angle)*1.08,.78,Math.sin(angle)*1.08]}><sphereGeometry args={[.1,12,12]} /><meshStandardMaterial color={active ? color : "#aebfca"} emissive={active ? color : "#000"} emissiveIntensity={.45} /></mesh>)}</group>;
}

const facilities = [AIHub,WebStudio,MobileLab,SaaSTower,EducationCampus,SecurityCore,GrowthSignal,CareStation];

function MicroStructures() {
  const nodes: Array<[number,number,number,"rack"|"relay"|"terminal"]> = [[-6.8,0,-2.4,"rack"],[-4.2,0,-5.8,"terminal"],[-1.6,0,-2.4,"terminal"],[1.5,0,-2.2,"relay"],[3.3,0,-.5,"rack"],[6.8,0,-3.6,"relay"],[6.4,0,2.4,"terminal"],[2.8,0,1.7,"terminal"],[1.2,0,2.7,"relay"],[-1.5,0,2.7,"rack"],[-4.5,0,5.8,"terminal"],[-6.7,0,2.6,"relay"],[-2.8,0,.2,"relay"],[2.1,0,.1,"terminal"]];
  return <>{nodes.map(([x,,z,type],index) => <group key={`${x}-${z}`} position={[x,0,z]}>{type==="relay" ? <><mesh position={[0,.42,0]}><cylinderGeometry args={[.035,.055,.72,8]} /><meshStandardMaterial color="#9fb7c6" /></mesh><mesh position={[0,.82,0]}><sphereGeometry args={[.075,10,10]} /><meshStandardMaterial color="#7da4bd" /></mesh></> : <RoundedBox args={type==="rack" ? [.34,.7,.3] : [.52,.3,.42]} position={[0,type==="rack" ? .38 : .18,0]} radius={.045} smoothness={2}><meshStandardMaterial color={index%2 ? "#dce8f0" : "#c9d9e5"} roughness={.7} /></RoundedBox>}<mesh position={[0,.025,0]}><cylinderGeometry args={[.2,.2,.05,16]} /><meshStandardMaterial color="#bad0dd" /></mesh></group>)}</>;
}

function DistrictObjects() {
  return <>
    <group position={[-7.1,0,-5.2]}>{[-.55,0,.55].map((x) => <RoundedBox args={[.62,1.25,.72]} key={x} position={[x,.66,0]} radius={.06} smoothness={2}><meshStandardMaterial color={x ? "#d6e4ec" : "#f1f6f9"} roughness={.7} /></RoundedBox>)}</group>
    <group position={[7.2,0,-3.8]}>{[0,.52,1.04].map((y,index) => <RoundedBox args={[2.1-index*.2,.48,1.65-index*.14]} key={y} position={[0,.3+y,0]} radius={.08} smoothness={2}><meshStandardMaterial color={index%2 ? shell : shellLight} roughness={.65} /></RoundedBox>)}</group>
    <group position={[7,0,4.8]}><mesh position={[0,1.25,0]}><cylinderGeometry args={[.11,.2,2.4,10]} /><meshStandardMaterial color={shellShade} /></mesh>{[.45,.72,1].map((radius) => <mesh key={radius} position={[0,2.05,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[radius,.035,6,24,Math.PI]} /><meshStandardMaterial color="#91afc1" /></mesh>)}</group>
    <group position={[-6.8,0,4.9]}>{[[-.8,0],[.8,0],[0,-.7],[0,.7]].map(([x,z],index) => <RoundedBox args={[1.1,.55 + index*.12,.9]} key={index} position={[x,.34 + index*.06,z]} radius={.08} smoothness={2}><meshStandardMaterial color={index%2 ? "#d5e4ec" : "#edf4f8"} roughness={.7} /></RoundedBox>)}</group>
  </>;
}

export function WorldStructures({ activeIndex, progress = 0, progressRef, simplified = false }: { activeIndex: number; progress?: number; progressRef?: MutableRefObject<number>; simplified?: boolean }) {
  const world = useRef<Group>(null);
  const scaled = activeIndex + 1;
  useFrame(() => {
    if (!world.current) return;
    const master = progressRef?.current ?? progress;
    const deconstruct = Math.min(1, Math.max(0, (master - .9) / .075));
    world.current.scale.setScalar(1 - deconstruct * .98);
    world.current.rotation.y = deconstruct * .22;
    world.current.position.y = deconstruct * .8;
  });
  return <group position={[0,0,-42]} ref={world}>{worldStages.map((stage,index) => { const Facility = facilities[index]; const active = index === activeIndex && scaled - index > .82; return <group key={stage.id} position={stage.position}><Facility active={active} color={stage.color} /></group>; })}{simplified ? null : <><MicroStructures /><DistrictObjects /></>}</group>;
}
