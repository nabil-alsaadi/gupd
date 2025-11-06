import { getDocuments } from '@/utils/firestore';
import defaultProjectData from '@/data/project-section-data.json';

/**
 * Server-side function to fetch project data
 * Falls back to static data if Firestore fetch fails
 */
export async function getProjects() {
  try {
    const firestoreProjects = await getDocuments('projects');
    
    if (!firestoreProjects || firestoreProjects.length === 0) {
      // Return default data structure
      return {
        sectionTitle: defaultProjectData.sectionTitle,
        projects: defaultProjectData.projects
      };
    }

    // Get the first project (or you can modify this to get a specific project)
    const project = firestoreProjects[0];
    
    // Return data in the same structure as the JSON file
    return {
      sectionTitle: project?.sectionTitle || defaultProjectData.sectionTitle,
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
        locationMap: p.locationMap
      }))
    };
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    // Fall back to static data on error
    return {
      sectionTitle: defaultProjectData.sectionTitle,
      projects: defaultProjectData.projects
    };
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug) {
  try {
    const firestoreProjects = await getDocuments('projects', {
      filters: [{ field: 'slug', operator: '==', value: slug }]
    });
    
    if (!firestoreProjects || firestoreProjects.length === 0) {
      // Fall back to default data
      const defaultProject = defaultProjectData.projects.find(p => p.slug === slug);
      return defaultProject || null;
    }

    return firestoreProjects[0];
  } catch (error) {
    console.error('Error fetching project by slug from Firestore:', error);
    // Fall back to static data
    const defaultProject = defaultProjectData.projects.find(p => p.slug === slug);
    return defaultProject || null;
  }
}

