"use client";

import { Section } from "@/components/ui/Chrome";
import { NakshatraMap } from "@/components/astro/NakshatraMap";
import { NAKSHATRAS } from "@/lib/nakshatras";
import { RASIS } from "@/lib/rasis";
import { useLang } from "@/context/LanguageContext";

export default function NakshatrasPage() {
  const { isTa, t } = useLang();
  return (
    <div className="pt-28">
      <Section title={isTa ? "27 நட்சத்திரங்கள்" : "27 Nakshatras"}>
        <NakshatraMap />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NAKSHATRAS.map((n, i) => (
            <article key={n.id} className="card-metal rounded-2xl p-4 text-sm">
              <p className="text-cyan">{i + 1}</p>
              <h2 className="tamil-serif text-lg text-gold-bright">{n.ta} · {n.en}</h2>
              <p className="mt-1 text-ivory/70">{isTa ? n.symbolTa : n.symbolEn}</p>
              <p className="mt-2 text-xs">{t("planet")}: {isTa ? n.planetTa : n.planetEn}</p>
              <p className="text-xs">{t("deity")}: {isTa ? n.deityTa : n.deityEn}</p>
              <p className="text-xs">{t("rasiLink")}: {isTa ? RASIS.find((r) => r.id === n.rasi)?.ta : RASIS.find((r) => r.id === n.rasi)?.latin}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
