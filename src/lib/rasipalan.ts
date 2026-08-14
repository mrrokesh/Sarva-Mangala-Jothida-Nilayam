import { RASIS } from "./rasis";

export type PeriodType = "daily" | "weekly" | "monthly" | "yearly";

export type RasipalanEntry = {
  general: { ta: string; en: string };
  career: { ta: string; en: string };
  finance: { ta: string; en: string };
  family: { ta: string; en: string };
  marriage: { ta: string; en: string };
  health: { ta: string; en: string };
  luckyColor: { ta: string; en: string };
  luckyNumber: { ta: string; en: string };
  auspiciousTime: { ta: string; en: string };
};

const seed: RasipalanEntry = {
  general: {
    ta: "இன்று பொறுமையுடன் முடிவு எடுங்கள். பாரம்பரிய ஜோதிட வழிகாட்டுதல் மட்டுமே இது; உறுதியான முடிவு அல்ல.",
    en: "Take decisions with patience today. This is traditional astrological guidance, not a guaranteed outcome.",
  },
  career: {
    ta: "பணி மற்றும் வியாபாரத்தில் தெளிவான உரையாடல் உதவும். புதிய ஒப்பந்தங்களை அவசரமாக முடிக்க வேண்டாம்.",
    en: "Clear conversation helps at work and in business. Avoid rushing new agreements.",
  },
  finance: {
    ta: "செலவுகளை கணக்கிட்டு நடந்து கொள்ளுங்கள். பெரிய முதலீட்டு முடிவுகளுக்கு கூடுதல் ஆலோசனை பெறுங்கள்.",
    en: "Keep spending measured. Seek further advice before large investment decisions.",
  },
  family: {
    ta: "குடும்ப உறவுகளில் இனிமையான சொற்கள் அமைதியைக் கொணரும்.",
    en: "Gentle words at home can restore calm.",
  },
  marriage: {
    ta: "உறவுகளில் புரிதல் முக்கியம். தம்பதிகள் பேசி முடிவு செய்வது நலம்.",
    en: "Understanding matters in relationships. Discuss before deciding.",
  },
  health: {
    ta: "ஓய்வு, நீர் அருந்துதல் மற்றும் மருத்துவ ஆலோசனையை புறக்கணிக்காதீர்கள்.",
    en: "Rest, hydration and professional medical advice remain essential.",
  },
  luckyColor: { ta: "பொன் மஞ்சள் / வெண்ணிறம்", en: "Gold / ivory" },
  luckyNumber: { ta: "3, 9", en: "3, 9" },
  auspiciousTime: { ta: "காலை 6:30 – 8:00", en: "6:30 – 8:00 AM" },
};

function clone(entry: RasipalanEntry): RasipalanEntry {
  return JSON.parse(JSON.stringify(entry)) as RasipalanEntry;
}

export function defaultRasipalanMap() {
  const map: Record<string, Record<PeriodType, RasipalanEntry>> = {};
  for (const r of RASIS) {
    map[r.id] = {
      daily: clone(seed),
      weekly: {
        ...clone(seed),
        general: {
          ta: `இந்த வாரம் ${r.ta} ராசிக்கு பொறுப்புடன் திட்டமிடுதல் நலம். இது பொது வழிகாட்டுதல் மட்டுமே.`,
          en: `This week favours measured planning for ${r.latin}. General guidance only.`,
        },
      },
      monthly: {
        ...clone(seed),
        general: {
          ta: `இந்த மாதம் ${r.ta} ராசிக்கு குடும்பம் மற்றும் தொழிலில் சமநிலை காக்கவும்.`,
          en: `This month, ${r.latin} may benefit from balance between family and work.`,
        },
      },
      yearly: {
        ...clone(seed),
        general: {
          ta: `இந்த ஆண்டு ${r.ta} ராசிக்கு பொறுமையும் சமநிலையும் முக்கியம். இது பொது வழிகாட்டுதல் மட்டுமே.`,
          en: `This year, ${r.latin} benefits from patience and balance. General guidance only.`,
        },
      },
    };
  }
  return map;
}

export function rasiToApiSign(rasiId: string) {
  return RASIS.find((r) => r.id === rasiId)?.latin.toLowerCase() || "aries";
}

export const PERIODS: PeriodType[] = ["daily", "weekly", "monthly", "yearly"];

export type LiveRasipalan = {
  live: boolean;
  date: string;
  period: PeriodType;
  sign: string;
  rasi: string;
  entry: RasipalanEntry;
};
