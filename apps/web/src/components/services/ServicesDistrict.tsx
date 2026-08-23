"use client";

import Image from "next/image";
import { useState } from "react";

const services = [
  { title:"AI & Automation", description:"Intelligent systems designed to reduce repetitive work, connect workflows and accelerate operations." },
  { title:"Web Development", description:"High-performance web platforms built around clear customer and operational journeys." },
  { title:"Mobile Applications", description:"Focused mobile systems that keep customers, teams and services connected." },
  { title:"SaaS & Software", description:"Reliable software products designed to become part of how a business operates." },
  { title:"Education Technology", description:"Learning and administration experiences designed with clarity for every user." },
  { title:"Cybersecurity", description:"Thoughtful access, monitoring and security systems built into the digital foundation." },
  { title:"Digital Growth", description:"Connected digital journeys that turn attention into measurable business momentum." },
  { title:"Growblic Care", description:"Ongoing maintenance, optimization and technical care beyond launch." },
];

export function ServicesDistrict() {
  const [active,setActive]=useState(0);
  const current=services[active];
  return <section aria-label="Growblic Services district" className="services-district services-district--settled" id="services">
    <div className="services-district__pin">
      <Image alt="Growblic Services district with a modern glass operations building and landscaped plaza" className="services-district__image" fill sizes="100vw" src="/images/growblic-services-district.png" />
      <div aria-hidden="true" className="services-district__wash" />
      <article aria-live="polite" className="services-district__active"><p>{String(active+1).padStart(2,"0")}</p><h3>{current.title}</h3><span>{current.description}</span></article>
      <nav aria-label="Service stages" className="services-district__rail">{services.map((service,index)=><button className={index===active?"is-active":undefined} key={service.title} onClick={()=>setActive(index)} type="button"><span>{String(index+1).padStart(2,"0")}</span>{service.title}</button>)}</nav>
    </div>
  </section>;
}
