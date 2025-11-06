import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata
} from 'firebase/storage';
import { storage } from '@/config/firebase';

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The path in storage (e.g., 'images/banners/')
 * @param {string} fileName - Optional custom file name
 * @returns {Promise<string>} - Download URL
 */
export const uploadFile = async (file, path, fileName = null) => {
  try {
    // Validate inputs
    if (!file || !(file instanceof File)) {
      throw new Error('Invalid file provided');
    }
    
    if (!path || typeof path !== 'string') {
      throw new Error('Invalid path provided');
    }
    
    // Validate storage is initialized
    if (!storage) {
      throw new Error('Firebase Storage is not initialized');
    }
    
    // Clean and normalize path - remove any leading/trailing slashes and ensure proper format
    let normalizedPath = path.trim();
    // Remove leading slash if present
    if (normalizedPath.startsWith('/')) {
      normalizedPath = normalizedPath.substring(1);
    }
    // Ensure path ends with a slash
    if (!normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath + '/';
    }
    
    // Validate path doesn't contain invalid characters
    if (normalizedPath.includes('//')) {
      normalizedPath = normalizedPath.replace(/\/+/g, '/');
    }
    
    // Validate file name
    if (!file.name || typeof file.name !== 'string') {
      throw new Error('Invalid file name');
    }
    
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const name = fileName || `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
    
    // Ensure name is a string
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('Invalid file name generated');
    }
    
    // Create full path
    const fullPath = `${normalizedPath}${name}`;
    
    // Validate full path is a string
    if (typeof fullPath !== 'string' || fullPath.length === 0) {
      throw new Error('Invalid storage path');
    }
    
    console.log('Uploading file to path:', fullPath);
    
    const storageRef = ref(storage, fullPath);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Validate download URL is a string
    if (typeof downloadURL !== 'string') {
      throw new Error('Invalid download URL returned');
    }
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    console.error('File details:', {
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      path: path
    });
    throw error;
  }
};

/**
 * Upload a file with progress tracking
 * @param {File} file - The file to upload
 * @param {string} path - The path in storage
 * @param {string} fileName - Optional custom file name
 * @param {Function} onProgress - Callback function for progress updates
 * @returns {Promise<string>} - Download URL
 */
export const uploadFileWithProgress = async (file, path, fileName = null, onProgress = null) => {
  try {
    const fileExtension = file.name.split('.').pop();
    const name = fileName || `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
    const storageRef = ref(storage, `${path}${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error('Error uploading file:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} filePath - Full path to the file in storage
 */
export const deleteFile = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Get download URL for a file
 * @param {string} filePath - Full path to the file in storage
 * @returns {Promise<string>} - Download URL
 */
export const getFileURL = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};

/**
 * List all files in a directory
 * @param {string} path - Path to the directory
 * @returns {Promise<Array>} - Array of file references
 */
export const listFiles = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url,
          metadata
        };
      })
    );
    
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Get file metadata
 * @param {string} filePath - Full path to the file
 * @returns {Promise<Object>} - File metadata
 */
export const getFileMetadata = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    const metadata = await getMetadata(storageRef);
    return metadata;
  } catch (error) {
    console.error('Error getting file metadata:', error);
    throw error;
  }
};

/**
 * Update file metadata
 * @param {string} filePath - Full path to the file
 * @param {Object} newMetadata - New metadata to set
 */
export const updateFileMetadata = async (filePath, newMetadata) => {
  try {
    const storageRef = ref(storage, filePath);
    await updateMetadata(storageRef, newMetadata);
    return true;
  } catch (error) {
    console.error('Error updating file metadata:', error);
    throw error;
  }
};

/**
 * Upload multiple files
 * @param {Array<File>} files - Array of files to upload
 * @param {string} path - Base path in storage
 * @returns {Promise<Array<string>>} - Array of download URLs
 */
export const uploadMultipleFiles = async (files, path) => {
  try {
    const uploadPromises = files.map(file => uploadFile(file, path));
    const downloadURLs = await Promise.all(uploadPromises);
    return downloadURLs;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw error;
  }
};

