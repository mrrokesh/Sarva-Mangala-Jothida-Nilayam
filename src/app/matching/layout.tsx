import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "திருமணப் பொருத்தம் | Marriage Matching Salem",
  description: "மணமகன் · மணமகள் பிறப்பு விவரங்களுடன் திருமணப் பொருத்தம் ஆலோசனை — சர்வ மங்கலா ஜோதிட நிலையம், சேலம்.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
