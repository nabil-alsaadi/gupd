import Link from 'next/link'
import React from 'react'

const CounterSection = () => {
  return (
    <>
     <div className="home2-counter-section mb-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter">45</h2>
                  <span>+</span>
                </div>
                <span>Green Spaces</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter">15</h2>
                </div>
                <span>Skilled Professionals</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter">10</h2>
                </div>
                <span>Years of Experience</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
              <div className="single-countdown">
                <div className="number">
                  <h2 className="counter">2</h2>
                  <span>M</span>
                </div>
                <span>Square Meters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home2-property-banner-section mb-120">
        <ul className="indivisual-item-list">
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img1.png" alt="" />
            </div>
            <div className="content">
              <h6>Laundry Room</h6>
              <span>150 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img2.png" alt="" />
            </div>
            <div className="content">
              <h6>Dining Room</h6>
              <span>200 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img3.png" alt="" />
            </div>
            <div className="content">
              <h6>Big Bedroom</h6>
              <span>170 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img4.png" alt="" />
            </div>
            <div className="content">
              <h6>Kitchen Room</h6>
              <span>160 Sq.m</span>
            </div>
          </li>
          <li className="single-item">
            <div className="img">
              <img src="assets/img/home2/property-banner-item-img5.png" alt="" />
            </div>
            <div className="content">
              <h6>Grass Garden</h6>
              <span>230 Sq.m</span>
            </div>
          </li>
        </ul>
        <Link href="/property" className="primary-btn2 white-bg">
          <span>
            All propertiy
            <svg viewBox="0 0 13 20">
              <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
            </svg>
          </span>
        </Link>
      </div>   
    </>
  )
}

export default CounterSection