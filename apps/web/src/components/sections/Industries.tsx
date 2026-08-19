import { ViewportReveal } from "@/components/animation/ViewportReveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { IndustriesExplorer } from "./IndustriesExplorer";

export function Industries() {
  return (
    <Section className="industries" id="industries">
      <Container>
        <ViewportReveal>
          <SectionHeading
            className="industries__intro"
            description="We adapt design and engineering to the workflows, users, and operational realities of each business—not a one-size-fits-all template."
            eyebrow="Industries"
            title={<>Different industries. <span className="gradient-text">One product mindset.</span></>}
          />
        </ViewportReveal>
        <ViewportReveal className="industries__experience" delay={0.12}>
          <IndustriesExplorer />
        </ViewportReveal>
      </Container>
    </Section>
  );
}
