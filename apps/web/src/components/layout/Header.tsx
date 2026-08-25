import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { NavigationState } from "./NavigationState";

export function Header() {
  return (
    <header className="header">
      <NavigationState />
      <Container className="header__inner">
        <Logo />
        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
