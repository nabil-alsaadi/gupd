"use client"
import React, { useEffect, useRef } from "react";
import useCustomSelect from "../../customHooks/useCustomSelect";
import { useLanguage } from "@/providers/LanguageProvider";

const SelectComponent = ({ options, placeholder, open, customClass, onSelect }) => {
  const {
    isOpen,
    selectedOption,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectOption,
  } = useCustomSelect(options, open);
  
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Click is outside the dropdown, close the dropdown
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener when the component mounts
      document.addEventListener("click", handleClickOutside);
    }

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionSelect = (option) => {
    selectOption(option);
    openDropdown(); // Open the next dropdown
    if (onSelect) {
      onSelect(option);
    }
  };

  const dropdownClassName = `nice-select ${customClass || ""} ${isOpen ? "open" : ""}`;

  useEffect(() => {
    // Add RTL styles dynamically
    if (typeof document !== 'undefined') {
      const styleId = 'nice-select-rtl-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .nice-select.rtl-select::after {
            right: auto !important;
            left: 20px !important;
          }
          .nice-select.rtl-select .current {
            padding-right: 20px !important;
            padding-left: 30px !important;
            text-align: right;
          }
          .nice-select:not(.rtl-select) .current {
            padding-right: 30px !important;
            padding-left: 20px !important;
            text-align: left;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  const finalClassName = `${dropdownClassName} ${isRTL ? 'rtl-select' : ''}`;

  return (
    <div 
      className={finalClassName} 
      tabIndex="0" 
      onClick={toggleDropdown} 
      ref={dropdownRef}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <span className="current">
        {selectedOption || placeholder}
      </span>
      <ul className="list" dir={isRTL ? 'rtl' : 'ltr'}>
        {options.map((option, index) => (
          <li
            key={index}
            className={`option${selectedOption === option ? " selected focus" : ""}`}
            data-value={index}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectComponent;
