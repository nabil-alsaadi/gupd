"use client";

import { useEffect, useState } from "react";
import { useFirestore, useStorage } from "@/hooks/useFirebase";
import content from "@/data/gupdContent.json";
import {
  Save,
  Loader2,
  Image as ImageIcon,
  Plus,
  Trash2,
  X
} from "lucide-react";
import TranslateButton from '@/components/admin/TranslateButton';

const fallbackAbout = {
  title: content.about?.title || "",
  subtitle: content.about?.subtitle || "",
  videoDescription: content.about?.videoDescription || "",
  image: content.about?.image || "assets/img/home1/about-img.jpg",
  sections: Array.isArray(content.about?.sections) && content.about.sections.length > 0
    ? content.about.sections
    : [{ title: "", text: "" }]
};

const toFormState = (data = {}) => ({
  title: data.title || "",
  titleArabic: data.titleArabic || "",
  subtitle: data.subtitle || "",
  subtitleArabic: data.subtitleArabic || "",
  videoDescription: data.videoDescription || "",
  videoDescriptionArabic: data.videoDescriptionArabic || "",
  image: data.image || "",
  sections:
    Array.isArray(data.sections) && data.sections.length > 0
      ? data.sections.map((section) => ({
          title: section?.title || "",
          titleArabic: section?.titleArabic || "",
          text: section?.text || "",
          textArabic: section?.textArabic || ""
        }))
      : [{ title: "", titleArabic: "", text: "", textArabic: "" }]
});

