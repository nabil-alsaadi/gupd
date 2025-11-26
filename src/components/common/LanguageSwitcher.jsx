"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const LanguageSwitcher = ({ className = "" }) => {
  const { locale, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLocale = () => {
    changeLanguage(locale === "en" ? "ar" : "en");
  };

  // Show default during SSR to match server
  if (!mounted) {
    return (
      <button
        type="button"
        className={`language-switcher ${className}`}
        suppressHydrationWarning
      >
        {t("language.switchToArabic")}
      </button>
    );
  }

  const label =
    locale === "en"
      ? t("language.switchToArabic")
      : t("language.switchToEnglish");

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`language-switcher ${className}`}
    >
      {label}
    </button>
  );
};

export default LanguageSwitcher;

