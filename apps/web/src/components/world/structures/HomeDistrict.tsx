"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { CatmullRomCurve3, Vector3, type Group, type Mesh } from "three";

const light = "#f6fafc";
const mid = "#edf4f8";
const shade = "#dce8f0";
const edge = "#cadae5";
const routeRed = "#d84b52";

function InteractiveFacility({ children, label, labelPosition, reducedMotion }: { children: ReactNode; label: string; labelPosition: [number,number,number]; reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const [hovered,setHovered] = useState(false);
  useFrame(() => {
    if (!group.current) return;
    const lift = !reducedMotion && hovered ? .08 : 0;
    const scale = !reducedMotion && hovered ? 1.018 : 1;
    group.current.position.y += (lift-group.current.position.y)*.075;
    const nextScale = group.current.scale.x+(scale-group.current.scale.x)*.075;
    group.current.scale.setScalar(nextScale);
  });
  return <group ref={group} onPointerOver={(event)=>{event.stopPropagation();setHovered(true);document.body.style.cursor="pointer";}} onPointerOut={()=>{setHovered(false);document.body.style.cursor="";}}>{children}{hovered&&<><pointLight color="#8eb8ff" distance={5} intensity={1.15} position={[labelPosition[0],Math.max(1,labelPosition[1]-2.2),labelPosition[2]]} /><Html center position={labelPosition}><span className="facility-label">{label}</span></Html></>}</group>;
}

function AmbientPulse({ reducedMotion }: { reducedMotion: boolean }) {
  const group=useRef<Group>(null);
  useFrame(({clock})=>{if(group.current&&!reducedMotion)group.current.position.y=.04+Math.sin(clock.elapsedTime*.72)*.035;});
  return <group ref={group}>{[[-4.6,1.25],[2.2,-4.6],[6.2,.2]].map(([x,z],index)=><group key={index} position={[x,.04,z]}><mesh rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.14,.18,18]} /><meshBasicMaterial color={index===1?routeRed:"#6e9dff"} transparent opacity={.32} /></mesh><mesh position={[0,.13,0]}><sphereGeometry args={[.045,10,10]} /><meshStandardMaterial color={index===1?routeRed:"#356dff"} emissive={index===1?routeRed:"#356dff"} emissiveIntensity={.55} /></mesh></group>)}</group>;
}

