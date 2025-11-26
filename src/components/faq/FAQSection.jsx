"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import faqData from "@/data/faq-data.json";
import { getDocuments } from "@/utils/firestore";
import { useLanguage } from "@/providers/LanguageProvider";

const FAQSection = () => {
    const { locale } = useLanguage();
    const isRTL = locale === 'ar';
    const [faqContent, setFaqContent] = useState(null);

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                const faqDocs = await getDocuments('faq');
                
                if (!faqDocs || faqDocs.length === 0) {
                    setFaqContent({
                        title: faqData.title,
                        button: faqData.button,
                        faqs: faqData.faqs
                    });
                    return;
                }

                const doc = faqDocs[0];
                const fallback = {
                    title: faqData.title,
                    button: faqData.button,
                    faqs: faqData.faqs
                };

                setFaqContent({
                    title: {
                        span: doc.title?.span || fallback.title.span,
                        spanArabic: doc.title?.spanArabic || fallback.title.span,
                        heading: doc.title?.heading || fallback.title.heading,
                        headingArabic: doc.title?.headingArabic || fallback.title.heading,
                        description: doc.title?.description || fallback.title.description,
                        descriptionArabic: doc.title?.descriptionArabic || fallback.title.description
                    },
                    button: {
                        text: doc.button?.text || fallback.button.text,
                        textArabic: doc.button?.textArabic || fallback.button.text,
                        link: doc.button?.link || fallback.button.link
                    },
                    faqs: Array.isArray(doc.faqs) && doc.faqs.length > 0
                        ? doc.faqs.map(faq => ({
                            id: faq.id || `faq-${Math.random()}`,
                            question: faq.question || '',
                            questionArabic: faq.questionArabic || faq.question || '',
                            answer: faq.answer || '',
                            answerArabic: faq.answerArabic || faq.answer || '',
                            delay: faq.delay || '200ms'
                        }))
                        : fallback.faqs
                });
            } catch (error) {
                console.error('Error fetching FAQ from Firestore:', error);
                // Fall back to static data on error
                setFaqContent({
                    title: faqData.title,
                    button: faqData.button,
                    faqs: faqData.faqs
                });
            }
        };

        fetchFAQData();
    }, []);

    // Use static data while loading
    const displayData = faqContent || {
        title: faqData.title,
        button: faqData.button,
        faqs: faqData.faqs
    };

    return (
        <div className="home1-faq-section mb-130">
            <div className="container">
                <div className="row gy-5 justify-content-between">
                    <div className="col-lg-7 order-lg-1 order-2">
                        <div className="faq-wrap">
                            <div className="accordion" id="accordionExample">
                                {displayData.faqs.map((faq, index) => (
                                    <div 
                                        key={faq.id || index}
                                        className="accordion-item wow animate fadeInDown" 
                                        data-wow-delay={faq.delay} 
                                        data-wow-duration="1500ms"
                                    >
                                        <h2 className="accordion-header" id={`heading-${index + 1}`}>
                                            <button 
                                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} 
                                                type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target={`#collapse-${index + 1}`} 
                                                aria-expanded={index === 0 ? "true" : "false"} 
                                                aria-controls={`collapse-${index + 1}`}
                                            >
                                                {String(index + 1).padStart(2, '0')}. {isRTL && faq.questionArabic ? faq.questionArabic : faq.question}
                                            </button>
                                        </h2>
                                        <div 
                                            id={`collapse-${index + 1}`} 
                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                                            aria-labelledby={`heading-${index + 1}`} 
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {isRTL && faq.answerArabic ? faq.answerArabic : faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 order-lg-2 order-1 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="title-area">
                            <div className="section-title">
                                <span>{isRTL && displayData.title.spanArabic ? displayData.title.spanArabic : displayData.title.span}</span>
                                <h2>{isRTL && displayData.title.headingArabic ? displayData.title.headingArabic : displayData.title.heading}</h2>
                                <p>{isRTL && displayData.title.descriptionArabic ? displayData.title.descriptionArabic : displayData.title.description}</p>
                            </div>
                            <div className="button-area">
                                <Link href={displayData.button.link} className="primary-btn2">
                                    <span>
                                        {isRTL && displayData.button.textArabic ? displayData.button.textArabic : displayData.button.text}
                                        <svg viewBox="0 0 13 20" style={{ transform: isRTL ? 'scaleX(-1)' : 'none', display: 'inline-block' }}>
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
