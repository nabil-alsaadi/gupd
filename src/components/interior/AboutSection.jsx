import Link from 'next/link'
import React from 'react'

const AboutSection = () => {
    return (
        <>
            <div className="home5-about-section mb-120">
                <div className="container">
                    <div className="row justify-content-center wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-xxl-6 col-xl-7 col-lg-8">
                            <div className="section-title four text-center">
                                <span>Our Design Story</span>
                                <h2>Meet the Creators of Spaces</h2>
                                <p>We understand your needs and deliver digital marketing through unique selling One proposition. Our team of experts is passionate about helping you SEO company. Foi Choose us and experience the difference! Looking for something different?  We are challenge the status quo with innovative solutions and a [company culture problem adjective] approach.  Let us show you how we can help you achieve desired that to  phrase "ready to build together.</p>
                                <Link href="/about" className="primary-btn">
                                    Learn More About Us
                                    <svg viewBox="0 0 13 20">
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="about-content-wrap">
                        <div className="row gy-sm-5 gy-4">
                            <div className="col-lg-6 pt-120">
                                <div className="single-about">
                                    <div className="about-img btn_wrapper">
                                        <img src="assets/img/home5/home5-about-img1.jpg" alt="" />
                                    </div>
                                    <div className="about-content">
                                        <p>We understand your needs and deliver digital marketing through unique selling One proposition. Our team of experts is passionate about helping you SEO company. Foi adjective] approach.  Let us show you how we can help you achieve desired that to  phrase "ready to build together.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="single-about">
                                    <div className="about-img btn_wrapper">
                                        <img src="assets/img/home5/home5-about-img2.jpg" alt="" />
                                    </div>
                                    <div className="about-content">
                                        <h3>We are attracted to truly discoveri the ideas <span>and people working behind the</span> stages of your business.</h3>
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