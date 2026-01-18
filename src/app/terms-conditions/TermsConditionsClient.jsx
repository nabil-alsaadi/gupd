"use client";
import React from 'react'
import Link from 'next/link'
import companyData from '@/data/companyData.json'
import { useTranslation } from "react-i18next";

const TermsConditionsClient = ({ termsData }) => {
    const { t } = useTranslation();
    
    const sections = [
        { key: 'section1', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section2', hasSubsections: false, hasList: true, hasContactInfo: false },
        { key: 'section3', hasSubsections: true, hasList: false, hasContactInfo: false },
        { key: 'section4', hasSubsections: true, hasList: false, hasContactInfo: false },
        { key: 'section5', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section6', hasSubsections: false, hasList: true, hasContactInfo: false },
        { key: 'section7', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section8', hasSubsections: true, hasList: false, hasContactInfo: false },
        { key: 'section9', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section10', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section11', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section12', hasSubsections: false, hasList: false, hasContactInfo: false },
        { key: 'section13', hasSubsections: false, hasList: false, hasContactInfo: true }
    ];

    return (
        <div className="terms-conditions-page pt-120 mb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="terms-header mb-50">
                            <h1>{t('termsConditions.title')}</h1>
                            <p className="last-updated">{t('termsConditions.lastUpdatedLabel')} {t('termsConditions.lastUpdated')}</p>
                        </div>

                        <div className="terms-introduction mb-50">
                            <h2>{t('termsConditions.introduction.heading')}</h2>
                            <p>{t('termsConditions.introduction.content')}</p>
                        </div>

                        <div className="terms-content">
                            {sections.map((section, index) => (
                                <div key={index} className="terms-section mb-40">
                                    <h3>{t(`termsConditions.sections.${section.key}.heading`)}</h3>
                                    <p className="section-content">{t(`termsConditions.sections.${section.key}.content`)}</p>
                                    
                                    {section.hasList && (
                                        <ul className="terms-list">
                                            {t(`termsConditions.sections.${section.key}.list`, { returnObjects: true }).map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.hasSubsections && (
                                        <div className="terms-subsections">
                                            {section.key === 'section3' && (
                                                <>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section3.subsections.propertyAvailability.title')}</h4>
                                                        <p>{t('termsConditions.sections.section3.subsections.propertyAvailability.content')}</p>
                                                    </div>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section3.subsections.pricing.title')}</h4>
                                                        <p>{t('termsConditions.sections.section3.subsections.pricing.content')}</p>
                                                    </div>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section3.subsections.propertyImages.title')}</h4>
                                                        <p>{t('termsConditions.sections.section3.subsections.propertyImages.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                            {section.key === 'section4' && (
                                                <>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section4.subsections.reservations.title')}</h4>
                                                        <p>{t('termsConditions.sections.section4.subsections.reservations.content')}</p>
                                                    </div>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section4.subsections.paymentTerms.title')}</h4>
                                                        <p>{t('termsConditions.sections.section4.subsections.paymentTerms.content')}</p>
                                                    </div>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section4.subsections.cancellation.title')}</h4>
                                                        <p>{t('termsConditions.sections.section4.subsections.cancellation.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                            {section.key === 'section8' && (
                                                <>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section8.subsections.noWarranty.title')}</h4>
                                                        <p>{t('termsConditions.sections.section8.subsections.noWarranty.content')}</p>
                                                    </div>
                                                    <div className="terms-subsection mb-30">
                                                        <h4>{t('termsConditions.sections.section8.subsections.limitation.title')}</h4>
                                                        <p>{t('termsConditions.sections.section8.subsections.limitation.content')}</p>
                                                </div>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {section.hasContactInfo && (
                                        <div className="terms-contact-info">
                                            <p><strong>{t('termsConditions.sections.section13.email')}</strong> <Link href={`mailto:${termsData.company.email}`}>{termsData.company.email}</Link></p>
                                            <p><strong>{t('termsConditions.sections.section13.phone')}</strong> <Link href={companyData.contact.phone.link}>{companyData.contact.phone.display}</Link></p>
                                            <p><strong>{t('termsConditions.sections.section13.address')}</strong> <Link href={companyData.contact.address.link} target="_blank" rel="noopener noreferrer">{termsData.company.address}</Link></p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="terms-footer mt-50">
                            <p><strong>{termsData.company.name} ({termsData.company.shortName})</strong></p>
                            <p>{termsData.company.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsConditionsClient

