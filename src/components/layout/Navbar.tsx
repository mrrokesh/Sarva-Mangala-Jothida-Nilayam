"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { isNavActive } from "@/lib/utils";

export function Navbar() {
  const { lang, setLang, isTa } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-2 z-50 px-2 sm:top-3 sm:px-3">
      <nav className="glass-nav mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-4" aria-label="Primary">
        <Link href="/" className="focus-ring min-w-0 flex-1 rounded-full sm:flex-none">
          <span className="tamil-serif block truncate text-xs text-gold-bright sm:text-sm lg:text-base">{SITE.nameTa}</span>
        </Link>
        <div className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring whitespace-nowrap rounded-full px-2 py-1 text-[11px] xl:px-2.5 xl:text-xs ${
                  active ? "bg-gold text-ink" : "text-ivory/80 hover:text-gold-bright"
                }`}
              >
                {isTa ? item.ta : item.en}
              </Link>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex overflow-hidden rounded-full border border-gold/40 text-[10px] sm:text-[11px]">
            <button
              className={`focus-ring px-1.5 py-1 sm:px-2 ${lang === "ta" ? "bg-gold text-ink" : "text-ivory/80"}`}
              onClick={() => setLang("ta")}
              aria-pressed={lang === "ta"}
            >
              தமிழ்
            </button>
            <button
              className={`focus-ring px-1.5 py-1 sm:px-2 ${lang === "en" ? "bg-gold text-ink" : "text-ivory/80"}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          <button className="focus-ring rounded-full p-2 xl:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass-nav mx-auto mt-2 max-w-7xl rounded-3xl p-3 sm:p-4 xl:hidden">
          <div className="grid grid-cols-1 gap-1 min-[480px]:grid-cols-2">
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring rounded-xl px-3 py-2.5 text-sm ${
                    active ? "bg-gold text-ink" : "text-ivory/90 hover:bg-gold/10"
                  }`}
                >
                  {isTa ? item.ta : item.en}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
