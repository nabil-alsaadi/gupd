"use client";
import { useState, useEffect } from 'react';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '@/utils/firestore';
import { uploadFile, uploadFileWithProgress } from '@/utils/storage';

/**
 * Custom hook for Firestore operations
 */
export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const documents = await getDocuments(collectionName, options);
      setData(documents);
      return documents;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const add = async (documentData) => {
    setLoading(true);
    setError(null);
    try {
      const id = await addDocument(collectionName, documentData);
      await fetchData(); // Refresh data
      return id;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (docId, documentData) => {
    setLoading(true);
    setError(null);
    try {
      await updateDocument(collectionName, docId, documentData);
      await fetchData(); // Refresh data
      return true;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (docId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDocument(collectionName, docId);
      await fetchData(); // Refresh data
      return true;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    add,
    update,
    remove,
  };
};

/**
 * Custom hook for Firebase Storage operations
 */
export const useStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = async (file, path, fileName = null) => {
    setUploading(true);
    setError(null);
    setUploadProgress(0);
    try {
      const url = await uploadFile(file, path, fileName);
      return url;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadWithProgress = async (file, path, fileName = null) => {
    setUploading(true);
    setError(null);
    setUploadProgress(0);
    try {
      const url = await uploadFileWithProgress(
        file,
        path,
        fileName,
        (progress) => {
          setUploadProgress(progress);
        }
      );
      return url;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploading,
    uploadProgress,
    error,
    upload,
    uploadWithProgress,
  };
};

