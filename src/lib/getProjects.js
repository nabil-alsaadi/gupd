import { getDocuments } from '@/utils/firestore';

/**
 * Server-side function to fetch project data from database only
 */
export async function getProjects() {
  try {
    const firestoreProjects = await getDocuments('projects');
    
    if (!firestoreProjects || firestoreProjects.length === 0) {
      // Return empty structure if no data in database
      return {
        sectionTitle: null,
        projects: []
      };
    }

    // Get the first project (or you can modify this to get a specific project)
    const project = firestoreProjects[0];
    
    // Return data in the same structure as the JSON file
    return {
      sectionTitle: project?.sectionTitle || null,
      projects: firestoreProjects.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        client: p.client,
        status: p.status,
        year: p.year,
        floors: p.floors,
        units: p.units,
        location: p.location,
        mainImage: p.mainImage,
        sections: p.sections || [],
        features: p.features || [],
        layouts: p.layouts || [],
        nearby: p.nearby || [],
        attachments: p.attachments || [],
        gallery: p.gallery || [],
        locationMap: p.locationMap,
        locationLink: p.locationLink || ''
      }))
    };
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    // Return empty structure on error
    return {
      sectionTitle: null,
      projects: []
    };
  }
}

/**
 * Get a single project by slug from database only
 */
export async function getProjectBySlug(slug) {
  try {
    // Ensure slug is always lowercase for consistent matching
    const normalizedSlug = typeof slug === 'string' ? slug.toLowerCase().trim() : slug;
    
    const firestoreProjects = await getDocuments('projects', {
      filters: [{ field: 'slug', operator: '==', value: normalizedSlug }]
    });
    
    if (firestoreProjects && firestoreProjects.length > 0) {
      return firestoreProjects[0];
    }
    
    // Return null if no data in database
    return null;
  } catch (error) {
    console.error('Error fetching project by slug from Firestore:', error);
    // Return null on error
    return null;
  }
}

