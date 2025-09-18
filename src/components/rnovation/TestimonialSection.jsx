"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// Import required modules
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper";

const TestimonialSection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Configuration for Thumbnail Swiper
  const bannerPaginationSmalImage = useMemo(() => ({
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
  }), []);

  // Configuration for Main Swiper
  const bannerThumbslider = useMemo(() => ({
    spaceBetween: 10,
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".home4-testimonial-next",
      prevEl: ".home4-testimonial-prev",
    },
    thumbs: {
      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
    },
  }), [thumbsSwiper]);

  return (
    <div className="home4-testimonial-section mb-120">
      <div className="row g-0">
        {/* Thumbnail Slider */}
        <div className="col-xxl-7 col-xl-6 d-lg-block d-none">
          <Swiper
            onSwiper={setThumbsSwiper}
            {...bannerPaginationSmalImage}
            modules={[Thumbs]}
            allowTouchMove={false}
            className="swiper home4-testimonial-img-slider"
          >
            <SwiperSlide>
              <div className="testimonial-img">
                <div className="preview_image custom_animation">
                  <div className="twentytwenty-container container1">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src="assets/img/home4/testimonial-before-img1.jpg"
                          alt="Before Image"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src="assets/img/home4/testimonial-after-img1.jpg"
                          alt="After Image"
                        />
                      }
                    />
                    <div className="twentytwenty-overlay">
                      <div className="twentytwenty-before-label" data-content="Before">Before</div>
                      <div className="twentytwenty-after-label" data-content="After">After</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-img">
                <div className="preview_image custom_animation">
                  <div className="twentytwenty-container container1">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src="assets/img/home4/testimonial-before-img2.jpg"
                          alt="Before Image"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src="assets/img/home4/testimonial-after-img2.jpg"
                          alt="After Image"
                        />
                      }
                    />
                    <div className="twentytwenty-overlay">
                      <div className="twentytwenty-before-label" data-content="Before">Before</div>
                      <div className="twentytwenty-after-label" data-content="After">After</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-img">
                <div className="preview_image custom_animation">
                  <div className="twentytwenty-container container1">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src="assets/img/home4/testimonial-before-img3.jpg"
                          alt="Before Image"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src="assets/img/home4/testimonial-after-img3.jpg"
                          alt="After Image"
                        />
                      }
                    />
                    <div className="twentytwenty-overlay">
                      <div className="twentytwenty-before-label" data-content="Before">Before</div>
                      <div className="twentytwenty-after-label" data-content="After">After</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Content Slider */}
        <div className="col-xxl-5 col-xl-6">
          <div className="testimonial-content-area">
            <div
              className="section-title2 text-center wow animate fadeInDown"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <h2>
                Client Say <br />
                Smile. <span />
              </h2>
            </div>
            <div className="testimonial-card-area">
              <Swiper
                {...bannerThumbslider}
                loop={true}
                modules={[EffectFade, FreeMode, Navigation, Thumbs]}
                className="swiper home4-testimonial-content-slider"
              >
                <SwiperSlide>
                  <div className="testimonial-content-wrap">
                    <span>Great Construction Company!</span>
                    <p>
                      “Feel free to customize the key features based on the services and
                      strategies you offer in each plan. This breakdown helps potential
                      clients understand your value.”
                    </p>
                    <div className="author-area">
                      <div className="author-img">
                        <img src="assets/img/home2/testimonial-author-img1.png" alt="Author" />
                      </div>
                      <div className="author-content">
                        <h5>Mr. Daniel Scoot</h5>
                        <span>CEO at Softconic</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-content-wrap">
                    <span>Fantastic Construction Firm!</span>
                    <p>
                      “Feel free to customize the key features based on the services and
                      strategies you offer in each plan. This breakdown helps potential
                      clients understand your value.”
                    </p>
                    <div className="author-area">
                      <div className="author-img">
                        <img src="assets/img/home2/testimonial-author-img2.png" alt="Author" />
                      </div>
                      <div className="author-content">
                        <h5>Jackson Joseph</h5>
                        <span>CEO at Axleo</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-content-wrap">
                    <span>Fantastic Construction Firm!</span>
                    <p>
                      “Feel free to customize the key features based on the services and
                      strategies you offer in each plan. This breakdown helps potential
                      clients understand your value.”
                    </p>
                    <div className="author-area">
                      <div className="author-img">
                        <img src="assets/img/home2/testimonial-author-img3.png" alt="Author" />
                      </div>
                      <div className="author-content">
                        <h5>Gason Santiago</h5>
                        <span>CEO at Nexaq</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="slider-btn-grp">
                <div className="slider-btn home4-testimonial-prev">
                  <i className="bi bi-arrow-left" />
                </div>
                <div className="slider-btn home4-testimonial-next">
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
