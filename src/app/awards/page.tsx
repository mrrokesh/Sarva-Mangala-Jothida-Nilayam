"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Chrome";
import { AWARDS } from "@/lib/awards";
import { useLang } from "@/context/LanguageContext";

export default function AwardsPage() {
  const { isTa, t } = useLang();
  const [id, setId] = useState<string | null>(null);
  const active = AWARDS.find((a) => a.id === id);
  return (
    <div className="pt-28">
      <Section title={isTa ? "விருதுகள்" : "Awards & Recognition"} subtitle={t("awardsNote")}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a) => (
            <button key={a.id} onClick={() => setId(a.id)} className="card-metal focus-ring overflow-hidden rounded-3xl text-left">
              <div className="bg-gradient-to-b from-gold/20 to-transparent p-3">
                <img src={a.image} alt={isTa ? a.titleTa : a.titleEn} className="h-52 w-full rounded-2xl object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs text-cyan">{a.year} · {a.place}</p>
                <h2 className="mt-1 text-sm text-gold-bright">{isTa ? a.titleTa : a.titleEn}</h2>
              </div>
            </button>
          ))}
        </div>
      </Section>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-ink/80" aria-label={t("close")} onClick={() => setId(null)} />
          <article className="card-metal relative max-h-[90vh] max-w-2xl overflow-auto rounded-3xl p-4">
            <img src={active.image} alt="" className="w-full rounded-2xl" />
            <h3 className="mt-4 text-lg text-gold-bright">{isTa ? active.titleTa : active.titleEn}</h3>
            <p className="text-sm text-ivory/70">{isTa ? active.orgTa : active.orgEn}</p>
            <p className="mt-2 text-sm">{isTa ? active.noteTa : active.noteEn}</p>
          </article>
        </div>
      )}
    </div>
  );
}
