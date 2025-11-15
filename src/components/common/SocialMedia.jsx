"use client";
import React, { useEffect, useState } from 'react'
import companyData from '@/data/companyData.json'
import { useFirestore } from '@/hooks/useFirebase'

const SocialMedia = ({ className = "social-list", showLabels = true, socialMediaData = null }) => {
  const { data: contactDocs, fetchData } = useFirestore('contact');
  const [socialMedia, setSocialMedia] = useState(() => {
    // Use provided socialMediaData if available
    if (socialMediaData) {
      return socialMediaData;
    }
    // Fallback to static data
    return companyData.socialMedia || {};
  });

  useEffect(() => {
    // If socialMediaData is provided as prop, use it (server-side rendered)
    if (socialMediaData) {
      setSocialMedia(socialMediaData);
      return;
    }
    
    // Otherwise, fetch from Firebase on client side
    fetchData().catch(() => null);
  }, [socialMediaData, fetchData]);

  useEffect(() => {
    // Update social media when Firebase data loads (only if no socialMediaData prop)
    if (!socialMediaData && contactDocs && contactDocs.length > 0) {
      const doc = contactDocs[0];
      setSocialMedia(doc.socialMedia || companyData.socialMedia || {});
    }
  }, [contactDocs, socialMediaData]);

  // Filter out platforms without URLs
  const platformsWithUrls = Object.entries(socialMedia).filter(([platform, data]) => {
    return data && data.url && data.url.trim() !== '';
  });

  if (platformsWithUrls.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {platformsWithUrls.map(([platform, data]) => (
        <li key={platform}>
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            <i className={data.icon} />
            {showLabels && <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialMedia
