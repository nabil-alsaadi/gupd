import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import PrivacyPolicyClient from './PrivacyPolicyClient'
import privacyData from '@/data/privacy-policy.json'

const page = async () => {
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum 
                contentKey="breadcrumb.privacyPolicy.content"
                pageTitleKey="breadcrumb.privacyPolicy.pageTitle"
                pagenameKey="breadcrumb.privacyPolicy.pagename"
            />
            <PrivacyPolicyClient privacyData={privacyData} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page

