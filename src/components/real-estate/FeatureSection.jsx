"use client"
import useModalVideo from '@/utils/useModalVideo'
import Link from 'next/link'
import React from 'react'
import CountUp from 'react-countup'

const FeatureSection = () => {
  const { Modal, openModal } = useModalVideo()
  return (
    <>
      <div className="home2-feature-section mb-120">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="feature-content-wrap">
                <div className="section-title two">
                  <span>Get to Know Us Our Journey</span>
                  <h2>Who We Are &amp; What We Do Of propertiy.</h2>
                </div>
                <div className="feature-content">
                  <div className="video-and-content">
                    <a data-fancybox="video-player" onClick={openModal} className="video-area">
                      <div className="icon">
                        <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="77px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                          <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100}>
                          </circle>
                          <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                          <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53">
                          </path>
                        </svg>
                        <svg className="play-icon" width={23} height={28} viewBox="0 0 23 28" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.8424 14.2559C22.8424 13.4843 22.4449 12.7737 21.7784 12.3539L3.78608 1.03446C3.05833 0.577358 2.17083 0.543963 1.40902 0.947257C0.649591 1.35033 0.195312 2.09429 0.195312 2.93663V25.5738C0.195312 26.4162 0.649555 27.1599 1.41018 27.5632C1.76475 27.7501 2.14507 27.8431 2.52543 27.8431C2.96275 27.8431 3.39718 27.7197 3.78584 27.476L21.7782 16.1583C22.4449 15.7383 22.8424 15.0277 22.8424 14.2561V14.2559ZM21.1289 15.177L3.13659 26.4947C2.78345 26.7165 2.35329 26.7315 1.98441 26.5376C1.61553 26.3424 1.39473 25.9822 1.39473 25.5736V2.93642C1.39473 2.52778 1.61553 2.16621 1.98441 1.97237C2.15681 1.88239 2.34185 1.83669 2.52569 1.83669C2.73791 1.83669 2.9487 1.8963 3.13685 2.0155L21.1292 13.335C21.4568 13.5414 21.6447 13.8781 21.6447 14.2575C21.6444 14.6356 21.4565 14.9707 21.1289 15.177Z" />
                        </svg>
                      </div>
                    </a>
                    <div className="content">
                      <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla
                        est libero, sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse
                        nectoraba porttitor velit go this week and more about.</p>
                    </div>
                  </div>
                  <div className="feature-list">
                    <h6>VERNEX PLATFORM <span>Feature:</span></h6>
                    <ul>
                      <li><strong>Create engaging content:</strong> Eye-catching visual, informative
                        caption, &amp; interactive elements can all help you capture attention and stop the
                        scroll.</li>
                      <li><strong>Plan and schedule posts:</strong> Schedule your content advance to
                        ensure consistent presence and maintain a steady flow of communication.</li>
                      <li><strong>Curate valuable content:</strong> Share relevant content for industry
                        leader influencers to establish credibility and provide a well-rounded
                        perspective.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 d-lg-block d-none wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="feature-img magnetic-item">
                <img src="assets/img/home2/home2-feature-img.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <Modal />
      </div>
      <div className="home2-counter-section mb-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter"><CountUp end={45} enableScrollSpy /></h2>
                  <span>+</span>
                </div>
                <span>Green Spaces</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter"><CountUp end={15} enableScrollSpy /></h2>
                </div>
                <span>Skilled Professionals</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter"><CountUp end={10} enableScrollSpy /></h2>
                </div>
                <span>Years of Experience</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter"><CountUp end={2} enableScrollSpy /></h2>
                  <span>M</span>
                </div>
                <span>Square Meters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home2-property-banner-section mb-120">
        <ul className="indivisual-item-list">
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img1.png" alt="" />
            </div>
            <div className="content">
              <h6>Laundry Room</h6>
              <span>150 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img2.png" alt="" />
            </div>
            <div className="content">
              <h6>Dining Room</h6>
              <span>200 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img3.png" alt="" />
            </div>
            <div className="content">
              <h6>Big Bedroom</h6>
              <span>170 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img4.png" alt="" />
            </div>
            <div className="content">
              <h6>Kitchen Room</h6>
              <span>160 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img5.png" alt="" />
            </div>
            <div className="content">
              <h6>Grass Garden</h6>
              <span>230 Sq.m</span>
            </div>
          </li>
        </ul>
        <Link href="/properties" className="primary-btn2 white-bg">
          <span>
            All Properties
            <svg viewBox="0 0 13 20">
              <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
            </svg>
          </span>
        </Link>
      </div>

    </>
  )
}

export default FeatureSection