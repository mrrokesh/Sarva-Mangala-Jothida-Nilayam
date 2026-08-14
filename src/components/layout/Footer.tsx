"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, NAV } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const { t, isTa } = useLang();
  const [socialUrls, setSocialUrls] = useState(SITE.social);
  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((j) => {
        if (j?.profile) {
          setSocialUrls({
            instagram: j.profile.instagram || SITE.social.instagram,
            facebook: j.profile.facebook || SITE.social.facebook,
            youtube: j.profile.youtube || SITE.social.youtube,
          });
        }
      })
      .catch(() => undefined);
  }, []);
  const social = [
    { href: socialUrls.instagram, label: t("instagram"), Icon: Instagram },
    { href: socialUrls.facebook, label: t("facebook"), Icon: Facebook },
    { href: socialUrls.youtube, label: t("youtube"), Icon: Youtube },
    { href: SITE.vibeoPlayStore, label: "Vibeo", Icon: null },
  ];

  return (
    <footer className="relative mt-10 border-t border-gold/25 bg-royal-night">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-14">
        <div>
          <img src={SITE.images.banner} alt="" className="mb-4 h-24 w-24 rounded-full object-cover object-[20%_center] ring-2 ring-gold/50" />
          <p className="tamil-serif text-gold-bright">{isTa ? SITE.astrologerTa : SITE.astrologerEn}</p>
          <p className="mt-1 text-xs text-ivory/60">{SITE.qualifications}</p>
        </div>
        <div>
          <h3 className="tamil-serif text-xl text-gold-bright">{isTa ? SITE.nameTa : SITE.nameEn}</h3>
          <p className="mt-1 text-sm text-ivory/60">{isTa ? SITE.nameEn : SITE.nameTa}</p>
          <nav className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="focus-ring text-ivory/75 hover:text-gold-bright">
                {isTa ? n.ta : n.en}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4 text-sm text-ivory/80">
          <ContactDetails compact />
          <div className="flex gap-3 pt-1">
            {social.map(({ href, label, Icon }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="focus-ring rounded-full border border-gold/30 p-2" aria-label={label}>
                  {Icon ? <Icon size={16} /> : <span className="text-xs">V</span>}
                </a>
              ) : (
                <span key={label} className="rounded-full border border-gold/20 p-2 text-ivory/30" title={`${label} — add URL in admin`}>
                  {Icon ? <Icon size={16} /> : <span className="text-xs">V</span>}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-6 text-center text-xs leading-relaxed text-ivory/55">{t("disclaimer")}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-gold/15 px-4 py-4 text-center text-xs text-ivory/55">
        <span>{t("copyright")}</span>
        <Link href="/privacy">{t("privacy")}</Link>
        <Link href="/terms">{t("terms")}</Link>
        <Link href="/disclaimer">{t("discPage")}</Link>
        <span>
          Developed by{" "}
          <a href="https://www.mrokesh.com" target="_blank" rel="noreferrer" className="focus-ring text-gold-bright hover:underline">
            MR_ROKESH
          </a>
        </span>
      </div>
    </footer>
  );
}
