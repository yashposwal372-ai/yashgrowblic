"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  CodeXml,
  GraduationCap,
  HeartHandshake,
  Megaphone,
  PanelsTopLeft,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";
import { serviceCategories } from "@/data/services";
import { cn } from "@/lib/cn";
import type { ServiceCategory } from "@/types/services";

const serviceIcons: Record<string, LucideIcon> = {
  "ai-automation": Bot,
  "web-development": CodeXml,
  "mobile-applications": Smartphone,
  "saas-software": PanelsTopLeft,
  "education-technology": GraduationCap,
  cybersecurity: ShieldCheck,
  "digital-growth": Megaphone,
  "growblic-care": HeartHandshake,
};

function categoryNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function CapabilityList({ category }: { category: ServiceCategory }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.ul
      animate="visible"
      className="service-capabilities"
      initial={shouldReduceMotion ? false : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: shouldReduceMotion
            ? { staggerChildren: 0 }
            : { delayChildren: 0.05, staggerChildren: 0.035 },
        },
      }}
    >
      {category.items.map((item, index) => (
        <motion.li
          key={item.name}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <span className="service-capabilities__number">
            {categoryNumber(index)}
          </span>
          <span>{item.name}</span>
          <span aria-hidden="true" className="service-capabilities__marker" />
        </motion.li>
      ))}
    </motion.ul>
  );
}

function ServiceDetail({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const Icon = serviceIcons[category.id];

  return (
    <div className="service-detail">
      <div aria-hidden="true" className="service-detail__grid" />
      <span aria-hidden="true" className="service-detail__corner service-detail__corner--top" />
      <span aria-hidden="true" className="service-detail__corner service-detail__corner--bottom" />
      <div className="service-detail__topline">
        <span>Active service</span>
        <span>{categoryNumber(index)} / {categoryNumber(serviceCategories.length - 1)}</span>
      </div>
      <div className="service-detail__heading">
        <IconBox size="large">
          <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
        </IconBox>
        <div>
          <p className="service-detail__index">Capability {categoryNumber(index)}</p>
          <h3>{category.title}</h3>
        </div>
      </div>
      <p className="service-detail__description">{category.description}</p>
      <CapabilityList category={category} />
      <ButtonLink className="service-detail__cta" href="#contact" variant="ghost">
        Discuss this capability
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.7} />
      </ButtonLink>
    </div>
  );
}

export function ServicesExplorer() {
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const [openMobileId, setOpenMobileId] = useState(serviceCategories[0].id);
  const shouldReduceMotion = useReducedMotion();
  const activeIndex = serviceCategories.findIndex((item) => item.id === activeId);
  const activeCategory = serviceCategories[activeIndex];

  return (
    <div className="services-explorer">
      <div className="services-explorer__desktop">
        <div className="service-selector">
          <p className="service-selector__label">Select a capability</p>
          <div aria-label="Service categories" className="service-selector__list" role="group">
            {serviceCategories.map((category, index) => {
              const isActive = category.id === activeId;

              return (
                <button
                  aria-pressed={isActive}
                  className={cn("service-selector__button", isActive && "is-active")}
                  key={category.id}
                  onClick={() => setActiveId(category.id)}
                  onFocus={() => setActiveId(category.id)}
                  onMouseEnter={() => setActiveId(category.id)}
                  type="button"
                >
                  <span className="service-selector__number">{categoryNumber(index)}</span>
                  <span className="service-selector__title">{category.title}</span>
                  <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite" className="service-detail-panel">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              key={activeCategory.id}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <ServiceDetail category={activeCategory} index={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="services-explorer__mobile">
        {serviceCategories.map((category, index) => {
          const isOpen = category.id === openMobileId;
          const panelId = `mobile-service-${category.id}`;

          return (
            <div className={cn("service-accordion", isOpen && "is-open")} key={category.id}>
              <h3>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobileId(isOpen ? "" : category.id)}
                  type="button"
                >
                  <span>{categoryNumber(index)}</span>
                  <span>{category.title}</span>
                  <ChevronDown aria-hidden="true" size={19} strokeWidth={1.6} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="service-accordion__panel"
                    exit={{ height: 0, opacity: 0 }}
                    id={panelId}
                    initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
                  >
                    <p>{category.description}</p>
                    <CapabilityList category={category} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
