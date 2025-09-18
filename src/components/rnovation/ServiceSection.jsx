import Link from 'next/link'
import React from 'react'

const ServiceSection = () => {
  return (
    <>
     <div className="home4-service-section mb-120" id="scroll-section">
        <div className="container">
          <div className="row g-4 align-items-center justify-content-between mb-80 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-xxl-6 col-lg-7 col-sm-6">
              <div className="section-title2">
                <h2>What We <br /> Work. <span /></h2>
              </div>
            </div>
            <div className="col-lg-2 col-md-5 col-sm-6 d-flex justify-content-sm-end">
              <Link href="/services" className="primary-btn2">
                <span>
                  View All Services
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="service-card">
                <div className="service-img-wrap">
                  <Link href="/services/service-details" className="service-img"><img src="assets/img/home4/service-img1.jpg" alt="" /></Link>
                  <div className="button-area">
                    <Link href="/services/service-details" className="primary-btn2 white-bg">
                      <span>
                        Learn More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h4><Link href="/services/service-details">Planning &amp; Design</Link></h4>
                  <p>Conduct &amp; we thorn need effortless marketing well agency we're looking for.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="service-card pt-20">
                <div className="service-img-wrap">
                  <Link href="/services/service-details" className="service-img"><img src="assets/img/home4/service-img2.jpg" alt="" /></Link>
                  <div className="button-area">
                    <Link href="/services/service-details" className="primary-btn2 white-bg">
                      <span>
                        Learn More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h4><Link href="/services/service-details">Kitchen Renovation</Link></h4>
                  <p>Transform your kitchen into a modern, functional, and stylish space.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="service-card">
                <div className="service-img-wrap">
                  <Link href="/services/service-details" className="service-img"><img src="assets/img/home4/service-img3.jpg" alt="" /></Link>
                  <div className="button-area">
                    <Link href="/services/service-details" className="primary-btn2 white-bg">
                      <span>
                        Learn More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h4><Link href="/services/service-details">Windows &amp; Doors</Link></h4>
                  <p>Precision-crafted windows and doors that enhance security and aesthetic appeal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default ServiceSection