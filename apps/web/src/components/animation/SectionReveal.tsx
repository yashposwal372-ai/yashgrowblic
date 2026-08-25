"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function SectionReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); } }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div className={`section-reveal ${className}`} ref={ref} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
