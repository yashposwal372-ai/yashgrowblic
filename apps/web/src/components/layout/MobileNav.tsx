"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { navigationItems } from "@/data/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="mobile-nav">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className="mobile-nav__trigger"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <Menu aria-hidden="true" size={22} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="mobile-nav__overlay"
            exit={{ opacity: 0 }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            onClick={() => setIsOpen(false)}
            transition={transition}
          >
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              aria-label="Navigation menu"
              aria-modal="true"
              className="mobile-nav__panel"
              exit={{ opacity: 0, x: 20 }}
              id={panelId}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              onClick={(event) => event.stopPropagation()}
              ref={panelRef}
              role="dialog"
              transition={transition}
            >
              <div className="mobile-nav__topline">
                <span className="mobile-nav__label">Navigation</span>
                <button
                  aria-label="Close navigation menu"
                  autoFocus
                  className="mobile-nav__trigger"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <X aria-hidden="true" size={22} />
                </button>
              </div>

              <nav aria-label="Mobile navigation">
                <motion.ul
                  animate="show"
                  className="mobile-nav__list"
                  initial={shouldReduceMotion ? false : "hidden"}
                  variants={{
                    hidden: {},
                    show: {
                      transition: shouldReduceMotion
                        ? { staggerChildren: 0 }
                        : { delayChildren: 0.05, staggerChildren: 0.035 },
                    },
                  }}
                >
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      <a
                        className="mobile-nav__link"
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <span aria-hidden="true">0{index + 1}</span>
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <ButtonLink
                className="mobile-nav__cta"
                href="#contact"
                onClick={() => setIsOpen(false)}
                size="large"
              >
                Start a Project
                <ArrowUpRight aria-hidden="true" size={18} />
              </ButtonLink>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
