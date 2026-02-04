"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/hooks/useFirebase";
import { initFirebaseContact } from "@/utils/initFirebaseContact";
import companyData from "@/data/companyData.json";
import {
  Save,
  Loader2,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Download,
  Share2
} from "lucide-react";

const fallbackContact = {
  phone: {
    display: companyData.contact.phone?.display || "",
    link: companyData.contact.phone?.link || ""
  },
  whatsapp: {
    display: companyData.contact.whatsapp?.display || "",
    link: companyData.contact.whatsapp?.link || ""
  },
  email: {
    display: companyData.contact.email?.display || "",
    link: companyData.contact.email?.link || ""
  },
  address: {
    primary: companyData.contact.address?.primary || "",
    secondary: companyData.contact.address?.secondary || "",
    link: companyData.contact.address?.link || ""
  },
  workingHours: companyData.contact.workingHours || "",
  socialMedia: companyData.socialMedia || {
    linkedin: { url: "", icon: "bi bi-linkedin" },
    facebook: { url: "", icon: "bi bi-facebook" },
    twitter: { url: "", icon: "bi bi-twitter-x" },
    instagram: { url: "", icon: "bi bi-instagram" },
    youtube: { url: "", icon: "bi bi-youtube" }
  }
};

const toFormState = (data = {}) => ({
  phone: {
    display: data.phone?.display || fallbackContact.phone.display,
    link: data.phone?.link || fallbackContact.phone.link
  },
  whatsapp: {
    display: data.whatsapp?.display || fallbackContact.whatsapp.display,
    link: data.whatsapp?.link || fallbackContact.whatsapp.link
  },
  email: {
    display: data.email?.display || fallbackContact.email.display,
    link: data.email?.link || fallbackContact.email.link
  },
  address: {
    primary: data.address?.primary || fallbackContact.address.primary,
    secondary: data.address?.secondary || fallbackContact.address.secondary,
    link: data.address?.link || fallbackContact.address.link
  },
  workingHours: data.workingHours || fallbackContact.workingHours,
  socialMedia: data.socialMedia || fallbackContact.socialMedia
});

