
import Breadcrum from "@/components/common/Breadcrum";
import Footer1 from "@/components/Footer/Footer1";
import Home1FooterTop from "@/components/Footer/Home1FooterTop";
import Header1 from "@/components/header/Header1";
import Link from "next/link";
import React from "react";

const FileNotFound = () => {
  return (
    <>
      <Header1 style="style-1 error-header" />
      {/* <Breadcrum pageTitle="Error" pagename="Error" /> */}
      <div className="error-page pt-120 mb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="error-wrapper">
                <div className="error-img">
                  <img src="assets/img/inner-pages/error-img.png" alt="" />
                </div>
                <div className="error-content">
                  <h1>Sorry! Page not found.</h1>
                  <p>The page you are looking for was moved, removed, renamed or never existed. we are open for this constructions &amp; architecture</p>
                  <Link href="/project" className="primary-btn3 two">
                    <span>
                      Take Me Home
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
            </div>
          </div>
        </div>
      </div>

      <Home1FooterTop />

      <Footer1 />

    </>
  );
};

export default FileNotFound;
