"use client"
import React, { useMemo, useEffect, useRef, useState } from "react";
import staticTeamData from "@/data/team-data.json";
import { useLanguage } from "@/providers/LanguageProvider";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home1Team = ({ teamData }) => {
    const { locale } = useLanguage();
    const isRTL = locale === "ar";
    const swiperRef = useRef(null);
    const [swiperKey, setSwiperKey] = useState(0);
    
    // Use teamData prop if provided, otherwise fall back to static data
    const team = teamData || staticTeamData.team;
    const sectionTitle = team.sectionTitle || staticTeamData.team.sectionTitle;
    const founder = team.founder || staticTeamData.team.founder;
    const members = Array.isArray(team.members) && team.members.length > 0
        ? team.members
        : staticTeamData.team.members;
    
    // Flip animation classes for RTL
    const leftAnimation = isRTL ? "fadeInRight" : "fadeInLeft";
    const rightAnimation = isRTL ? "fadeInLeft" : "fadeInRight";

    // Force Swiper remount when direction changes
    useEffect(() => {
        // Wait for DOM to update with new direction attribute
        const timer = setTimeout(() => {
            setSwiperKey(prev => prev + 1);
        }, 100);
        
        return () => clearTimeout(timer);
    }, [locale, isRTL]);

    const settings = useMemo(() => {
        return {
          slidesPerView: "auto",
          speed: 1500,
          spaceBetween: 25,
          autoplay: {
            delay: 2500, // Autoplay duration in milliseconds
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".team-slider-next",
            prevEl: ".team-slider-prev",
          },
          breakpoints: {
            280: {
              slidesPerView: 1,
            },
            386: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 4,
            },
          },
        };
      }, []);
    return (
        <div className="home1-team-section mb-130">
        <div className="container">
          <div className="row gy-5 align-items-center justify-content-between mb-70">
            <div className={`col-lg-4 wow animate ${leftAnimation}`} data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title">
                <span>{isRTL && sectionTitle?.taglineArabic ? sectionTitle.taglineArabic : sectionTitle?.tagline}</span>
                <h2>{isRTL && sectionTitle?.titleArabic ? sectionTitle.titleArabic : sectionTitle?.title}</h2>
              </div>
              <div className="slider-btn-grp d-lg-flex d-none">
                <div className="slider-btn team-slider-prev">
                  <i className={`bi bi-arrow-${isRTL ? "right" : "left"}`} />
                </div>
                <div className="slider-btn team-slider-next">
                  <i className={`bi bi-arrow-${isRTL ? "left" : "right"}`} />
                </div>
              </div>
            </div>
            <div className={`col-xxl-7 col-lg-8 wow animate ${rightAnimation}`} data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="founder-card">
                <div className="founder-img">
                  <img src={founder?.image} alt={founder?.name || "Founder"} />
                </div>
                <div className="founder-content">
                  <p>"{isRTL && founder?.quoteArabic ? founder.quoteArabic : founder?.quote}".</p>
                  <div className="name-and-desig">
                    <span>{isRTL && founder?.positionArabic ? founder.positionArabic : founder?.position}</span>
                    <h5>{isRTL && founder?.nameArabic ? founder.nameArabic : founder?.name}</h5>
                  </div>
                </div>
              </div>
              <div className="slider-btn-grp d-lg-none d-flex">
                <div className="slider-btn team-slider-prev">
                  <i className={`bi bi-arrow-${isRTL ? "right" : "left"}`} />
                </div>
                <div className="slider-btn team-slider-next">
                  <i className={`bi bi-arrow-${isRTL ? "left" : "right"}`} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Swiper 
                {...settings} 
                className="swiper home1-team-slider"
                onSwiper={(swiper) => {
                  swiperRef.current = { swiper };
                }}
                key={`${locale}-${swiperKey}`}
              >
                <div className="swiper-wrapper">
                  {members.map((member, index) => (
                    <SwiperSlide key={member.id || index} className="swiper-slide">
                      <div className="team-card">
                        <div className="team-img">
                          <img src={member.image} alt={member.name || "Team member"} />
                        </div>
                        <div className="team-content">
                          <span>{isRTL && member.positionArabic ? member.positionArabic : member.position}</span>
                          <h5>{isRTL && member.nameArabic ? member.nameArabic : member.name}</h5>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

    )
}

export default Home1Team