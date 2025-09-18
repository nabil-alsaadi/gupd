import useModalVideo from '@/utils/useModalVideo'
import React from 'react'

const ProcessSection = () => {
    const { Modal, openModal } = useModalVideo()
    return (
        <>
            <div className="home4-process-section mb-120">
                <div className="container">
                    <div className="row gy-5 justify-content-between">
                        <div className="col-xl-4 col-lg-5">
                            <div className="process-content">
                                <div className="section-title2 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <h2>Our Work <br /> Process <span /></h2>
                                    <p>We understand your needs and deliver digin marketing through unique selling One propo. Our team of experts is passionate.</p>
                                </div>
                                <ul className="process-list">
                                    <li className="wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                        <div className="single-process">
                                            <span>Step 01</span>
                                            <h4>Planning &amp; Design</h4>
                                            <p>Conduct a thoroug need effortless assessment the understand your current marketing.</p>
                                        </div>
                                        <svg className="arrow" width={8} height={56} viewBox="0 0 8 56" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.33333 3C1.33333 4.47276 2.52724 5.66667 4 5.66667C5.47276 5.66667 6.66667 4.47276 6.66667 3C6.66667 1.52724 5.47276 0.333333 4 0.333333C2.52724 0.333333 1.33333 1.52724 1.33333 3ZM3.64645 55.3536C3.84171 55.5488 4.15829 55.5488 4.35355 55.3536L7.53553 52.1716C7.7308 51.9763 7.7308 51.6597 7.53553 51.4645C7.34027 51.2692 7.02369 51.2692 6.82843 51.4645L4 54.2929L1.17157 51.4645C0.976311 51.2692 0.659728 51.2692 0.464466 51.4645C0.269204 51.6597 0.269204 51.9763 0.464466 52.1716L3.64645 55.3536ZM3.5 3V55H4.5V3H3.5Z" />
                                        </svg>
                                    </li>
                                    <li className="wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                        <div className="single-process">
                                            <span>Step 02</span>
                                            <h4>Hiring Professionals</h4>
                                            <p>Conduct a thoroug need effortless assessment the understand your current marketing.</p>
                                        </div>
                                        <svg className="arrow" width={8} height={56} viewBox="0 0 8 56" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.33333 3C1.33333 4.47276 2.52724 5.66667 4 5.66667C5.47276 5.66667 6.66667 4.47276 6.66667 3C6.66667 1.52724 5.47276 0.333333 4 0.333333C2.52724 0.333333 1.33333 1.52724 1.33333 3ZM3.64645 55.3536C3.84171 55.5488 4.15829 55.5488 4.35355 55.3536L7.53553 52.1716C7.7308 51.9763 7.7308 51.6597 7.53553 51.4645C7.34027 51.2692 7.02369 51.2692 6.82843 51.4645L4 54.2929L1.17157 51.4645C0.976311 51.2692 0.659728 51.2692 0.464466 51.4645C0.269204 51.6597 0.269204 51.9763 0.464466 52.1716L3.64645 55.3536ZM3.5 3V55H4.5V3H3.5Z" />
                                        </svg>
                                    </li>
                                    <li className="wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                        <div className="single-process">
                                            <span>Step 03</span>
                                            <h4>Finishes &amp; Fixtures</h4>
                                            <p>Conduct a thoroug need effortless assessment the understand your current marketing.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="process-video-area">
                                <img src="assets/img/home4/process-video-img.jpg" alt="" />
                                <a data-fancybox="video-player" onClick={openModal} className="play-btn">
                                    <div className="icon">
                                        <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="70px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                                            <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100} />
                                            <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                                            <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53" />
                                        </svg>
                                        <svg className="play-icon" width={22} height={26} viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.0414 12.6872C21.0414 11.9857 20.68 11.3397 20.0741 10.9581L3.71746 0.667707C3.05587 0.252161 2.24905 0.221801 1.5565 0.588432C0.866106 0.954858 0.453125 1.63119 0.453125 2.39695V22.9762C0.453125 23.742 0.866072 24.4181 1.55755 24.7847C1.87989 24.9547 2.22564 25.0392 2.57141 25.0392C2.96897 25.0392 3.36391 24.927 3.71724 24.7054L20.0739 14.4166C20.68 14.0348 21.0414 13.3888 21.0414 12.6874V12.6872ZM19.4837 13.5246L3.12701 23.8134C2.80597 24.015 2.41492 24.0287 2.07958 23.8524C1.74423 23.6749 1.5435 23.3475 1.5435 22.976V2.39676C1.5435 2.02528 1.74423 1.69657 2.07958 1.52035C2.2363 1.43855 2.40452 1.39701 2.57165 1.39701C2.76458 1.39701 2.9562 1.45119 3.12725 1.55956L19.4839 11.85C19.7817 12.0376 19.9526 12.3438 19.9526 12.6887C19.9523 13.0323 19.7815 13.337 19.4837 13.5246Z" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal/>
            </div>
        </>
    )
}

export default ProcessSection