"use client";
import React from "react";
import Link from "next/link";
import faqData from "@/data/faq-data.json";

const FAQSection = () => {
    return (
        <div className="home1-faq-section mb-130">
            <div className="container">
                <div className="row gy-5 justify-content-between">
                    <div className="col-lg-7 order-lg-1 order-2">
                        <div className="faq-wrap">
                            <div className="accordion" id="accordionExample">
                                {faqData.faqs.map((faq, index) => (
                                    <div 
                                        key={faq.id}
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
                                                {String(index + 1).padStart(2, '0')}. {faq.question}
                                            </button>
                                        </h2>
                                        <div 
                                            id={`collapse-${index + 1}`} 
                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                                            aria-labelledby={`heading-${index + 1}`} 
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {faq.answer}
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
                                <span>{faqData.title.span}</span>
                                <h2>{faqData.title.heading}</h2>
                                <p>{faqData.title.description}</p>
                            </div>
                            <div className="button-area">
                                <Link href={faqData.button.link} className="primary-btn2">
                                    <span>
                                        {faqData.button.text}
                                        <svg viewBox="0 0 13 20">
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
