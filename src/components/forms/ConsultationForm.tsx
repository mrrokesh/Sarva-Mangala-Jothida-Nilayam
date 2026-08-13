"use client";

import { useState } from "react";
import { CONSULTATION_MODES, CONSULTATION_TYPES } from "@/lib/services";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { SITE } from "@/lib/site";

export function ConsultationForm() {
  const { t, isTa } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [vibeoHint, setVibeoHint] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.mobile || !data.consent) {
      setStatus("err");
      return;
    }
    setStatus("sending");
    const res = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("err");
      return;
    }
    setStatus("ok");
    setVibeoHint(json.vibeoUrl || SITE.vibeoPlayStore);
    form.reset();
  }

  if (status === "ok") {
    return (
      <div className="card-metal rounded-3xl p-8 text-center">
        <p className="tamil-serif text-xl text-gold-bright">{t("thanks")}</p>
        {vibeoHint && (
          <a href={vibeoHint} className="mt-4 inline-block text-sm text-cyan underline" target="_blank" rel="noreferrer">
            {t("chatVibeo")}
          </a>
        )}
      </div>
    );
  }

  const field = "focus-ring w-full rounded-xl border border-gold/25 bg-ink/50 px-3 py-2 text-sm text-ivory";
  const label = "mb-1 block text-xs text-ivory/70";

  return (
    <form onSubmit={onSubmit} className="card-metal space-y-8 rounded-3xl p-6 sm:p-8">
      <fieldset>
        <legend className="tamil-serif mb-4 text-lg text-gold-bright">{t("personal")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <p>
            <label className={label} htmlFor="name">{t("name")}</label>
            <input id="name" name="name" required className={field} />
          </p>
          <p>
            <label className={label} htmlFor="mobile">{t("mobile")}</label>
            <input id="mobile" name="mobile" required inputMode="tel" className={field} />
          </p>
          <p>
            <label className={label} htmlFor="whatsapp">{t("waNumber")}</label>
            <input id="whatsapp" name="whatsapp" inputMode="tel" className={field} />
          </p>
          <p>
            <label className={label} htmlFor="email">{t("email")}</label>
            <input id="email" name="email" type="email" className={field} />
          </p>
          <p>
            <label className={label} htmlFor="city">{t("city")}</label>
            <input id="city" name="city" className={field} />
          </p>
          <p>
            <label className={label} htmlFor="country">{t("country")}</label>
            <input id="country" name="country" defaultValue="India" className={field} />
          </p>
        </div>
      </fieldset>
      <fieldset>
        <legend className="tamil-serif mb-4 text-lg text-gold-bright">{t("birth")}</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <p>
            <label className={label} htmlFor="dob">{t("dob")}</label>
            <input id="dob" name="dob" type="date" className={field} />
          </p>
          <p>
            <label className={label} htmlFor="tob">{t("tob")}</label>
            <input id="tob" name="tob" type="time" className={field} />
          </p>
          <p>
            <label className={label} htmlFor="pob">{t("pob")}</label>
            <input id="pob" name="pob" className={field} />
          </p>
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <p>
          <label className={label} htmlFor="consultationType">{t("consultType")}</label>
          <select id="consultationType" name="consultationType" className={field}>
            {CONSULTATION_TYPES.map((c) => (
              <option key={c.id} value={c.id}>
                {isTa ? c.ta : c.en}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label className={label} htmlFor="consultationMode">{t("consultMode")}</label>
          <select id="consultationMode" name="consultationMode" className={field} defaultValue="vibeo">
            {CONSULTATION_MODES.map((c) => (
              <option key={c.id} value={c.id}>
                {isTa ? c.ta : c.en}
              </option>
            ))}
          </select>
        </p>
      </div>
      <p>
        <label className={label} htmlFor="message">{t("question")}</label>
        <textarea id="message" name="message" rows={5} className={field} />
      </p>
      <label className="flex items-start gap-2 text-sm text-ivory/80">
        <input type="checkbox" name="consent" required className="mt-1" />
        {t("agree")}
      </label>
      {status === "err" && <p className="text-sm text-kumkum">{t("required")}</p>}
      <GoldButton type="submit">{status === "sending" ? "…" : t("submit")}</GoldButton>
    </form>
  );
}
