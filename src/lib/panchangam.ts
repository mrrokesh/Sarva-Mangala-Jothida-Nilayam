import { NAKSHATRAS } from "./nakshatras";
import { RASIS } from "./rasis";

export type Named = { ta: string; en: string };
export type TimeSpan = { start: string; end: string };

export type Panchangam = {
  date: string;
  place: { ta: string; en: string };
  vara: Named;
  tithi: Named & { paksha: Named };
  nakshatra: Named & { pada: number };
  yoga: Named;
  karana: Named;
  moonRasi: Named;
  sunrise: string;
  sunset: string;
  rahuKalam: TimeSpan;
  yamagandam: TimeSpan;
  gulikai: TimeSpan;
};

const TITHI: Named[] = [
  { ta: "பிரதமை", en: "Prathamai" },
  { ta: "துவிதியை", en: "Dvitiya" },
  { ta: "திருதியை", en: "Tritiya" },
  { ta: "சதுர்த்தி", en: "Chaturthi" },
  { ta: "பஞ்சமி", en: "Panchami" },
  { ta: "சஷ்டி", en: "Shashti" },
  { ta: "சப்தமி", en: "Saptami" },
  { ta: "அஷ்டமி", en: "Ashtami" },
  { ta: "நவமி", en: "Navami" },
  { ta: "தசமி", en: "Dashami" },
  { ta: "ஏகாதசி", en: "Ekadashi" },
  { ta: "துவாதசி", en: "Dwadashi" },
  { ta: "திரயோதசி", en: "Trayodashi" },
  { ta: "சதுர்த்தசி", en: "Chaturdashi" },
  { ta: "பௌர்ணமி", en: "Pournami" },
];

const AMAVASYA: Named = { ta: "அமாவாசை", en: "Amavasya" };
const SHUKLA: Named = { ta: "சுக்ல பட்சம்", en: "Shukla Paksha" };
const KRISHNA: Named = { ta: "கிருஷ்ண பட்சம்", en: "Krishna Paksha" };

const VARA: Named[] = [
  { ta: "ஞாயிறு", en: "Sunday" },
  { ta: "திங்கள்", en: "Monday" },
  { ta: "செவ்வாய்", en: "Tuesday" },
  { ta: "புதன்", en: "Wednesday" },
  { ta: "வியாழன்", en: "Thursday" },
  { ta: "வெள்ளி", en: "Friday" },
  { ta: "சனி", en: "Saturday" },
];

const YOGA: Named[] = [
  { ta: "விஷ்கம்பம்", en: "Vishkambha" },
  { ta: "ப்ரீதி", en: "Preeti" },
  { ta: "ஆயுஷ்மான்", en: "Ayushman" },
  { ta: "சௌபாக்யம்", en: "Saubhagya" },
  { ta: "சோபனம்", en: "Shobhana" },
  { ta: "அதிகண்டம்", en: "Atiganda" },
  { ta: "சுகர்மம்", en: "Sukarma" },
  { ta: "திருதி", en: "Dhriti" },
  { ta: "சூலம்", en: "Shoola" },
  { ta: "கண்டம்", en: "Ganda" },
  { ta: "விருத்தி", en: "Vriddhi" },
  { ta: "த்ருவம்", en: "Dhruva" },
  { ta: "வியாகாதம்", en: "Vyaghata" },
  { ta: "ஹர்ஷணம்", en: "Harshana" },
  { ta: "வஜ்ரம்", en: "Vajra" },
  { ta: "சித்தி", en: "Siddhi" },
  { ta: "வியதீபாதம்", en: "Vyatipata" },
  { ta: "வரியான்", en: "Variyan" },
  { ta: "பரிகம்", en: "Parigha" },
  { ta: "சிவம்", en: "Shiva" },
  { ta: "சித்தம்", en: "Siddha" },
  { ta: "சாத்யம்", en: "Sadhya" },
  { ta: "சுபம்", en: "Shubha" },
  { ta: "சுக்லம்", en: "Shukla" },
  { ta: "பிரஹ்மம்", en: "Brahma" },
  { ta: "ஐந்திரம்", en: "Indra" },
  { ta: "வைதிருதி", en: "Vaidhriti" },
];

const KARANA_REPEAT: Named[] = [
  { ta: "பவம்", en: "Bava" },
  { ta: "பாலவம்", en: "Balava" },
  { ta: "கௌலவம்", en: "Kaulava" },
  { ta: "தைதிலம்", en: "Taitila" },
  { ta: "கரம்", en: "Gara" },
  { ta: "வணிஜம்", en: "Vanija" },
  { ta: "விஷ்டி", en: "Vishti" },
];

const KARANA_FIXED: Named[] = [
  { ta: "கிம்ஸ்துக்னம்", en: "Kimstughna" },
  { ta: "சகுனி", en: "Shakuni" },
  { ta: "சதுஷ்பாதம்", en: "Chatushpada" },
  { ta: "நாகம்", en: "Naga" },
];

const RAHU_EIGHTH = [8, 2, 7, 5, 6, 4, 3];
const YAMA_EIGHTH = [5, 4, 3, 2, 1, 7, 6];
const GULIKA_EIGHTH = [7, 6, 5, 4, 3, 2, 1];

