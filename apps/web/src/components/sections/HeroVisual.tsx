"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { className: "intelligence-field__node--one", label: "AI" },
  { className: "intelligence-field__node--two", label: "WEB" },
  { className: "intelligence-field__node--three", label: "SAAS" },
  { className: "intelligence-field__node--four", label: "AUTO" },
  { className: "intelligence-field__node--five", label: "MOBILE" },
  { className: "intelligence-field__node--six", label: "CLOUD" },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="intelligence-field">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="intelligence-field__motion"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [-3, 3, -3] }}
          className="intelligence-field__system"
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="intelligence-field__radial" />
          <div className="intelligence-field__beam" />
          <span className="intelligence-field__path intelligence-field__path--one">
            <motion.span
              animate={shouldReduceMotion ? undefined : { left: ["0%", "100%"] }}
              className="intelligence-field__signal"
              transition={{ duration: 7, ease: "linear", repeat: Infinity }}
            />
          </span>
          <span className="intelligence-field__path intelligence-field__path--two" />
          <span className="intelligence-field__path intelligence-field__path--three" />
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            className="intelligence-field__orbit intelligence-field__orbit--outer"
            transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          >
            <span className="intelligence-field__satellite" />
          </motion.div>
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: -360 }}
            className="intelligence-field__orbit intelligence-field__orbit--middle"
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            className="intelligence-field__orbit intelligence-field__orbit--inner"
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          />
          <div className="intelligence-field__core">
            <span className="intelligence-field__core-ring intelligence-field__core-ring--outer" />
            <span className="intelligence-field__core-ring intelligence-field__core-ring--inner" />
            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.82, 1, 0.82], scale: [0.94, 1.08, 0.94] }
              }
              className="intelligence-field__core-dot"
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          <span className="intelligence-field__axis intelligence-field__axis--x" />
          <span className="intelligence-field__axis intelligence-field__axis--y" />
          {nodes.map((node) => (
            <span
              className={`intelligence-field__node ${node.className}`}
              key={node.label}
            >
              <span className="intelligence-field__node-dot" />
              {node.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
