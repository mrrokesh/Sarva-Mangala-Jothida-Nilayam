"use client";

import { Section } from "@/components/ui/Chrome";
import { useLang } from "@/context/LanguageContext";

export default function DisclaimerPage() {
  const { t } = useLang();
  return (
    <div className="pt-24 sm:pt-28">
      <Section title={t("discPage")}>
        <p className="mx-auto max-w-3xl leading-relaxed text-ivory/80">{t("disclaimer")}</p>
      </Section>
    </div>
  );
}
