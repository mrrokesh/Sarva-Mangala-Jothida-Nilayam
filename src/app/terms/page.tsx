"use client";

import { Section } from "@/components/ui/Chrome";
import { useLang } from "@/context/LanguageContext";

export default function TermsPage() {
  const { isTa, t } = useLang();
  return (
    <div className="pt-28">
      <Section title={isTa ? "விதிமுறைகள்" : "Terms"}>
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-ivory/80">
          <p>{t("disclaimer")}</p>
          <p>
            {isTa
              ? "இத்தள உள்ளடக்கம் பாரம்பரிய ஜோதிட வழிகாட்டுதல். சேவை கட்டணம் மற்றும் நேரம் ஆலோசனையின் போது உறுதி செய்யப்படும்."
              : "Site content is traditional astrological guidance. Fees and timing are confirmed during consultation."}
          </p>
        </div>
      </Section>
    </div>
  );
}
