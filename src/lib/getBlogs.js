import { getDocuments, getDocument } from '@/utils/firestore';
import blogData from '@/data/blog-data.json';

/**
 * Server-side function to fetch blog data
 * Falls back to static data if Firestore fetch fails
 */
export async function getBlogs() {
  try {
    const firestoreBlogs = await getDocuments('blogs', {
      orderBy: { field: 'date', direction: 'desc' }
    });
    
    // Return Firestore data if available, otherwise fall back to static data
    return firestoreBlogs.length > 0 ? firestoreBlogs : (blogData.blog_grid || []);
  } catch (error) {
    console.error('Error fetching blogs from Firestore:', error);
    // Fall back to static data on error
    return blogData.blog_grid || [];
  }
}

/**
 * Server-side function to fetch a single blog by ID
 * Falls back to static data if Firestore fetch fails
 */
export async function getBlog(blogId) {
  if (!blogId) {
    return null;
  }

  try {
    // Try to fetch from Firestore first
    const blog = await getDocument('blogs', blogId);
    
    if (blog) {
      return blog;
    }

    // If not found in Firestore, check static data
    const staticBlog = blogData.blog_grid?.find(b => b.id === blogId || b.id?.toString() === blogId?.toString());
    if (staticBlog) {
      return staticBlog;
    }

    return null;
  } catch (error) {
    console.error('Error fetching blog from Firestore:', error);
    // Fall back to static data on error
    const staticBlog = blogData.blog_grid?.find(b => b.id === blogId || b.id?.toString() === blogId?.toString());
    return staticBlog || null;
  }
}

