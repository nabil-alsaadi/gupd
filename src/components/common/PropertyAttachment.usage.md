# PropertyAttachment Component - Usage Guide

A reusable React component to display downloadable attachments like brochures, floor plans, payment plans, etc. This component maintains the same styling from the property details page and can be used anywhere in your application.

## Installation

The component is located at: `src/components/common/PropertyAttachment.jsx`

## Import

```jsx
import PropertyAttachment from '@/components/common/PropertyAttachment'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Property Attachment" | Section heading title |
| `description` | string | null | Optional description text below title |
| `attachments` | array | Default attachments | Array of attachment files (see structure below) |
| `className` | string | "" | Additional CSS classes |

### Attachments Array Structure

```javascript
[
  {
    name: "Document Name",           // Required: Display name of the document
    type: "Pdf",                     // Required: File type (e.g., "Pdf", "Doc", "Excel")
    icon: "path/to/icon.svg",       // Required: Path to icon image
    file: "path/to/file.pdf"        // Required: Path to downloadable file
  }
]
```

## Usage Examples

### Basic Usage (with default attachments)

```jsx
<PropertyAttachment />
```

### With Custom Title

```jsx
<PropertyAttachment 
  title="Project Documents"
/>
```

### With Title and Description

```jsx
<PropertyAttachment 
  title="Project Documents"
  description="Download our comprehensive project materials"
/>
```

### With Custom Attachments

```jsx
const documents = [
  {
    name: "Project Brochure",
    type: "Pdf",
    icon: "assets/img/inner-pages/icon/pdf-icon.svg",
    file: "assets/brochure.pdf"
  },
  {
    name: "Floor Plans",
    type: "Pdf",
    icon: "assets/img/inner-pages/icon/pdf-icon.svg",
    file: "assets/floor-plans.pdf"
  }
];

<PropertyAttachment 
  title="Download Documents"
  attachments={documents}
/>
```

### With All Props

```jsx
const projectDocs = [
  {
    name: "Project Brochure",
    type: "Pdf",
    icon: "assets/img/inner-pages/icon/pdf-icon.svg",
    file: "assets/project-brochure.pdf"
  },
  {
    name: "Floor Plans",
    type: "Pdf",
    icon: "assets/img/inner-pages/icon/pdf-icon.svg",
    file: "assets/floor-plans.pdf"
  },
  {
    name: "Payment Plan",
    type: "Pdf",
    icon: "assets/img/inner-pages/icon/pdf-icon.svg",
    file: "assets/payment-plan.pdf"
  }
];

<PropertyAttachment 
  title="Project Documents"
  description="Download comprehensive details about this project"
  attachments={projectDocs}
  className="my-custom-class"
/>
```

### From JSON Data

```jsx
import projectData from '@/data/project-section-data.json'

const project = projectData.projects[0];

{project.attachments && project.attachments.length > 0 && (
  <PropertyAttachment 
    title="Project Documents"
    description="Download our comprehensive project materials"
    attachments={project.attachments}
  />
)}
```

### With Property Details Page Wrapper

```jsx
<div className="property-details-page">
  <div className="property-details-content-wrap">
    <PropertyAttachment 
      title="Project Documents"
      attachments={attachments}
    />
  </div>
</div>
```

### In a Container

```jsx
<div className="container">
  <div className="row">
    <div className="col-12">
      <PropertyAttachment 
        title="Download Documents"
        attachments={documents}
      />
    </div>
  </div>
</div>
```

## Default Attachments

If no attachments are provided, the component will display these default items:

- License (Pdf)
- Information (Pdf)

## File Types

Common file type values:
- "Pdf" - PDF documents
- "Doc" - Word documents
- "Excel" - Excel spreadsheets
- "Zip" - Compressed files
- "Image" - Image files

## Icon Paths

Default icon location: `assets/img/inner-pages/icon/pdf-icon.svg`

You can use different icons for different file types.

## Styling

The component uses the following CSS classes:
- `.attachment-area` - Main container
- `.attachment-list` - List container
- `.single-attachment` - Individual attachment item
- `.icon` - Icon container
- `.content` - Content area with name and type

These classes are already styled in the project's CSS files and won't affect other components.

## Features

- ✅ Clickable download links
- ✅ Automatic filename extraction for download attribute
- ✅ Icon support for visual file type identification
- ✅ Responsive design
- ✅ Fully self-contained with no external dependencies
- ✅ Safe to use multiple instances on the same page

## Notes

- The download attribute automatically extracts the filename from the file path
- All file paths are automatically prefixed with "/"
- Icons should be in SVG format for best quality
- The component is fully accessible with proper semantic HTML

