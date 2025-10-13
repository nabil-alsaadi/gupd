"use client";
import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import React, { useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper";
import Link from "next/link";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const ProjectSinglePage = () => {
       const settings = useMemo(() => {
        return {
            slidesPerView: "auto",
		speed: 1500,
		effect: 'fade',
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".project-single-next",
			prevEl: ".project-single-prev",
		},
        };
    }, []); 
    return (
        <>
            <Header1 fluid={"container-fluid"} />
            {/* <Breadcrum pageTitle={'Project'} pagename={'Project'} /> */}
            <div className="project-single-page">
                <div className="row">
                    <div className="col-lg-12">
                        <Swiper {...settings} className="swiper project-single-slider">
                            <div className="swiper-wrapper">
                                <SwiperSlide className="swiper-slide">
                                    <div className="project-single-wrapper">
                                        <div className="project-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(/assets/img/inner-pages/project-single-img1.jpg)' }} />
                                        <div className="project-content-wrap">
                                            <div className="project-content">
                                                <span>Client: Egenslab</span>
                                                <h2><Link href="/project/project-details">Dominating Auto Search</Link></h2>
                                                <ul>
                                                    <li><Link href="/project">Architecture</Link></li>
                                                    <li><Link href="/project">Construction</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                    <div className="project-single-wrapper">
                                        <div className="project-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(/assets/img/inner-pages/project-single-img2.jpg)' }} />
                                        <div className="project-content-wrap">
                                            <div className="project-content">
                                                <span>Client: Zenfy</span>
                                                <h2><Link href="/project/project-details">Timeless Vintage Interiors</Link></h2>
                                                <ul>
                                                    <li><Link href="/project">Renovation</Link></li>
                                                    <li><Link href="/project">Architecture</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                    <div className="project-single-wrapper">
                                        <div className="project-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(/assets/img/inner-pages/project-single-img3.jpg)' }} />
                                        <div className="project-content-wrap">
                                            <div className="project-content">
                                                <span>Client: Axleo</span>
                                                <h2><Link href="/project/project-details">Eco-Friendly Office Interiors</Link></h2>
                                                <ul>
                                                    <li><Link href="/project">Painting</Link></li>
                                                    <li><Link href="/project">Industrial</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                    <div className="project-single-wrapper">
                                        <div className="project-bg" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(/assets/img/inner-pages/project-single-img4.jpg)' }} />
                                        <div className="project-content-wrap">
                                            <div className="project-content">
                                                <span>Client: Nexaq</span>
                                                <h2><Link href="/project/project-details">Minimalist Luxury Suite</Link></h2>
                                                <ul>
                                                    <li><Link href="/project">Architecture</Link></li>
                                                    <li><Link href="/project">Commercial</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </div>
                </div>
                <div className="slider-btn-grp">
                    <div className="slider-btn project-single-prev">
                        <i className="bi bi-arrow-left" />
                    </div>
                    <div className="slider-btn project-single-next">
                        <i className="bi bi-arrow-right" />
                    </div>
                </div>
            </div>

            {/* <Home1FooterTop /> */}
            <Footer1 />
        </>
    )
}

export default ProjectSinglePage