export const SITE = {
  nameTa: "சர்வ மங்கலா ஜோதிட நிலையம்",
  nameEn: "Sarva Mangala Jothida Nilayam",
  astrologerTa: "முனைவர். இளங்கோ திருநாவுக்கரசு",
  astrologerEn: "Dr. ELANGHO THIRUNAVUKKARASU",
  qualifications: "B.Sc., M.A., M.Ed., M.A., M.Phil., M.A., Ph.D. (Astro)",
  roleTa: "நிறுவனர் / ஜோதிடர்",
  roleEn: "Founder / Astrologer",
  headlineTa: "உங்கள் வாழ்க்கைப் பாதையை ஜோதிடத்தின் மூலம் அறிந்திடுங்கள்",
  headlineEn: "Discover the Path of Your Life Through Vedic Astrology",
  phones: ["9976648444", "7373273273"],
  whatsapp: "9976648444",
  addressTa: [
    "3/131-A, தார்வின் நகர், ரத்னா கார்டன் முதல் வீதி,",
    "சேலம் அரசு மருத்துவக் கல்லூரி எதிரில்,",
    "இரும்பாலை ரோடு,",
    "S. கொல்லப்பட்டி (PO),",
    "சேலம் – 636030.",
  ],
  addressEn: [
    "3/131-A, Dharshini Nagar, Ratna Garden 1st Street,",
    "Opposite Salem Government Medical College,",
    "Irumpalai Road,",
    "S. Kollapatti (PO),",
    "Salem – 636030, Tamil Nadu, India.",
  ],
  mapsQuery:
    "3/131-A Dharshini Nagar Ratna Garden 1st Street opposite Salem Government Medical College Irumpalai Road S Kollapatti Salem 636030",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS ||
    "https://www.google.com/maps/search/?api=1&query=3%2F131-A+Dharshini+Nagar+Ratna+Garden+Irumpalai+Road+Salem+636030",
  vibeoPlayStore:
    process.env.NEXT_PUBLIC_VIBEO_PLAYSTORE ||
    "https://play.google.com/store/apps/details?id=com.mr_rokeshchat.com",
  vibeoWeb: process.env.NEXT_PUBLIC_VIBEO_WEB || "https://www.mrrokesh.com",
  vibeoDeepLink: process.env.NEXT_PUBLIC_VIBEO_DEEP_LINK || "vibeo://chat",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE || "",
  },
  images: {
    banner: "/images/brand/banner.jpeg",
    emblem: "/images/brand/channel-emblem.jpeg",
    elephantLeft: "/images/brand/elephant-left.png",
    elephantRight: "/images/brand/elephant-right.png",
    zodiac: "/images/brand/zodiac-wheel.png",
    om: "/images/brand/om-gold.png",
    sky: "/images/brand/hero-sky.png",
    chart: "/images/brand/horoscope-chart.png",
  },
} as const;

export const NAV = [
  { href: "/", ta: "முகப்பு", en: "Home" },
  { href: "/about", ta: "ஜோதிடர் பற்றி", en: "About" },
  { href: "/services", ta: "சேவைகள்", en: "Services" },
  { href: "/rasis", ta: "12 ராசிகள்", en: "12 Rasis" },
  { href: "/nakshatras", ta: "27 நட்சத்திரங்கள்", en: "27 Nakshatras" },
  { href: "/rasipalan", ta: "ராசிபலன்", en: "Rasipalan" },
  { href: "/insights", ta: "ஜோதிட குறிப்புகள்", en: "Insights" },
  { href: "/awards", ta: "விருதுகள்", en: "Awards" },
  { href: "/gallery", ta: "புகைப்படங்கள்", en: "Gallery" },
  { href: "/videos", ta: "காணொளிகள்", en: "Videos" },
  { href: "/consultation", ta: "ஆலோசனை முன்பதிவு", en: "Consultation" },
  { href: "/contact", ta: "தொடர்புக்கு", en: "Contact" },
] as const;

export const MOBILE_DOCK = [
  { href: "/", ta: "முகப்பு", en: "Home" },
  { href: "/rasipalan", ta: "ராசிபலன்", en: "Rasipalan" },
  { href: "/consultation", ta: "ஆலோசனை", en: "Book" },
  { href: "/gallery", ta: "படங்கள்", en: "Gallery" },
  { href: "/contact", ta: "தொடர்பு", en: "Contact" },
] as const;
