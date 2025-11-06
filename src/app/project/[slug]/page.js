import { getProjectBySlug } from '@/lib/getProjects'
import ProjectDetailsClient from './ProjectDetailsClient'

export default async function ProjectDetailsPage({ params }) {
  // Fetch project data from Firebase server-side
  const project = await getProjectBySlug(params.slug);
  
  return <ProjectDetailsClient project={project} slug={params.slug} />
}
