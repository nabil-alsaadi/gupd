"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import {
  LayoutDashboard,
  Image,
  FileText,
  Navigation,
  Users,
  User,
  HelpCircle,
  Building2,
  Briefcase,
  Mail,
  Building,
  Home,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageSquare
} from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const isOpen = isSidebarOpen;
  const setIsOpen = setIsSidebarOpen;

  const menuCategories = [
    {
      id: 'main',
      label: 'Main',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          link: '/admin',
          exact: true
        }
      ]
    },
    {
      id: 'content',
      label: 'Content',
      items: [
        {
          id: 'banner',
          label: 'Banner Content',
          icon: Image,
          link: '/admin/banner'
        },
        {
          id: 'about',
          label: 'About Section',
          icon: Info,
          link: '/admin/about'
        },
        {
          id: 'blog',
          label: 'Blog Posts',
          icon: FileText,
          link: '/admin/blog'
        },
        {
          id: 'projects',
          label: 'Projects',
          icon: Building2,
          link: '/admin/projects'
        },
        {
          id: 'faq',
          label: 'FAQs',
          icon: HelpCircle,
          link: '/admin/faq'
        }
      ]
    },
    {
      id: 'management',
      label: 'Management',
      items: [
        {
          id: 'team',
          label: 'Team Members',
          icon: Users,
          link: '/admin/team'
        },
        {
          id: 'users',
          label: 'Users',
          icon: User,
          link: '/admin/users'
        },
        {
          id: 'contact',
          label: 'Contact Content',
          icon: Mail,
          link: '/admin/contact'
        },
        {
          id: 'messages',
          label: 'Contact Messages',
          icon: MessageSquare,
          link: '/admin/messages'
        }
      ]
    }
  ];

  const isActive = (link, exact = false) => {
    if (exact) {
      return pathname === link;
    }
    return pathname?.startsWith(link);
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="admin-sidebar-header">
        <h2 className="admin-sidebar-logo">GUPD Admin</h2>
        <button 
          className="admin-sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="admin-sidebar-nav">
        {menuCategories.map((category) => (
          <div key={category.id} className="admin-sidebar-category">
            {isOpen && category.label !== 'Main' && (
              <div className="admin-sidebar-category-label">
                {category.label}
              </div>
            )}
            <ul className="admin-sidebar-menu">
              {category.items.map((item) => (
                <li key={item.id} className="admin-sidebar-menu-item">
                  <Link 
                    href={item.link}
                    className={`admin-sidebar-link ${isActive(item.link, item.exact) ? 'active' : ''}`}
                  >
                    <span className="admin-sidebar-icon">
                      <item.icon size={20} />
                    </span>
                    {isOpen && <span className="admin-sidebar-label">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-sidebar-link">
          <span className="admin-sidebar-icon">
            <Home size={20} />
          </span>
          {isOpen && <span className="admin-sidebar-label">Back to Site</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;

