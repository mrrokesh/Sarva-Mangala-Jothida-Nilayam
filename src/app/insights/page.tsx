"use client";

import { Section } from "@/components/ui/Chrome";
import { INSIGHTS } from "@/lib/insights";
import { useLang } from "@/context/LanguageContext";

export default function InsightsPage() {
  const { isTa, t } = useLang();
  return (
    <div className="pt-28">
      <Section title={t("insights")}>
        <div className="mx-auto max-w-3xl space-y-6">
          {INSIGHTS.map((item) => (
            <article key={item.slug} className="card-metal rounded-3xl p-6">
              <h2 className="tamil-serif text-xl text-gold-bright">{isTa ? item.ta : item.en}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ivory/80">{isTa ? item.bodyTa : item.bodyEn}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
