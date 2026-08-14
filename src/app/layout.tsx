import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Noto_Sans_Tamil, Noto_Serif_Tamil, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { SITE } from "@/lib/site";
import "./globals.css";

const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil", display: "swap" });
const tamilSerif = Noto_Serif_Tamil({ subsets: ["tamil"], weight: ["400", "700"], variable: "--font-tamil-serif", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${SITE.nameTa} | ${SITE.astrologerEn} | Astrologer in Salem`,
    template: `%s | ${SITE.nameEn}`,
  },
  description:
    "சர்வ மங்கலா ஜோதிட நிலையம், சேலம் — முனைவர். இளங்கோ திருநாவுக்கரசு. ஜாதகம், திருமணப் பொருத்தம், ராசிபலன் மற்றும் ஜோதிட ஆலோசனை.",
  keywords: [
    "Astrologer in Salem",
    "Salem astrology consultation",
    "ஜோதிடர் சேலம்",
    "சேலம் ஜோதிட நிலையம்",
    "ஜாதகம் சேலம்",
    "திருமண பொருத்தம் சேலம்",
    "Tamil astrologer",
    "Horoscope consultation Salem",
    "Rasipalan Tamil",
    "Dr Elangho Thirunavukkarasu",
  ],
  openGraph: {
    title: `${SITE.nameTa} | ${SITE.astrologerEn}`,
    description: "Traditional Tamil Vedic astrology consultation in Salem.",
    images: [SITE.images.banner],
    locale: "ta_IN",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: SITE.nameEn,
        alternateName: SITE.nameTa,
        telephone: SITE.phones.map((p) => `+91${p}`),
        address: {
          "@type": "PostalAddress",
          streetAddress: "3/131-A, Dharshini Nagar, Ratna Garden 1st Street, Irumpalai Road",
          addressLocality: "Salem",
          postalCode: "636030",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      },
      {
        "@type": "Person",
        name: SITE.astrologerEn,
        alternateName: SITE.astrologerTa,
        jobTitle: "Astrologer",
        worksFor: { "@type": "Organization", name: SITE.nameEn },
      },
    ],
  };

  return (
    <html lang="ta" className={`${tamil.variable} ${tamilSerif.variable} ${cinzel.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink pb-[5.25rem] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
