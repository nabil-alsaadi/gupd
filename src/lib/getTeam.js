import { getDocuments } from '@/utils/firestore';

/**
 * Server-side function to fetch team data from database only
 * Returns null if no data available
 */
export async function getTeam() {
  try {
    const teamDocs = await getDocuments('team');
    
    if (!teamDocs || teamDocs.length === 0) {
      return null;
    }

    const teamDoc = teamDocs[0];
    
    // Check if chairmanMessage exists and has content
    const chairmanMessage = teamDoc?.chairmanMessage;
    const hasChairmanMessage = chairmanMessage && 
      typeof chairmanMessage === 'object' && 
      Object.keys(chairmanMessage).length > 0;
    
    // Debug logging (remove in production if needed)
    if (process.env.NODE_ENV === 'development') {
      console.log('[getTeam] chairmanMessage from DB:', chairmanMessage ? 'exists' : 'null/undefined');
      if (chairmanMessage) {
        console.log('[getTeam] chairmanMessage keys:', Object.keys(chairmanMessage));
        console.log('[getTeam] chairmanMessage.image:', chairmanMessage.image);
      }
    }
    
    return {
      sectionTitle: teamDoc?.sectionTitle || null,
      founder: teamDoc?.founder || null,
      members: Array.isArray(teamDoc?.members) && teamDoc.members.length > 0
        ? teamDoc.members
        : [],
      chairmanMessage: hasChairmanMessage ? chairmanMessage : null
    };
  } catch (error) {
    console.error('Error fetching team from Firestore:', error);
    // Return null on error - no fallback to default data
    return null;
  }
}

