"use client";

import { Section, GoldButton } from "@/components/ui/Chrome";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { telLink, waLink } from "@/lib/utils";
import { Facebook, Instagram, MapPin, MessageCircle, Navigation, Phone, Youtube } from "lucide-react";

export default function ContactPage() {
  const { t, isTa } = useLang();
  return (
    <div className="pt-24 sm:pt-28">
      <Section title={isTa ? SITE.nameTa : SITE.nameEn} subtitle={isTa ? SITE.nameEn : SITE.nameTa}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <ContactDetails />
            <div className="flex flex-wrap gap-3">
              <GoldButton href={telLink(SITE.phones[0])} icon={<Phone size={16} />}>{t("call")}</GoldButton>
              <GoldButton href={waLink(SITE.whatsapp)} variant="ghost" icon={<MessageCircle size={16} />}>{t("whatsapp")}</GoldButton>
              <GoldButton href={SITE.vibeoPlayStore} variant="ghost">{t("vibeo")}</GoldButton>
              <GoldButton href={SITE.mapsUrl} variant="ghost" icon={<MapPin size={16} />}>{t("maps")}</GoldButton>
              <GoldButton href={SITE.mapsUrl} variant="ghost" icon={<Navigation size={16} />}>{t("directions")}</GoldButton>
            </div>
            <div>
              <h3 className="mt-2 text-sm uppercase tracking-widest text-cyan">{t("follow")}</h3>
              <div className="mt-3 flex gap-3">
                <Social href={SITE.social.instagram} label="Instagram"><Instagram size={18} /></Social>
                <Social href={SITE.social.facebook} label="Facebook"><Facebook size={18} /></Social>
                <Social href={SITE.social.youtube} label="YouTube"><Youtube size={18} /></Social>
                <Social href={SITE.vibeoPlayStore} label="Vibeo">V</Social>
              </div>
              <p className="mt-3 text-xs text-ivory/50">
                {isTa
                  ? "Instagram, Facebook, YouTube இணைப்புகள் கிடைத்ததும் நிர்வாகப் பக்கத்தில் சேர்க்கலாம்."
                  : "Instagram, Facebook and YouTube links can be added in Admin when official pages are ready."}
              </p>
            </div>
          </div>
          <iframe
            title="Salem location"
            className="h-64 w-full rounded-3xl border border-gold/30 sm:h-80"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&z=16&output=embed`}
          />
        </div>
      </Section>
    </div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) {
    return <span className="rounded-full border border-gold/20 p-3 text-ivory/30" title={label}>{children}</span>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="focus-ring rounded-full border border-gold/40 p-3">
      {children}
    </a>
  );
}
