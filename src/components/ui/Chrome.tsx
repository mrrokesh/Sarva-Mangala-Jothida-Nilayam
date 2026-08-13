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
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "gold" | "ghost";
}) {
  const cls = cn(
    "focus-ring inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition",
    variant === "gold" ? "gold-btn" : "ghost-btn",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
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
    <section id={id} className={cn("relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title) && (
        <header className="mb-10 text-center">
          {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>}
          {title && <h2 className="tamil-serif gold-text text-3xl sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm text-ivory/75 sm:text-base">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
