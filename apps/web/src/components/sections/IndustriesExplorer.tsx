"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { industries } from "@/data/industries";
import { cn } from "@/lib/cn";
import type { Industry } from "@/types/industries";

function IndustryFlow({ industry }: { industry: Industry }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="industry-flow" aria-label={`${industry.name} digital system flow`}>
      <div className="industry-flow__meta"><span>Business system map</span><span>{industry.shortName} / 01—05</span></div>
      <motion.ol
        animate="visible"
        initial={reduceMotion ? false : "hidden"}
        variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.055 } } }}
      >
        {industry.flow.map((step, index) => (
          <motion.li key={step} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
            <span className="industry-flow__node"><small>{String(index + 1).padStart(2, "0")}</small><strong>{step}</strong></span>
            {index < industry.flow.length - 1 ? <span className="industry-flow__connector" aria-hidden="true"><i /><ArrowRight size={13} /></span> : null}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

function IndustryStory({ industry }: { industry: Industry }) {
  return (
    <article className="industry-story">
      <header><span>Active scenario / {industry.index}</span><h3>{industry.name}</h3></header>
      <div className="industry-story__editorial">
        <div><p className="industry-story__label">The challenge</p><p>{industry.challenge}</p></div>
        <div><p className="industry-story__label">Growblic approach</p><p>{industry.approach}</p></div>
      </div>
      <IndustryFlow industry={industry} />
      <div className="industry-story__footer">
        <div className="industry-capabilities"><p className="industry-story__label">Relevant capabilities</p><ol>{industry.capabilities.map((capability, index) => <li key={capability}><span>{String(index + 1).padStart(2, "0")}</span>{capability}</li>)}</ol></div>
        <ButtonLink className="industry-story__cta" href="#contact" variant="ghost">Talk about your industry <ArrowUpRight aria-hidden="true" size={16} /></ButtonLink>
      </div>
    </article>
  );
}

export function IndustriesExplorer() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const [openId, setOpenId] = useState(industries[0].id);
  const reduceMotion = useReducedMotion();
  const activeIndustry = industries.find((industry) => industry.id === activeId) ?? industries[0];
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="industries-explorer">
      <div className="industries-explorer__desktop">
        <nav className="industry-selector" aria-label="Industry scenarios">
          <p>Select an industry</p>
          {industries.map((industry) => {
            const active = industry.id === activeId;
            return <button aria-pressed={active} className={cn("industry-selector__button", active && "is-active")} key={industry.id} onClick={() => setActiveId(industry.id)} onFocus={() => setActiveId(industry.id)} type="button"><span>{industry.index}</span><strong>{industry.name}</strong><ArrowRight aria-hidden="true" size={16} /></button>;
          })}
        </nav>
        <div className="industry-story-stage" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} initial={reduceMotion ? false : { opacity: 0 }} key={activeIndustry.id} transition={transition}><IndustryStory industry={activeIndustry} /></motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="industries-explorer__mobile">
        {industries.map((industry) => {
          const open = openId === industry.id;
          const panelId = `industry-panel-${industry.id}`;
          return <div className={cn("industry-accordion", open && "is-open")} key={industry.id}>
            <h3><button aria-controls={panelId} aria-expanded={open} onClick={() => setOpenId(open ? "" : industry.id)} type="button"><span>{industry.index}</span><strong>{industry.name}</strong><ChevronDown aria-hidden="true" size={18} /></button></h3>
            <AnimatePresence initial={false}>{open ? <motion.div animate={{ height: "auto", opacity: 1 }} className="industry-accordion__panel" exit={{ height: 0, opacity: 0 }} id={panelId} initial={reduceMotion ? false : { height: 0, opacity: 0 }} transition={transition}><IndustryStory industry={industry} /></motion.div> : null}</AnimatePresence>
          </div>;
        })}
      </div>
    </div>
  );
}
