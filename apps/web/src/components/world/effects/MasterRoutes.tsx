"use client";

import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useEffect, useMemo, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3, Color, Line, LineBasicMaterial, Vector3 } from "three";

import { cinematicChapters, cinematicFinal } from "@/data/cinematicWorld";

const majorRoutes = [...cinematicChapters.slice(1), { id: "final", range: [.93,1] as [number,number], route: cinematicFinal.route, routeColor: cinematicFinal.routeColor }];

function MasterTrack({ chapter, offset, progressRef }: { chapter: (typeof majorRoutes)[number]; offset: number; progressRef?: MutableRefObject<number> }) {
  const line = useMemo(() => { const curve=new CatmullRomCurve3(chapter.route!.map(([x,y,z])=>new Vector3(x+offset,y,z+offset*.3)),false,"catmullrom",.08); const geometry=new BufferGeometry().setFromPoints(curve.getPoints(100)); return new Line(geometry,new LineBasicMaterial({color:new Color(chapter.routeColor),transparent:true,opacity:0})); },[chapter,offset]);
  const brandColor=useMemo(()=>new Color("#356dff"),[]);
  const lineRef=useRef(line);
  useFrame(({pointer}) => { const progress=progressRef?.current??0; const raw=Math.min(1,Math.max(0,(progress-chapter.range[0])/(chapter.range[1]-chapter.range[0]))); const local=Math.min(1,Math.max(0,(raw-.15)/.85)); const current=lineRef.current; current.geometry.setDrawRange(0,Math.ceil(current.geometry.getAttribute("position").count*local)); const material=current.material as LineBasicMaterial; material.color.set(chapter.routeColor!); material.opacity=local>0&&local<1?.95:local>=1?.24:0; if(chapter.id==="services"&&local>0) material.opacity=Math.min(1,material.opacity+(Math.abs(pointer.x)+Math.abs(pointer.y))*.025); if(progress>.93) material.color.lerp(brandColor,Math.min(1,(progress-.93)/.05)); if(progress>.985) material.opacity*=Math.max(0,(1-progress)/.015); });
  useEffect(()=>()=>{line.geometry.dispose();(line.material as LineBasicMaterial).dispose();},[line]);
  return <primitive object={line} />;
}

export function MasterRoutes({ progressRef, simplified }: { progressRef?: MutableRefObject<number>; simplified: boolean }) {
  const offsets=simplified?[0]:[-.12,0,.12];
  return <>{majorRoutes.map((chapter)=>offsets.map((offset)=><MasterTrack chapter={chapter} key={`${chapter.id}-${offset}`} offset={offset} progressRef={progressRef} />))}</>;
}
