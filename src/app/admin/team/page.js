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
  User,
  MessageSquare
} from 'lucide-react';
import TranslateButton from '@/components/admin/TranslateButton';

export default function AdminTeamPage() {
  const { data: teamData, loading, error, fetchData, add, update, remove } = useFirestore('team');
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();
  
  const defaultChairmanMessage = {
    tagline: "Chairman's Message",
    title: 'A Word from Shaikh Faisal',
    leadershipQuote: 'Leadership is about inspiring others to achieve more than they thought possible.',
    highlightQuote: "Great architecture is not just about buildings—it's about creating spaces that inspire, transform, and endure.",
    paragraphs: [
      'Welcome to our journey of architectural excellence. At our core, we believe in transforming visions into reality through innovative design and meticulous execution.',
      'With decades of experience and a commitment to innovation, we bring your vision to life through thoughtful design. Our team is dedicated to delivering projects that exceed expectations and stand the test of time.'
    ],
    badge: {
      value: '30+',
      label: 'YEARS EXPERIENCE'
    },
    image: '/assets/img/new/ShaikhFaisal.jpg',
    signature: {
      initials: 'SF',
      name: 'Shaikh Faisal',
      role: 'Chairman & Founder'
    },
    stats: [
      { value: '500+', label: 'PROJECTS' },
      { value: '50+', label: 'AWARDS' },
      { value: '100%', label: 'SATISFIED' }
    ]
  };

  const [activeTab, setActiveTab] = useState('members'); // 'members', 'founder', 'settings'
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameArabic: '',
    position: '',
    positionArabic: '',
    image: ''
  });
  const [founderData, setFounderData] = useState({
    name: '',
    nameArabic: '',
    position: '',
    positionArabic: '',
    quote: '',
    quoteArabic: '',
    image: ''
  });
  const [sectionTitle, setSectionTitle] = useState({
    tagline: '',
    taglineArabic: '',
    title: '',
    titleArabic: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [founderImageFile, setFounderImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [founderImagePreview, setFounderImagePreview] = useState('');
  const [chairmanMessage, setChairmanMessage] = useState(defaultChairmanMessage);
  const [chairmanImageFile, setChairmanImageFile] = useState(null);
  const [chairmanImagePreview, setChairmanImagePreview] = useState('');
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
            nameArabic: team.founder.nameArabic || '',
            position: team.founder.position || '',
            positionArabic: team.founder.positionArabic || '',
            quote: team.founder.quote || '',
            quoteArabic: team.founder.quoteArabic || '',
            image: team.founder.image || ''
          });
          setFounderImagePreview(team.founder.image || '');
        }
        if (team.sectionTitle) {
          setSectionTitle({
            tagline: team.sectionTitle.tagline || '',
            taglineArabic: team.sectionTitle.taglineArabic || '',
            title: team.sectionTitle.title || '',
            titleArabic: team.sectionTitle.titleArabic || ''
          });
        }
        if (team.chairmanMessage) {
          const stats = Array.isArray(team.chairmanMessage.stats) && team.chairmanMessage.stats.length > 0
            ? team.chairmanMessage.stats
            : defaultChairmanMessage.stats;
          const paddedStats = [...stats];
          while (paddedStats.length < 3) {
            paddedStats.push({ value: '', label: '', labelArabic: '' });
          }

          setChairmanMessage({
            tagline: team.chairmanMessage.tagline || defaultChairmanMessage.tagline,
            taglineArabic: team.chairmanMessage.taglineArabic || '',
            title: team.chairmanMessage.title || defaultChairmanMessage.title,
            titleArabic: team.chairmanMessage.titleArabic || '',
            leadershipQuote: team.chairmanMessage.leadershipQuote || defaultChairmanMessage.leadershipQuote,
            leadershipQuoteArabic: team.chairmanMessage.leadershipQuoteArabic || '',
            highlightQuote: team.chairmanMessage.highlightQuote || defaultChairmanMessage.highlightQuote,
            highlightQuoteArabic: team.chairmanMessage.highlightQuoteArabic || '',
            paragraphs: Array.isArray(team.chairmanMessage.paragraphs) && team.chairmanMessage.paragraphs.length > 0
              ? team.chairmanMessage.paragraphs
              : defaultChairmanMessage.paragraphs,
            paragraphsArabic: Array.isArray(team.chairmanMessage.paragraphsArabic) && team.chairmanMessage.paragraphsArabic.length > 0
              ? team.chairmanMessage.paragraphsArabic
              : [],
            badge: {
              value: team.chairmanMessage?.badge?.value || defaultChairmanMessage.badge.value,
              label: team.chairmanMessage?.badge?.label || defaultChairmanMessage.badge.label,
              labelArabic: team.chairmanMessage?.badge?.labelArabic || ''
            },
            image: team.chairmanMessage.image || defaultChairmanMessage.image,
            signature: {
              initials: team.chairmanMessage?.signature?.initials || defaultChairmanMessage.signature.initials,
              name: team.chairmanMessage?.signature?.name || defaultChairmanMessage.signature.name,
              nameArabic: team.chairmanMessage?.signature?.nameArabic || '',
              role: team.chairmanMessage?.signature?.role || defaultChairmanMessage.signature.role,
              roleArabic: team.chairmanMessage?.signature?.roleArabic || ''
            },
            stats: paddedStats.map((stat, index) => ({
              value: stat?.value || '',
              label: stat?.label || '',
              labelArabic: stat?.labelArabic || ''
            }))
          });
          setChairmanImagePreview(team.chairmanMessage.image || '');
        } else {
          setChairmanMessage(defaultChairmanMessage);
          setChairmanImagePreview(defaultChairmanMessage.image);
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

  const handleChairmanTextChange = (e) => {
    const { name, value } = e.target;
    setChairmanMessage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChairmanParagraphsChange = (value) => {
    const paragraphs = value
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    setChairmanMessage(prev => ({
      ...prev,
      paragraphs: paragraphs.length > 0 ? paragraphs : ['']
    }));
  };

  const handleChairmanBadgeChange = (field, value) => {
    setChairmanMessage(prev => ({
      ...prev,
      badge: {
        ...prev.badge,
        [field]: value
      }
    }));
  };

  const handleChairmanSignatureChange = (field, value) => {
    setChairmanMessage(prev => ({
      ...prev,
      signature: {
        ...prev.signature,
        [field]: value
      }
    }));
  };

  const handleChairmanStatChange = (index, field, value) => {
    setChairmanMessage(prev => {
      const stats = [...prev.stats];
      if (!stats[index]) {
        stats[index] = { value: '', label: '', labelArabic: '' };
      }
      stats[index] = {
        ...stats[index],
        [field]: value
      };
      return {
        ...prev,
        stats
      };
    });
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

  const handleChairmanImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChairmanImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setChairmanImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveChairmanImage = () => {
    setChairmanImageFile(null);
    setChairmanImagePreview('');
    setChairmanMessage(prev => ({ ...prev, image: '' }));
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

      // Add default Arabic translations if not provided
      const memberData = {
        name: formData.name,
        nameArabic: formData.nameArabic || formData.name,
        position: formData.position,
        positionArabic: formData.positionArabic || formData.position,
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

      // Add default Arabic translations if not provided
      const updatedFounderData = {
        ...founderData,
        nameArabic: founderData.nameArabic || founderData.name,
        positionArabic: founderData.positionArabic || founderData.position,
        quoteArabic: founderData.quoteArabic || founderData.quote,
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

  const handleChairmanSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let imageUrl = chairmanMessage.image;

      if (chairmanImageFile) {
        imageUrl = await uploadFile(chairmanImageFile, 'images/team/');
      }

      const filteredParagraphs = chairmanMessage.paragraphs
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

      const cleanedStats = chairmanMessage.stats
        .map((stat) => ({
          value: (stat?.value || '').trim(),
          label: (stat?.label || '').trim()
        }))
        .filter((stat) => stat.value || stat.label);

      // Add default Arabic translations if not provided
      const updatedChairmanMessage = {
        tagline: chairmanMessage.tagline,
        taglineArabic: chairmanMessage.taglineArabic || chairmanMessage.tagline,
        title: chairmanMessage.title,
        titleArabic: chairmanMessage.titleArabic || chairmanMessage.title,
        leadershipQuote: chairmanMessage.leadershipQuote,
        leadershipQuoteArabic: chairmanMessage.leadershipQuoteArabic || chairmanMessage.leadershipQuote,
        highlightQuote: chairmanMessage.highlightQuote,
        highlightQuoteArabic: chairmanMessage.highlightQuoteArabic || chairmanMessage.highlightQuote,
        paragraphs: filteredParagraphs.length > 0 ? filteredParagraphs : defaultChairmanMessage.paragraphs,
        paragraphsArabic: chairmanMessage.paragraphsArabic || filteredParagraphs,
        badge: {
          value: chairmanMessage.badge.value,
          label: chairmanMessage.badge.label,
          labelArabic: chairmanMessage.badge?.labelArabic || chairmanMessage.badge.label
        },
        image: imageUrl,
        signature: {
          initials: chairmanMessage.signature.initials,
          name: chairmanMessage.signature.name,
          nameArabic: chairmanMessage.signature?.nameArabic || chairmanMessage.signature.name,
          role: chairmanMessage.signature.role,
          roleArabic: chairmanMessage.signature?.roleArabic || chairmanMessage.signature.role
        },
        stats: cleanedStats.length > 0 ? cleanedStats.map(stat => ({
          ...stat,
          labelArabic: stat.labelArabic || stat.label
        })) : defaultChairmanMessage.stats
      };

      const currentTeamData = teamData.length > 0 ? teamData[0] : null;

      if (currentTeamData) {
        const { id, ...rest } = currentTeamData;
        await update(currentTeamData.id, {
          ...rest,
          chairmanMessage: updatedChairmanMessage
        });
      } else {
        await add({
          members: [],
          founder: founderData,
          sectionTitle,
          chairmanMessage: updatedChairmanMessage
        });
      }

      setChairmanMessage((prev) => ({
        ...prev,
        ...updatedChairmanMessage,
        stats: updatedChairmanMessage.stats
      }));
      setChairmanImagePreview(imageUrl);

      await loadTeamData();
      alert('Chairman message updated successfully!');
    } catch (err) {
      setFormError(err.message || 'Failed to save chairman message');
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

      // Add default Arabic translations if not provided
      const updatedSectionTitle = {
        tagline: sectionTitle.tagline,
        taglineArabic: sectionTitle.taglineArabic || sectionTitle.tagline,
        title: sectionTitle.title,
        titleArabic: sectionTitle.titleArabic || sectionTitle.title
      };

      if (currentTeamData) {
        await update(currentTeamData.id, {
          ...currentTeamData,
          sectionTitle: updatedSectionTitle
        });
      } else {
        await add({
          members: [],
          founder: founderData,
          sectionTitle: updatedSectionTitle
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
      nameArabic: member.nameArabic || '',
      position: member.position || '',
      positionArabic: member.positionArabic || '',
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
      nameArabic: '',
      position: '',
      positionArabic: '',
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
          className={`admin-tab ${activeTab === 'chairman' ? 'active' : ''}`}
          onClick={() => setActiveTab('chairman')}
        >
          <MessageSquare size={18} />
          Chairman Message
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
              <label htmlFor="name">Name (English) *</label>
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
              <label htmlFor="nameArabic">
                Name (Arabic) *
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
                placeholder="أدخل اسم عضو الفريق"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="position">Position (English) *</label>
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
              <label htmlFor="positionArabic">
                Position (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setFormData(prev => ({ ...prev, positionArabic: translated }))}
                  englishText={formData.position}
                />
              </label>
              <input
                type="text"
                id="positionArabic"
                name="positionArabic"
                value={formData.positionArabic}
                onChange={handleInputChange}
                required
                placeholder="مثل: مدير المشروع، مهندس معماري"
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
              <label htmlFor="founder-name">Name (English) *</label>
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
              <label htmlFor="founder-nameArabic">
                Name (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setFounderData(prev => ({ ...prev, nameArabic: translated }))}
                  englishText={founderData.name}
                />
              </label>
              <input
                type="text"
                id="founder-nameArabic"
                name="nameArabic"
                value={founderData.nameArabic}
                onChange={handleFounderChange}
                required
                placeholder="أدخل اسم المؤسس"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="founder-position">Position (English) *</label>
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
              <label htmlFor="founder-positionArabic">
                Position (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setFounderData(prev => ({ ...prev, positionArabic: translated }))}
                  englishText={founderData.position}
                />
              </label>
              <input
                type="text"
                id="founder-positionArabic"
                name="positionArabic"
                value={founderData.positionArabic}
                onChange={handleFounderChange}
                required
                placeholder="مثل: الرئيس التنفيذي، المؤسس"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="founder-quote">Quote (English) *</label>
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
              <label htmlFor="founder-quoteArabic">
                Quote (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setFounderData(prev => ({ ...prev, quoteArabic: translated }))}
                  englishText={founderData.quote}
                />
              </label>
              <textarea
                id="founder-quoteArabic"
                name="quoteArabic"
                value={founderData.quoteArabic}
                onChange={handleFounderChange}
                required
                rows="4"
                placeholder="أدخل اقتباس المؤسس"
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

      {/* Chairman Message Tab */}
      {activeTab === 'chairman' && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>Chairman Message</h3>
          </div>

          <form onSubmit={handleChairmanSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">
                {formError}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="chairman-tagline">Tagline (English) *</label>
              <input
                type="text"
                id="chairman-tagline"
                name="tagline"
                value={chairmanMessage.tagline}
                onChange={handleChairmanTextChange}
                required
                placeholder="e.g., Chairman's Message"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-taglineArabic">
                Tagline (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setChairmanMessage(prev => ({ ...prev, taglineArabic: translated }))}
                  englishText={chairmanMessage.tagline}
                />
              </label>
              <input
                type="text"
                id="chairman-taglineArabic"
                name="taglineArabic"
                value={chairmanMessage.taglineArabic || ''}
                onChange={handleChairmanTextChange}
                required
                placeholder="مثل: رسالة الرئيس"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-title">Title (English) *</label>
              <input
                type="text"
                id="chairman-title"
                name="title"
                value={chairmanMessage.title}
                onChange={handleChairmanTextChange}
                required
                placeholder="e.g., A Word from Shaikh Faisal"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-titleArabic">
                Title (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setChairmanMessage(prev => ({ ...prev, titleArabic: translated }))}
                  englishText={chairmanMessage.title}
                />
              </label>
              <input
                type="text"
                id="chairman-titleArabic"
                name="titleArabic"
                value={chairmanMessage.titleArabic || ''}
                onChange={handleChairmanTextChange}
                required
                placeholder="مثل: كلمة من الشيخ فيصل"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-leadership-quote">Leadership Quote (English) *</label>
              <textarea
                id="chairman-leadership-quote"
                name="leadershipQuote"
                value={chairmanMessage.leadershipQuote}
                onChange={handleChairmanTextChange}
                required
                rows="2"
                placeholder="Enter short leadership quote"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-leadership-quoteArabic">
                Leadership Quote (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setChairmanMessage(prev => ({ ...prev, leadershipQuoteArabic: translated }))}
                  englishText={chairmanMessage.leadershipQuote}
                />
              </label>
              <textarea
                id="chairman-leadership-quoteArabic"
                name="leadershipQuoteArabic"
                value={chairmanMessage.leadershipQuoteArabic || ''}
                onChange={handleChairmanTextChange}
                required
                rows="2"
                placeholder="أدخل اقتباس القيادة القصير"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-highlight-quote">Highlight Quote (English) *</label>
              <textarea
                id="chairman-highlight-quote"
                name="highlightQuote"
                value={chairmanMessage.highlightQuote}
                onChange={handleChairmanTextChange}
                required
                rows="3"
                placeholder="Enter featured quote for highlight block"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-highlight-quoteArabic">
                Highlight Quote (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setChairmanMessage(prev => ({ ...prev, highlightQuoteArabic: translated }))}
                  englishText={chairmanMessage.highlightQuote}
                />
              </label>
              <textarea
                id="chairman-highlight-quoteArabic"
                name="highlightQuoteArabic"
                value={chairmanMessage.highlightQuoteArabic || ''}
                onChange={handleChairmanTextChange}
                required
                rows="3"
                placeholder="أدخل الاقتباس المميز"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-paragraphs">Message Paragraphs (English) *</label>
              <textarea
                id="chairman-paragraphs"
                value={chairmanMessage.paragraphs.join('\n\n')}
                onChange={(e) => handleChairmanParagraphsChange(e.target.value)}
                required
                rows="6"
                placeholder="Enter each paragraph on a new line"
              />
              <small className="admin-help-text">Separate paragraphs with an empty line.</small>
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-paragraphsArabic">
                Message Paragraphs (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => {
                    // Split translated text into paragraphs (same structure as English)
                    const paragraphs = translated
                      .split(/\n+/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean);
                    setChairmanMessage(prev => ({
                      ...prev,
                      paragraphsArabic: paragraphs.length > 0 ? paragraphs : prev.paragraphs
                    }));
                  }}
                  englishText={chairmanMessage.paragraphs.join('\n\n')}
                />
              </label>
              <textarea
                id="chairman-paragraphsArabic"
                value={(chairmanMessage.paragraphsArabic || chairmanMessage.paragraphs || []).join('\n\n')}
                onChange={(e) => {
                  const paragraphs = e.target.value
                    .split(/\n+/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean);
                  setChairmanMessage(prev => ({
                    ...prev,
                    paragraphsArabic: paragraphs.length > 0 ? paragraphs : prev.paragraphs
                  }));
                }}
                required
                rows="6"
                placeholder="أدخل كل فقرة في سطر جديد"
              />
              <small className="admin-help-text">افصل بين الفقرات بسطر فارغ.</small>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="chairman-badge-value">Badge Value *</label>
                <input
                  type="text"
                  id="chairman-badge-value"
                  value={chairmanMessage.badge.value}
                  onChange={(e) => handleChairmanBadgeChange('value', e.target.value)}
                  required
                  placeholder="e.g., 30+"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="chairman-badge-label">Badge Label (English) *</label>
                <input
                  type="text"
                  id="chairman-badge-label"
                  value={chairmanMessage.badge.label}
                  onChange={(e) => handleChairmanBadgeChange('label', e.target.value)}
                  required
                  placeholder="e.g., YEARS EXPERIENCE"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-badge-labelArabic">
                Badge Label (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => handleChairmanBadgeChange('labelArabic', translated)}
                  englishText={chairmanMessage.badge.label}
                />
              </label>
              <input
                type="text"
                id="chairman-badge-labelArabic"
                value={chairmanMessage.badge?.labelArabic || ''}
                onChange={(e) => handleChairmanBadgeChange('labelArabic', e.target.value)}
                required
                placeholder="مثل: سنوات من الخبرة"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="chairman-image">Chairman Image *</label>
              <div className="admin-image-upload">
                {chairmanImagePreview ? (
                  <div className="admin-image-preview">
                    <img src={chairmanImagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="admin-btn-icon admin-image-remove"
                      onClick={handleRemoveChairmanImage}
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
                  id="chairman-image"
                  name="chairman-image"
                  accept="image/*"
                  onChange={handleChairmanImageChange}
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
              {!chairmanImagePreview && chairmanMessage.image && (
                <input
                  type="url"
                  value={chairmanMessage.image}
                  onChange={(e) => setChairmanMessage(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Or enter image URL"
                  className="admin-url-input"
                />
              )}
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="chairman-initials">Initials *</label>
                <input
                  type="text"
                  id="chairman-initials"
                  value={chairmanMessage.signature.initials}
                  onChange={(e) => handleChairmanSignatureChange('initials', e.target.value)}
                  required
                  placeholder="e.g., SF"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="chairman-name">Name (English) *</label>
                <input
                  type="text"
                  id="chairman-name"
                  value={chairmanMessage.signature.name}
                  onChange={(e) => handleChairmanSignatureChange('name', e.target.value)}
                  required
                  placeholder="Enter name"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="chairman-nameArabic">
                  Name (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => handleChairmanSignatureChange('nameArabic', translated)}
                    englishText={chairmanMessage.signature.name}
                  />
                </label>
                <input
                  type="text"
                  id="chairman-nameArabic"
                  value={chairmanMessage.signature?.nameArabic || ''}
                  onChange={(e) => handleChairmanSignatureChange('nameArabic', e.target.value)}
                  required
                  placeholder="أدخل الاسم"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="chairman-role">Role (English) *</label>
                <input
                  type="text"
                  id="chairman-role"
                  value={chairmanMessage.signature.role}
                  onChange={(e) => handleChairmanSignatureChange('role', e.target.value)}
                  required
                  placeholder="e.g., Chairman & Founder"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="chairman-roleArabic">
                  Role (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => handleChairmanSignatureChange('roleArabic', translated)}
                    englishText={chairmanMessage.signature.role}
                  />
                </label>
                <input
                  type="text"
                  id="chairman-roleArabic"
                  value={chairmanMessage.signature?.roleArabic || ''}
                  onChange={(e) => handleChairmanSignatureChange('roleArabic', e.target.value)}
                  required
                  placeholder="مثل: الرئيس والمؤسس"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Statistics *</label>
              {chairmanMessage.stats.map((stat, index) => (
                <div key={index} className="admin-form-row">
                  <div className="admin-form-group">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleChairmanStatChange(index, 'value', e.target.value)}
                      placeholder="e.g., 500+"
                      required={index === 0}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Label (English) {index === 0 && '*'}</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleChairmanStatChange(index, 'label', e.target.value)}
                      placeholder="e.g., PROJECTS"
                      required={index === 0}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>
                      Label (Arabic) {index === 0 && '*'}
                      <TranslateButton
                        onTranslate={(translated) => handleChairmanStatChange(index, 'labelArabic', translated)}
                        englishText={stat.label}
                      />
                    </label>
                    <input
                      type="text"
                      value={stat.labelArabic || ''}
                      onChange={(e) => handleChairmanStatChange(index, 'labelArabic', e.target.value)}
                      placeholder="مثل: المشاريع"
                      required={index === 0}
                    />
                  </div>
                </div>
              ))}
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
                    Update Chairman Message
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
              <label htmlFor="tagline">Tagline (English) *</label>
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
              <label htmlFor="taglineArabic">
                Tagline (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setSectionTitle(prev => ({ ...prev, taglineArabic: translated }))}
                  englishText={sectionTitle.tagline}
                />
              </label>
              <input
                type="text"
                id="taglineArabic"
                name="taglineArabic"
                value={sectionTitle.taglineArabic}
                onChange={handleSectionTitleChange}
                required
                placeholder="مثل: فريقنا الإبداعي"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="title">Title (English) *</label>
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

            <div className="admin-form-group">
              <label htmlFor="titleArabic">
                Title (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setSectionTitle(prev => ({ ...prev, titleArabic: translated }))}
                  englishText={sectionTitle.title}
                />
              </label>
              <input
                type="text"
                id="titleArabic"
                name="titleArabic"
                value={sectionTitle.titleArabic}
                onChange={handleSectionTitleChange}
                required
                placeholder="مثل: تعرف على فريقنا الرائع"
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

