import React from 'react'
import Header1 from '@/components/header/Header1'
import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop';
export const metadata = {
  icons: {
    icon: "/assets/img/fav-icon.svg",
  },
};

const TeamPage = () => {
  return (
    <>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum content={"Creative Team With Us"} pageTitle={'Our Team'} pagename={'Team'} />
      <div className="team-page pt-120 mb-120">
        <div className="container">
          <div className="row gy-5 mb-70">
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/home1/team-img1.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Project Manager</span>
                  <h5>Olivern James</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/home1/team-img2.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Architects</span>
                  <h5>Mateob Henry</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/home1/team-img3.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Engineers</span>
                  <h5>Eliason Jacob</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/home1/team-img4.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Safety Officers</span>
                  <h5>Caleb Cooper</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/home1/team-img5.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Project Manager</span>
                  <h5>Jackson Joseph</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/home1/team-img6.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Architects</span>
                  <h5>Michael Daniel</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/inner-pages/team-img1.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Engineers</span>
                  <h5>Eliason Jacob</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/inner-pages/team-img2.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Safety Officers</span>
                  <h5>Caleb Cooper</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/inner-pages/team-img3.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Project Manager</span>
                  <h5>Daniel Scoot</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/inner-pages/team-img4.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Buyer’s Agent</span>
                  <h5>Maverick Gabriel</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/inner-pages/team-img5.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Sales Manager</span>
                  <h5>Matthew Julian</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="team-card magnetic-item">
                <div className="team-img">
                  <img src="assets/img/inner-pages/team-img6.png" alt="" />
                </div>
                <div className="team-content">
                  <span>Office Manager</span>
                  <h5>Gason Santiago</h5>
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

export default TeamPage