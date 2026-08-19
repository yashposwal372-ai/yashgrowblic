import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { navigationItems } from "@/data/navigation";

export function DesktopNav() {
  return (
    <div className="desktop-nav">
      <nav aria-label="Primary navigation">
        <ul className="desktop-nav__list">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <a className="desktop-nav__link" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ButtonLink className="header__cta" href="#contact">
        Start a Project
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
      </ButtonLink>
    </div>
  );
}
