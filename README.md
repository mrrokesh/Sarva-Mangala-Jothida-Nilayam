# சர்வ மங்கலா ஜோதிட நிலையம்

**Sarva Mangala Jothida Nilayam** is a bilingual (தமிழ் / English) website for astrologer **Dr. Elangho Thirunavukkarasu** in Salem, Tamil Nadu.

Live local run: `http://localhost:3000`

Repository: [mrrokesh/Sarva-Mangala-Jothida-Nilayam](https://github.com/mrrokesh/Sarva-Mangala-Jothida-Nilayam)

---

## About

The site presents traditional Tamil Vedic astrology through a modern, cinematic web experience:

- Welcome profile card and golden zodiac loader
- Hero with temple elephants, rotating rasi wheel, and astrologer portrait
- About timeline built from supplied certificates, plaques, and conference photographs
- 12 Rasis, 27 Nakshatras, Nava Grahas, and a South Indian horoscope chart
- Services, rasipalan (daily / weekly / monthly), awards, gallery, and videos
- Consultation booking with Vibeo messaging + WhatsApp fallback
- Admin CMS for rasipalan, profile text, and social links

Display name:

**முனைவர். இளங்கோ திருநாவுக்கரசு**  
**Dr. ELANGHO THIRUNAVUKKARASU**  
B.Sc., M.A., M.Ed., M.A., M.Phil., M.A., Ph.D. (Astro)

Certificates and awards are shown as biographical records. The site does **not** claim a government medical licence, guaranteed outcomes, or a substitute for professional medical, legal, or financial advice.

---

## Stack

| Layer | Technology |
| --- | --- |
| App | Next.js 15 (App Router), React 19, TypeScript |
| Style | Tailwind CSS, Cinzel / Playfair / Noto Sans Tamil |
| Motion / 3D | Framer Motion, Three.js, React Three Fiber, Drei |
| CMS | File-based admin at `/admin` (`content/site.json`) |
| Enquiries | `/api/consultation` → JSON log + Vibeo webhook + WhatsApp |

---

## Pages

| Path | Content |
| --- | --- |
| `/` | Home — loader, welcome card, hero, services preview |
| `/about` | Biography and credential timeline |
| `/services` | Horoscope, matching, career, vastu, and related guidance |
| `/rasis` | Interactive 12 Rasi wheel |
| `/nakshatras` | 27 Nakshatra constellation map |
| `/rasipalan` | Daily, weekly, and monthly readings |
| `/awards` | Awards and conference recognition |
| `/gallery` | Filtered photograph gallery |
| `/videos` | Astrology explanation videos |
| `/consultation` | Booking form |
| `/contact` | Address, phone, WhatsApp, Vibeo, maps, social |
| `/admin` | CMS (not indexed) |

---

## Setup

```bash
git clone https://github.com/mrrokesh/Sarva-Mangala-Jothida-Nilayam.git
cd Sarva-Mangala-Jothida-Nilayam
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

---

## Environment

Copy `.env.example` to `.env.local`. Important keys:

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `VIBEO_WEBHOOK_URL` | Vibeo inbox webhook for new consultations |
| `VIBEO_API_KEY` | Optional bearer token for Vibeo |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number (default `9976648444`) |
| `NEXT_PUBLIC_INSTAGRAM` | Official Instagram URL (optional) |
| `NEXT_PUBLIC_FACEBOOK` | Official Facebook URL (optional) |
| `NEXT_PUBLIC_YOUTUBE` | Official YouTube URL (optional) |

Empty social URLs stay inactive so the site never invents profiles. Add them later in Admin or `.env.local`.

---

## Admin CMS

1. Open `/admin`
2. Sign in with `ADMIN_PASSWORD`
3. Update:
   - Tamil / English intro
   - Instagram, Facebook, YouTube URLs
   - Daily, weekly, and monthly rasipalan for each rasi
4. Review consultation requests (also forwarded to Vibeo when the webhook is set)

Do not commit `.env.local` or `content/consultations.json`.

---

## Consultation → Vibeo

Form posts go to `/api/consultation`, which:

1. Stores the enquiry in `content/consultations.json`
2. POSTs a formatted message to `VIBEO_WEBHOOK_URL` (MR ROKESH / Vibeo)
3. Returns a Vibeo deep link and a WhatsApp fallback

Until the webhook is configured, enquiries still appear in Admin. Visitors can continue in the [Vibeo Android app](https://play.google.com/store/apps/details?id=com.mr_rokeshchat.com).

---

## Contact (from supplied material)

**சர்வ மங்கலா ஜோதிட நிலையம்**  
3/131-A, Dharshini Nagar, Ratna Garden 1st Street,  
Opposite Salem Government Medical College,  
Irumpalai Road, S. Kollapatti (PO),  
Salem – 636030.

Phone: **99766 48444** · **73732 73273**

---

## Disclaimer

இத்தளத்தில் வழங்கப்படும் ஜோதிட தகவல்கள் மற்றும் ஆலோசனைகள் பாரம்பரிய ஜோதிடக் கோட்பாடுகளின் அடிப்படையிலான வழிகாட்டுதலுக்காக மட்டுமே. மருத்துவம், சட்டம், நிதி அல்லது பிற தொழில்முறை ஆலோசனைகளுக்கு மாற்றாக கருதப்படக் கூடாது.

Astrological information and consultations provided through this website are intended for guidance based on traditional astrological practices and should not be treated as a substitute for professional medical, legal, financial or other specialist advice.

---

## License

Apache-2.0. See [LICENSE](LICENSE).
