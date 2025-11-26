"use client"
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Home1FooterTop = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="home1-footer-top-banner-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="banner-content">
                                <div className="section-title white wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <span>{t('footerTop.eyebrow')}</span>
                                    <h2>{t('footerTop.headline')}</h2>
                                </div>
                                <div className="button-area wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <Link href="/contact" className="primary-btn2 white-bg">
                                        <span>
                                            {t('footerTop.startProject')}
                                            <svg viewBox="0 0 13 20">
                                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                            </svg>
                                        </span>
                                    </Link>
                                    <Link href="/contact" className="primary-btn white">
                                        {t('footerTop.contactUs')}
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home1FooterTop