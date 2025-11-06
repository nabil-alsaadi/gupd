"use client"
import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import Header1 from '@/components/header/Header1'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import defaultProjectData from '@/data/project-section-data.json'
import SketchSection from '@/components/architecture-project-components/SketchSection'
import WhatsNearby from '@/components/common/WhatsNearby'
import PropertyAttachment from '@/components/common/PropertyAttachment'

const ProjectDetailsClient = ({ project, slug }) => {
  const [activeLayoutIndex, setActiveLayoutIndex] = useState(1);
  const [activeTab, setActiveTab] = useState('layouts');

  // Use provided project or fall back to default data
  const foundProject = project || defaultProjectData.projects.find(p => p.slug === slug);

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'layouts', label: 'Unit Layouts', icon: '/assets/img/icons/icons8-building-50.png' },
    { id: 'location', label: 'Location Map', icon: '/assets/img/icons/icons8-location-50.png' },
    { id: 'gallery', label: 'Photo Gallery', icon: '/assets/img/icons/icons8-gallery-48.png' }
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveTab(sectionId);
    }
  };

  // Track scroll position to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationTabs.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navigationTabs[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize fancybox for gallery
  useEffect(() => {
    // Wait for jQuery and fancybox to be available
    const initFancybox = () => {
      if (typeof window !== 'undefined' && window.$ && window.$.fancybox) {
        // Destroy existing fancybox instances to avoid conflicts
        if (window.$('[data-fancybox="gallery"]').length) {
          window.$('[data-fancybox="gallery"]').each(function () {
            window.$(this).off('click.fb-start');
          });
        }

        // Initialize fancybox
        window.$('[data-fancybox="gallery"]').fancybox({
          buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
          ],
          loop: true,
          protect: true,
          animationEffect: "zoom-in-out",
          transitionEffect: "slide",
          clickContent: function (current, event) {
            return current.type === 'image' ? 'zoom' : false;
          }
        });
      } else {
        // Retry after a short delay if not ready
        setTimeout(initFancybox, 200);
      }
    };

    const timer = setTimeout(initFancybox, 500);
    return () => clearTimeout(timer);
  }, [foundProject]);

  // If project not found, show default content
  if (!foundProject) {
    return (
      <>
        <Header1 fluid={"container-fluid"} />
        <Breadcrum content='Project Not Found' pageTitle={'Project'} pagename={'Project'} />
        <div className="container pt-120 mb-120">
          <h2>Project not found</h2>
          <Link href="/">Return to Home</Link>
        </div>
        <Home1FooterTop />
        <Footer1 />
      </>
    );
  }

  return (
    <>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum content={foundProject.name} pageTitle={'Project Details'} pagename={'Project'} />
      
      {/* Navigation Tabs */}
      <div className="project-navigation-tabs">
        <div className="container">
          <div className="nav-tabs-wrapper">
            <div className="nav-tabs-container">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(tab.id)}
                >
                  <img src={tab.icon} alt={tab.label} className="tab-icon" />
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="project-details-page pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5 mb-120">
            <div className="col-lg-8">
              {/* Main Project Image */}
              <div className="project-details-thumb mb-50">
                <img src={`${foundProject.mainImage}`} alt={foundProject.name} />
              </div>

              <div className="details-content-wrapper" id="overview">
                <h2>{foundProject.name}</h2>
                <span className="line-break" />
                <span className="line-break" />

                {/* Display all sections */}
                {foundProject.sections && foundProject.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="project-section-details mb-5">
                    <h3>{section.title}</h3>
                    <h4 className="project-subtitle mb-4">{section.subtitle}</h4>
                    <span className="line-break" />
                    <p>{section.description}</p>
                    <span className="line-break" />

                    {/* Section Image */}
                    {section.image && (
                      <div className="project-details-thumb mb-30">
                        <img src={`${section.image}`} alt={section.title} style={{ width: '100%' }} />
                      </div>
                    )}

                    {/* Section Categories */}
                    {section.categories && section.categories.length > 0 && (
                      <>
                        <h5>Categories</h5>
                        <ul className="mb-4">
                          {section.categories.map((category, catIndex) => (
                            <li key={catIndex}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15">
                                <path d="M0.376831 8.16821C-0.247095 8.54593 -0.0579659 9.49862 0.662688 9.60837C1.24211 9.69666 1.52052 10.3701 1.17304 10.8431C0.740845 11.4312 1.27942 12.2389 1.98713 12.0639C2.55609 11.9231 3.07065 12.4387 2.9302 13.0088C2.75556 13.718 3.56158 14.2577 4.14855 13.8246C4.62054 13.4764 5.29275 13.7554 5.38073 14.336C5.49024 15.0581 6.44099 15.2476 6.81798 14.6224C7.12107 14.1198 7.84864 14.1198 8.15171 14.6224C8.52867 15.2476 9.47943 15.0581 9.58896 14.336C9.67707 13.7554 10.3492 13.4764 10.8211 13.8246C11.4081 14.2577 12.2142 13.718 12.0395 13.0088C11.899 12.4387 12.4136 11.9231 12.9826 12.0639C13.6903 12.2389 14.2289 11.4312 13.7967 10.8431C13.4492 10.3701 13.7276 9.69653 14.307 9.60837C15.0276 9.49864 15.2168 8.54597 14.5929 8.16821C14.0912 7.86452 14.0912 7.13547 14.5929 6.83178C15.2168 6.45407 15.0277 5.50138 14.307 5.39162C13.7276 5.30334 13.4492 4.62989 13.7967 4.15695C14.2289 3.56879 13.6903 2.76112 12.9826 2.93613C12.4136 3.07687 11.8991 2.5613 12.0395 1.99115C12.2141 1.28199 11.4081 0.742345 10.8211 1.17541C10.3492 1.52356 9.67695 1.2446 9.58896 0.664029C9.47945 -0.0580599 8.5287 -0.247606 8.15171 0.377594C7.84863 0.880237 7.12106 0.880237 6.81798 0.377594C6.44103 -0.247596 5.49027 -0.0580833 5.38073 0.664029C5.29263 1.24462 4.62054 1.5236 4.14855 1.17541C3.56158 0.742345 2.75554 1.28201 2.9302 1.99115C3.07065 2.56126 2.55612 3.07686 1.98713 2.93613C1.2794 2.76113 0.740845 3.56879 1.17304 4.15695C1.52049 4.62989 1.24209 5.30346 0.662688 5.39162C-0.0579425 5.50136 -0.247105 6.45403 0.376831 6.83178C0.878459 7.13548 0.878459 7.86453 0.376831 8.16821Z" />
                              </svg>
                              {category}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <span className="line-break" />
                    <span className="line-break" />
                  </div>
                ))}

                <span className="line-break" />
                <h3>Key Features</h3>
                <span className="line-break" />
                <p>Discover the exceptional features that make {foundProject.name} a premier residential development in Sharjah.</p>
                <span className="line-break" />
                {foundProject.features && foundProject.features.length > 0 && (
                  <ul>
                    {foundProject.features.map((feature, index) => (
                      <li key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15">
                          <path d="M0.376831 8.16821C-0.247095 8.54593 -0.0579659 9.49862 0.662688 9.60837C1.24211 9.69666 1.52052 10.3701 1.17304 10.8431C0.740845 11.4312 1.27942 12.2389 1.98713 12.0639C2.55609 11.9231 3.07065 12.4387 2.9302 13.0088C2.75556 13.718 3.56158 14.2577 4.14855 13.8246C4.62054 13.4764 5.29275 13.7554 5.38073 14.336C5.49024 15.0581 6.44099 15.2476 6.81798 14.6224C7.12107 14.1198 7.84864 14.1198 8.15171 14.6224C8.52867 15.2476 9.47943 15.0581 9.58896 14.336C9.67707 13.7554 10.3492 13.4764 10.8211 13.8246C11.4081 14.2577 12.2142 13.718 12.0395 13.0088C11.899 12.4387 12.4136 11.9231 12.9826 12.0639C13.6903 12.2389 14.2289 11.4312 13.7967 10.8431C13.4492 10.3701 13.7276 9.69653 14.307 9.60837C15.0276 9.49864 15.2168 8.54597 14.5929 8.16821C14.0912 7.86452 14.0912 7.13547 14.5929 6.83178C15.2168 6.45407 15.0277 5.50138 14.307 5.39162C13.7276 5.30334 13.4492 4.62989 13.7967 4.15695C14.2289 3.56879 13.6903 2.76112 12.9826 2.93613C12.4136 3.07687 11.8991 2.5613 12.0395 1.99115C12.2141 1.28199 11.4081 0.742345 10.8211 1.17541C10.3492 1.52356 9.67695 1.2446 9.58896 0.664029C9.47945 -0.0580599 8.5287 -0.247606 8.15171 0.377594C7.84863 0.880237 7.12106 0.880237 6.81798 0.377594C6.44103 -0.247596 5.49027 -0.0580833 5.38073 0.664029C5.29263 1.24462 4.62054 1.5236 4.14855 1.17541C3.56158 0.742345 2.75554 1.28201 2.9302 1.99115C3.07065 2.56126 2.55612 3.07686 1.98713 2.93613C1.2794 2.76113 0.740845 3.56879 1.17304 4.15695C1.52049 4.62989 1.24209 5.30346 0.662688 5.39162C-0.0579425 5.50136 -0.247105 6.45403 0.376831 6.83178C0.878459 7.13548 0.878459 7.86453 0.376831 8.16821Z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="line-break" />
                <span className="line-break" />
              </div>

              {/* What's Nearby Section - Inside col-lg-8 */}

            </div>
            <div className="col-lg-4">
              <div className="project-details-sidebar">
                <div className="project-info-wrap mb-35">
                  <ul className="project-info">
                    <li>
                      <div className="icon">
                        <svg width={33} height={31} viewBox="0 0 33 31" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.0579 21.2802H4.74407V9.95283L16.0579 2.90563V21.2802ZM24.3018 31V20.9025H28.8373V31H29.9073V20.3253C29.9073 20.1726 29.851 20.0256 29.7505 19.9173C29.6501 19.8089 29.5139 19.7481 29.3723 19.7481H23.7668C23.6252 19.7481 23.489 19.8089 23.3886 19.9173C23.2889 20.0256 23.2326 20.1726 23.2326 20.3253V31H24.3018ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM1.0692 31V22.4338H20.7997V31H21.8696V21.8574C21.8696 21.7039 21.8133 21.5578 21.7129 21.4494C21.6124 21.341 21.4762 21.2802 21.3346 21.2802H17.1271V10.2468L31.9308 14.0187V31H33V13.5622C33 13.4325 32.9597 13.3061 32.8851 13.2042C32.8097 13.1024 32.7055 13.031 32.5883 13.0006L17.1271 9.06115V2.23974L18.9938 1.07712C19.1171 0.999935 19.2061 0.874313 19.2434 0.726521C19.2799 0.578729 19.2609 0.421085 19.1901 0.288893C19.1186 0.155881 19.0022 0.0598162 18.8652 0.019584C18.7282 -0.0198271 18.5821 0.000699533 18.4588 0.0770586L1.41926 10.6918C1.29674 10.7681 1.20695 10.8946 1.17042 11.0424C1.13389 11.1902 1.15291 11.3478 1.22369 11.48C1.29446 11.6122 1.41165 11.7091 1.54863 11.7485C1.68561 11.7887 1.83097 11.7674 1.95425 11.691L3.67487 10.6195V21.2802H0.534222C0.392676 21.2802 0.256457 21.341 0.156766 21.4494C0.056314 21.5578 0 21.7039 0 21.8574V31H1.0692Z" />
                        </svg>
                      </div>
                      <div className="content">
                        <span>Client:</span>
                        <h5>{foundProject.client}</h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <svg width={33} height={31} viewBox="0 0 33 31" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.0579 21.2802H4.74407V9.95283L16.0579 2.90563V21.2802ZM24.3018 31V20.9025H28.8373V31H29.9073V20.3253C29.9073 20.1726 29.851 20.0256 29.7505 19.9173C29.6501 19.8089 29.5139 19.7481 29.3723 19.7481H23.7668C23.6252 19.7481 23.489 19.8089 23.3886 19.9173C23.2889 20.0256 23.2326 20.1726 23.2326 20.3253V31H24.3018ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM1.0692 31V22.4338H20.7997V31H21.8696V21.8574C21.8696 21.7039 21.8133 21.5578 21.7129 21.4494C21.6124 21.341 21.4762 21.2802 21.3346 21.2802H17.1271V10.2468L31.9308 14.0187V31H33V13.5622C33 13.4325 32.9597 13.3061 32.8851 13.2042C32.8097 13.1024 32.7055 13.031 32.5883 13.0006L17.1271 9.06115V2.23974L18.9938 1.07712C19.1171 0.999935 19.2061 0.874313 19.2434 0.726521C19.2799 0.578729 19.2609 0.421085 19.1901 0.288893C19.1186 0.155881 19.0022 0.0598162 18.8652 0.019584C18.7282 -0.0198271 18.5821 0.000699533 18.4588 0.0770586L1.41926 10.6918C1.29674 10.7681 1.20695 10.8946 1.17042 11.0424C1.13389 11.1902 1.15291 11.3478 1.22369 11.48C1.29446 11.6122 1.41165 11.7091 1.54863 11.7485C1.68561 11.7887 1.83097 11.7674 1.95425 11.691L3.67487 10.6195V21.2802H0.534222C0.392676 21.2802 0.256457 21.341 0.156766 21.4494C0.056314 21.5578 0 21.7039 0 21.8574V31H1.0692Z" />
                        </svg>
                      </div>
                      <div className="content">
                        <span>Project:</span>
                        <h5>{foundProject.name}</h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <svg width={33} height={31} viewBox="0 0 33 31" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.0579 21.2802H4.74407V9.95283L16.0579 2.90563V21.2802ZM24.3018 31V20.9025H28.8373V31H29.9073V20.3253C29.9073 20.1726 29.851 20.0256 29.7505 19.9173C29.6501 19.8089 29.5139 19.7481 29.3723 19.7481H23.7668C23.6252 19.7481 23.489 19.8089 23.3886 19.9173C23.2889 20.0256 23.2326 20.1726 23.2326 20.3253V31H24.3018ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM1.0692 31V22.4338H20.7997V31H21.8696V21.8574C21.8696 21.7039 21.8133 21.5578 21.7129 21.4494C21.6124 21.341 21.4762 21.2802 21.3346 21.2802H17.1271V10.2468L31.9308 14.0187V31H33V13.5622C33 13.4325 32.9597 13.3061 32.8851 13.2042C32.8097 13.1024 32.7055 13.031 32.5883 13.0006L17.1271 9.06115V2.23974L18.9938 1.07712C19.1171 0.999935 19.2061 0.874313 19.2434 0.726521C19.2799 0.578729 19.2609 0.421085 19.1901 0.288893C19.1186 0.155881 19.0022 0.0598162 18.8652 0.019584C18.7282 -0.0198271 18.5821 0.000699533 18.4588 0.0770586L1.41926 10.6918C1.29674 10.7681 1.20695 10.8946 1.17042 11.0424C1.13389 11.1902 1.15291 11.3478 1.22369 11.48C1.29446 11.6122 1.41165 11.7091 1.54863 11.7485C1.68561 11.7887 1.83097 11.7674 1.95425 11.691L3.67487 10.6195V21.2802H0.534222C0.392676 21.2802 0.256457 21.341 0.156766 21.4494C0.056314 21.5578 0 21.7039 0 21.8574V31H1.0692Z" />
                        </svg>
                      </div>
                      <div className="content">
                        <span>Location:</span>
                        <h5>{foundProject.location}</h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <svg width={33} height={31} viewBox="0 0 33 31" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.0579 21.2802H4.74407V9.95283L16.0579 2.90563V21.2802ZM24.3018 31V20.9025H28.8373V31H29.9073V20.3253C29.9073 20.1726 29.851 20.0256 29.7505 19.9173C29.6501 19.8089 29.5139 19.7481 29.3723 19.7481H23.7668C23.6252 19.7481 23.489 19.8089 23.3886 19.9173C23.2889 20.0256 23.2326 20.1726 23.2326 20.3253V31H24.3018ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM1.0692 31V22.4338H20.7997V31H21.8696V21.8574C21.8696 21.7039 21.8133 21.5578 21.7129 21.4494C21.6124 21.341 21.4762 21.2802 21.3346 21.2802H17.1271V10.2468L31.9308 14.0187V31H33V13.5622C33 13.4325 32.9597 13.3061 32.8851 13.2042C32.8097 13.1024 32.7055 13.031 32.5883 13.0006L17.1271 9.06115V2.23974L18.9938 1.07712C19.1171 0.999935 19.2061 0.874313 19.2434 0.726521C19.2799 0.578729 19.2609 0.421085 19.1901 0.288893C19.1186 0.155881 19.0022 0.0598162 18.8652 0.019584C18.7282 -0.0198271 18.5821 0.000699533 18.4588 0.0770586L1.41926 10.6918C1.29674 10.7681 1.20695 10.8946 1.17042 11.0424C1.13389 11.1902 1.15291 11.3478 1.22369 11.48C1.29446 11.6122 1.41165 11.7091 1.54863 11.7485C1.68561 11.7887 1.83097 11.7674 1.95425 11.691L3.67487 10.6195V21.2802H0.534222C0.392676 21.2802 0.256457 21.341 0.156766 21.4494C0.056314 21.5578 0 21.7039 0 21.8574V31H1.0692Z" />
                        </svg>
                      </div>
                      <div className="content">
                        <span>Building Type:</span>
                        <h5>Residential Tower</h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <svg width={33} height={31} viewBox="0 0 33 31" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.0579 21.2802H4.74407V9.95283L16.0579 2.90563V21.2802ZM24.3018 31V20.9025H28.8373V31H29.9073V20.3253C29.9073 20.1726 29.851 20.0256 29.7505 19.9173C29.6501 19.8089 29.5139 19.7481 29.3723 19.7481H23.7668C23.6252 19.7481 23.489 19.8089 23.3886 19.9173C23.2889 20.0256 23.2326 20.1726 23.2326 20.3253V31H24.3018ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM1.0692 31V22.4338H20.7997V31H21.8696V21.8574C21.8696 21.7039 21.8133 21.5578 21.7129 21.4494C21.6124 21.341 21.4762 21.2802 21.3346 21.2802H17.1271V10.2468L31.9308 14.0187V31H33V13.5622C33 13.4325 32.9597 13.3061 32.8851 13.2042C32.8097 13.1024 32.7055 13.031 32.5883 13.0006L17.1271 9.06115V2.23974L18.9938 1.07712C19.1171 0.999935 19.2061 0.874313 19.2434 0.726521C19.2799 0.578729 19.2609 0.421085 19.1901 0.288893C19.1186 0.155881 19.0022 0.0598162 18.8652 0.019584C18.7282 -0.0198271 18.5821 0.000699533 18.4588 0.0770586L1.41926 10.6918C1.29674 10.7681 1.20695 10.8946 1.17042 11.0424C1.13389 11.1902 1.15291 11.3478 1.22369 11.48C1.29446 11.6122 1.41165 11.7091 1.54863 11.7485C1.68561 11.7887 1.83097 11.7674 1.95425 11.691L3.67487 10.6195V21.2802H0.534222C0.392676 21.2802 0.256457 21.341 0.156766 21.4494C0.056314 21.5578 0 21.7039 0 21.8574V31H1.0692Z" />
                        </svg>
                      </div>
                      <div className="content">
                        <span>Status:</span>
                        <h5>{foundProject.status} ({foundProject.year})</h5>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <svg width={33} height={31} viewBox="0 0 33 31" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.0579 21.2802H4.74407V9.95283L16.0579 2.90563V21.2802ZM24.3018 31V20.9025H28.8373V31H29.9073V20.3253C29.9073 20.1726 29.851 20.0256 29.7505 19.9173C29.6501 19.8089 29.5139 19.7481 29.3723 19.7481H23.7668C23.6252 19.7481 23.489 19.8089 23.3886 19.9173C23.2889 20.0256 23.2326 20.1726 23.2326 20.3253V31H24.3018ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM4.72961 31V26.1754H8.87098V31H9.94094V25.5982C9.94094 25.4447 9.88463 25.2985 9.78418 25.1901C9.68372 25.0818 9.5475 25.021 9.40596 25.021H4.19539C4.05309 25.021 3.91687 25.0818 3.81718 25.1901C3.71672 25.2985 3.66041 25.4447 3.66041 25.5982V31H4.72961ZM1.0692 31V22.4338H20.7997V31H21.8696V21.8574C21.8696 21.7039 21.8133 21.5578 21.7129 21.4494C21.6124 21.341 21.4762 21.2802 21.3346 21.2802H17.1271V10.2468L31.9308 14.0187V31H33V13.5622C33 13.4325 32.9597 13.3061 32.8851 13.2042C32.8097 13.1024 32.7055 13.031 32.5883 13.0006L17.1271 9.06115V2.23974L18.9938 1.07712C19.1171 0.999935 19.2061 0.874313 19.2434 0.726521C19.2799 0.578729 19.2609 0.421085 19.1901 0.288893C19.1186 0.155881 19.0022 0.0598162 18.8652 0.019584C18.7282 -0.0198271 18.5821 0.000699533 18.4588 0.0770586L1.41926 10.6918C1.29674 10.7681 1.20695 10.8946 1.17042 11.0424C1.13389 11.1902 1.15291 11.3478 1.22369 11.48C1.29446 11.6122 1.41165 11.7091 1.54863 11.7485C1.68561 11.7887 1.83097 11.7674 1.95425 11.691L3.67487 10.6195V21.2802H0.534222C0.392676 21.2802 0.256457 21.341 0.156766 21.4494C0.056314 21.5578 0 21.7039 0 21.8574V31H1.0692Z" />
                        </svg>
                      </div>
                      <div className="content">
                        <span>Specifications:</span>
                        <h5>{foundProject.floors} Floors, {foundProject.units} Units</h5>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="sidebar-banner">
                  <img src="/assets/img/inner-pages/project-sidebar-banner-img.jpg" alt="" />
                  <div className="banner-content-wrap">
                    <div className="banner-content">
                      <h2>Ready to <span>Get Your Dream Home?</span></h2>
                      <Link href="/contact" className="primary-btn2 white-bg">
                        <span>
                          Get a quote
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floor Plans and Layouts Section - Full Width */}
          <div className="row g-lg-4 gy-5 mt-5">
            {/* Left: SketchSection */}
            <div className="col-lg-6">
              <SketchSection
                externalActiveIndex={activeLayoutIndex}
                onLayoutChange={setActiveLayoutIndex}
                layouts={foundProject.layouts || []}
              />
            </div>

            {/* Right: Available Unit Layouts */}
            <div className="col-lg-6">
              {foundProject.layouts && foundProject.layouts.length > 0 && (
                <div className="layouts-section" id="layouts">
                  <h3>Available Unit Layouts</h3>
                  <span className="line-break" />
                  <p className="mb-4">Choose from our carefully designed layouts for your perfect home.</p>

                  <div className="layouts-grid">
                    {foundProject.layouts.map((layout, layoutIndex) => (
                      <div
                        key={layoutIndex}
                        className="layout-card mb-3 p-3 rounded"
                        onMouseEnter={() => setActiveLayoutIndex(layoutIndex + 1)}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: activeLayoutIndex === layoutIndex + 1
                            ? '2px solid var(--primary-color2)'
                            : '1px solid rgba(var(--primary-color-opc), 0.1)',
                          boxShadow: activeLayoutIndex === layoutIndex + 1
                            ? '0 4px 12px rgba(var(--primary-color2-opc), 0.15)'
                            : 'none',
                          transform: activeLayoutIndex === layoutIndex + 1 ? 'translateY(-2px)' : 'translateY(0)'
                        }}
                      >
                        <div className="d-flex gap-3 align-items-center">
                          {layout.image && (
                            <div className="layout-image flex-shrink-0" style={{ width: '90px', height: '90px' }}>
                              <img src={`${layout.image}`} alt={layout.name} className="w-100 h-100 rounded" style={{ objectFit: 'cover' }} />
                            </div>
                          )}
                          <div className="flex-grow-1">
                            <h5 className="mb-2">{layout.name}</h5>
                            <div className="layout-specs">
                              <div className="d-flex flex-wrap gap-2 mb-2">
                                <span><strong>{layout.area}</strong></span>
                                <span>{layout.bedrooms} Bed</span>
                                <span>{layout.bathrooms} Bath</span>
                              </div>
                            </div>
                            {layout.features && layout.features.length > 0 && (
                              <div className="layout-features small">
                                <ul className="mb-0 ps-3">
                                  {layout.features.slice(0, 2).map((feature, featureIdx) => (
                                    <li key={featureIdx} style={{ fontSize: '13px' }}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          {layout.price && (
                            <div className="layout-price flex-shrink-0 text-end">
                              <strong className="d-block" style={{ fontSize: '15px', whiteSpace: 'nowrap', color: 'var(--primary-color2)' }}>{layout.price}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Location Map - Full Width */}
          {foundProject.locationMap && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="location-map-section" id="location">
                  <h3 className="mb-4">Location Map</h3>
                  <div className="location-map-wrapper">
                    <img
                      src={`${foundProject.locationMap}`}
                      alt={`${foundProject.name} Location Map`}
                      className="w-100 rounded shadow-sm"
                      style={{
                        objectFit: 'cover',
                        maxHeight: '600px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* What's Nearby Section */}
          {foundProject.nearby && foundProject.nearby.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="property-details-page" id="nearby">
                  <WhatsNearby
                    title="What's Nearby"
                    description="Discover the convenience of Al Faisal Tower's prime location with easy access to Sharjah's key destinations and amenities."
                    places={foundProject.nearby}
                  />
                </div>
              </div>
            </div>
          )}



          {/* Property Attachment Section */}
          {foundProject.attachments && foundProject.attachments.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="property-details-page" id="documents">
                  <div className="property-details-content-wrap">
                    <PropertyAttachment
                      title="Project Documents"
                      description="Download our comprehensive project brochure, floor plans, and payment plan details."
                      attachments={foundProject.attachments}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Gallery - Full Width */}
          {foundProject.gallery && foundProject.gallery.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="project-gallery-section" id="gallery">
                  <h3 className="mb-4">Project Gallery</h3>
                  <p className="mb-5">Explore stunning visuals of Al Faisal Tower showcasing architecture, interiors, amenities, and more.</p>

                  <div className="row g-4">
                    {foundProject.gallery.map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-6">
                        <a
                          href={`/${item.image}`}
                          data-fancybox="gallery"
                          data-caption={`${item.category} - ${item.title}`}
                          className="gallery-item position-relative overflow-hidden rounded d-block"
                          style={{
                            height: '300px',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <img
                            src={`${item.image}`}
                            alt={item.title}
                            className="w-100 h-100"
                            style={{
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          />
                          <div
                            className="gallery-overlay position-absolute w-100 h-100 top-0 start-0 d-flex flex-column justify-content-end p-4"
                            style={{
                              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                              pointerEvents: 'none'
                            }}
                          >
                            {item.category && (
                              <span
                                className="badge mb-2"
                                style={{
                                  backgroundColor: 'var(--primary-color2)',
                                  fontSize: '12px',
                                  width: 'fit-content'
                                }}
                              >
                                {item.category}
                              </span>
                            )}
                            <h5 className="text-white mb-0">{item.title}</h5>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>




      <Home1FooterTop />
      <Footer1 />
    </>
  )
}

export default ProjectDetailsClient

