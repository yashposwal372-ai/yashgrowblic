import Image from "next/image";

export function ServiceBuildingVisual() {
  return <div aria-hidden="true" className="service-building-visual">
    <div className="service-building-visual__image">
      <Image alt="" fill sizes="42vw" src="/images/service-building-02.png" unoptimized />
    </div>
    <svg className="service-building-visual__route" preserveAspectRatio="none" viewBox="0 0 1440 900">
      <path d="M380 760C510 750 600 710 670 640C720 590 758 540 794 505" pathLength="1" />
      <path d="M380 772C518 762 610 722 681 651C731 601 769 551 804 516" pathLength="1" />
      <circle cx="797" cy="506" r="6" />
    </svg>
  </div>;
}