function Plaza({ width, depth }: { width: number; depth: number }) {
  return <><RoundedBox args={[width,.12,depth]} position={[0,.06,0]} radius={.12} smoothness={2}><meshStandardMaterial color={shade} roughness={.9} /></RoundedBox><mesh position={[0,.012,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[width*1.38,depth*1.38]} /><meshBasicMaterial color="#7799ae" opacity={.12} transparent depthWrite={false} /></mesh></>;
}

function GrowblicHQ() {
  return <group position={[.5,0,1]}><Plaza width={4.8} depth={4.1} /><RoundedBox args={[3.5,.65,2.9]} position={[0,.48,0]} radius={.16} smoothness={3}><meshStandardMaterial color={mid} roughness={.62} /></RoundedBox><RoundedBox args={[2.75,1.1,2.25]} position={[0,1.25,0]} radius={.14} smoothness={3}><meshStandardMaterial color={light} roughness={.58} /></RoundedBox><RoundedBox args={[1.55,1.05,1.35]} position={[0,2.3,0]} radius={.12} smoothness={3}><meshStandardMaterial color={mid} roughness={.56} /></RoundedBox>{[-1.15,-.38,.38,1.15].map((x)=><mesh key={x} position={[x,1.25,1.145]}><boxGeometry args={[.42,.52,.035]} /><meshStandardMaterial color="#9fb8c8" roughness={.5} /></mesh>)}<mesh position={[0,2.87,0]}><boxGeometry args={[.82,.1,.82]} /><meshStandardMaterial color="#356dff" emissive="#356dff" emissiveIntensity={.25} /></mesh>{[[-1.6,-1.25],[1.6,-1.25],[-1.6,1.25],[1.6,1.25]].map(([x,z])=><mesh key={`${x}-${z}`} position={[x,.86,z]}><cylinderGeometry args={[.055,.08,.56,10]} /><meshStandardMaterial color={edge} /></mesh>)}</group>;
}

function SoftwareTower() {
  return <group position={[4.4,0,-2.35]}><Plaza width={3.1} depth={3.1} /><RoundedBox args={[1.8,3.65,1.65]} position={[0,1.9,0]} radius={.13} smoothness={3}><meshStandardMaterial color={light} roughness={.58} /></RoundedBox>{[-.68,-.34,0,.34,.68].map((x)=><mesh key={x} position={[x,1.95,.84]}><boxGeometry args={[.08,2.75,.035]} /><meshStandardMaterial color={x===0?"#9eb8c8":edge} /></mesh>)}{[.75,1.4,2.05,2.7,3.35].map((y)=><mesh key={y} position={[0,y,.86]}><boxGeometry args={[1.42,.055,.025]} /><meshStandardMaterial color="#a8c0cf" /></mesh>)}<RoundedBox args={[1.35,.28,1.2]} position={[0,3.86,0]} radius={.06} smoothness={2}><meshStandardMaterial color={shade} /></RoundedBox><mesh position={[0,4.48,0]}><cylinderGeometry args={[.045,.08,1,10]} /><meshStandardMaterial color="#91aabd" /></mesh><mesh position={[0,5.02,0]}><sphereGeometry args={[.1,12,12]} /><meshStandardMaterial color="#356dff" emissive="#356dff" emissiveIntensity={.7} /></mesh></group>;
}

function ProductLab() {
  return <group position={[4.1,0,2.65]}><Plaza width={4.5} depth={3.1} /><RoundedBox args={[3.85,1.45,2.25]} position={[0,.82,0]} radius={.15} smoothness={3}><meshStandardMaterial color={light} roughness={.6} /></RoundedBox><mesh position={[0,.84,1.14]}><boxGeometry args={[2.95,.6,.035]} /><meshStandardMaterial color="#b5cad7" /></mesh>{[-1.15,-.58,0,.58,1.15].map((x)=><mesh key={x} position={[x,.84,1.17]}><boxGeometry args={[.34,.38,.025]} /><meshStandardMaterial color={x===0?"#356dff":"#d6e5ed"} /></mesh>)}{[-1.15,0,1.15].map((x)=><RoundedBox args={[.78,.34,.72]} key={x} position={[x,1.72,-.1]} radius={.06} smoothness={2}><meshStandardMaterial color={x===0?edge:shade} /></RoundedBox>)}</group>;
}

function DataCenter() {
  return <group position={[-2.65,0,-3.15]}><Plaza width={5.2} depth={3.25} /><RoundedBox args={[4.45,1.2,2.45]} position={[0,.7,0]} radius={.12} smoothness={3}><meshStandardMaterial color={mid} roughness={.66} /></RoundedBox>{[-1.55,-.93,-.31,.31,.93,1.55].map((x)=><group key={x} position={[x,.7,1.24]}><mesh><boxGeometry args={[.38,.72,.035]} /><meshStandardMaterial color="#b5cad7" /></mesh>{[-.12,0,.12].map((y)=><mesh key={y} position={[0,y,.025]}><boxGeometry args={[.25,.035,.015]} /><meshStandardMaterial color="#7899ae" /></mesh>)}</group>)}{[-1.35,0,1.35].map((x)=><RoundedBox args={[.72,.42,.78]} key={x} position={[x,1.5,-.25]} radius={.06} smoothness={2}><meshStandardMaterial color={shade} /></RoundedBox>)}</group>;
}

function CampusArchitecturalDetails() {
  return <group>
    <group position={[.5,0,1]}>
      <RoundedBox args={[1.15,.92,.34]} position={[0,.62,1.55]} radius={.06} smoothness={2}><meshStandardMaterial color="#c3d5e0" roughness={.52} /></RoundedBox>
      <mesh position={[0,.62,1.73]}><boxGeometry args={[.62,.58,.035]} /><meshStandardMaterial color="#7896aa" roughness={.42} /></mesh>
      <mesh position={[0,1.16,1.72]}><boxGeometry args={[1.42,.1,.72]} /><meshStandardMaterial color={edge} roughness={.6} /></mesh>
      {[-1.18,1.18].map((x)=><group key={x} position={[x,2.94,-.12]}><mesh><boxGeometry args={[.34,.22,.64]} /><meshStandardMaterial color="#c7d9e4" /></mesh><mesh position={[0,.02,.33]}><boxGeometry args={[.2,.08,.025]} /><meshStandardMaterial color="#7897aa" /></mesh></group>)}
      <mesh position={[-1.78,.7,0]}><boxGeometry args={[.035,.72,1.7]} /><meshStandardMaterial color="#b1c6d3" /></mesh>
    </group>
    <group position={[4.4,0,-2.35]}>
      <RoundedBox args={[1.35,2.05,1.5]} position={[-.62,1.1,-.62]} radius={.09} smoothness={2}><meshStandardMaterial color="#d8e6ee" roughness={.62} /></RoundedBox>
      {[-.54,-.18,.18,.54].map((x)=><mesh key={x} position={[x,1.9,-.84]}><boxGeometry args={[.055,2.7,.04]} /><meshStandardMaterial color="#9db6c6" /></mesh>)}
      <mesh position={[0,4.08,0]}><boxGeometry args={[1.56,.08,1.42]} /><meshStandardMaterial color="#bcd0dc" /></mesh>
    </group>
    <group position={[4.1,0,2.65]}>
      <RoundedBox args={[1.05,.82,.34]} position={[0,.48,1.3]} radius={.055} smoothness={2}><meshStandardMaterial color="#c5d7e2" /></RoundedBox>
      <mesh position={[0,.48,1.49]}><boxGeometry args={[.58,.5,.035]} /><meshStandardMaterial color="#7898ac" /></mesh>
      <mesh position={[0,.98,1.42]}><boxGeometry args={[1.45,.09,.78]} /><meshStandardMaterial color={edge} /></mesh>
      {[-1.62,1.62].map((x)=><mesh key={x} position={[x,.82,-1.15]}><boxGeometry args={[.12,.82,.12]} /><meshStandardMaterial color="#aec4d1" /></mesh>)}
    </group>
    <group position={[-2.65,0,-3.15]}>
      <mesh position={[0,.2,1.29]}><boxGeometry args={[4.15,.22,.08]} /><meshStandardMaterial color="#9eb7c7" roughness={.7} /></mesh>
      {[-1.65,-.55,.55,1.65].map((x)=><group key={x} position={[x,1.48,-.42]}><mesh><cylinderGeometry args={[.1,.1,.72,12]} /><meshStandardMaterial color="#a8bfcd" /></mesh><mesh position={[0,.38,0]}><torusGeometry args={[.18,.035,8,18]} /><meshStandardMaterial color="#7d9caf" /></mesh></group>)}
      <RoundedBox args={[1.15,.65,1.65]} position={[-2.25,.42,-.35]} radius={.07} smoothness={2}><meshStandardMaterial color="#d4e3eb" roughness={.65} /></RoundedBox>
    </group>
  </group>;
}

function RouteChannels() {
  const packet=useRef<Mesh>(null);
  const curve=useMemo(()=>new CatmullRomCurve3([[-.7,1],[-.7,-1],[1.7,-1],[1.7,-3.3],[4.1,-3.3],[4.1,-7]].map(([x,z])=>new Vector3(x,.19,z)),false,"catmullrom",.04),[]);
  useFrame(({clock})=>{if(packet.current)packet.current.position.copy(curve.getPoint((clock.elapsedTime*.055)%1));});
  const segments: Array<[number,number,number,number]> = [[-.7,.2,2.4,.11],[.5,-1,2.4,.11],[1.7,-2.15,.11,2.4],[2.9,-3.3,2.5,.11],[4.1,-5.1,.11,3.7]];
  return <>{segments.flatMap(([x,z,w,d],index)=>[-.12,0,.12].map((offset)=><mesh key={`${index}-${offset}`} position={[x+(d>w?offset:0),.145,z+(w>d?offset:0)]}><boxGeometry args={[w,.025,d]} /><meshStandardMaterial color={routeRed} emissive={routeRed} emissiveIntensity={offset===0?.14:.08} transparent opacity={offset===0?.62:.48} /></mesh>))}<mesh ref={packet}><sphereGeometry args={[.07,12,12]} /><meshStandardMaterial color="#f18a8f" emissive="#d84b52" emissiveIntensity={1.1} /></mesh></>;
}

function MicroStructures() {
  const nodes: Array<[number,number,"rack"|"relay"|"terminal"]> = [[-5.7,1.8,"rack"],[-5.2,-.8,"relay"],[-1.8,3.6,"terminal"],[2.1,4.6,"relay"],[6.6,1,"rack"],[7,-3.8,"relay"],[-.2,-6,"rack"],[5.8,-6.2,"terminal"]];
  return <>{nodes.map(([x,z,type],index)=><group key={`${x}-${z}`} position={[x,0,z]}><mesh position={[0,.035,0]}><cylinderGeometry args={[.28,.28,.07,18]} /><meshStandardMaterial color="#bed1dc" /></mesh>{type==="relay"?<><mesh position={[0,.55,0]}><cylinderGeometry args={[.045,.075,1,9]} /><meshStandardMaterial color="#93acbd" /></mesh><mesh position={[0,1.1,0]}><sphereGeometry args={[.085,10,10]} /><meshStandardMaterial color={index%2?routeRed:"#356dff"} emissive={index%2?routeRed:"#356dff"} emissiveIntensity={.35} /></mesh></>:<RoundedBox args={type==="rack"?[.48,.88,.42]:[.72,.34,.58]} position={[0,type==="rack"?.49:.22,0]} radius={.055} smoothness={2}><meshStandardMaterial color={index%2?shade:mid} roughness={.68} /></RoundedBox>}</group>)}</>;
}

export function HomeDistrict({ reducedMotion, simplified }: { reducedMotion: boolean; simplified: boolean }) {
  const root=useRef<Group>(null);
  useEffect(()=>{root.current?.traverse((object)=>{const mesh=object as Mesh;if(mesh.isMesh){mesh.castShadow=true;mesh.receiveShadow=true;}});},[]);
  return <group ref={root}><InteractiveFacility label="GROWBLIC HQ" labelPosition={[.5,4.3,1]} reducedMotion={reducedMotion}><GrowblicHQ /></InteractiveFacility><InteractiveFacility label="AI / SOFTWARE" labelPosition={[4.4,5.7,-2.35]} reducedMotion={reducedMotion}><SoftwareTower /></InteractiveFacility><InteractiveFacility label="PRODUCT LAB" labelPosition={[4.1,3.3,2.65]} reducedMotion={reducedMotion}><ProductLab /></InteractiveFacility><InteractiveFacility label="AUTOMATION CORE" labelPosition={[-2.65,3,-3.15]} reducedMotion={reducedMotion}><DataCenter /></InteractiveFacility><CampusArchitecturalDetails /><RouteChannels />{simplified?null:<><MicroStructures /><AmbientPulse reducedMotion={reducedMotion} /></>}</group>;
}
