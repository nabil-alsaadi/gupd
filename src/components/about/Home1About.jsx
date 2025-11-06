"use client"
import useModalVideo from '@/utils/useModalVideo'
import Link from 'next/link'
import React from 'react'
import content from '@/data/gupdContent.json'

const Home1About = ({ sectionGap, aboutData }) => {
  const { Modal, openModal } = useModalVideo()

  // Use aboutData prop if provided, otherwise fall back to static data
  const about = aboutData || {
    title: content.about.title,
    subtitle: content.about.subtitle,
    videoDescription: content.about.videoDescription,
    image: content.about.image || 'assets/img/home1/about-img.jpg',
    sections: content.about.sections || []
  }

  return (
    <div className="home1-about-section mb-130">
      <div className="container">
        <div className="about-top-area mb-50">
          <div className="row g-4 align-items-center justify-content-between">
            <div className="col-lg-8 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="about-title-area">
                <div className="section-title">
                  <span>{about.title}</span>
                  <h2>{about.subtitle}</h2>
                </div>
                <div className="video-and-content">
                  <a onClick={openModal} className="video-area">
                    {/* Video button */}
                    <div className="icon">▶</div>
                  </a>
                  <div className="content">
                    <p>{about.videoDescription}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 d-flex justify-content-lg-end">
              <Link href="/about" className="about-btn btn_wrapper">
                <div className="primary-btn">
                  About Us More →
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="about-content">
              <ul>
                {about.sections.map((item, index) => (
                  <li key={index}>
                    <h5>{item.title}</h5>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-7 d-lg-block d-none">
            <div className="about-img magnetic-item">
              <img src={about.image || 'assets/img/home1/about-img.jpg'} alt="About GUPD" />
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default Home1About
