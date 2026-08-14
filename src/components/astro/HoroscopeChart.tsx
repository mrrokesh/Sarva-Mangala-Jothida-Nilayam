"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

const HOUSES = [
  { n: 1, ta: "லக்னம் / தன்மை", en: "Lagna / Self" },
  { n: 2, ta: "குடும்பம் / செல்வம்", en: "Family / Wealth" },
  { n: 3, ta: "சகோதரர் / தைரியம்", en: "Siblings / Courage" },
  { n: 4, ta: "தாய் / இல்லம்", en: "Mother / Home" },
  { n: 5, ta: "பிள்ளை / புத்தி", en: "Children / Intellect" },
  { n: 6, ta: "நோய் / கடன்", en: "Health challenges / Debt" },
  { n: 7, ta: "கல்யாணம் / துணை", en: "Marriage / Partner" },
  { n: 8, ta: "ஆயுள் / மறைபொருள்", en: "Longevity / Occult" },
  { n: 9, ta: "தர்மம் / குரு", en: "Dharma / Teacher" },
  { n: 10, ta: "தொழில் / அந்தஸ்து", en: "Career / Status" },
  { n: 11, ta: "லாபம் / நண்பர்", en: "Gains / Friends" },
  { n: 12, ta: "செலவு / மோக்ஷம்", en: "Loss / Moksha" },
];

export function HoroscopeChart() {
  const { isTa, t } = useLang();
  const [house, setHouse] = useState<number | null>(null);
  const active = HOUSES.find((h) => h.n === house);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4 overflow-hidden rounded-xl border border-gold/50 bg-ink text-[11px] text-gold-bright">
          {[
            [12, 1, 2, 3],
            [11, null, null, 4],
            [10, null, null, 5],
            [9, 8, 7, 6],
          ].flatMap((row, ri) =>
            row.map((n, ci) =>
              n === null ? (
                <div key={`${ri}-${ci}`} className="border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent" />
              ) : (
                <button
                  key={n}
                  onClick={() => setHouse(n)}
                  className={`focus-ring border border-gold/25 p-2 text-left hover:bg-gold/20 ${house === n ? "bg-gold/25" : ""}`}
                >
                  {n}
                </button>
              ),
            ),
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-ivory/70">{t("chartLead")}</p>
        {active && (
          <div className="card-metal mt-4 rounded-2xl p-5">
            <p className="text-xs text-cyan">House {active.n}</p>
            <h3 className="mt-1 text-lg text-gold-bright">{isTa ? active.ta : active.en}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
