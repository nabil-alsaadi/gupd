"use client"
import useModalVideo from '@/utils/useModalVideo'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
    const{Modal, openModal} = useModalVideo()
    return (
        <>
            <div className="home2-banner-section mb-120">
                <div className="container">
                    <div className="banner-content-wrap">
                        <div className="row justify-content-center wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="col-xl-8 col-lg-10">
                                <div className="banner-content">
                                    <h1>Building Your Dreams With Precision.</h1>
                                    <div className="btn-and-video-area">
                                        <Link href="project" className="primary-btn white">
                                            Start A Project
                                            <svg viewBox="0 0 13 20">
                                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                            </svg>
                                        </Link>
                                        <a data-fancybox="video-player" onClick={openModal} className="video-area">
                                            <div className="icon">
                                                <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                                                    <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100}>
                                                    </circle>
                                                    <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                                                    <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53">
                                                    </path>
                                                </svg>
                                                <svg className="play-icon" width={14} height={16} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.5094 7.92211C13.5094 7.49123 13.2874 7.0944 12.9152 6.86L2.86754 0.538727C2.46113 0.283462 1.96552 0.264813 1.54009 0.490029C1.11599 0.71512 0.862305 1.13058 0.862305 1.60098V14.2425C0.862305 14.7129 1.11597 15.1282 1.54074 15.3535C1.73875 15.4579 1.95113 15.5098 2.16354 15.5098C2.40776 15.5098 2.65036 15.4409 2.8674 15.3048L12.9151 8.98449C13.2874 8.74995 13.5094 8.35313 13.5094 7.92225V7.92211ZM12.5525 8.43653L2.50484 14.7568C2.30763 14.8806 2.06741 14.889 1.86141 14.7808C1.65541 14.6717 1.53211 14.4706 1.53211 14.2424V1.60086C1.53211 1.37266 1.65541 1.17074 1.86141 1.06249C1.95768 1.01224 2.06102 0.986728 2.16368 0.986728C2.2822 0.986728 2.39991 1.02001 2.50498 1.08658L12.5526 7.40785C12.7356 7.52311 12.8405 7.71116 12.8405 7.92304C12.8404 8.13414 12.7355 8.32129 12.5525 8.43653Z" />
                                                </svg>
                                            </div>
                                            <h6>See Success Story</h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-text-area">
                    <div className="scroll-text">
                        <h2>Quality Construction, Timely Delivery</h2>
                    </div>
                    <div aria-hidden="true" className="scroll-text">
                        <h2>Quality Construction, Timely Delivery,</h2>
                    </div>
                </div>
                <Modal/>
            </div>
        </>
    )
}

export default Banner