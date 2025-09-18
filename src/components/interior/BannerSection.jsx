"use client"
import React from 'react'
import CountUp from 'react-countup'

const BannerSection = () => {
  return (
    <>
       <div className="home5-banner-section mb-130">
        <ul className="social-list">
          <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
          <li><a href="https://x.com/"><i className="bi bi-twitter-x" /></a></li>
          <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
          <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
        </ul>
        <div className="banner-area">
          <div className="swiper home5-banner-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="banner-wrapper">
                  <div className="banner-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), url(assets/img/home5/hom5-banner-img1.jpg)' }} />
                  <div className="banner-content">
                    <h1>INTERIOR DESIGN</h1>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="banner-wrapper">
                  <div className="banner-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), url(assets/img/home5/hom5-banner-img2.jpg)' }} />
                  <div className="banner-content">
                    <h1>LIGHTING DESIGN</h1>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="banner-wrapper">
                  <div className="banner-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), url(assets/img/home5/hom5-banner-img3.jpg)' }} />
                  <div className="banner-content">
                    <h1>OFFICE INTERIOR</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="counter-area">
            <ul>
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={98}/></h2>
                  <span>%</span>
                </div>
                <span>Client Satisfied</span>
              </li>
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={20}/></h2>
                </div>
                <span>Realized projects</span>
              </li>
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={45}/></h2>
                </div>
                <span>Team members</span>
              </li>
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={5}/></h2>
                  <span>+</span>
                </div>
                <span>Regional offices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>   
    </>
  )
}

export default BannerSection