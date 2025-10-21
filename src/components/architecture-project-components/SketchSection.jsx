"use client"
import React, { useState } from 'react'

const SketchSection = ({ externalActiveIndex = null, onLayoutChange = null }) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(1);
    
    // Use external index if provided, otherwise use internal state
    const activeIndex = externalActiveIndex !== null ? externalActiveIndex : internalActiveIndex;

    const handleMouseEnter = (index) => {
        if (externalActiveIndex === null) {
            setInternalActiveIndex(index);
        }
        if (onLayoutChange) {
            onLayoutChange(index);
        }
    };

    const handleMouseLeave = () => {
        if (externalActiveIndex === null) {
            setInternalActiveIndex(1); // Set back to 1 for initial first item active
        }
    };
    return (
        <>
            <div className="home6-sketch-section">
                {/* <div className="title-area wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <h2>Sketch to real home transfer your hand</h2>
                    <img src="/assets/img/home6/home6-sketch-section-vector.svg" alt="" className="vector" />
                </div> */}
                <div className="home6-sketch-bg wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div className="indicator-area">
                        <ul>
                            <li onMouseEnter={() => handleMouseEnter(1)}
                                className={activeIndex === 1 ? 'active' : ''}>
                                <div className="dot-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1" />
                                            <div className="waves wave-2" />
                                            <div className="waves wave-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <img src="/assets/img/home6/sketch-item-img1.png" alt="" />
                                    <span>Layout 1</span>
                                </div>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter(2)}
                                className={activeIndex === 2 ? 'active' : ''}>
                                <div className="dot-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1" />
                                            <div className="waves wave-2" />
                                            <div className="waves wave-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <img src="/assets/img/home6/sketch-item-img2.png" alt="" />
                                    <span>Layout 2</span>
                                </div>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter(3)}
                                className={activeIndex === 3 ? 'active' : ''}>
                                <div className="dot-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1" />
                                            <div className="waves wave-2" />
                                            <div className="waves wave-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <img src="/assets/img/home6/sketch-item-img3.png" alt="" />
                                    <span>Layout 3</span>
                                </div>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter(4)}
                                className={activeIndex === 4 ? 'active' : ''}>
                                <div className="dot-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1" />
                                            <div className="waves wave-2" />
                                            <div className="waves wave-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <img src="/assets/img/home6/sketch-item-img4.png" alt="" />
                                    <span>Layout 4</span>
                                </div>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter(5)}
                                className={activeIndex === 5 ? 'active' : ''}>
                                <div className="dot-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1" />
                                            <div className="waves wave-2" />
                                            <div className="waves wave-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <img src="/assets/img/home6/sketch-item-img5.png" alt="" />
                                    <span>Layout 5</span>
                                </div>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter(6)}
                                className={activeIndex === 6 ? 'active' : ''}>
                                <div className="dot-main">
                                    <div className="promo-video">
                                        <div className="waves-block">
                                            <div className="waves wave-1" />
                                            <div className="waves wave-2" />
                                            <div className="waves wave-3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <img src="/assets/img/home6/sketch-item-img6.png" alt="" />
                                    <span>Layout 6</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SketchSection