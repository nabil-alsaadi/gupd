import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import TermsConditionsClient from './TermsConditionsClient'
import { getPolicy } from '@/lib/getPolicy'

const page = async () => {
    const termsData = await getPolicy('terms')
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum 
                contentKey="breadcrumb.termsConditions.content"
                pageTitleKey="breadcrumb.termsConditions.pageTitle"
                pagenameKey="breadcrumb.termsConditions.pagename"
            />
            <TermsConditionsClient termsData={termsData} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page

