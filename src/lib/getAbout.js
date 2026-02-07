import { getDocuments } from '@/utils/firestore';

/**
 * Server-side function to fetch about data from database only
 * Returns null if no data available
 */
export async function getAbout() {
  try {
    const aboutDocs = await getDocuments('about');
    
    if (!aboutDocs || aboutDocs.length === 0) {
      return null;
    }

    const doc = aboutDocs[0];

    return {
      title: doc.title || '',
      titleArabic: doc.titleArabic || '',
      subtitle: doc.subtitle || '',
      subtitleArabic: doc.subtitleArabic || '',
      videoDescription: doc.videoDescription || '',
      videoDescriptionArabic: doc.videoDescriptionArabic || '',
      image: doc.image || '',
      sections:
        Array.isArray(doc.sections) && doc.sections.length > 0
          ? doc.sections.map(section => ({
              title: section.title || '',
              titleArabic: section.titleArabic || '',
              text: section.text || '',
              textArabic: section.textArabic || ''
            }))
          : []
    };
  } catch (error) {
    console.error('Error fetching about from Firestore:', error);
    // Return null on error - no fallback to default data
    return null;
  }
}

