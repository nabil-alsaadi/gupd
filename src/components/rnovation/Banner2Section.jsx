import React from 'react'
import SelectComponent from '../common/SelectComponent'

const Banner2Section = () => {
  return (
    <>
     <div className="home4-banner2-section mb-120">
        <div className="banner-video">
          <video autoPlay loop muted playsInline src="assets/video/renovation.mp4" />
        </div>
        <div className="video-content">
          <div className="banner-content-wrap">
            <div className="banner-content">
              <h2>ADORN YOUR</h2>
              <h2>OLD BUILDING.</h2>
            </div>
            <div className="scroll-down-btn" id="scroll-btn2">
              <div className="scroll-down-icon">
                <svg width={17} height={26} viewBox="0 0 17 26" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.49961 0.399902V25.5999M8.49961 25.5999C8.94961 22.2999 11.1096 15.7899 16.1496 16.1499M8.49961 25.5999C7.59961 22.1499 4.80961 15.4299 0.849609 16.1499" />
                </svg>
              </div>
              <span>SCROLL DOWN</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home4-faq-section mb-120" id="scroll-section2">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-5 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title2 mb-60">
                <h2>Question <br /> Answer <span /></h2>
              </div>
              <div className="faq-wrap style-2">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        01. Do you provide design and Handyman services?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Yes, we offer comprehensive design and handyman services to meet your construction needs.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        02. Is Vernex suitable for my business?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Discover if Vernex is the right fit for your business by exploring its tailored solutions for various industries and unique needs.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        03. What is your typical project timeline?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Discover the typical project timeline for our construction services, outlining each phase from planning to completion, ensuring timely and efficient project delivery.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        04. How do you handle permits and inspections?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We handle all necessary permits and inspections for your project, ensuring full compliance with local regulations and smooth progress throughout the construction process.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        05. How do you handle waste disposal and recycling?
                      </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        At our construction sites, we prioritize responsible waste disposal and recycling by adhering to local regulations, implementing sustainable practices, and partnering with certified waste management services to minimize environmental impact.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="contact-form-wrap">
                <form>
                  <div className="row g-4">
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Full Name *</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Email *</label>
                        <input type="email" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Phone *</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Service Type</label>
                        <SelectComponent placeholder={"Select"} options={["Conceptual Design","Project Planning","Site Analysis"]}/>
                        
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Message *</label>
                        <textarea defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-inner2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultValue id="contactCheck" />
                          <label className="form-check-label" htmlFor="contactCheck">
                            I have read &amp; accepted Terms &amp; Conditions.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="primary-btn2">
                    <span>
                      Submit Now
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default Banner2Section