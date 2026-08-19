import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
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
      </main>
    </>
  );
}
