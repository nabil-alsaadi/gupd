"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

/**
 * Renders a policy page (Privacy, Terms, Support) from data with a single HTML content string.
 * data: { title, lastUpdated, company, content, contentAr? } | null
 * Shows content or contentAr based on current i18n language.
 */
export default function PolicyContent({ data, className = "policy-page", emptyMessage = "This policy is not available yet." }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar") ?? false;
  const displayTitle = data ? (isArabic && data.titleAr?.trim() ? data.titleAr : data.title) : "";
  const displayContent = data ? (isArabic && data.contentAr?.trim() ? data.contentAr : data.content) : "";

  if (!data) {
    return (
      <div className={`${className} pt-120 mb-120`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="policy-empty text-center py-5">
                <p className="text-muted mb-0">{emptyMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!displayContent || displayContent.trim() === "") {
    return (
      <div className={`${className} pt-120 mb-120`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="policy-header mb-50">
                {displayTitle && <h1>{displayTitle}</h1>}
                {data.lastUpdated && (
                  <p className="last-updated">Last Updated: {data.lastUpdated}</p>
                )}
              </div>
              <div className="policy-empty text-center py-5">
                <p className="text-muted mb-0">{emptyMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { lastUpdated, company } = data;

  return (
    <div className={`${className} pt-120 mb-120`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="policy-header mb-50">
              <h1>{displayTitle}</h1>
              {lastUpdated && (
                <p className="last-updated">Last Updated: {lastUpdated}</p>
              )}
            </div>

            <div
              className="policy-content"
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />

            {company && (
              <div className="policy-footer mt-50">
                <p>
                  <strong>
                    {company.name}
                    {company.shortName && company.shortName !== company.name
                      ? ` (${company.shortName})`
                      : ""}
                  </strong>
                </p>
                {company.address && <p>{company.address}</p>}
                {(company.email || company.phone) && (
                  <p>
                    {company.email && (
                      <>
                        <Link href={`mailto:${company.email}`}>
                          {company.email}
                        </Link>
                        {company.phone && " | "}
                      </>
                    )}
                    {company.phone && (
                      <Link href={`tel:${company.phone.replace(/\s/g, "")}`}>
                        {company.phone}
                      </Link>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
