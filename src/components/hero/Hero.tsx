"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { waLink } from "@/lib/utils";

export function Hero() {
  const { t, isTa } = useLang();
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-4 pb-20 pt-24 text-center sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
        <div className="grid w-full min-w-0 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <img
            src={SITE.images.elephantLeft}
            alt=""
            className="pointer-events-none mx-auto hidden max-h-[40vh] w-auto max-w-full drop-shadow-[0_20px_40px_rgba(212,176,106,0.35)] lg:block xl:max-h-[52vh]"
          />
          <div className="relative mx-auto min-w-0 w-full max-w-2xl">
            <div className="relative mx-auto h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80">
              <img
                src={SITE.images.zodiac}
                alt=""
                className="spin-slow pointer-events-none absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute inset-[31%] z-10 flex items-center justify-center">
                <img src={SITE.images.om} alt="ஓம்" className="h-[78%] w-[78%] object-contain" />
              </div>
            </div>
            <div className="mt-5 space-y-2 sm:mt-6">
              <h1 className="tamil-serif gold-text text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl">{SITE.nameTa}</h1>
              <p className="font-display text-[11px] tracking-[0.16em] text-cyan sm:text-sm lg:text-base">{SITE.nameEn}</p>
              <p className="tamil-serif text-base text-ivory sm:text-xl lg:text-2xl">{isTa ? SITE.astrologerTa : SITE.astrologerEn}</p>
              <p className="text-[11px] text-ivory/70 sm:text-sm">{SITE.qualifications}</p>
              <p className="mx-auto max-w-xl pt-2 text-sm text-ivory/85 sm:text-lg">
                {isTa ? SITE.headlineTa : SITE.headlineEn}
              </p>
            </div>
          </div>
          <img
            src={SITE.images.elephantRight}
            alt=""
            className="pointer-events-none mx-auto hidden max-h-[40vh] w-auto max-w-full drop-shadow-[0_20px_40px_rgba(212,176,106,0.35)] lg:block xl:max-h-[52vh]"
          />
        </div>
        <div className="mt-5 flex justify-center gap-6 sm:mt-4 sm:gap-8 lg:hidden">
          <img src={SITE.images.elephantLeft} alt="" className="h-16 w-16 object-contain sm:h-24 sm:w-24" />
          <img src={SITE.images.elephantRight} alt="" className="h-16 w-16 object-contain sm:h-24 sm:w-24" />
        </div>
        <div className="mt-6 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <GoldButton href="/consultation" className="w-full sm:w-auto">{t("book")}</GoldButton>
          <GoldButton href="/rasipalan" variant="ghost" className="w-full sm:w-auto">
            {t("rasipalanCta")}
          </GoldButton>
          <GoldButton href={waLink(SITE.whatsapp, isTa ? "வணக்கம். ஜோதிட ஆலோசனை வேண்டும்." : "Namaste. I would like an astrology consultation.")} variant="ghost" icon={<MessageCircle size={16} />} className="w-full sm:w-auto">
            {t("whatsapp")}
          </GoldButton>
        </div>
        <a href="#intro" className="focus-ring mt-8 hidden flex-col items-center text-xs text-ivory/60 sm:mt-10 sm:flex">
          <span>{t("scroll")}</span>
          <ChevronDown className="float-y mt-1" size={18} />
        </a>
      </div>
    </section>
  );
}
