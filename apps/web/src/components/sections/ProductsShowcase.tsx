import { ViewportReveal } from "@/components/animation/ViewportReveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { ProductExplorer } from "./ProductExplorer";

export function ProductsShowcase() {
  return (
    <Section className="products" id="products">
      <Container>
        <ViewportReveal>
          <div className="products__heading-row">
            <SectionHeading className="products__intro" description="We turn business requirements into focused AI products, applications, dashboards, SaaS platforms, automation systems, and digital experiences." eyebrow="Product capabilities" title={<>Software experiences designed to <span className="gradient-text">do real work.</span></>} />
            <div className="products__concept-note">
              <span aria-hidden="true" />
              <p><strong>Concept interfaces</strong>Examples demonstrating Growblic product capabilities.</p>
            </div>
          </div>
        </ViewportReveal>
        <ViewportReveal className="products__experience" delay={0.1}><ProductExplorer /></ViewportReveal>
      </Container>
    </Section>
  );
}
