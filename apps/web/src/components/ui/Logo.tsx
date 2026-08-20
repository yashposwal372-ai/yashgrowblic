import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/constants/site";

export function Logo() {
  return (
    <Link aria-label={`${siteConfig.shortName} home`} className="logo" href="/">
      <span aria-hidden="true" className="logo__mark">
        <Image alt="" className="logo__mark-image" height={28} priority src="/images/growblic-logo.svg" width={28} />
      </span>
      <span className="logo__wordmark">{siteConfig.shortName}</span>
    </Link>
  );
}
