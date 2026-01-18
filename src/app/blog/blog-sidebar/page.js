import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import BlogSidebarClient from './BlogSidebarClient'
import { getBlogs } from '@/lib/getBlogs'
import BlogBreadcrumb from '../BlogBreadcrumb'
import { Suspense } from 'react'

const page = async () => {
    const blogs = await getBlogs();
    
    return (
        <>
            <Header1  fluid={"container-fluid"}/>
            <BlogBreadcrumb type="blogSidebar" />
            <Suspense fallback={<div className="blog-sidebar-page pt-120 mb-120"><div className="container"><div className="row"><div className="col-lg-12"><p>Loading...</p></div></div></div></div>}>
            <BlogSidebarClient blogs={blogs} />
            </Suspense>
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page
