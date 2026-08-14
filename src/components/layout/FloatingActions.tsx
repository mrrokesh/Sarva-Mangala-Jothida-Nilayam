"use client";

import { Phone, MessageCircle } from "lucide-react";
import { SITE, MOBILE_DOCK } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { telLink, waLink, isNavActive } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingActions() {
  const { t, isTa } = useLang();
  const pathname = usePathname();
  const msg = isTa ? "வணக்கம். ஜோதிட ஆலோசனை வேண்டும்." : "Namaste. I would like an astrology consultation.";
  return (
    <>
      <div className="fixed bottom-[4.75rem] right-3 z-40 flex flex-col gap-2 sm:bottom-24 md:bottom-6">
        <a href={telLink(SITE.phones[0])} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-royal text-white shadow-glass sm:h-12 sm:w-12" aria-label={t("call")}>
          <Phone size={18} />
        </a>
        <a href={waLink(SITE.whatsapp, msg)} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glass sm:h-12 sm:w-12" aria-label={t("whatsapp")}>
          <MessageCircle size={18} />
        </a>
        <Link href="/consultation" className="gold-btn focus-ring hidden h-12 items-center rounded-full px-4 text-xs md:flex">
          {t("book")}
        </Link>
        <a href={SITE.vibeoPlayStore} target="_blank" rel="noreferrer" className="focus-ring hidden h-12 items-center justify-center rounded-full border border-cyan/50 bg-ink/80 px-3 text-[10px] font-semibold text-cyan sm:flex" aria-label="Vibeo">
          Vibeo
        </a>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-gold/30 bg-ink/90 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden" aria-label="Mobile">
        {MOBILE_DOCK.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`focus-ring px-1 py-1 text-center text-[10px] leading-tight sm:text-[11px] ${active ? "font-semibold text-gold-bright" : "text-ivory/80"}`}
            >
              {isTa ? item.ta : item.en}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
