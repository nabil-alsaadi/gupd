import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import SupportPolicyClient from './SupportPolicyClient'
import { getPolicy } from '@/lib/getPolicy'

const page = async () => {
    const supportData = await getPolicy('support')
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum 
                contentKey="breadcrumb.supportPolicy.content"
                pageTitleKey="breadcrumb.supportPolicy.pageTitle"
                pagenameKey="breadcrumb.supportPolicy.pagename"
            />
            <SupportPolicyClient supportData={supportData} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page

