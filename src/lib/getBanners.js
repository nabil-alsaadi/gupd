import { getDocuments } from '@/utils/firestore';
import bannerData from '@/data/banner-data.json';

/**
 * Server-side function to fetch banner data
 * Falls back to static data if Firestore fetch fails
 */
export async function getBanners() {
  try {
    const firestoreBanners = await getDocuments('banners', {
      orderBy: { field: 'order', direction: 'asc' }
    });
    
    // Return Firestore data if available, otherwise fall back to static data
    return firestoreBanners.length > 0 ? firestoreBanners : bannerData;
  } catch (error) {
    console.error('Error fetching banners from Firestore:', error);
    // Fall back to static data on error
    return bannerData;
  }
}

