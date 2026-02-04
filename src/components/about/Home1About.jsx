"use client"
import useModalVideo from '@/utils/useModalVideo'
import Link from 'next/link'
import React from 'react'
import { useLanguage } from "@/providers/LanguageProvider"
import { useTranslation } from "react-i18next"

const Home1About = ({ sectionGap, aboutData }) => {
  const { Modal, openModal } = useModalVideo()
  const { locale } = useLanguage()
  const { t } = useTranslation()
  const isRTL = locale === 'ar'

  // Only use database data, no fallbacks
  const about = aboutData || {};

  return (
    <div className="home1-about-section mb-130">
      <div className="container">
        <div className="about-top-area mb-50">
          <div className="row g-4 align-items-center justify-content-between">
            <div className="col-lg-8 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="about-title-area">
                <div className="section-title">
                  <span>{isRTL && about.titleArabic ? about.titleArabic : about.title}</span>
                  <h2>{isRTL && about.subtitleArabic ? about.subtitleArabic : about.subtitle}</h2>
                </div>
                <div className="video-and-content">
                  <a onClick={openModal} className="video-area">
                    {/* Video button */}
                    <div className="icon">▶</div>
                  </a>
                  <div className="content">
                    <p>{isRTL && about.videoDescriptionArabic ? about.videoDescriptionArabic : about.videoDescription}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 d-flex justify-content-lg-end">
              <Link href="/about" className="about-btn btn_wrapper">
                <div className="primary-btn">
                  {t('about.aboutUsMore')} <span style={{ transform: isRTL ? 'scaleX(-1)' : 'none', display: 'inline-block' }}>→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="about-content">
              <ul>
                {Array.isArray(about.sections) && about.sections.length > 0 && about.sections.map((item, index) => (
                  <li key={index}>
                    <h5>{isRTL && item.titleArabic ? item.titleArabic : item.title}</h5>
                    <p>{isRTL && item.textArabic ? item.textArabic : item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-7 d-lg-block d-none">
            <div className="about-img magnetic-item">
              {about.image && <img src={about.image} alt="About Jinan" />}
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default Home1About
