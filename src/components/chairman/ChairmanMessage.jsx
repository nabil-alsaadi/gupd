"use client";
import React from "react";
import useModalVideo from "@/utils/useModalVideo";

const ChairmanMessage = () => {
    const { Modal } = useModalVideo();
    return (
        <>
            <div className="home3-why-choose-section mb-120" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Decorative Background Element */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(177, 73, 237, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row gy-5 align-items-center">
                        <div className="col-lg-6 order-lg-1 order-2">
                            {/* Main Image at Top */}
                            <div className="wow animate slideInLeft" data-wow-delay="200ms" data-wow-duration="1800ms">
                                <div className="why-choose-img magnetic-item" style={{ 
                                    position: 'relative', 
                                    marginBottom: '40px'
                                }}>
                                    <img 
                                        src="assets/img/new/ShaikhFaisal.jpg" 
                                        alt="Shaikh Faisal - Chairman" 
                                        style={{
                                            borderRadius: '12px',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                            transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                                            width: '100%',
                                            height: 'auto'
                                        }}
                                    />
                                    
                                    {/* Single Experience Badge */}
                                    <div 
                                        className="wow animate slideInUp" 
                                        data-wow-delay="600ms" 
                                        data-wow-duration="1500ms"
                                        style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            left: '30px',
                                            background: 'linear-gradient(135deg, #B149ED 0%, #7C3AED 100%)',
                                            padding: '25px 35px',
                                            borderRadius: '12px',
                                            boxShadow: '0 15px 40px rgba(177, 73, 237, 0.4)',
                                            color: 'white',
                                            textAlign: 'center',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                        <h3 style={{ 
                                            fontSize: '40px', 
                                            fontWeight: 'bold', 
                                            margin: '0', 
                                            lineHeight: '1',
                                            color: 'white'
                                        }}>30+</h3>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            margin: '8px 0 0', 
                                            opacity: '0.95',
                                            color: 'white',
                                            fontWeight: '500',
                                            letterSpacing: '1px'
                                        }}>YEARS EXPERIENCE</p>
                                    </div>
                                </div>
                            </div>

                            {/* Leadership Quote */}
                            <div 
                                className="wow animate slideInUp" 
                                data-wow-delay="1000ms" 
                                data-wow-duration="1500ms"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(177, 73, 237, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
                                    padding: '30px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(177, 73, 237, 0.1)',
                                    marginTop: '20px',
                                    position: 'relative'
                                }}>
                                <svg width="40" height="32" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg" style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '15px',
                                    opacity: '0.3',
                                    fill: '#B149ED'
                                }}>
                                    <path d="M0 19.2C0 9.6 6.4 3.2 16 0L19.2 4.8C13.6 7.2 10.4 11.2 9.6 16H16V32H0V19.2ZM20.8 19.2C20.8 9.6 27.2 3.2 36.8 0L40 4.8C34.4 7.2 31.2 11.2 30.4 16H36.8V32H20.8V19.2Z"/>
                                </svg>
                                <p style={{
                                    margin: '0',
                                    fontSize: '16px',
                                    lineHeight: '1.6',
                                    color: '#333',
                                    fontStyle: 'italic',
                                    paddingLeft: '30px'
                                }}>
                                    "Leadership is about inspiring others to achieve more than they thought possible."
                                </p>
                                <div style={{
                                    marginTop: '15px',
                                    paddingLeft: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #B149ED 0%, #7C3AED 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px',
                                        color: 'white'
                                    }}>SF</div>
                                    <div>
                                        <h6 style={{ 
                                            margin: '0', 
                                            fontSize: '14px', 
                                            fontWeight: '600',
                                            color: '#000'
                                        }}>Shaikh Faisal</h6>
                                        <p style={{ 
                                            margin: '2px 0 0', 
                                            fontSize: '12px', 
                                            color: '#666'
                                        }}>Chairman & Founder</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-2 order-1">
                            <div className="why-choose-content">
                                <div className="section-title three wow animate slideInRight" data-wow-delay="300ms" data-wow-duration="1800ms">
                                    <span style={{ 
                                        fontSize: '14px', 
                                        letterSpacing: '2px',
                                        display: 'inline-block',
                                        marginBottom: '15px'
                                    }}>
                                        <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                                            <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="currentColor"/>
                                        </svg>
                                        Chairman's Message
                                    </span>
                                    <h2 style={{ marginBottom: '25px' }}>A Word from Shaikh Faisal</h2>
                                    
                                    {/* Stylized Quote */}
                                    <div 
                                        className="wow animate slideInUp" 
                                        data-wow-delay="300ms" 
                                        data-wow-duration="1500ms"
                                        style={{
                                            borderLeft: '4px solid #B149ED',
                                            paddingLeft: '25px',
                                            marginBottom: '25px',
                                            marginTop: '30px',
                                            fontStyle: 'italic',
                                            fontSize: '18px',
                                            lineHeight: '1.8',
                                            color: '#333',
                                            position: 'relative'
                                        }}>
                                        <svg width="40" height="32" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg" style={{
                                            position: 'absolute',
                                            left: '-10px',
                                            top: '-10px',
                                            opacity: '0.1',
                                            fill: '#B149ED'
                                        }}>
                                            <path d="M0 19.2C0 9.6 6.4 3.2 16 0L19.2 4.8C13.6 7.2 10.4 11.2 9.6 16H16V32H0V19.2ZM20.8 19.2C20.8 9.6 27.2 3.2 36.8 0L40 4.8C34.4 7.2 31.2 11.2 30.4 16H36.8V32H20.8V19.2Z"/>
                                        </svg>
                                        "Great architecture is not just about buildings—it's about creating spaces that inspire, transform, and endure."
                                    </div>
                                    
                                    <p className="wow animate slideInUp" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ 
                                        fontSize: '16px', 
                                        lineHeight: '1.8',
                                        marginBottom: '20px'
                                    }}>
                                        Welcome to our journey of architectural excellence. At our core, we believe in transforming visions into reality through innovative design and meticulous execution.
                                    </p>
                                    
                                    <p className="wow animate slideInUp" data-wow-delay="500ms" data-wow-duration="1500ms" style={{ 
                                        fontSize: '16px', 
                                        lineHeight: '1.8',
                                        marginBottom: '30px'
                                    }}>
                                        With decades of experience and a commitment to innovation, we bring your vision to life through thoughtful design. Our team is dedicated to delivering projects that exceed expectations and stand the test of time.
                                    </p>
                                </div>
                                
                                {/* Stats Row */}
                                <div 
                                    className="row mb-40 wow animate slideInUp" 
                                    data-wow-delay="600ms" 
                                    data-wow-duration="1500ms"
                                    style={{ marginTop: '40px' }}>
                                    <div className="col-4">
                                        <div style={{ 
                                            textAlign: 'center',
                                            padding: '20px 10px',
                                            borderRight: '1px solid #eee'
                                        }}>
                                            <h3 style={{ 
                                                fontSize: '36px', 
                                                fontWeight: 'bold', 
                                                color: '#B149ED',
                                                marginBottom: '8px'
                                            }}>500+</h3>
                                            <p style={{ 
                                                fontSize: '13px', 
                                                color: '#666',
                                                margin: 0,
                                                letterSpacing: '1px'
                                            }}>PROJECTS</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div style={{ 
                                            textAlign: 'center',
                                            padding: '20px 10px',
                                            borderRight: '1px solid #eee'
                                        }}>
                                            <h3 style={{ 
                                                fontSize: '36px', 
                                                fontWeight: 'bold', 
                                                color: '#B149ED',
                                                marginBottom: '8px'
                                            }}>50+</h3>
                                            <p style={{ 
                                                fontSize: '13px', 
                                                color: '#666',
                                                margin: 0,
                                                letterSpacing: '1px'
                                            }}>AWARDS</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div style={{ 
                                            textAlign: 'center',
                                            padding: '20px 10px'
                                        }}>
                                            <h3 style={{ 
                                                fontSize: '36px', 
                                                fontWeight: 'bold', 
                                                color: '#B149ED',
                                                marginBottom: '8px'
                                            }}>100%</h3>
                                            <p style={{ 
                                                fontSize: '13px', 
                                                color: '#666',
                                                margin: 0,
                                                letterSpacing: '1px'
                                            }}>SATISFIED</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn-and-video-area wow animate slideInUp" data-wow-delay="700ms" data-wow-duration="1500ms" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '30px',
                                    flexWrap: 'wrap'
                                }}>
                                    {/* Buttons can be added here if needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal />
            </div>

            {/* Custom CSS for scroll animations */}
            <style jsx>{`
                .wow.animate.slideInLeft {
                    animation: slideInLeft 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                .wow.animate.slideInRight {
                    animation: slideInRight 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                .wow.animate.slideInUp {
                    animation: slideInUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                @keyframes slideInLeft {
                    0% {
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInRight {
                    0% {
                        transform: translateX(50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInUp {
                    0% {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                /* Only hide elements that haven't been animated yet */
                .wow.animate:not(.animated) {
                    opacity: 0;
                }
                
                .wow.animate.animated {
                    opacity: 1;
                }
            `}</style>
        </>
    );
};

export default ChairmanMessage;
