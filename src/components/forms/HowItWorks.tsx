"use client";

import { useLang } from "@/context/LanguageContext";

export function HowItWorks() {
  const { isTa } = useLang();
  const steps = isTa
    ? [
        "பிறப்பு விவரங்களுடன் படிவத்தை நிரப்புங்கள்.",
        "கோரிக்கை பெறப்பட்டதும் WhatsApp, தொலைபேசி அல்லது நேரில் தொடர்பு கொள்கிறோம்.",
        "ஜோதிடர் ஜாதகத்தைப் பார்த்து பாரம்பரிய வழிகாட்டுதல் வழங்குவார் — முடிவு உத்தரவாதம் அல்ல.",
      ]
    : [
        "Fill the form with birth details.",
        "We contact you on WhatsApp, phone, or for an in-person visit.",
        "The astrologer studies the chart and offers traditional guidance — not a guaranteed outcome.",
      ];

  return (
    <ol className="mx-auto mb-8 grid max-w-3xl gap-3 sm:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step} className="card-metal rounded-2xl p-4 text-sm">
          <span className="text-cyan">{i + 1}</span>
          <p className="mt-2 leading-relaxed text-ivory/80">{step}</p>
        </li>
      ))}
    </ol>
  );
}
