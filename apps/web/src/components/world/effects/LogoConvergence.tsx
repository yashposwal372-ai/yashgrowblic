"use client";

import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useEffect, useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, Color, LineBasicMaterial, LineSegments } from "three";

const DESKTOP_VERTICES = 360;
const MOBILE_VERTICES = 180;

export function LogoConvergence({ progressRef, simplified }: { progressRef?: MutableRefObject<number>; simplified: boolean }) {
  const targets = useRef<Float32Array | null>(null);
  const vertexCount = simplified ? MOBILE_VERTICES : DESKTOP_VERTICES;
  const starts = useMemo(() => {
    const values = new Float32Array(vertexCount * 3);
    for (let index = 0; index < vertexCount; index += 2) {
      const segment = index / 2;
      const x = (segment % 18 - 8.5) * .68;
      const y = .2 + (Math.floor(segment / 18) % 10) * .42;
      const z = ((segment * 7) % 9 - 4) * .35;
      const orientation = segment % 3;
      const dx = orientation === 0 ? .48 : orientation === 2 ? .32 : 0;
      const dy = orientation === 1 ? .48 : orientation === 2 ? .32 : 0;
      values[index * 3] = x; values[index * 3 + 1] = y; values[index * 3 + 2] = z;
      values[(index + 1) * 3] = x + dx; values[(index + 1) * 3 + 1] = y + dy; values[(index + 1) * 3 + 2] = z;
    }
    return values;
  }, [vertexCount]);
  const line = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(starts.slice(), 3));
    const material = new LineBasicMaterial({ color: new Color("#356dff"), opacity: 0, transparent: true });
    return new LineSegments(geometry, material);
  }, [starts]);
  const lineRef = useRef(line);

  useEffect(() => {
    let cancelled = false;
    fetch("/images/growblic-logo.svg").then((response) => response.text()).then((source) => {
      if (cancelled) return;
      const documentNode = new DOMParser().parseFromString(source, "image/svg+xml");
      const host = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      host.setAttribute("viewBox", "0 0 480 480");
      host.style.cssText = "position:fixed;left:-9999px;width:480px;height:480px";
      const paths = Array.from(documentNode.querySelectorAll("path")).map((path) => path.cloneNode(true) as SVGPathElement);
      paths.forEach((path) => host.appendChild(path));
      document.body.appendChild(host);
      const lengths = paths.map((path) => path.getTotalLength());
      const total = lengths.reduce((sum, length) => sum + length, 0);
      const sampled = new Float32Array(vertexCount * 3);
      for (let index = 0; index < vertexCount; index += 1) {
        let distance = (index / (vertexCount - 1)) * total;
        let pathIndex = 0;
        while (distance > lengths[pathIndex] && pathIndex < paths.length - 1) distance -= lengths[pathIndex++];
        const point = paths[pathIndex].getPointAtLength(distance);
        sampled[index * 3] = (point.x - 240) / 34;
        sampled[index * 3 + 1] = (240 - point.y) / 34 + 1.2;
        sampled[index * 3 + 2] = 0;
      }
      host.remove();
      targets.current = sampled;
    });
    return () => { cancelled = true; };
  }, [vertexCount]);

  useFrame(() => {
    const master = progressRef?.current ?? 0;
    const target = targets.current;
    const currentLine = lineRef.current;
    const position = currentLine.geometry.getAttribute("position") as BufferAttribute;
    const converge = Math.min(1, Math.max(0, (master - .92) / .07));
    if (target) {
      const array = position.array as Float32Array;
      for (let index = 0; index < array.length; index += 1) array[index] = starts[index] + (target[index] - starts[index]) * converge;
      position.needsUpdate = true;
    }
    (currentLine.material as LineBasicMaterial).opacity = Math.min(1, Math.max(0, (master - .9) / .045)) * (master < .995 ? 1 : (1 - master) * 200);
  });

  useEffect(() => () => { line.geometry.dispose(); (line.material as LineBasicMaterial).dispose(); }, [line]);
  return <primitive object={line} />;
}
