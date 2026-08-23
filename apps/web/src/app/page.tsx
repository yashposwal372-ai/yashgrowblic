import { Header } from "@/components/layout/Header";
import { HomeServicesTransition } from "@/components/home/HomeServicesTransition";

export default function Home() {
  return (
    <>
      <Header />
      <main><HomeServicesTransition /></main>
    </>
  );
}
