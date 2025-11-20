import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';

/**
 * Convert Firestore data to plain JavaScript objects
 * Recursively converts Timestamps to ISO strings for Next.js serialization
 */
const convertTimestamps = (data) => {
  if (data === null || data === undefined) {
    return data;
  }
  
  // Check if it's a Firestore Timestamp
  if (data && typeof data === 'object' && 'toDate' in data && typeof data.toDate === 'function') {
    return data.toDate().toISOString();
  }
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => convertTimestamps(item));
  }
  
  // Handle objects
  if (typeof data === 'object' && data.constructor === Object) {
    const converted = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        converted[key] = convertTimestamps(data[key]);
      }
    }
    return converted;
  }
  
  // Return primitive values as-is
  return data;
};

/**
 * Get a single document by ID
 */
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Remove any 'id' field from data to avoid conflicts with Firestore document ID
      const { id: dataId, ...restData } = data;
      // Convert Timestamps to plain values for Next.js serialization
      const convertedData = convertTimestamps(restData);
      // Always use Firestore document ID as 'id'
      return { id: docSnap.id, ...convertedData };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 */
export const getDocuments = async (collectionName, options = {}) => {
  try {
    const collectionRef = collection(db, collectionName);
    const constraints = [];
    
    // Apply filters
    if (options.filters && options.filters.length > 0) {
      options.filters.forEach(filter => {
        constraints.push(where(filter.field, filter.operator, filter.value));
      });
    }
    
    // Apply ordering
    if (options.orderBy) {
      constraints.push(orderBy(options.orderBy.field, options.orderBy.direction || 'asc'));
    }
    
    // Apply limit
    if (options.limit) {
      constraints.push(limit(options.limit));
    }
    
    // Build query
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
    const querySnapshot = await getDocs(q);
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Remove any 'id' field from data to avoid conflicts with Firestore document ID
      // This ensures we always use the Firestore document ID, not a stored 'id' field
      const { id: dataId, ...restData } = data;
      // Convert Timestamps to plain values for Next.js serialization
      const convertedData = convertTimestamps(restData);
      // Always use Firestore document ID as 'id' (this is the actual document ID)
      const document = { id: doc.id, ...convertedData };
      documents.push(document);
    });
    
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

/**
 * Add a new document to a collection
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

/**
 * Update an existing document
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    // Validate inputs
    if (!collectionName || typeof collectionName !== 'string') {
      throw new Error('Invalid collection name');
    }
    
    if (!docId || typeof docId !== 'string') {
      throw new Error('Invalid document ID');
    }
    
    // Clean data - ensure all URL fields are strings
    const cleanData = (obj) => {
      if (obj === null || obj === undefined) {
        return null;
      }
      if (typeof obj === 'string') {
        return obj || '';
      }
      if (Array.isArray(obj)) {
        return obj.map(item => cleanData(item));
      }
      if (typeof obj === 'object') {
        const cleaned = {};
        for (const key in obj) {
          if (key === 'image' || key === 'file' || key === 'mainImage' || key === 'locationMap' || key === 'icon') {
            // Ensure URL fields are always strings
            cleaned[key] = typeof obj[key] === 'string' ? obj[key] : '';
          } else {
            cleaned[key] = cleanData(obj[key]);
          }
        }
        return cleaned;
      }
      return obj;
    };
    
    const cleanedData = cleanData(data);
    
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...cleanedData,
      updatedAt: serverTimestamp(),
    });
    return docId;
  } catch (error) {
    console.error('Error updating document:', error);
    console.error('Collection:', collectionName);
    console.error('Document ID:', docId);
    console.error('Data:', data);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Convert Firestore Timestamp to JavaScript Date
 */
export const timestampToDate = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  return null;
};

/**
 * Convert JavaScript Date to Firestore Timestamp
 */
export const dateToTimestamp = (date) => {
  if (date) {
    return Timestamp.fromDate(new Date(date));
  }
  return null;
};

