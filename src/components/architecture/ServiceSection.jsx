"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const ServiceSection = () => {
    const awardData = [
        { name: "Conceptual Design" },
        { name: "Schematic Design" },
        { name: "Interior Design" },
        { name: "Sustainable Design" },
        { name: "Urban Planning" }
    ];
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

    const handleRowHover = (index) => {
        setHoveredRowIndex(index);
    };
    return (
        <div className="home3-service-section mb-120">
            <div className="container">
                <div className="row justify-content-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div className="col-xxl-7 col-xl-8 col-lg-9">
                        <div className="section-title three text-center">
                            <span>Best Solutions</span>
                            <h2>Architectural Solutions</h2>
                            <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla est libero sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse.</p>
                        </div>
                    </div>
                </div>
                <div className="row g-0 mb-60">
                    <div className="col-lg-7">
                        <ul className="service-list">
                        {["Conceptual Design", "Schematic Design", "Interior Design", "Sustainable Design", "Urban Planning"].map((item,index) => (
                            <li key={index} onMouseEnter={() => handleRowHover(index)} className="single-service wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="service-content">
                                    <span>{index}.</span>
                                    <h5>
                                        <Link href="/services/service-details">{item}
                                        </Link>
                                        <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7606 11.8843L0.876899 -5.73629e-07L-3.83304e-08 0.876897L11.8843 12.7606L3.66748 12.7606L3.66748 14L14 14L14 3.66748L12.7606 3.66748L12.7606 11.8843Z" />
                                        </svg>
                                    </h5>
                                </div>
                            </li>
                        ))}
                            
                            {/* <li className="single-service wow animate fadeInLeft" data-wow-delay="400ms" data-wow-duration="1500ms">
                                <div className="service-content">
                                    <span>02.</span>
                                    <h5>
                                        <Link href="/services/service-details">Schematic Design
                                        </Link>
                                        <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7606 11.8843L0.876899 -5.73629e-07L-3.83304e-08 0.876897L11.8843 12.7606L3.66748 12.7606L3.66748 14L14 14L14 3.66748L12.7606 3.66748L12.7606 11.8843Z" />
                                        </svg>
                                    </h5>
                                </div>
                            </li>
                            <li className="single-service wow animate fadeInLeft" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="service-content">
                                    <span>03.</span>
                                    <h5>
                                        <Link href="/services/service-details">Interior Design
                                        </Link>
                                        <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7606 11.8843L0.876899 -5.73629e-07L-3.83304e-08 0.876897L11.8843 12.7606L3.66748 12.7606L3.66748 14L14 14L14 3.66748L12.7606 3.66748L12.7606 11.8843Z" />
                                        </svg>
                                    </h5>
                                </div>
                            </li>
                            <li className="single-service wow animate fadeInLeft" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="service-content">
                                    <span>04.</span>
                                    <h5>
                                        <Link href="/services/service-details">Sustainable Design
                                        </Link>
                                        <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7606 11.8843L0.876899 -5.73629e-07L-3.83304e-08 0.876897L11.8843 12.7606L3.66748 12.7606L3.66748 14L14 14L14 3.66748L12.7606 3.66748L12.7606 11.8843Z" />
                                        </svg>
                                    </h5>
                                </div>
                            </li>
                            <li className="single-service wow animate fadeInLeft" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="service-content">
                                    <span>05.</span>
                                    <h5>
                                        <Link href="/services/service-details">Urban Planning
                                        </Link>
                                        <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7606 11.8843L0.876899 -5.73629e-07L-3.83304e-08 0.876897L11.8843 12.7606L3.66748 12.7606L3.66748 14L14 14L14 3.66748L12.7606 3.66748L12.7606 11.8843Z" />
                                        </svg>
                                    </h5>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-lg-5">
                        <ul className="service-img-group">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <li
                                    key={index}
                                    className={hoveredRowIndex === index ? "active" : ""}
                                >
                                    <div className="service-img">
                                        <img
                                            src={`assets/img/home3/service-img${index}.jpg`}
                                            alt=""
                                        />
                                    </div>
                                </li>
                            ))}
                            {/* <li className="active">
                                <div className="service-img">
                                    <img src="assets/img/home3/service-img1.jpg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="service-img">
                                    <img src="assets/img/home3/service-img2.jpg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="service-img">
                                    <img src="assets/img/home3/service-img3.jpg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="service-img">
                                    <img src="assets/img/home3/service-img4.jpg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="service-img">
                                    <img src="assets/img/home3/service-img5.jpg" alt="" />
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="row bounce_up">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <Link href="/services" className="primary-btn">
                            View All Services
                            <svg viewBox="0 0 13 20">
                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceSection