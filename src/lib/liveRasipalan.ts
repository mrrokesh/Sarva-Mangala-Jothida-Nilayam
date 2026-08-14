import { unstable_cache } from "next/cache";
import { RASIS } from "./rasis";
import { defaultRasipalanMap, rasiToApiSign, type PeriodType, type RasipalanEntry, type LiveRasipalan } from "./rasipalan";

const LIVE_BASE = "https://freehoroscopeapi.com/api/v1/get-horoscope";

const COLORS: { ta: string; en: string }[] = [
  { ta: "சிவப்பு", en: "Red" },
  { ta: "வெள்ளை", en: "White" },
  { ta: "பச்சை", en: "Green" },
  { ta: "பொன் மஞ்சள்", en: "Gold" },
  { ta: "நீலம்", en: "Blue" },
  { ta: "இளஞ்சிவப்பு", en: "Pink" },
  { ta: "ஊதா", en: "Violet" },
  { ta: "ஆரஞ்சு", en: "Orange" },
];

const TIMES: { ta: string; en: string }[] = [
  { ta: "காலை 6:00 – 7:30", en: "6:00 – 7:30 AM" },
  { ta: "காலை 7:30 – 9:00", en: "7:30 – 9:00 AM" },
  { ta: "காலை 9:30 – 11:00", en: "9:30 – 11:00 AM" },
  { ta: "மாலை 5:00 – 6:30", en: "5:00 – 6:30 PM" },
  { ta: "மாலை 6:30 – 8:00", en: "6:30 – 8:00 PM" },
];

const THEMES: { key: Exclude<keyof RasipalanEntry, "general" | "luckyColor" | "luckyNumber" | "auspiciousTime">; keys: string[]; fallbackEn: string }[] = [
  { key: "career", keys: ["work", "career", "job", "business", "professional", "office", "project", "routine", "task"], fallbackEn: "Keep work conversations clear and avoid rushing new agreements." },
  { key: "finance", keys: ["money", "finance", "spend", "invest", "wealth", "cost", "financial"], fallbackEn: "Keep spending measured and avoid rushed money decisions." },
  { key: "family", keys: ["family", "home", "loved ones", "household", "parents", "living space"], fallbackEn: "Gentle words at home can restore calm." },
  { key: "marriage", keys: ["love", "relationship", "partner", "romance", "marriage"], fallbackEn: "Understanding matters in relationships. Discuss before deciding." },
  { key: "health", keys: ["health", "self-care", "stress", "energy", "body", "well-being", "overwhelm", "recharge"], fallbackEn: "Rest, hydration and professional medical advice remain essential." },
];

function nowIST() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  return {
    y: Number(get("year")),
    m: Number(get("month")),
    d: Number(get("day")),
  };
}

export function bucket(period: PeriodType) {
  const { y, m, d } = nowIST();
  const pad = (n: number) => String(n).padStart(2, "0");
  if (period === "daily") return `${y}-${pad(m)}-${pad(d)}`;
  if (period === "monthly") return `${y}-${pad(m)}`;
  if (period === "yearly") return String(y);
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function hash(s: string) {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}

function luck(sign: string, period: PeriodType, date: string) {
  const n = hash(`${sign}:${period}:${date}`);
  const color = COLORS[n % COLORS.length];
  const numA = (n % 9) + 1;
  let numB = ((n >>> 3) % 9) + 1;
  if (numB === numA) numB = (numB % 9) + 1;
  const time = TIMES[(n >>> 5) % TIMES.length];
  return {
    luckyColor: { ta: color.ta, en: color.en },
    luckyNumber: { ta: `${numA}, ${numB}`, en: `${numA}, ${numB}` },
    auspiciousTime: time,
  };
}

function sentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickTheme(text: string, keys: string[], fallback: string) {
  const hit = sentences(text).find((p) =>
    keys.some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(p)),
  );
  return hit || fallback;
}

function chunks(text: string, max = 450) {
  const parts = sentences(text);
  const out: string[] = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + " " + p).trim().length > max) {
      if (cur) out.push(cur);
      cur = p.length > max ? p.slice(0, max) : p;
    } else {
      cur = cur ? `${cur} ${p}` : p;
    }
  }
  if (cur) out.push(cur);
  return out.length ? out : [text.slice(0, max)];
}

