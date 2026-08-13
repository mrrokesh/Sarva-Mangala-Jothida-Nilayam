"use client";

import { useState } from "react";
import { RASIS, type Rasi } from "@/lib/rasis";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { SITE } from "@/lib/site";

export function RasiWheel({
  onSelect,
  compact,
}: {
  onSelect?: (rasi: Rasi) => void;
  compact?: boolean;
}) {
  const { isTa, t } = useLang();
  const [active, setActive] = useState<Rasi | null>(null);
  const size = compact ? 320 : 420;

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
      <div className="relative" style={{ width: size, height: size }}>
        <img src={SITE.images.zodiac} alt="" className="absolute inset-0 h-full w-full object-contain opacity-80" />
        {RASIS.map((rasi, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r = size * 0.38;
          const x = size / 2 + Math.cos(angle) * r;
          const y = size / 2 + Math.sin(angle) * r;
          return (
            <button
              key={rasi.id}
              className="focus-ring absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-ink/80 text-lg text-gold-bright shadow-gold transition hover:scale-110 hover:bg-gold hover:text-ink"
              style={{ left: x, top: y }}
              onClick={() => {
                setActive(rasi);
                onSelect?.(rasi);
              }}
              aria-label={`${rasi.ta} ${rasi.latin}`}
            >
              <span aria-hidden>{rasi.symbol}</span>
            </button>
          );
        })}
      </div>
      <div className="card-metal max-w-md flex-1 rounded-3xl p-6">
        {active ? (
          <>
            <p className="text-3xl">{active.symbol}</p>
            <h3 className="tamil-serif mt-2 text-2xl text-gold-bright">
              {isTa ? active.ta : active.en} · {active.latin}
            </h3>
            <p className="mt-2 text-sm text-ivory/70">
              {t("element")}: {isTa ? active.elementTa : active.elementEn} · {t("planet")}: {isTa ? active.planetTa : active.planetEn}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{isTa ? active.traitsTa : active.traitsEn}</p>
            <div className="mt-4">
              <GoldButton href={`/rasis#${active.id}`}>{isTa ? "விவரம்" : "Details"}</GoldButton>
            </div>
          </>
        ) : (
          <p className="text-sm text-ivory/70">{t("selectRasi")}</p>
        )}
      </div>
    </div>
  );
}
