import type { Metadata } from "next";
import "./globals.css";
import "./home-wordmark.css";
import "./v3.css";
import "./v3-responsive.css";
import "./care-system.css";
import "./care-3d.css";
import "./care-motion.css";
import "./services-polish.css";
import "./products-transition.css";
import "./industries-polish.css";
import "./work-polish.css";
import "./about-polish.css";

export const metadata: Metadata = {
  title: "Growblic Software Company",
  description:
    "Growblic builds modern AI solutions, software, websites, mobile applications, SaaS products, automation systems and digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="site-body">{children}</body>
    </html>
  );
}
