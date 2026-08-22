"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, type Group, TubeGeometry, Vector3 } from "three";

const concrete = "#d9e1e6";
const concreteLight = "#e7edf0";
const structure = "#a8b6bf";
const glass = "#5f8297";
const glassDark = "#324d5e";

function GlassBand({ depth, width, y }: { depth: number; width: number; y: number }) {
  const columns = Math.max(4,Math.round(width/.62));
  return <group position={[0,y,depth/2+.025]}>
    <mesh receiveShadow><boxGeometry args={[width-.22,.54,.07]} /><meshPhysicalMaterial color={glassDark} metalness={.08} roughness={.22} /></mesh>
    {Array.from({length:columns+1},(_,index)=><mesh castShadow key={index} position={[-(width-.22)/2+index*((width-.22)/columns),0,.055]}><boxGeometry args={[.055,.58,.09]} /><meshStandardMaterial color={structure} /></mesh>)}
  </group>;
}

function LeftWing() {
  return <group position={[-2.75,0,.2]}>
    <RoundedBox args={[4.35,2.75,2.15]} castShadow position={[0,1.43,0]} radius={.12} receiveShadow smoothness={3}><meshStandardMaterial color={concrete} roughness={.66} /></RoundedBox>
    {[.58,1.3,2.02].map((y)=><GlassBand depth={2.15} key={y} width={4.35} y={y} />)}
    {[.88,1.6,2.32,2.78].map((y)=><mesh castShadow key={y} position={[0,y,1.13]}><boxGeometry args={[4.65,.11,.28]} /><meshStandardMaterial color={concreteLight} /></mesh>)}
    {[-2.03,2.03].map((x)=><mesh castShadow key={x} position={[x,1.42,1.17]}><boxGeometry args={[.16,2.75,.26]} /><meshStandardMaterial color="#b4c0c7" /></mesh>)}
    <mesh position={[-1.1,.42,1.19]}><boxGeometry args={[1.15,.78,.12]} /><meshPhysicalMaterial color="#526f81" roughness={.18} /></mesh>
    <RoundedBox args={[3.5,.18,1.55]} castShadow position={[0,2.9,0]} radius={.05} smoothness={2}><meshStandardMaterial color="#e8eef1" /></RoundedBox>
    <mesh castShadow position={[1.1,3.12,-.2]}><boxGeometry args={[.85,.35,.72]} /><meshStandardMaterial color="#aebcc4" /></mesh>
  </group>;
}

function RightWing() {
  const sections = [{x:0,z:0,w:2.25,h:2.9},{x:1.75,z:.28,w:1.75,h:2.58},{x:3.13,z:.72,w:1.25,h:2.18}];
  return <group position={[1.15,0,-.05]}>{sections.map(({x,z,w,h},section)=><group key={x} position={[x,0,z]}>
    <RoundedBox args={[w,h,2.05]} castShadow position={[0,h/2,0]} radius={section === 2 ? .22 : .14} receiveShadow smoothness={4}><meshStandardMaterial color={section%2 ? "#d4dfe5" : concrete} roughness={.64} /></RoundedBox>
    {[.58,1.28,1.98].filter((y)=>y<h-.2).map((y)=><GlassBand depth={2.05} key={y} width={w} y={y} />)}
    {[.9,1.6,2.3].filter((y)=>y<h).map((y)=><mesh castShadow key={y} position={[0,y,1.1]}><boxGeometry args={[w+.2,.1,.25]} /><meshStandardMaterial color={concreteLight} /></mesh>)}
    <RoundedBox args={[w*.72,.15,1.35]} castShadow position={[0,h+.08,0]} radius={.04} smoothness={2}><meshStandardMaterial color="#e7edf0" /></RoundedBox>
  </group>)}</group>;
}

function CampusCenter() {
  return <group>
    <mesh castShadow position={[.15,1.68,.62]}><boxGeometry args={[2.25,.78,.72]} /><meshPhysicalMaterial color={glass} metalness={.05} opacity={.9} roughness={.16} transparent /></mesh>
    {[-.92,-.3,.3,.92].map((x)=><mesh castShadow key={x} position={[x+.15,1.68,1]}><boxGeometry args={[.055,.84,.08]} /><meshStandardMaterial color={structure} /></mesh>)}
    <mesh castShadow position={[.15,2.12,.62]}><boxGeometry args={[2.42,.12,.88]} /><meshStandardMaterial color={concreteLight} /></mesh>
    <RoundedBox args={[1.4,.82,1.3]} castShadow position={[.15,.48,1.02]} radius={.12} receiveShadow smoothness={3}><meshStandardMaterial color="#d2dde3" /></RoundedBox>
    <mesh position={[.15,.48,1.7]}><boxGeometry args={[.72,.58,.08]} /><meshPhysicalMaterial color={glassDark} roughness={.15} /></mesh>
    {[0,1,2,3].map((step)=><mesh receiveShadow key={step} position={[.15,.05+step*.08,2.05+step*.27]}><boxGeometry args={[2.15-step*.16,.12,.42]} /><meshStandardMaterial color={step%2 ? "#cad7de" : "#e2e9ed"} /></mesh>)}
  </group>;
}

