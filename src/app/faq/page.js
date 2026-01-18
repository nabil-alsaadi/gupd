import Breadcrum from '@/components/common/Breadcrum'
import Spacer from '@/components/common/Spacer'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import FAQSection from '@/components/faq/FAQSection'
import React from 'react'

const page = () => {
    return (
        <>
            <Header1  fluid={"container-fluid"}/>
            <Breadcrum contentKey="breadcrumb.faq.content" pageTitleKey="breadcrumb.faq.pageTitle" pagenameKey="breadcrumb.faq.pagename" />
            <Spacer size="medium" />
            <FAQSection />

            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page