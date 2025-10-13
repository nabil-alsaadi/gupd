"use clinet"
import useModalVideo from '@/utils/useModalVideo'
import Link from 'next/link'
import React from 'react'

const Banner2 = () => {
    const { Modal, openModal } = useModalVideo()
    return (
        <>
            <div className="home6-banner2-section mb-120" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(assets/img/home6/home6-banner2-bg.jpg)' }}>
                <div className="circular-text">
                    {/* <svg class="textcircle" width="168" height="168" viewBox="0 0 168 168">
                  <defs>
                      <path id="textcirclePath" d="M84,84 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"></path>
                  </defs>
                  <text>
                      <textPath xlink:href="#textcirclePath" textLength="470"> * YOUR ARCHITECTURE DESIGN * READY HERE</textPath>
                  </text>
              </svg> */}
                    <svg className="textcircle" width={144} height={144} viewBox="0 0 144 144">
                        <defs>
                            <path id="textcirclePath" d="M72,72 m-64,0 a64,64 0 1,1 128,0 a64,64 0 1,1 -128,0" />
                        </defs>
                        <text>
                            <textPath xlinkHref="#textcirclePath" textLength={390}>* YOUR ARCHITECTURE DESIGN * READY HERE </textPath>
                        </text>
                    </svg>
                    <div className="video-area">
                        <a data-fancybox="video-player" onClick={openModal} className="play-btn">
                            <div className="icon">
                                <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="55px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                                    <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100} />
                                    <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                                    <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53" />
                                </svg>
                                <svg className="play-icon" width={17} height={20} viewBox="0 0 17 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7448 10.0396C16.7448 9.48848 16.4609 8.98091 15.9848 8.68109L3.1332 0.595746C2.61337 0.269245 1.97945 0.245391 1.4353 0.533459C0.892844 0.821365 0.568359 1.35276 0.568359 1.95444V18.1239C0.568359 18.7255 0.892818 19.2568 1.43612 19.5448C1.68939 19.6783 1.96105 19.7448 2.23273 19.7448C2.5451 19.7448 2.85541 19.6566 3.13302 19.4825L15.9847 11.3985C16.4609 11.0985 16.7448 10.5909 16.7448 10.0398V10.0396ZM15.5209 10.6976L2.66927 18.7817C2.41703 18.94 2.10977 18.9508 1.84629 18.8123C1.5828 18.6728 1.42508 18.4156 1.42508 18.1237V1.95429C1.42508 1.66241 1.5828 1.40414 1.84629 1.26568C1.96943 1.20141 2.1016 1.16877 2.23291 1.16877C2.3845 1.16877 2.53506 1.21134 2.66946 1.29649L15.5211 9.38183C15.7551 9.52926 15.8893 9.76979 15.8893 10.0408C15.8892 10.3108 15.7549 10.5502 15.5209 10.6976Z" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
                <Modal />
            </div>
            <div className="home6-blog-section mb-120">
                <div className="container">
                    <div className="row g-4 align-items-center justify-content-between mb-70">
                        <div className="col-xl-6 col-lg-7 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="section-title">
                                <h2>Architecture insights design dialogue.</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 d-flex justify-content-lg-end btn_wrapper">
                            <Link href="/blog" className="primary-btn3">
                                <span>
                                    View All Post
                                    <svg viewBox="0 0 13 20">
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                    </svg>
                                </span>
                                <i className="corner tl" />
                                <i className="corner tr" />
                                <i className="corner br" />
                                <i className="corner bl" />
                            </Link>
                        </div>
                    </div>
                    <div className="row gy-5">
                        <div className="col-lg-5 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="blog-card style-4">
                                <Link href="/blog/blog-details" className="blog-img">
                                    <img src="assets/img/home6/blog-img1.jpg" alt="" />
                                </Link>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li><Link href="/blog" className="blog-date">10 August, 2024</Link></li>
                                            <li><Link href="/blog">Industry</Link></li>
                                        </ul>
                                    </div>
                                    <h4><Link href="/blog/blog-details">At Deep Into Architectural Innovation Dive.</Link></h4>
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
                        <div className="col-lg-7">
                            <div className="row gy-xl-5 g-4">
                                <div className="col-lg-12 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="blog-card style-3">
                                        <Link href="/blog/blog-details" className="blog-img">
                                            <img src="assets/img/home6/blog-img2.jpg" alt="" />
                                        </Link>
                                        <div className="blog-content-wrap">
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <ul>
                                                        <li><Link href="/blog" className="blog-date">10 August, 2024</Link></li>
                                                        <li><Link href="/blog">Industry</Link></li>
                                                    </ul>
                                                </div>
                                                <h4><Link href="/blog/blog-details">The Latest Trend &amp; Insight In Architecture.</Link></h4>
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
                                <div className="col-lg-12 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <div className="blog-card style-3">
                                        <Link href="/blog/blog-details" className="blog-img">
                                            <img src="assets/img/home6/blog-img3.jpg" alt="" />
                                        </Link>
                                        <div className="blog-content-wrap">
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <ul>
                                                        <li><Link href="/blog" className="blog-date">10 August, 2024</Link></li>
                                                        <li><Link href="/blog">Industry</Link></li>
                                                    </ul>
                                                </div>
                                                <h4><Link href="/blog/blog-details">Architecture Building For A Greener Future.</Link></h4>
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
            </div>
        </>

    )
}

export default Banner2