export default function AdminAboutPage() {
  const {
    data: aboutDocs,
    loading,
    error,
    fetchData,
    add,
    update
  } = useFirestore("about");
  const { uploading, uploadProgress, upload: uploadFile } = useStorage();

  const [formData, setFormData] = useState(() => toFormState(fallbackAbout));
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(fallbackAbout.image);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData().catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (aboutDocs && aboutDocs.length > 0) {
      const doc = aboutDocs[0];
      const mergedData = {
        title: doc.title || fallbackAbout.title,
        titleArabic: doc.titleArabic || "",
        subtitle: doc.subtitle || fallbackAbout.subtitle,
        subtitleArabic: doc.subtitleArabic || "",
        videoDescription: doc.videoDescription || fallbackAbout.videoDescription,
        videoDescriptionArabic: doc.videoDescriptionArabic || "",
        image: doc.image || fallbackAbout.image,
        sections:
          Array.isArray(doc.sections) && doc.sections.length > 0
            ? doc.sections
            : fallbackAbout.sections
      };
      setFormData(toFormState(mergedData));
      setImagePreview(mergedData.image);
    } else {
      setFormData(toFormState(fallbackAbout));
      setImagePreview(fallbackAbout.image);
    }
  }, [aboutDocs]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionChange = (index, field, value) => {
    setFormData((prev) => {
      const sections = prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      );
      return { ...prev, sections };
    });
  };

  const handleAddSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", titleArabic: "", text: "", textArabic: "" }]
    }));
  };

  const handleRemoveSection = (index) => {
    setFormData((prev) => {
      if (prev.sections.length === 1) {
        return prev;
      }
      const sections = prev.sections.filter((_, i) => i !== index);
      return { ...prev, sections };
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result?.toString() || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "images/about/");
      }

      const sanitizedSections = formData.sections
        .map((section) => ({
          title: section.title.trim(),
          titleArabic: section.titleArabic || section.title.trim(),
          text: section.text.trim(),
          textArabic: section.textArabic || section.text.trim()
        }))
        .filter((section) => section.title || section.text);

      if (sanitizedSections.length === 0) {
        setFormError("Please provide at least one section with content.");
        setSaving(false);
        return;
      }

      const payload = {
        title: formData.title.trim() || fallbackAbout.title,
        titleArabic: formData.titleArabic || formData.title.trim() || fallbackAbout.title,
        subtitle: formData.subtitle.trim() || fallbackAbout.subtitle,
        subtitleArabic: formData.subtitleArabic || formData.subtitle.trim() || fallbackAbout.subtitle,
        videoDescription: formData.videoDescription.trim() || fallbackAbout.videoDescription,
        videoDescriptionArabic: formData.videoDescriptionArabic || formData.videoDescription.trim() || fallbackAbout.videoDescription,
        image: imageUrl || fallbackAbout.image,
        sections: sanitizedSections
      };

      const currentDoc = aboutDocs && aboutDocs.length > 0 ? aboutDocs[0] : null;

      if (currentDoc) {
        const { id, ...rest } = currentDoc;
        await update(currentDoc.id, {
          ...rest,
          ...payload
        });
      } else {
        await add(payload);
      }

      setFormData(toFormState(payload));
      setImageFile(null);
      setImagePreview(payload.image);
      setSuccessMessage("About section updated successfully!");
    } catch (err) {
      setFormError(err.message || "Failed to save about section");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>About Section Management</h2>
          <p>Update the homepage About section content and imagery</p>
        </div>
      </div>

      <div className="admin-page-content admin-form-container">
        {loading && !aboutDocs.length ? (
          <div className="admin-loading">
            <Loader2 size={32} className="admin-spinner" />
            <p>Loading about content...</p>
          </div>
        ) : error ? (
          <div className="admin-alert admin-alert-error">
            Error loading about content: {error.message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">{formError}</div>
            )}
            {successMessage && (
              <div className="admin-alert admin-alert-success">{successMessage}</div>
            )}

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="title">Section Title (English) *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Building Trust Since 2005"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="titleArabic">
                  Section Title (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => setFormData(prev => ({ ...prev, titleArabic: translated }))}
                    englishText={formData.title}
                  />
                </label>
                <input
                  type="text"
                  id="titleArabic"
                  name="titleArabic"
                  value={formData.titleArabic}
                  onChange={handleInputChange}
                  placeholder="مثل: بناء الثقة منذ 2005"
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="subtitle">Section Subtitle (English) *</label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Shaping Communities, Delivering Excellence."
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="subtitleArabic">
                  Section Subtitle (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => setFormData(prev => ({ ...prev, subtitleArabic: translated }))}
                    englishText={formData.subtitle}
                  />
                </label>
                <input
                  type="text"
                  id="subtitleArabic"
                  name="subtitleArabic"
                  value={formData.subtitleArabic}
                  onChange={handleInputChange}
                  placeholder="مثل: تشكيل المجتمعات، تقديم التميز"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="videoDescription">Intro Description (English) *</label>
              <textarea
                id="videoDescription"
                name="videoDescription"
                value={formData.videoDescription}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter the description shown beside the play button"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="videoDescriptionArabic">
                Intro Description (Arabic) *
                <TranslateButton
                  onTranslate={(translated) => setFormData(prev => ({ ...prev, videoDescriptionArabic: translated }))}
                  englishText={formData.videoDescription}
                />
              </label>
              <textarea
                id="videoDescriptionArabic"
                name="videoDescriptionArabic"
                value={formData.videoDescriptionArabic}
                onChange={handleInputChange}
                rows={4}
                placeholder="أدخل الوصف المعروض بجانب زر التشغيل"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="image">About Image *</label>
              <div className="admin-image-upload">
                {imagePreview ? (
                  <div className="admin-image-preview">
                    <img src={imagePreview} alt="About preview" />
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
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, image: event.target.value }))
                  }
                  placeholder="Or enter image URL"
                  className="admin-url-input"
                />
              )}
            </div>

            <div className="admin-form-group">
              <label>About Sections *</label>
              <p className="admin-help-text">
                These appear as bullet sections on the left side of the About block.
              </p>
              {formData.sections.map((section, index) => (
                <div key={index} className="admin-card admin-card-nested">
                  <div className="admin-form-group">
                    <label htmlFor={`section-title-${index}`}>Section Title (English) *</label>
                    <input
                      type="text"
                      id={`section-title-${index}`}
                      value={section.title}
                      onChange={(event) =>
                        handleSectionChange(index, "title", event.target.value)
                      }
                      placeholder="e.g., Who We Are"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor={`section-titleArabic-${index}`}>
                      Section Title (Arabic) *
                      <TranslateButton
                        onTranslate={(translated) => handleSectionChange(index, "titleArabic", translated)}
                        englishText={section.title}
                      />
                    </label>
                    <input
                      type="text"
                      id={`section-titleArabic-${index}`}
                      value={section.titleArabic || ''}
                      onChange={(event) =>
                        handleSectionChange(index, "titleArabic", event.target.value)
                      }
                      placeholder="مثل: من نحن"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor={`section-text-${index}`}>Section Text (English) *</label>
                    <textarea
                      id={`section-text-${index}`}
                      value={section.text}
                      onChange={(event) =>
                        handleSectionChange(index, "text", event.target.value)
                      }
                      rows={3}
                      placeholder="Enter the descriptive text"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor={`section-textArabic-${index}`}>
                      Section Text (Arabic) *
                      <TranslateButton
                        onTranslate={(translated) => handleSectionChange(index, "textArabic", translated)}
                        englishText={section.text}
                      />
                    </label>
                    <textarea
                      id={`section-textArabic-${index}`}
                      value={section.textArabic || ''}
                      onChange={(event) =>
                        handleSectionChange(index, "textArabic", event.target.value)
                      }
                      rows={3}
                      placeholder="أدخل النص الوصفي"
                      required
                    />
                  </div>
                  {formData.sections.length > 1 && (
                    <button
                      type="button"
                      className="admin-btn-icon admin-btn-delete"
                      onClick={() => handleRemoveSection(index)}
                      aria-label="Remove section"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={handleAddSection}
              >
                <Plus size={18} /> Add Section
              </button>
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
                    Save About Content
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
