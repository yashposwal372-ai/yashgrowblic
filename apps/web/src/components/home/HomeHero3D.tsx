import Image from "next/image";

export function HomeHero3D() {
  return <section className="home-only approved-home" id="home">
    <Image
      alt="Growblic technology campus with connected glass office wings and a landscaped entrance plaza"
      className="approved-home__image"
      fill
      priority
      sizes="100vw"
      src="/images/growblic-home-approved.png"
    />
    <div className="home-only__copy approved-home__copy">
      <p className="home-only__eyebrow">Independent digital product studio <span>•</span> India / Worldwide</p>
      <h1><span>Building the digital systems</span><span>behind modern business.</span></h1>
      <p className="approved-home__support">We partner with ambitious companies to design, build, and scale<br />digital products that drive real impact.</p>
    </div>
  </section>;
}
