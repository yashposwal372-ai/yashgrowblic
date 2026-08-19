"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { ProductMockup } from "@/components/product-mockups/ProductMockups";
import { ButtonLink } from "@/components/ui/Button";
import { productConcepts } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductExplorer() {
  const [activeId, setActiveId] = useState(productConcepts[0].id);
  const reduceMotion = useReducedMotion();
  const activeProduct = productConcepts.find((product) => product.id === activeId) ?? productConcepts[0];
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="product-explorer">
      <div aria-label="Product concepts" className="product-selector" role="group">
        {productConcepts.map((product) => {
          const active = product.id === activeId;
          return <button aria-pressed={active} className={cn("product-selector__button", active && "is-active")} key={product.id} onClick={() => setActiveId(product.id)} type="button"><span>{product.index}</span><span><strong>{product.name.replace("Growblic ", "")}</strong><small>{product.category}</small></span></button>;
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div animate={{ opacity: 1, y: 0 }} className="product-stage" exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} initial={reduceMotion ? false : { opacity: 0, y: 12 }} key={activeProduct.id} transition={transition}>
          <div className="product-info">
            <div className="product-info__copy"><span className="product-info__index">Concept {activeProduct.index}</span><p className="product-info__category">{activeProduct.category}</p><h3>{activeProduct.name}</h3><p>{activeProduct.description}</p></div>
            <ol className="product-capabilities">{activeProduct.capabilities.map((capability, index) => <li key={capability}><span>{String(index + 1).padStart(2, "0")}</span>{capability}</li>)}</ol>
            <ButtonLink className="product-info__cta" href="#contact" variant="secondary">Build a product with Growblic <ArrowUpRight aria-hidden="true" size={16} /></ButtonLink>
          </div>
          <motion.div animate={{ opacity: 1, scale: 1 }} className="product-mockup" initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }} transition={transition}><ProductMockup type={activeProduct.interfaceType} /></motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
