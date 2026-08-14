"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import type { Panchangam } from "@/lib/panchangam";

export function PanchangamCard({ compact = false }: { compact?: boolean }) {
  const { isTa, t } = useLang();
  const [data, setData] = useState<Panchangam | null>(null);

  useEffect(() => {
    fetch("/api/panchangam")
      .then((r) => r.json())
      .then((j: Panchangam) => setData(j))
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <p className="py-6 text-center text-sm text-ivory/60" aria-live="polite">
        {t("panchangLoading")}
      </p>
    );
  }

  const rows = [
    { id: "vara", label: t("vara"), value: isTa ? data.vara.ta : data.vara.en },
    { id: "tithi", label: t("tithi"), value: `${isTa ? data.tithi.paksha.ta : data.tithi.paksha.en} · ${isTa ? data.tithi.ta : data.tithi.en}` },
    { id: "nakshatraToday", label: t("nakshatraToday"), value: `${isTa ? data.nakshatra.ta : data.nakshatra.en} (${t("pada")} ${data.nakshatra.pada})` },
    { id: "yoga", label: t("yoga"), value: isTa ? data.yoga.ta : data.yoga.en },
    { id: "karana", label: t("karana"), value: isTa ? data.karana.ta : data.karana.en },
    { id: "moonRasi", label: t("moonRasi"), value: isTa ? data.moonRasi.ta : data.moonRasi.en },
    { id: "sunrise", label: t("sunrise"), value: data.sunrise },
    { id: "sunset", label: t("sunset"), value: data.sunset },
    { id: "rahuKalam", label: t("rahuKalam"), value: `${data.rahuKalam.start} – ${data.rahuKalam.end}` },
    { id: "yamagandam", label: t("yamagandam"), value: `${data.yamagandam.start} – ${data.yamagandam.end}` },
    { id: "gulikai", label: t("gulikai"), value: `${data.gulikai.start} – ${data.gulikai.end}` },
  ];
  const shown = compact ? rows.filter((r) => ["vara", "tithi", "nakshatraToday", "rahuKalam"].includes(r.id)) : rows;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-4 text-center text-xs text-ivory/55">
        {isTa ? data.place.ta : data.place.en} · {data.date} · {t("liveUpdated")}
      </p>
      <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {shown.map((row) => (
          <article key={row.label} className="card-metal rounded-2xl p-4">
            <h3 className="text-xs uppercase tracking-widest text-cyan">{row.label}</h3>
            <p className="mt-2 text-sm leading-relaxed">{row.value}</p>
          </article>
        ))}
      </div>
      {!compact && <p className="mt-6 text-center text-xs text-ivory/50">{t("panchangNote")}</p>}
    </div>
  );
}
