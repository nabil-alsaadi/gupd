import React from 'react'

/**
 * PropertyAttachment Component
 * 
 * A reusable component to display downloadable attachments like brochures, floor plans, etc.
 * 
 * @param {Object} props
 * @param {string} props.title - Section title (default: "Property Attachment")
 * @param {string} props.description - Optional description text
 * @param {Array} props.attachments - Array of attachment files
 * @param {string} props.attachments[].name - Name of the attachment
 * @param {string} props.attachments[].type - File type (e.g., "Pdf", "Doc")
 * @param {string} props.attachments[].icon - Path to icon image
 * @param {string} props.attachments[].file - Path to downloadable file
 * @param {string} props.className - Additional CSS classes
 */

const PropertyAttachment = ({ 
  title = "Property Attachment", 
  description = null,
  attachments = [],
  className = ""
}) => {
  // Default attachments if none provided
  const defaultAttachments = [
    {
      name: "License",
      type: "Pdf",
      icon: "assets/img/inner-pages/icon/pdf-icon.svg",
      file: "assets/property_details.pdf"
    },
    {
      name: "Information",
      type: "Pdf",
      icon: "assets/img/inner-pages/icon/pdf-icon.svg",
      file: "assets/property_details.pdf"
    }
  ];

  const displayAttachments = attachments.length > 0 ? attachments : defaultAttachments;

  return (
    <div className={`attachment-area ${className}`}>
      <h2>{title}</h2>
      {description && <p className="mb-4">{description}</p>}
      <ul className="attachment-list">
        {displayAttachments.map((attachment, index) => (
          <li key={index} className="single-attachment">
            <a href={`/${attachment.file}`} download={attachment.file.split('/').pop()}>
              <div className="icon">
                <img src={`/${attachment.icon}`} alt={attachment.type} />
              </div>
              <div className="content">
                <h6>{attachment.name}</h6>
                <span>{attachment.type}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PropertyAttachment

