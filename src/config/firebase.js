import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase config
const isConfigValid = firebaseConfig.apiKey && 
                      firebaseConfig.authDomain && 
                      firebaseConfig.projectId;

// Debug function to check config (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const missingVars = [];
  if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
  if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
  if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  
  if (missingVars.length > 0) {
    console.warn('⚠️ Missing Firebase environment variables:', missingVars.join(', '));
    console.warn('Please add them to your .env.local file');
  } else if (!isConfigValid) {
    console.warn('⚠️ Firebase configuration may be incomplete. Some features may not work.');
  }
}

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
  if (!getApps().length) {
    // Try to initialize even if config seems incomplete (for backward compatibility)
    app = initializeApp(firebaseConfig);
    if (!isConfigValid) {
      console.warn('Firebase initialized with incomplete configuration. Some features may not work. Please check your .env file.');
    }
  } else {
    app = getApps()[0];
  }
} catch (error) {
  console.error('Error initializing Firebase app:', error.message);
  // Try to get existing app if initialization failed
  const existingApps = getApps();
  app = existingApps.length > 0 ? existingApps[0] : null;
  if (!app) {
    console.warn('Firebase app could not be initialized. Please check your Firebase configuration in .env file.');
  }
}

// Initialize Firestore
let db;
try {
  if (app) {
    db = getFirestore(app);
  } else {
    throw new Error('Firebase app not initialized');
  }
} catch (error) {
  console.error('Error initializing Firestore:', error);
  // Create a dummy db object to prevent crashes
  db = null;
}
export { db };

// Initialize Authentication (client-side only)
let auth = null;

// Function to initialize auth (can be called multiple times safely)
const initializeAuth = () => {
  if (typeof window === 'undefined') {
    return null; // Server-side, return null
  }
  
  if (!app) {
    console.error('Firebase Auth: Cannot initialize - Firebase app is not available');
    console.error('Please check your Firebase configuration in .env.local file');
    return null;
  }
  
  if (auth) {
    return auth; // Already initialized
  }
  
  try {
    // Validate config before initializing
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
      console.error('❌ Firebase Auth configuration is missing!');
      console.error('Required environment variables:');
      console.error('  - NEXT_PUBLIC_FIREBASE_API_KEY');
      console.error('  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
      console.error('Please check your .env.local file');
      return null;
    }
    
    auth = getAuth(app);
    console.log('✅ Firebase Auth initialized successfully');
    return auth;
  } catch (error) {
    console.error('❌ Firebase Auth initialization failed:', error.message);
    
    if (error.code === 'auth/invalid-api-key') {
      console.error('❌ Invalid Firebase API key detected!');
      console.error('Please check your NEXT_PUBLIC_FIREBASE_API_KEY in .env.local file');
      console.error('Make sure you have restarted your dev server after adding the .env.local file');
    } else if (error.code === 'auth/configuration-not-found') {
      console.error('❌ Firebase Authentication is not enabled or configured!');
      console.error('');
      console.error('To fix this:');
      console.error('1. Go to Firebase Console: https://console.firebase.google.com/');
      console.error('2. Select your project');
      console.error('3. Go to "Authentication" in the left menu');
      console.error('4. Click "Get Started" to enable Authentication');
      console.error('5. Enable "Email/Password" sign-in method');
      console.error('6. Make sure your .env.local has the correct authDomain:');
      console.error(`   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${firebaseConfig.authDomain || 'your-project.firebaseapp.com'}`);
      console.error('7. Restart your dev server');
    } else {
      console.error('Error code:', error.code);
      console.error('Please check your Firebase configuration in .env.local file');
      console.error('Make sure all required environment variables are set correctly');
    }
    return null;
  }
};

// Try to initialize auth on module load (client-side only)
if (typeof window !== 'undefined') {
  auth = initializeAuth();
}

// Export both auth and the initialization function
export { auth, initializeAuth };

// Initialize Storage (only if app is initialized)
let storage = null;
if (app) {
  try {
    storage = getStorage(app);
    
    // Validate storage bucket
    if (!storage || !storage._delegate || !storage._delegate.bucket) {
      console.warn('Firebase Storage bucket not properly configured');
    }
  } catch (error) {
    console.error('Error initializing Firebase Storage:', error);
    // Don't throw - allow app to continue without storage
    storage = null;
  }
} else {
  console.warn('Firebase Storage not initialized: Firebase app not available');
}

export { storage };

export default app;

