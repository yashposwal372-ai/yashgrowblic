import Image from "next/image";

export function HomeCampusVisual() {
  return (
    <div aria-hidden="true" className="home-campus-visual">
      <div className="home-campus-visual__haze" />
      <div className="home-campus-visual__architecture">
        <Image
          alt=""
          fill
          priority
          sizes="100vw"
          src="/images/growblic-tech-campus.png"
        />
      </div>
      <svg
        className="home-campus-visual__route"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path d="M350 900C610 842 800 890 1010 832C1160 790 1288 788 1440 758" pathLength="1" />
        <path d="M500 900C720 860 860 902 1055 850C1190 814 1318 815 1440 792" pathLength="1" />
      </svg>
    </div>
  );
}
