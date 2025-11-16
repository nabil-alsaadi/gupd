import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import BlogSidebarClient from './BlogSidebarClient'
import { getBlogs } from '@/lib/getBlogs'

const page = async () => {
    const blogs = await getBlogs();
    
    return (
        <>
            <Header1  fluid={"container-fluid"}/>
            <Breadcrum content='See Our Newest Article' pageTitle={'Blog Sidebar'} pagename={'Blog Sidebar'} />
            <BlogSidebarClient blogs={blogs} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page
