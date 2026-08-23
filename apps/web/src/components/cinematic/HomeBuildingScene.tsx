import { ArrowDown } from "lucide-react";

const windows = Array.from({ length: 12 }, (_, index) => index);
function Building({ className, label }: { className: string; label: string }) { return <div className={`mini-building ${className}`}><div className="mini-building__roof"><span /><span /></div><div className="mini-building__face mini-building__face--front">{windows.map((item) => <i key={item} />)}</div><div className="mini-building__face mini-building__face--side" /><span className="mini-building__label">{label}</span></div>; }

export function HomeBuildingScene() {
  return <section aria-labelledby="home-title" className="home-building-scene" id="home">
    <div aria-hidden="true" className="home-building-scene__haze" />
    <div className="home-building-scene__copy"><p>Independent digital product studio · India / Worldwide</p><h1 id="home-title"><span>Building the digital systems</span><span>behind modern business.</span></h1><div className="home-building-scene__support"><strong>AI products. Software. Applications. Automation.</strong><span>We design connected digital systems that help modern businesses operate, grow and scale.</span></div></div>
    <div aria-hidden="true" className="mini-district">
      <div className="mini-district__ground" /><div className="mini-district__plaza mini-district__plaza--one" /><div className="mini-district__plaza mini-district__plaza--two" />
      <Building className="mini-building--tower" label="AI / CORE" /><Building className="mini-building--studio" label="PRODUCT CENTER" /><Building className="mini-building--platform" label="SOFTWARE TOWER" /><Building className="mini-building--works" label="AUTOMATION" /><Building className="mini-building--facility" label="DATA / OPERATIONS" /><Building className="mini-building--relay" label="RELAY STATION" />
      <div className="equipment-yard"><span /><span /><span /><span /><i /><i /></div>
      <div className="container-stack container-stack--one"><span /><span /><span /></div><div className="container-stack container-stack--two"><span /><span /></div>
      <div className="signal-mast signal-mast--one"><span /><i /></div><div className="signal-mast signal-mast--two"><span /><i /></div>
      <div className="mini-utility mini-utility--one"><span /></div><div className="mini-utility mini-utility--two"><span /></div><div className="mini-utility mini-utility--three"><span /></div>
      <div className="mini-turbine mini-turbine--one"><span /></div><div className="mini-turbine mini-turbine--two"><span /></div><div className="mini-person mini-person--one" /><div className="mini-person mini-person--two" />
    </div>
    <svg aria-hidden="true" className="home-building-scene__route" preserveAspectRatio="none" viewBox="0 0 1440 900">
      <path d="M632 900 C602 850 576 820 612 784 L696 708 C726 680 710 646 672 628 L636 611 C598 592 606 553 646 538 L755 498 C796 483 807 449 779 425 L726 381 C700 359 711 329 752 309 L814 279" pathLength="1" />
      <path d="M650 900 C620 850 594 820 630 784 L714 708 C744 680 728 646 690 628 L654 611 C616 592 624 553 664 538 L773 498 C814 483 825 449 797 425 L744 381 C718 359 729 329 770 309 L832 279" pathLength="1" />
      <path d="M668 900 C638 850 612 820 648 784 L732 708 C762 680 746 646 708 628 L672 611 C634 592 642 553 682 538 L791 498 C832 483 843 449 815 425 L762 381 C736 359 747 329 788 309 L850 279" pathLength="1" />
      <circle className="home-building-scene__route-node" cx="832" cy="279" r="6" />
    </svg>
    <a className="home-building-scene__next" href="#services"><span>01</span><strong>Explore our services</strong><ArrowDown aria-hidden="true" size={16} /></a>
  </section>;
}
