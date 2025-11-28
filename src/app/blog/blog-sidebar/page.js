import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import BlogSidebarClient from './BlogSidebarClient'
import { getBlogs } from '@/lib/getBlogs'
import BlogBreadcrumb from '../BlogBreadcrumb'

const page = async () => {
    const blogs = await getBlogs();
    
    return (
        <>
            <Header1  fluid={"container-fluid"}/>
            <BlogBreadcrumb type="blogSidebar" />
            <BlogSidebarClient blogs={blogs} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page
