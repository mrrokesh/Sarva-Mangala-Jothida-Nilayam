import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ஜோதிடர் பற்றி | Dr. Elangho Thirunavukkarasu",
  description: "முனைவர். இளங்கோ திருநாவுக்கரசு — சேலம். M.A. Astrology, Ph.D. (Astro), ஜோதிட மாநாட்டுப் பங்கேற்பு மற்றும் விருதுகள்.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
