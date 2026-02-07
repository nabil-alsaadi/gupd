"use client"
import Link from 'next/link'
import React from 'react'
import companyData from '@/data/companyData.json'
import navData from '@/data/nav.json'
import ContactInfo from '@/components/common/ContactInfo'
import SocialMedia from '@/components/common/SocialMedia'
import { useTranslation } from 'react-i18next';

const Footer1 = () => {
    const { t } = useTranslation();
    return (
        <>
            <footer className="footer-section">
                <div className="footer-wrapper" style={{ width: '100%', maxWidth: '100%' }}>
                    <div className="footer-logo-and-contact-area" style={{ width: '100%', maxWidth: '100%' }}>
                        <div className="footer-logo-area" style={{ 
                            display: 'flex', 
                            gap: '40px', 
                            alignItems: 'flex-start', 
                            maxWidth: '100%',
                            width: '100%',
                            flexWrap: 'wrap'
                        }}>
                            <Link href="/" className="footer-logo" style={{ flexShrink: 0 }}>
                                <img src="/assets/img/footer-logo.svg" alt="" style={{ maxWidth: '250px', height: 'auto' }} />
                            </Link>
                            {/* <p style={{ 
                                maxWidth: '400px',
                                width: '100%',
                                margin: 0,
                                paddingTop: 0
                            }}>{t('footer.welcomeDescription')}</p> */}
                            <div className="footer-content" style={{ 
                                paddingTop: '25px', 
                                flexShrink: 0,
                                minWidth: 'fit-content'
                            }}>
                                <SocialMedia className="social-list" showLabels={true} />
                            </div>
                        </div>
                        {/* <ContactInfo showArrow={true} /> */}
                    </div>
                </div>
                <div className="footer-bottom-wrap">
                    <div className="container">
                        <div className="footer-bottom">
                            <div className="copyright-area">
                                <p>{t('footer.copyright')} {new Date().getFullYear()} <Link href="/">JINAN</Link> | {t('footer.poweredBy')} <a href="https://www.nabilalsaadi.com/">NABIL ALSAADI</a></p>
                            </div>
                            <div className="footer-bottom-right">
                                <ul>
                                    <li><Link href="/support-policy">{t('footer.supportPolicy')}</Link></li>
                                    <li><Link href="/terms-conditions">{t('footer.terms')}</Link></li>
                                    <li><Link href="/privacy-policy">{t('footer.privacy')}</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <style jsx>{`
            .footer-wrapper {
                width: 100% !important;
                max-width: 100% !important;
            }
            .footer-logo-and-contact-area {
                width: 100% !important;
                max-width: 100% !important;
            }
            .footer-logo-area {
                width: 100% !important;
            }
            @media (max-width: 768px) {
                .footer-logo-area {
                    flex-direction: column !important;
                    gap: 20px !important;
                    align-items: center !important;
                }
                .footer-logo-area p {
                    text-align: center !important;
                    min-width: 100% !important;
                }
                .footer-content {
                    width: 100% !important;
                    display: flex !important;
                    justify-content: center !important;
                }
            }
            @media (max-width: 576px) {
                .footer-logo-area {
                    gap: 15px !important;
                }
                .footer-logo img {
                    width: 120px !important;
                }
            }
        `}</style>
        </>
    )
}

export default Footer1