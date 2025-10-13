"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import CountUp from 'react-countup'
const Home1WhyChooseus = () => {

  return (
    <div className="home1-why-choose-us-section mb-130">
    <div className="container">
      <div className="row gy-5 align-items-center justify-content-between">
        <div className="col-xl-4 col-lg-5 col-md-7">
          <div className="why-choose-us-content-wrap">
            <div className="section-title wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <span>Why Choose Us</span>
              <h2>Building Your Dreams.</h2>
              <p>We understand your needs and delivery digitaloi marketing through unique selling oneto homeles proposition Our team of expert.</p>
            </div>
            <div className="why-choose-us-content">
              <h5>SINCE 1962</h5>
              <p>Sed Nissl eros, condominium nec risussit abet finibus cons sem fused. Advantage of these limited-time offers &amp; start. Here are various categories that can be featured on a construction website to cover different aspects and specialties within the industry.</p>
              <Link href="/about" className="primary-btn">
                About Us More
                <svg viewBox="0 0 13 20">
                  <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
          <div className="why-choose-counter-area">
            <ul className="counter-list">
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={150}  /></h2>
                </div>
                <div className="content">
                  <p>Project Completed</p>
                </div>
              </li>
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={5}  /></h2>
                </div>
                <div className="content">
                  <p>Winning Award</p>
                </div>
              </li>
              <li className="single-counter">
                <div className="number">
                  <h2 className="counter"><CountUp end={1}  /></h2>
                  <span>K</span>
                </div>
                <div className="content">
                  <p>Awesome Client</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <img src="assets/img/home1/why-choose-us-bg.png" alt="" className="bg-img" />
  </div>
  
  )
}

export default Home1WhyChooseus