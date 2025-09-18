import AboutSection from '@/components/interior/AboutSection'
import AwardSection from '@/components/interior/AwardSection'
import BannerSection from '@/components/interior/BannerSection'
import BlogSection from '@/components/interior/BlogSection'
import FaqSection from '@/components/interior/FaqSection'
import Footer from '@/components/interior/Footer'
import Header from '@/components/interior/Header'
import ProjectSection from '@/components/interior/ProjectSection'
import ServiceSection from '@/components/interior/ServiceSection'
import TeamSection from '@/components/interior/TeamSection'
import TestimonialSection from '@/components/interior/TestimonialSection'
import Link from 'next/link'
import React from 'react'

const InteriorPage = () => {
  return (
    <div>

      <Header />
      <BannerSection />
      <ProjectSection />
      <ServiceSection />
      <AboutSection />
      <FaqSection />
      <TeamSection />
      <AwardSection />
      <BlogSection />
      <TestimonialSection />
      <Footer />
    </div>

  )
}

export default InteriorPage