export default function AdminContactPage() {
  const {
    data: contactDocs,
    loading,
    error,
    fetchData,
    add,
    update
  } = useFirestore("contact");

  const [formData, setFormData] = useState(() => toFormState(fallbackContact));
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData().catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contactDocs && contactDocs.length > 0) {
      const doc = contactDocs[0];
      const mergedData = {
        phone: doc.phone || fallbackContact.phone,
        whatsapp: doc.whatsapp || fallbackContact.whatsapp,
        email: doc.email || fallbackContact.email,
        address: doc.address || fallbackContact.address,
        workingHours: doc.workingHours || fallbackContact.workingHours,
        socialMedia: doc.socialMedia || fallbackContact.socialMedia
      };
      setFormData(toFormState(mergedData));
    } else {
      setFormData(toFormState(fallbackContact));
    }
  }, [contactDocs]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parts = name.split(".");
    
    if (parts.length === 3 && parts[0] === "socialMedia") {
      // Handle socialMedia.platform.field
      const [, platform, field] = parts;
      setFormData((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [platform]: {
            ...prev.socialMedia[platform],
            [field]: value
          }
        }
      }));
    } else if (parts.length === 2) {
      const [section, field] = parts;
      if (section === "address") {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [field]: value
          }
        }));
      } else if (section === "phone" || section === "whatsapp" || section === "email") {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const payload = {
        phone: {
          display: formData.phone.display.trim(),
          link: formData.phone.link.trim()
        },
        whatsapp: {
          display: formData.whatsapp.display.trim(),
          link: formData.whatsapp.link.trim()
        },
        email: {
          display: formData.email.display.trim(),
          link: formData.email.link.trim()
        },
        address: {
          primary: formData.address.primary.trim(),
          secondary: formData.address.secondary.trim(),
          link: formData.address.link.trim()
        },
        workingHours: formData.workingHours.trim(),
        socialMedia: {
          linkedin: {
            url: (formData.socialMedia?.linkedin?.url || "").trim(),
            icon: formData.socialMedia?.linkedin?.icon || "bi bi-linkedin"
          },
          facebook: {
            url: (formData.socialMedia?.facebook?.url || "").trim(),
            icon: formData.socialMedia?.facebook?.icon || "bi bi-facebook"
          },
          twitter: {
            url: (formData.socialMedia?.twitter?.url || "").trim(),
            icon: formData.socialMedia?.twitter?.icon || "bi bi-twitter-x"
          },
          instagram: {
            url: (formData.socialMedia?.instagram?.url || "").trim(),
            icon: formData.socialMedia?.instagram?.icon || "bi bi-instagram"
          },
          youtube: {
            url: (formData.socialMedia?.youtube?.url || "").trim(),
            icon: formData.socialMedia?.youtube?.icon || "bi bi-youtube"
          }
        }
      };

      const currentDoc = contactDocs && contactDocs.length > 0 ? contactDocs[0] : null;

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
      setSuccessMessage("Contact information updated successfully!");
    } catch (err) {
      setFormError(err.message || "Failed to save contact information");
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('This will initialize Firebase with default contact values from companyData.json. Continue?')) {
      return;
    }

    setInitializing(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const result = await initFirebaseContact();
      if (result.success) {
        setSuccessMessage("Contact data initialized successfully! Refreshing...");
        // Refresh data after initialization
        setTimeout(async () => {
          await fetchData();
        }, 1000);
      } else {
        setFormError(result.message || "Contact data already exists in Firebase.");
      }
    } catch (err) {
      setFormError(err.message || "Failed to initialize contact data");
    } finally {
      setInitializing(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Contact Information Management</h2>
          <p>Manage company contact information displayed across the site</p>
        </div>
      </div>

      <div className="admin-page-content admin-form-container">
        {loading && !contactDocs.length ? (
          <div className="admin-loading">
            <Loader2 size={32} className="admin-spinner" />
            <p>Loading contact information...</p>
          </div>
        ) : error ? (
          <div className="admin-alert admin-alert-error">
            Error loading contact information: {error.message}
          </div>
        ) : contactDocs.length === 0 ? (
          <div className="admin-initialize-prompt">
            <div className="admin-card">
              <h3>No Contact Data Found</h3>
              <p>Contact information hasn't been initialized in Firebase yet.</p>
              <p>Click the button below to initialize Firebase with default values from companyData.json.</p>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleInitialize}
                disabled={initializing}
              >
                {initializing ? (
                  <>
                    <Loader2 size={20} className="admin-spinner" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Initialize with Default Values
                  </>
                )}
              </button>
              {formError && (
                <div className="admin-alert admin-alert-error" style={{ marginTop: '1rem' }}>
                  {formError}
                </div>
              )}
              {successMessage && (
                <div className="admin-alert admin-alert-success" style={{ marginTop: '1rem' }}>
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">{formError}</div>
            )}
            {successMessage && (
              <div className="admin-alert admin-alert-success">{successMessage}</div>
            )}

            {/* Phone Section */}
            <div className="admin-card">
              <div className="admin-card-header">
                <Phone size={20} />
                <h3>Phone</h3>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="phone.display">Display Number *</label>
                  <input
                    type="text"
                    id="phone.display"
                    name="phone.display"
                    value={formData.phone.display}
                    onChange={handleInputChange}
                    placeholder="+971 6 123 4567"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="phone.link">Phone Link *</label>
                  <input
                    type="tel"
                    id="phone.link"
                    name="phone.link"
                    value={formData.phone.link}
                    onChange={handleInputChange}
                    placeholder="tel:+97161234567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="admin-card">
              <div className="admin-card-header">
                <MessageCircle size={20} />
                <h3>WhatsApp</h3>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="whatsapp.display">Display Number *</label>
                  <input
                    type="text"
                    id="whatsapp.display"
                    name="whatsapp.display"
                    value={formData.whatsapp.display}
                    onChange={handleInputChange}
                    placeholder="+971 6 123 4567"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="whatsapp.link">WhatsApp Link *</label>
                  <input
                    type="url"
                    id="whatsapp.link"
                    name="whatsapp.link"
                    value={formData.whatsapp.link}
                    onChange={handleInputChange}
                    placeholder="https://wa.me/97161234567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="admin-card">
              <div className="admin-card-header">
                <Mail size={20} />
                <h3>Email</h3>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="email.display">Email Address *</label>
                  <input
                    type="email"
                    id="email.display"
                    name="email.display"
                    value={formData.email.display}
                    onChange={handleInputChange}
                    placeholder="info@jinan.ae"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="email.link">Email Link *</label>
                  <input
                    type="text"
                    id="email.link"
                    name="email.link"
                    value={formData.email.link}
                    onChange={handleInputChange}
                    placeholder="mailto:info@jinan.ae"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="admin-card">
              <div className="admin-card-header">
                <MapPin size={20} />
                <h3>Address</h3>
              </div>
              <div className="admin-form-group">
                <label htmlFor="address.primary">Primary Address *</label>
                <input
                  type="text"
                  id="address.primary"
                  name="address.primary"
                  value={formData.address.primary}
                  onChange={handleInputChange}
                  placeholder="Sharjah, UAE"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="address.secondary">Secondary Address</label>
                <input
                  type="text"
                  id="address.secondary"
                  name="address.secondary"
                  value={formData.address.secondary}
                  onChange={handleInputChange}
                  placeholder="Orient building - 2nd Floor - Office 23..."
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="address.link">Google Maps Link *</label>
                <input
                  type="url"
                  id="address.link"
                  name="address.link"
                  value={formData.address.link}
                  onChange={handleInputChange}
                  placeholder="https://maps.app.goo.gl/..."
                  required
                />
              </div>
            </div>

            {/* Working Hours Section */}
            <div className="admin-card">
              <div className="admin-card-header">
                <Clock size={20} />
                <h3>Working Hours</h3>
              </div>
              <div className="admin-form-group">
                <label htmlFor="workingHours">Working Hours</label>
                <input
                  type="text"
                  id="workingHours"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                  placeholder="Sunday - Thursday: 9:00 AM - 6:00 PM"
                />
              </div>
            </div>

            {/* Social Media Section */}
            <div className="admin-card">
              <div className="admin-card-header">
                <Share2 size={20} />
                <h3>Social Media</h3>
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="socialMedia.linkedin.url">LinkedIn URL</label>
                <input
                  type="url"
                  id="socialMedia.linkedin.url"
                  name="socialMedia.linkedin.url"
                  value={formData.socialMedia?.linkedin?.url || ""}
                  onChange={handleInputChange}
                  placeholder="https://www.linkedin.com/company/jinan"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="socialMedia.facebook.url">Facebook URL</label>
                <input
                  type="url"
                  id="socialMedia.facebook.url"
                  name="socialMedia.facebook.url"
                  value={formData.socialMedia?.facebook?.url || ""}
                  onChange={handleInputChange}
                  placeholder="https://www.facebook.com/jinan.ae"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="socialMedia.twitter.url">Twitter/X URL</label>
                <input
                  type="url"
                  id="socialMedia.twitter.url"
                  name="socialMedia.twitter.url"
                  value={formData.socialMedia?.twitter?.url || ""}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/jinan_ae"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="socialMedia.instagram.url">Instagram URL</label>
                <input
                  type="url"
                  id="socialMedia.instagram.url"
                  name="socialMedia.instagram.url"
                  value={formData.socialMedia?.instagram?.url || ""}
                  onChange={handleInputChange}
                  placeholder="https://www.instagram.com/jinan.ae"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="socialMedia.youtube.url">YouTube URL</label>
                <input
                  type="url"
                  id="socialMedia.youtube.url"
                  name="socialMedia.youtube.url"
                  value={formData.socialMedia?.youtube?.url || ""}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/@jinan"
                />
              </div>
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
                    Save Contact Information
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
