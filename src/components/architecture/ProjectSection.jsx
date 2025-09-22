
import Link from 'next/link'
import React from 'react'
import projectData from '@/data/project-section-data.json'

const ProjectSection = () => {

  return (
    <div className="home3-project-section mb-120 ">
    <div className="container">
      <div className="row justify-content-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
        <div className="col-xxl-7 col-xl-8 col-lg-9">
          <div className="section-title three text-center">
            <span>{projectData.sectionTitle.span}</span>
            <h2>{projectData.sectionTitle.heading}</h2>
            <p>{projectData.sectionTitle.description}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="project-card2 mb-40">
        <div className="row g-4">
          <div className="col-md-6 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-content-wrap">
              <div className="project-content">
                <span>Client: {projectData.projects[0].client}</span>
                <h2><Link href={projectData.projects[0].link}>{projectData.projects[0].title}</Link></h2>
                <h3 className="project-subtitle">{projectData.projects[0].subtitle}</h3>
                <p className="project-description">{projectData.projects[0].description}</p>
                <ul>
                  {projectData.projects[0].categories.map((category, index) => (
                    <li key={index}><Link href="/project">{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{projectData.projects[0].floors} Floors</span>
                  <span className="stat">{projectData.projects[0].units} Units</span>
                  <span className="stat">{projectData.projects[0].status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={projectData.projects[0].link} className="primary-btn">
                  View Details
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 image-animation-container">
            <div className="project-img image-reveal wcf--image-effect-zoom-in overflow-hidden" data-animation-type="scale">
              <img src={projectData.projects[0].image} alt={projectData.projects[0].title} />
            </div>
          </div>
        </div>
      </div>
      <div className="project-card2 two mb-40">
        <div className="row g-4">
          <div className="col-md-6 order-md-1 order-2 image-animation-container">
            <div className="project-img image-reveal wcf--image-effect-zoom-in overflow-hidden" data-animation-type="scale">
              <img src={projectData.projects[1].image} alt={projectData.projects[1].title} />
            </div>
          </div>
          <div className="col-md-6 order-md-2 order-1 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-content-wrap">
              <div className="project-content">
                <span>Client: {projectData.projects[1].client}</span>
                <h2><Link href={projectData.projects[1].link}>{projectData.projects[1].title}</Link></h2>
                <h3 className="project-subtitle">{projectData.projects[1].subtitle}</h3>
                <p className="project-description">{projectData.projects[1].description}</p>
                <ul>
                  {projectData.projects[1].categories.map((category, index) => (
                    <li key={index}><Link href="/project">{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{projectData.projects[1].floors} Floors</span>
                  <span className="stat">{projectData.projects[1].units} Units</span>
                  <span className="stat">{projectData.projects[1].status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={projectData.projects[1].link} className="primary-btn">
                  View Details
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="project-card2">
        <div className="row g-4">
          <div className="col-md-6 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-content-wrap">
              <div className="project-content">
                <span>Client: {projectData.projects[2].client}</span>
                <h2><Link href={projectData.projects[2].link}>{projectData.projects[2].title}</Link></h2>
                <h3 className="project-subtitle">{projectData.projects[2].subtitle}</h3>
                <p className="project-description">{projectData.projects[2].description}</p>
                <ul>
                  {projectData.projects[2].categories.map((category, index) => (
                    <li key={index}><Link href="/project">{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{projectData.projects[2].floors} Floors</span>
                  <span className="stat">{projectData.projects[2].units} Units</span>
                  <span className="stat">{projectData.projects[2].status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={projectData.projects[2].link} className="primary-btn">
                  View Details
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 image-animation-container">
            <div className="project-img image-reveal wcf--image-effect-zoom-in overflow-hidden" data-animation-type="scale">
              <img src={projectData.projects[2].image} alt={projectData.projects[2].title} />
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-80 bounce_up">
        <div className="col-lg-12 d-flex justify-content-center">
          <Link href="/project" className="primary-btn2">
            <span>
              View More Project
              <svg viewBox="0 0 13 20">
                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
    <img src="assets/img/home3/home3-project-section-vector.svg" alt="" className="vector" />
  </div>
  )
}

export default ProjectSection