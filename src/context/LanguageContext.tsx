"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict, type DictKey, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
  isTa: boolean;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ta");

  useEffect(() => {
    const saved = window.localStorage.getItem("sm-lang") as Lang | null;
    if (saved === "ta" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("sm-lang", l);
    document.documentElement.lang = l === "ta" ? "ta" : "en";
  };

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      isTa: lang === "ta",
      t: (k) => dict[lang][k],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
