"use client";
import { useState, useEffect } from 'react';
import { useFirestore, useStorage } from '@/hooks/useFirebase';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Video,
  X,
  Save,
  Loader2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function AdminBannerPage() {
  const { data: banners, loading, error, fetchData, add, update, remove } = useFirestore('banners');
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();
  
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    video: '',
    ctaText: '',
    ctaLink: ''
  });
  const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchData({ orderBy: { field: 'order', direction: 'asc' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setVideoFile(null);
      setVideoPreview('');
      setFormData(prev => ({ ...prev, video: '' }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setImageFile(null);
      setImagePreview('');
      setFormData(prev => ({ ...prev, image: '' }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview('');
    setFormData(prev => ({ ...prev, video: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let imageUrl = formData.image;
      let videoUrl = formData.video;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'images/banners/');
      }

      // Upload video if a new file is selected
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'videos/banners/');
      }

      // Get sorted banners to determine next order
      const sortedBanners = [...banners].sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : 999;
        const orderB = b.order !== undefined ? b.order : 999;
        return orderA - orderB;
      });

      const bannerData = {
        ...formData,
        image: imageUrl,
        video: videoUrl || null,
        order: editingBanner ? editingBanner.order : (sortedBanners.length > 0 ? sortedBanners[sortedBanners.length - 1].order + 1 : 1)
      };

      // Remove video if media type is image, remove image if media type is video
      if (mediaType === 'image') {
        delete bannerData.video;
      } else {
        delete bannerData.image;
      }

      if (editingBanner) {
        await update(editingBanner.id, bannerData);
      } else {
        await add(bannerData);
      }

      // Reset form
      resetForm();
      setShowForm(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save banner');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    const hasVideo = banner.video && banner.video.trim() !== '';
    setMediaType(hasVideo ? 'video' : 'image');
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      image: banner.image || '',
      video: banner.video || '',
      ctaText: banner.ctaText || '',
      ctaLink: banner.ctaLink || ''
    });
    if (hasVideo) {
      setVideoPreview(banner.video || '');
      setImagePreview('');
    } else {
      setImagePreview(banner.image || '');
      setVideoPreview('');
    }
    setImageFile(null);
    setVideoFile(null);
    setShowForm(true);
  };

  const handleDelete = async (bannerId) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await remove(bannerId);
        // Refresh to update order
        await fetchData({ orderBy: { field: 'order', direction: 'asc' } });
      } catch (err) {
        alert('Failed to delete banner: ' + err.message);
      }
    }
  };

  const handleReorder = async (bannerId, direction) => {
    if (reordering) return;
    
    setReordering(true);
    try {
      // First, ensure all banners have an order field (initialize if missing)
      const bannersWithOrder = banners.map((banner, index) => ({
        ...banner,
        order: banner.order !== undefined ? banner.order : index + 1
      }));

      // Sort banners by order
      const sortedBanners = [...bannersWithOrder].sort((a, b) => a.order - b.order);

      const currentIndex = sortedBanners.findIndex(b => b.id === bannerId);
      if (currentIndex === -1) {
        setReordering(false);
        return;
      }

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= sortedBanners.length) {
        setReordering(false);
        return;
      }

      const currentBanner = sortedBanners[currentIndex];
      const targetBanner = sortedBanners[newIndex];

      // Swap orders
      const currentOrder = currentBanner.order;
      const targetOrder = targetBanner.order;

      // Update both banners
      await Promise.all([
        update(currentBanner.id, { ...currentBanner, order: targetOrder }),
        update(targetBanner.id, { ...targetBanner, order: currentOrder })
      ]);

      // Refresh data
      await fetchData({ orderBy: { field: 'order', direction: 'asc' } });
    } catch (err) {
      alert('Failed to reorder banner: ' + err.message);
    } finally {
      setReordering(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      video: '',
      ctaText: '',
      ctaLink: ''
    });
    setMediaType('image');
    setImageFile(null);
    setVideoFile(null);
    setImagePreview('');
    setVideoPreview('');
    setEditingBanner(null);
    setFormError('');
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Banner Content Management</h2>
          <p>Manage homepage banners and slides</p>
        </div>
        {!showForm && (
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Plus size={20} />
            Add New Banner
          </button>
        )}
      </div>

      {showForm && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</h3>
            <button 
              className="admin-btn-icon"
              onClick={handleCancel}
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">
                {formError}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter banner title"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="subtitle">Subtitle *</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                required
                placeholder="Enter banner subtitle"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Enter banner description"
              />
            </div>

            <div className="admin-form-group">
              <label>Media Type *</label>
              <div className="admin-radio-group" style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={mediaType === 'image'}
                    onChange={(e) => {
                      setMediaType(e.target.value);
                      if (e.target.value === 'image') {
                        setVideoFile(null);
                        setVideoPreview('');
                        setFormData(prev => ({ ...prev, video: '' }));
                      } else {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }
                    }}
                  />
                  <ImageIcon size={20} />
                  <span>Image</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={mediaType === 'video'}
                    onChange={(e) => {
                      setMediaType(e.target.value);
                      if (e.target.value === 'video') {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      } else {
                        setVideoFile(null);
                        setVideoPreview('');
                        setFormData(prev => ({ ...prev, video: '' }));
                      }
                    }}
                  />
                  <Video size={20} />
                  <span>Video</span>
                </label>
              </div>
            </div>

            {mediaType === 'image' ? (
              <div className="admin-form-group">
                <label htmlFor="image">Banner Image *</label>
                <div className="admin-image-upload">
                  {imagePreview ? (
                    <div className="admin-image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button
                        type="button"
                        className="admin-btn-icon admin-image-remove"
                        onClick={handleRemoveImage}
                        aria-label="Remove image"
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
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
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
                {!imagePreview && formData.image && (
                  <input
                    type="url"
                    value={formData.image}
                    onChange={handleInputChange}
                    name="image"
                    placeholder="Or enter image URL"
                    className="admin-url-input"
                  />
                )}
              </div>
            ) : (
              <div className="admin-form-group">
                <label htmlFor="video">Banner Video *</label>
                <div className="admin-image-upload">
                  {videoPreview ? (
                    <div className="admin-image-preview">
                      <video src={videoPreview} controls style={{ width: '100%', maxHeight: '400px' }} />
                      <button
                        type="button"
                        className="admin-btn-icon admin-image-remove"
                        onClick={handleRemoveVideo}
                        aria-label="Remove video"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="admin-image-upload-placeholder">
                      <Video size={48} />
                      <p>Click to upload or drag and drop</p>
                      <p className="admin-image-upload-hint">MP4, WEBM up to 50MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
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
                {!videoPreview && formData.video && (
                  <input
                    type="url"
                    value={formData.video}
                    onChange={handleInputChange}
                    name="video"
                    placeholder="Or enter video URL"
                    className="admin-url-input"
                  />
                )}
              </div>
            )}

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="ctaText">CTA Button Text *</label>
                <input
                  type="text"
                  id="ctaText"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., View Apartments"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="ctaLink">CTA Button Link *</label>
                <input
                  type="text"
                  id="ctaLink"
                  name="ctaLink"
                  value={formData.ctaLink}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., /property"
                />
              </div>
            </div>

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
                    {editingBanner ? 'Update Banner' : 'Create Banner'}
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
              <p>Loading banners...</p>
            </div>
          ) : error ? (
            <div className="admin-alert admin-alert-error">
              Error loading banners: {error.message}
            </div>
          ) : banners.length === 0 ? (
            <div className="admin-empty-state">
              <ImageIcon size={64} />
              <h3>No banners yet</h3>
              <p>Create your first banner to get started</p>
              <button 
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                <Plus size={20} />
                Add First Banner
              </button>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Order</th>
                    <th>Media</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>CTA</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    // Sort banners by order
                    const sortedBanners = [...banners].sort((a, b) => {
                      const orderA = a.order !== undefined ? a.order : 999;
                      const orderB = b.order !== undefined ? b.order : 999;
                      return orderA - orderB;
                    });

                    return sortedBanners.map((banner, index) => {
                      const hasVideo = banner.video && banner.video.trim() !== '';
                      const isFirst = index === 0;
                      const isLast = index === sortedBanners.length - 1;
                      
                      return (
                        <tr key={banner.id}>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                              <button
                                className="admin-btn-icon"
                                onClick={() => handleReorder(banner.id, 'up')}
                                disabled={isFirst || reordering}
                                aria-label="Move up"
                                style={{
                                  opacity: isFirst || reordering ? 0.5 : 1,
                                  cursor: isFirst || reordering ? 'not-allowed' : 'pointer',
                                  padding: '4px'
                                }}
                              >
                                <ChevronUp size={16} />
                              </button>
                              <span style={{ 
                                fontSize: '12px', 
                                fontWeight: '600',
                                color: 'var(--title-color)',
                                minWidth: '20px',
                                textAlign: 'center'
                              }}>
                                {(banner.order !== undefined ? banner.order : index + 1)}
                              </span>
                              <button
                                className="admin-btn-icon"
                                onClick={() => handleReorder(banner.id, 'down')}
                                disabled={isLast || reordering}
                                aria-label="Move down"
                                style={{
                                  opacity: isLast || reordering ? 0.5 : 1,
                                  cursor: isLast || reordering ? 'not-allowed' : 'pointer',
                                  padding: '4px'
                                }}
                              >
                                <ChevronDown size={16} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="admin-table-image">
                              {hasVideo ? (
                                <video 
                                  src={banner.video} 
                                  alt={banner.title}
                                  style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <img 
                                  src={banner.image || '/placeholder.jpg'} 
                                  alt={banner.title}
                                  onError={(e) => {
                                    e.target.src = '/placeholder.jpg';
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="admin-badge" style={{ 
                              background: hasVideo ? '#8b5cf6' : '#3b82f6' 
                            }}>
                              {hasVideo ? <><Video size={14} style={{ marginRight: '4px', display: 'inline' }} /> Video</> : <><ImageIcon size={14} style={{ marginRight: '4px', display: 'inline' }} /> Image</>}
                            </span>
                          </td>
                          <td>{banner.title}</td>
                          <td>{banner.subtitle}</td>
                          <td>
                            <span className="admin-badge">{banner.ctaText}</span>
                          </td>
                          <td>
                            <div className="admin-table-actions">
                              <button
                                className="admin-btn-icon admin-btn-edit"
                                onClick={() => handleEdit(banner)}
                                aria-label="Edit banner"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                className="admin-btn-icon admin-btn-delete"
                                onClick={() => handleDelete(banner.id)}
                                aria-label="Delete banner"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

