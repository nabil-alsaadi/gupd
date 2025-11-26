import { NextResponse } from 'next/server';

// Maximum characters per request (safe limit for Google Translate free endpoint)
const MAX_CHARS_PER_REQUEST = 5000;
// Maximum total characters allowed
const MAX_TOTAL_CHARS = 30000;

/**
 * Split text into chunks at sentence boundaries
 */
function splitTextIntoChunks(text, maxChunkSize) {
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks = [];
  let currentChunk = '';
  const sentences = text.split(/([.!?]\s+)/);

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    if ((currentChunk + sentence).length <= maxChunkSize) {
      currentChunk += sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      // If a single sentence is longer than maxChunkSize, split it by words
      if (sentence.length > maxChunkSize) {
        const words = sentence.split(/\s+/);
        let wordChunk = '';
        for (const word of words) {
          if ((wordChunk + ' ' + word).length <= maxChunkSize) {
            wordChunk += (wordChunk ? ' ' : '') + word;
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = word;
          }
        }
        if (wordChunk) currentChunk = wordChunk;
      } else {
        currentChunk = sentence;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * Translate a single chunk of text
 */
async function translateChunk(chunk) {
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(chunk)}`,
    {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Translation service unavailable');
  }

  const data = await response.json();
  
  // Google Translate returns an array of segments: [[["translated", "original", ...], ...], ...]
  // We need to combine all segments, not just the first one
  if (data && data[0] && Array.isArray(data[0])) {
    const translatedSegments = [];
    for (const segment of data[0]) {
      if (segment && segment[0] && typeof segment[0] === 'string') {
        translatedSegments.push(segment[0]);
      }
    }
    
    if (translatedSegments.length > 0) {
      // Join segments with space (Google Translate usually handles spacing correctly)
      return translatedSegments.join('');
    }
  }
  
  // Fallback to old method for backward compatibility
  if (data && data[0] && data[0][0] && data[0][0][0]) {
    return data[0][0][0];
  }
  
  throw new Error('Translation failed - no result returned');
}

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Check total length limit
    if (text.length > MAX_TOTAL_CHARS) {
      return NextResponse.json(
        { 
          error: `Text is too long. Maximum ${MAX_TOTAL_CHARS.toLocaleString()} characters allowed. Your text has ${text.length.toLocaleString()} characters.`,
          textLength: text.length,
          maxLength: MAX_TOTAL_CHARS
        },
        { status: 400 }
      );
    }

    // If text is within single request limit, translate directly
    if (text.length <= MAX_CHARS_PER_REQUEST) {
      const translated = await translateChunk(text);
      return NextResponse.json({ 
        translated,
        chunked: false,
        chunksCount: 1
      });
    }

    // For longer texts, split into chunks and translate separately
    const chunks = splitTextIntoChunks(text, MAX_CHARS_PER_REQUEST);
    const translatedChunks = await Promise.all(
      chunks.map(chunk => translateChunk(chunk))
    );

    // Combine translated chunks
    const translated = translatedChunks.join(' ');

    return NextResponse.json({ 
      translated,
      chunked: true,
      chunksCount: chunks.length
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to translate text' },
      { status: 500 }
    );
  }
}

