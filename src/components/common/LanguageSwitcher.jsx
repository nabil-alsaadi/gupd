"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";

const LanguageSwitcher = ({ className = "" }) => {
  const { locale, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇦🇪" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Inject styles once
  useEffect(() => {
    if (typeof document !== "undefined") {
      const styleId = "language-switcher-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          .language-switcher-wrapper {
            position: relative;
            display: inline-block;
          }
          .language-switcher-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            color: var(--title-color, #fff);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            min-width: 100px;
            justify-content: space-between;
            font-family: inherit;
          }
          .language-switcher-btn:hover {
            border-color: var(--primary-color2, #B149ED);
            background: rgba(177, 73, 237, 0.1);
          }
          .language-flag {
            font-size: 18px;
            line-height: 1;
            display: inline-block;
          }
          .language-arrow {
            font-size: 12px;
            transition: transform 0.3s ease;
            margin-left: 4px;
            display: inline-block;
          }
          .language-switcher-wrapper.open .language-arrow {
            transform: rotate(180deg);
          }
          .language-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 140px;
            z-index: 1000;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
          }
          [dir="rtl"] .language-dropdown {
            right: auto;
            left: 0;
          }
          .language-dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .language-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: var(--title-color, #1a1a1a);
            font-size: 14px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            font-family: inherit;
            text-align: left;
          }
          [dir="rtl"] .language-option {
            text-align: right;
          }
          .language-option:last-child {
            border-bottom: none;
          }
          .language-option:hover {
            background: var(--primary-color2, #B149ED);
            color: #fff;
          }
          .language-option.active {
            background: rgba(177, 73, 237, 0.1);
            color: var(--primary-color2, #B149ED);
            font-weight: 600;
          }
          .language-option.active:hover {
            background: var(--primary-color2, #B149ED);
            color: #fff;
          }
          .header.sticky .language-switcher-btn,
          header.sticky .language-switcher-btn,
          header.style-1.sticky .language-switcher-btn {
            border-color: rgba(255, 255, 255, 0.2);
            color: #fff !important;
          }
          .header.sticky .language-switcher-btn:hover,
          header.sticky .language-switcher-btn:hover,
          header.style-1.sticky .language-switcher-btn:hover {
            border-color: var(--primary-color2, #B149ED);
            background: rgba(177, 73, 237, 0.1);
            color: #fff !important;
          }
          @media (max-width: 991px) {
            .language-switcher-btn {
              padding: 6px 12px;
              font-size: 13px;
              min-width: 90px;
            }
            .language-flag {
              font-size: 16px;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  // Show default during SSR to match server
  if (!mounted) {
    return (
      <div className={`language-switcher-wrapper ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className="language-switcher-btn"
          suppressHydrationWarning
        >
          <span className="language-flag">🇺🇸</span>
          <span>English</span>
          <span className="language-arrow">▼</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`language-switcher-wrapper ${isOpen ? "open" : ""} ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span className="language-arrow">▼</span>
      </button>
      <div className={`language-dropdown ${isOpen ? "open" : ""}`}>
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`language-option ${locale === lang.code ? "active" : ""}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="language-flag">{lang.flag}</span>
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

