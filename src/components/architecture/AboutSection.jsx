"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import CountUp from 'react-countup'
const AboutSection = () => {

    useEffect(()=>{
        const serviceImgItem = document.querySelectorAll(".award-wrap .single-award");

        function __followImageCursor(event, serviceImgItem) {
          const contentBox = serviceImgItem.getBoundingClientRect();
          const dx = event.clientX - contentBox.x;
          const dy = event.clientY - contentBox.y;
          serviceImgItem.children[1].style.transform = `translate(${dx}px, ${dy}px) rotate(12deg)`;
        }
      
        serviceImgItem.forEach((item, i) => {
          item.addEventListener("mousemove", (event) => {
            setInterval(__followImageCursor(event, item), 100);
          });
        });
    
        const serviceImgItem2 = document.querySelectorAll(".award-wrap2 .single-award");
    
        function __followImageCursor2(event, serviceImgItem2) {
          const contentBox = serviceImgItem2.getBoundingClientRect();
          const dx = event.clientX - contentBox.x;
          const dy = event.clientY - contentBox.y;
          serviceImgItem2.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
        }
      
        serviceImgItem2.forEach((item, i) => {
          item.addEventListener("mousemove", (event) => {
            setInterval(__followImageCursor2(event, item), 100);
          });
        });
    
    
        var dragging = false;
        var m = document.getElementById("imageHandle");
        var r = document.getElementById("imageReveal");
        var offsetX = 0;
        var offsetY = 0;
        var dragging = false;
    
        if (m !== null && r !== null) {
            initialize();
    
            // Add both mouse and touch event listeners
            m.addEventListener("mousedown", down, { passive: false });
            m.addEventListener("touchstart", down, { passive: false });
    
            function down(event) {
                event.preventDefault();
                dragging = true;
    
                // Remove transition effects during drag
                m.style.transition = "none";
                r.style.transition = "none";
    
                // Set grabbing cursor style
                document.body.style.cursor = "grabbing";
                m.style.cursor = "grabbing";
    
                // Calculate offsetX and offsetY for smooth dragging
                if (window.innerWidth > 767) {
                    offsetX = (event.clientX || event.touches[0].clientX) - m.getBoundingClientRect().left - 18;
                } else {
                    offsetY = (event.clientY || event.touches[0].clientY) - m.getBoundingClientRect().top;
                }
    
                // Trigger the initial move to prevent jump
                doMoving(event);
            }
    
            // Add mouse and touch move event listeners
            window.addEventListener("mousemove", move, { passive: false });
            window.addEventListener("touchmove", move, { passive: false });
    
            function move(event) {
                if (dragging) {
                    event.preventDefault();
                    doMoving(event);
                }
            }
    
            function doMoving(event) {
                // Get correct clientX and clientY for mouse and touch events
                var clientX = event.clientX || (event.touches && event.touches[0].clientX);
                var clientY = event.clientY || (event.touches && event.touches[0].clientY);
    
                if (window.innerWidth > 767) {
                    // For desktop layout (horizontal reveal)
                    var x = clientX - offsetX;
                    
                    // Adjust boundaries to prevent gaps or overflow
                    x = Math.max(0, Math.min(x, window.innerWidth - 2));
                    
                    // Set handle position and clip path
                    m.style.left = x + "px";
                    m.style.top = "50%";
                    r.style.clipPath = `inset(0 0 0 ${x}px)`;
                } else {
                    // For mobile layout (vertical reveal)
                    var client = r.getBoundingClientRect();
                    var y = clientY - offsetY;
                    
                    // Ensure the handle stays within the top and bottom boundaries
                    y = Math.max(0, Math.min(y, client.height));
                    
                    // Set handle position and clip path
                    m.style.top = y + "px";
                    m.style.left = "50%";
                    r.style.clipPath = `inset(0 0 ${client.height - y}px 0)`;
                }
            }
    
            // Initial setup for handle and reveal position
            function initialize() {
                if (window.innerWidth > 767) {
                    // Desktop initial position (centered horizontally)
                    var initialX = window.innerWidth / 2;
                    m.style.left = initialX + "px";
                    m.style.top = "50%";
                    r.style.clipPath = `inset(0 0 0 ${initialX}px)`;
                } else {
                    // Mobile initial position (centered vertically)
                    var client = r.getBoundingClientRect();
                    var initialY = client.height / 2;
                    m.style.top = initialY + "px";
                    m.style.left = "50%";
                    r.style.clipPath = `inset(0 0 ${client.height - initialY}px 0)`;
                }
            }
    
            // Mouseup and touchend events to reset dragging state
            window.addEventListener("mouseup", resetDragState);
            window.addEventListener("touchend", resetDragState);
    
            function resetDragState() {
                document.body.style.cursor = "";
                m.style.cursor = "";
                dragging = false;
            }
        }
    },)
  return (
    <>
     <div className="home3-about-section mb-120">
      <div className="container">
        <div className="row mb-80 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
          <div className="col-lg-8">
            <div className="section-title three">
              <span>Our Story Journey</span>
              <h2>Meet the Visionaries Behind Our Architecture.</h2>
              <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla est libero sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse.</p>
            </div>
          </div>
        </div>
        <div className="about-content mb-80">
          <div className="row justify-content-lg-end">
            <div className="col-xl-10 col-lg-11">
              <div className="row g-4">
                <div className="col-md-4 col-sm-6">
                  <div className="single-content">
                    <h5>WHO WE ARE</h5>
                    <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="single-content">
                    <h5>OUR MISSION</h5>
                    <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="single-content">
                    <h5>CORE VALUE</h5>
                    <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-img wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
          <img src="assets/img/home3/home3-about-img.jpg" alt="" />
        </div>
      </div>
    </div>   
    <div className="home3-banner2-section mb-120" id="revealSection">
      <div className="banner2-front-img">
        <img src="assets/img/home3/home3-banner2-front-img.jpg" alt="" />
        <h2>OUR PHILOSOPHY</h2>
      </div>
      <div className="banner2-back-img" id="imageReveal">
        <img src="assets/img/home3/home3-banner2-back-img.jpg" alt="" />
        <h2>OUR PHILOSOPHY</h2>
      </div>
      <div className="image-handle" id="imageHandle">
        <svg width={7} height={11} viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 0L7 11L-4.80825e-07 5.5L7 0Z" />
        </svg>
        <svg width={7} height={11} viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 11V0L7 5.5L0 11Z" />
        </svg>
      </div>
      <div className="button-area">
        <Link href="/contact" className="primary-btn2 white-bg">
          <span>
            Any Question Contact Now
            <svg viewBox="0 0 13 20">
              <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
    <div className="home3-counter-section mb-120">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-between mb-80 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
          <div className="col-xxl-6 col-lg-7">
            <div className="section-title three">
              <span>Who We Are</span>
              <h2>Discover More</h2>
              <p>Sed nisl eros, condimentum nec risus sit amet, finibus conguese.Fusen fringilla est libero sed tempus urna feugiat eu. Curabitur eu feugiat ligu Suspendisse.</p>
            </div>
          </div>
          <div className="col-lg-2 d-flex justify-content-lg-end">
            <Link href="/about" className="primary-btn">
              learn More 
              <svg viewBox="0 0 13 20">
                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter">
              <div className="content bounce_up">
                <div className="number">
                  <h2 className="counter"><CountUp end={45} /></h2>
                  <span>+</span>
                </div>
                <p>Green Spaces</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter two">
              <div className="content bounce_up">
                <div className="number">
                  <h2 className="counter"><CountUp end={15} /></h2>
                </div>
                <p>Skilled Professionals</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter three">
              <div className="content bounce_up">
                <div className="number">
                  <h2 className="counter"><CountUp end={5} /></h2>
                </div>
                <p>Year of Experienece</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-counter four">
              <div className="content bounce_up">
                <div className="number">
                  <h2 className="counter"><CountUp end={2} /></h2>
                  <span>M</span>
                </div>
                <p>Square Meters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="logo-section style-2 mb-120">
      <div className="container">
        <div className="logo-wrap">
          <div className="logo-title">
            <h6>A partner, Not A Vendor:</h6>
          </div>
          <div className="marquee">
            <div className="marquee__group">
              <a href="#"><img src="assets/img/home1/partner-01.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-02.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-03.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-04.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-05.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-06.png" alt="" /></a>
            </div>
            <div aria-hidden="true" className="marquee__group">
              <a href="#"><img src="assets/img/home1/partner-01.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-02.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-03.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-04.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-05.png" alt="" /></a>
              <a href="#"><img src="assets/img/home1/partner-06.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AboutSection