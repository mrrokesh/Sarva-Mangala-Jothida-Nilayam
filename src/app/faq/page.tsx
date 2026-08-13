"use client";

import { Section } from "@/components/ui/Chrome";
import { FAQS } from "@/lib/insights";
import { useLang } from "@/context/LanguageContext";

export default function FaqPage() {
  const { isTa, t } = useLang();
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: isTa ? f.qTa : f.qEn,
      acceptedAnswer: { "@type": "Answer", text: isTa ? f.aTa : f.aEn },
    })),
  };
  return (
    <div className="pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
      <Section title={t("faq")}>
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQS.map((f) => (
            <details key={f.qEn} className="card-metal rounded-2xl p-4">
              <summary className="cursor-pointer text-gold-bright">{isTa ? f.qTa : f.qEn}</summary>
              <p className="mt-3 text-sm text-ivory/80">{isTa ? f.aTa : f.aEn}</p>
            </details>
          ))}
        </div>
      </Section>
    </div>
  );
}
