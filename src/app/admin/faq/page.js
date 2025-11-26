"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/hooks/useFirebase";
import faqData from "@/data/faq-data.json";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import TranslateButton from '@/components/admin/TranslateButton';

const fallbackFAQ = {
  title: {
    span: faqData.title?.span || "Frequently Asked Questions",
    heading: faqData.title?.heading || "Got Questions About GUPD?",
    description: faqData.title?.description || "We understand you have questions about our real estate and construction services. Here are answers to the most common questions we receive."
  },
  button: {
    text: faqData.button?.text || "Contact Us Now",
    link: faqData.button?.link || "/contact"
  },
  faqs: Array.isArray(faqData.faqs) && faqData.faqs.length > 0
    ? faqData.faqs
    : [{ id: "faq-1", question: "", answer: "", delay: "200ms" }]
};

const toFormState = (data = {}) => ({
  title: {
    span: data.title?.span || fallbackFAQ.title.span,
    spanArabic: data.title?.spanArabic || "",
    heading: data.title?.heading || fallbackFAQ.title.heading,
    headingArabic: data.title?.headingArabic || "",
    description: data.title?.description || fallbackFAQ.title.description,
    descriptionArabic: data.title?.descriptionArabic || ""
  },
  button: {
    text: data.button?.text || fallbackFAQ.button.text,
    textArabic: data.button?.textArabic || "",
    link: data.button?.link || fallbackFAQ.button.link
  },
  faqs:
    Array.isArray(data.faqs) && data.faqs.length > 0
      ? data.faqs.map((faq, index) => ({
          id: faq.id || `faq-${index + 1}`,
          question: faq.question || "",
          questionArabic: faq.questionArabic || "",
          answer: faq.answer || "",
          answerArabic: faq.answerArabic || "",
          delay: faq.delay || `${(index + 1) * 200}ms`
        }))
      : [{ id: "faq-1", question: "", questionArabic: "", answer: "", answerArabic: "", delay: "200ms" }]
});

export default function AdminFAQPage() {
  const {
    data: faqDocs,
    loading,
    error,
    fetchData,
    add,
    update
  } = useFirestore("faq");

  const [formData, setFormData] = useState(() => toFormState(fallbackFAQ));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData().catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (faqDocs && faqDocs.length > 0) {
      const doc = faqDocs[0];
      setFormData(toFormState(doc));
    } else {
      setFormData(toFormState(fallbackFAQ));
    }
  }, [faqDocs]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [parent, child] = name.split('.');
    
    if (parent === 'title' || parent === 'button') {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFAQChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [field]: value
      };
      return {
        ...prev,
        faqs: updatedFaqs
      };
    });
  };

  const addFAQ = () => {
    setFormData((prev) => {
      const newIndex = prev.faqs.length + 1;
      return {
        ...prev,
        faqs: [
          ...prev.faqs,
          {
            id: `faq-${newIndex}`,
            question: "",
            questionArabic: "",
            answer: "",
            answerArabic: "",
            delay: `${newIndex * 200}ms`
          }
        ]
      };
    });
  };

  const removeFAQ = (index) => {
    if (formData.faqs.length <= 1) {
      alert("You must have at least one FAQ item");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const dataToSave = {
        title: formData.title,
        button: formData.button,
        faqs: formData.faqs.filter(faq => faq.question.trim() !== "" || faq.answer.trim() !== "")
      };

      if (faqDocs && faqDocs.length > 0) {
        await update(faqDocs[0].id, dataToSave);
        setSuccessMessage("FAQ section updated successfully!");
      } else {
        await add(dataToSave);
        setSuccessMessage("FAQ section created successfully!");
      }

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error saving FAQ:", err);
      setFormError(err.message || "Failed to save FAQ section");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>FAQ Management</h2>
          <p>Manage frequently asked questions and section content</p>
        </div>
      </div>

      <div className="admin-page-content admin-form-container">
        {loading && !faqDocs.length ? (
          <div className="admin-loading">
            <Loader2 size={32} className="admin-spinner" />
            <p>Loading FAQ content...</p>
          </div>
        ) : error ? (
          <div className="admin-alert admin-alert-error">
            Error loading FAQ content: {error.message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-form">
            {formError && (
              <div className="admin-alert admin-alert-error">{formError}</div>
            )}
            {successMessage && (
              <div className="admin-alert admin-alert-success">{successMessage}</div>
            )}

            <h3 className="admin-section-title">Section Title</h3>
            
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="title.span">Title Span (English) *</label>
                <input
                  type="text"
                  id="title.span"
                  name="title.span"
                  value={formData.title.span}
                  onChange={handleInputChange}
                  placeholder="e.g., Frequently Asked Questions"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="title.spanArabic">
                  Title Span (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, spanArabic: translated }
                    }))}
                    englishText={formData.title.span}
                  />
                </label>
                <input
                  type="text"
                  id="title.spanArabic"
                  name="title.spanArabic"
                  value={formData.title.spanArabic}
                  onChange={handleInputChange}
                  placeholder="مثل: الأسئلة الشائعة"
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="title.heading">Title Heading (English) *</label>
                <input
                  type="text"
                  id="title.heading"
                  name="title.heading"
                  value={formData.title.heading}
                  onChange={handleInputChange}
                  placeholder="e.g., Got Questions About GUPD?"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="title.headingArabic">
                  Title Heading (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, headingArabic: translated }
                    }))}
                    englishText={formData.title.heading}
                  />
                </label>
                <input
                  type="text"
                  id="title.headingArabic"
                  name="title.headingArabic"
                  value={formData.title.headingArabic}
                  onChange={handleInputChange}
                  placeholder="مثل: لديك أسئلة حول GUPD؟"
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="title.description">Title Description (English) *</label>
                <textarea
                  id="title.description"
                  name="title.description"
                  value={formData.title.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter description text"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="title.descriptionArabic">
                  Title Description (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, descriptionArabic: translated }
                    }))}
                    englishText={formData.title.description}
                  />
                </label>
                <textarea
                  id="title.descriptionArabic"
                  name="title.descriptionArabic"
                  value={formData.title.descriptionArabic}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="أدخل نص الوصف"
                  required
                />
              </div>
            </div>

            <h3 className="admin-section-title">Button</h3>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="button.text">Button Text (English) *</label>
                <input
                  type="text"
                  id="button.text"
                  name="button.text"
                  value={formData.button.text}
                  onChange={handleInputChange}
                  placeholder="e.g., Contact Us Now"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="button.textArabic">
                  Button Text (Arabic) *
                  <TranslateButton
                    onTranslate={(translated) => setFormData(prev => ({
                      ...prev,
                      button: { ...prev.button, textArabic: translated }
                    }))}
                    englishText={formData.button.text}
                  />
                </label>
                <input
                  type="text"
                  id="button.textArabic"
                  name="button.textArabic"
                  value={formData.button.textArabic}
                  onChange={handleInputChange}
                  placeholder="مثل: اتصل بنا الآن"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="button.link">Button Link *</label>
              <input
                type="text"
                id="button.link"
                name="button.link"
                value={formData.button.link}
                onChange={handleInputChange}
                placeholder="e.g., /contact"
                required
              />
            </div>

            <h3 className="admin-section-title">
              FAQ Items
              <button
                type="button"
                onClick={addFAQ}
                className="admin-btn admin-btn-secondary"
                style={{ marginLeft: '10px' }}
              >
                <Plus size={16} />
                Add FAQ
              </button>
            </h3>

            {formData.faqs.map((faq, index) => (
              <div key={faq.id || index} className="admin-card" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ margin: 0 }}>FAQ #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="admin-btn-icon admin-btn-danger"
                    disabled={formData.faqs.length <= 1}
                    title="Remove FAQ"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor={`faq-${index}-question`}>
                      Question (English) *
                    </label>
                    <input
                      type="text"
                      id={`faq-${index}-question`}
                      value={faq.question}
                      onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                      placeholder="e.g., How can I buy an apartment through GUPD?"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor={`faq-${index}-questionArabic`}>
                      Question (Arabic) *
                      <TranslateButton
                        onTranslate={(translated) => handleFAQChange(index, 'questionArabic', translated)}
                        englishText={faq.question}
                      />
                    </label>
                    <input
                      type="text"
                      id={`faq-${index}-questionArabic`}
                      value={faq.questionArabic}
                      onChange={(e) => handleFAQChange(index, 'questionArabic', e.target.value)}
                      placeholder="مثل: كيف يمكنني شراء شقة من خلال GUPD؟"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor={`faq-${index}-answer`}>
                      Answer (English) *
                    </label>
                    <textarea
                      id={`faq-${index}-answer`}
                      value={faq.answer}
                      onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                      rows={4}
                      placeholder="Enter the answer"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor={`faq-${index}-answerArabic`}>
                      Answer (Arabic) *
                      <TranslateButton
                        onTranslate={(translated) => handleFAQChange(index, 'answerArabic', translated)}
                        englishText={faq.answer}
                      />
                    </label>
                    <textarea
                      id={`faq-${index}-answerArabic`}
                      value={faq.answerArabic}
                      onChange={(e) => handleFAQChange(index, 'answerArabic', e.target.value)}
                      rows={4}
                      placeholder="أدخل الإجابة"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="admin-form-actions">
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="admin-spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save FAQ Section
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
