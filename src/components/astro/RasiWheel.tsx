"use client";

import { useState } from "react";
import { RASIS, type Rasi } from "@/lib/rasis";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { SITE } from "@/lib/site";

export function RasiWheel({
  onSelect,
  compact,
  selectedId,
  detailsHref = "/rasipalan#reading",
}: {
  onSelect?: (rasi: Rasi) => void;
  compact?: boolean;
  selectedId?: string;
  detailsHref?: string;
}) {
  const { isTa, t } = useLang();
  const [active, setActive] = useState<Rasi | null>(null);
  const current = active || RASIS.find((r) => r.id === selectedId) || null;

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
      <div className={`relative mx-auto aspect-square w-full min-w-0 ${compact ? "max-w-[320px]" : "max-w-[min(100%,420px)]"}`}>
        <img src={SITE.images.zodiac} alt="" className="absolute inset-0 h-full w-full object-contain opacity-80" />
        {RASIS.map((rasi, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r = 38;
          const x = 50 + Math.cos(angle) * r;
          const y = 50 + Math.sin(angle) * r;
          return (
            <button
              key={rasi.id}
              className={`focus-ring absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-sm shadow-gold transition hover:scale-110 hover:bg-gold hover:text-ink sm:h-10 sm:w-10 sm:text-base lg:h-12 lg:w-12 lg:text-lg ${
                (current?.id || selectedId) === rasi.id
                  ? "border-gold bg-gold text-ink"
                  : "border-gold/50 bg-ink/80 text-gold-bright"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
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
      <div className="card-metal w-full min-w-0 max-w-md flex-1 rounded-3xl p-4 sm:p-6">
        {current ? (
          <>
            <p className="text-3xl">{current.symbol}</p>
            <h3 className="tamil-serif mt-2 text-xl text-gold-bright sm:text-2xl">
              {isTa ? current.ta : current.en} · {current.latin}
            </h3>
            <p className="mt-2 text-sm text-ivory/70">
              {t("element")}: {isTa ? current.elementTa : current.elementEn} · {t("planet")}: {isTa ? current.planetTa : current.planetEn}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{isTa ? current.traitsTa : current.traitsEn}</p>
            <div className="mt-4">
              {onSelect ? (
                <GoldButton onClick={() => current && onSelect(current)}>
                  {isTa ? "ராசிபலன் பாருங்கள்" : "See Rasipalan"}
                </GoldButton>
              ) : (
                <GoldButton href={detailsHref}>{isTa ? "ராசிபலன்" : "Rasipalan"}</GoldButton>
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-ivory/70">{t("selectRasi")}</p>
        )}
      </div>
    </div>
  );
}
