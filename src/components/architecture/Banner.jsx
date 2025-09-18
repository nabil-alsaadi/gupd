"use client"
import useModalVideo from '@/utils/useModalVideo'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
    const {Modal ,openModal} = useModalVideo()
    return (
        <>
            <div className="home3-banner-section">
                <ul className="social-list">
                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                    <li><a href="https://x.com/"><i className="bi bi-twitter-x" /></a></li>
                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                </ul>
                <div className="banner-wrapper">
                    <div className="banner-content-and-logo">
                        <div className="banner-content wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <h1>Building Your Dreams with Precision.</h1>
                            <Link href="/project" className="primary-btn2">
                                <span>
                                    Start A Project
                                    <svg viewBox="0 0 13 20">
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                        <div className="banner-logo btn_wrapper">
                            <img src="assets/img/home3/home3-banner-logo.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="home3-banner-video-area">
                <div className="video-wrapper">
                    <img src="assets/img/home3/home3-banner-video-bg.jpg" alt="" />
                    <a data-fancybox="video-player" onClick={openModal} className="play-btn">
                        <div className="icon">
                            <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="70px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                                <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100} />
                                <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                                <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53" />
                            </svg>
                            <svg className="play-icon" width={22} height={26} viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.0414 12.6872C21.0414 11.9857 20.68 11.3397 20.0741 10.9581L3.71746 0.667707C3.05587 0.252161 2.24905 0.221801 1.5565 0.588432C0.866106 0.954858 0.453125 1.63119 0.453125 2.39695V22.9762C0.453125 23.742 0.866072 24.4181 1.55755 24.7847C1.87989 24.9547 2.22564 25.0392 2.57141 25.0392C2.96897 25.0392 3.36391 24.927 3.71724 24.7054L20.0739 14.4166C20.68 14.0348 21.0414 13.3888 21.0414 12.6874V12.6872ZM19.4837 13.5246L3.12701 23.8134C2.80597 24.015 2.41492 24.0287 2.07958 23.8524C1.74423 23.6749 1.5435 23.3475 1.5435 22.976V2.39676C1.5435 2.02528 1.74423 1.69657 2.07958 1.52035C2.2363 1.43855 2.40452 1.39701 2.57165 1.39701C2.76458 1.39701 2.9562 1.45119 3.12725 1.55956L19.4839 11.85C19.7817 12.0376 19.9526 12.3438 19.9526 12.6887C19.9523 13.0323 19.7815 13.337 19.4837 13.5246Z" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
            <Modal/>
        </>
    )
}

export default Banner