"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useRef } from "react";
import type { Group } from "three";

import { cinematicChapters } from "@/data/cinematicWorld";

function Platform({ color = "#c9dbe6", size = 3 }: { color?: string; size?: number }) {
  return <><mesh position={[0,.02,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[size*.72,28]} /><meshBasicMaterial color="#69899e" opacity={.1} transparent /></mesh><RoundedBox args={[size,.18,size*.78]} position={[0,.1,0]} radius={.13} smoothness={2}><meshStandardMaterial color={color} roughness={.78} /></RoundedBox></>;
}

function ProductLabs() {
  return <group><Platform size={4.6} />{[-2,-1,0,1,2].map((slot) => <group key={slot} position={[slot*.82,0,0]}><RoundedBox args={[.62,.8 + (slot%2)*.12,.72]} position={[0,.5,0]} radius={.08} smoothness={2}><meshStandardMaterial color="#eef5f9" roughness={.62} /></RoundedBox><mesh position={[0,.92 + (slot%2)*.12,.38]}><boxGeometry args={[.38,.18,.025]} /><meshStandardMaterial color="#ff8b8f" /></mesh></group>)}</group>;
}

function IndustriesCity() {
  return <group><Platform size={5.2} />{Array.from({length:6},(_,index) => { const angle=index/6*Math.PI*2; return <group key={index} position={[Math.cos(angle)*1.55,0,Math.sin(angle)*1.15]}><RoundedBox args={[.85,.7+(index%3)*.35,.85]} position={[0,.45+(index%3)*.17,0]} radius={.08} smoothness={2}><meshStandardMaterial color={index%2 ? "#e2edf3" : "#f4f8fb"} /></RoundedBox><mesh position={[0,.9+(index%3)*.35,0]}><boxGeometry args={[.5,.06,.5]} /><meshStandardMaterial color="#6950e8" /></mesh></group>})}</group>;
}

function BuildWorks() {
  return <group><Platform size={5} />{Array.from({length:5},(_,index) => <group key={index} position={[-1.75+index*.88,0,0]}><mesh position={[0,.42,0]}><cylinderGeometry args={[.32,.42,.72,12]} /><meshStandardMaterial color="#edf4f8" /></mesh><mesh position={[0,.82,0]}><cylinderGeometry args={[.2,.2,.07,12]} /><meshStandardMaterial color="#23cbe5" /></mesh></group>)}</group>;
}

function Campus() {
  return <group><Platform size={4.8} /><RoundedBox args={[1.3,2.5,1.2]} position={[0,1.35,0]} radius={.12} smoothness={3}><meshStandardMaterial color="#f5f9fc" /></RoundedBox>{[[-1.35,0],[1.35,0],[0,-1.1],[0,1.1]].map(([x,z],index) => <RoundedBox args={[.85,.65,.75]} key={index} position={[x,.42,z]} radius={.08} smoothness={2}><meshStandardMaterial color="#dce9f1" /></RoundedBox>)}<mesh position={[0,2.65,0]}><boxGeometry args={[.72,.08,.72]} /><meshStandardMaterial color="#24c8b1" /></mesh></group>;
}

function ContactHub() {
  return <group><Platform size={4.2} /><mesh position={[0,1.2,0]}><cylinderGeometry args={[.65,.9,2.2,16]} /><meshStandardMaterial color="#f4f8fb" /></mesh><mesh position={[0,2.75,0]}><cylinderGeometry args={[.07,.13,1.2,10]} /><meshStandardMaterial color="#adc3d0" /></mesh>{[.52,.82,1.12].map((radius) => <mesh key={radius} position={[0,3.15,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[radius,.035,6,28,Math.PI]} /><meshStandardMaterial color="#ff9d42" /></mesh>)}</group>;
}

const districtComponents = [null,null,ProductLabs,IndustriesCity,BuildWorks,Campus,ContactHub];

export function MajorDistricts({ progressRef, simplified }: { progressRef?: MutableRefObject<number>; simplified: boolean }) {
  const refs = useRef<Array<Group | null>>([]);
  useFrame(() => {
    const progress = progressRef?.current ?? 0;
    cinematicChapters.forEach((chapter,index) => {
      const group = refs.current[index]; if (!group) return;
      const center = (chapter.range[0]+chapter.range[1])/2;
      const proximity = Math.max(0,1-Math.abs(progress-center)*5);
      group.position.y = Math.sin(proximity*Math.PI)*.22;
      group.rotation.y = 0;
      const final = Math.min(1,Math.max(0,(progress-.93)/.055));
      group.scale.setScalar(1-final*.96);
    });
  });
  return <>{cinematicChapters.map((chapter,index) => { const District = districtComponents[index]; if (!District || (simplified && index === 3)) return null; return <group key={chapter.id} position={chapter.position} ref={(node) => { refs.current[index]=node; }}><District /></group>; })}{simplified ? null : <CorridorInfrastructure />}</>;
}

function CorridorInfrastructure() {
  return <>{cinematicChapters.slice(1).flatMap((chapter,chapterIndex)=>chapter.route!.slice(1,-1).map(([x,,z],index)=><group key={`${chapter.id}-${index}`} position={[x,0,z]}><mesh position={[0,.42,0]}><cylinderGeometry args={[.055,.09,.75,9]} /><meshStandardMaterial color="#9db8c8" /></mesh><mesh position={[0,.85,0]}><sphereGeometry args={[.09,10,10]} /><meshStandardMaterial color={chapter.routeColor} emissive={chapter.routeColor} emissiveIntensity={.18} /></mesh><RoundedBox args={[.62,.22,.5]} position={[(index%2?-.45:.45),.14,.35]} radius={.05} smoothness={2}><meshStandardMaterial color={chapterIndex%2?"#dbe8f0":"#edf4f8"} /></RoundedBox></group>))}</>;
}
