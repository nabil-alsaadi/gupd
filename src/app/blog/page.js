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
      <Breadcrum pageTitle={'Blog Grid'} content='See Our Newest Article' pagename={'Blog Grid'} />
      <div className="blog-grid-page pt-120 mb-120">
        <div className="container">
          <div className="row gy-5 mb-70">
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/home1/blog-img1.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">10 August, 2024</Link></li>
                      <li><Link href="/blog">Industry</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Construction News &amp; Tips Buildin Knowledge Base.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/home1/blog-img2.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">05 July, 2024</Link></li>
                      <li><Link href="/blog">Ware House</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Contractor Corner Build Smarter
                    Blueprint for Success.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/home1/blog-img3.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">20 August, 2024</Link></li>
                      <li><Link href="/blog">Industry</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Architecture Shaping the Future of Urban Design.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/home1/blog-img4.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">25 August, 2024</Link></li>
                      <li><Link href="/blog">Industry</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Building Dreams The Intersection of Edge Architecture.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/home1/blog-img5.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">30 August, 2024</Link></li>
                      <li><Link href="/blog">Ware House</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">From Blueprint Reality Architect &amp; Construction.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/inner-pages/blog-img1.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">28 July, 2024</Link></li>
                      <li><Link href="/blog">Renovation</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Revolutionizing Spaces The Role Of Construction.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/inner-pages/blog-img2.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">12 July, 2024</Link></li>
                      <li><Link href="/blog">Architecture</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Sustainable Construction Meets Innovative Crafting.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/inner-pages/blog-img3.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">22 July, 2024</Link></li>
                      <li><Link href="/blog">Construction</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Designing The Future Synergy Of Design Construction.</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card magnetic-item">
                <Link href="/blog/blog-details" className="blog-img">
                  <img src="assets/img/inner-pages/blog-img4.jpg" alt="" />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <ul>
                      <li><Link href="/blog" className="blog-date">29 July, 2024</Link></li>
                      <li><Link href="/blog">Renovation</Link></li>
                    </ul>
                  </div>
                  <h4><Link href="/blog/blog-details">Designing The Future Synergy Of Design Construction.</Link></h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="innerpage-pagination-area">
                <ul className="paginations">
                  <li className="page-item paginations-button">
                    <a href="#">
                      <svg width={14} height={12} viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.98 5.66372C13.9099 5.4729 13.7497 5.26524 13.5995 5.16983C13.4493 5.08003 13.0538 5.07442 8.23285 5.04636L3.02639 5.01829L4.91373 3.22795C6.14025 2.06619 6.83111 1.37026 6.88117 1.2524C7.05138 0.848309 6.89619 0.30391 6.55577 0.101865C6.36053 -0.0216073 5.98506 -0.0328321 5.81986 0.0681905C5.75978 0.107477 4.46318 1.31975 2.93128 2.76774C1.05896 4.54124 0.127801 5.46167 0.0727325 5.57953C-0.0774537 5.94433 0.00765182 6.34281 0.303018 6.6571C0.798632 7.17344 5.8549 11.8598 5.99007 11.9271C6.20534 12.0337 6.39057 12.0225 6.63587 11.8991C7.03136 11.697 7.20157 11.0909 6.9863 10.6812C6.93624 10.5858 6.03012 9.699 4.97381 8.71684C3.92251 7.72907 3.05643 6.90966 3.05643 6.88721C3.05143 6.85915 5.38932 6.84231 8.25287 6.84231L13.4493 6.84231L13.6145 6.71884C13.8648 6.52241 13.975 6.32036 13.995 6.0173C14.005 5.87137 14 5.70862 13.98 5.66372Z" />
                      </svg>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a href="#">01</a>
                  </li>
                  <li className="page-item">
                    <a href="#">02</a>
                  </li>
                  <li className="page-item">
                    <a href="#">03</a>
                  </li>
                  <li className="page-item paginations-button">
                    <a href="#">
                      <svg width={14} height={12} viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.020025 6.33628C0.0901115 6.5271 0.25031 6.73476 0.400496 6.83017C0.550683 6.91997 0.946172 6.92558 5.76715 6.95364L10.9736 6.98171L9.08627 8.77205C7.85974 9.93381 7.16889 10.6297 7.11883 10.7476C6.94862 11.1517 7.10381 11.6961 7.44423 11.8981C7.63947 12.0216 8.01494 12.0328 8.18014 11.9318C8.24022 11.8925 9.53682 10.6803 11.0687 9.23226C12.941 7.45876 13.8722 6.53833 13.9273 6.42047C14.0775 6.05567 13.9923 5.65719 13.697 5.3429C13.2014 4.82656 8.1451 0.140237 8.00993 0.0728886C7.79466 -0.0337464 7.60943 -0.0225217 7.36413 0.100951C6.96864 0.302995 6.79843 0.909129 7.0137 1.31883C7.06376 1.41424 7.96988 2.301 9.02619 3.28316C10.0775 4.27093 10.9436 5.09034 10.9436 5.11279C10.9486 5.14085 8.61068 5.15769 5.74713 5.15769L0.550683 5.15769L0.385478 5.28116C0.135167 5.47759 0.0250308 5.67964 0.00500557 5.98271C-0.00500609 6.12863 -2.49531e-07 6.29139 0.020025 6.33628Z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
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