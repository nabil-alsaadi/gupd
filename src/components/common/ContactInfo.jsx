"use client";
import React, { useEffect, useState } from 'react'
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react'
import companyData from '@/data/companyData.json'
import { useFirestore } from '@/hooks/useFirebase'
import { useTranslation } from 'react-i18next'

const ContactInfo = ({ showArrow = false, className = "", contactData = null }) => {
    const classes = className ? `contact-area ${className}`.trim() : "contact-area"
    const { data: contactDocs, fetchData } = useFirestore('contact');
    const { t } = useTranslation();
    const [contact, setContact] = useState(() => {
        // Use provided contactData if available
        if (contactData) {
            return contactData;
        }
        // Fallback to static data
        return {
            phone: companyData.contact.phone,
            whatsapp: companyData.contact.whatsapp,
            email: companyData.contact.email,
            address: companyData.contact.address,
            workingHours: companyData.contact.workingHours
        };
    });

    useEffect(() => {
        // If contactData is provided as prop, use it (server-side rendered)
        if (contactData) {
            setContact(contactData);
            return;
        }
        
        // Otherwise, fetch from Firebase on client side
        fetchData().catch(() => null);
    }, [contactData, fetchData]);

    useEffect(() => {
        // Update contact when Firebase data loads (only if no contactData prop)
        if (!contactData && contactDocs && contactDocs.length > 0) {
            const doc = contactDocs[0];
            setContact({
                phone: doc.phone || companyData.contact.phone,
                whatsapp: doc.whatsapp || companyData.contact.whatsapp,
                email: doc.email || companyData.contact.email,
                address: doc.address || companyData.contact.address,
                workingHours: doc.workingHours || companyData.contact.workingHours
            });
        }
    }, [contactDocs, contactData]);

    return (
        <ul className={classes}>
            <li>
                <div className="single-contact">
                    <div className="icon">
                        <Phone size={33} strokeWidth={1.5} />
                    </div>
                    <div className="content">
                        <span>{t('contact.callAnyTime')}</span>
                        <h6><a href={contact.phone?.link || '#'}>{contact.phone?.display || ''}</a></h6>
                    </div>
                </div>
                {showArrow && (
                    <svg className="arrow" width={8} height={29} viewBox="0 0 8 29" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33333 3C1.33333 4.47276 2.52724 5.66667 4 5.66667C5.47276 5.66667 6.66667 4.47276 6.66667 3C6.66667 1.52724 5.47276 0.333333 4 0.333333C2.52724 0.333333 1.33333 1.52724 1.33333 3ZM3.64645 28.3536C3.84171 28.5488 4.15829 28.5488 4.35355 28.3536L7.53553 25.1716C7.7308 24.9763 7.7308 24.6597 7.53553 24.4645C7.34027 24.2692 7.02369 24.2692 6.82843 24.4645L4 27.2929L1.17157 24.4645C0.976311 24.2692 0.659728 24.2692 0.464466 24.4645C0.269204 24.6597 0.269204 24.9763 0.464466 25.1716L3.64645 28.3536ZM3.5 3V28H4.5V3H3.5Z" />
                    </svg>
                )}
            </li>
            <li>
                <div className="single-contact">
                    <div className="icon">
                        <MessageCircle size={33} strokeWidth={1.5} />
                    </div>
                    <div className="content">
                        <span>{t('contact.whatsapp')}</span>
                        <h6><a href={contact.whatsapp?.link || '#'} target="_blank" rel="noopener noreferrer">{contact.whatsapp?.display || ''}</a></h6>
                    </div>
                </div>
                {showArrow && (
                    <svg className="arrow" width={8} height={29} viewBox="0 0 8 29" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33333 3C1.33333 4.47276 2.52724 5.66667 4 5.66667C5.47276 5.66667 6.66667 4.47276 6.66667 3C6.66667 1.52724 5.47276 0.333333 4 0.333333C2.52724 0.333333 1.33333 1.52724 1.33333 3ZM3.64645 28.3536C3.84171 28.5488 4.15829 28.5488 4.35355 28.3536L7.53553 25.1716C7.7308 24.9763 7.7308 24.6597 7.53553 24.4645C7.34027 24.2692 7.02369 24.2692 6.82843 24.4645L4 27.2929L1.17157 24.4645C0.976311 24.2692 0.659728 24.2692 0.464466 24.4645C0.269204 24.6597 0.269204 24.9763 0.464466 25.1716L3.64645 28.3536ZM3.5 3V28H4.5V3H3.5Z" />
                    </svg>
                )}
            </li>
            <li>
                <div className="single-contact">
                    <div className="icon">
                        <MapPin size={33} strokeWidth={1.5} />
                    </div>
                    <div className="content">
                        <span>{t('contact.address')}</span>
                        <h6><a href={contact.address?.link || '#'} target="_blank" rel="noopener noreferrer">{contact.address?.primary || ''}</a></h6>
                    </div>
                </div>
                {showArrow && (
                    <svg className="arrow" width={8} height={29} viewBox="0 0 8 29" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33333 3C1.33333 4.47276 2.52724 5.66667 4 5.66667C5.47276 5.66667 6.66667 4.47276 6.66667 3C6.66667 1.52724 5.47276 0.333333 4 0.333333C2.52724 0.333333 1.33333 1.52724 1.33333 3ZM3.64645 28.3536C3.84171 28.5488 4.15829 28.5488 4.35355 28.3536L7.53553 25.1716C7.7308 24.9763 7.7308 24.6597 7.53553 24.4645C7.34027 24.2692 7.02369 24.2692 6.82843 24.4645L4 27.2929L1.17157 24.4645C0.976311 24.2692 0.659728 24.2692 0.464466 24.4645C0.269204 24.6597 0.269204 24.9763 0.464466 25.1716L3.64645 28.3536ZM3.5 3V28H4.5V3H3.5Z" />
                    </svg>
                )}
            </li>
            <li>
                <div className="single-contact">
                    <div className="icon">
                        <Mail size={33} strokeWidth={1.5} />
                    </div>
                    <div className="content">
                        <span>{t('contact.sayHello')}</span>
                        <h6><a href={contact.email?.link || '#'}>{contact.email?.display || ''}</a></h6>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default ContactInfo
