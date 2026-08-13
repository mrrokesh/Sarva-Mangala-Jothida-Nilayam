"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Chrome";
import { VIDEOS, VIDEO_FILTERS } from "@/lib/videos";
import { useLang } from "@/context/LanguageContext";

export default function VideosPage() {
  const { isTa } = useLang();
  const [filter, setFilter] = useState("all");
  const featured = VIDEOS.find((v) => v.featured) || VIDEOS[0];
  const list = useMemo(
    () => VIDEOS.filter((v) => (filter === "all" ? true : v.category === filter)),
    [filter],
  );
  return (
    <div className="pt-28">
      <Section title={isTa ? "காணொளிகள்" : "Videos"}>
        <video className="mx-auto w-full max-w-4xl rounded-3xl border border-gold/30" controls preload="metadata">
          <source src={featured.file} type="video/mp4" />
        </video>
        <p className="mt-3 text-center text-gold-bright">{isTa ? featured.ta : featured.en}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {VIDEO_FILTERS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`rounded-full px-3 py-1 text-xs ${filter === f.id ? "bg-gold text-ink" : "border border-gold/30"}`}>
              {isTa ? f.ta : f.en}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {list.map((v) => (
            <article key={v.id} className="card-metal rounded-2xl p-3">
              <video className="w-full rounded-xl" controls preload="none">
                <source src={v.file} type="video/mp4" />
              </video>
              <h2 className="mt-3 text-sm text-gold-bright">{isTa ? v.ta : v.en}</h2>
              <p className="mt-1 text-xs text-ivory/70">{isTa ? v.noteTa : v.noteEn}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
