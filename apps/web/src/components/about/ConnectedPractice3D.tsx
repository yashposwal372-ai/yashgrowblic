"use client";

import { ContactShadows, Html, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, Group, Mesh, MeshStandardMaterial, TubeGeometry, Vector3 } from "three";

const layerY = [1.8, .9, 0, -.9, -1.8] as const;
const layerNames = ["Strategy","Product","Engineering","Automation","Care"] as const;
const layerMarks = ["◎","◇","</>","ϟ","♡"] as const;
const routeNodes = [[.34,1.84,.15],[-.28,.94,.08],[.3,.04,0],[-.3,-.86,-.08],[.24,-1.76,-.15]] as const;

function LayerSymbol({ index, active }: { index: number; active: boolean }) {
  const color = active ? "#e34650" : "#7894a7";
  if (index === 0) return <group position={[0,.13,.25]} rotation={[-Math.PI/2,0,0]}><mesh><torusGeometry args={[.28,.035,8,30]} /><meshStandardMaterial color={color} /></mesh><mesh><circleGeometry args={[.055,18]} /><meshStandardMaterial color={color} /></mesh></group>;
  if (index === 1) return <mesh position={[0,.13,.25]} rotation={[.55,.7,.2]}><boxGeometry args={[.38,.38,.38]} /><meshStandardMaterial color={color} roughness={.5} wireframe /></mesh>;
  if (index === 2) return <group position={[0,.14,.25]} rotation={[-Math.PI/2,0,0]}><mesh position={[-.17,0,0]} rotation={[0,0,.55]}><boxGeometry args={[.035,.38,.035]} /><meshStandardMaterial color={color} /></mesh><mesh position={[.17,0,0]} rotation={[0,0,-.55]}><boxGeometry args={[.035,.38,.035]} /><meshStandardMaterial color={color} /></mesh></group>;
  if (index === 3) return <group position={[0,.14,.25]} rotation={[-Math.PI/2,0,0]}>{Array.from({length:8},(_,tooth)=><mesh key={tooth} position={[Math.cos(tooth*Math.PI/4)*.27,Math.sin(tooth*Math.PI/4)*.27,0]} rotation={[0,0,tooth*Math.PI/4]}><boxGeometry args={[.12,.07,.04]} /><meshStandardMaterial color={color} /></mesh>)}<mesh><torusGeometry args={[.18,.045,8,24]} /><meshStandardMaterial color={color} /></mesh></group>;
  return <group position={[0,.14,.25]} rotation={[-Math.PI/2,0,0]}><mesh position={[-.12,.02,0]} rotation={[0,0,.65]}><sphereGeometry args={[.15,14,12]} /><meshStandardMaterial color={color} /></mesh><mesh position={[.12,.02,0]} rotation={[0,0,-.65]}><sphereGeometry args={[.15,14,12]} /><meshStandardMaterial color={color} /></mesh><mesh position={[0,-.13,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.22,.22,.08]} /><meshStandardMaterial color={color} /></mesh></group>;
}

