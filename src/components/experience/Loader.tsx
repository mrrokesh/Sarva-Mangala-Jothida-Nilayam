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
      <div className="relative h-56 w-56 sm:h-72 sm:w-72">
        <img src={SITE.images.zodiac} alt="" className="spin-slow pointer-events-none absolute inset-0 h-full w-full object-contain" />
        <div className="absolute inset-[31%] z-10 flex items-center justify-center">
          <img src={SITE.images.om} alt="ஓம்" className="h-[78%] w-[78%] object-contain" />
        </div>
      </div>
      <p className="tamil-serif mt-8 px-4 text-center text-base text-gold-bright sm:text-2xl">{SITE.nameTa}</p>
      <p className="mt-1 font-display text-xs tracking-[0.25em] text-ivory/60">{SITE.nameEn}</p>
    </div>
  );
}
