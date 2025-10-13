"use client"
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const GallerySection = () => {
     const settings = useMemo(() => {
        return {
            slidesPerView: "auto",
            speed: 1500,
            spaceBetween: 0,
            autoplay: {
                delay: 2500, // Autoplay duration in milliseconds
                disableOnInteraction: false,
            },

            breakpoints: {
                280: {
                    slidesPerView: 2,
                },
                386: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 5,
                },
                1400: {
                    slidesPerView: 5,
                },
            },
        };
    }, []);
  return (
    <div className="gallery-section">
      <div className="container">
        <div className="row mb-50">
          <div className="col-lg-12">
            <div className="title-area">
              <h4>Instagram</h4>
            </div>
          </div>
        </div>
      </div>
      <Swiper {...settings} className="swiper gallery-slider">
        <div className="swiper-wrapper">
          <SwiperSlide className="swiper-slide">
            <div className="single-gallery-img">
              <div className="icon-area">
                <a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
              </div>
              <img src="assets/img/home3/gallery-image1.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-gallery-img">
              <div className="icon-area">
                <a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
              </div>
              <img src="assets/img/home3/gallery-image2.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-gallery-img">
              <div className="icon-area">
                <a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
              </div>
              <img src="assets/img/home3/gallery-image3.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-gallery-img">
              <div className="icon-area">
                <a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
              </div>
              <img src="assets/img/home3/gallery-image4.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-gallery-img">
              <div className="icon-area">
                <a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
              </div>
              <img src="assets/img/home3/gallery-image5.jpg" alt="" />
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  )
}

export default GallerySection