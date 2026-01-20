"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Header1 from '@/components/header/Header1';
import Footer1 from '@/components/Footer/Footer1';
import Home1FooterTop from '@/components/Footer/Home1FooterTop';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && userData) {
      // Regular login page - redirect to homepage
      // If user is admin, they should use /admin/login instead
      router.push('/');
    }
  }, [user, userData, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        if (!displayName.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        result = await signUp(email, password, displayName);
      } else {
        result = await signIn(email, password);
      }

      if (result.success) {
        // Regular login - redirect handled in useEffect
        // Admin users should use /admin/login instead
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header1 fluid="container-fluid" />
      <div className="login-page pt-120 mb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="contact-form-area">
                <div className="title text-center mb-50">
                  <h3>{isSignUp ? 'Create Developer Account' : 'Developer Login'}</h3>
                  <p>{isSignUp ? 'Sign up to comment on blog posts' : 'Login to comment on blog posts'}</p>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                  {error && (
                    <div className="alert alert-danger mb-30" role="alert" style={{ 
                      padding: '15px', 
                      backgroundColor: '#f8d7da', 
                      color: '#721c24', 
                      border: '1px solid #f5c6cb',
                      borderRadius: '4px'
                    }}>
                      {error}
                    </div>
                  )}
                  
                  {isSignUp && (
                    <div className="form-inner mb-30">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        placeholder="Enter your name"
                      />
                    </div>
                  )}
                  
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="form-inner mb-30">
                    <label>Password *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      minLength={6}
                    />
                    {isSignUp && (
                      <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                        Password must be at least 6 characters
                      </small>
                    )}
                  </div>
                  
                  <div className="form-inner mb-30">
                    <button 
                      type="submit" 
                      className="primary-btn2 w-100"
                      disabled={loading}
                      style={{ width: '100%' }}
                    >
                      <span>
                        {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Login')}
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p>
                      {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setError('');
                        }}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: 'var(--primary-color2)', 
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        {isSignUp ? 'Login' : 'Sign Up'}
                      </button>
                    </p>
                    {/* <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                      Admin?{' '}
                      <Link 
                        href="/admin/login" 
                        style={{ 
                          color: 'var(--primary-color2)', 
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                      >
                        Admin Login
                      </Link>
                    </p> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Home1FooterTop />
      <Footer1 />
    </>
  );
}

