import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import BlogDetailsClient from './BlogDetailsClient'
import { getBlog, getBlogs } from '@/lib/getBlogs'
import BlogDetailsBreadcrumb from './BlogDetailsBreadcrumb'

const page = async ({ searchParams }) => {
    const slug = searchParams?.slug;
    const blog = slug ? await getBlog(slug) : null;
    const allBlogs = await getBlogs();
    
    // Get related blogs (excluding current blog)
    const relatedBlogs = allBlogs.filter(b => b.id !== blog?.id).slice(0, 3);

    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <BlogDetailsBreadcrumb blog={blog} />
            <BlogDetailsClient blog={blog} relatedBlogs={relatedBlogs} allBlogs={allBlogs} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page
