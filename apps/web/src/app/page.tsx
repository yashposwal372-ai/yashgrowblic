import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <ProductsShowcase />
        <Industries />
      </main>
    </>
  );
}
