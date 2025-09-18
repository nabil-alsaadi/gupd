"use client"
import Breadcrum from '@/components/common/Breadcrum'

import Header1 from '@/components/header/Header1'
import Footer1 from '@/components/Footer/Footer1'
import Link from 'next/link'
import useModalVideo from '@/utils/useModalVideo'
import Home1Testimonial from '@/components/testimonial/Home1Testimonial'
import React, { useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
const AboutPage = () => {

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
  const { openModal, Modal } = useModalVideo();
  return (
    <div>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum content='View Our Story' pageTitle={'About Us'} pagename={'About Us'} />
      <div className="home1-about-section pt-130 mb-130">
        <div className="container">
          <div className="about-top-area mb-50">
            <div className="row g-4 align-items-center justify-content-between">
              <div className="col-lg-8 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="about-title-area">
                  <div className="section-title">
                    <span>Building Trust Since 2005</span>
                    <h2>Experts in Construction Your Excellence.</h2>
                  </div>
                  <div className="video-and-content">
                    <a data-fancybox="video-player" onClick={openModal} className="video-area">
                      <div className="icon">
                        <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="77px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                          <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100} />
                          <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                          <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53" />
                        </svg>
                        <svg className="play-icon" width={23} height={28} viewBox="0 0 23 28" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.8424 14.2559C22.8424 13.4843 22.4449 12.7737 21.7784 12.3539L3.78608 1.03446C3.05833 0.577358 2.17083 0.543963 1.40902 0.947257C0.649591 1.35033 0.195312 2.09429 0.195312 2.93663V25.5738C0.195312 26.4162 0.649555 27.1599 1.41018 27.5632C1.76475 27.7501 2.14507 27.8431 2.52543 27.8431C2.96275 27.8431 3.39718 27.7197 3.78584 27.476L21.7782 16.1583C22.4449 15.7383 22.8424 15.0277 22.8424 14.2561V14.2559ZM21.1289 15.177L3.13659 26.4947C2.78345 26.7165 2.35329 26.7315 1.98441 26.5376C1.61553 26.3424 1.39473 25.9822 1.39473 25.5736V2.93642C1.39473 2.52778 1.61553 2.16621 1.98441 1.97237C2.15681 1.88239 2.34185 1.83669 2.52569 1.83669C2.73791 1.83669 2.9487 1.8963 3.13685 2.0155L21.1292 13.335C21.4568 13.5414 21.6447 13.8781 21.6447 14.2575C21.6444 14.6356 21.4565 14.9707 21.1289 15.177Z" />
                        </svg>
                      </div>
                    </a>
                    <div className="content">
                      <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla est libero, sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse nectoraba porttitor velit go this week and more about.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 d-flex justify-content-lg-end">
                <Link href="/about" className="about-btn btn_wrapper">
                  <div className="bg">
                    <svg width={170} height={170} viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
                      <path d="M77.3692 2.27213C82.1102 -0.382126 87.8898 -0.382126 92.6308 2.27213C95.8749 4.08835 99.6604 4.68792 103.307 3.96307C108.636 2.90377 114.133 4.68978 117.822 8.67916C120.346 11.409 123.761 13.149 127.453 13.5865C132.848 14.2258 137.524 17.623 139.8 22.557C141.357 25.9332 144.067 28.6434 147.443 30.2003C152.377 32.4757 155.774 37.1516 156.414 42.5472C156.851 46.2393 158.591 49.6543 161.321 52.1784C165.31 55.8671 167.096 61.3638 166.037 66.693C165.312 70.3396 165.912 74.1251 167.728 77.3692C170.382 82.1102 170.382 87.8898 167.728 92.6308C165.912 95.8749 165.312 99.6604 166.037 103.307C167.096 108.636 165.31 114.133 161.321 117.822C158.591 120.346 156.851 123.761 156.414 127.453C155.774 132.848 152.377 137.524 147.443 139.8C144.067 141.357 141.357 144.067 139.8 147.443C137.524 152.377 132.848 155.774 127.453 156.414C123.761 156.851 120.346 158.591 117.822 161.321C114.133 165.31 108.636 167.096 103.307 166.037C99.6604 165.312 95.8749 165.912 92.6308 167.728C87.8898 170.382 82.1102 170.382 77.3692 167.728C74.1251 165.912 70.3396 165.312 66.693 166.037C61.3638 167.096 55.8671 165.31 52.1784 161.321C49.6543 158.591 46.2393 156.851 42.5472 156.414C37.1516 155.774 32.4757 152.377 30.2003 147.443C28.6434 144.067 25.9332 141.357 22.557 139.8C17.623 137.524 14.2258 132.848 13.5865 127.453C13.149 123.761 11.409 120.346 8.67916 117.822C4.68978 114.133 2.90377 108.636 3.96307 103.307C4.68792 99.6604 4.08835 95.8749 2.27213 92.6308C-0.382126 87.8898 -0.382126 82.1102 2.27213 77.3692C4.08835 74.1251 4.68792 70.3396 3.96307 66.693C2.90377 61.3638 4.68977 55.8671 8.67916 52.1784C11.409 49.6543 13.149 46.2393 13.5865 42.5472C14.2258 37.1516 17.623 32.4757 22.557 30.2003C25.9332 28.6434 28.6434 25.9332 30.2003 22.557C32.4757 17.623 37.1516 14.2258 42.5472 13.5865C46.2393 13.149 49.6543 11.409 52.1784 8.67916C55.8671 4.68977 61.3638 2.90377 66.693 3.96307C70.3396 4.68792 74.1251 4.08835 77.3692 2.27213Z" />
                      <path d="M77.6135 2.70841C82.2027 0.139114 87.7973 0.139114 92.3865 2.70841C95.7345 4.58277 99.6412 5.20153 103.404 4.45348C108.563 3.42808 113.884 5.15692 117.455 9.01861C120.059 11.8358 123.584 13.6315 127.394 14.083C132.617 14.7019 137.143 17.9903 139.346 22.7664C140.952 26.2507 143.749 29.0476 147.234 30.6544C152.01 32.8569 155.298 37.3831 155.917 42.6061C156.368 46.4163 158.164 49.9406 160.981 52.5455C164.843 56.1161 166.572 61.437 165.547 66.5955C164.798 70.3588 165.417 74.2655 167.292 77.6135C169.861 82.2027 169.861 87.7973 167.292 92.3865C165.417 95.7345 164.798 99.6412 165.547 103.404C166.572 108.563 164.843 113.884 160.981 117.455C158.164 120.059 156.368 123.584 155.917 127.394C155.298 132.617 152.01 137.143 147.234 139.346C143.749 140.952 140.952 143.749 139.346 147.234C137.143 152.01 132.617 155.298 127.394 155.917C123.584 156.368 120.059 158.164 117.455 160.981C113.884 164.843 108.563 166.572 103.404 165.547C99.6412 164.798 95.7345 165.417 92.3865 167.292C87.7973 169.861 82.2027 169.861 77.6135 167.292C74.2655 165.417 70.3588 164.798 66.5955 165.547C61.437 166.572 56.1161 164.843 52.5455 160.981C49.9406 158.164 46.4163 156.368 42.6061 155.917C37.3831 155.298 32.8569 152.01 30.6544 147.234C29.0476 143.749 26.2507 140.952 22.7664 139.346C17.9903 137.143 14.7019 132.617 14.083 127.394C13.6315 123.584 11.8358 120.059 9.01861 117.455C5.15692 113.884 3.42808 108.563 4.45348 103.404C5.20153 99.6412 4.58277 95.7345 2.70841 92.3865C0.139114 87.7973 0.139114 82.2027 2.70841 77.6135C4.58277 74.2655 5.20153 70.3588 4.45348 66.5955C3.42808 61.437 5.15692 56.1161 9.01861 52.5455C11.8358 49.9406 13.6315 46.4163 14.083 42.606C14.7019 37.3831 17.9903 32.8569 22.7664 30.6544C26.2507 29.0476 29.0476 26.2507 30.6544 22.7664C32.8569 17.9903 37.3831 14.7019 42.606 14.083C46.4163 13.6315 49.9406 11.8358 52.5455 9.01861C56.1161 5.15692 61.437 3.42808 66.5955 4.45348C70.3588 5.20153 74.2655 4.58277 77.6135 2.70841Z" strokeOpacity="0.1" />
                    </svg>
                  </div>
                  <div className="primary-btn">
                    About Us More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="about-content">
                <ul>
                  <li>
                    <h5>Who we are</h5>
                    <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                  </li>
                  <li>
                    <h5>Our Mission</h5>
                    <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                  </li>
                  <li>
                    <h5>Core value</h5>
                    <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-7 d-lg-block d-none">
              <div className="about-img magnetic-item">
                <img src="assets/img/home1/about-img.jpg" alt="" />
              </div>
            </div>
          </div>
          <Modal />
        </div>
      </div>
      <div className="home1-support-section mb-130">
        <div className="container">
          <div className="row justify-content-lg-end wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-xl-9 col-lg-10">
              <div className="section-title">
                <span>We Always Ready For You</span>
                <h2>Discover our journey commitment to excellence, and our team of dedicated professionals who turn visions into reality.</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="support-content">
                <div className="btn_wrapper">
                  <Link href="/contact" className="contact-area">
                    <h2>30</h2>
                    <span>Minute</span>
                    <p>Talk With Us</p>
                  </Link>
                </div>
                <p>Sed Nissl eros, condominium nec risussit abet finibus cons sem fused. Advantage of these limited-time offers &amp; start. Here are various categories that can be featured on a construction website to cover different aspects and specialties within the industry. This title is versatile and can be adapted to fit the specific tone and branding of your construction website, ensuring it conveys the comprehensive nature of your services and commitment to quality.</p>
              </div>
            </div>
            <div className="col-lg-6 d-lg-block d-none">
              <div className="support-img magnetic-item">
                <img src="assets/img/home1/home1-support-img.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home1-banner2-section" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url(assets/img/home1/home1-banner2-bg.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="banner-content">
                <div className="video-area">
                  <h2>Build Your</h2>
                  <a data-fancybox="video-player" onClick={openModal} className="play-btn">
                    <div className="icon">
                      <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="77px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                        <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100} />
                        <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                        <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53" />
                      </svg>
                      <svg className="play-icon" width={23} height={28} viewBox="0 0 23 28" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.8424 14.2559C22.8424 13.4843 22.4449 12.7737 21.7784 12.3539L3.78608 1.03446C3.05833 0.577358 2.17083 0.543963 1.40902 0.947257C0.649591 1.35033 0.195312 2.09429 0.195312 2.93663V25.5738C0.195312 26.4162 0.649555 27.1599 1.41018 27.5632C1.76475 27.7501 2.14507 27.8431 2.52543 27.8431C2.96275 27.8431 3.39718 27.7197 3.78584 27.476L21.7782 16.1583C22.4449 15.7383 22.8424 15.0277 22.8424 14.2561V14.2559ZM21.1289 15.177L3.13659 26.4947C2.78345 26.7165 2.35329 26.7315 1.98441 26.5376C1.61553 26.3424 1.39473 25.9822 1.39473 25.5736V2.93642C1.39473 2.52778 1.61553 2.16621 1.98441 1.97237C2.15681 1.88239 2.34185 1.83669 2.52569 1.83669C2.73791 1.83669 2.9487 1.8963 3.13685 2.0155L21.1292 13.335C21.4568 13.5414 21.6447 13.8781 21.6447 14.2575C21.6444 14.6356 21.4565 14.9707 21.1289 15.177Z" />
                      </svg>
                    </div>
                  </a>
                </div>
                <h2>Own Building.</h2>
              </div>
            </div>
          </div>
          <Modal />
        </div>
      </div>
      <div className="logo-section mb-130">
        <div className="container-fluid">
          <div className="logo-wrap">
            <div className="logo-title">
              <h6>A partner, Not A Vendor:</h6>
            </div>
            <div className="marquee">
              <div className="marquee__group">
                <a href="#"><img src="assets/img/home1/partner-01.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-02.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-03.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-04.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-05.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-06.png" alt="" /></a>
              </div>
              <div aria-hidden="true" className="marquee__group">
                <a href="#"><img src="assets/img/home1/partner-01.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-02.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-03.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-04.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-05.png" alt="" /></a>
                <a href="#"><img src="assets/img/home1/partner-06.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home1-team-section mb-130">
        <div className="container">
          <div className="row gy-5 align-items-center justify-content-between mb-70">
            <div className="col-lg-4 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title">
                <span>Our Creative Team</span>
                <h2>Meet Our Nice Team.</h2>
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
                  <img src="assets/img/home1/home1-team-founder-img.png" alt="" />
                </div>
                <div className="founder-content">
                  <p>“We understand your needs and deliver digitaloi marketing through unique selling oneto homeles proposition Our team of expert”.</p>
                  <div className="name-and-desig">
                    <span>Founder at, Vernex</span>
                    <h5>Nathan Joshua</h5>
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
      <Home1Testimonial />

      <div className="home1-faq-section mb-130">
        <div className="container">
          <div className="row gy-5 justify-content-between">
            <div className="col-lg-7 order-lg-1 order-2">
              <div className="faq-wrap">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        01. Do you provide design and architectural services?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Yes, we offer comprehensive design and architectural services to meet your construction needs, ensuring a seamless process from concept to completion.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        02. Is Vernex suitable for my business?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Discover if Vernex is the right fit for your business by exploring its tailored solutions for various industries and unique needs.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        03. What is your typical project timeline?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Discover the typical project timeline for our construction services, outlining each phase from planning to completion, ensuring timely and efficient project delivery.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                    <h2 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        04. How do you handle permits and inspections?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We handle all necessary permits and inspections for your project, ensuring full compliance with local regulations and smooth progress throughout the construction process.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                    <h2 className="accordion-header" id="headingFive">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        05. How do you handle waste disposal and recycling?
                      </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        At our construction sites, we prioritize responsible waste disposal and recycling by adhering to local regulations, implementing sustainable practices, and partnering with certified waste management services to minimize environmental impact.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                    <h2 className="accordion-header" id="headingSix">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        06. How do ensure buildings are structurally safe?
                      </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Learn how we prioritize safety in construction by following strict structural guidelines and using high-quality materials to ensure buildings are secure and reliable.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 order-lg-2 order-1 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="title-area">
                <div className="section-title">
                  <span>Ask the Builder</span>
                  <h2>Curious About Vernex?</h2>
                  <p>We understand your needs and delivery digitaloi marketing through unique selling oneto homeles proposition Our team of expert.</p>
                </div>
                <div className="button-area">
                  <Link href="/contact" className="primary-btn2">
                    <span>
                      Contact Us Now
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home1-footer-top-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="banner-content">
                <div className="section-title white wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                  <span>Building Your Vision</span>
                  <h2>Let's Build Dream Something Amazing.</h2>
                </div>
                <div className="button-area wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                  <Link href="/contact" className="primary-btn2 white-bg">
                    <span>
                      Start A Project
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </span>
                  </Link>
                  <Link href="/contact" className="primary-btn white">
                    Contact With Us
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </div>
  )
}

export default AboutPage    