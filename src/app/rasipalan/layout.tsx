import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "இன்றைய ராசிபலன் | Today’s Rasipalan Tamil",
  description: "12 ராசிகளுக்கும் இன்றைய, வார, மாத ராசிபலன் — சர்வ மங்கலா ஜோதிட நிலையம், சேலம்.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
