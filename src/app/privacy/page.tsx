"use client";

import { Section } from "@/components/ui/Chrome";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/lib/site";

export default function PrivacyPage() {
  const { isTa } = useLang();
  return (
    <div className="pt-28">
      <Section title={isTa ? "தனியுரிமைக் கொள்கை" : "Privacy Policy"}>
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-ivory/80">
          <p>
            {isTa
              ? `${SITE.nameTa} ஆலோசனைப் படிவத்தில் நீங்கள் தரும் பெயர், தொலைபேசி, பிறப்பு விவரங்கள் ஆகியவை ஆலோசனைத் தொடர்புக்கு மட்டுமே பயன்படுத்தப்படும்.`
              : `${SITE.nameEn} uses name, phone and birth details submitted on the consultation form only to contact you about that request.`}
          </p>
          <p>
            {isTa
              ? "கோரிக்கைகள் Vibeo செய்தி அமைப்பு, WhatsApp அல்லது மின்னஞ்சல் மூலம் நிர்வாகிக்கு அனுப்பப்படலாம்."
              : "Requests may be forwarded to the administrator through Vibeo, WhatsApp or email."}
          </p>
        </div>
      </Section>
    </div>
  );
}
