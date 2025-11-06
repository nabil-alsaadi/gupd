"use client";
/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import gupdContent from '@/data/gupdContent.json';
import { 
    MapPin, 
    DraftingCompass, 
    FileCheck, 
    Building2, 
    ShieldCheck, 
    Handshake 
} from 'lucide-react';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const ProcessSection = () => {
    const methodology = gupdContent.methodology;

    const settings = useMemo(() => ({
        slidesPerView: "auto",
        speed: 1500,
        spaceBetween: 25,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4, spaceBetween: 25 },
            1400: { slidesPerView: 4, spaceBetween: 30 },
        },
    }), []);

    // Icons from Lucide React for each step
    const stepIcons = [
        MapPin,        // Step 01: Site Selection & Feasibility
        DraftingCompass, // Step 02: Design & Planning
        FileCheck,     // Step 03: Permits & Approvals
        Building2,    // Step 04: Construction & Development
        ShieldCheck,  // Step 05: Quality Assurance
        Handshake,    // Step 06: Handover & After-Sales
    ];

    return (
        <div className="home3-process-section mb-120">
            <div className="container-fluid">
                <div className="row justify-content-center mb-70 wow animate slideInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div className="col-lg-7">
                        <div className="section-title three text-center">
                            <span>{methodology.title}</span>
                            <h2>{methodology.heading}</h2>
                            <p>{methodology.description}</p>
                        </div>
                    </div>
                </div>
                <div className="process-slider-wrap">
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper {...settings} className="swiper home3-process-slider">
                                {methodology.steps.map((step, index) => {
                                    const Icon = stepIcons[index];
                                    return (
                                        <SwiperSlide key={index} className="swiper-slide">
                                            <div className="process-card">
                                                <div className="step-no">
                                                    <span>STEP : {step.stepNumber}</span>
                                                </div>
                                                <div className="process-content">
                                                    <div className="icon">
                                                        {Icon ? (
                                                            <Icon 
                                                                size={60} 
                                                                strokeWidth={1.5} 
                                                                style={{ fill: 'none', stroke: 'currentColor' }}
                                                                className="lucide-icon"
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <h4>{step.title}</h4>
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessSection;