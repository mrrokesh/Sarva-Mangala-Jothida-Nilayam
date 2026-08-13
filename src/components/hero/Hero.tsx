"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { Starfield } from "@/components/experience/Starfield";
import { waLink } from "@/lib/utils";

const CosmosCanvas = dynamic(() => import("@/components/experience/CosmosCanvas").then((m) => m.CosmosCanvas), {
  ssr: false,
});

export function Hero() {
  const { t, isTa } = useLang();
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <img src={SITE.images.sky} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-royal-night/50 to-ink" />
      <Starfield density={120} />
      <CosmosCanvas />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
        <div className="grid w-full items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
          <img
            src={SITE.images.elephantLeft}
            alt=""
            className="pointer-events-none mx-auto hidden max-h-[52vh] w-auto drop-shadow-[0_20px_40px_rgba(212,175,55,0.25)] md:block"
          />
          <div className="relative mx-auto">
            <div className="relative mx-auto h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <img src={SITE.images.zodiac} alt="" className="spin-slow absolute inset-0 h-full w-full object-contain" />
              <div className="absolute inset-[18%] overflow-hidden rounded-full border-2 border-gold/70 shadow-gold">
                <img src={SITE.images.banner} alt={SITE.astrologerEn} className="h-full w-full object-cover object-[20%_center]" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <h1 className="tamil-serif gold-text text-3xl leading-tight sm:text-5xl">{SITE.nameTa}</h1>
              <p className="font-display text-sm tracking-[0.18em] text-cyan sm:text-base">{SITE.nameEn}</p>
              <p className="tamil-serif text-lg text-ivory sm:text-2xl">{isTa ? SITE.astrologerTa : SITE.astrologerEn}</p>
              <p className="text-xs text-ivory/70 sm:text-sm">{SITE.qualifications}</p>
              <p className="mx-auto max-w-xl pt-2 text-sm text-ivory/85 sm:text-lg">
                {isTa ? SITE.headlineTa : SITE.headlineEn}
              </p>
            </div>
          </div>
          <img
            src={SITE.images.elephantRight}
            alt=""
            className="pointer-events-none mx-auto hidden max-h-[52vh] w-auto drop-shadow-[0_20px_40px_rgba(212,175,55,0.25)] md:block"
          />
        </div>
        <div className="mt-4 flex justify-center gap-8 md:hidden">
          <img src={SITE.images.elephantLeft} alt="" className="h-24 w-24 object-contain" />
          <img src={SITE.images.elephantRight} alt="" className="h-24 w-24 object-contain" />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GoldButton href="/consultation">{t("book")}</GoldButton>
          <GoldButton href="/rasipalan" variant="ghost">
            {t("rasipalanCta")}
          </GoldButton>
          <GoldButton href={waLink(SITE.whatsapp, isTa ? "வணக்கம். ஜோதிட ஆலோசனை வேண்டும்." : "Namaste. I would like an astrology consultation.")} variant="ghost">
            {t("whatsapp")}
          </GoldButton>
        </div>
        <a href="#intro" className="focus-ring mt-10 flex flex-col items-center text-xs text-ivory/60">
          <span>{t("scroll")}</span>
          <ChevronDown className="float-y mt-1" size={18} />
        </a>
      </div>
    </section>
  );
}
