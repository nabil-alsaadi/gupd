import Breadcrum from '@/components/common/Breadcrum'
import SelectComponent from '@/components/common/SelectComponent'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import ContactInfo from '@/components/common/ContactInfo'
import { getContact } from '@/lib/getContact'

const page = async () => {
    const contactData = await getContact();
    
    return (
        <>
            <Header1 fluid={"container-fluid"}/>
            <Breadcrum content='Get In Touch With GUPD' pageTitle={'Contact Us'} pagename={'Contact'} />
            <div className="home6-contact-section pt-120 mb-120">
                <div className="container">
                    <div className="contact-wrapper">
                        <div className="row gy-5 align-items-center">
                            <div className="col-lg-5 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="contact-content">
                                    <div className="section-title">
                                        <h2>Connect with GUPD team.</h2>
                                    </div>
                                    {/* <svg width={8} height={143} viewBox="0 0 8 143" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.33333 3C1.33333 4.47276 2.52724 5.66667 4 5.66667C5.47276 5.66667 6.66667 4.47276 6.66667 3C6.66667 1.52724 5.47276 0.333333 4 0.333333C2.52724 0.333333 1.33333 1.52724 1.33333 3ZM3.64645 142.354C3.84171 142.549 4.1583 142.549 4.35356 142.354L7.53554 139.172C7.7308 138.976 7.7308 138.66 7.53554 138.464C7.34028 138.269 7.0237 138.269 6.82843 138.464L4.00001 141.293L1.17158 138.464C0.976317 138.269 0.659734 138.269 0.464472 138.464C0.26921 138.66 0.26921 138.976 0.464472 139.172L3.64645 142.354ZM3.5 3L3.50001 142L4.50001 142L4.5 3L3.5 3Z" />
                                    </svg> */}
                                    <ContactInfo className="contact-list" contactData={contactData} />
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
                                                    <SelectComponent options={["Property Development","Investment Opportunities","Property Management","Consultation","Residential Projects","Commercial Projects"]} placeholder="Select Service Type"/>
                                                    
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
            </div>

            <Home1FooterTop />
            <Footer1 />
        </>
    )
}

export default page