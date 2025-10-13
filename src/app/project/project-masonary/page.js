import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <Header1 fluid={"container-fluid"} />
            <Breadcrum pageTitle={'Project'} pagename={'Project'} content='Our Latest Work' />
            <div className="project-masonary-page pt-120 mb-120">
                <div className="container">
                    <div className="row gy-5 align-items-center justify-content-between mb-70">
                        <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="project-card3 magnetic-item">
                                <img src="/assets/img/home5/project-img1.jpg" alt="" />
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
                                <img src="/assets/img/home5/project-img2.jpg" alt="" />
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
                                <img src="/assets/img/home5/project-img3.jpg" alt="" />
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
                                <img src="/assets/img/home5/project-img4.jpg" alt="" />
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
                                <img src="/assets/img/home5/project-img5.jpg" alt="" />
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
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <a href="#" className="primary-btn2 bounce_up">
                                <span>
                                    Load More
                                    <svg viewBox="0 0 13 20">
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page