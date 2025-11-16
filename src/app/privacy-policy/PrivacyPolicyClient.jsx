"use client";
import React from 'react'
import Link from 'next/link'
import companyData from '@/data/companyData.json'

const PrivacyPolicyClient = ({ privacyData }) => {
    return (
        <div className="privacy-policy-page pt-120 mb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="policy-header mb-50">
                            <h1>{privacyData.title}</h1>
                            <p className="last-updated">Last Updated: {privacyData.lastUpdated}</p>
                        </div>

                        <div className="policy-introduction mb-50">
                            <h2>{privacyData.introduction.heading}</h2>
                            <p>{privacyData.introduction.content}</p>
                        </div>

                        <div className="policy-content">
                            {privacyData.sections.map((section, index) => (
                                <div key={index} className="policy-section mb-40">
                                    <h3>{section.heading}</h3>
                                    {section.content && (
                                        <p className="section-content">{section.content}</p>
                                    )}
                                    
                                    {section.list && (
                                        <ul className="policy-list">
                                            {section.list.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.subsections && (
                                        <div className="policy-subsections">
                                            {section.subsections.map((subsection, subIndex) => (
                                                <div key={subIndex} className="policy-subsection mb-30">
                                                    <h4>{subsection.title}</h4>
                                                    <p>{subsection.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {section.contactInfo && (
                                        <div className="policy-contact-info">
                                            <p><strong>Email:</strong> <Link href={`mailto:${section.contactInfo.email}`}>{section.contactInfo.email}</Link></p>
                                            <p><strong>Phone:</strong> <Link href={companyData.contact.phone.link}>{section.contactInfo.phone}</Link></p>
                                            <p><strong>Address:</strong> <Link href={companyData.contact.address.link} target="_blank" rel="noopener noreferrer">{section.contactInfo.address}</Link></p>
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

