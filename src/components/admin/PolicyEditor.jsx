"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold", "italic", "underline",
  "list", "bullet",
  "link",
];

export default function PolicyEditor({ value, onChange, placeholder, minHeight = 320 }) {
  const quillModules = useMemo(() => modules, []);

  return (
    <div className="admin-policy-editor-wrapper policy-editor-wrapper">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={quillModules}
        formats={formats}
        placeholder={placeholder}
        style={{ minHeight }}
        className="policy-quill-editor"
      />
    </div>
  );
}
