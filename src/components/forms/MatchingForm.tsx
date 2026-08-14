"use client";

import { useState } from "react";
import { Calendar, Clock, Mail, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { CONSULTATION_MODES } from "@/lib/services";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { SITE } from "@/lib/site";

const field = "focus-ring w-full rounded-xl border border-gold/25 bg-white px-3 py-2 text-sm text-ivory";
const labelCls = "mb-1 flex items-center gap-1.5 text-xs text-ivory/70";

function BirthFields({ prefix, legend }: { prefix: string; legend: string }) {
  const { t } = useLang();
  return (
    <fieldset>
      <legend className="tamil-serif mb-4 text-lg text-gold-bright">{legend}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <p>
          <label className={labelCls} htmlFor={`${prefix}Name`}>
            <User size={13} className="text-gold-bright" />
            {t("name")}
          </label>
          <input id={`${prefix}Name`} name={`${prefix}Name`} required className={field} />
        </p>
        <p>
          <label className={labelCls} htmlFor={`${prefix}Pob`}>
            <MapPin size={13} className="text-gold-bright" />
            {t("pob")}
          </label>
          <input id={`${prefix}Pob`} name={`${prefix}Pob`} required className={field} />
        </p>
        <p>
          <label className={labelCls} htmlFor={`${prefix}Dob`}>
            <Calendar size={13} className="text-gold-bright" />
            {t("dob")}
          </label>
          <input id={`${prefix}Dob`} name={`${prefix}Dob`} type="date" required className={field} />
        </p>
        <p>
          <label className={labelCls} htmlFor={`${prefix}Tob`}>
            <Clock size={13} className="text-gold-bright" />
            {t("tob")}
          </label>
          <input id={`${prefix}Tob`} name={`${prefix}Tob`} type="time" required className={field} />
        </p>
      </div>
    </fieldset>
  );
}

export function MatchingForm() {
  const { t, isTa } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [vibeoHint, setVibeoHint] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    if (!raw.name || !raw.mobile || !raw.consent || !raw.brideName || !raw.groomName) {
      setStatus("err");
      return;
    }
    setStatus("sending");
    const res = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: raw.name,
        mobile: raw.mobile,
        whatsapp: raw.whatsapp,
        email: raw.email,
        city: raw.city,
        country: raw.country || "India",
        consultationType: "matching",
        consultationMode: raw.consultationMode,
        message: raw.message,
        matching: {
          bride: { name: raw.brideName, dob: raw.brideDob, tob: raw.brideTob, pob: raw.bridePob },
          groom: { name: raw.groomName, dob: raw.groomDob, tob: raw.groomTob, pob: raw.groomPob },
        },
      }),
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

  return (
    <form onSubmit={onSubmit} className="card-metal space-y-8 rounded-3xl p-4 sm:p-6 lg:p-8">
      <fieldset>
        <legend className="tamil-serif mb-4 text-lg text-gold-bright">{t("personal")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <p>
            <label className={labelCls} htmlFor="name">
              <User size={13} className="text-gold-bright" />
              {t("requesterName")}
            </label>
            <input id="name" name="name" required className={field} />
          </p>
          <p>
            <label className={labelCls} htmlFor="mobile">
              <Phone size={13} className="text-gold-bright" />
              {t("mobile")}
            </label>
            <input id="mobile" name="mobile" required inputMode="tel" className={field} />
          </p>
          <p>
            <label className={labelCls} htmlFor="whatsapp">
              <MessageCircle size={13} className="text-gold-bright" />
              {t("waNumber")}
            </label>
            <input id="whatsapp" name="whatsapp" inputMode="tel" className={field} />
          </p>
          <p>
            <label className={labelCls} htmlFor="email">
              <Mail size={13} className="text-gold-bright" />
              {t("email")}
            </label>
            <input id="email" name="email" type="email" className={field} />
          </p>
          <p>
            <label className={labelCls} htmlFor="city">
              <MapPin size={13} className="text-gold-bright" />
              {t("city")}
            </label>
            <input id="city" name="city" className={field} />
          </p>
          <p>
            <label className={labelCls} htmlFor="consultationMode">
              {t("consultMode")}
            </label>
            <select id="consultationMode" name="consultationMode" className={field} defaultValue="vibeo">
              {CONSULTATION_MODES.map((c) => (
                <option key={c.id} value={c.id}>
                  {isTa ? c.ta : c.en}
                </option>
              ))}
            </select>
          </p>
        </div>
      </fieldset>
      <BirthFields prefix="bride" legend={t("bride")} />
      <BirthFields prefix="groom" legend={t("groom")} />
      <p>
        <label className={labelCls} htmlFor="message">
          {t("question")}
        </label>
        <textarea id="message" name="message" rows={4} className={field} />
      </p>
      <label className="flex items-start gap-2 text-sm text-ivory/80">
        <input type="checkbox" name="consent" required className="mt-1" />
        {t("agree")}
      </label>
      {status === "err" && <p className="text-sm text-kumkum">{t("required")}</p>}
      <GoldButton type="submit">{status === "sending" ? "…" : t("matchingSubmit")}</GoldButton>
    </form>
  );
}
