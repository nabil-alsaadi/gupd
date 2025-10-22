import React from 'react'
import companyData from '../../data/companyData.json'

const SocialMedia = ({ className = "social-list", showLabels = true }) => {
  const socialMedia = companyData.socialMedia

  return (
    <ul className={className}>
      {Object.entries(socialMedia).map(([platform, data]) => (
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
