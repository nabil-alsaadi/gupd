"use client";
import React from 'react'
import Link from 'next/link'
import companyData from '@/data/companyData.json'
import { useTranslation } from "react-i18next";

const PrivacyPolicyClient = ({ privacyData }) => {
    const { t } = useTranslation();
    
    const sections = [
        {
            key: 'section1',
            hasSubsections: true,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section2',
            hasSubsections: false,
            hasList: true,
            hasContactInfo: false
        },
        {
            key: 'section3',
            hasSubsections: true,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section4',
            hasSubsections: false,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section5',
            hasSubsections: false,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section6',
            hasSubsections: false,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section7',
            hasSubsections: false,
            hasList: true,
            hasContactInfo: false
        },
        {
            key: 'section8',
            hasSubsections: false,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section9',
            hasSubsections: false,
            hasList: false,
            hasContactInfo: false
        },
        {
            key: 'section10',
            hasSubsections: false,
            hasList: false,
            hasContactInfo: true
        }
    ];

    return (
        <div className="privacy-policy-page pt-120 mb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="policy-header mb-50">
                            <h1>{t('privacyPolicy.title')}</h1>
                            <p className="last-updated">{t('privacyPolicy.lastUpdatedLabel')} {t('privacyPolicy.lastUpdated')}</p>
                        </div>

                        <div className="policy-introduction mb-50">
                            <h2>{t('privacyPolicy.introduction.heading')}</h2>
                            <p>{t('privacyPolicy.introduction.content')}</p>
                        </div>

                        <div className="policy-content">
                            {sections.map((section, index) => (
                                <div key={index} className="policy-section mb-40">
                                    <h3>{t(`privacyPolicy.sections.${section.key}.heading`)}</h3>
                                    <p className="section-content">{t(`privacyPolicy.sections.${section.key}.content`)}</p>
                                    
                                    {section.hasList && (
                                        <ul className="policy-list">
                                            {t(`privacyPolicy.sections.${section.key}.list`, { returnObjects: true }).map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.hasSubsections && (
                                        <div className="policy-subsections">
                                            {section.key === 'section1' && (
                                                <>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section1.subsections.personalData.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section1.subsections.personalData.content')}</p>
                                                    </div>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section1.subsections.derivativeData.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section1.subsections.derivativeData.content')}</p>
                                                    </div>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section1.subsections.financialData.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section1.subsections.financialData.content')}</p>
                                                    </div>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section1.subsections.contactForms.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section1.subsections.contactForms.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                            {section.key === 'section3' && (
                                                <>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section3.subsections.byLaw.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section3.subsections.byLaw.content')}</p>
                                                    </div>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section3.subsections.thirdParty.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section3.subsections.thirdParty.content')}</p>
                                                    </div>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section3.subsections.businessTransfers.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section3.subsections.businessTransfers.content')}</p>
                                                    </div>
                                                    <div className="policy-subsection mb-30">
                                                        <h4>{t('privacyPolicy.sections.section3.subsections.realEstatePartners.title')}</h4>
                                                        <p>{t('privacyPolicy.sections.section3.subsections.realEstatePartners.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {section.hasContactInfo && (
                                        <div className="policy-contact-info">
                                            <p><strong>{t('privacyPolicy.sections.section10.email')}</strong> <Link href={`mailto:${privacyData.company.email}`}>{privacyData.company.email}</Link></p>
                                            <p><strong>{t('privacyPolicy.sections.section10.phone')}</strong> <Link href={companyData.contact.phone.link}>{companyData.contact.phone.display}</Link></p>
                                            <p><strong>{t('privacyPolicy.sections.section10.address')}</strong> <Link href={companyData.contact.address.link} target="_blank" rel="noopener noreferrer">{privacyData.company.address}</Link></p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="policy-footer mt-50">
                            <p><strong>{privacyData.company.name} ({privacyData.company.shortName})</strong></p>
                            <p>{privacyData.company.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyClient

