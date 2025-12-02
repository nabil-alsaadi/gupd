"use client";
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Breadcrum = ({ pageTitle, pagename, content = "", contentKey, pageTitleKey, pagenameKey }) => {
    const { t } = useTranslation();
    
    // Use translation keys if provided, otherwise use direct props
    const displayContent = contentKey ? t(contentKey) : content;
    const displayPageTitle = pageTitleKey ? t(pageTitleKey) : pageTitle;
    const displayPagename = pagenameKey ? t(pagenameKey) : pagename;
    
    return (
        <div className="breadcrumb-section" style={{backgroundImage: 'linear-gradient(91.45deg, #000000 17.96%, rgba(0, 0, 0, 0.9) 44.49%, rgba(0, 0, 0, 0.8) 67.58%, rgba(0, 0, 0, 0.5) 98.52%), url(/assets/img/inner-pages/breadcrumb-bg1.jpg)'}}>  
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="banner-content">
                            <span>{displayContent}</span>
                            <h1>{displayPageTitle}</h1>
                            <ul className="breadcrumb-list">
                                <li><Link href="/">{t('breadcrumb.home')}</Link></li>
                                <li>{displayPagename}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrum