
import Link from 'next/link'
import React from 'react'
import projectData from '@/data/project-section-data.json'

const ProjectSection = () => {
  // Get the first project (Al Faisal Tower)
  const project = projectData.projects[0];
  const sections = project.sections;

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
      {/* Section 1 - Location */}
      <div className="project-card2 mb-40">
        <div className="row g-4">
          <div className="col-md-6 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-content-wrap">
              <div className="project-content">
                <span>Client: {project.client}</span>
                <h2><Link href={`/project/${sections[0].slug}`}>{sections[0].title}</Link></h2>
                <h3 className="project-subtitle">{sections[0].subtitle}</h3>
                <p className="project-description">{sections[0].description}</p>
                <ul>
                  {sections[0].categories.map((category, index) => (
                    <li key={index}><Link href={`/project/${sections[0].slug}`}>{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{project.floors} Floors</span>
                  <span className="stat">{project.units} Units</span>
                  <span className="stat">{project.status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={`/project/${sections[0].slug}`} className="primary-btn">
                  {sections[0].buttonText}
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 image-animation-container">
            <div className="project-img image-reveal wcf--image-effect-zoom-in overflow-hidden" data-animation-type="scale">
              <img src={sections[0].image} alt={sections[0].title} />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Design */}
      <div className="project-card2 two mb-40">
        <div className="row g-4">
          <div className="col-md-6 order-md-1 order-2 image-animation-container">
            <div className="project-img image-reveal wcf--image-effect-zoom-in overflow-hidden" data-animation-type="scale">
              <img src={sections[1].image} alt={sections[1].title} />
            </div>
          </div>
          <div className="col-md-6 order-md-2 order-1 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-content-wrap">
              <div className="project-content">
                <span>Client: {project.client}</span>
                <h2><Link href={`/project/${sections[1].slug}`}>{sections[1].title}</Link></h2>
                <h3 className="project-subtitle">{sections[1].subtitle}</h3>
                <p className="project-description">{sections[1].description}</p>
                <ul>
                  {sections[1].categories.map((category, index) => (
                    <li key={index}><Link href={`/project/${sections[1].slug}`}>{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{project.floors} Floors</span>
                  <span className="stat">{project.units} Units</span>
                  <span className="stat">{project.status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={`/project/${sections[1].slug}`} className="primary-btn">
                  {sections[1].buttonText}
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Amenities */}
      <div className="project-card2">
        <div className="row g-4">
          <div className="col-md-6 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="project-content-wrap">
              <div className="project-content">
                <span>Client: {project.client}</span>
                <h2><Link href={`/project/${sections[2].slug}`}>{sections[2].title}</Link></h2>
                <h3 className="project-subtitle">{sections[2].subtitle}</h3>
                <p className="project-description">{sections[2].description}</p>
                <ul>
                  {sections[2].categories.map((category, index) => (
                    <li key={index}><Link href={`/project/${sections[2].slug}`}>{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{project.floors} Floors</span>
                  <span className="stat">{project.units} Units</span>
                  <span className="stat">{project.status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={`/project/${sections[2].slug}`} className="primary-btn">
                  {sections[2].buttonText}
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 image-animation-container">
            <div className="project-img image-reveal wcf--image-effect-zoom-in overflow-hidden" data-animation-type="scale">
              <img src={sections[2].image} alt={sections[2].title} />
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-80 bounce_up">
        <div className="col-lg-12 d-flex justify-content-center">
          <Link href={`/project/${sections[0].slug}`} className="primary-btn2">
            <span>
              View All Project Details
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
