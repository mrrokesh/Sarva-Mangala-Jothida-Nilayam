"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = window.setTimeout(() => setFade(true), reduced ? 400 : 1800);
    const t2 = window.setTimeout(() => setVisible(false), reduced ? 700 : 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${fade ? "opacity-0" : "opacity-100"}`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-44 w-44 items-center justify-center">
        <img src={SITE.images.zodiac} alt="" className="spin-slow absolute inset-0 h-full w-full object-contain opacity-90" />
        <span className="tamil-serif gold-text relative text-6xl">ஓம்</span>
      </div>
      <p className="tamil-serif mt-8 text-center text-lg text-gold-bright sm:text-2xl">{SITE.nameTa}</p>
      <p className="mt-1 font-display text-xs tracking-[0.25em] text-ivory/60">{SITE.nameEn}</p>
    </div>
  );
}
