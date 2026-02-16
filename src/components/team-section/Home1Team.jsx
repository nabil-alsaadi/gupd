"use client"
import React from "react";
import { useLanguage } from "@/providers/LanguageProvider";

const Home1Team = ({ teamData }) => {
    const { locale } = useLanguage();
    const isRTL = locale === "ar";
    
    // Only use database data, no fallbacks - check after all hooks
    const sectionTitle = teamData?.sectionTitle || {};
    const founder = teamData?.founder || null;
    const members = Array.isArray(teamData?.members) && teamData.members.length > 0
        ? teamData.members
        : [];
    
    // Flip animation classes for RTL
    const leftAnimation = isRTL ? "fadeInRight" : "fadeInLeft";
    const rightAnimation = isRTL ? "fadeInLeft" : "fadeInRight";
    
    return (
        <div className="home1-team-section mb-130">
        <div className="container">
          <div className="row gy-5 align-items-center justify-content-between mb-70">
            <div className={`col-lg-4 wow animate ${leftAnimation}`} data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title">
                <span>{isRTL && sectionTitle?.taglineArabic ? sectionTitle.taglineArabic : sectionTitle?.tagline}</span>
                <h2>{isRTL && sectionTitle?.titleArabic ? sectionTitle.titleArabic : sectionTitle?.title}</h2>
              </div>
            </div>
            <div className={`col-xxl-7 col-lg-8 wow animate ${rightAnimation}`} data-wow-delay="200ms" data-wow-duration="1500ms">
              {founder && (
              <div className="founder-card">
                <div className="founder-img">
                    <img src={founder.image} alt={founder.name || "Founder"} />
                </div>
                <div className="founder-content">
                    <p>"{isRTL && founder.quoteArabic ? founder.quoteArabic : founder.quote}".</p>
                  <div className="name-and-desig">
                      <span>{isRTL && founder.positionArabic ? founder.positionArabic : founder.position}</span>
                      <h5>{isRTL && founder.nameArabic ? founder.nameArabic : founder.name}</h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            .home1-team-section .team-grid {
              display: flex;
              flex-wrap: wrap;
              margin: -15px;
            }
            .home1-team-section .team-grid-item {
              padding: 15px;
              flex: 0 0 100%;
              max-width: 100%;
            }
            @media (min-width: 576px) {
              .home1-team-section .team-grid-item {
                flex: 0 0 50%;
                max-width: 50%;
              }
            }
            @media (min-width: 768px) {
              .home1-team-section .team-grid-item {
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              }
            }
            @media (min-width: 992px) {
              .home1-team-section .team-grid-item {
                flex: 0 0 20%;
                max-width: 20%;
              }
            }
          `}} />
          <div className="team-grid">
            {members.map((member, index) => (
              <div 
                key={member.id || index} 
                className="team-grid-item"
              >
                <div className="team-card" style={{ height: '100%' }}>
                  <div className="team-img" style={{ height: '300px', overflow: 'hidden' }}>
                    <img 
                      src={member.image} 
                      alt={member.name || "Team member"} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="team-content">
                    <span>{isRTL && member.positionArabic ? member.positionArabic : member.position}</span>
                    <h5>{isRTL && member.nameArabic ? member.nameArabic : member.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    )
}

export default Home1Team