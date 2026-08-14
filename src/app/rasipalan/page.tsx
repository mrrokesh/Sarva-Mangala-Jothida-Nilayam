"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Chrome";
import { RasiWheel } from "@/components/astro/RasiWheel";
import { NakshatraMap } from "@/components/astro/NakshatraMap";
import { RASIS, type Rasi } from "@/lib/rasis";
import { NAKSHATRAS } from "@/lib/nakshatras";
import { useLang } from "@/context/LanguageContext";
import { PERIODS, type RasipalanEntry, type PeriodType, type LiveRasipalan } from "@/lib/rasipalan";
import { PanchangamCard } from "@/components/astro/PanchangamCard";

const TABS = [
  { id: "panchangam", ta: "பஞ்சாங்கம்", en: "Panchangam" },
  { id: "reading", ta: "ராசிபலன்", en: "Rasipalan" },
  { id: "rasis", ta: "12 ராசிகள்", en: "12 Rasis" },
  { id: "nakshatras", ta: "27 நட்சத்திரங்கள்", en: "27 Nakshatras" },
] as const;

function periodLabel(p: PeriodType, t: (k: "today" | "weekly" | "monthly" | "yearly") => string) {
  if (p === "daily") return t("today");
  if (p === "weekly") return t("weekly");
  if (p === "monthly") return t("monthly");
  return t("yearly");
}

