"use client";

import React from "react";
import PolicyContent from "@/components/PolicyContent";

export default function TermsConditionsClient({ termsData }) {
  return (
    <PolicyContent data={termsData} className="terms-conditions-page" />
  );
}
