"use client";
import React, { useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);


const TeamSection = () => {

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
    <>
      <div className="home5-team-section mb-120">
        <div className="container">
          <div className="row g-4 align-items-end justify-content-between mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-xl-6 col-lg-7">
              <div className="section-title four">
                <span>Meet the Makers</span>
                <h2>The Experts Behind the Elegance.</h2>
              </div>
            </div>
            <div className="col-lg-3 d-flex justify-content-lg-end">
              <div className="slider-btn-grp">
                <div className="slider-btn team-slider-prev">
                  <i className="bi bi-arrow-left" />
                </div>
                <div className="slider-btn team-slider-next">
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-xl-end">
            <div className="col-xl-10">
              <Swiper {...settings} className="swiper home1-team-slider">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="team-card">
                      <div className="team-img">
                        <img src="assets/img/home1/team-img1.png" alt="" />
                      </div>
                      <div className="team-content">
                        <span>Project Manager</span>
                        <h5>Olivern James</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="team-card">
                      <div className="team-img">
                        <img src="assets/img/home1/team-img2.png" alt="" />
                      </div>
                      <div className="team-content">
                        <span>Architects</span>
                        <h5>Mateob Henry</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="team-card">
                      <div className="team-img">
                        <img src="assets/img/home1/team-img3.png" alt="" />
                      </div>
                      <div className="team-content">
                        <span>Engineers</span>
                        <h5>Eliason Jacob</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="team-card">
                      <div className="team-img">
                        <img src="assets/img/home1/team-img4.png" alt="" />
                      </div>
                      <div className="team-content">
                        <span>Safety Officers</span>
                        <h5>Caleb Cooper</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="team-card">
                      <div className="team-img">
                        <img src="assets/img/home1/team-img5.png" alt="" />
                      </div>
                      <div className="team-content">
                        <span>Project Manager</span>
                        <h5>Olivern James</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="team-card">
                      <div className="team-img">
                        <img src="assets/img/home1/team-img6.png" alt="" />
                      </div>
                      <div className="team-content">
                        <span>Architects</span>
                        <h5>Mateob Henry</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamSection