"use client";

import React from "react";
import PolicyContent from "@/components/PolicyContent";

export default function SupportPolicyClient({ supportData }) {
  return (
    <PolicyContent data={supportData} className="support-policy-page" />
  );
}
