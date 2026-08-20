"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Hero } from "@/components/sections/Hero";
import { GrowblicWorld } from "@/components/world/GrowblicWorld";
import { ChapterOverlay } from "@/components/cinematic/ChapterOverlay";
import { cinematicChapters, getArrivedCinematicChapter, getChapterArrivalProgress } from "@/data/cinematicWorld";
import { worldStages } from "@/data/world";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollWorld() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLElement>(null);
  const finalLogo = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const chapterRef = useRef(0);
  const arrivalRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const navigate = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const chapter = cinematicChapters.find((item)=>anchor?.getAttribute("href")===`#${item.id}`);
      if (!anchor || !chapter) return;
      const trigger = ScrollTrigger.getAll().find((item)=>item.trigger===root.current);
      if (!trigger) return;
      event.preventDefault();
      window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*getChapterArrivalProgress(chapter),behavior:"smooth"});
    };
    document.addEventListener("click",navigate);
    return ()=>document.removeEventListener("click",navigate);
  }, [reducedMotion]);

  useGSAP(() => {
    if (!root.current || !pin.current || reducedMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 8 : 12)}`,
      pin: pin.current,
      scrub: .55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
        progressRef.current = progress;
        const nextChapter = progress >= .93 ? 7 : getArrivedCinematicChapter(progress);
        if (chapterRef.current !== nextChapter) {
          chapterRef.current = nextChapter;
          setActiveIndex(nextChapter);
        }
        const services = cinematicChapters[1];
        const serviceArrival = services.range[0] + (services.range[1] - services.range[0]) * .72;
        const serviceProgress = Math.min(.9999,Math.max(0,(progress-serviceArrival)/(services.range[1]-serviceArrival)));
        const nextService = nextChapter===1 ? Math.floor(serviceProgress*worldStages.length) : -1;
        if (arrivalRef.current !== nextService) { arrivalRef.current=nextService; setServiceIndex(nextService); }
        const heroExit = Math.min(1, progress / .12);
        if (hero.current) {
          hero.current.style.opacity = String(1 - heroExit);
          hero.current.style.transform = `translateY(${-heroExit * 44}px) scale(${1 - heroExit * .035})`;
          hero.current.style.pointerEvents = heroExit > .85 ? "none" : "auto";
        }
        if (rail.current) rail.current.style.opacity = String(Math.min(1, Math.max(0, (progress - .075) / .04)) * Math.min(1, Math.max(0, (.95 - progress) / .025)));
        if (finalLogo.current) finalLogo.current.style.opacity = String(Math.min(1, Math.max(0, (progress - .985) / .015)));
      },
    });
    return () => trigger.kill();
  }, { dependencies: [reducedMotion], scope: root });

  return (
    <section aria-label="Growblic cinematic digital world" className="world-story cinematic-experience" id="world" ref={root}>
      <div className="world-story__pin" ref={pin}>
        <GrowblicWorld activeIndex={serviceIndex} className="world-story__canvas" progressRef={progressRef} />
        <div className="cinematic-experience__hero" ref={hero}><Hero /></div>
        <nav aria-label="Digital world stages" className="cinematic-rail" ref={rail}>
          <div aria-hidden="true" className="cinematic-rail__line"><span style={{ transform: `scaleY(${Math.max(0, Math.min(6,activeIndex) + 1) / cinematicChapters.length})` }} /></div>
          {cinematicChapters.map((chapter, index) => <a aria-current={index === activeIndex ? "step" : undefined} className={cn("cinematic-rail__item", index === activeIndex && "is-active")} href={`#${chapter.id}`} key={chapter.id} onClick={(event) => { if (reducedMotion) return; event.preventDefault(); const trigger = ScrollTrigger.getAll().find((item) => item.trigger === root.current); if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * getChapterArrivalProgress(chapter), behavior: "smooth" }); }}><span className="cinematic-rail__index" style={index === activeIndex ? { borderColor: chapter.routeColor ?? "#356dff", color: chapter.routeColor ?? "#356dff" } : undefined}>{chapter.index}</span><span className="cinematic-rail__copy"><strong>{chapter.title}</strong><em>{chapter.description}</em></span></a>)}
        </nav>
        <ChapterOverlay activeIndex={activeIndex} />
        <div aria-hidden="true" className="cinematic-logo-lock" ref={finalLogo}>
          <Image alt="" height={280} src="/images/growblic-logo.svg" width={280} />
          <strong>GROWBLIC</strong>
          <span>One connected digital ecosystem.</span>
        </div>
      </div>
      <div className="sr-only">{cinematicChapters.map((chapter) => <article id={chapter.id} key={chapter.id}><h2>{chapter.index} {chapter.title}</h2><p>{chapter.description}</p></article>)}</div>
    </section>
  );
}
