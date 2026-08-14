"use client";

import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Section, GoldButton } from "@/components/ui/Chrome";
import { RasiWheel } from "@/components/astro/RasiWheel";
import { NakshatraMap } from "@/components/astro/NakshatraMap";
import { PlanetRow } from "@/components/astro/PlanetRow";
import { PanchangamCard } from "@/components/astro/PanchangamCard";
import { SERVICES } from "@/lib/services";
import { TIMELINE } from "@/lib/awards";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { telLink, waLink } from "@/lib/utils";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

export default function HomePage() {
  const { t, isTa } = useLang();
  return (
    <>
      <Hero />
      <Section id="intro" eyebrow={t("guidance")} title={isTa ? "ஆலோசனை" : "Consultation"} subtitle={t("aboutLead")}>
        <div className="flex flex-wrap justify-center gap-3">
          <GoldButton href="/consultation">{t("book")}</GoldButton>
          <GoldButton href="/matching" variant="ghost">{t("matchingTitle")}</GoldButton>
          <GoldButton href={waLink(SITE.whatsapp)} variant="ghost" icon={<MessageCircle size={16} />}>{t("whatsapp")}</GoldButton>
        </div>
      </Section>
      <Section title={isTa ? SITE.astrologerTa : SITE.astrologerEn} subtitle={SITE.qualifications}>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img src={SITE.images.banner} alt={SITE.astrologerEn} className="h-auto w-full rounded-3xl border border-gold/30 object-cover" />
          <div className="space-y-4 text-sm leading-relaxed text-ivory/80">
            <p>{t("welcomeIntro")}</p>
            <ol className="space-y-3">
              {TIMELINE.map((item) => (
                <li key={item.year} className="card-metal rounded-2xl p-4">
                  <span className="text-cyan">{item.year}</span>
                  <p className="mt-1">{isTa ? item.ta : item.en}</p>
                </li>
              ))}
            </ol>
            <GoldButton href="/about">{isTa ? "முழு பயணம்" : "Full journey"}</GoldButton>
          </div>
        </div>
      </Section>
      <Section title={t("panchangam")}>
        <PanchangamCard compact />
        <div className="mt-6 text-center">
          <GoldButton href="/rasipalan#panchangam">{isTa ? "முழு பஞ்சாங்கம்" : "Full panchangam"}</GoldButton>
        </div>
      </Section>
      <Section title={isTa ? "ராசிகள் · நட்சத்திரங்கள் · ராசிபலன்" : "Rasis · Nakshatras · Rasipalan"}>
        <RasiWheel compact />
        <div className="mt-10">
          <NakshatraMap />
        </div>
        <div className="mt-10 text-center">
          <GoldButton href="/rasipalan">{isTa ? "முழு ராசிபலன் பக்கம்" : "Open Rasis & Rasipalan"}</GoldButton>
        </div>
      </Section>
      <Section title={isTa ? "நவகிரகங்கள்" : "Nine Grahas"} subtitle={t("planetsLead")}>
        <PlanetRow />
      </Section>
      <Section title={isTa ? "சேவைகள்" : "Services"} subtitle={t("servicesLead")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.id} href={s.id === "matching" ? "/matching" : "/services"} className="card-metal focus-ring rounded-2xl p-5 transition hover:-translate-y-1">
              <h3 className="tamil-serif text-lg text-gold-bright">{isTa ? s.ta : s.en}</h3>
              <p className="mt-2 text-sm text-ivory/75">{isTa ? s.descTa : s.descEn}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section>
        <div className="card-metal rounded-3xl p-5 text-center sm:p-8">
          <h2 className="tamil-serif text-2xl text-gold-bright">{t("book")}</h2>
          <p className="mt-2 text-sm text-ivory/70">{t("servicesLead")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <GoldButton href="/consultation">{t("submit")}</GoldButton>
            <GoldButton href={SITE.vibeoPlayStore} variant="ghost">{t("chatVibeo")}</GoldButton>
          </div>
        </div>
      </Section>
      <Section title={isTa ? "தொடர்பு" : "Contact"}>
        <div className="grid gap-6 md:grid-cols-2">
          <ContactDetails />
          <div className="flex flex-wrap content-start gap-3">
            <GoldButton href={telLink(SITE.phones[0])} icon={<Phone size={16} />}>{t("call")}</GoldButton>
            <GoldButton href={waLink(SITE.whatsapp)} variant="ghost" icon={<MessageCircle size={16} />}>{t("whatsapp")}</GoldButton>
            <GoldButton href={SITE.mapsUrl} variant="ghost" icon={<MapPin size={16} />}>{t("maps")}</GoldButton>
            <GoldButton href={SITE.mapsUrl} variant="ghost" icon={<Navigation size={16} />}>{t("directions")}</GoldButton>
          </div>
        </div>
      </Section>
    </>
  );
}
