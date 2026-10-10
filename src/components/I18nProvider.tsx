"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import { useEffect } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Safe to read localStorage after hydration
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    } else {
      // Sync document if it matches default
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = i18n.dir(i18n.language);
    }

    // 2. Keep DOM in sync when language changes
    const handleLangChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir(lng);
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
