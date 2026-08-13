"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, setLang, isTa } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-3">
      <nav className="glass-nav mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2" aria-label="Primary">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-full">
          <span className="tamil-serif text-sm text-gold-bright sm:text-base">{SITE.nameTa}</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.slice(0, 8).map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-full px-2.5 py-1 text-xs text-ivory/80 hover:text-gold-bright">
              {isTa ? item.ta : item.en}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-full border border-gold/40 text-[11px]">
            <button
              className={`focus-ring px-2 py-1 ${lang === "ta" ? "bg-gold text-ink" : "text-ivory/80"}`}
              onClick={() => setLang("ta")}
              aria-pressed={lang === "ta"}
            >
              தமிழ்
            </button>
            <button
              className={`focus-ring px-2 py-1 ${lang === "en" ? "bg-gold text-ink" : "text-ivory/80"}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          <button className="focus-ring rounded-full p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass-nav mx-auto mt-2 max-w-7xl rounded-3xl p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="focus-ring rounded-xl px-3 py-2 text-sm text-ivory/90 hover:bg-white/5">
                {isTa ? item.ta : item.en}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
