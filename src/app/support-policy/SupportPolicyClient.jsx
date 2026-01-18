"use client";
import React from 'react'
import Link from 'next/link'
import companyData from '@/data/companyData.json'
import { useTranslation } from "react-i18next";

const SupportPolicyClient = ({ supportData }) => {
    const { t } = useTranslation();
    
    const sections = [
        { key: 'section1', hasSubsections: true, hasList: false },
        { key: 'section2', hasSubsections: false, hasList: true },
        { key: 'section3', hasSubsections: false, hasList: true },
        { key: 'section4', hasSubsections: true, hasList: false },
        { key: 'section5', hasSubsections: false, hasList: true },
        { key: 'section6', hasSubsections: true, hasList: false },
        { key: 'section7', hasSubsections: false, hasList: true },
        { key: 'section8', hasSubsections: true, hasList: false },
        { key: 'section9', hasSubsections: false, hasList: false },
        { key: 'section10', hasSubsections: false, hasList: false },
        { key: 'section11', hasSubsections: false, hasList: true },
        { key: 'section12', hasSubsections: false, hasList: false }
    ];

    const renderListItem = (item, itemIndex) => {
        // Check if item contains email, phone, or WhatsApp to make them clickable
                                                const emailMatch = item.match(/Email:\s*([^\s]+)/);
                                                const phoneMatch = item.match(/Phone:\s*([^\s]+)/);
                                                const whatsappMatch = item.match(/WhatsApp:\s*([^\s]+)/);
                                                
                                                if (emailMatch) {
                                                    return (
                                                        <li key={itemIndex}>
                                                            {item.split(emailMatch[0])[0]}
                                                            <strong>Email:</strong> <Link href={`mailto:${emailMatch[1]}`}>{emailMatch[1]}</Link>
                                                        </li>
                                                    );
                                                }
                                                if (phoneMatch) {
                                                    return (
                                                        <li key={itemIndex}>
                                                            {item.split(phoneMatch[0])[0]}
                                                            <strong>Phone:</strong> <Link href={companyData.contact.phone.link}>{phoneMatch[1]}</Link>
                                                        </li>
                                                    );
                                                }
                                                if (whatsappMatch) {
                                                    return (
                                                        <li key={itemIndex}>
                                                            {item.split(whatsappMatch[0])[0]}
                                                            <strong>WhatsApp:</strong> <Link href={companyData.contact.whatsapp.link} target="_blank" rel="noopener noreferrer">{whatsappMatch[1]}</Link>
                                                        </li>
                                                    );
                                                }
                                                return <li key={itemIndex}>{item}</li>;
    };

    return (
        <div className="support-policy-page pt-120 mb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="support-header mb-50">
                            <h1>{t('supportPolicy.title')}</h1>
                            <p className="last-updated">{t('supportPolicy.lastUpdatedLabel')} {t('supportPolicy.lastUpdated')}</p>
                        </div>

                        <div className="support-introduction mb-50">
                            <h2>{t('supportPolicy.introduction.heading')}</h2>
                            <p>{t('supportPolicy.introduction.content')}</p>
                        </div>

                        <div className="support-content">
                            {sections.map((section, index) => (
                                <div key={index} className="support-section mb-40">
                                    <h3>{t(`supportPolicy.sections.${section.key}.heading`)}</h3>
                                    <p className="section-content">{t(`supportPolicy.sections.${section.key}.content`)}</p>
                                    
                                    {section.hasList && (
                                        <ul className="support-list">
                                            {t(`supportPolicy.sections.${section.key}.list`, { returnObjects: true }).map((item, itemIndex) => 
                                                renderListItem(item, itemIndex)
                                            )}
                                        </ul>
                                    )}

                                    {section.hasSubsections && (
                                        <div className="support-subsections">
                                            {section.key === 'section1' && (
                                                <>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section1.subsections.businessHours.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section1.subsections.businessHours.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section1.subsections.responseTimes.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section1.subsections.responseTimes.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                            {section.key === 'section4' && (
                                                <>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section4.subsections.highPriority.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section4.subsections.highPriority.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section4.subsections.mediumPriority.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section4.subsections.mediumPriority.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section4.subsections.lowPriority.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section4.subsections.lowPriority.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                            {section.key === 'section6' && (
                                                <>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section6.subsections.scheduling.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section6.subsections.scheduling.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section6.subsections.cancellations.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section6.subsections.cancellations.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section6.subsections.requirements.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section6.subsections.requirements.content')}</p>
                                                    </div>
                                                </>
                                            )}
                                            {section.key === 'section8' && (
                                                <>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section8.subsections.level1.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section8.subsections.level1.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section8.subsections.level2.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section8.subsections.level2.content')}</p>
                                                    </div>
                                                    <div className="support-subsection mb-30">
                                                        <h4>{t('supportPolicy.sections.section8.subsections.legalDisputes.title')}</h4>
                                                        <p>{t('supportPolicy.sections.section8.subsections.legalDisputes.content')}</p>
                                                </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="support-footer mt-50">
                            <p><strong>{supportData.company.name} ({supportData.company.shortName})</strong></p>
                            <p>{supportData.company.address}</p>
                            <p><Link href={`mailto:${supportData.company.email}`}>{supportData.company.email}</Link> | <Link href={companyData.contact.phone.link}>{supportData.company.phone}</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupportPolicyClient

