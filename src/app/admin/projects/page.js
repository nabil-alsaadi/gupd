"use client";
import { useState, useEffect } from 'react';
import { useFirestore, useStorage } from '@/hooks/useFirebase';
import { slugify } from '@/utils/slugify';
import defaultProjectData from '@/data/project-section-data.json';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  X,
  Save,
  Loader2,
  Building2,
  MapPin,
  FileText,
  Image as GalleryIcon,
  Settings,
  Info
} from 'lucide-react';
import TranslateButton from '@/components/admin/TranslateButton';

export default function AdminProjectsPage() {
  const { data: projectsData, loading, error, fetchData, add, update, remove } = useFirestore('projects');
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // basic, sections, features, layouts, nearby, attachments, gallery, sectionTitle
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    nameArabic: '',
    slug: '',
    client: '',
    clientArabic: '',
    status: 'Completed',
    year: '',
    floors: '',
    units: '',
    location: '',
    locationArabic: '',
    mainImage: '',
    locationMap: ''
  });
  
  const [sectionTitle, setSectionTitle] = useState({
    span: '',
    spanArabic: '',
    heading: '',
    headingArabic: '',
    description: '',
    descriptionArabic: ''
  });
  
  const [sections, setSections] = useState([]);
  const [features, setFeatures] = useState([]);
  const [layouts, setLayouts] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [gallery, setGallery] = useState([]);
  
  // Image/file states
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [locationMapFile, setLocationMapFile] = useState(null);
  const [locationMapPreview, setLocationMapPreview] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newNearbyName, setNewNearbyName] = useState('');
  const [newNearbyDistance, setNewNearbyDistance] = useState('');

  useEffect(() => {
    // Force re-fetch to ensure we have the correct document IDs
    fetchData().then(() => {
      console.log('Projects fetched:', projectsData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDefaultProject = () => {
    if (!defaultProjectData || !defaultProjectData.projects || defaultProjectData.projects.length === 0) {
      alert('Default data not available. Please check the JSON file.');
      return;
    }
    
    const defaultProject = defaultProjectData.projects[0];
    const defaultSectionTitle = defaultProjectData.sectionTitle || {};
    
    setFormData({
      id: null,
      name: defaultProject.name || '',
      slug: defaultProject.slug || '',
      client: defaultProject.client || '',
      status: defaultProject.status || 'Completed',
      year: defaultProject.year || '',
      floors: defaultProject.floors || '',
      units: defaultProject.units || '',
      location: defaultProject.location || '',
      mainImage: defaultProject.mainImage || '',
      locationMap: defaultProject.locationMap || ''
    });
    
    setSectionTitle({
      span: defaultSectionTitle.span || '',
      heading: defaultSectionTitle.heading || '',
      description: defaultSectionTitle.description || ''
    });
    
    setSections(defaultProject.sections || []);
    setFeatures(defaultProject.features || []);
    setLayouts(defaultProject.layouts || []);
    setNearby(defaultProject.nearby || []);
    setAttachments(defaultProject.attachments || []);
    setGallery(defaultProject.gallery || []);
    
    setMainImagePreview(defaultProject.mainImage || '');
    setLocationMapPreview(defaultProject.locationMap || '');
    
    setShowForm(true);
    setEditingProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from name
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: slugify(value)
      }));
    }
  };

  const handleSectionTitleChange = (e) => {
    const { name, value } = e.target;
    setSectionTitle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationMapChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocationMapFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocationMapPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sections management
  const addSection = () => {
    setSections([...sections, {
      image: '',
      title: '',
      titleArabic: '',
      subtitle: '',
      subtitleArabic: '',
      description: '',
      descriptionArabic: '',
      categories: [],
      categoriesArabic: [],
      buttonText: '',
      buttonTextArabic: ''
    }]);
  };

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    if (field === 'categories') {
      // Handle both English comma (,) and Arabic comma (،)
      updated[index].categories = value.split(/[,،]/).map(c => c.trim()).filter(Boolean);
    } else if (field === 'categoriesArabic') {
      // Handle both English comma (,) and Arabic comma (،)
      updated[index].categoriesArabic = value.split(/[,،]/).map(c => c.trim()).filter(Boolean);
    } else {
      updated[index][field] = value;
    }
    setSections(updated);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'images/projects/');
        updateSection(index, 'image', url);
      } catch (err) {
        alert('Failed to upload image: ' + err.message);
      }
    }
  };

  // Features management
  const addFeature = () => {
    if (newFeature.trim()) {
      // Convert to object format if it's a string, or add new object
      const featureObj = typeof newFeature === 'string' 
        ? { name: newFeature.trim(), nameArabic: '' }
        : { name: newFeature.name || newFeature.trim(), nameArabic: newFeature.nameArabic || '' };
      setFeatures([...features, featureObj]);
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index, field, value) => {
    const updated = [...features];
    // Handle both string and object formats
    if (typeof updated[index] === 'string') {
      updated[index] = { name: updated[index], nameArabic: '' };
    }
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setFeatures(updated);
  };

  // Layouts management
  const addLayout = () => {
    setLayouts([...layouts, {
      name: '',
      nameArabic: '',
      image: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      features: [],
      price: ''
    }]);
  };

  const updateLayout = (index, field, value) => {
    const updated = [...layouts];
    if (field === 'features') {
      updated[index].features = value.split(',').map(f => f.trim()).filter(Boolean);
    } else {
      updated[index][field] = value;
    }
    setLayouts(updated);
  };

  const removeLayout = (index) => {
    setLayouts(layouts.filter((_, i) => i !== index));
  };

  const handleLayoutImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'images/projects/layouts/');
        updateLayout(index, 'image', url);
      } catch (err) {
        alert('Failed to upload image: ' + err.message);
      }
    }
  };

  // Nearby management
  const addNearby = () => {
    if (newNearbyName.trim() && newNearbyDistance.trim()) {
      setNearby([...nearby, {
        name: newNearbyName.trim(),
        nameArabic: '',
        distance: newNearbyDistance.trim()
      }]);
      setNewNearbyName('');
      setNewNearbyDistance('');
    }
  };

  const updateNearby = (index, field, value) => {
    const updated = [...nearby];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setNearby(updated);
  };

  const removeNearby = (index) => {
    setNearby(nearby.filter((_, i) => i !== index));
  };

  // Attachments management
  const addAttachment = () => {
    setAttachments([...attachments, {
      name: '',
      nameArabic: '',
      type: 'Pdf',
      icon: '',
      file: ''
    }]);
  };

  const updateAttachment = (index, field, value) => {
    const updated = [...attachments];
    updated[index][field] = value;
    setAttachments(updated);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleAttachmentFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'files/projects/');
        updateAttachment(index, 'file', url);
      } catch (err) {
        alert('Failed to upload file: ' + err.message);
      }
    }
  };

  // Gallery management
  const addGalleryItem = () => {
    setGallery([...gallery, {
      image: '',
      title: '',
      titleArabic: '',
      category: '',
      categoryArabic: ''
    }]);
  };

  const updateGalleryItem = (index, field, value) => {
    const updated = [...gallery];
    updated[index][field] = value;
    setGallery(updated);
  };

  const removeGalleryItem = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleGalleryImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'images/projects/gallery/');
        updateGalleryItem(index, 'image', url);
      } catch (err) {
        alert('Failed to upload image: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let mainImageUrl = formData.mainImage || '';
      let locationMapUrl = formData.locationMap || '';

      // Upload images if new files are selected
      if (mainImageFile && mainImageFile instanceof File) {
        mainImageUrl = await uploadFile(mainImageFile, 'images/projects/');
      }
      if (locationMapFile && locationMapFile instanceof File) {
        locationMapUrl = await uploadFile(locationMapFile, 'images/projects/');
      }

      // Ensure all URLs are strings
      mainImageUrl = typeof mainImageUrl === 'string' ? mainImageUrl : '';
      locationMapUrl = typeof locationMapUrl === 'string' ? locationMapUrl : '';

      // Clean and validate sections - ensure all image URLs are strings
      const cleanedSections = Array.isArray(sections) ? sections.map(section => ({
        ...section,
        image: typeof section?.image === 'string' ? section.image : '',
        title: typeof section?.title === 'string' ? section.title : '',
        titleArabic: typeof section?.titleArabic === 'string' ? section.titleArabic : (section.title || ''),
        subtitle: typeof section?.subtitle === 'string' ? section.subtitle : '',
        subtitleArabic: typeof section?.subtitleArabic === 'string' ? section.subtitleArabic : (section.subtitle || ''),
        description: typeof section?.description === 'string' ? section.description : '',
        descriptionArabic: typeof section?.descriptionArabic === 'string' ? section.descriptionArabic : (section.description || ''),
        categories: Array.isArray(section?.categories) 
          ? section.categories 
          : (typeof section?.categories === 'string' 
            ? section.categories.split(/[,،]/).map(c => c.trim()).filter(Boolean)
            : []),
        categoriesArabic: Array.isArray(section?.categoriesArabic) 
          ? section.categoriesArabic 
          : (typeof section?.categoriesArabic === 'string'
            ? section.categoriesArabic.split(/[,،]/).map(c => c.trim()).filter(Boolean)
            : (Array.isArray(section?.categories) ? section.categories : [])),
        buttonText: typeof section?.buttonText === 'string' ? section.buttonText : '',
        buttonTextArabic: typeof section?.buttonTextArabic === 'string' ? section.buttonTextArabic : (section.buttonText || '')
      })) : [];

      // Clean and validate layouts - ensure all image URLs are strings
      const cleanedLayouts = Array.isArray(layouts) ? layouts.map(layout => ({
        ...layout,
        image: typeof layout?.image === 'string' ? layout.image : '',
        name: typeof layout?.name === 'string' ? layout.name : '',
        nameArabic: typeof layout?.nameArabic === 'string' ? layout.nameArabic : (layout.name || ''),
        area: typeof layout?.area === 'string' ? layout.area : '',
        bedrooms: typeof layout?.bedrooms === 'string' ? layout.bedrooms : '',
        bathrooms: typeof layout?.bathrooms === 'string' ? layout.bathrooms : '',
        features: Array.isArray(layout?.features) ? layout.features : [],
        price: typeof layout?.price === 'string' ? layout.price : ''
      })) : [];

      // Clean and validate gallery - ensure all image URLs are strings
      const cleanedGallery = Array.isArray(gallery) ? gallery.map(item => ({
        ...item,
        image: typeof item?.image === 'string' ? item.image : '',
        title: typeof item?.title === 'string' ? item.title : '',
        titleArabic: typeof item?.titleArabic === 'string' ? item.titleArabic : (item.title || ''),
        category: typeof item?.category === 'string' ? item.category : '',
        categoryArabic: typeof item?.categoryArabic === 'string' ? item.categoryArabic : (item.category || '')
      })) : [];

      // Clean and validate attachments - ensure all file URLs are strings
      const cleanedAttachments = Array.isArray(attachments) ? attachments.map(attachment => ({
        ...attachment,
        file: typeof attachment?.file === 'string' ? attachment.file : '',
        name: typeof attachment?.name === 'string' ? attachment.name : '',
        nameArabic: typeof attachment?.nameArabic === 'string' ? attachment.nameArabic : (attachment.name || ''),
        type: typeof attachment?.type === 'string' ? attachment.type : 'Pdf',
        icon: typeof attachment?.icon === 'string' ? attachment.icon : ''
      })) : [];

      // Clean and validate nearby - ensure all values are strings
      const cleanedNearby = Array.isArray(nearby) ? nearby.map(item => ({
        name: typeof item?.name === 'string' ? item.name : '',
        nameArabic: typeof item?.nameArabic === 'string' ? item.nameArabic : (item.name || ''),
        distance: typeof item?.distance === 'string' ? item.distance : ''
      })) : [];

      // Clean and validate features - convert to object format with Arabic
      const cleanedFeatures = Array.isArray(features) ? features.map(f => {
        if (typeof f === 'string') {
          return { name: f, nameArabic: f };
        }
        return {
          name: typeof f?.name === 'string' ? f.name : '',
          nameArabic: typeof f?.nameArabic === 'string' ? f.nameArabic : (f.name || '')
        };
      }).filter(f => f.name) : [];

      // Clean and validate sectionTitle
      const cleanedSectionTitle = {
        span: typeof sectionTitle?.span === 'string' ? sectionTitle.span : '',
        spanArabic: typeof sectionTitle?.spanArabic === 'string' ? sectionTitle.spanArabic : (sectionTitle.span || ''),
        heading: typeof sectionTitle?.heading === 'string' ? sectionTitle.heading : '',
        headingArabic: typeof sectionTitle?.headingArabic === 'string' ? sectionTitle.headingArabic : (sectionTitle.heading || ''),
        description: typeof sectionTitle?.description === 'string' ? sectionTitle.description : '',
        descriptionArabic: typeof sectionTitle?.descriptionArabic === 'string' ? sectionTitle.descriptionArabic : (sectionTitle.description || '')
      };

      // Clean and validate formData - ensure all fields are proper types
      // IMPORTANT: Never include 'id' in formData - it's the Firestore document ID, not a data field
      const cleanedFormData = {
        name: typeof formData.name === 'string' ? formData.name : '',
        nameArabic: typeof formData.nameArabic === 'string' ? formData.nameArabic : (formData.name || ''),
        slug: typeof formData.slug === 'string' ? formData.slug : '',
        client: typeof formData.client === 'string' ? formData.client : '',
        clientArabic: typeof formData.clientArabic === 'string' ? formData.clientArabic : (formData.client || ''),
        status: typeof formData.status === 'string' ? formData.status : 'Completed',
        year: typeof formData.year === 'string' ? formData.year : '',
        floors: typeof formData.floors === 'string' ? formData.floors : '',
        units: typeof formData.units === 'string' ? formData.units : '',
        location: typeof formData.location === 'string' ? formData.location : '',
        locationArabic: typeof formData.locationArabic === 'string' ? formData.locationArabic : (formData.location || ''),
        mainImage: mainImageUrl,
        locationMap: locationMapUrl
      };
      
      // Explicitly remove 'id' if it exists - we never want to store it in Firestore
      delete cleanedFormData.id;

      const projectData = {
        ...cleanedFormData,
        sectionTitle: cleanedSectionTitle,
        sections: cleanedSections,
        features: cleanedFeatures,
        layouts: cleanedLayouts,
        nearby: cleanedNearby,
        attachments: cleanedAttachments,
        gallery: cleanedGallery
      };
      
      // Ensure 'id' is never in the data - it's only the Firestore document ID
      delete projectData.id;

      // Final validation - ensure no undefined or null values in URLs
      const sanitizeUrls = (obj) => {
        if (typeof obj === 'string') {
          return obj || '';
        }
        if (Array.isArray(obj)) {
          return obj.map(item => sanitizeUrls(item));
        }
        if (obj && typeof obj === 'object') {
          const sanitized = {};
          for (const key in obj) {
            // Never include 'id' in sanitized data - it's the Firestore document ID
            if (key === 'id') {
              continue;
            }
            if (key === 'image' || key === 'file' || key === 'mainImage' || key === 'locationMap' || key === 'icon') {
              // Ensure URL fields are always strings
              sanitized[key] = typeof obj[key] === 'string' ? obj[key] : '';
            } else {
              sanitized[key] = sanitizeUrls(obj[key]);
            }
          }
          return sanitized;
        }
        return obj;
      };

      const finalProjectData = sanitizeUrls(projectData);

      // Additional validation - ensure data is JSON serializable
      try {
        JSON.stringify(finalProjectData);
      } catch (jsonError) {
        console.error('Data is not JSON serializable:', jsonError);
        throw new Error('Invalid data format: ' + jsonError.message);
      }

      // Remove any undefined or null values that might cause issues
      const removeUndefined = (obj) => {
        if (obj === null || obj === undefined) {
          return null;
        }
        if (typeof obj === 'string') {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map(item => removeUndefined(item)).filter(item => item !== undefined);
        }
        if (typeof obj === 'object') {
          const cleaned = {};
          for (const key in obj) {
            // Never include 'id' in cleaned data - it's the Firestore document ID
            if (key === 'id') {
              continue;
            }
            if (obj[key] !== undefined) {
              cleaned[key] = removeUndefined(obj[key]);
            }
          }
          return cleaned;
        }
        return obj;
      };

      const cleanedFinalData = removeUndefined(finalProjectData);

      console.log('Saving project data:', cleanedFinalData);

      if (editingProject) {
        // Use the Firestore document ID (always a string)
        // editingProject.id is the Firestore document ID from when we fetched it
        const docId = editingProject.id;
        
        if (!docId || typeof docId !== 'string') {
          throw new Error('Invalid Firestore document ID: ' + docId);
        }
        
        // cleanedFinalData should never have an 'id' field, but ensure it's removed
        const { id, ...dataToUpdate } = cleanedFinalData;
        
        await update(docId, dataToUpdate);
      } else {
        // For new documents, Firestore will auto-generate the document ID
        // cleanedFinalData should never have an 'id' field, but ensure it's removed
        const { id, ...dataToAdd } = cleanedFinalData;
        const newDocId = await add(dataToAdd);
        console.log('New project created with Firestore document ID:', newDocId);
      }

      resetForm();
      setShowForm(false);
      await fetchData();
    } catch (err) {
      console.error('Error saving project:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      setFormError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    // Ensure we're using the Firestore document ID (should be a string)
    console.log('Editing project:', project);
    console.log('Project ID:', project.id, 'Type:', typeof project.id);
    
    // The project.id should be the Firestore document ID
    setEditingProject(project);
    setFormData({
      id: project.id, // This is the Firestore document ID
      name: project.name || '',
      nameArabic: project.nameArabic || '',
      slug: project.slug || '',
      client: project.client || '',
      clientArabic: project.clientArabic || '',
      status: project.status || 'Completed',
      year: project.year || '',
      floors: project.floors || '',
      units: project.units || '',
      location: project.location || '',
      locationArabic: project.locationArabic || '',
      mainImage: project.mainImage || '',
      locationMap: project.locationMap || ''
    });
    
    setSectionTitle(project.sectionTitle || { span: '', spanArabic: '', heading: '', headingArabic: '', description: '', descriptionArabic: '' });
    
    // Normalize sections data - ensure categories and categoriesArabic are arrays
    const normalizedSections = (project.sections || []).map(section => ({
      ...section,
      categories: Array.isArray(section?.categories) 
        ? section.categories 
        : (typeof section?.categories === 'string' 
          ? section.categories.split(/[,،]/).map(c => c.trim()).filter(Boolean)
          : []),
      categoriesArabic: Array.isArray(section?.categoriesArabic) 
        ? section.categoriesArabic 
        : (typeof section?.categoriesArabic === 'string'
          ? section.categoriesArabic.split(/[,،]/).map(c => c.trim()).filter(Boolean)
          : [])
    }));
    setSections(normalizedSections);
    // Convert features to object format if they're strings
    const projectFeatures = project.features || [];
    const convertedFeatures = projectFeatures.map(f => 
      typeof f === 'string' ? { name: f, nameArabic: f } : f
    );
    setFeatures(convertedFeatures);
    setLayouts(project.layouts || []);
    setNearby(project.nearby || []);
    setAttachments(project.attachments || []);
    setGallery(project.gallery || []);
    
    setMainImagePreview(project.mainImage || '');
    setLocationMapPreview(project.locationMap || '');
    setMainImageFile(null);
    setLocationMapFile(null);
    
    setShowForm(true);
    setActiveTab('basic');
  };

  const handleDelete = async (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await remove(projectId);
        await fetchData();
      } catch (err) {
        alert('Failed to delete project: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      nameArabic: '',
      slug: '',
      client: '',
      clientArabic: '',
      status: 'Completed',
      year: '',
      floors: '',
      units: '',
      location: '',
      locationArabic: '',
      mainImage: '',
      locationMap: ''
    });
    setSectionTitle({ span: '', spanArabic: '', heading: '', headingArabic: '', description: '', descriptionArabic: '' });
    setSections([]);
    setFeatures([]);
    setLayouts([]);
    setNearby([]);
    setAttachments([]);
    setGallery([]);
    setMainImageFile(null);
    setLocationMapFile(null);
    setMainImagePreview('');
    setLocationMapPreview('');
    setEditingProject(null);
    setFormError('');
    setNewFeature('');
    setNewNearbyName('');
    setNewNearbyDistance('');
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const projects = projectsData || [];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Projects Management</h2>
          <p>Manage project listings and details</p>
        </div>
        {!showForm && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={loadDefaultProject}
            >
              <FileText size={20} />
              Load Default Data
            </button>
            <button 
              className="admin-btn admin-btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <Plus size={20} />
              Add New Project
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            <button 
              type="button"
              className="admin-btn-icon"
              onClick={handleCancel}
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs - Outside form to prevent interference */}
          <div className="admin-tabs" style={{ position: 'relative', zIndex: 10 }}>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('basic');
              }}
            >
              <Info size={18} />
              Basic Info
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'sectionTitle' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('sectionTitle');
              }}
            >
              <Settings size={18} />
              Section Title
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'sections' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('sections');
              }}
            >
              <FileText size={18} />
              Sections ({sections.length})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'features' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('features');
              }}
            >
              <Building2 size={18} />
              Features ({features.length})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'layouts' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('layouts');
              }}
            >
              <Building2 size={18} />
              Layouts ({layouts.length})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'nearby' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('nearby');
              }}
            >
              <MapPin size={18} />
              Nearby ({nearby.length})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'attachments' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('attachments');
              }}
            >
              <FileText size={18} />
              Attachments ({attachments.length})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('gallery');
              }}
            >
              <GalleryIcon size={18} />
              Gallery ({gallery.length})
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">
                {formError}
              </div>
            )}

            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <>
                <div className="admin-form-group">
                  <label htmlFor="name">Project Name (English) *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Al Faisal Tower"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="nameArabic">
                    Project Name (Arabic) *
                    <TranslateButton
                      onTranslate={(translated) => setFormData(prev => ({ ...prev, nameArabic: translated }))}
                      englishText={formData.name}
                    />
                  </label>
                  <input
                    type="text"
                    id="nameArabic"
                    name="nameArabic"
                    value={formData.nameArabic}
                    onChange={handleInputChange}
                    required
                    placeholder="مثل: برج الفيصل"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="slug">Slug *</label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., al-faisal-tower"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="client">Client (English) *</label>
                    <input
                      type="text"
                      id="client"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., GUPD Development"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="clientArabic">
                      Client (Arabic) *
                      <TranslateButton
                        onTranslate={(translated) => setFormData(prev => ({ ...prev, clientArabic: translated }))}
                        englishText={formData.client}
                      />
                    </label>
                    <input
                      type="text"
                      id="clientArabic"
                      name="clientArabic"
                      value={formData.clientArabic}
                      onChange={handleInputChange}
                      required
                      placeholder="مثل: تطوير الخليج العالمي"
                    />
                  </div>
                </div>

                <div className="admin-form-row">

                  <div className="admin-form-group">
                    <label htmlFor="status">Status *</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="year">Year *</label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 2027"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="floors">Floors *</label>
                    <input
                      type="text"
                      id="floors"
                      name="floors"
                      value={formData.floors}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 35"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="units">Units *</label>
                    <input
                      type="text"
                      id="units"
                      name="units"
                      value={formData.units}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 280"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="location">Location (English) *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Sharjah, UAE"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="locationArabic">
                    Location (Arabic) *
                    <TranslateButton
                      onTranslate={(translated) => setFormData(prev => ({ ...prev, locationArabic: translated }))}
                      englishText={formData.location}
                    />
                  </label>
                  <input
                    type="text"
                    id="locationArabic"
                    name="locationArabic"
                    value={formData.locationArabic}
                    onChange={handleInputChange}
                    required
                    placeholder="مثل: الشارقة، الإمارات"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="mainImage">Main Image *</label>
                  <div className="admin-image-upload">
                    {mainImagePreview ? (
                      <div className="admin-image-preview">
                        <img src={mainImagePreview} alt="Preview" />
                        <button
                          type="button"
                          className="admin-btn-icon admin-image-remove"
                          onClick={() => {
                            setMainImageFile(null);
                            setMainImagePreview('');
                            setFormData(prev => ({ ...prev, mainImage: '' }));
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="admin-image-upload-placeholder">
                        <ImageIcon size={48} />
                        <p>Click to upload or drag and drop</p>
                        <p className="admin-image-upload-hint">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    )}
                    {activeTab === 'basic' && (
                      <input
                        type="file"
                        id="mainImage"
                        name="mainImage"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="admin-file-input"
                      />
                    )}
                    {uploading && (
                      <div className="admin-upload-progress">
                        <Loader2 size={16} className="admin-spinner" />
                        <span>Uploading... {Math.round(uploadProgress)}%</span>
                        <progress value={uploadProgress} max="100" />
                      </div>
                    )}
                  </div>
                  {!mainImagePreview && formData.mainImage && (
                    <input
                      type="url"
                      value={formData.mainImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, mainImage: e.target.value }))}
                      placeholder="Or enter image URL"
                      className="admin-url-input"
                    />
                  )}
                </div>

                <div className="admin-form-group">
                  <label htmlFor="locationMap">Location Map Image</label>
                  <div className="admin-image-upload">
                    {locationMapPreview ? (
                      <div className="admin-image-preview">
                        <img src={locationMapPreview} alt="Preview" />
                        <button
                          type="button"
                          className="admin-btn-icon admin-image-remove"
                          onClick={() => {
                            setLocationMapFile(null);
                            setLocationMapPreview('');
                            setFormData(prev => ({ ...prev, locationMap: '' }));
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="admin-image-upload-placeholder">
                        <ImageIcon size={48} />
                        <p>Click to upload or drag and drop</p>
                        <p className="admin-image-upload-hint">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    )}
                    {activeTab === 'basic' && (
                      <input
                        type="file"
                        id="locationMap"
                        name="locationMap"
                        accept="image/*"
                        onChange={handleLocationMapChange}
                        className="admin-file-input"
                      />
                    )}
                    {uploading && (
                      <div className="admin-upload-progress">
                        <Loader2 size={16} className="admin-spinner" />
                        <span>Uploading... {Math.round(uploadProgress)}%</span>
                        <progress value={uploadProgress} max="100" />
                      </div>
                    )}
                  </div>
                  {!locationMapPreview && formData.locationMap && (
                    <input
                      type="url"
                      value={formData.locationMap}
                      onChange={(e) => setFormData(prev => ({ ...prev, locationMap: e.target.value }))}
                      placeholder="Or enter image URL"
                      className="admin-url-input"
                    />
                  )}
                </div>
              </>
            )}

            {/* Section Title Tab */}
            {activeTab === 'sectionTitle' && (
              <>
                <div className="admin-form-group">
                  <label htmlFor="sectionTitle-span">Span (English) *</label>
                  <input
                    type="text"
                    id="sectionTitle-span"
                    name="span"
                    value={sectionTitle.span}
                    onChange={handleSectionTitleChange}
                    required
                    placeholder="e.g., Al Faisal Tower"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="sectionTitle-spanArabic">
                    Span (Arabic) *
                    <TranslateButton
                      onTranslate={(translated) => setSectionTitle(prev => ({ ...prev, spanArabic: translated }))}
                      englishText={sectionTitle.span}
                    />
                  </label>
                  <input
                    type="text"
                    id="sectionTitle-spanArabic"
                    name="spanArabic"
                    value={sectionTitle.spanArabic}
                    onChange={handleSectionTitleChange}
                    required
                    placeholder="مثل: برج الفيصل"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="sectionTitle-heading">Heading (English) *</label>
                  <input
                    type="text"
                    id="sectionTitle-heading"
                    name="heading"
                    value={sectionTitle.heading}
                    onChange={handleSectionTitleChange}
                    required
                    placeholder="e.g., Discover Our Flagship Development"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="sectionTitle-headingArabic">
                    Heading (Arabic) *
                    <TranslateButton
                      onTranslate={(translated) => setSectionTitle(prev => ({ ...prev, headingArabic: translated }))}
                      englishText={sectionTitle.heading}
                    />
                  </label>
                  <input
                    type="text"
                    id="sectionTitle-headingArabic"
                    name="headingArabic"
                    value={sectionTitle.headingArabic}
                    onChange={handleSectionTitleChange}
                    required
                    placeholder="مثل: اكتشف تطويرنا الرائد"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="sectionTitle-description">Description (English) *</label>
                  <textarea
                    id="sectionTitle-description"
                    name="description"
                    value={sectionTitle.description}
                    onChange={handleSectionTitleChange}
                    required
                    rows="4"
                    placeholder="Enter description"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="sectionTitle-descriptionArabic">
                    Description (Arabic) *
                    <TranslateButton
                      onTranslate={(translated) => setSectionTitle(prev => ({ ...prev, descriptionArabic: translated }))}
                      englishText={sectionTitle.description}
                    />
                  </label>
                  <textarea
                    id="sectionTitle-descriptionArabic"
                    name="descriptionArabic"
                    value={sectionTitle.descriptionArabic}
                    onChange={handleSectionTitleChange}
                    required
                    rows="4"
                    placeholder="أدخل الوصف"
                  />
                </div>
              </>
            )}

            {/* Sections Tab */}
            {activeTab === 'sections' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4>Project Sections</h4>
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={addSection}>
                    <Plus size={18} />
                    Add Section
                  </button>
                </div>
                {sections.map((section, index) => (
                  <div key={index} className="admin-card" style={{ marginBottom: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h5>Section {index + 1}</h5>
                      <button type="button" className="admin-btn-icon admin-btn-delete" onClick={() => removeSection(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="admin-form-group">
                      <label>Image</label>
                      {activeTab === 'sections' && (
                        <div className="admin-image-upload">
                          {section.image ? (
                            <div className="admin-image-preview">
                              <img src={section.image} alt="Section Preview" />
                              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                                <button
                                  type="button"
                                  className="admin-btn-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const input = e.target.closest('.admin-image-upload').querySelector('input[type="file"]');
                                    input?.click();
                                  }}
                                  aria-label="Change image"
                                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.9)', color: 'white' }}
                                  title="Change Image"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn-icon admin-image-remove"
                                  onClick={() => updateSection(index, 'image', '')}
                                  aria-label="Remove image"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="admin-image-upload-placeholder">
                              <ImageIcon size={48} />
                              <p>Click to upload or drag and drop</p>
                              <p className="admin-image-upload-hint">PNG, JPG, WEBP up to 10MB</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSectionImageChange(index, e)}
                            className="admin-file-input"
                          />
                          {uploading && (
                            <div className="admin-upload-progress">
                              <Loader2 size={16} className="admin-spinner" />
                              <span>Uploading... {Math.round(uploadProgress)}%</span>
                              <progress value={uploadProgress} max="100" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label>Title (English) *</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        required
                        placeholder="Section title"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>
                        Title (Arabic) *
                        <TranslateButton
                          onTranslate={(translated) => updateSection(index, 'titleArabic', translated)}
                          englishText={section.title}
                        />
                      </label>
                      <input
                        type="text"
                        value={section.titleArabic || ''}
                        onChange={(e) => updateSection(index, 'titleArabic', e.target.value)}
                        required
                        placeholder="عنوان القسم"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Subtitle (English)</label>
                      <input
                        type="text"
                        value={section.subtitle}
                        onChange={(e) => updateSection(index, 'subtitle', e.target.value)}
                        placeholder="Section subtitle"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>
                        Subtitle (Arabic)
                        <TranslateButton
                          onTranslate={(translated) => updateSection(index, 'subtitleArabic', translated)}
                          englishText={section.subtitle}
                        />
                      </label>
                      <input
                        type="text"
                        value={section.subtitleArabic || ''}
                        onChange={(e) => updateSection(index, 'subtitleArabic', e.target.value)}
                        placeholder="العنوان الفرعي للقسم"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Description (English) *</label>
                      <textarea
                        value={section.description}
                        onChange={(e) => updateSection(index, 'description', e.target.value)}
                        required
                        rows="4"
                        placeholder="Section description"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>
                        Description (Arabic) *
                        <TranslateButton
                          onTranslate={(translated) => updateSection(index, 'descriptionArabic', translated)}
                          englishText={section.description}
                        />
                      </label>
                      <textarea
                        value={section.descriptionArabic || ''}
                        onChange={(e) => updateSection(index, 'descriptionArabic', e.target.value)}
                        required
                        rows="4"
                        placeholder="وصف القسم"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Categories (English) - comma-separated</label>
                      <input
                        type="text"
                        value={section.categories?.join(', ') || ''}
                        onChange={(e) => updateSection(index, 'categories', e.target.value)}
                        placeholder="e.g., Prime Location, Lake Views"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>
                        Categories (Arabic) - comma-separated
                        <button
                          type="button"
                          onClick={async () => {
                            if (!section.categories || section.categories.length === 0) {
                              alert('Please enter English categories first');
                              return;
                            }
                            try {
                              // Translate each category individually for better results
                              const { translateToArabic } = await import('@/utils/translate');
                              const translatedCategories = await Promise.all(
                                section.categories.map(cat => translateToArabic(cat.trim()))
                              );
                              updateSection(index, 'categoriesArabic', translatedCategories.join(', '));
                            } catch (error) {
                              alert(error.message || 'Translation failed. Please translate manually.');
                            }
                          }}
                          style={{
                            marginLeft: '10px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Translate All
                        </button>
                      </label>
                      <input
                        type="text"
                        value={section.categoriesArabic?.join(', ') || ''}
                        onChange={(e) => updateSection(index, 'categoriesArabic', e.target.value)}
                        placeholder="مثل: موقع ممتاز، إطلالات على البحيرة"
                      />
                      <small className="admin-help-text" style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                        Enter categories separated by commas. Use "Translate All" to translate all English categories at once.
                      </small>
                    </div>
                    <div className="admin-form-group">
                      <label>Button Text (English)</label>
                      <input
                        type="text"
                        value={section.buttonText}
                        onChange={(e) => updateSection(index, 'buttonText', e.target.value)}
                        placeholder="e.g., Explore Location Details"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>
                        Button Text (Arabic)
                        <TranslateButton
                          onTranslate={(translated) => updateSection(index, 'buttonTextArabic', translated)}
                          englishText={section.buttonText}
                        />
                      </label>
                      <input
                        type="text"
                        value={section.buttonTextArabic || ''}
                        onChange={(e) => updateSection(index, 'buttonTextArabic', e.target.value)}
                        placeholder="مثل: استكشف تفاصيل الموقع"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter feature (English)"
                    className="admin-input"
                    style={{ flex: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button type="button" className="admin-btn admin-btn-primary" onClick={addFeature}>
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <div className="admin-list">
                  {features.map((feature, index) => {
                    const featureName = typeof feature === 'string' ? feature : feature.name;
                    const featureNameArabic = typeof feature === 'string' ? '' : (feature.nameArabic || '');
                    return (
                      <div key={index} className="admin-card" style={{ marginBottom: '15px', padding: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <h5>Feature {index + 1}</h5>
                          <button type="button" className="admin-btn-icon admin-btn-delete" onClick={() => removeFeature(index)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="admin-form-group">
                          <label>Feature Name (English) *</label>
                          <input
                            type="text"
                            value={featureName}
                            onChange={(e) => updateFeature(index, 'name', e.target.value)}
                            placeholder="e.g., Swimming Pool"
                            required
                            className="admin-input"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label>
                            Feature Name (Arabic) *
                            <TranslateButton
                              onTranslate={(translated) => updateFeature(index, 'nameArabic', translated)}
                              englishText={featureName}
                            />
                          </label>
                          <input
                            type="text"
                            value={featureNameArabic}
                            onChange={(e) => updateFeature(index, 'nameArabic', e.target.value)}
                            placeholder="مثل: مسبح"
                            required
                            className="admin-input"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Layouts Tab */}
            {activeTab === 'layouts' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4>Unit Layouts</h4>
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={addLayout}>
                    <Plus size={18} />
                    Add Layout
                  </button>
                </div>
                {layouts.map((layout, index) => (
                  <div key={index} className="admin-card" style={{ marginBottom: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h5>Layout {index + 1}</h5>
                      <button type="button" className="admin-btn-icon admin-btn-delete" onClick={() => removeLayout(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Name (English) *</label>
                        <input
                          type="text"
                          value={layout.name}
                          onChange={(e) => updateLayout(index, 'name', e.target.value)}
                          required
                          placeholder="e.g., Studio Apartment"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>
                          Name (Arabic) *
                          <TranslateButton
                            onTranslate={(translated) => updateLayout(index, 'nameArabic', translated)}
                            englishText={layout.name}
                          />
                        </label>
                        <input
                          type="text"
                          value={layout.nameArabic || ''}
                          onChange={(e) => updateLayout(index, 'nameArabic', e.target.value)}
                          required
                          placeholder="مثل: استوديو"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Area *</label>
                        <input
                          type="text"
                          value={layout.area}
                          onChange={(e) => updateLayout(index, 'area', e.target.value)}
                          required
                          placeholder="e.g., 450 sq ft"
                        />
                      </div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Bedrooms *</label>
                        <input
                          type="text"
                          value={layout.bedrooms}
                          onChange={(e) => updateLayout(index, 'bedrooms', e.target.value)}
                          required
                          placeholder="e.g., Studio or 1"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Bathrooms *</label>
                        <input
                          type="text"
                          value={layout.bathrooms}
                          onChange={(e) => updateLayout(index, 'bathrooms', e.target.value)}
                          required
                          placeholder="e.g., 1"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Price *</label>
                        <input
                          type="text"
                          value={layout.price}
                          onChange={(e) => updateLayout(index, 'price', e.target.value)}
                          required
                          placeholder="e.g., Starting from AED 450,000"
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Features (comma-separated)</label>
                      <input
                        type="text"
                        value={layout.features?.join(', ') || ''}
                        onChange={(e) => updateLayout(index, 'features', e.target.value)}
                        placeholder="e.g., Open floor plan, Modern kitchen"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Layout Image</label>
                      {activeTab === 'layouts' && (
                        <div className="admin-image-upload">
                          {layout.image ? (
                            <div className="admin-image-preview">
                              <img src={layout.image} alt="Layout Preview" />
                              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                                <button
                                  type="button"
                                  className="admin-btn-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const input = e.target.closest('.admin-image-upload').querySelector('input[type="file"]');
                                    input?.click();
                                  }}
                                  aria-label="Change image"
                                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.9)', color: 'white' }}
                                  title="Change Image"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn-icon admin-image-remove"
                                  onClick={() => updateLayout(index, 'image', '')}
                                  aria-label="Remove image"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="admin-image-upload-placeholder">
                              <ImageIcon size={48} />
                              <p>Click to upload or drag and drop</p>
                              <p className="admin-image-upload-hint">PNG, JPG, WEBP up to 10MB</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLayoutImageChange(index, e)}
                            className="admin-file-input"
                          />
                          {uploading && (
                            <div className="admin-upload-progress">
                              <Loader2 size={16} className="admin-spinner" />
                              <span>Uploading... {Math.round(uploadProgress)}%</span>
                              <progress value={uploadProgress} max="100" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Nearby Tab */}
            {activeTab === 'nearby' && (
              <>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input
                    type="text"
                    value={newNearbyName}
                    onChange={(e) => setNewNearbyName(e.target.value)}
                    placeholder="Location name (English)"
                    className="admin-input"
                    style={{ flex: 1 }}
                  />
                  <input
                    type="text"
                    value={newNearbyDistance}
                    onChange={(e) => setNewNearbyDistance(e.target.value)}
                    placeholder="Distance"
                    className="admin-input"
                    style={{ flex: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNearby())}
                  />
                  <button type="button" className="admin-btn admin-btn-primary" onClick={addNearby}>
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <div className="admin-list">
                  {nearby.map((item, index) => (
                    <div key={index} className="admin-card" style={{ marginBottom: '15px', padding: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h5>Nearby Location {index + 1}</h5>
                        <button type="button" className="admin-btn-icon admin-btn-delete" onClick={() => removeNearby(index)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="admin-form-row">
                        <div className="admin-form-group">
                          <label>Location Name (English) *</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateNearby(index, 'name', e.target.value)}
                            placeholder="e.g., Shopping Mall"
                            required
                            className="admin-input"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label>
                            Location Name (Arabic) *
                            <TranslateButton
                              onTranslate={(translated) => updateNearby(index, 'nameArabic', translated)}
                              englishText={item.name}
                            />
                          </label>
                          <input
                            type="text"
                            value={item.nameArabic || ''}
                            onChange={(e) => updateNearby(index, 'nameArabic', e.target.value)}
                            placeholder="مثل: مركز تسوق"
                            required
                            className="admin-input"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label>Distance *</label>
                          <input
                            type="text"
                            value={item.distance}
                            onChange={(e) => updateNearby(index, 'distance', e.target.value)}
                            placeholder="e.g., 5 min"
                            required
                            className="admin-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Attachments Tab */}
            {activeTab === 'attachments' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4>Attachments</h4>
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={addAttachment}>
                    <Plus size={18} />
                    Add Attachment
                  </button>
                </div>
                {attachments.map((attachment, index) => (
                  <div key={index} className="admin-card" style={{ marginBottom: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h5>Attachment {index + 1}</h5>
                      <button type="button" className="admin-btn-icon admin-btn-delete" onClick={() => removeAttachment(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Name (English) *</label>
                        <input
                          type="text"
                          value={attachment.name}
                          onChange={(e) => updateAttachment(index, 'name', e.target.value)}
                          required
                          placeholder="e.g., Project Brochure"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>
                          Name (Arabic) *
                          <TranslateButton
                            onTranslate={(translated) => updateAttachment(index, 'nameArabic', translated)}
                            englishText={attachment.name}
                          />
                        </label>
                        <input
                          type="text"
                          value={attachment.nameArabic || ''}
                          onChange={(e) => updateAttachment(index, 'nameArabic', e.target.value)}
                          required
                          placeholder="مثل: كتيب المشروع"
                        />
                      </div>
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Type *</label>
                        <select
                          value={attachment.type}
                          onChange={(e) => updateAttachment(index, 'type', e.target.value)}
                          required
                        >
                          <option value="Pdf">PDF</option>
                          <option value="Doc">DOC</option>
                          <option value="Image">Image</option>
                        </select>
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Icon URL</label>
                      <input
                        type="text"
                        value={attachment.icon}
                        onChange={(e) => updateAttachment(index, 'icon', e.target.value)}
                        placeholder="Icon URL"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>File</label>
                      {activeTab === 'attachments' && (
                        <div className="admin-image-upload">
                          {attachment.file ? (
                            <div className="admin-image-preview" style={{ flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
                              <a 
                                href={attachment.file} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ 
                                  display: 'inline-flex', 
                                  alignItems: 'center', 
                                  gap: '8px',
                                  padding: '8px 12px',
                                  backgroundColor: '#f1f5f9',
                                  borderRadius: '6px',
                                  textDecoration: 'none',
                                  color: '#3b82f6',
                                  marginBottom: '10px'
                                }}
                              >
                                <FileText size={16} />
                                View Current File
                              </a>
                              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                                <button
                                  type="button"
                                  className="admin-btn-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const input = e.target.closest('.admin-image-upload').querySelector('input[type="file"]');
                                    input?.click();
                                  }}
                                  aria-label="Change file"
                                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.9)', color: 'white' }}
                                  title="Change File"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn-icon admin-image-remove"
                                  onClick={() => updateAttachment(index, 'file', '')}
                                  aria-label="Remove file"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="admin-image-upload-placeholder">
                              <FileText size={48} />
                              <p>Click to upload file</p>
                              <p className="admin-image-upload-hint">PDF, DOC, DOCX, Images up to 10MB</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,image/*"
                            onChange={(e) => handleAttachmentFileChange(index, e)}
                            className="admin-file-input"
                          />
                          {uploading && (
                            <div className="admin-upload-progress">
                              <Loader2 size={16} className="admin-spinner" />
                              <span>Uploading... {Math.round(uploadProgress)}%</span>
                              <progress value={uploadProgress} max="100" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4>Gallery Images</h4>
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={addGalleryItem}>
                    <Plus size={18} />
                    Add Image
                  </button>
                </div>
                {gallery.map((item, index) => (
                  <div key={index} className="admin-card" style={{ marginBottom: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h5>Gallery Item {index + 1}</h5>
                      <button type="button" className="admin-btn-icon admin-btn-delete" onClick={() => removeGalleryItem(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="admin-form-group">
                      <label>Image</label>
                      {activeTab === 'gallery' && (
                        <div className="admin-image-upload">
                          {item.image ? (
                            <div className="admin-image-preview">
                              <img src={item.image} alt="Gallery Preview" />
                              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                                <button
                                  type="button"
                                  className="admin-btn-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const input = e.target.closest('.admin-image-upload').querySelector('input[type="file"]');
                                    input?.click();
                                  }}
                                  aria-label="Change image"
                                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.9)', color: 'white' }}
                                  title="Change Image"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn-icon admin-image-remove"
                                  onClick={() => updateGalleryItem(index, 'image', '')}
                                  aria-label="Remove image"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="admin-image-upload-placeholder">
                              <ImageIcon size={48} />
                              <p>Click to upload or drag and drop</p>
                              <p className="admin-image-upload-hint">PNG, JPG, WEBP up to 10MB</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleGalleryImageChange(index, e)}
                            className="admin-file-input"
                          />
                          {uploading && (
                            <div className="admin-upload-progress">
                              <Loader2 size={16} className="admin-spinner" />
                              <span>Uploading... {Math.round(uploadProgress)}%</span>
                              <progress value={uploadProgress} max="100" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Title (English) *</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateGalleryItem(index, 'title', e.target.value)}
                          required
                          placeholder="Image title"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>
                          Title (Arabic) *
                          <TranslateButton
                            onTranslate={(translated) => updateGalleryItem(index, 'titleArabic', translated)}
                            englishText={item.title}
                          />
                        </label>
                        <input
                          type="text"
                          value={item.titleArabic || ''}
                          onChange={(e) => updateGalleryItem(index, 'titleArabic', e.target.value)}
                          required
                          placeholder="عنوان الصورة"
                        />
                      </div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Category (English)</label>
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) => updateGalleryItem(index, 'category', e.target.value)}
                          placeholder="e.g., Exterior, Interior"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>
                          Category (Arabic)
                          <TranslateButton
                            onTranslate={(translated) => updateGalleryItem(index, 'categoryArabic', translated)}
                            englishText={item.category}
                          />
                        </label>
                        <input
                          type="text"
                          value={item.categoryArabic || ''}
                          onChange={(e) => updateGalleryItem(index, 'categoryArabic', e.target.value)}
                          placeholder="مثل: خارجي، داخلي"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={saving || uploading}
              >
                {saving ? (
                  <>
                    <Loader2 size={20} className="admin-spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="admin-page-content">
          {loading ? (
            <div className="admin-loading">
              <Loader2 size={32} className="admin-spinner" />
              <p>Loading projects...</p>
            </div>
          ) : error ? (
            <div className="admin-alert admin-alert-error">
              Error loading projects: {error.message}
            </div>
          ) : projects.length === 0 ? (
            <div className="admin-empty-state">
              <Building2 size={64} />
              <h3>No projects yet</h3>
              <p>Add your first project or load default data to get started</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={loadDefaultProject}
                >
                  <FileText size={20} />
                  Load Default Data
                </button>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                >
                  <Plus size={20} />
                  Add First Project
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-grid">
              {projects.map((project) => (
                <div key={project.id} className="admin-card">
                  <div className="admin-card-image">
                    <img 
                      src={project.mainImage || '/placeholder.jpg'} 
                      alt={project.name}
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="admin-card-content">
                    <h3>{project.name}</h3>
                    <p className="admin-card-meta">{project.location}</p>
                    <p className="admin-card-meta">Status: {project.status}</p>
                    <p className="admin-card-meta">Year: {project.year}</p>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      className="admin-btn-icon admin-btn-edit"
                      onClick={() => handleEdit(project)}
                      aria-label="Edit project"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="admin-btn-icon admin-btn-delete"
                      onClick={() => handleDelete(project.id)}
                      aria-label="Delete project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
