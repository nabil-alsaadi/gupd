import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import SupportPolicyClient from './SupportPolicyClient'
import supportData from '@/data/support-policy.json'

const page = async () => {
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum 
                content='Our Commitment to Customer Support' 
                pageTitle={'Support Policy'} 
                pagename={'Support Policy'} 
            />
            <SupportPolicyClient supportData={supportData} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page

