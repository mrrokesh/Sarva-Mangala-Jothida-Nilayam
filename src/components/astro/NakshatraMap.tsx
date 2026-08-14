"use client";

import { useMemo, useState } from "react";
import { NAKSHATRAS, type Nakshatra } from "@/lib/nakshatras";
import { RASIS } from "@/lib/rasis";
import { useLang } from "@/context/LanguageContext";

export function NakshatraMap({ highlightRasi }: { highlightRasi?: string }) {
  const { isTa, t } = useLang();
  const [active, setActive] = useState<Nakshatra | null>(null);
  const points = useMemo(
    () =>
      NAKSHATRAS.map((n, i) => {
        const angle = (i / 27) * Math.PI * 2 - Math.PI / 2;
        const ring = i % 3 === 0 ? 0.42 : i % 3 === 1 ? 0.32 : 0.22;
        return { n, x: 50 + Math.cos(angle) * ring * 100, y: 50 + Math.sin(angle) * ring * 100 };
      }),
    [],
  );

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border border-gold/30 bg-royal-night/80 lg:max-w-none">
        <div className="absolute inset-8 rounded-full border border-gold/20" />
        <div className="absolute inset-16 rounded-full border border-cyan/20" />
        {points.map(({ n, x, y }) => (
          <button
            key={n.id}
            className={`focus-ring absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-gold hover:h-4 hover:w-4 ${
              highlightRasi && n.rasi === highlightRasi ? "h-4 w-4 bg-gold" : "h-3 w-3 bg-gold-bright"
            } ${highlightRasi && n.rasi !== highlightRasi ? "opacity-40" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => setActive(n)}
            aria-label={isTa ? n.ta : n.en}
            title={isTa ? n.ta : n.en}
          />
        ))}
      </div>
      <div className="card-metal rounded-3xl p-4 sm:p-6">
        {active ? (
          <>
            <h3 className="tamil-serif text-2xl text-gold-bright">{isTa ? active.ta : active.en}</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-ivory/50">{isTa ? "சின்னம்" : "Symbol"}</dt>
                <dd>{isTa ? active.symbolTa : active.symbolEn}</dd>
              </div>
              <div>
                <dt className="text-ivory/50">{t("planet")}</dt>
                <dd>{isTa ? active.planetTa : active.planetEn}</dd>
              </div>
              <div>
                <dt className="text-ivory/50">{t("deity")}</dt>
                <dd>{isTa ? active.deityTa : active.deityEn}</dd>
              </div>
              <div>
                <dt className="text-ivory/50">{t("rasiLink")}</dt>
                <dd>{isTa ? RASIS.find((r) => r.id === active.rasi)?.ta : RASIS.find((r) => r.id === active.rasi)?.latin}</dd>
              </div>
              <div>
                <dt className="text-ivory/50">{t("qualities")}</dt>
                <dd>{isTa ? active.qualitiesTa : active.qualitiesEn}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="text-sm text-ivory/70">{isTa ? "ஒரு நட்சத்திரத்தைத் தேர்ந்தெடுங்கள்." : "Select a nakshatra."}</p>
        )}
      </div>
    </div>
  );
}
