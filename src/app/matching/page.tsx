"use client";

import { Section } from "@/components/ui/Chrome";
import { MatchingForm } from "@/components/forms/MatchingForm";
import { HowItWorks } from "@/components/forms/HowItWorks";
import { PORUTHAMS } from "@/lib/porutham";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";

export default function MatchingPage() {
  const { isTa, t } = useLang();
  return (
    <div className="pt-24 sm:pt-28">
      <Section title={t("matchingTitle")} subtitle={t("matchingLead")}>
        <div className="mx-auto mb-8 flex max-w-3xl justify-center gap-2">
          <Link href="/consultation" className="focus-ring rounded-full border border-gold/30 px-4 py-1.5 text-sm text-ivory/80">
            {t("book")}
          </Link>
          <span className="rounded-full bg-cyan px-4 py-1.5 text-sm text-ink">{t("matchingTitle")}</span>
        </div>
        <HowItWorks />
        <div className="mx-auto max-w-3xl">
          <MatchingForm />
        </div>
      </Section>
      <Section title={t("poruthamTitle")} subtitle={t("poruthamLead")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORUTHAMS.map((p, i) => (
            <article key={p.id} className="card-metal rounded-2xl p-5">
              <p className="text-cyan">{i + 1}</p>
              <h2 className="tamil-serif mt-1 text-lg text-gold-bright">{isTa ? p.ta : p.en}</h2>
              <p className="mt-2 text-sm text-ivory/75">{isTa ? p.descTa : p.descEn}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-ivory/55">{t("disclaimer")}</p>
      </Section>
    </div>
  );
}
