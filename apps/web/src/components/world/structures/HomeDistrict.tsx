"use client";

import { RoundedBox } from "@react-three/drei";

const light = "#f6fafc";
const mid = "#edf4f8";
const shade = "#dce8f0";
const edge = "#cadae5";
const routeRed = "#e94f57";

function Plaza({ width, depth }: { width: number; depth: number }) {
  return <><RoundedBox args={[width,.12,depth]} position={[0,.06,0]} radius={.12} smoothness={2}><meshStandardMaterial color={shade} roughness={.9} /></RoundedBox><mesh position={[0,.012,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[width*1.45,depth*1.45]} /><meshBasicMaterial color="#86a7bb" opacity={.07} transparent depthWrite={false} /></mesh></>;
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

function RouteChannels() {
  const segments: Array<[number,number,number,number]> = [[-.7,.2,2.4,.11],[.5,-1,2.4,.11],[1.7,-2.15,.11,2.4],[2.9,-3.3,2.5,.11],[4.1,-5.1,.11,3.7]];
  return <>{segments.map(([x,z,w,d],index)=><mesh key={index} position={[x,.145,z]}><boxGeometry args={[w,.025,d]} /><meshStandardMaterial color={routeRed} emissive={routeRed} emissiveIntensity={.08} transparent opacity={.3} /></mesh>)}</>;
}

function MicroStructures() {
  const nodes: Array<[number,number,"rack"|"relay"|"terminal"]> = [[-5.7,1.8,"rack"],[-5.2,-.8,"relay"],[-1.8,3.6,"terminal"],[2.1,4.6,"relay"],[6.6,1,"rack"],[7,-3.8,"relay"],[-.2,-6,"rack"],[5.8,-6.2,"terminal"]];
  return <>{nodes.map(([x,z,type],index)=><group key={`${x}-${z}`} position={[x,0,z]}><mesh position={[0,.035,0]}><cylinderGeometry args={[.28,.28,.07,18]} /><meshStandardMaterial color="#bed1dc" /></mesh>{type==="relay"?<><mesh position={[0,.55,0]}><cylinderGeometry args={[.045,.075,1,9]} /><meshStandardMaterial color="#93acbd" /></mesh><mesh position={[0,1.1,0]}><sphereGeometry args={[.085,10,10]} /><meshStandardMaterial color={index%2?routeRed:"#356dff"} emissive={index%2?routeRed:"#356dff"} emissiveIntensity={.35} /></mesh></>:<RoundedBox args={type==="rack"?[.48,.88,.42]:[.72,.34,.58]} position={[0,type==="rack"?.49:.22,0]} radius={.055} smoothness={2}><meshStandardMaterial color={index%2?shade:mid} roughness={.68} /></RoundedBox>}</group>)}</>;
}

export function HomeDistrict({ simplified }: { simplified: boolean }) {
  return <group><GrowblicHQ /><SoftwareTower /><ProductLab /><DataCenter /><RouteChannels />{simplified?null:<MicroStructures />}</group>;
}
