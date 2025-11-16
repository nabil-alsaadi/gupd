import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import BlogDetailsClient from './BlogDetailsClient'
import { getBlog, getBlogs } from '@/lib/getBlogs'

const page = async ({ searchParams }) => {
    const slug = searchParams?.slug;
    const blog = slug ? await getBlog(slug) : null;
    const allBlogs = await getBlogs();
    
    // Get related blogs (excluding current blog)
    const relatedBlogs = allBlogs.filter(b => b.id !== blog?.id).slice(0, 3);

    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum 
                content='See Our Newest Article' 
                pageTitle={blog?.blog_title || 'Blog Details'} 
                pagename={'Blog Details'} 
            />
            <BlogDetailsClient blog={blog} relatedBlogs={relatedBlogs} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page
