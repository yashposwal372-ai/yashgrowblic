"use client";
import { useEffect } from "react";
import { navigationItems } from "@/data/navigation";

export function NavigationState() {
  useEffect(() => {
    const sections = navigationItems.map(({ href }) => document.querySelector<HTMLElement>(href)).filter((section): section is HTMLElement => Boolean(section));
    const setActive = (id: string) => document.querySelectorAll<HTMLAnchorElement>(".desktop-nav__link, .mobile-nav__link").forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const activationLine = window.innerHeight * 0.36;
      const active = sections.find((section) => { const rect = section.getBoundingClientRect(); return rect.top <= activationLine && rect.bottom > activationLine; });
      if (active?.id) setActive(active.id);
    };
    const scheduleUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateActive); };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    setActive(window.location.hash.slice(1) || "home");
    scheduleUpdate();
    return () => { window.removeEventListener("scroll", scheduleUpdate); window.removeEventListener("resize", scheduleUpdate); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return null;
}
