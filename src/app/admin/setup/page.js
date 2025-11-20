"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { updateDocument, getDocuments } from '@/utils/firestore';
import { Shield, User, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

/**
 * One-time setup page to create the first admin
 * This page should be removed or protected after initial setup
 */
export default function AdminSetupPage() {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [hasAdmin, setHasAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if setup is disabled via environment variable
    const isSetupDisabled = process.env.NEXT_PUBLIC_DISABLE_SETUP_PAGE === 'true';
    if (isSetupDisabled) {
      setHasAdmin(true);
      setChecking(false);
      setError('Setup page is disabled. Please use the admin panel to manage users.');
      return;
    }

    // Fetch all users to check if any admin exists
    const checkAdmins = async () => {
      try {
        const allUsers = await getDocuments('users');
        setUsers(allUsers);
        
        // Check if any admin exists
        const adminExists = allUsers.some(u => u.role === 'admin');
        setHasAdmin(adminExists);
        
        if (adminExists) {
          setError('Setup page is disabled. An admin already exists. Please use the admin login page or manage users from the admin panel.');
        }
      } catch (err) {
        console.error('Error checking users:', err);
        setError('Error checking admin status. Please try again.');
      } finally {
        setChecking(false);
      }
    };
    
    checkAdmins();
  }, []);

  const handleSearch = async () => {
    if (hasAdmin) {
      setError('Setup page is disabled. An admin already exists.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    setSearching(true);
    setError('');
    setSuccess('');

    try {
      const allUsers = await getDocuments('users');
      const foundUser = allUsers.find(u => 
        u.email?.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        setError('User not found. Please make sure the user has signed up first.');
        setSearching(false);
        return;
      }

      // Update user role to admin
      await updateDocument('users', foundUser.id, { role: 'admin' });
      
      setSuccess(`Success! ${foundUser.email} is now an admin. You can now login at /admin/login`);
      setEmail('');
      
      // Refresh users list and check admin status
      const updatedUsers = await getDocuments('users');
      setUsers(updatedUsers);
      setHasAdmin(true);
    } catch (err) {
      setError(err.message || 'Failed to update user role');
    } finally {
      setSearching(false);
    }
  };

  const handleMakeAdmin = async (userId, userEmail) => {
    if (hasAdmin) {
      setError('Setup page is disabled. An admin already exists.');
      return;
    }

    if (!confirm(`Are you sure you want to make ${userEmail} an admin?`)) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateDocument('users', userId, { role: 'admin' });
      setSuccess(`${userEmail} is now an admin!`);
      
      // Refresh users list and check admin status
      const updatedUsers = await getDocuments('users');
      setUsers(updatedUsers);
      setHasAdmin(true);
    } catch (err) {
      setError(err.message || 'Failed to update user role');
    } finally {
      setLoading(false);
    }
  };

  // If admin exists, show only a simple disabled message
  if (!checking && hasAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <Shield size={48} style={{ color: '#667eea', marginBottom: '20px' }} />
          <h1 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '24px' }}>
            Setup Page Disabled
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px', lineHeight: '1.6' }}>
            An admin account already exists. Please use the admin login page to access the admin panel, or manage users from within the admin panel.
          </p>
          <Link
            href="/admin/login"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#667eea',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5568d3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            Go to Admin Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Shield size={48} style={{ color: '#667eea', marginBottom: '15px' }} />
          <h1 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '28px' }}>
            Admin Setup
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Create your first admin account
          </p>
        </div>

        {success && (
          <div style={{
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            color: '#155724',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        {error && !hasAdmin && (
          <div style={{
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            color: '#721c24',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {checking ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#667eea', marginBottom: '15px' }} />
            <p style={{ color: '#666' }}>Checking admin status...</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                User Email
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={searching || loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#667eea',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: (searching || loading) ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: (searching || loading) ? 0.6 : 1
                  }}
                >
                  {searching ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Searching...
                    </>
                  ) : (
                    'Make Admin'
                  )}
                </button>
              </div>
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
                Enter the email of a user who has already signed up
              </p>
            </div>

            {users.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '18px' }}>
                  All Users ({users.length})
                </h3>
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  border: '1px solid #eee',
                  borderRadius: '6px'
                }}>
                  {users.map((u) => (
                    <div
                      key={u.id}
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                          <User size={16} style={{ color: '#666' }} />
                          <span style={{ fontWeight: '500', color: '#333' }}>
                            {u.displayName || 'No name'}
                          </span>
                          {u.role === 'admin' && (
                            <span style={{
                              backgroundColor: '#667eea',
                              color: '#fff',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              ADMIN
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={12} style={{ color: '#999' }} />
                          <span style={{ fontSize: '13px', color: '#666' }}>{u.email}</span>
                        </div>
                      </div>
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleMakeAdmin(u.id, u.email)}
                          disabled={loading}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#667eea',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            opacity: loading ? 0.6 : 1
                          }}
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #eee',
              textAlign: 'center'
            }}>
              <Link
                href="/admin/login"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Go to Admin Login →
              </Link>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

