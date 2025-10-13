"use client"
import React, { useEffect } from 'react'

const AwardSection = () => {
    useEffect(() => {
        const infoflow1TextItems = document.querySelectorAll(".single-award");

        function followImageCursor(event, infoflow1TextItem) {
            const contentBox = infoflow1TextItem.getBoundingClientRect();
            const dx = event.clientX - contentBox.x;
            const dy = event.clientY - contentBox.y;

            // Select the .info-flow-content directly as the 3rd child
            const content = infoflow1TextItem.querySelector(".award-img");
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
        <div className="home2-award-section mb-120">
            <div className="container">
                <div className="row justify-content-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div className="col-lg-6">
                        <div className="section-title two text-center">
                            <span>Award Winning Moment</span>
                            <h2>Real Estate Agent Of The Year.</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="award-wrap">
                            <div className="single-award wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="title">
                                    <h5>Customer Choice</h5>
                                </div>
                                <div className="award-img">
                                    <img src="assets/img/home2/award-img1.png" alt="" />
                                </div>
                                <span className="date">19 Septembar, 2024</span>
                                <div className="dot" />
                            </div>
                            <div className="single-award wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                <div className="title">
                                    <h5>Top Influencer</h5>
                                </div>
                                <div className="award-img">
                                    <img src="assets/img/home2/award-img2.png" alt="" />
                                </div>
                                <span className="date">10 October, 2024</span>
                                <div className="dot" />
                            </div>
                            <div className="single-award wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="title">
                                    <h5>Community Impact</h5>
                                </div>
                                <div className="award-img">
                                    <img src="assets/img/home2/award-img3.png" alt="" />
                                </div>
                                <span className="date">15 October, 2024</span>
                                <div className="dot" />
                            </div>
                            <div className="single-award wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="title">
                                    <h5>Outstanding Urban</h5>
                                </div>
                                <div className="award-img">
                                    <img src="assets/img/home2/award-img4.png" alt="" />
                                </div>
                                <span className="date">20 November, 2024</span>
                                <div className="dot" />
                            </div>
                            <div className="single-award wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="title">
                                    <h5>Best Mixed</h5>
                                </div>
                                <div className="award-img">
                                    <img src="assets/img/home2/award-img5.png" alt="" />
                                </div>
                                <span className="date">24 February, 2023</span>
                                <div className="dot" />
                            </div>
                            <div className="single-award wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="title">
                                    <h5>Best Green Project</h5>
                                </div>
                                <div className="award-img">
                                    <img src="assets/img/home2/award-img6.png" alt="" />
                                </div>
                                <span className="date">30 June, 2023</span>
                                <div className="dot" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AwardSection