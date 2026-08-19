import { ArrowRight, Blocks } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/constants/site";

export default function Home() {
  return (
    <main className="preview background-grid background-radial background-vignette">
      <Section aria-labelledby="preview-title">
        <Container className="preview__content">
          <div className="preview__intro">
            <Badge indicator>Design system preview</Badge>
            <h1 className="preview__title text-hero" id="preview-title">
              {siteConfig.shortName} builds <span className="gradient-text">intelligent digital systems.</span>
            </h1>
            <p className="preview__description text-body-large">
              A lightweight visual foundation for {siteConfig.name}, designed for modern AI, software, SaaS, and technology experiences.
            </p>
            <div className="preview__actions">
              <Button size="large">
                Primary action
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
              </Button>
              <Button size="large" variant="secondary">
                Secondary action
              </Button>
            </div>
          </div>

          <Card className="preview__card" interactive>
            <IconBox size="large">
              <Blocks aria-hidden="true" size={24} strokeWidth={1.7} />
            </IconBox>
            <h2 className="text-card-heading">Reusable by design</h2>
            <p>
              Tokens and primitives establish consistent spacing, typography, surfaces, interaction states, and accessibility for future pages.
            </p>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
