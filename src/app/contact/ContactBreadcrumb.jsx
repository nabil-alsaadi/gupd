"use client"
import Breadcrum from '@/components/common/Breadcrum'
import { useTranslation } from 'react-i18next'

const ContactBreadcrumb = () => {
    const { t } = useTranslation();
    
    return (
        <Breadcrum 
            content={t('contact.breadcrumb.content')} 
            pageTitle={t('contact.breadcrumb.pageTitle')} 
            pagename={t('contact.breadcrumb.pagename')} 
        />
    )
}

export default ContactBreadcrumb

