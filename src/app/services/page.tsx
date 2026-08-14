"use client";

import { Section } from "@/components/ui/Chrome";
import { SERVICES } from "@/lib/services";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";

export default function ServicesPage() {
  const { isTa, t } = useLang();
  return (
    <div className="pt-24 sm:pt-28">
      <Section title={isTa ? "சேவைகள்" : "Services"} subtitle={t("servicesLead")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.id} className="card-metal rounded-3xl p-6">
              <h2 className="tamil-serif text-xl text-gold-bright">{isTa ? s.ta : s.en}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ivory/75">{isTa ? s.descTa : s.descEn}</p>
              <p className="mt-4 text-xs text-ivory/50">{t("guidance")}</p>
              <Link href={s.id === "matching" ? "/matching" : "/consultation"} className="mt-4 inline-block text-sm text-cyan underline">
                {t("book")}
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
