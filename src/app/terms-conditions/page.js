import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import TermsConditionsClient from './TermsConditionsClient'
import termsData from '@/data/terms-conditions.json'

const page = async () => {
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum 
                content='Legal Terms and Conditions' 
                pageTitle={'Terms & Conditions'} 
                pagename={'Terms & Conditions'} 
            />
            <TermsConditionsClient termsData={termsData} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page

