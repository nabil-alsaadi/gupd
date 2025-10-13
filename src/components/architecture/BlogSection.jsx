
"use client"
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const BlogSection = () => {
    useEffect(() => {
        // Ensure ScrollTrigger is activated
        gsap.registerPlugin(ScrollTrigger);
        const scrollSecTitle = document.querySelector(".scroll-sec-title");
		const scrollSecTitleEnd = document.querySelector(".scroll-sec-title-end");
       // Check if both elements exist before proceeding
		if (scrollSecTitle && scrollSecTitleEnd) {
            const start = scrollSecTitle.getBoundingClientRect().top;
            const end = scrollSecTitleEnd.getBoundingClientRect().top;
            const distance = end - start;
        
            const scScrollTl = gsap.timeline({
                scrollTrigger: {
                trigger: ".scroll-sec-title",
                start: "top 15%",
                endTrigger: ".scroll-sec-title-end",
                end: "top top",
                toggleActions: "restart pause reverse pause",
                scrub: 1,
                },
            });
        
            scScrollTl.to(".scroll-sec-title", {
                y: distance, // Use the calculated distance
                duration: 10, // Duration can be kept for scrub speed
                opacity: 0,
            });
            }
      }, []);
  return (
    <div className="home3-blog-section mb-120">
    <div className="container">
      <div className="row gy-5 align-items-center wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
        <div className="col-lg-6 scroll-sec-title">
          <div className="section-title three">
            <span>News &amp; Article</span>
            <h2>Architecture Insights</h2>
            <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla est libero sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse.</p>
          </div>
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
      <div className="blog-card-area">
        <div className="row g-4 justify-content-end">
          <div className="col-lg-9 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="blog-card style-3">
              <Link href="/blog/blog-details" className="blog-img">
                <img src="assets/img/home3/blog-img1.jpg" alt="" />
              </Link>
              <div className="blog-content-wrap">
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">10 August, 2024</Link></li>
                      <li><Link href="/blog">Industry</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Blueprint &amp; Beys Explore Modern Architecture Trends.</Link></h4>
                </div>
                <div className="details-btn">
                  <Link href="/blog/blog-details" className="primary-btn">
                    View Details
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
            <div className="blog-card style-3">
              <Link href="/blog/blog-details" className="blog-img">
                <img src="assets/img/home3/blog-img2.jpg" alt="" />
              </Link>
              <div className="blog-content-wrap">
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">15 August, 2024</Link></li>
                      <li><Link href="/blog">Construction</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Sustainable Spaces Innovations in Green Architecture.</Link></h4>
                </div>
                <div className="details-btn">
                  <Link href="/blog/blog-details" className="primary-btn">
                    View Details
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 scroll-sec-title-end wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
            <div className="blog-card style-3">
              <Link href="/blog/blog-details" className="blog-img">
                <img src="assets/img/home3/blog-img3.jpg" alt="" />
              </Link>
              <div className="blog-content-wrap">
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">22 August, 2024</Link></li>
                      <li><Link href="/blog">Architecture</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Architectural Perspective Essays on Design Philosophy.</Link></h4>
                </div>
                <div className="details-btn">
                  <Link href="/blog/blog-details" className="primary-btn">
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
  </div>
  )
}

export default BlogSection