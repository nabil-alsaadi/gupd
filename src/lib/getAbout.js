import { getDocuments } from '@/utils/firestore';
import content from '@/data/gupdContent.json';

/**
 * Server-side function to fetch about data
 * Falls back to static data if Firestore fetch fails
 */
export async function getAbout() {
  try {
    const aboutDocs = await getDocuments('about');
    
    if (!aboutDocs || aboutDocs.length === 0) {
      return {
        title: content.about.title,
        titleArabic: content.about.titleArabic || content.about.title,
        subtitle: content.about.subtitle,
        subtitleArabic: content.about.subtitleArabic || content.about.subtitle,
        videoDescription: content.about.videoDescription,
        videoDescriptionArabic: content.about.videoDescriptionArabic || content.about.videoDescription,
        image: content.about.image || 'assets/img/home1/about-img.jpg',
        sections: content.about.sections || []
      };
    }

    const doc = aboutDocs[0];
    const fallback = {
      title: content.about.title,
      titleArabic: content.about.titleArabic || content.about.title,
      subtitle: content.about.subtitle,
      subtitleArabic: content.about.subtitleArabic || content.about.subtitle,
      videoDescription: content.about.videoDescription,
      videoDescriptionArabic: content.about.videoDescriptionArabic || content.about.videoDescription,
      image: content.about.image || 'assets/img/home1/about-img.jpg',
      sections: content.about.sections || []
    };

    return {
      title: doc.title || fallback.title,
      titleArabic: doc.titleArabic || doc.title || fallback.title,
      subtitle: doc.subtitle || fallback.subtitle,
      subtitleArabic: doc.subtitleArabic || doc.subtitle || fallback.subtitle,
      videoDescription: doc.videoDescription || fallback.videoDescription,
      videoDescriptionArabic: doc.videoDescriptionArabic || doc.videoDescription || fallback.videoDescription,
      image: doc.image || fallback.image,
      sections:
        Array.isArray(doc.sections) && doc.sections.length > 0
          ? doc.sections.map(section => ({
              title: section.title || '',
              titleArabic: section.titleArabic || section.title || '',
              text: section.text || '',
              textArabic: section.textArabic || section.text || ''
            }))
          : fallback.sections
    };
  } catch (error) {
    console.error('Error fetching about from Firestore:', error);
    // Fall back to static data on error
    return {
      title: content.about.title,
      titleArabic: content.about.titleArabic || content.about.title,
      subtitle: content.about.subtitle,
      subtitleArabic: content.about.subtitleArabic || content.about.subtitle,
      videoDescription: content.about.videoDescription,
      videoDescriptionArabic: content.about.videoDescriptionArabic || content.about.videoDescription,
      image: content.about.image || 'assets/img/home1/about-img.jpg',
      sections: content.about.sections || []
    };
  }
}

