"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Chrome";
import { RasiWheel } from "@/components/astro/RasiWheel";
import { RASIS, type Rasi } from "@/lib/rasis";
import { useLang } from "@/context/LanguageContext";

export default function RasisPage() {
  const { isTa, t } = useLang();
  const [open, setOpen] = useState<Rasi | null>(null);
  return (
    <div className="pt-28">
      <Section title={isTa ? "12 ராசிகள்" : "The Twelve Zodiac Signs"}>
        <RasiWheel onSelect={setOpen} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RASIS.map((r) => (
            <article id={r.id} key={r.id} className="card-metal rounded-2xl p-5">
              <p className="text-2xl">{r.symbol}</p>
              <h2 className="tamil-serif mt-2 text-xl text-gold-bright">
                {r.ta} · {r.en} · {r.latin}
              </h2>
              <p className="mt-2 text-xs text-ivory/60">
                {t("element")}: {isTa ? r.elementTa : r.elementEn} · {t("planet")}: {isTa ? r.planetTa : r.planetEn}
              </p>
              <p className="mt-3 text-sm">{isTa ? r.traitsTa : r.traitsEn}</p>
              <button className="mt-3 text-sm text-cyan" onClick={() => setOpen(r)}>
                {t("today")} / {t("weekly")} / {t("monthly")}
              </button>
            </article>
          ))}
        </div>
      </Section>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-ink/70" aria-label={t("close")} onClick={() => setOpen(null)} />
          <div className="card-metal relative max-w-lg rounded-3xl p-6">
            <h3 className="tamil-serif text-2xl text-gold-bright">{isTa ? open.ta : open.latin}</h3>
            <p className="mt-3 text-sm">{isTa ? open.traitsTa : open.traitsEn}</p>
            <p className="mt-4 text-xs text-ivory/60">{t("guidance")}. {isTa ? "முழு ராசிபலன் பக்கத்தைப் பாருங்கள்." : "See the Rasipalan page for period readings."}</p>
            <a href={`/rasipalan?rasi=${open.id}`} className="mt-4 inline-block text-cyan underline">{t("rasipalanCta")}</a>
          </div>
        </div>
      )}
    </div>
  );
}
