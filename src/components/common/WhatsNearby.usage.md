# WhatsNearby Component - Usage Guide

A reusable React component to display nearby places/amenities with distances. This component maintains the same styling from the property details page and can be used anywhere in your application.

## Installation

The component is located at: `src/components/common/WhatsNearby.jsx`

## Import

```jsx
import WhatsNearby from '@/components/common/WhatsNearby'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "What's Nearby" | Section heading title |
| `description` | string | null | Optional description text below title |
| `places` | array | Default places | Array of nearby places (see structure below) |
| `className` | string | "" | Additional CSS classes |

### Places Array Structure

```javascript
[
  {
    name: "Place Name",      // Required: Name of the location
    distance: "50m"          // Required: Distance (e.g., "50m", "2km", "5 min walk")
  }
]
```

## Usage Examples

### Basic Usage (with default places)

```jsx
<WhatsNearby />
```

### With Custom Title

```jsx
<WhatsNearby 
  title="Nearby Amenities"
/>
```

### With Title and Description

```jsx
<WhatsNearby 
  title="What's Nearby"
  description="Discover the convenience of prime location with easy access to key destinations."
/>
```

### With Custom Places

```jsx
const nearbyPlaces = [
  { name: "School", distance: "50m" },
  { name: "Hospital", distance: "2km" },
  { name: "Shopping Mall", distance: "1.5km" },
  { name: "Metro Station", distance: "500m" }
];

<WhatsNearby 
  title="What's Nearby"
  places={nearbyPlaces}
/>
```

### With All Props

```jsx
const nearbyPlaces = [
  { name: "Khalid Lagoon", distance: "5 min walk" },
  { name: "City Centre", distance: "3.5 km" },
  { name: "Airport", distance: "8 km" }
];

<WhatsNearby 
  title="Nearby Locations"
  description="Easy access to major landmarks and amenities"
  places={nearbyPlaces}
  className="my-custom-class"
/>
```

### From JSON Data

```jsx
import projectData from '@/data/project-section-data.json'

const project = projectData.projects[0];

{project.nearby && project.nearby.length > 0 && (
  <WhatsNearby 
    title="What's Nearby"
    description="Discover nearby amenities and landmarks"
    places={project.nearby}
  />
)}
```

### In a Container

```jsx
<div className="container">
  <div className="row">
    <div className="col-12">
      <WhatsNearby 
        title="What's Nearby"
        places={nearbyPlaces}
      />
    </div>
  </div>
</div>
```

## Default Places

If no places are provided, the component will display these default places:

- School - 50m
- Bus Station - 90m
- Hospital - 40m
- Airport - 125m
- Market - 60m
- Railway Station - 118m
- Gym, Wellness - 70m
- Beauty Center - 80m

## Styling

The component uses the following CSS classes:
- `.nearby-table-area` - Main container
- `.mb-70` - Bottom margin
- `.property-details-table` - Table container
- `.single-item` - Individual place item

These classes are already styled in the project's CSS files and won't affect other components.

## Notes

- The component automatically handles responsive layout (2 columns on desktop, 1 column on mobile)
- SVG arrows are included in each item
- The component is fully self-contained with no external dependencies
- All styling is scoped to the component's classes
- Safe to use multiple instances on the same page

