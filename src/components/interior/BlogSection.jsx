import Link from 'next/link'
import React from 'react'

const BlogSection = () => {
  return (
    <>
     <div className="home5-blog-section mb-120">
        <div className="container">
          <div className="row g-4 justify-content-between align-items-lg-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-xxl-5 col-lg-7">
              <div className="section-title four">
                <span>Our News &amp; Article</span>
                <h2>Newest Article Space Post </h2>
              </div>
            </div>
            <div className="col-lg-3 d-flex justify-content-lg-end">
              <Link href="/blog" className="primary-btn2">
                <span>
                  View All Blog
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="row gy-5">
            <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card style-4">
                <Link href="/blog-details" className="blog-img">
                  <img src="assets/img/home5/blog-img1.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">10 August, 2024</Link></li>
                      <li><Link href="/blog">Industry</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog-details">At Deep Into Architectural Innovation Dive.</Link></h4>
                  <div className="details-btn">
                    <Link href="/blog-details" className="primary-btn">
                      View Details
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card style-4">
                <Link href="/blog-details" className="blog-img">
                  <img src="assets/img/home5/blog-img2.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">15 August, 2024</Link></li>
                      <li><Link href="/blog">Construction</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog-details">Go Deeply Into Structural Design.</Link></h4>
                  <div className="details-btn">
                    <Link href="/blog-details" className="primary-btn">
                      View Details
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </Link>
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

export default BlogSection