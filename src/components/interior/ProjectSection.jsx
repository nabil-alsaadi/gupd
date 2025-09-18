import Link from 'next/link'
import React from 'react'

const ProjectSection = () => {
    return (
        <>
            <div className="home5-project-section mb-120">
        <div className="container">
          <div className="row g-4 justify-content-between align-items-lg-end mb-70">
            <div className="col-xxl-5 col-lg-7 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title four">
                <span>Our Latest Work</span>
                <h2>Dreams Beautiful Environments.</h2>
              </div>
            </div>
            <div className="col-lg-3 d-flex justify-content-lg-end btn_wrapper">
              <Link href="/project" className="primary-btn2">
                <span>
                  View All Project
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="row gy-5 align-items-center justify-content-between">
            <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="project-card3 magnetic-item">
                <img src="assets/img/home5/project-img1.jpg" alt="" />
                <div className="project-content-wrap">
                  <div className="project-content">
                    <span>Client: Egenslab</span>
                    <h3><Link href="/project/project-details">Modern Minimalist Home Design</Link></h3>
                    <ul>
                      <li><Link href="/project">Architecture</Link></li>
                      <li><Link href="/project">Construction</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="project-card3 magnetic-item">
                <img src="assets/img/home5/project-img2.jpg" alt="" />
                <div className="project-content-wrap">
                  <div className="project-content">
                    <span>Client: Zenfy</span>
                    <h3><Link href="/project/project-details">Timeless Vintage Interiors</Link></h3>
                    <ul>
                      <li><Link href="/project">Renovation</Link></li>
                      <li><Link href="/project">Architecture</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="project-card3 magnetic-item">
                <img src="assets/img/home5/project-img3.jpg" alt="" />
                <div className="project-content-wrap">
                  <div className="project-content">
                    <span>Client: Axleo</span>
                    <h3><Link href="/project/project-details">Eco-Friendly Office Interiors</Link></h3>
                    <ul>
                      <li><Link href="/project">Painting</Link></li>
                      <li><Link href="/project">Industrial</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="project-card3 magnetic-item">
                <img src="assets/img/home5/project-img4.jpg" alt="" />
                <div className="project-content-wrap">
                  <div className="project-content">
                    <span>Client: Nexaq</span>
                    <h3><Link href="/project/project-details">Minimalist Luxury Suite</Link></h3>
                    <ul>
                      <li><Link href="/project">Architecture</Link></li>
                      <li><Link href="/project">Commercial</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="project-card3 magnetic-item">
                <img src="assets/img/home5/project-img5.jpg" alt="" />
                <div className="project-content-wrap">
                  <div className="project-content">
                    <span>Client: Triprex</span>
                    <h3><Link href="/project/project-details">Luxury Urban Apartment Design</Link></h3>
                    <ul>
                      <li><Link href="/project">Residential</Link></li>
                      <li><Link href="/project">Renovation</Link></li>
                    </ul>
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

export default ProjectSection