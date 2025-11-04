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
  Loader2,
  Users,
  User
} from 'lucide-react';

export default function AdminTeamPage() {
  const { data: teamData, loading, error, fetchData, add, update, remove } = useFirestore('team');
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();
  
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'founder', 'settings'
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: ''
  });
  const [founderData, setFounderData] = useState({
    name: '',
    position: '',
    quote: '',
    image: ''
  });
  const [sectionTitle, setSectionTitle] = useState({
    tagline: '',
    title: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [founderImageFile, setFounderImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [founderImagePreview, setFounderImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadTeamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTeamData = async () => {
    try {
      const data = await fetchData();
      if (data && data.length > 0) {
        const team = data[0];
        if (team.founder) {
          setFounderData({
            name: team.founder.name || '',
            position: team.founder.position || '',
            quote: team.founder.quote || '',
            image: team.founder.image || ''
          });
          setFounderImagePreview(team.founder.image || '');
        }
        if (team.sectionTitle) {
          setSectionTitle({
            tagline: team.sectionTitle.tagline || '',
            title: team.sectionTitle.title || ''
          });
        }
      }
    } catch (err) {
      console.error('Error loading team data:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFounderChange = (e) => {
    const { name, value } = e.target;
    setFounderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionTitleChange = (e) => {
    const { name, value } = e.target;
    setSectionTitle(prev => ({
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

  const handleFounderImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFounderImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFounderImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleRemoveFounderImage = () => {
    setFounderImageFile(null);
    setFounderImagePreview('');
    setFounderData(prev => ({ ...prev, image: '' }));
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let imageUrl = formData.image;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'images/team/');
      }

      const memberData = {
        name: formData.name,
        position: formData.position,
        image: imageUrl
      };

      // Get current team data
      const currentTeamData = teamData.length > 0 ? teamData[0] : null;

      if (editingMember) {
        // Update existing member
        const updatedMembers = currentTeamData.members.map(member => 
          member.id === editingMember.id ? { ...member, ...memberData } : member
        );
        
        await update(currentTeamData.id, {
          ...currentTeamData,
          members: updatedMembers
        });
      } else {
        // Add new member
        const newMember = {
          id: Date.now(),
          ...memberData
        };
        
        const updatedMembers = currentTeamData 
          ? [...(currentTeamData.members || []), newMember]
          : [newMember];
        
        if (currentTeamData) {
          await update(currentTeamData.id, {
            ...currentTeamData,
            members: updatedMembers
          });
        } else {
          await add({
            members: updatedMembers,
            founder: founderData,
            sectionTitle: sectionTitle
          });
        }
      }

      resetForm();
      setShowForm(false);
      await loadTeamData();
    } catch (err) {
      setFormError(err.message || 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleFounderSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let imageUrl = founderData.image;

      // Upload image if a new file is selected
      if (founderImageFile) {
        imageUrl = await uploadFile(founderImageFile, 'images/team/');
      }

      const updatedFounderData = {
        ...founderData,
        image: imageUrl
      };

      const currentTeamData = teamData.length > 0 ? teamData[0] : null;

      if (currentTeamData) {
        await update(currentTeamData.id, {
          ...currentTeamData,
          founder: updatedFounderData
        });
      } else {
        await add({
          members: [],
          founder: updatedFounderData,
          sectionTitle: sectionTitle
        });
      }

      await loadTeamData();
      alert('Founder information updated successfully!');
    } catch (err) {
      setFormError(err.message || 'Failed to save founder information');
    } finally {
      setSaving(false);
    }
  };

  const handleSectionTitleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      const currentTeamData = teamData.length > 0 ? teamData[0] : null;

      if (currentTeamData) {
        await update(currentTeamData.id, {
          ...currentTeamData,
          sectionTitle: sectionTitle
        });
      } else {
        await add({
          members: [],
          founder: founderData,
          sectionTitle: sectionTitle
        });
      }

      await loadTeamData();
      alert('Section title updated successfully!');
    } catch (err) {
      setFormError(err.message || 'Failed to save section title');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      position: member.position || '',
      image: member.image || ''
    });
    setImagePreview(member.image || '');
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (memberId) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        const currentTeamData = teamData[0];
        const updatedMembers = currentTeamData.members.filter(member => member.id !== memberId);
        
        await update(currentTeamData.id, {
          ...currentTeamData,
          members: updatedMembers
        });
        
        await loadTeamData();
      } catch (err) {
        alert('Failed to delete team member: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      image: ''
    });
    setImageFile(null);
    setImagePreview('');
    setEditingMember(null);
    setFormError('');
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const currentTeamData = teamData.length > 0 ? teamData[0] : null;
  const members = currentTeamData?.members || [];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Team Members Management</h2>
          <p>Manage team member profiles and information</p>
        </div>
        {!showForm && activeTab === 'members' && (
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Plus size={20} />
            Add Team Member
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={18} />
          Team Members ({members.length})
        </button>
        <button
          className={`admin-tab ${activeTab === 'founder' ? 'active' : ''}`}
          onClick={() => setActiveTab('founder')}
        >
          <User size={18} />
          Founder
        </button>
        <button
          className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Section Title
        </button>
      </div>

      {/* Team Members Tab */}
      {activeTab === 'members' && !showForm && (
        <div className="admin-page-content">
          {loading ? (
            <div className="admin-loading">
              <Loader2 size={32} className="admin-spinner" />
              <p>Loading team members...</p>
            </div>
          ) : error ? (
            <div className="admin-alert admin-alert-error">
              Error loading team members: {error.message}
            </div>
          ) : members.length === 0 ? (
            <div className="admin-empty-state">
              <Users size={64} />
              <h3>No team members yet</h3>
              <p>Add your first team member to get started</p>
              <button 
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                <Plus size={20} />
                Add First Member
              </button>
            </div>
          ) : (
            <div className="admin-grid">
              {members.map((member) => (
                <div key={member.id} className="admin-card">
                  <div className="admin-card-image">
                    <img 
                      src={member.image || '/placeholder.jpg'} 
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="admin-card-content">
                    <h3>{member.name}</h3>
                    <p className="admin-card-meta">{member.position}</p>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      className="admin-btn-icon admin-btn-edit"
                      onClick={() => handleEdit(member)}
                      aria-label="Edit member"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="admin-btn-icon admin-btn-delete"
                      onClick={() => handleDelete(member.id)}
                      aria-label="Delete member"
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

      {/* Add/Edit Member Form */}
      {activeTab === 'members' && showForm && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
            <button 
              className="admin-btn-icon"
              onClick={handleCancel}
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleMemberSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">
                {formError}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter team member name"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                placeholder="e.g., Project Manager, Architect"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="image">Profile Image *</label>
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
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Founder Tab */}
      {activeTab === 'founder' && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>Founder Information</h3>
          </div>

          <form onSubmit={handleFounderSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">
                {formError}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="founder-name">Name *</label>
              <input
                type="text"
                id="founder-name"
                name="name"
                value={founderData.name}
                onChange={handleFounderChange}
                required
                placeholder="Enter founder name"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="founder-position">Position *</label>
              <input
                type="text"
                id="founder-position"
                name="position"
                value={founderData.position}
                onChange={handleFounderChange}
                required
                placeholder="e.g., CEO, Founder"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="founder-quote">Quote *</label>
              <textarea
                id="founder-quote"
                name="quote"
                value={founderData.quote}
                onChange={handleFounderChange}
                required
                rows="4"
                placeholder="Enter founder quote"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="founder-image">Profile Image *</label>
              <div className="admin-image-upload">
                {founderImagePreview ? (
                  <div className="admin-image-preview">
                    <img src={founderImagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="admin-btn-icon admin-image-remove"
                      onClick={handleRemoveFounderImage}
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
                  id="founder-image"
                  name="image"
                  accept="image/*"
                  onChange={handleFounderImageChange}
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
              {!founderImagePreview && founderData.image && (
                <input
                  type="url"
                  value={founderData.image}
                  onChange={handleFounderChange}
                  name="image"
                  placeholder="Or enter image URL"
                  className="admin-url-input"
                />
              )}
            </div>

            <div className="admin-form-actions">
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
                    Update Founder
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Section Title Tab */}
      {activeTab === 'settings' && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>Section Title</h3>
          </div>

          <form onSubmit={handleSectionTitleSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">
                {formError}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="tagline">Tagline *</label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={sectionTitle.tagline}
                onChange={handleSectionTitleChange}
                required
                placeholder="e.g., Our Creative Team"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={sectionTitle.title}
                onChange={handleSectionTitleChange}
                required
                placeholder="e.g., Meet Our Nice Team."
              />
            </div>

            <div className="admin-form-actions">
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={20} className="admin-spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Section Title
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

