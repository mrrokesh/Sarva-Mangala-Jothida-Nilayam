"use client";

import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Section, GoldButton } from "@/components/ui/Chrome";
import { RasiWheel } from "@/components/astro/RasiWheel";
import { NakshatraMap } from "@/components/astro/NakshatraMap";
import { PlanetRow } from "@/components/astro/PlanetRow";
import { HoroscopeChart } from "@/components/astro/HoroscopeChart";
import { SERVICES } from "@/lib/services";
import { TIMELINE, AWARDS } from "@/lib/awards";
import { GALLERY } from "@/lib/gallery";
import { VIDEOS } from "@/lib/videos";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { formatPhone, telLink, waLink } from "@/lib/utils";

export default function HomePage() {
  const { t, isTa } = useLang();
  return (
    <>
      <Hero />
      <Section id="intro" eyebrow={t("guidance")} title={isTa ? "ஆலோசனை" : "Consultation"} subtitle={t("aboutLead")}>
        <div className="flex flex-wrap justify-center gap-3">
          <GoldButton href="/consultation">{t("book")}</GoldButton>
          <GoldButton href={waLink(SITE.whatsapp)} variant="ghost">{t("whatsapp")}</GoldButton>
          <GoldButton href={SITE.vibeoPlayStore} variant="ghost">{t("vibeo")}</GoldButton>
        </div>
      </Section>
      <Section title={isTa ? SITE.astrologerTa : SITE.astrologerEn} subtitle={SITE.qualifications}>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img src={SITE.images.banner} alt={SITE.astrologerEn} className="rounded-3xl border border-gold/30 object-cover" />
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
      <Section title={isTa ? "12 ராசிகள்" : "Twelve Rasis"}>
        <RasiWheel compact />
      </Section>
      <Section title={isTa ? "27 நட்சத்திரங்கள்" : "27 Nakshatras"}>
        <NakshatraMap />
      </Section>
      <Section title={isTa ? "நவகிரகங்கள்" : "Nine Grahas"} subtitle={t("planetsLead")}>
        <PlanetRow />
      </Section>
      <Section title={isTa ? "ஜாதக அமைப்பு" : "Horoscope chart"} subtitle={t("chartLead")}>
        <HoroscopeChart />
      </Section>
      <Section title={isTa ? "சேவைகள்" : "Services"} subtitle={t("servicesLead")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.id} href="/services" className="card-metal focus-ring rounded-2xl p-5 transition hover:-translate-y-1">
              <h3 className="tamil-serif text-lg text-gold-bright">{isTa ? s.ta : s.en}</h3>
              <p className="mt-2 text-sm text-ivory/75">{isTa ? s.descTa : s.descEn}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section title={t("rasipalanCta")}>
        <div className="text-center">
          <GoldButton href="/rasipalan">{isTa ? "ராசியைத் தேர்ந்தெடுங்கள்" : "Choose your Rasi"}</GoldButton>
        </div>
      </Section>
      <Section title={isTa ? "விருதுகள்" : "Awards"} subtitle={t("awardsNote")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.slice(0, 4).map((a) => (
            <Link key={a.id} href="/awards" className="card-metal overflow-hidden rounded-2xl">
              <img src={a.image} alt={isTa ? a.titleTa : a.titleEn} className="h-40 w-full object-cover" />
              <p className="p-3 text-sm text-gold-bright">{isTa ? a.titleTa : a.titleEn}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section title={isTa ? "புகைப்படங்கள்" : "Gallery"}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.slice(0, 8).map((g) => (
            <Link key={g.id} href="/gallery" className="overflow-hidden rounded-2xl border border-gold/20">
              <img src={g.src} alt={isTa ? g.ta : g.en} className="h-36 w-full object-cover" />
            </Link>
          ))}
        </div>
      </Section>
      <Section title={isTa ? "காணொளிகள்" : "Videos"}>
        <video className="mx-auto w-full max-w-3xl rounded-3xl border border-gold/30" controls preload="metadata" poster={SITE.images.banner}>
          <source src={VIDEOS[0].file} type="video/mp4" />
        </video>
        <div className="mt-6 text-center">
          <GoldButton href="/videos">{isTa ? "மேலும் காணொளிகள்" : "More videos"}</GoldButton>
        </div>
      </Section>
      <Section>
        <div className="card-metal rounded-3xl p-8 text-center">
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
          <address className="not-italic leading-relaxed text-ivory/80">
            {(isTa ? SITE.addressTa : SITE.addressEn).map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
            <div className="mt-4 space-y-1">
              {SITE.phones.map((p) => (
                <a key={p} href={telLink(p)} className="block text-gold-bright">{formatPhone(p)}</a>
              ))}
            </div>
          </address>
          <div className="flex flex-wrap gap-3">
            <GoldButton href={telLink(SITE.phones[0])}>{t("call")}</GoldButton>
            <GoldButton href={waLink(SITE.whatsapp)} variant="ghost">{t("whatsapp")}</GoldButton>
            <GoldButton href={SITE.mapsUrl} variant="ghost">{t("maps")}</GoldButton>
            <GoldButton href={SITE.mapsUrl} variant="ghost">{t("directions")}</GoldButton>
          </div>
        </div>
      </Section>
    </>
  );
}
