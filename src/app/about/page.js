"use client"
import Breadcrum from '@/components/common/Breadcrum'

import Header1 from '@/components/header/Header1'
import { useTranslation } from 'react-i18next'
import Footer1 from '@/components/Footer/Footer1'
import Link from 'next/link'
import useModalVideo from '@/utils/useModalVideo'
import Home1Testimonial from '@/components/testimonial/Home1Testimonial'
import React, { useMemo, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Home1About from '@/components/about/Home1About'
import Home1Support from '@/components/supports/Home1Support'
import Home1Banner2 from '@/components/banner/Home1Banner2'
import Home1Team from '@/components/team-section/Home1Team'
import ChairmanMessage from '@/components/chairman/ChairmanMessage'
import FAQSection from '@/components/faq/FAQSection'
import Spacer from '@/components/common/Spacer'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'
import ProcessSection from '@/components/architecture/ProcessSection'
import { getDocuments } from '@/utils/firestore'
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
const AboutPage = () => {
  const { t } = useTranslation();
  const [aboutData, setAboutData] = useState(null);
  const [teamDataState, setTeamDataState] = useState(null);
  const [contactContent, setContactContent] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutDocs = await getDocuments('about');
        
        if (!aboutDocs || aboutDocs.length === 0) {
          setAboutData(null);
          return;
        }

        const doc = aboutDocs[0];

        setAboutData({
          title: doc.title || '',
          titleArabic: doc.titleArabic || '',
          subtitle: doc.subtitle || '',
          subtitleArabic: doc.subtitleArabic || '',
          videoDescription: doc.videoDescription || '',
          videoDescriptionArabic: doc.videoDescriptionArabic || '',
          image: doc.image || '',
          sections:
            Array.isArray(doc.sections) && doc.sections.length > 0
              ? doc.sections.map(section => ({
                  title: section.title || '',
                  titleArabic: section.titleArabic || '',
                  text: section.text || '',
                  textArabic: section.textArabic || ''
                }))
              : []
        });
      } catch (error) {
        console.error('Error fetching about from Firestore:', error);
        setAboutData(null);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamDocs = await getDocuments('team');
        
        if (!teamDocs || teamDocs.length === 0) {
          setTeamDataState(null);
          return;
        }

        const teamDoc = teamDocs[0];
        
        setTeamDataState({
          sectionTitle: teamDoc?.sectionTitle || {},
          founder: teamDoc?.founder || null,
          members: Array.isArray(teamDoc?.members) && teamDoc.members.length > 0
            ? teamDoc.members
            : [],
          chairmanMessage: teamDoc?.chairmanMessage || null
        });
      } catch (error) {
        console.error('Error fetching team from Firestore:', error);
        setTeamDataState(null);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const contactDocs = await getDocuments('contact');
        
        if (!contactDocs || contactDocs.length === 0) {
          setContactContent(null);
          return;
        }

        const doc = contactDocs[0];
        
        if (doc.supportContent) {
          setContactContent(doc.supportContent);
        } else {
          setContactContent(null);
        }
      } catch (error) {
        console.error('Error fetching contact content from Firestore:', error);
        setContactContent(null);
      }
    };

    fetchContactContent();
  }, []);

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".team-slider-next",
        prevEl: ".team-slider-prev",
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    };
  }, []);
  const { openModal, Modal } = useModalVideo();
  return (
    <div>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum content={t('about.breadcrumbContent')} pageTitle={t('about.pageTitle')} pagename={t('about.pageTitle')} />
      <div className="home1-about-section pt-130 mb-130">
        <div className="container">
          {aboutData && <Home1About aboutData={aboutData} />}
        </div>
      </div>
     
      {/* <Spacer size="xl" /> */}
      
      <ChairmanMessage chairmanMessage={teamDataState?.chairmanMessage} />
      {teamDataState && <Home1Team teamData={teamDataState} />}
      <Home1Support contactContent={contactContent} />
      <ProcessSection />
      {/* <Home1Testimonial /> */}

      {/* <FAQSection /> */}
      <Home1FooterTop />
      <Footer1 />
    </div>
  )
}

export default AboutPage    