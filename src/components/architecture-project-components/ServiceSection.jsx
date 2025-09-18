import Link from 'next/link'
import React from 'react'

const ServiceSection = () => {
  return (
    <>
     <div className="home6-service-section mb-120">
            <div className="container-fluid">
              <div className="row gy-5 align-items-center">
                <div className="col-xl-4 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                  <div className="section-title white">
                    <h2>Innovative Commercial Services</h2>
                  </div>
                  <Link href="/services" className="primary-btn3 white">
                    <span>
                      View All Service
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </span>
                    <i className="corner tl" />
                    <i className="corner tr" />
                    <i className="corner br" />
                    <i className="corner bl" />
                  </Link>
                </div>
                <div className="col-xl-8">
                  <div className="service-wrapper">
                    <div className="row g-lg-3 gy-5 divider">
                      <div className="col-lg-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="single-service br pl-0">
                          <h4><Link href="services/service-details">Architectural <br /> Design</Link></h4>
                          <p>Sed nisl eros, condimentum nec risus sita amet finibus cons sem fusce fringilla.</p>
                          <Link href="services/service-details" className="more-btn">LEARN MORE</Link>
                          <img src="assets/img/home6/home6-service-img1.png" alt="" className="service-img" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                        <div className="single-service br">
                          <h4><Link href="services/service-details">Green Building <br /> Design</Link></h4>
                          <p>Sed nisl eros, condimentum nec risus sita amet finibus cons sem fusce fringilla.</p>
                          <Link href="services/service-details" className="more-btn">LEARN MORE</Link>
                          <img src="assets/img/home6/home6-service-img2.png" alt="" className="service-img" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                        <div className="single-service pr-0">
                          <h4><Link href="services/service-details">Historic <br /> Preservation</Link></h4>
                          <p>Sed nisl eros, condimentum nec risus sita amet finibus cons sem fusce fringilla.</p>
                          <Link href="services/service-details" className="more-btn">LEARN MORE</Link>
                          <img src="assets/img/home6/home6-service-img3.png" alt="" className="service-img" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                        <div className="single-service br pl-0">
                          <h4><Link href="services/service-details">Building Permit <br /> Applications</Link></h4>
                          <p>Sed nisl eros, condimentum nec risus sita amet finibus cons sem fusce fringilla.</p>
                          <Link href="services/service-details" className="more-btn">LEARN MORE</Link>
                          <img src="assets/img/home6/home6-service-img4.png" alt="" className="service-img" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                        <div className="single-service br">
                          <h4><Link href="services/service-details">3D Modeling And <br /> Visualization</Link></h4>
                          <p>Sed nisl eros, condimentum nec risus sita amet finibus cons sem fusce fringilla.</p>
                          <Link href="services/service-details" className="more-btn">LEARN MORE</Link>
                          <img src="assets/img/home6/home6-service-img5.png" alt="" className="service-img" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                        <div className="single-service pr-0">
                          <h4><Link href="services/service-details">Energy Modeling And <br /> Analysis</Link></h4>
                          <p>Sed nisl eros, condimentum nec risus sita amet finibus cons sem fusce fringilla.</p>
                          <Link href="services/service-details" className="more-btn">LEARN MORE</Link>
                          <img src="assets/img/home6/home6-service-img6.png" alt="" className="service-img" />
                        </div>
                      </div>
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