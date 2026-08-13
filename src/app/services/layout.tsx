import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ஜோதிட சேவைகள் | Horoscope & Marriage Matching Salem",
  description: "ஜாதகப் பலன், திருமணப் பொருத்தம், தொழில் ஜோதிடம், முகூர்த்தம் மற்றும் வாஸ்து ஆலோசனை — சேலம்.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
