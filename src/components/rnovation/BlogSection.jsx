import Link from 'next/link'
import React from 'react'

const BlogSection = () => {
    return (
        <div className="home4-blog-section mb-120">
            <div className="container">
                <div className="row gy-5 align-items-center">
                    <div className="col-lg-4 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="blog-title-area">
                            <div className="section-title2">
                                <h2>Our Blog <br /> Post <span /></h2>
                                <p>We understand your needs and deliver digin marketing through unique selling One propo. Our team of experts is passionate.</p>
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
                    <div className="col-lg-8">
                        <div className="row gy-5">
                            <div className="col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="blog-card style-2">
                                    <Link href="/blog/blog-details" className="blog-img">
                                        <img src="assets/img/home4/blog-img1.jpg" alt="" />
                                    </Link>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <ul>
                                                <li><Link href="/blog" className="category">Industry</Link></li>
                                                <li><Link href="/blog">10 August, 2024</Link></li>
                                            </ul>
                                        </div>
                                        <h4><Link href="/blog/blog-details">Construction News Tips Build Knowledge Base.</Link>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                <div className="blog-card style-2">
                                    <Link href="/blog/blog-details" className="blog-img">
                                        <img src="assets/img/home4/blog-img2.jpg" alt="" />
                                    </Link>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <ul>
                                                <li><Link href="/blog" className="category">Architecture</Link></li>
                                                <li><Link href="/blog">15 August, 2024</Link></li>
                                            </ul>
                                        </div>
                                        <h4><Link href="/blog/blog-details">From Blueprint Architect &amp; Construction.</Link>
                                        </h4>
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