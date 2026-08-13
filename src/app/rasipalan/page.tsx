"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Chrome";
import { RASIS } from "@/lib/rasis";
import { useLang } from "@/context/LanguageContext";
import type { RasipalanEntry, PeriodType } from "@/lib/rasipalan";

export default function RasipalanPage() {
  const { isTa, t } = useLang();
  const [rasi, setRasi] = useState("mesham");
  const [period, setPeriod] = useState<PeriodType>("daily");
  const [data, setData] = useState<Record<string, Record<PeriodType, RasipalanEntry>> | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("rasi");
    if (q && RASIS.some((r) => r.id === q)) setRasi(q);
    fetch("/api/content")
      .then((r) => r.json())
      .then((j) => setData(j.rasipalan))
      .catch(() => setData(null));
  }, []);

  const entry = data?.[rasi]?.[period];
  const rasiMeta = useMemo(() => RASIS.find((r) => r.id === rasi), [rasi]);

  const fields: { key: keyof RasipalanEntry; label: string }[] = [
    { key: "general", label: t("general") },
    { key: "career", label: t("career") },
    { key: "finance", label: t("finance") },
    { key: "family", label: t("family") },
    { key: "marriage", label: t("marriage") },
    { key: "health", label: t("health") },
    { key: "luckyColor", label: t("luckyColor") },
    { key: "luckyNumber", label: t("luckyNumber") },
    { key: "auspiciousTime", label: t("muhurtham") },
  ];

  return (
    <div className="pt-28">
      <Section title={isTa ? "இன்றைய ராசிபலன்" : "Today’s Rasipalan"} subtitle={t("selectRasi")}>
        <div className="flex flex-wrap justify-center gap-2">
          {RASIS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRasi(r.id)}
              className={`focus-ring rounded-full border px-3 py-1 text-sm ${rasi === r.id ? "border-gold bg-gold text-ink" : "border-gold/30 text-ivory/80"}`}
            >
              {isTa ? r.ta : r.latin}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {(["daily", "weekly", "monthly"] as PeriodType[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`focus-ring rounded-full px-4 py-1 text-sm ${period === p ? "bg-cyan text-ink" : "text-cyan"}`}
            >
              {p === "daily" ? t("today") : p === "weekly" ? t("weekly") : t("monthly")}
            </button>
          ))}
        </div>
        {rasiMeta && (
          <p className="mt-6 text-center tamil-serif text-2xl text-gold-bright">
            {rasiMeta.symbol} {isTa ? rasiMeta.ta : rasiMeta.latin}
          </p>
        )}
        <div className="mx-auto mt-6 grid max-w-3xl gap-3">
          {entry &&
            fields.map((f) => (
              <article key={f.key} className="card-metal rounded-2xl p-4">
                <h3 className="text-xs uppercase tracking-widest text-cyan">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed">{isTa ? entry[f.key].ta : entry[f.key].en}</p>
              </article>
            ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-ivory/55">{t("disclaimer")}</p>
      </Section>
    </div>
  );
}
