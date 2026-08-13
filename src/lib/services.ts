export const SERVICES = [
  { id: "horoscope", ta: "ஜாதகப் பலன்", en: "Horoscope Reading", descTa: "பிறந்த ஜாதகத்தின் அடிப்படையில் வாழ்க்கைப் பாதை குறித்த பாரம்பரிய ஜோதிட வழிகாட்டுதல்.", descEn: "Traditional astrological guidance on life direction based on the birth chart." },
  { id: "matching", ta: "திருமணப் பொருத்தம்", en: "Marriage Compatibility", descTa: "இரு ஜாதகங்களையும் ஒப்பிட்டு பொருத்தம் குறித்த ஆலோசனை.", descEn: "Compatibility consultation by comparing two birth charts." },
  { id: "marriage", ta: "திருமண ஜாதகம்", en: "Marriage Consultation", descTa: "திருமண காலம், பொருத்தம் மற்றும் குடும்ப நல்லிணக்கம் குறித்த ஆலோசனை.", descEn: "Guidance on marriage timing, matching and family harmony." },
  { id: "career", ta: "தொழில் / வியாபார ஜோதிடம்", en: "Career & Business Astrology", descTa: "தொழில் தேர்வு, வியாபார நேரம் மற்றும் முயற்சிகள் குறித்த ஜோதிடப் பார்வை.", descEn: "Astrological perspective on career choice, business timing and effort." },
  { id: "education", ta: "கல்வி ஜோதிடம்", en: "Education Guidance", descTa: "கல்விப் பாதை, தேர்வுகள் மற்றும் கற்றல் திசை குறித்த வழிகாட்டுதல்.", descEn: "Guidance on educational path, examinations and learning direction." },
  { id: "child", ta: "குழந்தை ஜாதகம்", en: "Child Horoscope", descTa: "குழந்தை ஜாதகத்தின் அடிப்படையில் குணம், கல்வி மற்றும் குடும்பச் சூழல் குறித்த ஆலோசனை.", descEn: "Consultation on a child's nature, education and family environment from the birth chart." },
  { id: "family", ta: "குடும்ப ஆலோசனை", en: "Family Consultation", descTa: "குடும்ப உறவுகள் மற்றும் இல்ல அமைதி குறித்த ஜோதிட ஆலோசனை.", descEn: "Astrological consultation on family relationships and household harmony." },
  { id: "dosha", ta: "கிரக தோஷ ஆய்வு", en: "Dosha Analysis", descTa: "ஜாதகத்தில் காணப்படும் தோஷங்கள் குறித்த பாரம்பரிய ஆய்வு மற்றும் வழிகாட்டுதல்.", descEn: "Traditional study of chart afflictions with guidance — not a guaranteed remedy." },
  { id: "muhurtham", ta: "முகூர்த்த நாள்", en: "Auspicious Date Selection", descTa: "திருமணம், வீட்டுப் புகுவிழா, தொழில் தொடக்கம் போன்ற நிகழ்வுகளுக்கு முகூர்த்தத் தேர்வு.", descEn: "Selection of auspicious dates for marriage, housewarming, business openings and similar events." },
  { id: "name", ta: "பெயர் பரிந்துரை", en: "Name Guidance", descTa: "ஜாதக எழுத்து மற்றும் நட்சத்திர அடிப்படையிலான பெயர் வழிகாட்டுதல்.", descEn: "Name guidance based on chart letters and nakshatra." },
  { id: "birth", ta: "பிறந்த ஜாதகம்", en: "Birth Horoscope Analysis", descTa: "லக்னம், கிரக நிலைகள் மற்றும் தசை அடிப்படையிலான விரிவான ஜாதக ஆய்வு.", descEn: "Detailed birth-chart study of lagna, planetary positions and dasa periods." },
  { id: "vastu", ta: "வாஸ்து ஆலோசனை", en: "Vastu Consultation", descTa: "இல்லம் மற்றும் வணிக இடம் குறித்த பாரம்பரிய வாஸ்து வழிகாட்டுதல்.", descEn: "Traditional Vastu guidance for home and workplace." },
] as const;

export const CONSULTATION_TYPES = [
  { id: "horoscope", ta: "ஜாதகப் பலன்", en: "Horoscope Reading" },
  { id: "matching", ta: "திருமணப் பொருத்தம்", en: "Marriage Matching" },
  { id: "career", ta: "தொழில்", en: "Career" },
  { id: "business", ta: "வியாபாரம்", en: "Business" },
  { id: "education", ta: "கல்வி", en: "Education" },
  { id: "family", ta: "குடும்பம்", en: "Family" },
  { id: "child", ta: "குழந்தை ஜாதகம்", en: "Child Horoscope" },
  { id: "muhurtham", ta: "முகூர்த்தம்", en: "Muhurtham" },
  { id: "dosha", ta: "தோஷ ஆய்வு", en: "Dosha" },
  { id: "vastu", ta: "வாஸ்து", en: "Vastu" },
  { id: "other", ta: "மற்றவை", en: "Other" },
] as const;

export const CONSULTATION_MODES = [
  { id: "direct", ta: "நேரில்", en: "In-person" },
  { id: "phone", ta: "தொலைபேசி", en: "Phone" },
  { id: "whatsapp", ta: "வாட்ஸ்அப்", en: "WhatsApp" },
  { id: "vibeo", ta: "Vibeo", en: "Vibeo" },
  { id: "video", ta: "வீடியோ அழைப்பு", en: "Video Call" },
] as const;
