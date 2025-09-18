"use client";
import React, { useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
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
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
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
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 3,
		  },
		  1400: {
			slidesPerView: 3,
		  },
		},
    };
  }, []);
  return (
    <div className="home3-team-section mb-120">
      <div className="container">
        <div className="row justify-content-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
          <div className="col-xl-7 col-lg-8">
            <div className="section-title three text-center">
              <span>Meet the Team</span>
              <h2>Our Dedicated Team</h2>
              <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla est libero sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper {...settings} className="swiper home3-team-slider">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className="team-card3">
                    <div className="team-img">
                      <img src="assets/img/home3/team-img1.png" alt="" />
                    </div>
                    <div className="team-content">
                      <span>Project Manager</span>
                      <h5>Olivern James</h5>
                    </div>
                    <ul className="social-list">
                      <li><a href="#"><i className="bx bxl-instagram" /></a></li>
                      <li><a href="#"><i className="bx bxl-pinterest-alt" /></a></li>
                      <li><a href="#"><i className="bi bi-twitter-x" /></a></li>
                      <li><a href="#"><i className="bx bxl-facebook" /></a></li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="team-card3">
                    <div className="team-img">
                      <img src="assets/img/home3/team-img2.png" alt="" />
                    </div>
                    <div className="team-content">
                      <span>Office Manager</span>
                      <h5>Matthew Julian</h5>
                    </div>
                    <ul className="social-list">
                      <li><a href="#"><i className="bx bxl-instagram" /></a></li>
                      <li><a href="#"><i className="bx bxl-pinterest-alt" /></a></li>
                      <li><a href="#"><i className="bi bi-twitter-x" /></a></li>
                      <li><a href="#"><i className="bx bxl-facebook" /></a></li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="team-card3">
                    <div className="team-img">
                      <img src="assets/img/home3/team-img3.png" alt="" />
                    </div>
                    <div className="team-content">
                      <span>Buyer’s Agent</span>
                      <h5>Maverick Gabriel</h5>
                    </div>
                    <ul className="social-list">
                      <li><a href="#"><i className="bx bxl-instagram" /></a></li>
                      <li><a href="#"><i className="bx bxl-pinterest-alt" /></a></li>
                      <li><a href="#"><i className="bi bi-twitter-x" /></a></li>
                      <li><a href="#"><i className="bx bxl-facebook" /></a></li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="team-card3">
                    <div className="team-img">
                      <img src="assets/img/home3/team-img4.png" alt="" />
                    </div>
                    <div className="team-content">
                      <span>Founder at Vernex</span>
                      <h5>Michael Daniel</h5>
                    </div>
                    <ul className="social-list">
                      <li><a href="#"><i className="bx bxl-instagram" /></a></li>
                      <li><a href="#"><i className="bx bxl-pinterest-alt" /></a></li>
                      <li><a href="#"><i className="bi bi-twitter-x" /></a></li>
                      <li><a href="#"><i className="bx bxl-facebook" /></a></li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="team-card3">
                    <div className="team-img">
                      <img src="assets/img/home3/team-img5.png" alt="" />
                    </div>
                    <div className="team-content">
                      <span>Team Leader</span>
                      <h5>Jackson Joseph</h5>
                    </div>
                    <ul className="social-list">
                      <li><a href="#"><i className="bx bxl-instagram" /></a></li>
                      <li><a href="#"><i className="bx bxl-pinterest-alt" /></a></li>
                      <li><a href="#"><i className="bi bi-twitter-x" /></a></li>
                      <li><a href="#"><i className="bx bxl-facebook" /></a></li>
                    </ul>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
        <div className="row pt-50">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="pagination-area">
              <div className="swiper-pagination1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSection