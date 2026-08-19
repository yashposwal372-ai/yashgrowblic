import Link from "next/link";

import { siteConfig } from "@/constants/site";

export function Logo() {
  return (
    <Link aria-label={`${siteConfig.shortName} home`} className="logo" href="/">
      <span aria-hidden="true" className="logo__mark">
        <span className="logo__core" />
      </span>
      <span className="logo__wordmark">{siteConfig.shortName}</span>
    </Link>
  );
}