function Tree({ position, scale=1 }: { position: [number,number,number]; scale?: number }) {
  return <group position={position} scale={scale}><mesh castShadow position={[0,.42,0]}><cylinderGeometry args={[.055,.09,.84,9]} /><meshStandardMaterial color="#657a73" /></mesh>{[[0,.98,0,.36],[.25,.9,.04,.27],[-.22,.86,.08,.3],[.08,1.17,-.05,.25]].map(([x,y,z,size],index)=><mesh castShadow key={index} position={[x,y,z]}><icosahedronGeometry args={[size,2]} /><meshStandardMaterial color={index%2 ? "#78998e" : "#88a79c"} roughness={.9} /></mesh>)}</group>;
}

function MonumentSign() {
  return <group position={[-1.85,.05,4.42]} rotation={[0,.06,0]}>
    <RoundedBox args={[2.45,.72,.42]} castShadow position={[0,.36,0]} radius={.06} receiveShadow smoothness={3}><meshStandardMaterial color="#cbd6dc" roughness={.68} /></RoundedBox>
    <mesh position={[.93,.39,.225]}><boxGeometry args={[.14,.14,.035]} /><meshStandardMaterial color="#d73d46" /></mesh>
    <Html center position={[-.18,.4,.24]} transform><div className="campus-monument-text">GROWBLIC</div></Html>
  </group>;
}

function Landscaping() {
  return <group>
    {[[-4.7,1.8],[-3.9,2.45],[4.65,2.25],[5.25,1.42],[3.85,3.1]].map(([x,z],index)=><Tree key={`${x}-${z}`} position={[x,.12,z]} scale={index%2 ? .78 : .92} />)}
    {[[-4.4,3.15,2.3],[3.65,3.65,2.65]].map(([x,z,w])=><RoundedBox args={[w,.28,.72]} castShadow key={x} position={[x,.18,z]} radius={.14} receiveShadow smoothness={3}><meshStandardMaterial color="#b7c9c7" /></RoundedBox>)}
    {[-3.1,-2.1,2.45,3.35].map((x)=><group key={x} position={[x,.16,3.3]}><mesh castShadow position={[0,.26,0]}><cylinderGeometry args={[.035,.06,.5,10]} /><meshStandardMaterial color="#778993" /></mesh><mesh position={[0,.55,0]}><sphereGeometry args={[.075,10,10]} /><meshStandardMaterial color="#f1f5f6" emissive="#dfeff6" emissiveIntensity={.35} /></mesh></group>)}
  </group>;
}

function Route() {
  const geometry = useMemo(()=>new TubeGeometry(new CatmullRomCurve3([new Vector3(-1.45,.105,7),new Vector3(-1.35,.105,5.6),new Vector3(-.6,.105,4.25),new Vector3(.08,.105,3.15),new Vector3(.12,.105,2.35)]),80,.027,8,false),[]);
  return <mesh geometry={geometry}><meshStandardMaterial color="#d9474f" emissive="#d9474f" emissiveIntensity={.04} roughness={.55} /></mesh>;
}

export function HomeBuildings() {
  const campus=useRef<Group>(null);
  useFrame(({pointer})=>{if(!campus.current)return;campus.current.rotation.y+=(pointer.x*.022-campus.current.rotation.y)*.04;campus.current.rotation.x+=(-pointer.y*.01-campus.current.rotation.x)*.04;});
  return <group ref={campus} scale={[1.5,1.16,1.16]}>
    <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,-.03,1]}><planeGeometry args={[22,16]} /><shadowMaterial color="#526b79" opacity={.2} transparent /></mesh>
    {[-3,-1.5,0,1.5,3].map((x)=><mesh key={x} position={[x,.04,3.4]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.018,6.8]} /><meshBasicMaterial color="#b8cad4" opacity={.34} transparent /></mesh>)}
    <LeftWing /><RightWing /><CampusCenter /><Landscaping /><MonumentSign /><Route />
  </group>;
}