const SALEM = { lat: 11.6643, lon: 78.146 };

function norm360(d: number) {
  return ((d % 360) + 360) % 360;
}

function rad(d: number) {
  return (d * Math.PI) / 180;
}

function julianDate(d: Date) {
  return d.getTime() / 86400000 + 2440587.5;
}

function sunTropical(jd: number) {
  const n = jd - 2451545.0;
  const L = norm360(280.460 + 0.9856474 * n);
  const g = rad(norm360(357.528 + 0.9856003 * n));
  return norm360(L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

function moonTropical(jd: number) {
  const T = (jd - 2451545.0) / 36525;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  const D = 297.8501921 + 445267.1114034 * T;
  const M = 357.5291092 + 35999.0502909 * T;
  const Mp = 134.9633964 + 477198.8675055 * T;
  const F = 93.272095 + 483202.0175273 * T;
  const lon =
    Lp +
    6.288774 * Math.sin(rad(Mp)) +
    1.274027 * Math.sin(rad(2 * D - Mp)) +
    0.658314 * Math.sin(rad(2 * D)) +
    0.213616 * Math.sin(rad(2 * Mp)) -
    0.185596 * Math.sin(rad(M)) -
    0.114336 * Math.sin(rad(2 * F)) +
    0.058793 * Math.sin(rad(2 * D - 2 * Mp)) +
    0.057212 * Math.sin(rad(2 * D - M - Mp)) +
    0.05332 * Math.sin(rad(2 * D + Mp)) +
    0.045874 * Math.sin(rad(2 * D - M)) +
    0.041024 * Math.sin(rad(Mp - M));
  return norm360(lon);
}

function lahiri(jd: number) {
  const t = (jd - 2451545.0) / 36525;
  return 23.852931277 + 1.396563673 * t + 0.0003087 * t * t;
}

function karanaAt(index: number): Named {
  if (index === 0) return KARANA_FIXED[0];
  if (index >= 57) return KARANA_FIXED[index - 56];
  return KARANA_REPEAT[(index - 1) % 7];
}

function istParts(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

function fmtIst(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

function eighth(sunriseMs: number, sunsetMs: number, slot: number): TimeSpan {
  const part = (sunsetMs - sunriseMs) / 8;
  const start = new Date(sunriseMs + (slot - 1) * part);
  const end = new Date(sunriseMs + slot * part);
  return { start: fmtIst(start.toISOString()), end: fmtIst(end.toISOString()) };
}

async function sunTimes(date: string) {
  try {
    const url = `https://api.sunrise-sunset.org/json?lat=${SALEM.lat}&lng=${SALEM.lon}&date=${date}&formatted=0`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("sunrise");
    const json = (await res.json()) as { results?: { sunrise?: string; sunset?: string }; status?: string };
    if (json.status !== "OK" || !json.results?.sunrise || !json.results?.sunset) throw new Error("sunrise");
    return { sunrise: json.results.sunrise, sunset: json.results.sunset };
  } catch {
    return { sunrise: `${date}T00:30:00.000Z`, sunset: `${date}T13:00:00.000Z` };
  }
}

export async function getPanchangam(): Promise<Panchangam> {
  const now = new Date();
  const { date, weekday } = istParts(now);
  const jd = julianDate(now);
  const ayanamsa = lahiri(jd);
  const sun = norm360(sunTropical(jd) - ayanamsa);
  const moon = norm360(moonTropical(jd) - ayanamsa);
  const elong = norm360(moon - sun);
  const tithiIndex = Math.min(29, Math.floor(elong / 12));
  const shukla = tithiIndex < 15;
  const tithiNum = tithiIndex % 15;
  const tithi = !shukla && tithiNum === 14 ? AMAVASYA : TITHI[tithiNum];
  const nakIndex = Math.min(26, Math.floor(moon / (360 / 27)));
  const pada = Math.min(4, Math.floor((moon % (360 / 27)) / (360 / 108)) + 1);
  const yogaIndex = Math.min(26, Math.floor(norm360(sun + moon) / (360 / 27)));
  const karanaIndex = Math.min(59, Math.floor(elong / 6));
  const rasiIndex = Math.min(11, Math.floor(moon / 30));
  const nak = NAKSHATRAS[nakIndex];
  const rasi = RASIS[rasiIndex];
  const sunDay = await sunTimes(date);
  const rise = new Date(sunDay.sunrise).getTime();
  const set = new Date(sunDay.sunset).getTime();

  return {
    date,
    place: { ta: "சேலம்", en: "Salem" },
    vara: VARA[weekday],
    tithi: { ...tithi, paksha: shukla ? SHUKLA : KRISHNA },
    nakshatra: { ta: nak.ta, en: nak.en, pada },
    yoga: YOGA[yogaIndex],
    karana: karanaAt(karanaIndex),
    moonRasi: { ta: rasi.ta, en: rasi.latin },
    sunrise: fmtIst(sunDay.sunrise),
    sunset: fmtIst(sunDay.sunset),
    rahuKalam: eighth(rise, set, RAHU_EIGHTH[weekday]),
    yamagandam: eighth(rise, set, YAMA_EIGHTH[weekday]),
    gulikai: eighth(rise, set, GULIKA_EIGHTH[weekday]),
  };
}
