import Link from 'next/link'
import React, { useEffect } from 'react'

const ProjectSection = () => {
    
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
            <div className="home6-project-section mb-120">
                <div className="container-fluid">
                    <div className="title-area mb-90">
                        <div className="row g-4 align-items-end wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="col-lg-5">
                                <div className="section-title">
                                    <h2>A glimpse into our creative work.</h2>
                                </div>
                            </div>
                            <div className="col-lg-7 d-flex justify-content-lg-end">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button className="nav-link active" id="nav-conceptual-tab" data-bs-toggle="tab" data-bs-target="#nav-conceptual" type="button" role="tab" aria-controls="nav-conceptual" aria-selected="true">Conceptual Design</button>
                                        <button className="nav-link" id="nav-interior-tab" data-bs-toggle="tab" data-bs-target="#nav-interior" type="button" role="tab" aria-controls="nav-interior" aria-selected="false">Interior Design</button>
                                        <button className="nav-link" id="nav-planning-tab" data-bs-toggle="tab" data-bs-target="#nav-planning" type="button" role="tab" aria-controls="nav-planning" aria-selected="false">Urban Planning</button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-conceptual" role="tabpanel" aria-labelledby="nav-conceptual-tab">
                            <div className="row gx-xxl-5 gx-xl-4 g-lg-3 g-4 mb-70">
                                <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img1.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Egenslab</Link>
                                            <h6><Link href="/project-details">Unveiling Iconic Identities</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img2.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Zenfy</Link>
                                            <h6><Link href="/project-details">Project Build Vision</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img3.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Axleo</Link>
                                            <h6><Link href="/project-details">Dominating Auto Search</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img4.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Nexaq</Link>
                                            <h6><Link href="/project-details">Blueprint to Reality</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img5.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Triprex</Link>
                                            <h6><Link href="/project-details">Creating with Precision</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img6.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Softconic</Link>
                                            <h6><Link href="/project-details">Crafting the Framework</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img7.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Tourio</Link>
                                            <h6><Link href="/project-details">Build Master Plan</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img8.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Probid</Link>
                                            <h6><Link href="/project-details">Modern Build Concepts</Link></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-interior" role="tabpanel" aria-labelledby="nav-interior-tab">
                            <div className="row gx-xxl-5 gx-xl-4 g-lg-3 g-4 mb-70">
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img1.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Egenslab</Link>
                                            <h6><Link href="/project-details">Unveiling Iconic Identities</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img2.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Zenfy</Link>
                                            <h6><Link href="/project-details">Project Build Vision</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img3.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Axleo</Link>
                                            <h6><Link href="/project-details">Dominating Auto Search</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img4.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Nexaq</Link>
                                            <h6><Link href="/project-details">Blueprint to Reality</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img5.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Triprex</Link>
                                            <h6><Link href="/project-details">Creating with Precision</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img6.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Softconic</Link>
                                            <h6><Link href="/project-details">Crafting the Framework</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img7.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Tourio</Link>
                                            <h6><Link href="/project-details">Build Master Plan</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img8.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Probid</Link>
                                            <h6><Link href="/project-details">Modern Build Concepts</Link></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-planning" role="tabpanel" aria-labelledby="nav-planning-tab">
                            <div className="row gx-xxl-5 gx-xl-4 g-lg-3 g-4 mb-70">
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img1.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Egenslab</Link>
                                            <h6><Link href="/project-details">Unveiling Iconic Identities</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img2.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Zenfy</Link>
                                            <h6><Link href="/project-details">Project Build Vision</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img3.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Axleo</Link>
                                            <h6><Link href="/project-details">Dominating Auto Search</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img4.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Nexaq</Link>
                                            <h6><Link href="/project-details">Blueprint to Reality</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img5.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Triprex</Link>
                                            <h6><Link href="/project-details">Creating with Precision</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img6.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Softconic</Link>
                                            <h6><Link href="/project-details">Crafting the Framework</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img7.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Tourio</Link>
                                            <h6><Link href="/project-details">Build Master Plan</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 pt-80">
                                    <div className="project-info-flow-card">
                                        <Link href="/project-details" className="info-flow-img">
                                            <img src="assets/img/home6/project-img8.jpg" alt="" />
                                        </Link>
                                        <div className="info-flow-content">
                                            <Link href="/project-details">Client: Probid</Link>
                                            <h6><Link href="/project-details">Modern Build Concepts</Link></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <Link href="/project" className="primary-btn3 bounce_up">
                                <span>
                                    View All Project
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
        </>
    )
}

export default ProjectSection