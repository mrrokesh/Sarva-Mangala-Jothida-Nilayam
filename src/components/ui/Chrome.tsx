"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function GoldButton({
  href,
  children,
  onClick,
  className,
  type = "button",
  variant = "gold",
  icon,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "gold" | "ghost";
  icon?: React.ReactNode;
}) {
  const cls = cn(
    "focus-ring inline-flex max-w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-xs font-semibold tracking-wide transition sm:px-5 sm:text-sm",
    variant === "gold" ? "gold-btn" : "ghost-btn",
    className,
  );
  const inner = (
    <>
      {icon}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-7xl scroll-mt-28 px-4 py-10 sm:scroll-mt-32 sm:px-6 sm:py-14 lg:px-8 lg:py-16", className)}>
      {(eyebrow || title) && (
        <header className="mb-8 text-center sm:mb-10">
          {eyebrow && <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-cyan sm:text-xs">{eyebrow}</p>}
          {title && <h2 className="tamil-serif gold-text text-2xl break-words sm:text-3xl lg:text-4xl">{title}</h2>}
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm text-ivory/75 sm:text-base">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
