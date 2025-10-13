"use client"
import React, { useMemo } from "react";
import teamData from "../../data/team-data.json";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
const Home1Team = () => {
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
            <div className="col-lg-4 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title">
                <span>{teamData.team.sectionTitle.tagline}</span>
                <h2>{teamData.team.sectionTitle.title}</h2>
              </div>
              <div className="slider-btn-grp d-lg-flex d-none">
                <div className="slider-btn team-slider-prev">
                  <i className="bi bi-arrow-left" />
                </div>
                <div className="slider-btn team-slider-next">
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-lg-8 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="founder-card">
                <div className="founder-img">
                  <img src={teamData.team.founder.image} alt="" />
                </div>
                <div className="founder-content">
                  <p>"{teamData.team.founder.quote}".</p>
                  <div className="name-and-desig">
                    <span>{teamData.team.founder.position}</span>
                    <h5>{teamData.team.founder.name}</h5>
                  </div>
                </div>
              </div>
              <div className="slider-btn-grp d-lg-none d-flex">
                <div className="slider-btn team-slider-prev">
                  <i className="bi bi-arrow-left" />
                </div>
                <div className="slider-btn team-slider-next">
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Swiper {...settings} className="swiper home1-team-slider">
                <div className="swiper-wrapper">
                  {teamData.team.members.map((member) => (
                    <SwiperSlide key={member.id} className="swiper-slide">
                      <div className="team-card">
                        <div className="team-img">
                          <img src={member.image} alt="" />
                        </div>
                        <div className="team-content">
                          <span>{member.position}</span>
                          <h5>{member.name}</h5>
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