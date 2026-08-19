import type { Metadata } from "next";
import "./globals.css";

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
