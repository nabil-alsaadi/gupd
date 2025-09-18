import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <>
     <div className="home2-about-section mb-120">
        <div className="container">
          <div className="row mb-60 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-7">
              <div className="section-title two">
                <span>Your Local Real Estate Authority</span>
                <h2>Building Relationships, Building Homes.</h2>
              </div>
            </div>
          </div>
          <div className="row gy-lg-5 gy-4">
            <div className="col-lg-5">
              <div className="about-img magnetic-item">
                <img src="assets/img/home2/home2-about-img.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-7 d-flex align-items-lg-end wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="about-content">
                <p><span>We are attracted to truly discovering the ideas</span> and people working behind the
                  <span>stages of your business. So, as long as we share the same</span> vision and have the  same goals, <span>we are extremely confident that there’s no limit to what we can achieve together.</span></p>
                <Link href="/about" className="primary-btn2">
                  <span>
                    About Us More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </span>
                </Link>
                <div className="about-bottom-content">
                  <ul>
                    <li>
                      <h5>Who we are</h5>
                      <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of
                        thes limited-time offers &amp; start.</p>
                    </li>
                    <li>
                      <h5>Our Mission</h5>
                      <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of
                        thes limited-time offers &amp; start.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default About