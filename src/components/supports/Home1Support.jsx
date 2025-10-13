import Link from 'next/link'
import React from 'react'
import contactData from '@/data/contactContent.json'   // 👈 new JSON

const Home1Support = () => {
  const contact = contactData.contact

  return (
    <div className="home1-support-section mb-130">
      <div className="container">
        <div 
          className="row justify-content-lg-end wow animate fadeInDown" 
          data-wow-delay="200ms" 
          data-wow-duration="1500ms"
        >
          <div className="col-xl-9 col-lg-10">
            <div className="section-title">
              <span>{contact.tagline}</span>
              <h2>{contact.headline}</h2>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="support-content">
              <div className="btn_wrapper">
                <Link href="/contact" className="contact-area">
                  <h2>{contact.button.number}</h2>
                  <span>{contact.button.unit}</span>
                  <p>{contact.button.text}</p>
                </Link>
              </div>
              <p>{contact.description}</p>
            </div>
          </div>
          <div className="col-lg-6 d-lg-block d-none">
            <div className="support-img magnetic-item">
              <img src="assets/img/new/contact.jpg" alt="Contact GUPD" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home1Support
