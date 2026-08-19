import { ViewportReveal } from "@/components/animation/ViewportReveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { ServicesExplorer } from "./ServicesExplorer";

export function Services() {
  return (
    <Section className="services" id="services">
      <Container>
        <ViewportReveal>
          <SectionHeading
            className="services__intro"
            description="Growblic helps businesses design, build, launch, and maintain modern digital products through focused technology capabilities."
            eyebrow="What we build"
            title={<>Technology capabilities built around <span className="gradient-text">your business.</span></>}
          />
        </ViewportReveal>
        <ViewportReveal className="services__experience" delay={0.12}>
          <ServicesExplorer />
        </ViewportReveal>
      </Container>
    </Section>
  );
}
