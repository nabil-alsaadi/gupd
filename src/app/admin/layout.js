"use client";
import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import './globals.css';

export default function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const isSetupPage = pathname === '/admin/setup';

  // Don't wrap login or setup pages with admin layout and auth guard
  if (isLoginPage || isSetupPage) {
    return <>{children}</>;
  }

  // For all other admin pages, require authentication
  return (
    <AdminAuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthGuard>
  );
}

