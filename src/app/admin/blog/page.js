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
  FileText,
  User,
  Tag,
  Calendar,
  Eye
} from 'lucide-react';

export default function AdminBlogPage() {
  const { data: blogs, loading, error, fetchData, add, update, remove } = useFirestore('blogs');
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();
  
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    blog_title: '',
    blog_content: '',
    cover_image: '',
    thumbnail_image: '',
    author_image: '',
    author_name: '',
    blog_view: '0',
    comment: '0',
    date: '',
    category: '',
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

      const blogData = {
        blog_title: formData.blog_title.trim(),
        blog_content: formData.blog_content.trim(),
        cover_image: coverImageUrl,
        thumbnail_image: thumbnailImageUrl || coverImageUrl, // Fallback to cover image
        author_image: authorImageUrl,
        author_name: formData.author_name.trim(),
        blog_view: parseInt(formData.blog_view) || 0,
        comment: parseInt(formData.comment) || 0,
        comment_content: editingBlog?.comment_content || [],
        date: formData.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        category: formData.category.trim(),
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
      blog_content: blog.blog_content || '',
      cover_image: blog.cover_image || '',
      thumbnail_image: blog.thumbnail_image || '',
      author_image: blog.author_image || '',
      author_name: blog.author_name || '',
      blog_view: blog.blog_view?.toString() || '0',
      comment: blog.comment?.toString() || '0',
      date: blog.date || '',
      category: blog.category || '',
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

  const resetForm = () => {
    setFormData({
      blog_title: '',
      blog_content: '',
      cover_image: '',
      thumbnail_image: '',
      author_image: '',
      author_name: '',
      blog_view: '0',
      comment: '0',
      date: '',
      category: '',
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
                <label htmlFor="blog_title">Blog Title *</label>
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
                <label htmlFor="blog_content">Blog Content *</label>
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

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="category">Category *</label>
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
                  <label htmlFor="author_name">Author Name *</label>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
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
