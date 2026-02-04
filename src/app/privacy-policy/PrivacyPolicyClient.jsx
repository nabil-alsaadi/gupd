"use client";

import React from "react";
import PolicyContent from "@/components/PolicyContent";

export default function PrivacyPolicyClient({ privacyData }) {
  return (
    <PolicyContent data={privacyData} className="privacy-policy-page" />
  );
}
