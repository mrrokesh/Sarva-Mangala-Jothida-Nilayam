"use client";

import { useState } from "react";
import { PLANETS } from "@/lib/planets";
import { useLang } from "@/context/LanguageContext";

export function PlanetRow() {
  const { isTa, t } = useLang();
  const [id, setId] = useState<string | null>(null);
  const active = PLANETS.find((p) => p.id === id);

  return (
    <div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PLANETS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setId(p.id)}
            className="focus-ring group flex min-w-[92px] flex-col items-center gap-2"
            aria-pressed={id === p.id}
          >
            <span
              className="spin-slow block h-16 w-16 rounded-full shadow-gold"
              style={{
                background: `radial-gradient(circle at 30% 30%, #fff, ${p.color} 45%, #111 100%)`,
                animationDuration: `${18 + i * 4}s`,
              }}
            />
            <span className="text-xs text-ivory/80">{isTa ? p.ta : p.en}</span>
          </button>
        ))}
      </div>
      {active && (
        <div className="card-metal mt-4 rounded-2xl p-5">
          <h3 className="tamil-serif text-xl text-gold-bright">{isTa ? active.ta : active.en}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ivory/80">{isTa ? active.meaningTa : active.meaningEn}</p>
          <p className="mt-3 text-xs text-ivory/50">{t("guidance")}</p>
        </div>
      )}
    </div>
  );
}
