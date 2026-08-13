"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Chrome";
import { GALLERY, GALLERY_FILTERS } from "@/lib/gallery";
import { useLang } from "@/context/LanguageContext";

export default function GalleryPage() {
  const { isTa, t } = useLang();
  const [filter, setFilter] = useState("all");
  const [i, setI] = useState<number | null>(null);
  const items = useMemo(
    () => (filter === "all" ? [...GALLERY] : GALLERY.filter((g) => g.category === filter)),
    [filter],
  );
  const current = i !== null ? items[i] : null;

  return (
    <div className="pt-28">
      <Section title={isTa ? "புகைப்படங்கள்" : "Gallery"}>
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`focus-ring rounded-full px-3 py-1 text-xs ${filter === f.id ? "bg-gold text-ink" : "border border-gold/30"}`}
            >
              {isTa ? f.ta : f.en}
            </button>
          ))}
        </div>
        <div className="columns-2 gap-3 md:columns-3">
          {items.map((g, idx) => (
            <button key={g.id} onClick={() => setI(idx)} className="mb-3 block w-full overflow-hidden rounded-2xl">
              <img src={g.src} alt={isTa ? g.ta : g.en} className="w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </Section>
      {current && i !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4">
          <button className="absolute inset-0" aria-label={t("close")} onClick={() => setI(null)} />
          <div className="relative z-10 max-w-4xl">
            <img src={current.src} alt={isTa ? current.ta : current.en} className="max-h-[75vh] w-full rounded-2xl object-contain" />
            <p className="mt-3 text-center text-gold-bright">{isTa ? current.ta : current.en}</p>
            <p className="text-center text-sm text-ivory/70">
              {isTa ? current.eventTa : current.eventEn} {current.year ? `· ${current.year}` : ""}
            </p>
            <div className="mt-3 flex justify-center gap-4">
              <button className="text-cyan" onClick={() => setI((n) => (n! > 0 ? n! - 1 : items.length - 1))}>‹</button>
              <button className="text-cyan" onClick={() => setI((n) => (n! + 1) % items.length)}>›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
