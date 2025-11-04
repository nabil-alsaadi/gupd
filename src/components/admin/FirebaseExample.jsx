"use client";
/**
 * Example component demonstrating Firebase usage
 * This is a reference component - you can delete it or use it as a template
 */

import { useState } from 'react';
import { useFirestore, useStorage } from '@/hooks/useFirebase';

const FirebaseExample = () => {
  const { data, loading, error, fetchData, add, update, remove } = useFirestore('banners');
  const { uploading, uploadProgress, upload } = useStorage();
  const [file, setFile] = useState(null);

  // Example: Fetch all banners
  const handleFetch = async () => {
    try {
      await fetchData();
      console.log('Banners fetched:', data);
    } catch (err) {
      console.error('Error fetching:', err);
    }
  };

  // Example: Add a new banner
  const handleAdd = async () => {
    try {
      const newBanner = {
        title: 'New Banner',
        subtitle: 'Banner subtitle',
        description: 'Banner description',
        image: 'https://example.com/image.jpg',
        ctaText: 'Learn More',
        ctaLink: '/about'
      };
      const id = await add(newBanner);
      console.log('Banner added with ID:', id);
    } catch (err) {
      console.error('Error adding:', err);
    }
  };

  // Example: Upload a file
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const downloadURL = await upload(selectedFile, 'images/banners/');
      console.log('File uploaded:', downloadURL);
      setFile(null);
    } catch (err) {
      console.error('Error uploading:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firebase Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Banners'}
        </button>
        <button onClick={handleAdd} disabled={loading} style={{ marginLeft: '10px' }}>
          Add Banner
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && (
          <div>
            <p>Uploading... {Math.round(uploadProgress)}%</p>
            <progress value={uploadProgress} max="100" />
          </div>
        )}
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error.message}
        </div>
      )}

      <div>
        <h3>Banners ({data.length})</h3>
        <ul>
          {data.map((banner) => (
            <li key={banner.id}>
              {banner.title} - {banner.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FirebaseExample;

