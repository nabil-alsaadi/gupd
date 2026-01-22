"use client";
import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { 
  Mail,
  User,
  Phone,
  MessageSquare,
  Calendar,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
  Briefcase,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterRead, setFilterRead] = useState('all'); // 'all', 'read', 'unread'
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [newMessageIds, setNewMessageIds] = useState(new Set());
  const isInitialLoadRef = useRef(true);

  // Real-time listener for messages
  useEffect(() => {
    if (!db) {
      setError(new Error('Firestore database not initialized'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const messagesRef = collection(db, 'contactMessages');
      const q = query(messagesRef, orderBy('submittedAt', 'desc'));

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messagesData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Convert Firestore Timestamp to ISO string if needed
            const submittedAt = data.submittedAt?.toDate 
              ? data.submittedAt.toDate().toISOString() 
              : data.submittedAt || data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString();
            
            messagesData.push({
              id: doc.id,
              ...data,
              submittedAt: submittedAt
            });
          });
          
          // Detect new messages (messages that weren't in the previous list)
          setMessages(prevMessages => {
            // Skip new message detection on initial load
            if (isInitialLoadRef.current) {
              isInitialLoadRef.current = false;
              return messagesData;
            }
            
            const prevIds = new Set(prevMessages.map(msg => msg.id));
            const newIds = new Set();
            
            messagesData.forEach(msg => {
              if (!prevIds.has(msg.id)) {
                newIds.add(msg.id);
              }
            });
            
            // Add new message IDs to the set
            if (newIds.size > 0) {
              setNewMessageIds(prev => {
                const updated = new Set(prev);
                newIds.forEach(id => updated.add(id));
                return updated;
              });
              
              // Remove highlight after 5 seconds
              setTimeout(() => {
                setNewMessageIds(prev => {
                  const updated = new Set(prev);
                  newIds.forEach(id => updated.delete(id));
                  return updated;
                });
              }, 5000);
            }
            
            return messagesData;
          });
          
          setLoading(false);
          setIsConnected(true);
        },
        (err) => {
          console.error('Error listening to messages:', err);
          setError(err);
          setLoading(false);
          setIsConnected(false);
        }
      );

      // Cleanup listener on unmount
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError(err);
      setLoading(false);
      setIsConnected(false);
    }
  }, []); // Only run once on mount

  // Update selected message when messages change
  useEffect(() => {
    if (selectedMessage) {
      const updatedMessage = messages.find(msg => msg.id === selectedMessage.id);
      if (updatedMessage) {
        setSelectedMessage(updatedMessage);
      } else {
        // Message was deleted
        setSelectedMessage(null);
      }
    }
  }, [messages, selectedMessage]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      let filtered = messages;

      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(msg => 
          msg.name?.toLowerCase().includes(searchLower) ||
          msg.email?.toLowerCase().includes(searchLower) ||
          msg.phone?.toLowerCase().includes(searchLower) ||
          msg.message?.toLowerCase().includes(searchLower) ||
          msg.serviceType?.toLowerCase().includes(searchLower)
        );
      }

      // Apply read/unread filter
      if (filterRead === 'read') {
        filtered = filtered.filter(msg => msg.read === true);
      } else if (filterRead === 'unread') {
        filtered = filtered.filter(msg => !msg.read);
      }

      setFilteredMessages(filtered);
    } else {
      setFilteredMessages([]);
    }
  }, [messages, searchTerm, filterRead]);

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

  const handleToggleRead = async (messageId, currentReadStatus) => {
    if (!db) {
      alert('Firestore database not initialized');
      return;
    }

    setUpdating(true);
    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      await updateDoc(messageRef, { read: !currentReadStatus });
      // Real-time listener will automatically update the state
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update message status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    if (!db) {
      alert('Firestore database not initialized');
      return;
    }

    setDeleting(messageId);
    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      await deleteDoc(messageRef);
      // Real-time listener will automatically update the state
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    } finally {
      setDeleting(null);
    }
  };

  const unreadCount = messages?.filter(msg => !msg.read).length || 0;
  const totalCount = messages?.length || 0;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Contact Messages</h2>
          <p>View and manage contact form submissions from visitors</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            padding: '6px 12px',
            backgroundColor: isConnected ? '#4CAF50' : '#F44336',
            color: '#fff',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isConnected ? 'Live' : 'Offline'}
          </div>
          {unreadCount > 0 && (
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#F44336',
              color: '#fff',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Mail size={16} />
              {unreadCount} Unread
            </div>
          )}
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '20px',
            fontSize: '14px',
            color: '#666'
          }}>
            Total: {totalCount}
          </div>
        </div>
      </div>

      <div className="admin-page-content">
        {loading ? (
          <div className="admin-loading">
            <Loader2 size={32} className="admin-spinner" />
            <p>Loading messages...</p>
          </div>
        ) : error ? (
          <div className="admin-alert admin-alert-error">
            Error loading messages: {error.message}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 250px)' }}>
            {/* Messages List */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minWidth: '400px' }}>
              {/* Search and Filters */}
              <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
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
                    placeholder="Search messages..."
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
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setFilterRead('all')}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: filterRead === 'all' ? '#2196F3' : '#f5f5f5',
                      color: filterRead === 'all' ? '#fff' : '#666',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterRead('unread')}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: filterRead === 'unread' ? '#F44336' : '#f5f5f5',
                      color: filterRead === 'unread' ? '#fff' : '#666',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </button>
                  <button
                    onClick={() => setFilterRead('read')}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: filterRead === 'read' ? '#4CAF50' : '#f5f5f5',
                      color: filterRead === 'read' ? '#fff' : '#666',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Read
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Showing {filteredMessages.length} of {totalCount} messages
                </div>
              </div>

              {/* Messages List */}
              <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                backgroundColor: '#fff'
              }}>
                {filteredMessages.length === 0 ? (
                  <div className="admin-empty-state" style={{ padding: '40px' }}>
                    <Mail size={64} />
                    <h3>No messages found</h3>
                    <p>{searchTerm || filterRead !== 'all' ? 'Try adjusting your filters' : 'No contact messages yet'}</p>
                  </div>
                ) : (
                  <div>
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => {
                          setSelectedMessage(message);
                          // Mark as read when opened
                          if (!message.read) {
                            handleToggleRead(message.id, false);
                          }
                        }}
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid #eee',
                          cursor: 'pointer',
                          backgroundColor: selectedMessage?.id === message.id 
                            ? '#f0f7ff' 
                            : newMessageIds.has(message.id)
                            ? '#e8f5e9'
                            : (!message.read ? '#fff9e6' : '#fff'),
                          transition: 'background-color 0.3s ease',
                          borderLeft: selectedMessage?.id === message.id 
                            ? '3px solid #2196F3' 
                            : newMessageIds.has(message.id)
                            ? '3px solid #4CAF50'
                            : (!message.read ? '3px solid #FF9800' : '3px solid transparent'),
                          animation: newMessageIds.has(message.id) ? 'pulse 0.5s ease-in-out' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedMessage?.id !== message.id) {
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedMessage?.id !== message.id) {
                            e.currentTarget.style.backgroundColor = (!message.read ? '#fff9e6' : '#fff');
                          }
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <strong style={{ fontSize: '14px', color: '#333' }}>{message.name || 'Anonymous'}</strong>
                              {!message.read && (
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: '#F44336',
                                  display: 'inline-block'
                                }} />
                              )}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Mail size={12} />
                              {message.email}
                            </div>
                          </div>
                          <div style={{ fontSize: '11px', color: '#999' }}>
                            {formatDate(message.submittedAt)}
                          </div>
                        </div>
                        {message.serviceType && (
                          <div style={{ marginBottom: '4px' }}>
                            <span style={{
                              padding: '2px 8px',
                              backgroundColor: '#e3f2fd',
                              color: '#1976d2',
                              borderRadius: '12px',
                              fontSize: '11px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Briefcase size={10} />
                              {message.serviceType}
                            </span>
                          </div>
                        )}
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#666', 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Message Detail View */}
            {selectedMessage && (
              <div style={{ 
                flex: '1', 
                backgroundColor: '#fff', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                padding: '24px',
                overflowY: 'auto',
                minWidth: '400px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>Message Details</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.read)}
                      disabled={updating}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: selectedMessage.read ? '#FF9800' : '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: updating ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        opacity: updating ? 0.6 : 1
                      }}
                    >
                      {selectedMessage.read ? <EyeOff size={14} /> : <Eye size={14} />}
                      {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      disabled={deleting === selectedMessage.id}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#F44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: deleting === selectedMessage.id ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        opacity: deleting === selectedMessage.id ? 0.6 : 1
                      }}
                    >
                      {deleting === selectedMessage.id ? (
                        <Loader2 size={14} className="admin-spinner" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Status */}
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                      Status
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {selectedMessage.read ? (
                        <CheckCircle size={16} style={{ color: '#4CAF50' }} />
                      ) : (
                        <XCircle size={16} style={{ color: '#F44336' }} />
                      )}
                      <span style={{ fontSize: '14px', color: '#333' }}>
                        {selectedMessage.read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                      Contact Information
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <User size={16} style={{ color: '#666' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#666' }}>Name</div>
                          <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{selectedMessage.name}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Mail size={16} style={{ color: '#666' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#666' }}>Email</div>
                          <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                            <a href={`mailto:${selectedMessage.email}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                              {selectedMessage.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Phone size={16} style={{ color: '#666' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#666' }}>Phone</div>
                          <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                            <a href={`tel:${selectedMessage.phone}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                              {selectedMessage.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                      {selectedMessage.serviceType && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Briefcase size={16} style={{ color: '#666' }} />
                          <div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Service Type</div>
                            <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{selectedMessage.serviceType}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                      Message
                    </label>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#333',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Submission Date */}
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                      Submitted At
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} style={{ color: '#666' }} />
                      <span style={{ fontSize: '14px', color: '#333' }}>
                        {formatDate(selectedMessage.submittedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedMessage && filteredMessages.length > 0 && (
              <div style={{ 
                flex: '1', 
                backgroundColor: '#f9f9f9', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <MessageSquare size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p>Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

