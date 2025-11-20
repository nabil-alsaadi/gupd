"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Shield, AlertCircle } from 'lucide-react';

export default function AdminAuthGuard({ children }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) {
      return; // Still loading auth state
    }

    if (!user) {
      // Not logged in, redirect to admin login
      router.push('/admin/login');
      return;
    }

    // Wait for userData to load
    if (!userData) {
      // User is logged in but userData hasn't loaded yet, keep checking
      return;
    }

    // Check if user has admin role
    const isAdmin = userData.role === 'admin';
    
    if (!isAdmin) {
      setChecking(false);
      // Not an admin, show access denied
      return;
    }

    // User is admin, allow access
    setChecking(false);
  }, [user, userData, loading, router]);

  // Show loading state - wait for auth and userData to load
  if (loading || checking || (user && !userData)) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        gap: '20px'
      }}>
        <Loader2 size={48} className="admin-spinner" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#666', fontSize: '16px' }}>Checking admin access...</p>
      </div>
    );
  }

  // User is not admin
  if (user && userData?.role !== 'admin') {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        gap: '20px',
        padding: '40px'
      }}>
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <AlertCircle size={48} style={{ color: '#ff9800', marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '10px', color: '#333' }}>Access Denied</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            You don't have permission to access the admin panel. Only administrators can access this area.
          </p>
          <p style={{ color: '#999', fontSize: '14px' }}>
            Your current role: <strong>{userData?.role || 'developer'}</strong>
          </p>
          <button
            onClick={() => router.push('/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // User is admin, render children
  return <>{children}</>;
}

