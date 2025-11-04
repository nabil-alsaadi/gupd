"use client";
import { useState, useEffect } from 'react';
import { useFirestore, useStorage } from '@/hooks/useFirebase';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  X,
  Save,
  Loader2
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
    ctaText: '',
    ctaLink: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchData({ orderBy: { field: 'createdAt', direction: 'desc' } });
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let imageUrl = formData.image;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'images/banners/');
      }

      const bannerData = {
        ...formData,
        image: imageUrl,
        order: editingBanner ? editingBanner.order : (banners.length + 1)
      };

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
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      image: banner.image || '',
      ctaText: banner.ctaText || '',
      ctaLink: banner.ctaLink || ''
    });
    setImagePreview(banner.image || '');
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (bannerId) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await remove(bannerId);
      } catch (err) {
        alert('Failed to delete banner: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      ctaText: '',
      ctaLink: ''
    });
    setImageFile(null);
    setImagePreview('');
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
                    <th>Image</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>CTA</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.id}>
                      <td>
                        <div className="admin-table-image">
                          <img 
                            src={banner.image || '/placeholder.jpg'} 
                            alt={banner.title}
                            onError={(e) => {
                              e.target.src = '/placeholder.jpg';
                            }}
                          />
                        </div>
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

