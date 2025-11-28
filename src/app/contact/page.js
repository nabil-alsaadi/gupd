import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import ContactClient from './ContactClient'
import { getContact } from '@/lib/getContact'
import ContactBreadcrumb from './ContactBreadcrumb'

const page = async () => {
    const contactData = await getContact();
    
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <ContactBreadcrumb />
            <ContactClient contactData={contactData} />
            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page