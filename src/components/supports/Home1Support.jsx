import Link from 'next/link'
import React from 'react'

const Home1Support = () => {
  return (
    <>
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
   
    </>
  )
}

export default Home1Support