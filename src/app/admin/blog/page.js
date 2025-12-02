"use client";
import React, { useState, useEffect } from 'react';
import { useFirestore, useStorage } from '@/hooks/useFirebase';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  X,
  Save,
  Loader2,
  FileText,
  User,
  Tag,
  Calendar,
  Eye,
  Languages,
  MessageSquare
} from 'lucide-react';
import { translateToArabic } from '@/utils/translate';

export default function AdminBlogPage() {
  const { data: blogs, loading, error, fetchData, add, update, remove } = useFirestore('blogs');
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();
  
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    blog_title: '',
    blog_titleArabic: '',
    blog_content: '',
    blog_contentArabic: '',
    cover_image: '',
    thumbnail_image: '',
    author_image: '',
    author_name: '',
    author_nameArabic: '',
    blog_view: '0',
    comment: '0',
    date: '',
    category: '',
    categoryArabic: '',
    tags: ''
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [thumbnailImageFile, setThumbnailImageFile] = useState(null);
  const [authorImageFile, setAuthorImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [thumbnailImagePreview, setThumbnailImagePreview] = useState('');
  const [authorImagePreview, setAuthorImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [translating, setTranslating] = useState({});
  const [viewingComments, setViewingComments] = useState(null);
  const [deletingComment, setDeletingComment] = useState(null);

  useEffect(() => {
    fetchData({ orderBy: { field: 'date', direction: 'desc' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTranslate = async (field, englishField) => {
    const englishText = formData[englishField];
    if (!englishText || englishText.trim() === '') {
      alert('Please enter English text first');
      return;
    }

    setTranslating(prev => ({ ...prev, [field]: true }));
    try {
      const translated = await translateToArabic(englishText);
      setFormData(prev => ({
        ...prev,
        [field]: translated
      }));
    } catch (error) {
      alert(error.message || 'Translation failed. Please translate manually.');
    } finally {
      setTranslating(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'cover') {
        setCoverImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type === 'thumbnail') {
        setThumbnailImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type === 'author') {
        setAuthorImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAuthorImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = (type) => {
    if (type === 'cover') {
      setCoverImageFile(null);
      setCoverImagePreview('');
      setFormData(prev => ({ ...prev, cover_image: '' }));
    } else if (type === 'thumbnail') {
      setThumbnailImageFile(null);
      setThumbnailImagePreview('');
      setFormData(prev => ({ ...prev, thumbnail_image: '' }));
    } else if (type === 'author') {
      setAuthorImageFile(null);
      setAuthorImagePreview('');
      setFormData(prev => ({ ...prev, author_image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      let coverImageUrl = formData.cover_image;
      let thumbnailImageUrl = formData.thumbnail_image;
      let authorImageUrl = formData.author_image;

      // Upload images if new files are selected
      if (coverImageFile) {
        coverImageUrl = await uploadFile(coverImageFile, 'images/blogs/');
      }
      if (thumbnailImageFile) {
        thumbnailImageUrl = await uploadFile(thumbnailImageFile, 'images/blogs/');
      }
      if (authorImageFile) {
        authorImageUrl = await uploadFile(authorImageFile, 'images/blogs/authors/');
      }

      // Parse tags from comma-separated string
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : [];

      // Add default Arabic translations if not provided
      const blogData = {
        blog_title: formData.blog_title.trim(),
        blog_titleArabic: formData.blog_titleArabic || 'عنوان المدونة',
        blog_content: formData.blog_content.trim(),
        blog_contentArabic: formData.blog_contentArabic || 'محتوى المدونة',
        cover_image: coverImageUrl,
        thumbnail_image: thumbnailImageUrl || coverImageUrl, // Fallback to cover image
        author_image: authorImageUrl,
        author_name: formData.author_name.trim(),
        author_nameArabic: formData.author_nameArabic || formData.author_name.trim(),
        blog_view: parseInt(formData.blog_view) || 0,
        comment: parseInt(formData.comment) || 0,
        comment_content: editingBlog?.comment_content || [],
        date: formData.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        category: formData.category.trim(),
        categoryArabic: formData.categoryArabic || formData.category.trim(),
        tags: tagsArray
      };

      if (editingBlog) {
        await update(editingBlog.id, blogData);
      } else {
        await add(blogData);
      }

      // Reset form
      resetForm();
      setShowForm(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      blog_title: blog.blog_title || '',
      blog_titleArabic: blog.blog_titleArabic || '',
      blog_content: blog.blog_content || '',
      blog_contentArabic: blog.blog_contentArabic || '',
      cover_image: blog.cover_image || '',
      thumbnail_image: blog.thumbnail_image || '',
      author_image: blog.author_image || '',
      author_name: blog.author_name || '',
      author_nameArabic: blog.author_nameArabic || '',
      blog_view: blog.blog_view?.toString() || '0',
      comment: blog.comment?.toString() || '0',
      date: blog.date || '',
      category: blog.category || '',
      categoryArabic: blog.categoryArabic || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || ''
    });
    setCoverImagePreview(blog.cover_image || '');
    setThumbnailImagePreview(blog.thumbnail_image || '');
    setAuthorImagePreview(blog.author_image || '');
    setCoverImageFile(null);
    setThumbnailImageFile(null);
    setAuthorImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await remove(blogId);
      } catch (err) {
        alert('Failed to delete blog post: ' + err.message);
      }
    }
  };

  const handleDeleteComment = async (blogId, commentIndex) => {
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;

    const comments = Array.isArray(blog.comment_content) ? blog.comment_content : [];
    const comment = comments[commentIndex];
    
    if (!confirm(`Are you sure you want to delete this comment by ${comment?.author_name || 'Anonymous'}?`)) {
      return;
    }

    setDeletingComment(`${blogId}-${commentIndex}`);
    
    try {
      const updatedComments = comments.filter((_, index) => index !== commentIndex);
      await update(blogId, {
        comment_content: updatedComments,
        comment: updatedComments.length
      });
      // Refresh data
      await fetchData({ orderBy: { field: 'date', direction: 'desc' } });
      
      // Close comments view if no comments left
      if (updatedComments.length === 0 && viewingComments === blogId) {
        setViewingComments(null);
      }
    } catch (err) {
      alert('Failed to delete comment: ' + err.message);
    } finally {
      setDeletingComment(null);
    }
  };

  const formatCommentDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const resetForm = () => {
    setFormData({
      blog_title: '',
      blog_titleArabic: '',
      blog_content: '',
      blog_contentArabic: '',
      cover_image: '',
      thumbnail_image: '',
      author_image: '',
      author_name: '',
      author_nameArabic: '',
      blog_view: '0',
      comment: '0',
      date: '',
      category: '',
      categoryArabic: '',
      tags: ''
    });
    setCoverImageFile(null);
    setThumbnailImageFile(null);
    setAuthorImageFile(null);
    setCoverImagePreview('');
    setThumbnailImagePreview('');
    setAuthorImagePreview('');
    setEditingBlog(null);
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
          <h2>Blog Posts Management</h2>
          <p>Create and manage blog articles</p>
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
            Add New Blog Post
          </button>
        )}
      </div>

      {showForm && (
        <div className="admin-page-content admin-form-container">
          <div className="admin-form-header">
            <h3>{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
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

            <div className="admin-card">
              <div className="admin-card-header">
                <FileText size={20} />
                <h3>Basic Information</h3>
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="blog_title">Blog Title (English) *</label>
                <input
                  type="text"
                  id="blog_title"
                  name="blog_title"
                  value={formData.blog_title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter blog title"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="blog_titleArabic">
                  Blog Title (Arabic) *
                  <button
                    type="button"
                    onClick={() => handleTranslate('blog_titleArabic', 'blog_title')}
                    disabled={translating.blog_titleArabic || !formData.blog_title}
                    style={{
                      marginLeft: '10px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: translating.blog_titleArabic || !formData.blog_title ? 'not-allowed' : 'pointer',
                      opacity: translating.blog_titleArabic || !formData.blog_title ? 0.6 : 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Translate from English"
                  >
                    <Languages size={14} />
                    {translating.blog_titleArabic ? 'Translating...' : 'Translate'}
                  </button>
                </label>
                <input
                  type="text"
                  id="blog_titleArabic"
                  name="blog_titleArabic"
                  value={formData.blog_titleArabic}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل عنوان المدونة"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="blog_content">Blog Content (English) *</label>
                <textarea
                  id="blog_content"
                  name="blog_content"
                  value={formData.blog_content}
                  onChange={handleInputChange}
                  required
                  rows="8"
                  placeholder="Enter blog content or description"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="blog_contentArabic">
                  Blog Content (Arabic) *
                  <button
                    type="button"
                    onClick={() => handleTranslate('blog_contentArabic', 'blog_content')}
                    disabled={translating.blog_contentArabic || !formData.blog_content}
                    style={{
                      marginLeft: '10px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: translating.blog_contentArabic || !formData.blog_content ? 'not-allowed' : 'pointer',
                      opacity: translating.blog_contentArabic || !formData.blog_content ? 0.6 : 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Translate from English"
                  >
                    <Languages size={14} />
                    {translating.blog_contentArabic ? 'Translating...' : 'Translate'}
                  </button>
                </label>
                <textarea
                  id="blog_contentArabic"
                  name="blog_contentArabic"
                  value={formData.blog_contentArabic}
                  onChange={handleInputChange}
                  required
                  rows="8"
                  placeholder="أدخل محتوى المدونة أو الوصف"
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="category">Category (English) *</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Industry, Construction"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="categoryArabic">
                    Category (Arabic) *
                    <button
                      type="button"
                      onClick={() => handleTranslate('categoryArabic', 'category')}
                      disabled={translating.categoryArabic || !formData.category}
                      style={{
                        marginLeft: '10px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: translating.categoryArabic || !formData.category ? 'not-allowed' : 'pointer',
                        opacity: translating.categoryArabic || !formData.category ? 0.6 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Translate from English"
                    >
                      <Languages size={14} />
                      {translating.categoryArabic ? 'Translating...' : 'Translate'}
                    </button>
                  </label>
                  <input
                    type="text"
                    id="categoryArabic"
                    name="categoryArabic"
                    value={formData.categoryArabic}
                    onChange={handleInputChange}
                    required
                    placeholder="مثل: الصناعة، البناء"
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 10 August, 2024"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., SEO, Digital Marketing, Website Optimization"
                />
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <ImageIcon size={20} />
                <h3>Images</h3>
              </div>

              <div className="admin-form-group">
                <label htmlFor="cover_image">Cover Image *</label>
                <div className="admin-image-upload">
                  {coverImagePreview ? (
                    <div className="admin-image-preview">
                      <img src={coverImagePreview} alt="Cover preview" />
                      <button
                        type="button"
                        className="admin-btn-icon admin-image-remove"
                        onClick={() => handleRemoveImage('cover')}
                        aria-label="Remove cover image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="admin-image-upload-placeholder">
                      <ImageIcon size={48} />
                      <p>Click to upload cover image</p>
                      <p className="admin-image-upload-hint">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'cover')}
                    className="admin-file-input"
                  />
                </div>
                {!coverImagePreview && formData.cover_image && (
                  <input
                    type="url"
                    value={formData.cover_image}
                    onChange={handleInputChange}
                    name="cover_image"
                    placeholder="Or enter image URL"
                    className="admin-url-input"
                  />
                )}
              </div>

              <div className="admin-form-group">
                <label htmlFor="thumbnail_image">Thumbnail Image</label>
                <div className="admin-image-upload">
                  {thumbnailImagePreview ? (
                    <div className="admin-image-preview">
                      <img src={thumbnailImagePreview} alt="Thumbnail preview" />
                      <button
                        type="button"
                        className="admin-btn-icon admin-image-remove"
                        onClick={() => handleRemoveImage('thumbnail')}
                        aria-label="Remove thumbnail image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="admin-image-upload-placeholder">
                      <ImageIcon size={48} />
                      <p>Click to upload thumbnail (optional)</p>
                      <p className="admin-image-upload-hint">Will use cover image if not provided</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="thumbnail_image"
                    name="thumbnail_image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'thumbnail')}
                    className="admin-file-input"
                  />
                </div>
                {!thumbnailImagePreview && formData.thumbnail_image && (
                  <input
                    type="url"
                    value={formData.thumbnail_image}
                    onChange={handleInputChange}
                    name="thumbnail_image"
                    placeholder="Or enter image URL"
                    className="admin-url-input"
                  />
                )}
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <User size={20} />
                <h3>Author Information</h3>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="author_name">Author Name (English) *</label>
                  <input
                    type="text"
                    id="author_name"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Cooper Jogan"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="author_nameArabic">
                    Author Name (Arabic) *
                    <button
                      type="button"
                      onClick={() => handleTranslate('author_nameArabic', 'author_name')}
                      disabled={translating.author_nameArabic || !formData.author_name}
                      style={{
                        marginLeft: '10px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: translating.author_nameArabic || !formData.author_name ? 'not-allowed' : 'pointer',
                        opacity: translating.author_nameArabic || !formData.author_name ? 0.6 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Translate from English"
                    >
                      <Languages size={14} />
                      {translating.author_nameArabic ? 'Translating...' : 'Translate'}
                    </button>
                  </label>
                  <input
                    type="text"
                    id="author_nameArabic"
                    name="author_nameArabic"
                    value={formData.author_nameArabic}
                    onChange={handleInputChange}
                    required
                    placeholder="مثل: كوبر جوجان"
                  />
                </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="author_image">Author Image</label>
                  <div className="admin-image-upload">
                    {authorImagePreview ? (
                      <div className="admin-image-preview">
                        <img src={authorImagePreview} alt="Author preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
                        <button
                          type="button"
                          className="admin-btn-icon admin-image-remove"
                          onClick={() => handleRemoveImage('author')}
                          aria-label="Remove author image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="admin-image-upload-placeholder">
                        <User size={48} />
                        <p>Click to upload author image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="author_image"
                      name="author_image"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'author')}
                      className="admin-file-input"
                    />
                  </div>
                  {!authorImagePreview && formData.author_image && (
                    <input
                      type="url"
                      value={formData.author_image}
                      onChange={handleInputChange}
                      name="author_image"
                      placeholder="Or enter image URL"
                      className="admin-url-input"
                    />
                  )}
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="blog_view">Views</label>
                  <input
                    type="number"
                    id="blog_view"
                    name="blog_view"
                    value={formData.blog_view}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="comment">Comments</label>
                  <input
                    type="number"
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {uploading && (
              <div className="admin-upload-progress">
                <Loader2 size={16} className="admin-spinner" />
                <span>Uploading... {Math.round(uploadProgress)}%</span>
                <progress value={uploadProgress} max="100" />
              </div>
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
                    {editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
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
              <p>Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="admin-alert admin-alert-error">
              Error loading blog posts: {error.message}
            </div>
          ) : blogs.length === 0 ? (
            <div className="admin-empty-state">
              <FileText size={64} />
              <h3>No blog posts yet</h3>
              <p>Create your first blog post to get started</p>
              <button 
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                <Plus size={20} />
                Add First Blog Post
              </button>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <React.Fragment key={blog.id}>
                      <tr>
                        <td>
                          <div className="admin-table-image">
                            <img 
                              src={blog.cover_image || blog.thumbnail_image || '/placeholder.jpg'} 
                              alt={blog.blog_title}
                              onError={(e) => {
                                e.target.src = '/placeholder.jpg';
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: '300px' }}>
                            <strong>{blog.blog_title}</strong>
                            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {blog.blog_content?.substring(0, 100)}...
                            </p>
                          </div>
                        </td>
                        <td>
                          <span className="admin-badge">{blog.category || 'Uncategorized'}</span>
                        </td>
                        <td>{blog.author_name || 'Unknown'}</td>
                        <td>{blog.date || 'N/A'}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Eye size={14} />
                            {blog.blog_view || 0}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} />
                            <span>{blog.comment || (blog.comment_content?.length || 0)}</span>
                            {blog.comment_content && blog.comment_content.length > 0 && (
                              <button
                                onClick={() => setViewingComments(viewingComments === blog.id ? null : blog.id)}
                                style={{
                                  marginLeft: '8px',
                                  padding: '4px 8px',
                                  fontSize: '11px',
                                  backgroundColor: viewingComments === blog.id ? '#2196F3' : '#f5f5f5',
                                  color: viewingComments === blog.id ? '#fff' : '#666',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                {viewingComments === blog.id ? 'Hide' : 'View'}
                              </button>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button
                              className="admin-btn-icon admin-btn-edit"
                              onClick={() => handleEdit(blog)}
                              aria-label="Edit blog post"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              className="admin-btn-icon admin-btn-delete"
                              onClick={() => handleDelete(blog.id)}
                              aria-label="Delete blog post"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {viewingComments === blog.id && blog.comment_content && blog.comment_content.length > 0 && (
                        <tr>
                          <td colSpan="8" style={{ padding: '0', backgroundColor: '#f9fafb' }}>
                            <div style={{ padding: '20px', borderTop: '2px solid #e5e7eb' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                                  Comments ({blog.comment_content.length})
                                </h4>
                                <button
                                  onClick={() => setViewingComments(null)}
                                  style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#f5f5f5',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: '#666'
                                  }}
                                >
                                  Close
                                </button>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {blog.comment_content.map((comment, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      padding: '16px',
                                      backgroundColor: '#fff',
                                      borderRadius: '8px',
                                      border: '1px solid #e5e7eb',
                                      display: 'flex',
                                      gap: '12px'
                                    }}
                                  >
                                    <div>
                                      <img
                                        src={comment.author_image || '/assets/img/inner-pages/blog-comment-author-01.png'}
                                        alt={comment.author_name || 'Commenter'}
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          borderRadius: '50%',
                                          objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                          e.target.src = '/assets/img/inner-pages/blog-comment-author-01.png';
                                        }}
                                      />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                        <div>
                                          <strong style={{ fontSize: '14px', color: '#1e293b' }}>
                                            {comment.author_name || 'Anonymous'}
                                          </strong>
                                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                                            {formatCommentDate(comment.date)}
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => handleDeleteComment(blog.id, index)}
                                          disabled={deletingComment === `${blog.id}-${index}`}
                                          style={{
                                            padding: '6px 10px',
                                            backgroundColor: '#F44336',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: deletingComment === `${blog.id}-${index}` ? 'not-allowed' : 'pointer',
                                            fontSize: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            opacity: deletingComment === `${blog.id}-${index}` ? 0.6 : 1
                                          }}
                                        >
                                          {deletingComment === `${blog.id}-${index}` ? (
                                            <>
                                              <Loader2 size={14} className="admin-spinner" />
                                              Deleting...
                                            </>
                                          ) : (
                                            <>
                                              <Trash2 size={14} />
                                              Delete
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                                        {comment.content || comment.message || 'No content'}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
