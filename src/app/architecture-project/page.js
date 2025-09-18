"use client"
import AboutSection from '@/components/architecture-project-components/AboutSection'
import AwardSection from '@/components/architecture-project-components/AwardSection'
import Banner from '@/components/architecture-project-components/Banner'
import Banner2 from '@/components/architecture-project-components/Banner2'
import Contact from '@/components/architecture-project-components/Contact'
import Footer from '@/components/architecture-project-components/Footer'
import GallerySection from '@/components/architecture-project-components/GallerySection'
import ProcessSection from '@/components/architecture-project-components/ProcessSection'
import ProjectSection from '@/components/architecture-project-components/ProjectSection'
import ServiceSection from '@/components/architecture-project-components/ServiceSection'
import SketchSection from '@/components/architecture-project-components/SketchSection'
import TeamSection from '@/components/architecture-project-components/TeamSection'
import TestimonialSection from '@/components/architecture-project-components/TestimonialSection'
import SidebarMenu from '@/components/common/SidebarMenu'
import Link from 'next/link'
import React, { useState } from 'react'

const ArchitectureProjectPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div id="magic-cursor">
        <div id="ball" />
      </div>
   
      <SidebarMenu style={"two"} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="main-container">
        <div className="sidebar-wrapper header-area">
          <div className="sidebar-logo">
            <Link href="/architecture-project"><img src="assets/img/header-logo2.svg" alt="" /></Link>
          </div>
          <div className="menu-btn" onClick={toggleMenu}>
            <svg width={18} height={18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.605469" y="0.600098" width="13.4399" height="1.67999" rx="0.839996" /> 
              <rect x="3.96484" y="7.32007" width="13.4399" height="3.35999" rx="1.67999" />
              <rect x="0.605469" y="15.7201" width="13.4399" height="1.67999" rx="0.839996" />
            </svg>
          </div>
          <Link href="/project" className="header-btn">
            <span>Start A Project</span>
            <svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.11469 8.48878L0.626356 -4.09735e-07L-2.73789e-08 0.626355L8.48878 9.11469L2.61963 9.11469L2.61963 10L10 10L10 2.61963L9.11469 2.61963L9.11469 8.48878Z" />
            </svg>
          </Link>
        </div>
        <div className="main-content">
          <Banner />
          <AboutSection />
          <ProjectSection />
          <SketchSection /> 
          <ServiceSection />
          <ProcessSection />
          <AwardSection />
          <TestimonialSection />
          <Banner2 />
          <TeamSection />
          <Contact />
          <GallerySection />
          <Footer />
        </div>
      </div>
    </>

  )
}

export default ArchitectureProjectPage