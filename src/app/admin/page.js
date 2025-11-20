"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  FileText,
  Users,
  User,
  HelpCircle,
  Building2,
  Plus,
  ArrowRight,
  Navigation,
  Mail,
  Briefcase,
  Info
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    banners: 0,
    blogs: 0,
    team: 0,
    projects: 0,
    faqs: 0,
    users: 0
  });

  useEffect(() => {
    // Load stats from JSON files
    const loadStats = async () => {
      try {
        const [bannerRes, blogRes, teamRes, projectRes, faqRes] = await Promise.all([
          fetch('/src/data/banner-data.json').catch(() => null),
          fetch('/src/data/blog-data.json').catch(() => null),
          fetch('/src/data/team-data.json').catch(() => null),
          fetch('/src/data/project-section-data.json').catch(() => null),
          fetch('/src/data/faq-data.json').catch(() => null)
        ]);

        if (bannerRes) {
          const bannerData = await bannerRes.json();
          setStats(prev => ({ ...prev, banners: Array.isArray(bannerData) ? bannerData.length : 0 }));
        }
        if (blogRes) {
          const blogData = await blogRes.json();
          setStats(prev => ({ ...prev, blogs: blogData.blog_grid?.length || 0 }));
        }
        if (teamRes) {
          const teamData = await teamRes.json();
          setStats(prev => ({ ...prev, team: Array.isArray(teamData) ? teamData.length : 0 }));
        }
        if (projectRes) {
          const projectData = await projectRes.json();
          // Projects data structure: { sectionTitle: {...}, projects: [...] }
          setStats(prev => ({ 
            ...prev, 
            projects: projectData.projects && Array.isArray(projectData.projects) 
              ? projectData.projects.length 
              : (Array.isArray(projectData) ? projectData.length : 0)
          }));
        }
        if (faqRes) {
          const faqData = await faqRes.json();
          setStats(prev => ({ ...prev, faqs: Array.isArray(faqData) ? faqData.length : 0 }));
        }

        // Load users count from Firestore
        try {
          const { getDocuments } = await import('@/utils/firestore');
          const users = await getDocuments('users');
          setStats(prev => ({ ...prev, users: users?.length || 0 }));
        } catch (error) {
          console.error('Error loading users count:', error);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  const quickActions = [
    { label: 'Add New Banner', link: '/admin/banner', icon: ImageIcon, color: '#4CAF50' },
    { label: 'Create Blog Post', link: '/admin/blog', icon: FileText, color: '#2196F3' },
    { label: 'Add Team Member', link: '/admin/team', icon: Users, color: '#FF9800' },
    { label: 'Add Project', link: '/admin/projects', icon: Building2, color: '#9C27B0' }
  ];

  const statCards = [
    { label: 'Banners', value: stats.banners, icon: ImageIcon, link: '/admin/banner', color: '#4CAF50' },
    { label: 'Blog Posts', value: stats.blogs, icon: FileText, link: '/admin/blog', color: '#2196F3' },
    { label: 'Team Members', value: stats.team, icon: Users, link: '/admin/team', color: '#FF9800' },
    { label: 'Projects', value: stats.projects, icon: Building2, link: '/admin/projects', color: '#9C27B0' },
    { label: 'Users', value: stats.users, icon: User, link: '/admin/users', color: '#00BCD4' },
    { label: 'FAQs', value: stats.faqs, icon: HelpCircle, link: '/admin/faq', color: '#F44336' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to the content management system</p>
      </div>

      <div className="admin-dashboard-stats">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Link key={index} href={stat.link} className="admin-stat-card">
              <div className="admin-stat-card-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <IconComponent size={24} />
              </div>
              <div className="admin-stat-card-content">
                <h3 className="admin-stat-card-value">{stat.value}</h3>
                <p className="admin-stat-card-label">{stat.label}</p>
              </div>
              <div className="admin-stat-card-arrow">
                <ArrowRight size={20} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="admin-dashboard-section">
        <h3 className="admin-dashboard-section-title">Quick Actions</h3>
        <div className="admin-quick-actions">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link key={index} href={action.link} className="admin-quick-action-card">
                <div className="admin-quick-action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                  <IconComponent size={24} />
                </div>
                <span className="admin-quick-action-label">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="admin-dashboard-section">
        <h3 className="admin-dashboard-section-title">Content Management</h3>
        <div className="admin-content-links">
          <Link href="/admin/banner" className="admin-content-link">
            <span className="admin-content-link-icon">
              <ImageIcon size={32} />
            </span>
            <div>
              <h4>Banner Content</h4>
              <p>Manage homepage banners and slides</p>
            </div>
          </Link>
          <Link href="/admin/blog" className="admin-content-link">
            <span className="admin-content-link-icon">
              <FileText size={32} />
            </span>
            <div>
              <h4>Blog Posts</h4>
              <p>Create and manage blog articles</p>
            </div>
          </Link>
          <Link href="/admin/about" className="admin-content-link">
            <span className="admin-content-link-icon">
              <Info size={32} />
            </span>
            <div>
              <h4>About Section</h4>
              <p>Manage About content and imagery</p>
            </div>
          </Link>
          <Link href="/admin/navigation" className="admin-content-link">
            <span className="admin-content-link-icon">
              <Navigation size={32} />
            </span>
            <div>
              <h4>Navigation Menu</h4>
              <p>Configure site navigation structure</p>
            </div>
          </Link>
          <Link href="/admin/team" className="admin-content-link">
            <span className="admin-content-link-icon">
              <Users size={32} />
            </span>
            <div>
              <h4>Team Members</h4>
              <p>Manage team member profiles</p>
            </div>
          </Link>
          <Link href="/admin/users" className="admin-content-link">
            <span className="admin-content-link-icon">
              <User size={32} />
            </span>
            <div>
              <h4>Users</h4>
              <p>View and manage registered users</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

