/**
 * Translate text from English to Arabic using Next.js API route
 * This avoids CORS issues by making the request server-side
 * 
 * @param {string} text - Text to translate (max 30,000 characters)
 * @returns {Promise<string>} Translated text
 */
export const translateToArabic = async (text) => {
  if (!text || text.trim() === '') {
    return '';
  }

  // Client-side validation for better UX
  const MAX_LENGTH = 30000;
  if (text.length > MAX_LENGTH) {
    throw new Error(
      `Text is too long (${text.length.toLocaleString()} characters). ` +
      `Maximum ${MAX_LENGTH.toLocaleString()} characters allowed. ` +
      `Please split the text into smaller sections.`
    );
  }

  try {
    // Use our Next.js API route to avoid CORS issues
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Translation service unavailable');
    }

    const data = await response.json();
    
    if (data && data.translated) {
      // Log if text was chunked (for debugging)
      if (data.chunked) {
        console.log(`Text translated in ${data.chunksCount} chunks`);
      }
      return data.translated;
    }
    
    throw new Error('Translation failed - no result returned');
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(error.message || 'Failed to translate. Please translate manually.');
  }
};

/**
 * Translate multiple texts at once
 */
export const translateMultipleToArabic = async (texts) => {
  const translations = await Promise.all(
    texts.map(text => translateToArabic(text))
  );
  return translations;
};

