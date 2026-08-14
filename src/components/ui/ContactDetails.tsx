"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLang } from "@/context/LanguageContext";
import { formatPhone, telLink, waLink } from "@/lib/utils";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-bright">
      {children}
    </span>
  );
}

export function ContactDetails({ compact = false }: { compact?: boolean }) {
  const { isTa, t } = useLang();
  const address = isTa ? SITE.addressTa : SITE.addressEn;

  return (
    <div className={compact ? "space-y-3 text-sm" : "space-y-4 text-sm sm:text-base"}>
      <div className="flex items-start gap-3">
        <IconBadge>
          <Phone size={16} />
        </IconBadge>
        <p className={`flex min-w-0 flex-wrap items-center gap-x-2 break-words ${compact ? "pt-1.5 text-sm" : "pt-1 text-base sm:text-lg"}`}>
          {SITE.phones.map((p, i) => (
            <span key={p} className="inline-flex items-center gap-x-2">
              {i > 0 ? <span className="text-ivory/40">/</span> : null}
              <a href={telLink(p)} className="focus-ring rounded-sm text-gold-bright hover:text-gold">
                {formatPhone(p)}
              </a>
            </span>
          ))}
        </p>
      </div>
      <a href={waLink(SITE.whatsapp)} className="focus-ring flex items-start gap-3 rounded-xl text-ivory/85 hover:text-gold-bright">
        <IconBadge>
          <WhatsAppIcon size={16} />
        </IconBadge>
        <span className="pt-1.5">{formatPhone(SITE.whatsapp)}</span>
      </a>
      {SITE.email ? (
        <a href={`mailto:${SITE.email}`} className="focus-ring flex items-start gap-3 rounded-xl text-ivory/85 hover:text-gold-bright">
          <IconBadge>
            <Mail size={16} />
          </IconBadge>
          <span className="pt-1.5">{SITE.email}</span>
        </a>
      ) : null}
      <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="focus-ring flex items-start gap-3 rounded-xl text-ivory/85 hover:text-gold-bright">
        <IconBadge>
          <MapPin size={16} />
        </IconBadge>
        <address className="not-italic leading-relaxed">
          <span className="mb-1 block text-xs uppercase tracking-widest text-cyan">{t("address")}</span>
          {address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </a>
    </div>
  );
}
