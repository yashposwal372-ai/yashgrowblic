import { ArrowDown, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/animation/FadeIn";
import { StaggerReveal } from "@/components/animation/StaggerReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Hero() {
  return (
    <Section className="hero cinematic-hero" id="home">
      <Container className="hero__container">
        <div className="hero__content">
          <FadeIn className="hero__eyebrow" delay={0}>Growblic Digital World / 2026</FadeIn>
          <StaggerReveal className="hero__headline" gradientLine={2} lines={["Building the", "digital systems", "behind modern", "business."]} />
          <FadeIn className="hero__support" delay={0.22}>AI products, software, apps, automation, and digital platforms—designed, engineered, and cared for by Growblic.</FadeIn>
          <FadeIn className="hero__actions" delay={0.29}>
            <ButtonLink href="#world" size="large">Enter the Journey <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} /></ButtonLink>
            <ButtonLink href="#world" size="large" variant="secondary">Explore the World <ArrowDown aria-hidden="true" size={18} strokeWidth={1.8} /></ButtonLink>
          </FadeIn>
        </div>
        <FadeIn className="hero__footer" delay={0.36}>
          <p className="hero__world-label"><span>Growblic Core / Online</span>One connected technology ecosystem</p>
          <a className="hero__scroll-cue" href="#world"><span>Scroll to explore the Growblic world</span><ArrowDown aria-hidden="true" size={15} /></a>
        </FadeIn>
      </Container>
    </Section>
  );
}
