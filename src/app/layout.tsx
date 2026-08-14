import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/layout/Providers";
import { SITE } from "@/lib/site";
import "./globals.css";
import "@fontsource/noto-sans-tamil/tamil-400.css";
import "@fontsource/noto-sans-tamil/tamil-700.css";
import "@fontsource/noto-sans-tamil/latin-400.css";
import "@fontsource/noto-sans-tamil/latin-700.css";
import "@fontsource/noto-serif-tamil/tamil-400.css";
import "@fontsource/noto-serif-tamil/tamil-700.css";
import "@fontsource/noto-serif-tamil/latin-400.css";
import "@fontsource/noto-serif-tamil/latin-700.css";
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/cinzel/latin-700.css";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-600.css";

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
    <html lang="ta">
      <body className="min-h-screen bg-ink pb-[5.25rem] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
