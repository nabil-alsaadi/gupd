import Link from 'next/link'
import React from 'react'
import companyData from '@/data/companyData.json'
import navData from '@/data/nav.json'
import ContactInfo from '@/components/common/ContactInfo'
import SocialMedia from '@/components/common/SocialMedia'

const Footer1 = () => {
    return (
        <footer className="footer-section">
            <div className="footer-wrapper">
                <div className="row g-xl-0 gy-5 align-items-center">
                    <div className="col-xl-6">
                        <div className="footer-logo-and-contact-area">
                            <div className="footer-logo-area">
                                <Link href="/" className="footer-logo">
                                    <img src="/assets/img/footer-logo.svg" alt="" />
                                </Link>
                                <div className="footer-content">
                                    <p>{companyData.footer.description}</p>
                                    <SocialMedia className="social-list" showLabels={true} />
                                </div>
                            </div>
                            <ContactInfo showArrow={true} />
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="footer-address-and-menu-area">
                            <div className="row gy-xl-0 gy-5">
                                <div className="col-lg-12 order-xl-1 order-2">
                                    {/* <ul className="address-area">
                                        <li className="single-address">
                                            <span>NEW YORK</span>
                                            <a href="#">8204 Glen Ridge DriveEndicott, NY 13760</a>
                                        </li>
                                        <li className="single-address">
                                            <span>WASHINGTON DC</span>
                                            <a href="#">8204 Glen Ridge DriveEndicott, NY 13760</a>
                                        </li>
                                        <li className="single-address">
                                            <span>NEW JERSEY</span>
                                            <a href="#">8204 Glen Ridge DriveEndicott, NY 13760</a>
                                        </li>
                                    </ul> */}
                                </div>
                                <div className="col-lg-12 order-xl-2 order-1">
                                    <div className="footer-menu">
                                        <div className="row gy-5 justify-content-between">
                                            <div className="col-xxl-7 col-md-8 col-sm-9">
                                                <div className="footer-widget">
                                                    <div className="widget-title">
                                                        <h5>QUICK LINKS</h5>
                                                    </div>
                                                    <div className="menu-container">
                                                        <ul className="widget-list">
                                                            {navData.map((navItem) => (
                                                                <li key={navItem.id}>
                                                                    <Link href={navItem.link}>{navItem.label}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                                <div className="footer-widget">
                                                    <div className="widget-title">
                                                        <h5>COMPANY</h5>
                                                    </div>
                                                    <div className="menu-container">
                                                        <ul className="widget-list">
                                                            <li><Link href="/about">About Us</Link></li>
                                                            <li><Link href="/team">Meet Our Team</Link></li>
                                                            <li><Link href="/project/al-faisal-tower">Our Project</Link></li>
                                                            {/* <li><Link href="/blog-grid">Blog &amp; Article</Link></li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-wrap">
                <div className="container">
                    <div className="footer-bottom">
                        <div className="copyright-area">
                            <p>Copyright {new Date().getFullYear()} <Link href="/">GUPD</Link> | Powered By <a href="https://www.nabilalsaadi.com/">Nabil Alsaadi</a></p>
                        </div>
                        <div className="footer-bottom-right">
                            <ul>
                                <li><a href="#">Support Policy</a></li>
                                <li><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    )
}

export default Footer1