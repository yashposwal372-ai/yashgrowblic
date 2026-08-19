import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/animation/FadeIn";
import { StaggerReveal } from "@/components/animation/StaggerReveal";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { HeroVisual } from "./HeroVisual";

const capabilities = [
  "AI Solutions",
  "Web & Mobile",
  "SaaS Products",
  "Automation",
];

export function Hero() {
  return (
    <Section className="hero" id="home">
      <div aria-hidden="true" className="hero__ambient" />
      <Container className="hero__container">
        <div className="hero__content">
          <FadeIn delay={0.02}>
            <Badge indicator>AI • Software • Automation</Badge>
          </FadeIn>

          <StaggerReveal
            className="hero__headline"
            gradientLine={1}
            lines={[
              "We build",
              "digital products",
              "that move businesses",
              "forward.",
            ]}
          />

          <FadeIn className="hero__support" delay={0.52}>
            Growblic designs and builds modern AI solutions, software, web experiences, mobile apps, SaaS platforms, and automation systems.
          </FadeIn>

          <FadeIn className="hero__actions" delay={0.64}>
            <ButtonLink href="#contact" size="large">
              Start a Project
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </ButtonLink>
            <ButtonLink href="#services" size="large" variant="secondary">
              Explore Services
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </ButtonLink>
          </FadeIn>
        </div>

        <HeroVisual />

        <FadeIn className="hero__footer" delay={0.76}>
          <ul aria-label="Growblic capabilities" className="capability-strip">
            {capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
          <a className="hero__scroll-cue" href="#services">
            <span>Scroll to explore</span>
            <ArrowDown aria-hidden="true" size={15} />
          </a>
        </FadeIn>
      </Container>
    </Section>
  );
}
