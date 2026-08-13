"use client";

import { Phone, MessageCircle } from "lucide-react";
import { SITE, MOBILE_DOCK } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { telLink, waLink } from "@/lib/utils";
import Link from "next/link";

export function FloatingActions() {
  const { t, isTa } = useLang();
  const msg = isTa ? "வணக்கம். ஜோதிட ஆலோசனை வேண்டும்." : "Namaste. I would like an astrology consultation.";
  return (
    <>
      <div className="fixed bottom-20 right-3 z-40 flex flex-col gap-2 md:bottom-6">
        <a href={telLink(SITE.phones[0])} className="focus-ring flex h-12 w-12 items-center justify-center rounded-full bg-royal text-ivory shadow-glass" aria-label={t("call")}>
          <Phone size={18} />
        </a>
        <a href={waLink(SITE.whatsapp, msg)} className="focus-ring flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glass" aria-label={t("whatsapp")}>
          <MessageCircle size={18} />
        </a>
        <Link href="/consultation" className="gold-btn focus-ring hidden h-12 items-center rounded-full px-4 text-xs md:flex">
          {t("book")}
        </Link>
        <a href={SITE.vibeoPlayStore} target="_blank" rel="noreferrer" className="focus-ring flex h-12 items-center justify-center rounded-full border border-cyan/50 bg-ink/80 px-3 text-[10px] font-semibold text-cyan" aria-label="Vibeo">
          Vibeo
        </a>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-gold/30 bg-ink/90 py-2 backdrop-blur md:hidden" aria-label="Mobile">
        {MOBILE_DOCK.map((item) => (
          <Link key={item.href} href={item.href} className="focus-ring text-center text-[10px] text-ivory/80">
            {isTa ? item.ta : item.en}
          </Link>
        ))}
      </nav>
    </>
  );
}
