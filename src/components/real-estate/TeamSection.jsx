import Link from 'next/link'
import React from 'react'

const TeamSection = () => {
  return (
    <>
      <div className="home2-team-section mb-120">
        <div className="container-fluid">
          <div className="row gy-5 justify-content-between">
            <div className="col-xl-4">
              <div className="team-title-area">
                <div className="section-title two white wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                  <span>The Vernex Team</span>
                  <h2>Our Talented Team.</h2>
                </div>
                <div className="btn_wrapper">
                  <Link href="/contact" className="contact-btn">
                    <div className="bg">
                      <svg width={207} height={125} viewBox="0 0 207 125" xmlns="http://www.w3.org/2000/svg">
                        <path d="M98.8179 1.5383C101.859 0.539043 105.141 0.539044 108.182 1.5383L115.855 4.05941C117.923 4.73874 120.114 4.96 122.275 4.70783L131.126 3.67539C134.545 3.27661 137.996 4.06554 140.902 5.90984L145.258 8.67445C147.363 10.0106 149.768 10.8008 152.255 10.9738L159.459 11.4747C163.687 11.7687 167.593 13.8378 170.212 17.1704L170.462 17.488C172.457 20.0276 175.22 21.8552 178.337 22.699L183.857 24.1929C187.414 25.1554 190.121 28.0448 190.85 31.6562C191.42 34.48 193.213 36.9058 195.745 38.2797L199.268 40.1913C202.457 41.9219 203.937 45.6977 202.773 49.1345C201.883 51.7612 202.525 54.6647 204.439 56.6713L204.693 56.9365C207.663 60.0506 207.663 64.9494 204.693 68.0635L204.439 68.3287C202.525 70.3353 201.883 73.2388 202.773 75.8655C203.937 79.3023 202.457 83.0781 199.268 84.8087L195.745 86.7203C193.213 88.0942 191.42 90.52 190.85 93.3438C190.121 96.9552 187.414 99.8446 183.857 100.807L178.337 102.301C175.219 103.145 172.457 104.972 170.462 107.512L170.212 107.83C167.593 111.162 163.687 113.231 159.459 113.525L152.255 114.026C149.768 114.199 147.363 114.989 145.258 116.326L140.902 119.09C137.996 120.934 134.545 121.723 131.126 121.325L122.275 120.292C120.114 120.04 117.923 120.261 115.855 120.941L108.182 123.462C105.141 124.461 101.859 124.461 98.8179 123.462L91.1446 120.941C89.0769 120.261 86.8862 120.04 84.7245 120.292L75.874 121.325C72.4554 121.723 69.0038 120.934 66.0979 119.09L61.7421 116.326C59.6369 114.989 57.2319 114.199 54.7446 114.026L47.5415 113.525C43.3132 113.231 39.4067 111.162 36.7879 107.83L36.5383 107.512C34.5426 104.972 31.7805 103.145 28.6628 102.301L23.1426 100.807C19.5863 99.8446 16.8791 96.9552 16.1499 93.3438C15.5797 90.52 13.7871 88.0942 11.255 86.7203L7.73223 84.8087C4.54288 83.0781 3.06307 79.3023 4.22717 75.8655C5.11688 73.2388 4.47481 70.3353 2.56049 68.3287L2.3075 68.0635C-0.663316 64.9494 -0.663313 60.0506 2.3075 56.9365L2.5605 56.6713C4.47481 54.6647 5.11688 51.7612 4.22717 49.1345C3.06307 45.6977 4.54288 41.9219 7.73223 40.1913L11.255 38.2797C13.7871 36.9058 15.5797 34.48 16.1499 31.6562C16.8791 28.0448 19.5863 25.1554 23.1426 24.1929L28.6628 22.699C31.7805 21.8552 34.5426 20.0276 36.5383 17.488L36.7879 17.1704C39.4067 13.8378 43.3132 11.7687 47.5415 11.4747L54.7446 10.9738C57.2319 10.8008 59.6369 10.0106 61.7421 8.67445L66.0979 5.90983C69.0038 4.06554 72.4554 3.27661 75.874 3.67539L84.7245 4.70783C86.8862 4.96 89.0769 4.73874 91.1446 4.05941L98.8179 1.5383Z" />
                        <path d="M98.974 2.01332C101.914 1.04737 105.086 1.04737 108.026 2.01332L115.699 4.53443C117.836 5.2364 120.1 5.46503 122.333 5.20446L131.184 4.17202C134.489 3.78654 137.825 4.54917 140.634 6.33199L144.99 9.0966C147.165 10.4772 149.65 11.2939 152.221 11.4726L159.424 11.9735C163.511 12.2577 167.287 14.2578 169.819 17.4793L170.212 17.1704L169.819 17.4793L170.069 17.797C172.131 20.4212 174.985 22.3097 178.207 23.1816L183.727 24.6756C187.1 25.5886 189.668 28.3294 190.36 31.7551C190.959 34.7241 192.844 37.2746 195.507 38.7192L199.029 40.6307C202.005 42.2453 203.385 45.7678 202.299 48.9741C201.35 51.777 202.035 54.8752 204.078 57.0165L204.439 56.6713L204.078 57.0165L204.331 57.2817C207.117 60.2026 207.117 64.7974 204.331 67.7183L204.078 67.9835C202.035 70.1248 201.35 73.223 202.299 76.0259C203.385 79.2322 202.005 82.7547 199.029 84.3693L195.507 86.2808C192.844 87.7254 190.959 90.2759 190.36 93.2449C189.668 96.6706 187.1 99.4114 183.727 100.324L178.207 101.818C174.985 102.69 172.131 104.579 170.069 107.203L169.819 107.521C167.287 110.742 163.511 112.742 159.424 113.027L152.221 113.527C149.65 113.706 147.165 114.523 144.99 115.903L140.634 118.668C137.825 120.451 134.489 121.213 131.184 120.828L122.333 119.796C120.1 119.535 117.836 119.764 115.699 120.466L108.026 122.987C105.086 123.953 101.914 123.953 98.974 122.987L91.3006 120.466C89.1641 119.764 86.9004 119.535 84.6666 119.796L75.816 120.828C72.5114 121.213 69.1748 120.451 66.3659 118.668L62.01 115.903C59.8347 114.523 57.3495 113.706 54.7793 113.527L47.5762 113.027C43.4889 112.742 39.7126 110.742 37.181 107.521L36.9314 107.203C34.8692 104.579 32.015 102.69 28.7934 101.818L23.2732 100.324C19.8997 99.4114 17.3317 96.6706 16.64 93.2449C16.0405 90.2759 14.1557 87.7254 11.4935 86.2808L7.97069 84.3692C4.99528 82.7547 3.61473 79.2322 4.70075 76.0259C5.65013 73.223 4.96499 70.1248 2.92227 67.9835L2.66928 67.7183C-0.117241 64.7974 -0.117239 60.2026 2.66928 57.2817L2.92227 57.0165C4.96499 54.8752 5.65013 51.777 4.70075 48.9741C3.61473 45.7678 4.99528 42.2453 7.9707 40.6307L11.4935 38.7192C14.1557 37.2746 16.0405 34.7241 16.64 31.7551C17.3317 28.3294 19.8997 25.5886 23.2732 24.6756L28.7934 23.1816C32.015 22.3097 34.8692 20.4212 36.9314 17.7969L37.181 17.4793C39.7126 14.2578 43.4889 12.2577 47.5762 11.9735L54.7793 11.4726C57.3495 11.2939 59.8347 10.4772 62.01 9.0966L66.3659 6.33199C69.1748 4.54917 72.5115 3.78654 75.816 4.17202L84.6666 5.20446C86.9004 5.46503 89.1641 5.2364 91.3006 4.53443L98.974 2.01332Z" strokeOpacity="0.2" />
                      </svg>
                    </div>
                    <div className="primary-btn white">
                      Let’s Talk With Us
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row g-md-0 gy-5 team-border">
                <div className="col-md-4 col-sm-6 d-flex justify-content-center team-divider">
                  <div className="team-card2 pb-35 magnetic-item">
                    <div className="team-img">
                      <img src="assets/img/home2/home2-team-img1.png" alt="" />
                      <div className="overlay">
                        <a href="#" className="social-area">
                          <div className="icon">
                            <span><i className="bx bxl-linkedin" /></span>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <span>Founder at Vernex</span>
                      <h5>Michael Daniel</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 d-flex justify-content-center team-divider">
                  <div className="team-card2 pb-35 magnetic-item">
                    <div className="team-img">
                      <img src="assets/img/home2/home2-team-img2.png" alt="" />
                      <div className="overlay">
                        <a href="#" className="social-area">
                          <div className="icon">
                            <span><i className="bx bxl-linkedin" /></span>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <span>Managing Broker</span>
                      <h5>Samuel Hudson</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 d-flex justify-content-center">
                  <div className="team-card2 pb-35 magnetic-item">
                    <div className="team-img">
                      <img src="assets/img/home2/home2-team-img3.png" alt="" />
                      <div className="overlay">
                        <a href="#" className="social-area">
                          <div className="icon">
                            <span><i className="bx bxl-linkedin" /></span>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <span>Team Leader</span>
                      <h5>Jackson Joseph</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 d-flex justify-content-center team-divider">
                  <div className="team-card2 pt-35 magnetic-item">
                    <div className="team-img">
                      <img src="assets/img/home2/home2-team-img4.png" alt="" />
                      <div className="overlay">
                        <a href="#" className="social-area">
                          <div className="icon">
                            <span><i className="bx bxl-linkedin" /></span>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <span>Office Manager</span>
                      <h5>Matthew Julian</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 d-flex justify-content-center team-divider">
                  <div className="team-card2 pt-35 magnetic-item">
                    <div className="team-img">
                      <img src="assets/img/home2/home2-team-img5.png" alt="" />
                      <div className="overlay">
                        <a href="#" className="social-area">
                          <div className="icon">
                            <span><i className="bx bxl-linkedin" /></span>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <span>Buyer’s Agent</span>
                      <h5>Maverick Gabriel</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 d-flex justify-content-center">
                  <div className="team-card2 pt-35 magnetic-item">
                    <div className="team-img">
                      <img src="assets/img/home2/home2-team-img6.png" alt="" />
                      <div className="overlay">
                        <a href="#" className="social-area">
                          <div className="icon">
                            <span><i className="bx bxl-linkedin" /></span>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    <div className="team-content">
                      <span>Sales Manager</span>
                      <h5>Gason Santiago</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default TeamSection