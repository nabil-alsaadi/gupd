"use client";
import React from 'react'
import Link from 'next/link'
import companyData from '@/data/companyData.json'

const TermsConditionsClient = ({ termsData }) => {
    return (
        <div className="terms-conditions-page pt-120 mb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="terms-header mb-50">
                            <h1>{termsData.title}</h1>
                            <p className="last-updated">Last Updated: {termsData.lastUpdated}</p>
                        </div>

                        <div className="terms-introduction mb-50">
                            <h2>{termsData.introduction.heading}</h2>
                            <p>{termsData.introduction.content}</p>
                        </div>

                        <div className="terms-content">
                            {termsData.sections.map((section, index) => (
                                <div key={index} className="terms-section mb-40">
                                    <h3>{section.heading}</h3>
                                    {section.content && (
                                        <p className="section-content">{section.content}</p>
                                    )}
                                    
                                    {section.list && (
                                        <ul className="terms-list">
                                            {section.list.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.subsections && (
                                        <div className="terms-subsections">
                                            {section.subsections.map((subsection, subIndex) => (
                                                <div key={subIndex} className="terms-subsection mb-30">
                                                    <h4>{subsection.title}</h4>
                                                    <p>{subsection.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {section.contactInfo && (
                                        <div className="terms-contact-info">
                                            <p><strong>Email:</strong> <Link href={`mailto:${section.contactInfo.email}`}>{section.contactInfo.email}</Link></p>
                                            <p><strong>Phone:</strong> <Link href={companyData.contact.phone.link}>{section.contactInfo.phone}</Link></p>
                                            <p><strong>Address:</strong> <Link href={companyData.contact.address.link} target="_blank" rel="noopener noreferrer">{section.contactInfo.address}</Link></p>
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

