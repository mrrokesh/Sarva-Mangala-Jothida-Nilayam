"use client";

import { Section } from "@/components/ui/Chrome";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { HowItWorks } from "@/components/forms/HowItWorks";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";

export default function ConsultationPage() {
  const { t } = useLang();
  return (
    <div className="pt-24 sm:pt-28">
      <Section title={t("book")} subtitle={t("servicesLead")}>
        <div className="mx-auto mb-8 flex max-w-3xl justify-center gap-2">
          <span className="rounded-full bg-cyan px-4 py-1.5 text-sm text-ink">{t("book")}</span>
          <Link href="/matching" className="focus-ring rounded-full border border-gold/30 px-4 py-1.5 text-sm text-ivory/80">
            {t("matchingTitle")}
          </Link>
        </div>
        <HowItWorks />
        <div className="mx-auto max-w-3xl">
          <ConsultationForm />
        </div>
      </Section>
    </div>
  );
}
