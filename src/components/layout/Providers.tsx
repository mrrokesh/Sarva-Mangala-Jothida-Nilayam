"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { Loader } from "@/components/experience/Loader";
import { WelcomePopup } from "@/components/experience/WelcomePopup";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Loader />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-gold focus:px-3 focus:py-2 focus:text-ink">
        Skip
      </a>
      <Navbar />
      <WelcomePopup />
      {children}
      <Footer />
      <FloatingActions />
    </LanguageProvider>
  );
}
