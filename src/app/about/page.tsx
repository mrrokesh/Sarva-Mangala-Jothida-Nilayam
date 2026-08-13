"use client";

import { Section } from "@/components/ui/Chrome";
import { TIMELINE, AWARDS } from "@/lib/awards";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";

export default function AboutPage() {
  const { isTa, t } = useLang();
  return (
    <div className="pt-28">
      <Section title={isTa ? SITE.astrologerTa : SITE.astrologerEn} subtitle={SITE.qualifications}>
        <div className="grid gap-8 md:grid-cols-2">
          <img src={SITE.images.banner} alt={SITE.astrologerEn} className="rounded-3xl border border-gold/30" />
          <div className="space-y-4 text-sm leading-relaxed text-ivory/80">
            <p>{t("welcomeIntro")}</p>
            <p>{t("aboutLead")}</p>
            <p className="text-ivory/60">{t("awardsNote")}</p>
          </div>
        </div>
        <ol className="relative mt-12 space-y-6 border-l border-gold/30 pl-6">
          {TIMELINE.map((item) => (
            <li key={item.year}>
              <span className="absolute -left-2 mt-1 h-3 w-3 rounded-full bg-gold" />
              <p className="text-cyan">{item.year}</p>
              <p className="mt-1">{isTa ? item.ta : item.en}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a) => (
            <figure key={a.id} className="card-metal overflow-hidden rounded-2xl">
              <img src={a.image} alt={isTa ? a.titleTa : a.titleEn} className="h-48 w-full object-cover" />
              <figcaption className="p-4 text-sm">
                <p className="text-gold-bright">{isTa ? a.titleTa : a.titleEn}</p>
                <p className="mt-1 text-ivory/60">{a.year} · {a.place}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
