import { getDocuments } from '@/utils/firestore';

/**
 * Server-side function to fetch contact content from database only
 * Returns null if no data available
 */
export async function getContactContent() {
  try {
    const contactDocs = await getDocuments('contact');
    
    if (!contactDocs || contactDocs.length === 0) {
      return null;
    }

    const doc = contactDocs[0];
    
    // Return contact content if it exists, otherwise null
    if (doc.supportContent) {
      return doc.supportContent;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching contact content from Firestore:', error);
    // Return null on error - no fallback to default data
    return null;
  }
}
