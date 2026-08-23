"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { Hero } from "@/components/sections/Hero";
import { ServicesDistrict } from "@/components/services/ServicesDistrict";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeServicesTransition() {
  const journey = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!journey.current || !stage.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const homeNav = document.querySelector<HTMLAnchorElement>('a[href="#home"]');
    const servicesNav = document.querySelector<HTMLAnchorElement>('a[href="#services"]');
    const setNav = (progress: number) => {
      const homeActive = progress <= 0.18;
      const servicesActive = progress >= 0.82;
      homeNav?.classList.toggle("is-transition-active", homeActive);
      servicesNav?.classList.toggle("is-transition-active", servicesActive);
      homeNav?.toggleAttribute("aria-current", homeActive);
      servicesNav?.toggleAttribute("aria-current", servicesActive);
    };

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: journey.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 0.1 : 0.6)}`,
        pin: stage.current,
        pinSpacing: false,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => setNav(progress),
      },
    });

    timeline
      .to(".approved-home__copy", { y: -20, opacity: 0, duration: 0.25 }, 0.2)
      .to(".cinematic-journey__home", { x: "-5vw", y: "-1.5vh", scale: 1.06, duration: 0.32 }, 0.3)
      .fromTo(".cinematic-journey__services", { x: "12vw", scale: 1.07, clipPath: "inset(0 0 0 100%)" }, { x: 0, scale: 1, clipPath: "inset(0 0 0 0%)", duration: 0.36 }, 0.5)
      .fromTo(".cinematic-journey__wipe", { x: "100vw", opacity: 0.38 }, { x: "-12vw", opacity: 0.38, duration: 0.36 }, 0.5)
      .to(".cinematic-journey__wipe", { opacity: 0, duration: 0.08 }, 0.86)
      .fromTo(".cinematic-journey__services-copy", { y: 18, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.1 }, 0.9);

    const goHome = (event: Event) => {
      event.preventDefault();
      window.scrollTo({ top: timeline.scrollTrigger?.start ?? 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#home");
    };
    const goServices = (event: Event) => {
      event.preventDefault();
      window.scrollTo({ top: timeline.scrollTrigger?.end ?? 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#services");
    };
    const refresh = () => ScrollTrigger.refresh();
    homeNav?.addEventListener("click", goHome);
    servicesNav?.addEventListener("click", goServices);
    window.addEventListener("load", refresh, { once: true });
    setNav(0);

    return () => {
      homeNav?.removeEventListener("click", goHome);
      servicesNav?.removeEventListener("click", goServices);
      window.removeEventListener("load", refresh);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      homeNav?.classList.remove("is-transition-active");
      servicesNav?.classList.remove("is-transition-active");
      homeNav?.removeAttribute("aria-current");
      servicesNav?.removeAttribute("aria-current");
    };
  }, { scope: journey });

  return <div className="home-services-experience">
    <div className="cinematic-journey" ref={journey}>
      <div className="cinematic-journey__stage" ref={stage}>
        <div className="cinematic-journey__home"><Hero /></div>
        <div aria-hidden="true" className="cinematic-journey__services">
          <Image alt="" className="cinematic-journey__services-image" fill sizes="100vw" src="/images/growblic-services-district.png" />
          <div className="cinematic-journey__services-wash" />
          <div className="cinematic-journey__services-copy"><p>02 / Services</p><h2>Systems that<br />move business<br />forward.</h2><span>From intelligent automation to complete digital platforms,<br />Growblic builds the technology modern businesses operate on.</span></div>
        </div>
        <div aria-hidden="true" className="cinematic-journey__wipe" />
      </div>
    </div>
    <ServicesDistrict />
  </div>;
}
