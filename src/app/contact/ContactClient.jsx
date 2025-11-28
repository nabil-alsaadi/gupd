"use client"
import SelectComponent from '@/components/common/SelectComponent'
import ContactInfo from '@/components/common/ContactInfo'
import { useTranslation } from 'react-i18next'
import { useLanguage } from "@/providers/LanguageProvider"

const ContactClient = ({ contactData }) => {
    const { t } = useTranslation();
    const { locale } = useLanguage();
    const isRTL = locale === 'ar';
    
    const serviceOptions = [
        t('contact.serviceType.propertyDevelopment'),
        t('contact.serviceType.investmentOpportunities'),
        t('contact.serviceType.propertyManagement'),
        t('contact.serviceType.consultation'),
        t('contact.serviceType.residentialProjects'),
        t('contact.serviceType.commercialProjects')
    ];
    
    return (
        <div className="home6-contact-section pt-120 mb-120">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="row gy-5 align-items-center">
                        <div className="col-lg-5 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="contact-content">
                                <div className="section-title">
                                    <h2>{t('contact.connectWithTeam')}</h2>
                                </div>
                                <ContactInfo className="contact-list" contactData={contactData} />
                            </div>
                        </div>
                        <div className="col-lg-7 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="contact-form-wrap">
                                <form>
                                    <div className="row g-4">
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>{t('contact.fullName')}</label>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>{t('contact.email')}</label>
                                                <input type="email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>{t('contact.phone')}</label>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>{t('contact.serviceType.label')}</label>
                                                <SelectComponent 
                                                    options={serviceOptions} 
                                                    placeholder={t('contact.serviceType.placeholder')}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>{t('contact.message')}</label>
                                                <textarea defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-inner2">
                                                <div 
                                                    className="form-check" 
                                                    style={{ 
                                                        display: 'flex',
                                                        flexDirection: isRTL ? 'row-reverse' : 'row',
                                                        alignItems: 'center',
                                                        justifyContent: isRTL ? 'flex-end' : 'flex-start',
                                                        direction: isRTL ? 'rtl' : 'ltr'
                                                    }}
                                                >
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        defaultValue 
                                                        id="contactCheck"
                                                        style={{ 
                                                            marginRight: isRTL ? '0' : '8px',
                                                            marginLeft: isRTL ? '8px' : '0',
                                                            order: isRTL ? 2 : 1
                                                        }}
                                                    />
                                                    <label 
                                                        className="form-check-label" 
                                                        htmlFor="contactCheck"
                                                        style={{ 
                                                            order: isRTL ? 1 : 2,
                                                            margin: 0
                                                        }}
                                                    >
                                                        {t('contact.termsAcceptance')}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="primary-btn2">
                                        <span>
                                            {t('contact.submitNow')}
                                            <svg viewBox="0 0 13 20">
                                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                            </svg>
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactClient

