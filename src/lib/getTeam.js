import { getDocuments } from '@/utils/firestore';
import teamData from '@/data/team-data.json';

/**
 * Server-side function to fetch team data
 * Falls back to static data if Firestore fetch fails
 */
export async function getTeam() {
  try {
    const teamDocs = await getDocuments('team');
    
    if (!teamDocs || teamDocs.length === 0) {
      return {
        sectionTitle: teamData.team.sectionTitle,
        founder: teamData.team.founder,
        members: teamData.team.members,
        chairmanMessage: null
      };
    }

    const teamDoc = teamDocs[0];
    
    return {
      sectionTitle: teamDoc?.sectionTitle || teamData.team.sectionTitle,
      founder: teamDoc?.founder || teamData.team.founder,
      members: Array.isArray(teamDoc?.members) && teamDoc.members.length > 0
        ? teamDoc.members
        : teamData.team.members,
      chairmanMessage: teamDoc?.chairmanMessage || null
    };
  } catch (error) {
    console.error('Error fetching team from Firestore:', error);
    // Fall back to static data on error
    return {
      sectionTitle: teamData.team.sectionTitle,
      founder: teamData.team.founder,
      members: teamData.team.members,
      chairmanMessage: null
    };
  }
}

