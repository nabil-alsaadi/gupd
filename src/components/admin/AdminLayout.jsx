"use client";
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { SidebarContext } from './SidebarContext';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="admin-layout">
        <AdminSidebar />
        <div className={`admin-main ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <AdminHeader />
          <div className="admin-content">
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default AdminLayout;

