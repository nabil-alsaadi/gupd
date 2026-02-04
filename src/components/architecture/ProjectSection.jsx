"use client"
import Link from 'next/link'
import React from 'react'
import { useLanguage } from "@/providers/LanguageProvider"
import { useTranslation } from "react-i18next"

const ProjectSection = ({ projectData }) => {
  const { locale } = useLanguage()
  const { t } = useTranslation()
  const isRTL = locale === 'ar'
  
  // Only use database data - no fallback to default
  if (!projectData || !projectData.projects || projectData.projects.length === 0) {
    return null; // Don't render if no data from database
  }
  
  const data = projectData;
  
  // Get the first project from database
  const project = data.projects[0];
  const sections = project?.sections || [];
  
  // Safety check - ensure we have at least 3 sections
  if (sections.length < 3) {
    return null; // Don't render if we don't have enough sections
  }

  return (
    <div className="home3-project-section ">
    <div className="container">
      <div className="row justify-content-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
        <div className="col-xxl-7 col-xl-8 col-lg-9">
          <div className="section-title three text-center">
            <span>{isRTL && data.sectionTitle?.spanArabic ? data.sectionTitle.spanArabic : (data.sectionTitle?.span || '')}</span>
            <h2>{isRTL && data.sectionTitle?.headingArabic ? data.sectionTitle.headingArabic : (data.sectionTitle?.heading || '')}</h2>
            <p>{isRTL && data.sectionTitle?.descriptionArabic ? data.sectionTitle.descriptionArabic : (data.sectionTitle?.description || '')}</p>
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
                {/* <span>Client: {isRTL && project.clientArabic ? project.clientArabic : project.client}</span> */}
                <h2><Link href={`/project/${project.slug}`}>{isRTL && sections[0].titleArabic ? sections[0].titleArabic : sections[0].title}</Link></h2>
                <h3 className="project-subtitle">{isRTL && sections[0].subtitleArabic ? sections[0].subtitleArabic : sections[0].subtitle}</h3>
                <p className="project-description">{isRTL && sections[0].descriptionArabic ? sections[0].descriptionArabic : sections[0].description}</p>
                <ul>
                  {(isRTL && Array.isArray(sections[0].categoriesArabic) && sections[0].categoriesArabic.length > 0
                    ? sections[0].categoriesArabic
                    : sections[0].categories).map((category, index) => (
                    <li key={index}><Link href={`/project/${project.slug}`}>{category}</Link></li>
                  ))}
                </ul>
                {/* <div className="project-stats">
                  <span className="stat">{project.floors} Floors</span>
                  <span className="stat">{project.units} Units</span>
                  <span className="stat">{project.status}</span>
                </div> */}
              </div>
              <div className="button-area">
                <Link href={`/project/${project.slug}`} className="primary-btn">
                  {isRTL && sections[0].buttonTextArabic ? sections[0].buttonTextArabic : sections[0].buttonText}
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
                {/* <span>Client: {isRTL && project.clientArabic ? project.clientArabic : project.client}</span> */}
                <h2><Link href={`/project/${project.slug}`}>{isRTL && sections[1].titleArabic ? sections[1].titleArabic : sections[1].title}</Link></h2>
                <h3 className="project-subtitle">{isRTL && sections[1].subtitleArabic ? sections[1].subtitleArabic : sections[1].subtitle}</h3>
                <p className="project-description">{isRTL && sections[1].descriptionArabic ? sections[1].descriptionArabic : sections[1].description}</p>
                <ul>
                  {(isRTL && Array.isArray(sections[1].categoriesArabic) && sections[1].categoriesArabic.length > 0
                    ? sections[1].categoriesArabic
                    : sections[1].categories).map((category, index) => (
                    <li key={index}><Link href={`/project/${project.slug}`}>{category}</Link></li>
                  ))}
                </ul>
                {/* <div className="project-stats">
                  <span className="stat">{project.floors} Floors</span>
                  <span className="stat">{project.units} Units</span>
                  <span className="stat">{project.status}</span>
                </div> */}
              </div>
              <div className="button-area">
                <Link href={`/project/${project.slug}`} className="primary-btn">
                  {isRTL && sections[1].buttonTextArabic ? sections[1].buttonTextArabic : sections[1].buttonText}
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
                {/* <span>Client: {isRTL && project.clientArabic ? project.clientArabic : project.client}</span> */}
                <h2><Link href={`/project/${project.slug}`}>{isRTL && sections[2].titleArabic ? sections[2].titleArabic : sections[2].title}</Link></h2>
                <h3 className="project-subtitle">{isRTL && sections[2].subtitleArabic ? sections[2].subtitleArabic : sections[2].subtitle}</h3>
                <p className="project-description">{isRTL && sections[2].descriptionArabic ? sections[2].descriptionArabic : sections[2].description}</p>
                <ul>
                  {(isRTL && Array.isArray(sections[2].categoriesArabic) && sections[2].categoriesArabic.length > 0
                    ? sections[2].categoriesArabic
                    : sections[2].categories).map((category, index) => (
                    <li key={index}><Link href={`/project/${project.slug}`}>{category}</Link></li>
                  ))}
                </ul>
                <div className="project-stats">
                  <span className="stat">{project.floors} Floors</span>
                  <span className="stat">{project.units} Units</span>
                  <span className="stat">{project.status}</span>
                </div>
              </div>
              <div className="button-area">
                <Link href={`/project/${project.slug}`} className="primary-btn">
                  {isRTL && sections[2].buttonTextArabic ? sections[2].buttonTextArabic : sections[2].buttonText}
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
          <Link href={`/project/${project.slug}`} className="primary-btn2">
            <span>
              {t('project.viewAllProjectDetails')}
              <svg viewBox="0 0 13 20" style={{ transform: isRTL ? 'scaleX(-1)' : 'none', display: 'inline-block' }}>
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
