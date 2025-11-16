"use client";
import React from 'react'
import Link from 'next/link'
import companyData from '@/data/companyData.json'

const SupportPolicyClient = ({ supportData }) => {
    return (
        <div className="support-policy-page pt-120 mb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="support-header mb-50">
                            <h1>{supportData.title}</h1>
                            <p className="last-updated">Last Updated: {supportData.lastUpdated}</p>
                        </div>

                        <div className="support-introduction mb-50">
                            <h2>{supportData.introduction.heading}</h2>
                            <p>{supportData.introduction.content}</p>
                        </div>

                        <div className="support-content">
                            {supportData.sections.map((section, index) => (
                                <div key={index} className="support-section mb-40">
                                    <h3>{section.heading}</h3>
                                    {section.content && (
                                        <p className="section-content">{section.content}</p>
                                    )}
                                    
                                    {section.list && (
                                        <ul className="support-list">
                                            {section.list.map((item, itemIndex) => {
                                                // Check if item contains email or phone to make them clickable
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
                                            })}
                                        </ul>
                                    )}

                                    {section.subsections && (
                                        <div className="support-subsections">
                                            {section.subsections.map((subsection, subIndex) => (
                                                <div key={subIndex} className="support-subsection mb-30">
                                                    <h4>{subsection.title}</h4>
                                                    <p>{subsection.content}</p>
                                                </div>
                                            ))}
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

