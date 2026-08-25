"use client";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/animation/SectionReveal";

const services = [
  ["AI & Automation", "Intelligence woven into workflows, operations and customer experiences.", "ORCHESTRATE", ["Signal", "Reason", "Act"]],
  ["Web Platforms", "High-performance platforms built around measurable business outcomes.", "PLATFORM", ["Interface", "Services", "Data"]],
  ["Mobile Applications", "Focused applications connecting customers, teams and operations.", "MOBILE", ["Experience", "Device", "Cloud"]],
  ["SaaS Products", "Reliable product systems engineered to scale with the business.", "PRODUCT", ["Core", "Modules", "Growth"]],
  ["Education Technology", "Accessible learning systems designed for progress and engagement.", "LEARNING", ["Content", "Learner", "Insight"]],
  ["Cybersecurity", "Practical protection built through every critical product layer.", "SECURE", ["Observe", "Protect", "Respond"]],
  ["Digital Growth", "Connected journeys that improve conversion, retention and value.", "GROWTH", ["Reach", "Convert", "Retain"]],
  ["Growblic Care", "Dependable support, optimisation and stewardship after launch.", "CARE", ["Monitor", "Support", "Evolve"]],
] as const;

function ServiceVisual({ item, index, className = "" }: { item: typeof services[number]; index: number; className?: string }) {
  return <div className={`v7-product-visual visual-${index + 1} ${className}`}><header><span>Growblic / {item[2]}</span><i><b /> System active</i></header><div className="v7-product-visual__workspace"><div className="v7-product-visual__rail"><b>G</b>{item[3].map(label=><i key={label} />)}</div><main><div className="v7-product-visual__heading"><span>Active capability / {String(index + 1).padStart(2, "0")}</span><strong>{item[0]}</strong></div><div className="v7-product-visual__flow">{item[3].map((label,step)=><div key={label}><span>0{step + 1}</span><b>{label}</b><i /></div>)}</div><div className="v7-product-visual__lower"><section><span>Intelligent layer</span><strong>{item[2]}</strong><div><i /><i /><i /><i /></div></section><aside><span>Recent activity</span><p><i /> System signal processed <b>Now</b></p><p><i /> Capability state updated <b>02m</b></p><p><i /> Workflow completed <b>08m</b></p></aside></div></main></div></div>;
}

export function Services() {
  const [active, setActive] = useState(0);
  const [careNode, setCareNode] = useState(0);
  const careNodes = [
    ["Monitor", "System health", "Continuous system visibility"],
    ["Support", "Issue response", "Responsive technical support"],
    ["Maintain", "Continuous upkeep", "Dependable platform maintenance"],
    ["Optimise", "Performance refinement", "Focused system optimisation"],
    ["Evolve", "Product improvement", "Thoughtful product evolution"],
  ];
  useEffect(() => {
    const board = document.querySelector<HTMLElement>(".care-control");
    if (!board || window.matchMedia("(max-width: 1024px), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = board.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight));
      board.style.setProperty("--care-scroll", `${progress * -18}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onPointerMove = (event: globalThis.PointerEvent) => {
      const rect = board.getBoundingClientRect();
      const pointerX = (event.clientX - rect.left) / rect.width - .5;
      const pointerY = (event.clientY - rect.top) / rect.height - .5;
      board.style.setProperty("--care-tilt-x", `${pointerY * -5}deg`);
      board.style.setProperty("--care-tilt-y", `${pointerX * 7}deg`);
      const depth = [0.96, -4.4, 5.6, -5.2, 6.4, 2.8];
      board.style.setProperty("--care-hub-x", `${pointerX * depth[0]}px`);
      board.style.setProperty("--care-hub-y", `${pointerY * depth[0]}px`);
      depth.slice(1).forEach((amount, index) => {
        board.style.setProperty(`--care-node-${index + 1}-x`, `${pointerX * amount}px`);
        board.style.setProperty(`--care-node-${index + 1}-y`, `${pointerY * amount}px`);
      });
    };
    const reset = () => {
      board.style.setProperty("--care-tilt-x", "0deg");
      board.style.setProperty("--care-tilt-y", "0deg");
      board.style.setProperty("--care-hub-x", "0px");
      board.style.setProperty("--care-hub-y", "0px");
      for (let index = 1; index <= 5; index += 1) {
        board.style.setProperty(`--care-node-${index}-x`, "0px");
        board.style.setProperty(`--care-node-${index}-y`, "0px");
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    board.addEventListener("pointermove", onPointerMove);
    board.addEventListener("pointerleave", reset);
    return () => { window.removeEventListener("scroll", onScroll); board.removeEventListener("pointermove", onPointerMove); board.removeEventListener("pointerleave", reset); if (frame) cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const nodes = document.querySelector<HTMLElement>(".care-control__nodes");
    if (!nodes) return;
    let paused = false;
    const timer = window.setInterval(() => {
      if (!paused) setCareNode(node => (node + 1) % careNodes.length);
    }, 3600);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    nodes.addEventListener("pointerenter", pause);
    nodes.addEventListener("pointerleave", resume);
    nodes.addEventListener("focusin", pause);
    nodes.addEventListener("focusout", resume);
    return () => {
      window.clearInterval(timer);
      nodes.removeEventListener("pointerenter", pause);
      nodes.removeEventListener("pointerleave", resume);
      nodes.removeEventListener("focusin", pause);
      nodes.removeEventListener("focusout", resume);
    };
  }, [careNodes.length]);
  useEffect(() => {
    const visual = document.querySelector<HTMLElement>(".v7-showcase__visual");
    if (!visual || window.matchMedia("(max-width: 960px), (prefers-reduced-motion: reduce)").matches) return;
    const move = (event: globalThis.PointerEvent) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      visual.style.setProperty("--v7-rotate-x", `${y * -3}deg`);
      visual.style.setProperty("--v7-rotate-y", `${x * 4}deg`);
    };
    const reset = () => { visual.style.setProperty("--v7-rotate-x", "0deg"); visual.style.setProperty("--v7-rotate-y", "0deg"); };
    visual.addEventListener("pointermove", move);
    visual.addEventListener("pointerleave", reset);
    return () => { visual.removeEventListener("pointermove", move); visual.removeEventListener("pointerleave", reset); };
  }, []);
  return <section className="v7-services" id="services"><div aria-hidden="true" className="v7-services__transition" /><div className="v3-shell"><div className="v7-services__chapter"><span>Services</span><i /><small>01 / 08</small></div>
    <div className="v7-services__intro"><SectionReveal><p className="v3-kicker">Services / What we build</p><h2><span>Connected systems.</span><span>Built to perform<i>.</i></span></h2><p>Strategy, product design, engineering and automation brought together into one digital practice.</p><a href="#service-index">Explore capabilities <ArrowUpRight aria-hidden="true" size={16} /></a></SectionReveal><SectionReveal className="v7-services__statement" delay={80}><strong>08 capabilities<br />One connected practice.</strong><p>From strategy through launch, optimisation and long-term care.</p></SectionReveal></div>
    <div className="v7-showcase" id="service-index"><div className="v7-service-selector">{services.map((item, index) => <SectionReveal delay={index * 40} key={item[0]}><button aria-expanded={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} type="button"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item[0]}</strong><i /><small>{item[1]}</small><em>Explore capability <ArrowUpRight aria-hidden="true" size={14} /></em></button>{active === index && <ServiceVisual className="v7-product-visual--mobile" index={index} item={item} />}</SectionReveal>)}</div><SectionReveal className="v7-showcase__visual" delay={100}><ServiceVisual index={active} item={services[active]} key={active} /></SectionReveal></div>
  </div><SectionReveal className="care-system" delay={80}><div className="v3-shell care-system__layout" id="service-feature"><div className="care-system__copy"><span className="care-system__service-label">08 / Growblic Care</span><p className="v3-kicker">Connected capability / Care</p><h3 aria-label="One practice. Multiple systems. One standard."><span>One practice.</span><span>Multiple systems.</span><span>One standard.</span></h3><p>Dependable support, optimisation and stewardship after launch — keeping critical digital systems healthy as the business evolves.</p><a href="#contact"><i />Explore Growblic Care <span aria-hidden="true">↗</span></a></div><div className="care-control"><header><span>Growblic Care / Connected Operations</span><i><b /> System online</i></header><span className="care-control__coordinate care-control__coordinate--top">OPS / 08—CARE</span><span className="care-control__coordinate care-control__coordinate--bottom">CONNECTED STEWARDSHIP</span><div className="care-control__glow"/><div className="care-control__hub" aria-live="polite"><small>Growblic Care</small><strong>System active</strong><span>{careNodes[careNode][2]}</span><i><b /> Online</i></div><svg aria-hidden="true" className="care-control__connections" preserveAspectRatio="none" viewBox="0 0 800 480">{["M115 120 C230 120 265 215 400 240","M685 115 C570 115 540 205 400 240","M105 365 C230 365 270 270 400 240","M695 365 C575 365 545 275 400 240","M400 440 C400 365 400 325 400 240"].map((path,index)=><g className={careNode===index?"is-active":""} key={path}><path d={path}/><circle r="3"><animateMotion dur="1.8s" path={path} repeatCount="indefinite" /></circle></g>)}</svg><div className="care-control__nodes">{careNodes.map((node,index)=><button className={`${careNode===index?"is-active ":""}node-${index+1}`} key={node[0]} onClick={()=>setCareNode(index)} onFocus={()=>setCareNode(index)} onMouseEnter={()=>setCareNode(index)} type="button"><span>0{index+1}</span><strong>{node[0]}</strong><small>{node[1]}</small></button>)}</div></div></div><div className="care-capabilities">{["Monitoring","Maintenance","Support","Optimisation","Continuous improvement"].map(item=><span key={item}>{item}</span>)}</div></SectionReveal></section>;
}
