"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, initializeAuth } from '@/config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Try to initialize auth if it's not available
    const currentAuth = auth || initializeAuth();
    if (!currentAuth) {
      console.warn('Firebase Auth not initialized. Authentication features will not work.');
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(currentAuth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            // Create user document if it doesn't exist
            const newUserData = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
              role: 'developer', // Default role
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUserData);
            setUserData(newUserData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    // Try to initialize auth if it's not available
    const currentAuth = auth || initializeAuth();
    if (!currentAuth) {
      console.error('Firebase Auth is not available. Please check:');
      console.error('1. Your .env.local file exists in the project root');
      console.error('2. NEXT_PUBLIC_FIREBASE_API_KEY is set correctly');
      console.error('3. You have restarted your dev server after adding .env.local');
      return { success: false, error: 'Authentication not available. Please check your Firebase configuration in .env.local file and restart your dev server.' };
    }
    try {
      const userCredential = await signInWithEmailAndPassword(currentAuth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email, password, displayName) => {
    // Try to initialize auth if it's not available
    const currentAuth = auth || initializeAuth();
    if (!currentAuth) {
      console.error('Firebase Auth is not available. Please check:');
      console.error('1. Your .env.local file exists in the project root');
      console.error('2. NEXT_PUBLIC_FIREBASE_API_KEY is set correctly');
      console.error('3. You have restarted your dev server after adding .env.local');
      return { success: false, error: 'Authentication not available. Please check your Firebase configuration in .env.local file and restart your dev server.' };
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(currentAuth, email, password);
      
      // Update profile
      await updateProfile(userCredential.user, { displayName });
      
      // Create user document in Firestore
      const userData = {
        email,
        displayName,
        role: 'developer',
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    const currentAuth = auth || initializeAuth();
    if (!currentAuth) {
      return { success: false, error: 'Authentication not available' };
    }
    try {
      await firebaseSignOut(currentAuth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Helper to check if user is admin
  const isAdmin = userData?.role === 'admin';
  
  // Helper to check if user is developer
  const isDeveloper = userData?.role === 'developer' || userData?.role === 'admin';

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isDeveloper,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

