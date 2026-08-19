import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "large";

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn("button", `button--${variant}`, `button--${size}`, className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName(variant, size, className)}
      type={type}
      {...props}
    />
  );
}

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  className,
  href,
  size = "default",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClassName(variant, size, className)}
      href={href}
      {...props}
    />
  );
}
