"use client";
import React, { useMemo, useState, useEffect } from "react";

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
    
    const settings = useMemo(() => {
        return {
            slidesPerView: "auto",
            speed: 1500,
            effect: 'fade',
            autoplay: {
                delay: 4000, // Increased delay to allow reading
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination1",
                clickable: true,
            },
            onSlideChange: (swiper) => {
                setActiveSlide(swiper.activeIndex);
            },
        };
    }, []);
    return (
        <div className="home1-banner-section mb-130">
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
            <div className="banner-content">
                <div className="banner-text-content">
                    <h1 className="banner-title">
                        {bannerData[activeSlide]?.title}
                    </h1>
                    <h2 className="banner-subtitle">
                        {bannerData[activeSlide]?.subtitle}
                    </h2>
                    <p className="banner-description">
                        {bannerData[activeSlide]?.description}
                    </p>
                </div>
                <Link href={bannerData[activeSlide]?.ctaLink || "/contact"} className="primary-btn2 white-bg">
                    <span>
                        {bannerData[activeSlide]?.ctaText || "Start A Project"}
                        <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                    </span>
                </Link>
            </div>
            <div className="pagination-area">
                <div className="swiper-pagination1" />
            </div>
        </div>


    )
}

export default Home1Banner