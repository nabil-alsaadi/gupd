"use client"
import Link from 'next/link'
import React from 'react'
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/providers/LanguageProvider"

const Home1Support = ({ contactContent }) => {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const isRTL = locale === 'ar'
  
  // Helper function to get text based on language
  const getText = (english, arabic) => {
    if (isRTL && arabic) return arabic;
    return english || '';
  };
  
  // Don't render if no contact content from database
  if (!contactContent) {
    return null;
  }
  
  const contact = contactContent

  return (
    <div className="home1-support-section mb-130">
      <div className="container">
        <div 
          className="row justify-content-lg-end wow animate fadeInDown" 
          data-wow-delay="200ms" 
          data-wow-duration="1500ms"
        >
          <div className="col-xl-9 col-lg-10">
            <div className="section-title">
              <span>{getText(contact.tagline, contact.taglineArabic)}</span>
              <h2>{getText(contact.headline, contact.headlineArabic)}</h2>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="support-content">
              <div className="btn_wrapper">
                <Link href="/contact" className="contact-area">
                  <h2>{contact.button?.number || '15'}</h2>
                  <span>{getText(contact.button?.unit, contact.button?.unitArabic) || t('contact.buttonUnit')}</span>
                  <p>{getText(contact.button?.text, contact.button?.textArabic) || t('contact.buttonText')}</p>
                </Link>
              </div>
              <p>{getText(contact.description, contact.descriptionArabic)}</p>
            </div>
          </div>
          <div className="col-lg-6 d-lg-block d-none">
            <div className="support-img magnetic-item">
              <img src="/assets/img/new/contact.jpg" alt="Contact Jinan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home1Support
