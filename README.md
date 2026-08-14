# சர்வ மங்கலா ஜோதிட நிலையம்

**Sarva Mangala Jothida Nilayam** is a bilingual (தமிழ் default / English) website for astrologer **Dr. Elangho Thirunavukkarasu** in Salem, Tamil Nadu.

Local run: [http://localhost:3000](http://localhost:3000)

Repository: [mrrokesh/Sarva-Mangala-Jothida-Nilayam](https://github.com/mrrokesh/Sarva-Mangala-Jothida-Nilayam)

---

## About

The site presents traditional Tamil Vedic astrology as a calm temple-style consultation studio:

- Welcome profile card and golden zodiac loader (Om in the rasi wheel)
- Hero with rotating rasi ring and ॐ centre
- About timeline from supplied certificates, plaques, and conference photographs
- 12 Rasis, 27 Nakshatras, Nava Grahas
- Live daily / weekly / monthly / yearly rasipalan
- Daily Salem panchangam (tithi, nakshatra, rahu kalam, and related timings)
- Two-person marriage matching request (10 poruthams explained; reading by the astrologer)
- Services, gallery, FAQ, privacy, terms, and disclaimer
- Consultation booking with Vibeo messaging + WhatsApp fallback
- Admin CMS for profile text, social links, and rasipalan fallback copy

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
| Live rasipalan | `/api/rasipalan` → [Free Horoscope API](https://www.freehoroscopeapi.com/) (no key), Tamil via MyMemory |
| Panchangam | `/api/panchangam` → sidereal tithi/nakshatra for Salem + sunrise/sunset |

---

## Pages

| Path | Content |
| --- | --- |
| `/` | Home — loader, welcome card, hero, panchangam, rasis, services |
| `/about` | Biography, credentials, and photograph gallery |
| `/services` | Horoscope, matching, career, vastu, and related guidance |
| `/rasipalan` | Today’s panchangam, live rasipalan, 12 rasis, 27 nakshatras |
| `/matching` | Bride + groom birth details and the ten poruthams |
| `/consultation` | Booking form and how the process works |
| `/contact` | Address, phone, WhatsApp, Vibeo, maps, social |
| `/faq` | Booking, matching, panchangam, and disclaimer questions |
| `/admin` | CMS (not indexed) |

`/rasis` and `/nakshatras` redirect into `/rasipalan`.

---

## Live rasipalan

Public readings are fetched live (not typed into Admin each day):

| Period | Refresh |
| --- | --- |
| Daily | New text after midnight IST |
| Weekly | New text each week |
| Monthly | New text each month |
| Yearly | Year outlook built from the live monthly + weekly feed (that API has no yearly endpoint) |

Lucky colour, number, and muhurtham rotate with each period. If the live feed is down, Admin CMS copy is used as fallback.

This is general sun-sign guidance, not a personal jathagam.

---

## Panchangam

`/api/panchangam` returns Salem (11.66°N, 78.15°E) timings for today: weekday, tithi, nakshatra + pada, yoga, karana, moon rasi, sunrise, sunset, rahu kalam, yamagandam, and gulikai. Confirm muhurtham with the astrologer before important events.

---

## Marriage matching

`/matching` collects contact details plus **bride and groom** name, date, time, and place of birth. The request is stored like any consultation and forwarded to Vibeo/WhatsApp. The page explains the ten traditional poruthams; it does **not** auto-score compatibility.

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
   - Rasipalan fallback copy (daily / weekly / monthly / yearly) used only if the live API fails
4. Review consultation and matching requests (also forwarded to Vibeo when the webhook is set)

Do not commit `.env.local` or `content/consultations.json`.

---

## Consultation → Vibeo

Form posts go to `/api/consultation`, which:

1. Stores the enquiry in `content/consultations.json`
2. POSTs a formatted message to `VIBEO_WEBHOOK_URL` (MR ROKESH / Vibeo)
3. Returns a Vibeo deep link and a WhatsApp fallback

Matching requests include both charts in the same message. Until the webhook is configured, enquiries still appear in Admin. Visitors can continue in the [Vibeo Android app](https://play.google.com/store/apps/details?id=com.mr_rokeshchat.com).

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

Astrological information and consultations provided through this website are intended for guidance based on traditional astrological practices and should not be treated as a substitute for professional medical, legal, or financial advice.

---

## License

Apache-2.0. See [LICENSE](LICENSE).
