import { getDocuments } from '@/utils/firestore';

/**
 * Server-side function to fetch banner data from database only
 * Returns empty array if no data available
 */
export async function getBanners() {
  try {
    const firestoreBanners = await getDocuments('banners', {
      orderBy: { field: 'order', direction: 'asc' }
    });
    
    // Return Firestore data if available, otherwise return empty array
    return Array.isArray(firestoreBanners) ? firestoreBanners : [];
  } catch (error) {
    console.error('Error fetching banners from Firestore:', error);
    // Return empty array on error - no fallback to default data
    return [];
  }
}

