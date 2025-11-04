"use client";
import { useState, useEffect } from 'react';
import { User, Clock } from 'lucide-react';

const AdminHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
          <div className="admin-header-user">
            <div className="admin-header-user-avatar">
              <User size={20} />
            </div>
            <div className="admin-header-user-info">
              <span className="admin-header-user-name">Admin User</span>
              <span className="admin-header-user-role">Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

