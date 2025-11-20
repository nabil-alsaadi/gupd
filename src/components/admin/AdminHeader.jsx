"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Clock, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { userData, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      router.push('/admin/login');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="admin-header-left">
          <h1 className="admin-header-title">Content Management</h1>
          <p className="admin-header-subtitle">Manage your website content</p>
        </div>
        <div className="admin-header-right">
          <div className="admin-header-time">
            <Clock size={16} className="admin-header-time-icon" />
            <div>
              <span className="admin-header-time-display">{formatTime(currentTime)}</span>
              <span className="admin-header-date-display">{formatDate(currentTime)}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="admin-header-user" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div 
                className="admin-header-user-avatar"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#F44336',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                {userData?.displayName?.charAt(0)?.toUpperCase() || userData?.email?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="admin-header-user-info">
                <span className="admin-header-user-name">{userData?.displayName || userData?.email || 'Admin'}</span>
                <span className="admin-header-user-role" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                  <Shield size={12} />
                  {userData?.role === 'admin' ? 'Administrator' : userData?.role || 'Admin'}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#666',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.borderColor = '#999';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#ddd';
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

