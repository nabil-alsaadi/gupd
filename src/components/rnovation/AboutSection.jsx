import Link from 'next/link'
import React from 'react'

const AboutSection = () => {
  return (
    <>
     <div className="home4-about-section mb-120">
  <div className="container">
    <div className="row g-4 align-items-center justify-content-between">
      <div className="col-xl-6 col-lg-8 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
        <div className="section-title2">
          <h2>About Our <br /> Story <span /></h2>
          <p>Sed Nissl eros, condominium nec risussit abet finibus cons sem fused. Advantage of these limited-time offers &amp; start. Here are various categories that can be featured on a construction website to cover different aspects and specialties within the industry. This title is versatile and can be adapted to fit the specific tone and branding of your construction website, ensuring it conveys the comprehensive nature of your services and commitment to quality.</p>
        </div>
      </div>
      <div className="col-lg-3 d-flex justify-content-lg-center btn_wrapper">
        <Link href="/project" className="primary-btn2 transparent">
          <span>
            About Us More
            <svg viewBox="0 0 13 20">
              <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
    <div className="about-wrapper">
      <div className="row justify-content-end">
        <div className="col-xl-11">
          <div className="row g-4 justify-content-between">
            <div className="col-lg-8">
              <div className="about-img">
                <img src="assets/img/home4/about-img.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-lg-center">
              <div className="about-content">
                <ul>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
   
    </>
  )
}

export default AboutSection