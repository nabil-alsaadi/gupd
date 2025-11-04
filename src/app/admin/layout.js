"use client";
import AdminLayout from '@/components/admin/AdminLayout';
import './globals.css';

export default function AdminLayoutWrapper({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

