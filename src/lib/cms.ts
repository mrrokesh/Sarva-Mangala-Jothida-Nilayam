import { promises as fs } from "fs";
import path from "path";
import { defaultRasipalanMap, type PeriodType, type RasipalanEntry } from "./rasipalan";
import { SITE } from "./site";

const ROOT = path.join(process.cwd(), "content");

export type SiteContent = {
  profile: {
    introTa: string;
    introEn: string;
    instagram: string;
    facebook: string;
    youtube: string;
    announcementTa: string;
    announcementEn: string;
  };
  rasipalan: Record<string, Record<PeriodType, RasipalanEntry>>;
  testimonialsPublished: boolean;
};

const defaultContent = (): SiteContent => ({
  profile: {
    introTa:
      "முனைவர். இளங்கோ திருநாவுக்கரசு, சேலத்தில் சர்வ மங்கலா ஜோதிட நிலையத்தை நடத்துகிறார். ஜாதக ஆய்வு, திருமணப் பொருத்தம், தொழில் மற்றும் குடும்ப ஆலோசனை, முகூர்த்தத் தேர்வு ஆகியவற்றில் பாரம்பரிய வழிகாட்டுதல் வழங்குகிறார். அண்ணாமலைப் பல்கலைக்கழகத்துடன் இணைந்த M.A. Astrology பயிற்சி, ஜோதிட மாநாட்டுப் பங்கேற்பு மற்றும் விருதுகள் அவரது பயணத்தின் பகுதியாக உள்ளன.",
    introEn:
      "Dr. Elangho Thirunavukkarasu leads Sarva Mangala Jothida Nilayam in Salem. He offers traditional guidance in horoscope study, marriage matching, career and family consultation, and muhurtham selection. His journey includes M.A. Astrology studies associated with Annamalai University, conference participation and recognitions from astrology gatherings.",
    instagram: SITE.social.instagram,
    facebook: SITE.social.facebook,
    youtube: SITE.social.youtube,
    announcementTa: "",
    announcementEn: "",
  },
  rasipalan: defaultRasipalanMap(),
  testimonialsPublished: false,
});

async function ensure() {
  await fs.mkdir(ROOT, { recursive: true });
  const file = path.join(ROOT, "site.json");
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(defaultContent(), null, 2), "utf8");
  }
  return file;
}

export async function readContent(): Promise<SiteContent> {
  const file = await ensure();
  const raw = await fs.readFile(file, "utf8");
  const parsed = JSON.parse(raw) as SiteContent;
  const base = defaultContent();
  return {
    ...base,
    ...parsed,
    profile: { ...base.profile, ...parsed.profile },
    rasipalan: { ...base.rasipalan, ...parsed.rasipalan },
  };
}

export async function writeContent(next: SiteContent) {
  const file = await ensure();
  await fs.writeFile(file, JSON.stringify(next, null, 2), "utf8");
}

export type StoredConsultation = ConsultationRecord;

export type ConsultationRecord = {
  id: string;
  createdAt: string;
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
  vibeo?: { ok: boolean; skipped?: boolean; reason?: string };
};

export async function saveConsultation(row: ConsultationRecord) {
  await fs.mkdir(ROOT, { recursive: true });
  const file = path.join(ROOT, "consultations.json");
  let list: ConsultationRecord[] = [];
  try {
    list = JSON.parse(await fs.readFile(file, "utf8")) as ConsultationRecord[];
  } catch {
    list = [];
  }
  list.unshift(row);
  await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
  return row;
}

export async function listConsultations() {
  const file = path.join(ROOT, "consultations.json");
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as ConsultationRecord[];
  } catch {
    return [];
  }
}
