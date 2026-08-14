import { SITE } from "./site";

export type ConsultationPayload = {
  name: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  country?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  consultationType?: string;
  consultationMode?: string;
  message?: string;
  matching?: {
    bride?: { name?: string; dob?: string; tob?: string; pob?: string };
    groom?: { name?: string; dob?: string; tob?: string; pob?: string };
  };
};

function personLine(labelTa: string, labelEn: string, p?: { name?: string; dob?: string; tob?: string; pob?: string }) {
  if (!p?.name) return "";
  return `${labelTa} / ${labelEn}: ${p.name} · ${p.dob || ""} · ${p.tob || ""} · ${p.pob || ""}`;
}

export function formatVibeoMessage(p: ConsultationPayload) {
  return [
    "சர்வ மங்கலா ஜோதிட நிலையம் — புதிய ஆலோசனை கோரிக்கை",
    `Sarva Mangala Jothida Nilayam — New consultation request`,
    "",
    `பெயர் / Name: ${p.name}`,
    `கைபேசி / Mobile: ${p.mobile}`,
    p.whatsapp ? `WhatsApp: ${p.whatsapp}` : "",
    p.email ? `Email: ${p.email}` : "",
    p.city ? `நகரம் / City: ${p.city}` : "",
    p.country ? `நாடு / Country: ${p.country}` : "",
    p.dob ? `பிறந்த தேதி / DOB: ${p.dob}` : "",
    p.tob ? `பிறந்த நேரம் / TOB: ${p.tob}` : "",
    p.pob ? `பிறந்த இடம் / POB: ${p.pob}` : "",
    p.consultationType ? `வகை / Type: ${p.consultationType}` : "",
    p.consultationMode ? `முறை / Mode: ${p.consultationMode}` : "",
    personLine("மணமகள்", "Bride", p.matching?.bride),
    personLine("மணமகன்", "Groom", p.matching?.groom),
    p.message ? `கேள்வி / Message:\n${p.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendToVibeo(payload: ConsultationPayload) {
  const webhook = process.env.VIBEO_WEBHOOK_URL;
  const apiKey = process.env.VIBEO_API_KEY;
  const text = formatVibeoMessage(payload);

  if (!webhook) {
    return { ok: false, skipped: true, reason: "VIBEO_WEBHOOK_URL not set" };
  }

  const body = {
    source: "sarva-mangala-website",
    inbox: process.env.VIBEO_INBOX_ID || "consultations",
    to: payload.mobile,
    name: payload.name,
    text,
    payload,
    deepLink: SITE.vibeoDeepLink,
    app: "com.mr_rokeshchat.com",
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, skipped: false, status: res.status, err };
  }

  return { ok: true, skipped: false };
}

export function vibeoChatUrl(text: string) {
  const encoded = encodeURIComponent(text);
  return `${SITE.vibeoDeepLink}?text=${encoded}`;
}