async function translateChunk(en: string) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(en.slice(0, 480))}&langpair=en|ta`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return en;
    const json = (await res.json()) as { responseData?: { translatedText?: string } };
    const ta = json.responseData?.translatedText?.trim();
    if (!ta || /please select|invalid|query length|myMEMORY/i.test(ta)) return en;
    return ta;
  } catch {
    return en;
  }
}

async function translateTa(en: string) {
  const parts = await Promise.all(chunks(en).map(translateChunk));
  return parts.join(" ");
}

function forTamilSource(en: string, sign: string, rasiId: string) {
  const rasi = RASIS.find((r) => r.id === rasiId);
  if (!rasi) return en;
  return en.replace(new RegExp(`\\b${sign}s?\\b`, "gi"), rasi.en);
}

function cleanTamil(ta: string, rasiId: string) {
  const rasi = RASIS.find((r) => r.id === rasiId);
  if (!rasi) return ta;
  let out = ta.replace(new RegExp(`\\b${rasi.latin}s?\\b`, "gi"), rasi.ta);
  if (rasi.id === "kadagam") out = out.replace(/புற்றுநோயாளி(?:கள்)?|புற்றுநோய்கள்|புற்றுநோய்/g, rasi.ta);
  return out;
}

async function fetchPeriod(sign: string, endpoint: "daily" | "weekly" | "monthly") {
  const res = await fetch(`${LIVE_BASE}/${endpoint}?sign=${encodeURIComponent(sign)}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: endpoint === "daily" ? 1800 : 7200 },
  });
  if (!res.ok) throw new Error(`horoscope ${res.status}`);
  const json = (await res.json()) as { data?: { date?: string; horoscope?: string } };
  const text = json.data?.horoscope?.trim();
  if (!text) throw new Error("empty horoscope");
  return { date: json.data?.date || bucket(endpoint), text };
}

async function fetchLiveText(sign: string, period: PeriodType, rasiId: string) {
  const rasi = RASIS.find((r) => r.id === rasiId);
  if (period === "yearly") {
    const [monthly, weekly] = await Promise.all([fetchPeriod(sign, "monthly"), fetchPeriod(sign, "weekly")]);
    const year = nowIST().y;
    const text = [
      `${year} yearly outlook for ${rasi?.latin || sign}.`,
      monthly.text,
      `This season also emphasises: ${sentences(weekly.text)[0] || weekly.text}`,
      rasi ? `Traditional qualities of this rasi include ${rasi.traitsEn}` : "",
    ]
      .filter(Boolean)
      .join(" ");
    return { date: String(year), text };
  }
  return fetchPeriod(sign, period);
}

async function toEntry(sign: string, period: PeriodType, date: string, en: string, rasiId: string): Promise<RasipalanEntry> {
  const luckBits = luck(sign, period, date);
  const generalEn = sentences(en).slice(0, period === "daily" ? 3 : 4).join(" ") || en;
  const themeEns = Object.fromEntries(
    THEMES.map((theme) => [theme.key, pickTheme(en, theme.keys, theme.fallbackEn)]),
  ) as Record<(typeof THEMES)[number]["key"], string>;

  const unique = Array.from(new Set([generalEn, ...Object.values(themeEns)]));
  const translated = new Map<string, string>();
  await Promise.all(
    unique.map(async (text) => {
      translated.set(text, cleanTamil(await translateTa(forTamilSource(text, sign, rasiId)), rasiId));
    }),
  );

  return {
    general: { ta: translated.get(generalEn) || generalEn, en: generalEn },
    career: { ta: translated.get(themeEns.career) || themeEns.career, en: themeEns.career },
    finance: { ta: translated.get(themeEns.finance) || themeEns.finance, en: themeEns.finance },
    family: { ta: translated.get(themeEns.family) || themeEns.family, en: themeEns.family },
    marriage: { ta: translated.get(themeEns.marriage) || themeEns.marriage, en: themeEns.marriage },
    health: { ta: translated.get(themeEns.health) || themeEns.health, en: themeEns.health },
    ...luckBits,
  };
}

async function buildLive(rasiId: string, period: PeriodType): Promise<LiveRasipalan> {
  const sign = rasiToApiSign(rasiId);
  try {
    const live = await fetchLiveText(sign, period, rasiId);
    const entry = await toEntry(sign, period, live.date, live.text, rasiId);
    return { live: true, date: live.date, period, sign, rasi: rasiId, entry };
  } catch {
    const fallback = defaultRasipalanMap()[rasiId]?.[period];
    return {
      live: false,
      date: bucket(period),
      period,
      sign,
      rasi: rasiId,
      entry: fallback,
    };
  }
}

export async function getLiveRasipalan(rasiId: string, period: PeriodType): Promise<LiveRasipalan> {
  const key = bucket(period);
  return unstable_cache(() => buildLive(rasiId, period), ["live-rasipalan-v3", rasiId, period, key], {
    revalidate: period === "daily" ? 1800 : period === "weekly" ? 3600 : 7200,
  })();
}
