"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { GoldButton } from "@/components/ui/Chrome";
import { waLink } from "@/lib/utils";
import { MessageCircle, X } from "lucide-react";

export function WelcomePopup({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const { t, isTa } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sm-welcome") === "1") return;
    const id = window.setTimeout(() => {
      setOpen(true);
      onOpenChange?.(true);
    }, 2600);
    return () => window.clearTimeout(id);
  }, [onOpenChange]);

  const close = () => {
    sessionStorage.setItem("sm-welcome", "1");
    setOpen(false);
    onOpenChange?.(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <button className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-label={t("close")} onClick={close} />
      <div className="card-metal relative grid max-h-[min(90vh,40rem)] w-full max-w-3xl overflow-auto rounded-3xl md:grid-cols-2">
        <button
          onClick={close}
          className="focus-ring absolute right-3 top-3 z-10 rounded-full bg-ink/60 p-2 text-gold-bright"
          aria-label={t("close")}
        >
          <X size={18} />
        </button>
        <div className="relative min-h-[160px] overflow-hidden bg-royal-night sm:min-h-[240px]">
          <img src={SITE.images.banner} alt={SITE.astrologerEn} className="h-full w-full object-cover object-[18%_center]" />
        </div>
        <div className="space-y-3 p-4 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan">{t("founder")}</p>
          <h2 id="welcome-title" className="tamil-serif text-2xl text-gold-bright">
            {isTa ? SITE.astrologerTa : SITE.astrologerEn}
          </h2>
          <p className="text-xs text-ivory/70">{SITE.qualifications}</p>
          <p className="tamil text-sm text-ivory/90">{isTa ? SITE.nameTa : SITE.nameEn}</p>
          <p className="text-sm leading-relaxed text-ivory/80">{t("welcomeIntro")}</p>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            <GoldButton href="/consultation" className="w-full sm:w-auto">{t("book")}</GoldButton>
            <GoldButton href="/contact" variant="ghost" className="w-full sm:w-auto">
              {t("contact")}
            </GoldButton>
            <GoldButton href={waLink(SITE.whatsapp, isTa ? "வணக்கம். ஜோதிட ஆலோசனை வேண்டும்." : "Namaste. I would like an astrology consultation.")} variant="ghost" icon={<MessageCircle size={16} />} className="w-full sm:w-auto">
              {t("whatsapp")}
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}