export default function RasipalanPage() {
  const { isTa, t } = useLang();
  const [rasi, setRasi] = useState("mesham");
  const [period, setPeriod] = useState<PeriodType>("daily");
  const [live, setLive] = useState<LiveRasipalan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("rasi");
    if (q && RASIS.some((r) => r.id === q)) setRasi(q);
    const hash = window.location.hash.replace("#", "");
    if (RASIS.some((r) => r.id === hash)) setRasi(hash);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetch(`/api/rasipalan?rasi=${encodeURIComponent(rasi)}&period=${period}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((j: LiveRasipalan) => {
        if (!ac.signal.aborted) setLive(j);
      })
      .catch(() => {
        if (!ac.signal.aborted) setLive(null);
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });
    return () => ac.abort();
  }, [rasi, period]);

  function pickRasi(next: Rasi | string, scrollToReading = true) {
    const id = typeof next === "string" ? next : next.id;
    setRasi(id);
    if (scrollToReading) {
      document.getElementById("reading")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const entry = live?.entry as RasipalanEntry | undefined;
  const rasiMeta = useMemo(() => RASIS.find((r) => r.id === rasi), [rasi]);
  const relatedStars = useMemo(() => NAKSHATRAS.filter((n) => n.rasi === rasi), [rasi]);
  const readingTitle =
    period === "daily"
      ? isTa
        ? "இன்றைய ராசிபலன்"
        : "Today’s Rasipalan"
      : periodLabel(period, t);

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
    <div className="pt-24 sm:pt-28">
      <nav className="sticky top-16 z-30 mx-auto mb-4 flex max-w-3xl gap-2 overflow-x-auto px-4 pb-1 sm:top-20 sm:flex-wrap sm:justify-center" aria-label={isTa ? "ராசி பிரிவுகள்" : "Rasi sections"}>
        {TABS.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className="focus-ring shrink-0 rounded-full border border-gold/40 bg-ink/80 px-4 py-1.5 text-xs text-gold-bright backdrop-blur hover:bg-gold hover:text-ink"
          >
            {isTa ? tab.ta : tab.en}
          </a>
        ))}
      </nav>

      <Section id="panchangam" title={t("panchangam")} subtitle={isTa ? "சேலம் நேரம் · திதி, நட்சத்திரம், ராகு காலம்" : "Salem time · tithi, nakshatra, rahu kalam"}>
        <PanchangamCard />
      </Section>

      <Section id="reading" title={readingTitle} subtitle={t("selectRasi")}>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          {live && (
            <span className={`rounded-full px-3 py-1 ${live.live ? "bg-cyan/20 text-cyan" : "bg-ivory/10 text-ivory/60"}`}>
              {live.live ? t("live") : isTa ? "காப்பு நகல்" : "Offline copy"}
              {live.date ? ` · ${live.date}` : ""}
            </span>
          )}
          <span className="text-ivory/50">{t("liveUpdated")}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {RASIS.map((r) => (
            <button
              key={r.id}
              onClick={() => pickRasi(r, false)}
              className={`focus-ring rounded-full border px-3 py-1 text-sm ${rasi === r.id ? "border-gold bg-gold text-ink" : "border-gold/30 text-ivory/80"}`}
            >
              {isTa ? r.ta : r.latin}
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`focus-ring rounded-full px-4 py-1 text-sm ${period === p ? "bg-cyan text-ink" : "text-cyan"}`}
            >
              {periodLabel(p, t)}
            </button>
          ))}
        </div>
        {rasiMeta && (
          <p className="mt-6 text-center tamil-serif text-2xl text-gold-bright">
            {rasiMeta.symbol} {isTa ? rasiMeta.ta : rasiMeta.latin}
          </p>
        )}
        <div className="mx-auto mt-6 grid max-w-3xl gap-3">
          {loading && (
            <p className="py-8 text-center text-sm text-ivory/60" aria-live="polite">
              {t("liveLoading")}
            </p>
          )}
          {!loading &&
            entry &&
            fields.map((f) => (
              <article key={f.key} className="card-metal rounded-2xl p-4">
                <h3 className="text-xs uppercase tracking-widest text-cyan">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed">{isTa ? entry[f.key].ta : entry[f.key].en}</p>
              </article>
            ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-ivory/55">{t("disclaimer")}</p>
      </Section>

      <Section id="rasis" title={isTa ? "12 ராசிகள்" : "The Twelve Zodiac Signs"} subtitle={t("selectRasi")}>
        <RasiWheel
          onSelect={(next) => pickRasi(next)}
          selectedId={rasi}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RASIS.map((r) => (
            <article id={r.id} key={r.id} className={`card-metal rounded-2xl p-5 ${rasi === r.id ? "ring-1 ring-gold" : ""}`}>
              <p className="text-2xl">{r.symbol}</p>
              <h2 className="tamil-serif mt-2 text-lg text-gold-bright sm:text-xl">
                {r.ta} · {r.en} · {r.latin}
              </h2>
              <p className="mt-2 text-xs text-ivory/60">
                {t("element")}: {isTa ? r.elementTa : r.elementEn} · {t("planet")}: {isTa ? r.planetTa : r.planetEn}
              </p>
              <p className="mt-3 text-sm">{isTa ? r.traitsTa : r.traitsEn}</p>
              <button className="mt-3 text-sm text-cyan" onClick={() => pickRasi(r)}>
                {t("today")} / {t("weekly")} / {t("monthly")} / {t("yearly")}
              </button>
            </article>
          ))}
        </div>
      </Section>

      <Section id="nakshatras" title={isTa ? "27 நட்சத்திரங்கள்" : "27 Nakshatras"}>
        {rasiMeta && (
          <p className="mb-6 text-center text-sm text-ivory/70">
            {isTa ? `${rasiMeta.ta} ராசியின் நட்சத்திரங்கள்` : `Nakshatras of ${rasiMeta.latin}`}:{" "}
            {relatedStars.map((n) => (isTa ? n.ta : n.en)).join(" · ")}
          </p>
        )}
        <NakshatraMap highlightRasi={rasi} />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NAKSHATRAS.map((n, i) => (
            <article
              key={n.id}
              className={`card-metal rounded-2xl p-4 text-sm ${n.rasi === rasi ? "ring-1 ring-gold" : ""}`}
            >
              <p className="text-cyan">{i + 1}</p>
              <h2 className="tamil-serif text-lg text-gold-bright">
                {n.ta} · {n.en}
              </h2>
              <p className="mt-1 text-ivory/70">{isTa ? n.symbolTa : n.symbolEn}</p>
              <p className="mt-2 text-xs">
                {t("planet")}: {isTa ? n.planetTa : n.planetEn}
              </p>
              <p className="text-xs">
                {t("deity")}: {isTa ? n.deityTa : n.deityEn}
              </p>
              <p className="text-xs">
                {t("rasiLink")}: {isTa ? RASIS.find((r) => r.id === n.rasi)?.ta : RASIS.find((r) => r.id === n.rasi)?.latin}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
