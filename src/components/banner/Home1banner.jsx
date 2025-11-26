"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper";
import Link from "next/link";
import bannerData from "@/data/banner-data.json";
import { useLanguage } from "@/providers/LanguageProvider";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home1Banner = ({ banners }) => {
    const { locale } = useLanguage();
    const isRTL = locale === 'ar';
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const swiperRef = useRef(null);
    const videoRefs = useRef({});
    
    // Use banners prop if provided, otherwise fall back to static data
    const slides = banners && banners.length > 0 ? banners : bannerData;

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Preload images to prevent gray flash
    useEffect(() => {
        if (slides.length === 0) return;

        // Preload all banner images in the background (skip video slides)
        slides.forEach((slide) => {
            if (slide.image && !slide.video) {
                const img = new Image();
                img.src = slide.image;
            }
        });
    }, [slides]);

    useEffect(() => {
        if (activeSlide >= slides.length) {
            setActiveSlide(0);
        }
    }, [activeSlide, slides.length]);

    // Play video for initial active slide
    useEffect(() => {
        const initialVideo = videoRefs.current[activeSlide];
        if (initialVideo) {
            initialVideo.play().catch((err) => {
                console.log('Video autoplay prevented:', err);
            });
        }
    }, [activeSlide]);
    
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
                const newIndex = swiper.realIndex;
                setActiveSlide(newIndex);
                
                // Pause all videos
                Object.values(videoRefs.current).forEach((video) => {
                    if (video) {
                        video.pause();
                    }
                });
                
                // Play video for active slide if it exists
                const activeVideo = videoRefs.current[newIndex];
                if (activeVideo) {
                    activeVideo.currentTime = 0;
                    activeVideo.play().catch((err) => {
                        console.log('Video autoplay prevented:', err);
                    });
                }
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
                            {slides.map((slide, index) => (
                                <SwiperSlide key={slide.id || index} className="swiper-slide">
                                    {slide.video ? (
                                        <div className="banner-bg banner-video-wrapper" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                            <video
                                                ref={(el) => {
                                                    if (el) {
                                                        videoRefs.current[index] = el;
                                                    }
                                                }}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="banner-video"
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    zIndex: 1
                                                }}
                                            >
                                                <source src={slide.video} type="video/mp4" />
                                            </video>
                                            <div 
                                                className="banner-video-overlay"
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%)',
                                                    zIndex: 2
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div 
                                            className="banner-bg" 
                                            style={{ 
                                                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${slide.image})`,
                                                backgroundColor: '#1a1a1a', // Fallback dark color to prevent gray flash
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center center',
                                                backgroundRepeat: 'no-repeat'
                                            }} 
                                        />
                                    )}
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
                left: isRTL ? 'auto' : '0',
                right: isRTL ? '0' : 'auto',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '100%',
                maxWidth: '1200px',
                padding: '0 60px',
                textAlign: isRTL ? 'right' : 'left'
            }}>
                <div className="banner-text-content" style={{
                    maxWidth: '650px',
                    marginLeft: isRTL ? 'auto' : '0',
                    marginRight: isRTL ? '0' : 'auto'
                }}>
                    <h1 className="banner-title" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        {slides[activeSlide]?.title}
                    </h1>
                    <h2 className="banner-subtitle" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        {slides[activeSlide]?.subtitle}
                    </h2>
                    <p className="banner-description" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        {slides[activeSlide]?.description}
                    </p>
                </div>
            </div>

            {/* Fixed Buttons - Show All on Desktop, Only Active on Mobile */}
            <div className="banner-buttons-container" style={{
                position: 'absolute',
                bottom: '120px',
                left: isRTL ? 'auto' : '60px',
                right: isRTL ? '60px' : 'auto',
                zIndex: 10,
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                justifyContent: isRTL ? 'flex-end' : 'flex-start',
                maxWidth: 'calc(100% - 120px)'
            }}>
                {slides.map((slide, index) => {
                    // On mobile, only show the active button
                    if (isMobile && activeSlide !== index) {
                        return null;
                    }
                    
                    return (
                        <Link 
                            key={slide.id || index}
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
                            <svg viewBox="0 0 13 20" style={{ 
                                width: '16px', 
                                height: '16px',
                                transform: isRTL ? 'scaleX(-1)' : 'none'
                            }}>
                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
                            </svg>
                        </Link>
                    );
                })}
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
                {slides.map((slide, index) => (
                    <button
                        key={slide.id || index}
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
                .home1-banner-section .banner-bg {
                    background-color: #1a1a1a !important;
                    transition: opacity 0.3s ease-in-out;
                }

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
                        top: 40% !important;
                        transform: translateY(-50%) !important;
                    }

                    .banner-buttons-container {
                        flex-direction: column;
                        gap: 10px;
                        bottom: 100px;
                        left: 20px !important;
                        right: auto !important;
                        max-width: calc(100% - 40px) !important;
                    }
                    
                    [dir="rtl"] .banner-buttons-container {
                        left: auto !important;
                        right: 20px !important;
                    }
                    
                    .banner-buttons-container .banner-slide-button:not(.active) {
                        display: none !important;
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