import React from 'react'
import Header1 from '@/components/header/Header1'
import Breadcrum from '@/components/common/Breadcrum'
 
import Home1FooterTop from '@/components/Footer/Home1FooterTop';
import { getTeam } from '@/lib/getTeam';
import staticTeamData from '@/data/team-data.json';
import Footer1 from '@/components/Footer/Footer1';

export const metadata = {
  icons: {
    icon: "/assets/img/fav-icon.svg",
  },
};

const TeamPage = async () => {
  // Fetch team data from Firebase
  const teamData = await getTeam();
  
  // Use teamData from Firebase, fall back to static data
  const members = Array.isArray(teamData?.members) && teamData.members.length > 0
    ? teamData.members
    : staticTeamData.team.members;

  // Calculate delay for animation based on index
  const getDelay = (index) => {
    const delays = ['200ms', '400ms', '600ms', '800ms'];
    return delays[index % delays.length];
  };

  return (
    <>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum content={"Creative Team With Us"} pageTitle={'Our Team'} pagename={'Team'} />
      <div className="team-page pt-120 mb-120">
        <div className="container">
          <div className="row gy-5 mb-70">
            {members.map((member, index) => (
              <div 
                key={member.id || index} 
                className="col-xl-3 col-md-4 col-sm-6 wow animate fadeInDown" 
                data-wow-delay={getDelay(index)} 
                data-wow-duration="1500ms"
              >
                <div className="team-card magnetic-item">
                  <div className="team-img">
                    <img src={member.image} alt={member.name || "Team member"} />
                  </div>
                  <div className="team-content">
                    <span>{member.position}</span>
                    <h5>{member.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <a href="#" className="primary-btn2 bounce_up">
                <span>
                  Load More
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Home1FooterTop />
      <Footer1 />
    </>
  )
}

export default TeamPage