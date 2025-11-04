"use client";
import React, { useMemo, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper";
import Link from "next/link";
import bannerData from "@/data/banner-data.json";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home1Banner = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const swiperRef = useRef(null);
    
    const settings = useMemo(() => {
        return {
            slidesPerView: "auto",
            speed: 1500,
            effect: 'fade',
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: false, // Using custom pagination
            onSlideChange: (swiper) => {
                setActiveSlide(swiper.realIndex);
            },
            onSwiper: (swiper) => {
                swiperRef.current = swiper;
            },
        };
    }, []);

    const handleSlideClick = (index, e) => {
        e.preventDefault();
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    return (
        <div className="home1-banner-section mb-130" style={{ position: 'relative' }}>
            <div className="row">
                <div className="col-lg-12">
                    <Swiper {...settings} className="swiper home1-banner-slider">
                        <div className="swiper-wrapper">
                            {bannerData.map((slide, index) => (
                                <SwiperSlide key={slide.id} className="swiper-slide">
                                    <div 
                                        className="banner-bg" 
                                        style={{ 
                                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${slide.image})` 
                                        }} 
                                    />
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>
            </div>
            
            {/* Fixed Content Overlay */}
            <div className="banner-content" style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '100%',
                maxWidth: '1200px',
                padding: '0 60px',
                textAlign: 'left'
            }}>
                <div className="banner-text-content" style={{
                    maxWidth: '650px'
                }}>
                    <h1 className="banner-title" style={{ textAlign: 'left' }}>
                        {bannerData[activeSlide]?.title}
                    </h1>
                    <h2 className="banner-subtitle" style={{ textAlign: 'left' }}>
                        {bannerData[activeSlide]?.subtitle}
                    </h2>
                    <p className="banner-description" style={{ textAlign: 'left' }}>
                        {bannerData[activeSlide]?.description}
                    </p>
                </div>
            </div>

            {/* Fixed Buttons - Show All */}
            <div className="banner-buttons-container" style={{
                position: 'absolute',
                bottom: '120px',
                left: '60px',
                zIndex: 10,
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                maxWidth: 'calc(100% - 120px)'
            }}>
                {bannerData.map((slide, index) => (
                    <Link 
                        key={slide.id}
                        href={slide.ctaLink || "/contact"} 
                        className={`banner-slide-button ${activeSlide === index ? 'active' : ''}`}
                        onClick={(e) => {
                            if (activeSlide !== index) {
                                handleSlideClick(index, e);
                            }
                            // Allow default navigation for active button
                        }}
                        style={{
                            padding: '14px 28px',
                            background: activeSlide === index 
                                ? 'linear-gradient(135deg, #B149ED 0%, #7C3AED 100%)' 
                                : 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: activeSlide === index 
                                ? '2px solid rgba(177, 73, 237, 0.5)' 
                                : '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: activeSlide === index 
                                ? '0 8px 24px rgba(177, 73, 237, 0.4)' 
                                : '0 4px 12px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer'
                        }}
                    >
                        <span>{slide.ctaText}</span>
                        <svg viewBox="0 0 13 20" style={{ width: '16px', height: '16px' }}>
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
                        </svg>
                    </Link>
                ))}
            </div>

            {/* Custom Pagination - Better Design */}
            <div className="pagination-area" style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
                {bannerData.map((slide, index) => (
                    <button
                        key={slide.id}
                        className={`custom-pagination-dot ${activeSlide === index ? 'active' : ''}`}
                        onClick={() => {
                            if (swiperRef.current) {
                                swiperRef.current.slideTo(index);
                            }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                        style={{
                            width: activeSlide === index ? '32px' : '10px',
                            height: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            background: activeSlide === index 
                                ? 'linear-gradient(135deg, #B149ED 0%, #7C3AED 100%)' 
                                : 'rgba(255, 255, 255, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            outline: 'none',
                            boxShadow: activeSlide === index 
                                ? '0 4px 12px rgba(177, 73, 237, 0.5)' 
                                : 'none'
                        }}
                    />
                ))}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .banner-slide-button:hover {
                    background: rgba(255, 255, 255, 0.25) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
                }
                
                .banner-slide-button.active:hover {
                    background: linear-gradient(135deg, #C158F5 0%, #8C4AFD 100%) !important;
                    box-shadow: 0 10px 30px rgba(177, 73, 237, 0.5) !important;
                }

                .custom-pagination-dot:hover {
                    background: rgba(255, 255, 255, 0.6) !important;
                    transform: scale(1.2);
                }

                .custom-pagination-dot.active:hover {
                    background: linear-gradient(135deg, #C158F5 0%, #8C4AFD 100%) !important;
                    box-shadow: 0 6px 16px rgba(177, 73, 237, 0.6) !important;
                }

                @media (max-width: 768px) {
                    .banner-content {
                        padding: 0 20px !important;
                    }

                    .banner-buttons-container {
                        flex-direction: column;
                        gap: 10px;
                        bottom: 100px;
                        left: 20px !important;
                        max-width: calc(100% - 40px) !important;
                    }
                    
                    .banner-slide-button {
                        width: 100%;
                        max-width: 280px;
                        justify-content: flex-start;
                    }

                    .pagination-area {
                        bottom: 30px;
                        padding: 10px 18px;
                        gap: 8px;
                    }

                    .custom-pagination-dot {
                        height: 8px !important;
                    }

                    .custom-pagination-dot.active {
                        width: 24px !important;
                    }

                    .custom-pagination-dot:not(.active) {
                        width: 8px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default Home1Banner