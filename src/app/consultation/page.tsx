"use client";

import { Section } from "@/components/ui/Chrome";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { useLang } from "@/context/LanguageContext";

export default function ConsultationPage() {
  const { t } = useLang();
  return (
    <div className="pt-28">
      <Section title={t("book")} subtitle={t("servicesLead")}>
        <div className="mx-auto max-w-3xl">
          <ConsultationForm />
        </div>
      </Section>
    </div>
  );
}
