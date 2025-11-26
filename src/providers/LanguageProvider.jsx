"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

const LanguageContext = createContext({
  locale: "en",
  changeLanguage: () => {}
});

export const LanguageProvider = ({ children }) => {
  // Always start with "en" to match server-side rendering
  const [locale, setLocale] = useState("en");
  const [mounted, setMounted] = useState(false);

  // Only read from localStorage after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocale(savedLocale);
    i18n.changeLanguage(savedLocale);
    
    // Set HTML attributes
    document.documentElement.lang = savedLocale;
    const direction = savedLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, []);

  useEffect(() => {
    if (mounted) {
      i18n.changeLanguage(locale);
      localStorage.setItem("locale", locale);
      document.documentElement.lang = locale;
      const direction = locale === "ar" ? "rtl" : "ltr";
      document.documentElement.dir = direction;
      document.body.dir = direction;
    }
  }, [locale, mounted]);

  const contextValue = useMemo(
    () => ({
      locale,
      changeLanguage: setLocale
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

