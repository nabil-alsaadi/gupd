"use client";
import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirebase';
import { updateDocument } from '@/utils/firestore';
import { 
  User,
  Mail,
  Calendar,
  Shield,
  Loader2,
  Search,
  Edit2,
  Save,
  X
} from 'lucide-react';

export default function AdminUsersPage() {
  const { data: users, loading, error, fetchData, update } = useFirestore('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingRole, setEditingRole] = useState('');
  const [saving, setSaving] = useState(false);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    fetchData({ orderBy: { field: 'createdAt', direction: 'desc' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const filtered = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
          user.email?.toLowerCase().includes(searchLower) ||
          user.displayName?.toLowerCase().includes(searchLower) ||
          user.role?.toLowerCase().includes(searchLower)
        );
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [users, searchTerm]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'developer':
        return '#2196F3';
      case 'admin':
        return '#F44336';
      case 'user':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const handleEditRole = (user) => {
    setEditingUserId(user.id);
    setEditingRole(user.role || 'developer');
    setUpdateError('');
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditingRole('');
    setUpdateError('');
  };

  const handleSaveRole = async (userId) => {
    if (!editingRole || editingRole.trim() === '') {
      setUpdateError('Please select a role');
      return;
    }

    setSaving(true);
    setUpdateError('');

    try {
      await update(userId, { role: editingRole.trim() });
      setEditingUserId(null);
      setEditingRole('');
      // Data will be refreshed automatically by useFirestore hook
    } catch (error) {
      console.error('Error updating user role:', error);
      setUpdateError(error.message || 'Failed to update user role');
    } finally {
      setSaving(false);
    }
  };

  const availableRoles = [
    { value: 'developer', label: 'Developer', color: '#2196F3' },
    { value: 'admin', label: 'Admin', color: '#F44336' },
    { value: 'user', label: 'User', color: '#4CAF50' }
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Users Management</h2>
          <p>View and manage registered users - Assign roles and permissions</p>
        </div>
      </div>

      <div className="admin-page-content">
        {loading ? (
          <div className="admin-loading">
            <Loader2 size={32} className="admin-spinner" />
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="admin-alert admin-alert-error">
            Error loading users: {error.message}
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="admin-search-bar" style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', maxWidth: '400px' }}>
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#666'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                Showing {filteredUsers.length} of {users?.length || 0} users
              </div>
            </div>

            {/* Users Table */}
            {filteredUsers.length === 0 ? (
              <div className="admin-empty-state">
                <User size={64} />
                <h3>No users found</h3>
                <p>{searchTerm ? 'Try adjusting your search terms' : 'No users have registered yet'}</p>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div 
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: getRoleBadgeColor(user.role),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: '16px'
                              }}
                            >
                              {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <strong>{user.displayName || 'No Name'}</strong>
                              {user.id && (
                                <p style={{ fontSize: '12px', color: '#666', margin: '2px 0 0 0' }}>
                                  ID: {user.id.substring(0, 8)}...
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail size={14} style={{ color: '#666' }} />
                            <span>{user.email || 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          <span 
                            className="admin-badge"
                            style={{ 
                              backgroundColor: `${getRoleBadgeColor(user.role)}20`,
                              color: getRoleBadgeColor(user.role),
                              border: `1px solid ${getRoleBadgeColor(user.role)}40`
                            }}
                          >
                            <Shield size={12} style={{ marginRight: '4px' }} />
                            {user.role || 'developer'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={14} style={{ color: '#666' }} />
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </td>
                        <td>
                          {editingUserId === user.id ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
                              <select
                                value={editingRole}
                                onChange={(e) => setEditingRole(e.target.value)}
                                disabled={saving}
                                style={{
                                  padding: '6px 10px',
                                  border: '1px solid #ddd',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  cursor: saving ? 'not-allowed' : 'pointer'
                                }}
                              >
                                {availableRoles.map(role => (
                                  <option key={role.value} value={role.value}>
                                    {role.label}
                                  </option>
                                ))}
                              </select>
                              {updateError && (
                                <div style={{ color: '#F44336', fontSize: '12px' }}>{updateError}</div>
                              )}
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => handleSaveRole(user.id)}
                                  disabled={saving}
                                  style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    opacity: saving ? 0.6 : 1
                                  }}
                                >
                                  <Save size={14} />
                                  {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  disabled={saving}
                                  style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#757575',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    opacity: saving ? 0.6 : 1
                                  }}
                                >
                                  <X size={14} />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditRole(user)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#2196F3',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Edit2 size={14} />
                              Edit Role
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

