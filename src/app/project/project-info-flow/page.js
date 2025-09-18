"use client"
import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import Link from 'next/link'
import React, { useEffect } from 'react'

const ProjectInfoFlowPage = () => {
  useEffect(() => {
    const infoflow1TextItems = document.querySelectorAll(".project-info-flow-card");
  
    function followImageCursor(event, infoflow1TextItem) {
      const contentBox = infoflow1TextItem.getBoundingClientRect();
      const dx = event.clientX - contentBox.x;
      const dy = event.clientY - contentBox.y;
      
      // Select the .info-flow-content directly as the 3rd child
      const content = infoflow1TextItem.querySelector(".info-flow-content");
      if (content) {
        content.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    }
  
    infoflow1TextItems.forEach((item) => {
      item.addEventListener("mousemove", (event) => followImageCursor(event, item));
    });
  
    // Clean up the event listener when the component unmounts
    return () => {
      infoflow1TextItems.forEach((item) => {
        item.removeEventListener("mousemove", (event) => followImageCursor(event, item));
      });
    };
  }, []);
  
  return (
    <>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum pageTitle={'Project'} pagename={'Project'} content='Our Latest Work'  />
      <div className="project-info-flow-page mb-120">
        <div className="container-fluid">
          <div className="row gx-xxl-5 gx-xl-4 gx-lg-3 g-4 gy-xl-5 mb-70">
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img1.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Egenslab</Link>
                  <h6><Link href="/project/project-details">Unveiling Iconic Identities</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img2.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Zenfy</Link>
                  <h6><Link href="/project/project-details">Project Build Vision</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img3.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Axleo</Link>
                  <h6><Link href="/project/project-details">Dominating Auto Search</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img4.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Nexaq</Link>
                  <h6><Link href="/project/project-details">Blueprint to Reality</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img5.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Triprex</Link>
                  <h6><Link href="/project/project-details">Creating with Precision</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img6.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Softconic</Link>
                  <h6><Link href="/project/project-details">Crafting the Framework</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img7.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Tourio</Link>
                  <h6><Link href="/project/project-details">Build Master Plan</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img8.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Probid</Link>
                  <h6><Link href="/project/project-details">Modern Build Concepts</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img9.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Brodie</Link>
                  <h6><Link href="/project/project-details">Construction Methodology</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img10.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Egens Theme</Link>
                  <h6><Link href="/project/project-details">Site Planning Strategy</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img11.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Qzency</Link>
                  <h6><Link href="/project/project-details">Design Build Guide</Link></h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="project-info-flow-card">
                <Link href="/project/project-details" className="info-flow-img">
                  <img src="/assets/img/home6/project-img12.jpg" alt="" />
                </Link>
                <div className="info-flow-content">
                  <Link href="/project/project-details">Client: Axleo</Link>
                  <h6><Link href="/project/project-details">Future Build Strategy</Link></h6>
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

export default ProjectInfoFlowPage