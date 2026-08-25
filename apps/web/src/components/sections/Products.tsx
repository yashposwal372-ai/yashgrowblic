"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Bot, Boxes, Check, GraduationCap, Network, Orbit, ShieldCheck, ShoppingBag, Workflow } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

import { productConcepts } from "@/data/products";

const productContent = {
  "ai-desk": { detail: "Company knowledge transformed into useful, governed action.", capabilities: ["Knowledge intelligence", "Assisted workflows", "Secure team access"], icon: Bot },
  flow: { detail: "Visual automation for connected business processes.", capabilities: ["Workflow orchestration", "Conditional logic", "Approval flows"], icon: Workflow },
  learn: { detail: "Learning, assessments and progress in one platform.", capabilities: ["Course delivery", "Assessments", "Learner progress"], icon: GraduationCap },
  commerce: { detail: "Connected operational tools for modern commerce.", capabilities: ["Order operations", "Inventory visibility", "Customer workflows"], icon: ShoppingBag },
  secure: { detail: "Authentication, sessions and access visibility.", capabilities: ["Authentication", "Session controls", "Access visibility"], icon: ShieldCheck },
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

function setDepth(event: PointerEvent<HTMLDivElement>, target: HTMLDivElement, strengthX: number, strengthY: number, shift: number) {
  if (event.pointerType === "touch") return;
  const rect = target.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  target.style.setProperty("--depth-y", `${x * strengthY}deg`);
  target.style.setProperty("--depth-x", `${y * -strengthX}deg`);
  target.style.setProperty("--depth-shift", `${y * -shift}px`);
}

export function Products() {
  const [activeId, setActiveId] = useState(productConcepts[0].id);
  const buildingRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activeProduct = productConcepts.find((product) => product.id === activeId) ?? productConcepts[0];
  const activeContent = productContent[activeProduct.id as keyof typeof productContent];
  const ActiveIcon = activeContent.icon;

  function handleBuildingMove(event: PointerEvent<HTMLDivElement>) {
    if (!buildingRef.current || reduceMotion) return;
    setDepth(event, buildingRef.current, 1.6, 2.6, 8);
  }

  function handleDetailMove(event: PointerEvent<HTMLDivElement>) {
    if (!detailRef.current || reduceMotion) return;
    setDepth(event, detailRef.current, 2, 2.6, 0);
  }

  return (
    <section className="v3-products" id="products">
      <div className="v3-shell v3-products__layout">
        <div className="v3-products__showcase">
          <div className="v3-products__intro">
            <div className="v3-products__chapter-rule" aria-hidden="true"><i /></div>
            <p className="v3-products__eyebrow"><strong>Products</strong><span>/ Digital platforms</span><i /></p>
            <h2 className="v3-products__title">Software built<br />to run the<br />business<span>.</span></h2>
            <div className="v3-products__copy"><p>Purpose-built products that streamline operations, unify teams and accelerate growth.</p><strong>One platform. Endless impact.</strong></div>
          </div>

          <motion.div className="v3-products__architecture" initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }} transition={{ duration: 0.8, ease }} viewport={{ amount: 0.15, once: true }} whileInView={{ opacity: 1, scale: 1 }}>
            <div className="v3-products__building" onPointerLeave={() => buildingRef.current?.removeAttribute("style")} onPointerMove={handleBuildingMove} ref={buildingRef}>
              <Image alt="Growblic technology campus with modern glass architecture" fill sizes="(max-width: 960px) 100vw, 63vw" src="/images/growblic-tech-campus.png" />
              <div className="v3-products__image-shade" aria-hidden="true" />
            </div>
            <div className="v3-products__count"><Boxes aria-hidden="true" size={19} /><div><strong>05</strong><span>Products</span></div><small>Unified platform<br />Built for scale</small></div>
          </motion.div>

          <div className="v3-products__brief">
            <article><span><AlertTriangle aria-hidden="true" size={12} />Challenge</span><p>Disconnected tools, scattered data and manual processes slow everything down.</p></article>
            <article><span><Network aria-hidden="true" size={12} />Growblic approach</span><p>Unified products that connect systems, automate workflows and deliver real-time insight.</p></article>
          </div>
        </div>

        <div className="v3-product-suite">
          <p className="v3-product-suite__label">Product system / 01—05</p>
          <div className="v3-product-suite__list" role="tablist" aria-label="Growblic products">
            {productConcepts.map((product) => {
              const active = activeId === product.id;
              return <button aria-controls="product-detail" aria-selected={active} className={active ? "is-active" : ""} key={product.id} onClick={() => setActiveId(product.id)} role="tab" type="button"><span>{product.index}</span><strong>{product.name}</strong><ArrowRight aria-hidden="true" size={16} />{active && <motion.i className="v3-product-suite__indicator" layoutId="product-active-indicator" transition={{ duration: 0.3, ease }} />}</button>;
            })}
          </div>

          <div className="v3-product-detail__perspective">
            <AnimatePresence mode="wait">
              <motion.div animate={{ opacity: 1, y: 0, scale: 1 }} className="v3-product-detail" exit={reduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.99 }} id="product-detail" initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }} key={activeProduct.id} onPointerLeave={() => detailRef.current?.removeAttribute("style")} onPointerMove={handleDetailMove} ref={detailRef} role="tabpanel" transition={{ duration: 0.3, ease }}>
                <div className="v3-product-detail__copy"><span className="v3-product-detail__icon"><ActiveIcon aria-hidden="true" size={20} /></span><div><small>Active platform / {activeProduct.index}</small><h3>{activeProduct.name}</h3></div><p>{activeContent.detail}</p><ul>{activeContent.capabilities.map((capability) => <li key={capability}><Check aria-hidden="true" size={13} />{capability}</li>)}</ul></div>
                <div className="v3-product-orbit" aria-hidden="true"><div className="v3-orbit-glow" /><i className="v3-orbit-ring ring-1" /><i className="v3-orbit-ring ring-2" /><i className="v3-orbit-ring ring-3" /><i className="v3-orbit-ring ring-4" /><span className="v3-orbit-node node-1" /><span className="v3-orbit-node node-2" /><span className="v3-orbit-node node-active" /><b><Orbit size={24} /></b></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
