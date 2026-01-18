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
    
    // Check if this is a project page (check both original pagename and translated value)
    const projectPageName = t('project.project');
    const isProjectPage = pagename === 'Project' || pagename === projectPageName || displayPagename === projectPageName || pagenameKey === 'project.project';
    
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .breadcrumb-critical-css .mobile-only,
                    .breadcrumb-critical-css .mobile-project-name {
                        display: none !important;
                        visibility: hidden !important;
                    }
                    .breadcrumb-critical-css .desktop-only {
                        display: block !important;
                        visibility: visible !important;
                    }
                    @media (max-width: 768px) {
                        .breadcrumb-critical-css .desktop-only {
                            display: none !important;
                            visibility: hidden !important;
                        }
                        .breadcrumb-critical-css .mobile-project-name {
                            display: block !important;
                            visibility: visible !important;
                        }
                        .breadcrumb-critical-css .mobile-only.breadcrumb-mobile-info {
                            display: flex !important;
                            visibility: visible !important;
                        }
                    }
                `
            }} />
            <div className="breadcrumb-section breadcrumb-critical-css" style={{backgroundImage: 'linear-gradient(91.45deg, #000000 17.96%, rgba(0, 0, 0, 0.9) 44.49%, rgba(0, 0, 0, 0.8) 67.58%, rgba(0, 0, 0, 0.5) 98.52%), url(/assets/img/inner-pages/breadcrumb-bg1.jpg)'}}>  
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="banner-content">
                            {/* Desktop version - shown at top, right side */}
                            {displayContent && isProjectPage && (
                                <div className="breadcrumb-top-content desktop-only" style={{ display: 'block' }}>
                                    <div className="breadcrumb-project-line">
                                        <span>{displayContent}</span>
                                        <div className="breadcrumb-project-right">
                                            <span className="new-project-badge">{t('breadcrumb.newProjectComingSoon')}</span>
                                            <a href="/contact" className="check-back-link">{t('breadcrumb.checkBackForUpdates')}</a>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Show project name only if not project page */}
                            {!isProjectPage && <span>{displayContent}</span>}
                            
                            {/* Mobile: Show project name */}
                            {displayContent && isProjectPage && (
                                <span className="mobile-project-name" style={{ display: 'none' }}>{displayContent}</span>
                            )}
                            
                            <h1>{displayPageTitle}</h1>
                            <ul className="breadcrumb-list">
                                <li><Link href="/">{t('breadcrumb.home')}</Link></li>
                                <li>{displayPagename}</li>
                            </ul>
                            
                            {/* Mobile version - shown below breadcrumb */}
                            {displayContent && isProjectPage && (
                                <div className="breadcrumb-mobile-info mobile-only" style={{ display: 'none' }}>
                                    <span className="new-project-badge-mobile">{t('breadcrumb.newProjectComingSoon')}</span>
                                    <a href="/contact" className="check-back-link-mobile">{t('breadcrumb.checkBackForUpdates')}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* Critical CSS - hide mobile by default, show desktop */
                .mobile-only,
                .mobile-project-name {
                    display: none !important;
                }
                
                .desktop-only {
                    display: block !important;
                }
                
                .breadcrumb-project-line {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .breadcrumb-project-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 5px;
                }
                
                .new-project-badge {
                    font-size: 18px;
                    color: rgba(255, 255, 255, 0.7);
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                
                .check-back-link {
                    color: var(--primary-color2);
                    font-weight: bold;
                    text-decoration: none;
                    cursor: pointer;
                    transition: opacity 0.3s;
                    white-space: nowrap;
                }
                
                .check-back-link:hover {
                    opacity: 0.8;
                }
                
                /* Mobile styles */
                @media (max-width: 768px) {
                    /* Hide desktop version on mobile */
                    .desktop-only {
                        display: none !important;
                    }
                    
                    /* Show mobile project name */
                    .mobile-project-name {
                        display: block !important;
                        margin-bottom: 10px;
                    }
                    
                    /* Show mobile version on mobile */
                    .mobile-only.breadcrumb-mobile-info {
                        display: flex !important;
                        flex-direction: column;
                        gap: 10px;
                        margin-top: 50px;
                    }
                    
                    .new-project-badge-mobile {
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.7);
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                    
                    .check-back-link-mobile {
                        color: var(--primary-color2);
                        font-weight: bold;
                        text-decoration: none;
                        cursor: pointer;
                        transition: opacity 0.3s;
                        font-size: 14px;
                    }
                    
                    .check-back-link-mobile:hover {
                        opacity: 0.8;
                    }
                }
                
                @media (max-width: 480px) {
                    .new-project-badge-mobile {
                        font-size: 12px !important;
                    }
                    
                    .check-back-link-mobile {
                        font-size: 13px;
                    }
                }
            `}</style>
        </div>
        </>
    )
}

export default Breadcrum