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

const ProjectSection = () => {
      const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      // autoplay: {
      // 	delay: 2500, // Autoplay duration in milliseconds
      // 	disableOnInteraction: false,
      // },
      navigation: {
          nextEl: ".project-slider-next",
          prevEl: ".project-slider-prev",
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2.3,
        },
        1400: {
          slidesPerView: 2.7,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="home4-project-section mb-120">
        <div className="row gy-5">
          <div className="col-xl-3 col-lg-4 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-title-area">
              <div className="section-title2">
                <h2>Makeover <br /> Modern. <span /></h2>
                <p>We understand your needs and deliver digin marketing through unique selling One propo. Our team of experts is passionate.</p>
              </div>
              <div className="button-and-slider-area">
                <Link href="/project" className="primary-btn2">
                  <span>
                    View All Work
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </span>
                </Link>
                <div className="slider-btn-grp">
                  <div className="slider-btn project-slider-prev">
                    <i className="bi bi-arrow-left" />
                  </div>
                  <div className="slider-btn project-slider-next">
                    <i className="bi bi-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="project-slider-area">
              <Swiper {...settings} className="swiper home4-project-slider">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="project-card3">
                      <img src="assets/img/home4/project-img1.jpg" alt="" />
                      <div className="project-content-wrap">
                        <div className="project-content">
                          <span>Client: Egenslab</span>
                          <h3><Link href="/project/project-details">Dominating Auto Search</Link></h3>
                          <ul>
                            <li><Link href="/project">Architecture</Link></li>
                            <li><Link href="/project">Construction</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="project-card3">
                      <img src="assets/img/home4/project-img2.jpg" alt="" />
                      <div className="project-content-wrap">
                        <div className="project-content">
                          <span>Client: Zenfy</span>
                          <h3><Link href="/project/project-details">Project Build Vision</Link></h3>
                          <ul>
                            <li><Link href="/project">Renovation</Link></li>
                            <li><Link href="/project">Architecture</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="project-card3">
                      <img src="assets/img/home4/project-img3.jpg" alt="" />
                      <div className="project-content-wrap">
                        <div className="project-content">
                          <span>Client: Axleo</span>
                          <h3><Link href="/project/project-details">Unveiling Iconic Denies</Link></h3>
                          <ul>
                            <li><Link href="/project">Painting</Link></li>
                            <li><Link href="/project">Industrial</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="project-card3">
                      <img src="assets/img/home4/project-img4.jpg" alt="" />
                      <div className="project-content-wrap">
                        <div className="project-content">
                          <span>Client: Nexaq</span>
                          <h3><Link href="/project/project-details">Build Master Plan</Link></h3>
                          <ul>
                            <li><Link href="/project">Architecture</Link></li>
                            <li><Link href="/project">Commercial</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="project-card3">
                      <img src="assets/img/home4/project-img5.jpg" alt="" />
                      <div className="project-content-wrap">
                        <div className="project-content">
                          <span>Client: Triprex</span>
                          <h3><Link href="/project/project-details">Creating with Precision</Link></h3>
                          <ul>
                            <li><Link href="/project">Residential</Link></li>
                            <li><Link href="/project">Renovation</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="project-card3">
                      <img src="assets/img/home4/project-img6.jpg" alt="" />
                      <div className="project-content-wrap">
                        <div className="project-content">
                          <span>Client: Triprex</span>
                          <h3><Link href="/project/project-details">Crafting the Framework</Link></h3>
                          <ul>
                            <li><Link href="/project">Industrial</Link></li>
                            <li><Link href="/project">Residential</Link></li>
                          </ul>
                        </div>
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

export default ProjectSection