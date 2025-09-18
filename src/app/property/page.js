import Breadcrum from '@/components/common/Breadcrum'
import SelectComponent from '@/components/common/SelectComponent'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <Header1 fluid={"container-fluid"} />
            <Breadcrum pageTitle={'Properties'} pagename={'Properties'} content='We Provide Best Properties' />
            <div className="property-form-section">
                <div className="container">
                    <div className="property-form-wrap">
                        <div className="row g-xxl-4 g-xl-3 g-lg-2 gx-md-2 gy-4">
                            <div className="col-lg-3 col-md-3">
                                <div className="single-dropdown">
                                    <SelectComponent options={["Status", "For Rent", "For Sale"]} placeholder={"Status"} />

                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="single-dropdown">

                                    <SelectComponent options={["Apartment", "Office", "Single Family"]} placeholder={"Type"} />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-5">
                                <div className="single-dropdown">
                                    <SelectComponent options={["California, United States", "California, United States", "Ontario, Canada", "São Paulo, Brazil"]} placeholder={"Location"} />

                                </div>
                            </div>
                            <div className="col-lg-2 d-flex justify-content-center">
                                <button type="submit">
                                    Search Property
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="properties-page pt-120 mb-120">
                <div className="container">
                    <div className="row gy-5 mb-70">
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img"><img src="assets/img/home2/property-img1.jpg" alt="" /></Link>
                                    <div className="price">
                                        <span>$1,50000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Charming Family Home Luxury Living Room &amp;
                                        Garden.</Link></h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img"><img src="assets/img/home2/property-img2.jpg" alt="" /></Link>
                                    <div className="price">
                                        <span>$1,80000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Modern Urban Treat Cozy Cottage With Garden
                                        Views.</Link></h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img"><img src="assets/img/home2/property-img3.jpg" alt="" /></Link>
                                    <div className="price">
                                        <span>$1,40000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Elegant Townhouse In Primary Location Suburban.</Link>
                                    </h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img"><img src="assets/img/home2/property-img4.jpg" alt="" /></Link>
                                    <div className="price">
                                        <span>$1,60000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Historic Charm Me Modern Comfort Bright And Airy
                                        Loft.</Link></h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img"><img src="assets/img/home2/property-img5.jpg" alt="" /></Link>
                                    <div className="price">
                                        <span>$1,30000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Exclusive Gated Community One Residence
                                        Beachfront.</Link></h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img">
                                        <img src="assets/img/home2/property-img6.jpg" alt="" />
                                    </Link>
                                    <div className="price">
                                        <span>$1,55000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Opulent Estate With Panoramic Best River Views.</Link>
                                    </h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img">
                                        <img src="assets/img/inner-pages/property-img1.jpg" alt="" />
                                    </Link>
                                    <div className="price">
                                        <span>$1,35000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Ancient Charm Me Contemporary Coziness Airy and Light Loft.</Link>
                                    </h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img">
                                        <img src="assets/img/inner-pages/property-img2.jpg" alt="" />
                                    </Link>
                                    <div className="price">
                                        <span>$1,44000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>3 FLOORS</li>
                                        <li>3200 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">One Residence Beachside In An Elite Secured Complex.</Link>
                                    </h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                            <div className="property-card magnetic-item">
                                <div className="property-img-wrap">
                                    <Link href="/property/property-details" className="property-img">
                                        <img src="assets/img/inner-pages/property-img3.jpg" alt="" />
                                    </Link>
                                    <div className="price">
                                        <span>$1,25000</span>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <ul>
                                        <li>PENT HOUSE</li>
                                        <li>2 FLOORS</li>
                                        <li>2600 SQ.M</li>
                                    </ul>
                                    <h5><Link href="/property/property-details">Rich Property With The Greatest Water Views.</Link>
                                    </h5>
                                    <Link href="/property/property-details" className="primary-btn">
                                        View Details
                                        <svg viewBox="0 0 13 20">
                                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                        </svg>
                                    </Link>
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