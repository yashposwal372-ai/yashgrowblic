"use client";

import { industries } from "@/data/industries";
import { productConcepts } from "@/data/products";
import { serviceCategories } from "@/data/services";
import { cinematicChapters } from "@/data/cinematicWorld";

const workStages = ["Discover","Design","Build","Launch","Grow & Care"];

export function ChapterOverlay({ activeIndex }: { activeIndex: number }) {
  const chapter = cinematicChapters[activeIndex];
  if (!chapter || chapter.id === "home") return null;
  return <aside aria-live="polite" className={`chapter-overlay chapter-overlay--${chapter.id}`}>
    <p className="chapter-overlay__eyebrow">{chapter.index} / {chapter.label}</p>
    <h2>{chapter.title}</h2>
    <p>{chapter.description}</p>
    {chapter.id === "services" && <ul>{serviceCategories.map((item)=><li key={item.id}>{item.title}</li>)}</ul>}
    {chapter.id === "products" && <ul>{productConcepts.map((item)=><li key={item.id}>{item.name}</li>)}</ul>}
    {chapter.id === "industries" && <ul>{industries.map((item)=><li key={item.id}>{item.name}</li>)}</ul>}
    {chapter.id === "work" && <ol>{workStages.map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ol>}
    {chapter.id === "about" && <p className="chapter-overlay__note">We design and engineer connected AI products, software, applications, automation and digital platforms with a practical product mindset.</p>}
    {chapter.id === "contact" && <ContactInterface />}
  </aside>;
}

function ContactInterface() {
  return <form className="cinematic-contact" onSubmit={(event)=>event.preventDefault()}>
    <div><label>Name<input name="name" required /></label><label>Company<input name="company" /></label></div>
    <div><label>Email<input name="email" required type="email" /></label><label>Phone <span>optional</span><input name="phone" type="tel" /></label></div>
    <div><label>Project type<select name="projectType"><option>New digital product</option><option>Website or platform</option><option>Mobile application</option><option>Automation system</option></select></label><label>Preferred contact<select name="contactMethod"><option>Email</option><option>Phone</option><option>Video call</option></select></label></div>
    <label>Services interested in<input name="services" placeholder="AI, web, mobile, software…" /></label>
    <label>Budget range <span>optional</span><input name="budget" /></label>
    <label>Project description<textarea name="description" required rows={3} /></label>
    <button type="submit">Prepare project query</button>
    <small>Form interface ready — submission integration will be connected separately.</small>
  </form>;
}
