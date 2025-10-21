import React from 'react'

/**
 * WhatsNearby Component
 * 
 * A reusable component to display nearby places/amenities with distances
 * 
 * @param {Object} props
 * @param {string} props.title - Section title (default: "What's Nearby")
 * @param {string} props.description - Optional description text
 * @param {Array} props.places - Array of nearby places
 * @param {string} props.places[].name - Name of the place
 * @param {string} props.places[].distance - Distance to the place (e.g., "50m", "2km")
 * @param {string} props.className - Additional CSS classes
 */

const WhatsNearby = ({ 
  title = "What's Nearby", 
  description = null,
  places = [],
  className = ""
}) => {
  // Default places if none provided
  const defaultPlaces = [
    { name: "School", distance: "50m" },
    { name: "Bus Station", distance: "90m" },
    { name: "Hospital", distance: "40m" },
    { name: "Airport", distance: "125m" },
    { name: "Market", distance: "60m" },
    { name: "Railway Station", distance: "118m" },
    { name: "Gym, Wellness", distance: "70m" },
    { name: "Beauty Center", distance: "80m" }
  ];

  const displayPlaces = places.length > 0 ? places : defaultPlaces;

  return (
    <div className={`property-details-content-wrap ${className}`}>
      <div className="nearby-table-area mb-70">
        <h2>{title}</h2>
        {description && <p className="mb-4">{description}</p>}
        <div className="property-details-table">
          <div className="row g-0">
            {displayPlaces.map((place, index) => (
              <div key={index} className="col-md-6">
                <div className="single-item">
                  <div className="title">
                    <h6>{place.name}</h6>
                  </div>
                  <svg width={43} height={6} viewBox="0 0 43 6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM43 3L38 0.113249V5.88675L43 3ZM3 3.5H38.5V2.5H3V3.5Z" />
                  </svg>
                  <span>{place.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatsNearby

