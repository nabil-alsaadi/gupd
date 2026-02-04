"use client";

import { useEffect, useState, useCallback } from "react";
import { useFirestore } from "@/hooks/useFirebase";
import PolicyEditor from "@/components/admin/PolicyEditor";
import privacyFallback from "@/data/privacy-policy.json";
import termsFallback from "@/data/terms-conditions.json";
import supportFallback from "@/data/support-policy.json";
import { Save, Loader2, FileText, Shield, Headphones } from "lucide-react";
import TranslateButton from "@/components/admin/TranslateButton";

const TYPES = [
  { id: "privacy", label: "Privacy Policy", icon: Shield },
  { id: "terms", label: "Terms & Conditions", icon: FileText },
  { id: "support", label: "Support Policy", icon: Headphones },
];

const FALLBACKS = {
  privacy: privacyFallback,
  terms: termsFallback,
  support: supportFallback,
};

function toFormState(type, doc) {
  const fallback = FALLBACKS[type];
  const base = { ...fallback, contentAr: fallback.contentAr ?? "", titleAr: fallback.titleAr ?? "" };
  if (!doc) return base;
  return {
    title: doc.title ?? fallback.title,
    titleAr: doc.titleAr ?? "",
    lastUpdated: doc.lastUpdated ?? fallback.lastUpdated,
    company: doc.company ?? fallback.company,
    content: doc.content ?? fallback.content,
    contentAr: doc.contentAr ?? "",
  };
}

export default function AdminPoliciesPage() {
  const { data: policyDocs, loading, error, fetchData, add, update } = useFirestore("policies");

  const [activeTab, setActiveTab] = useState("privacy");
  const [formData, setFormData] = useState(() => ({
    privacy: toFormState("privacy", null),
    terms: toFormState("terms", null),
    support: toFormState("support", null),
  }));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const syncFromDocs = useCallback(() => {
    if (!policyDocs) return;
    setFormData((prev) => {
      const next = { ...prev };
      TYPES.forEach(({ id }) => {
        const doc = policyDocs.find((d) => d.type === id);
        next[id] = toFormState(id, doc);
      });
      return next;
    });
  }, [policyDocs]);

  // Fetch once on mount (don't depend on fetchData to avoid re-fetch loop)
  useEffect(() => {
    fetchData().catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (policyDocs && policyDocs.length >= 0) {
      syncFromDocs();
    } else {
      setFormData({
        privacy: toFormState("privacy", null),
        terms: toFormState("terms", null),
        support: toFormState("support", null),
      });
    }
  }, [policyDocs, syncFromDocs]);

  const current = formData[activeTab] || {};
  const fallback = FALLBACKS[activeTab];

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const payload = {
        type: activeTab,
        title: current.title || fallback.title,
        titleAr: current.titleAr ?? "",
        lastUpdated: current.lastUpdated || fallback.lastUpdated,
        company: current.company || fallback.company,
        content: current.content ?? fallback.content,
        contentAr: current.contentAr ?? "",
      };

      const existing = policyDocs?.find((d) => d.type === activeTab);
      if (existing) {
        await update(existing.id, payload);
        setSuccessMessage(`${TYPES.find((t) => t.id === activeTab)?.label} updated successfully.`);
      } else {
        await add(payload);
        setSuccessMessage(`${TYPES.find((t) => t.id === activeTab)?.label} created successfully.`);
      }
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error saving policy:", err);
      setFormError(err?.message || "Failed to save policy.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Policies</h2>
          <p>Edit Privacy Policy, Terms & Conditions, and Support Policy content</p>
        </div>
      </div>

      <div className="admin-page-content admin-form-container">
        {loading ? (
          <div className="admin-loading">
            <Loader2 size={32} className="admin-spinner" />
            <p>Loading policies...</p>
          </div>
        ) : error ? (
          <div className="admin-alert admin-alert-error">Error loading policies: {error.message}</div>
        ) : (
          <>
            <div className="admin-policies-tabs">
              {TYPES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`admin-policies-tab ${activeTab === id ? "active" : ""}`}
                  onClick={() => setActiveTab(id)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              {formError && <div className="admin-alert admin-alert-error">{formError}</div>}
              {successMessage && (
                <div className="admin-alert admin-alert-success">{successMessage}</div>
              )}

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="policy-title">Title (English)</label>
                  <input
                    id="policy-title"
                    type="text"
                    value={current.title ?? ""}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="e.g. Privacy Policy"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="policy-titleAr">
                    Title (Arabic / العنوان بالعربية)
                    <TranslateButton
                      englishText={current.title ?? ""}
                      onTranslate={(translated) => handleFieldChange("titleAr", translated)}
                      size="small"
                    />
                  </label>
                  <input
                    id="policy-titleAr"
                    type="text"
                    value={current.titleAr ?? ""}
                    onChange={(e) => handleFieldChange("titleAr", e.target.value)}
                    placeholder="مثل: سياسة الخصوصية"
                  />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="policy-lastUpdated">Last Updated</label>
                  <input
                    id="policy-lastUpdated"
                    type="text"
                    value={current.lastUpdated ?? ""}
                    onChange={(e) => handleFieldChange("lastUpdated", e.target.value)}
                    placeholder="e.g. January 2025"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Content (English)</label>
                <PolicyEditor
                  value={current.content ?? ""}
                  onChange={(value) => handleFieldChange("content", value)}
                  placeholder="Enter policy content in English..."
                  minHeight={400}
                />
              </div>

              <div className="admin-form-group">
                <label>
                  Content (Arabic / المحتوى بالعربية)
                  <TranslateButton
                    englishText={current.content ?? ""}
                    onTranslate={(translated) => handleFieldChange("contentAr", translated)}
                    size="small"
                    preserveHtml
                  />
                </label>
                <PolicyEditor
                  value={current.contentAr ?? ""}
                  onChange={(value) => handleFieldChange("contentAr", value)}
                  placeholder="أدخل محتوى السياسة بالعربية..."
                  minHeight={400}
                />
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 size={18} className="admin-spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save {TYPES.find((t) => t.id === activeTab)?.label}
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
