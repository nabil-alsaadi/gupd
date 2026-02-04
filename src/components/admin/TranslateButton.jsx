"use client";
import { Languages } from 'lucide-react';
import { translateToArabic, translateHtmlToArabic } from '@/utils/translate';
import { useState } from 'react';

const MAX_LENGTH = 30000;
const WARNING_LENGTH = 5000; // Show warning for texts longer than this

export default function TranslateButton({ 
  onTranslate, 
  disabled = false, 
  englishText = '',
  size = 'small',
  /** When true, treats englishText as HTML and translates only text nodes, preserving tags */
  preserveHtml = false
}) {
  const [translating, setTranslating] = useState(false);
  const textLength = englishText ? englishText.length : 0;
  const showWarning = textLength > WARNING_LENGTH;
  const isTooLong = textLength > MAX_LENGTH;

  const handleClick = async () => {
    if (!englishText || englishText.trim() === '') {
      alert('Please enter English text first');
      return;
    }

    if (isTooLong) {
      alert(
        `Text is too long (${textLength.toLocaleString()} characters). ` +
        `Maximum ${MAX_LENGTH.toLocaleString()} characters allowed. ` +
        `Please split the text into smaller sections.`
      );
      return;
    }

    // Warn user if text is long (will be chunked or segmented)
    if (showWarning) {
      const message = preserveHtml
        ? `This content is ${textLength.toLocaleString()} characters. Each text segment will be translated while keeping the same HTML structure. This may take a moment. Continue?`
        : `This text is ${textLength.toLocaleString()} characters long and will be translated in chunks. This may take a moment. Continue?`;
      const proceed = confirm(message);
      if (!proceed) return;
    }

    setTranslating(true);
    try {
      const translated = preserveHtml
        ? await translateHtmlToArabic(englishText)
        : await translateToArabic(englishText);
      onTranslate(translated);
    } catch (error) {
      alert(error.message || 'Translation failed. Please translate manually.');
    } finally {
      setTranslating(false);
    }
  };

  const buttonStyle = {
    marginLeft: '10px',
    padding: size === 'small' ? '4px 8px' : '6px 12px',
    fontSize: size === 'small' ? '12px' : '14px',
    backgroundColor: isTooLong ? '#f44336' : showWarning ? '#ff9800' : '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: (translating || disabled || !englishText || isTooLong) ? 'not-allowed' : 'pointer',
    opacity: (translating || disabled || !englishText || isTooLong) ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'opacity 0.2s'
  };

  const tooltip = isTooLong 
    ? `Text too long (${textLength.toLocaleString()}/${MAX_LENGTH.toLocaleString()} chars)`
    : showWarning
    ? preserveHtml
      ? `Long content (${textLength.toLocaleString()} chars) - segments translated, HTML kept`
      : `Long text (${textLength.toLocaleString()} chars) - will be chunked`
    : textLength > 0
    ? preserveHtml
      ? `Translate to Arabic (keep HTML)`
      : `Translate (${textLength.toLocaleString()} chars)`
    : 'Translate from English';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={translating || disabled || !englishText || isTooLong}
      style={buttonStyle}
      title={tooltip}
    >
      <Languages size={size === 'small' ? 14 : 16} />
      {translating ? 'Translating...' : 'Translate'}
      {showWarning && !translating && (
        <span style={{ fontSize: '10px', marginLeft: '4px' }}>
          ({textLength > 0 ? Math.ceil(textLength / 5000) : 0} chunks)
        </span>
      )}
    </button>
  );
}

