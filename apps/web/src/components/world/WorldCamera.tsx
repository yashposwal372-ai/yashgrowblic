"use client";

import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useMemo, useRef } from "react";
import { CatmullRomCurve3, OrthographicCamera, Vector3 } from "three";

import { cinematicChapters, cinematicFinal } from "@/data/cinematicWorld";

const overviewPosition = new Vector3(11, 12, 17);
const coreTarget = new Vector3(0, 0, 0);

export function WorldCamera({ overview = false, progress = 0, progressRef, reducedMotion = false }: { overview?: boolean; progress?: number; progressRef?: MutableRefObject<number>; reducedMotion?: boolean }) {
  const target = useRef(new Vector3(0, 0, 0));
  const destination = useRef(new Vector3(8, 10, 12));
  const routeCurves = useMemo(() => cinematicChapters.map((chapter,index) => index === 0 || !chapter.route ? null : {
    camera: new CatmullRomCurve3(chapter.route.map(([x,,z])=>new Vector3(x+10,11,z+16)),false,"catmullrom",.08),
    target: new CatmullRomCurve3(chapter.route.map(([x,,z])=>new Vector3(x,0,z)),false,"catmullrom",.08),
  }),[]);
  const finalCameraCurve = useMemo(()=>new CatmullRomCurve3(cinematicFinal.route.map(([x,,z],index)=>index===cinematicFinal.route.length-1?new Vector3(...cinematicFinal.camera):new Vector3(x+10,11,z+16)),false,"catmullrom",.08),[]);
  const finalTargetCurve = useMemo(()=>new CatmullRomCurve3(cinematicFinal.route.map(([x,,z])=>new Vector3(x,0,z)),false,"catmullrom",.08),[]);

  useFrame(({ camera }) => {
    if (overview) {
      destination.current.copy(overviewPosition); target.current.copy(coreTarget);
    } else {
      const master = progressRef?.current ?? progress;
      const index = Math.max(0,cinematicChapters.findIndex((chapter)=>master>=chapter.range[0]&&master<chapter.range[1]));
      const current = cinematicChapters[Math.min(index,cinematicChapters.length-1)];
      const local = Math.min(1,Math.max(0,(master-current.range[0])/(current.range[1]-current.range[0])));
      const routeCurve=routeCurves[index];
      if(routeCurve){destination.current.copy(routeCurve.camera.getPoint(local));target.current.copy(routeCurve.target.getPoint(Math.min(1,local+.075)));}else{destination.current.fromArray(current.camera);target.current.fromArray(current.position);}
      if (master >= .93) {
        const converge = Math.min(1,(master - .93) / .07);
        destination.current.copy(finalCameraCurve.getPoint(converge));
        target.current.copy(finalTargetCurve.getPoint(Math.min(1,converge+.06)));
      }
      const ortho=camera as OrthographicCamera;
      if(typeof ortho.zoom==="number") ortho.zoom=46+Math.sin(local*Math.PI)*-4+(master>.93?(master-.93)/.07*5:0);
    }
    if (reducedMotion) camera.position.copy(destination.current); else camera.position.lerp(destination.current, 0.09);
    camera.lookAt(target.current);
    camera.updateProjectionMatrix();
  });

  return null;
}