function ConnectedStack({ active, reducedMotion }: { active: number; reducedMotion: boolean }) {
  const root = useRef<Group>(null);
  const layers = useRef<Array<Group | null>>([]);
  const nodes = useRef<Array<Group | null>>([]);
  const signal = useRef<Mesh>(null);
  const routeMaterial = useRef<MeshStandardMaterial>(null);
  const curve = useMemo(() => new CatmullRomCurve3([
    ...routeNodes.map(([x,y,z])=>new Vector3(x,y,z)),
  ]), []);
  const tubeGeometry = useMemo(() => new TubeGeometry(curve,80,.025,8,false),[curve]);

  useFrame(({ clock, pointer }) => {
    const time = clock.elapsedTime;
    if (root.current) {
      const targetX = .05 + (reducedMotion ? 0 : -pointer.y * .012);
      const targetY = -.3 + (reducedMotion ? 0 : pointer.x * .022);
      root.current.rotation.x += (targetX - root.current.rotation.x) * .045;
      root.current.rotation.y += (targetY - root.current.rotation.y) * .045;
      root.current.position.x += ((reducedMotion ? 0 : pointer.x * .03) - root.current.position.x) * .04;
      root.current.position.y = reducedMotion ? 0 : Math.sin(time*.42)*.012;
    }
    layers.current.forEach((layer,index) => {
      if (!layer) return;
      const selected = active === index;
      const float = reducedMotion ? 0 : Math.sin(time * .72 + index * 1.1) * .02;
      const targetY = layerY[index] + float + (selected ? .14 : 0);
      layer.position.y += (targetY - layer.position.y) * .08;
      const targetX = selected ? .16 : 0;
      layer.position.x += (targetX - layer.position.x) * .08;
      const scale = selected ? 1.025 : 1;
      layer.scale.lerp(new Vector3(scale,scale,scale),.08);
    });
    nodes.current.forEach((node,index) => {
      if (!node) return;
      const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 1.25 + index * .72) * (active === index ? .09 : .045);
      const intro = reducedMotion ? 1 : Math.min(1,Math.max(0,(time-.35-index*.06)*2.6));
      const target = pulse * (active === index ? 1.08 : 1) * intro;
      node.scale.setScalar(target);
    });
    if (routeMaterial.current) routeMaterial.current.opacity = reducedMotion ? 1 : Math.min(1,Math.max(0,(time-.22)*1.75));
    if (signal.current) {
      signal.current.visible = reducedMotion || time > .8;
      signal.current.position.copy(curve.getPointAt(reducedMotion ? (active + .5) / 5 : ((Math.max(0,time-.8)) / 6) % 1));
    }
  });

  return <group ref={root} rotation={[.05,-.3,0]}>
    <RoundedBox args={[5.55,.16,3.65]} castShadow position={[0,-2.18,0]} radius={.2} receiveShadow smoothness={6}><meshStandardMaterial color="#e7f0f5" metalness={.05} roughness={.28} /></RoundedBox>
    {layerY.map((y,index)=><group key={y} position={[0,y,0]} ref={(node)=>{layers.current[index]=node}}>
      <RoundedBox args={[5.2,.12,3.35]} castShadow radius={.2} receiveShadow smoothness={7}><meshPhysicalMaterial clearcoat={.32} color={active===index?"#f7fbff":"#f4f8fb"} metalness={.045} opacity={active===index?.94:.91} roughness={.24} transparent /></RoundedBox>
      <mesh position={[0,.065,1.655]}><boxGeometry args={[active===index?1.35:.68,.018,.028]} /><meshStandardMaterial color={active===index?"#e54852":"#d9e6ee"} emissive={active===index?"#e54852":"#000000"} emissiveIntensity={.07} /></mesh>
      <LayerSymbol active={active===index} index={index} />
      <Html center className={`practice-3d-label${active===index?" is-active":""}`} position={[1.45,.1,1.56]} transform><span>{layerMarks[index]}</span>{layerNames[index]}</Html>
    </group>)}
    <mesh castShadow geometry={tubeGeometry}><meshStandardMaterial color="#f04e58" emissive="#f04e58" emissiveIntensity={.2} opacity={0} ref={routeMaterial} transparent /></mesh>
    {routeNodes.map(([x,y,z],index)=><group key={y} position={[x,y,z]} ref={(node)=>{nodes.current[index]=node}}><mesh><sphereGeometry args={[active===index?.085:.065,16,16]} /><meshStandardMaterial color="#f04e58" emissive="#f04e58" emissiveIntensity={active===index?.38:.18} /></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[active===index?.145:.115,.012,8,32]} /><meshBasicMaterial color="#f39ba2" opacity={active===index?.72:.44} transparent /></mesh><mesh rotation={[Math.PI/2,0,0]}><ringGeometry args={[.18,.188,36]} /><meshBasicMaterial color="#f8c4c8" opacity={active===index?.34:.2} side={2} transparent /></mesh><mesh><sphereGeometry args={[.2,16,16]} /><meshBasicMaterial color="#f04e58" opacity={.025} transparent depthWrite={false} /></mesh></group>)}
    {[routeNodes[0],routeNodes[4]].map(([x,y,z],terminal)=><group key={terminal} position={[x,y,z]}>{[.2,.3,.42].map((radius,index)=><mesh key={radius} rotation={[Math.PI/2,0,0]}><torusGeometry args={[radius,.009,8,40]} /><meshBasicMaterial color="#f39ba2" opacity={.42-index*.1} transparent /></mesh>)}</group>)}
    <pointLight color="#e54852" distance={1.5} intensity={.42} position={routeNodes[active]} />
    <group><mesh ref={signal}><sphereGeometry args={[.075,16,16]} /><meshStandardMaterial color="#e34650" emissive="#e34650" emissiveIntensity={.25} /></mesh></group>
    <mesh position={[0,0,-1.15]}><planeGeometry args={[4.4,5.5]} /><meshBasicMaterial color="#f3a7ac" opacity={.018} transparent /></mesh>
    <ContactShadows blur={3} far={8} opacity={.21} position={[0,-2.42,0]} scale={9} />
  </group>;
}

export function ConnectedPractice3D({ active, reducedMotion }: { active: number; reducedMotion: boolean }) {
  return <Canvas camera={{ fov: 33, position: [6.3,5.3,7.8] }} dpr={[1,1.5]} frameloop={reducedMotion ? "demand" : "always"} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} shadows>
    <ambientLight intensity={1.35} />
    <directionalLight castShadow intensity={2.1} position={[-5,8,5]} shadow-mapSize={[1024,1024]} />
    <directionalLight color="#c8e2f1" intensity={1.1} position={[5,3,4]} />
    <directionalLight color="#ffffff" intensity={.7} position={[0,1,-5]} />
    <ConnectedStack active={active} reducedMotion={reducedMotion} />
  </Canvas>;
}
