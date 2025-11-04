# Firebase Setup Guide

This project uses Firebase Firestore (database) and Firebase Storage (file storage).

## Prerequisites

1. A Firebase account (sign up at [firebase.google.com](https://firebase.google.com))
2. A Firebase project created in the Firebase Console

## Setup Instructions

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### Step 2: Enable Firestore Database

1. In your Firebase project, go to **Firestore Database**
2. Click "Create database"
3. Choose either:
   - **Production mode** (for production apps)
   - **Test mode** (for development - allows read/write for 30 days)
4. Select a location for your database
5. Click "Enable"

### Step 3: Enable Firebase Storage

1. In your Firebase project, go to **Storage**
2. Click "Get started"
3. Start in **test mode** (you can change security rules later)
4. Choose the same location as your Firestore database
5. Click "Done"

### Step 4: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **</>** (Web) icon to add a web app
4. Register your app (you can skip app nickname)
5. Copy the configuration values

### Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. Replace the placeholder values with your actual Firebase config values

### Step 6: Set Up Security Rules (Important!)

#### Firestore Security Rules

Go to **Firestore Database** > **Rules** and update with appropriate rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for development)
    // IMPORTANT: Update these rules for production!
    match /{document=**} {
      allow read, write: if true;
    }
    
    // Example production rules (uncomment and customize):
    // match /banners/{document} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
    
    // match /blogs/{document} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
  }
}
```

#### Storage Security Rules

Go to **Storage** > **Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read/write access to all files (for development)
    // IMPORTANT: Update these rules for production!
    match /{allPaths=**} {
      allow read, write: if true;
    }
    
    // Example production rules (uncomment and customize):
    // match /images/{allPaths=**} {
    //   allow read: if true;
    //   allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    // }
  }
}
```

## Usage

### Using Firestore

```javascript
import { 
  getDocuments, 
  getDocument, 
  addDocument, 
  updateDocument, 
  deleteDocument 
} from '@/utils/firestore';

// Get all documents from a collection
const banners = await getDocuments('banners');

// Get a single document
const banner = await getDocument('banners', 'document-id');

// Add a new document
const newId = await addDocument('banners', {
  title: 'New Banner',
  image: 'https://...',
  // ... other fields
});

// Update a document
await updateDocument('banners', 'document-id', {
  title: 'Updated Title'
});

// Delete a document
await deleteDocument('banners', 'document-id');
```

### Using Firebase Storage

```javascript
import { 
  uploadFile, 
  uploadFileWithProgress, 
  deleteFile, 
  getFileURL 
} from '@/utils/storage';

// Upload a file
const file = event.target.files[0];
const downloadURL = await uploadFile(file, 'images/banners/');

// Upload with progress tracking
const downloadURL = await uploadFileWithProgress(
  file, 
  'images/banners/', 
  null, 
  (progress) => {
    console.log(`Upload progress: ${progress}%`);
  }
);

// Delete a file
await deleteFile('images/banners/filename.jpg');

// Get file URL
const url = await getFileURL('images/banners/filename.jpg');
```

## Available Utility Functions

### Firestore Utils (`src/utils/firestore.js`)
- `getDocument(collectionName, docId)` - Get a single document
- `getDocuments(collectionName, options)` - Get multiple documents with optional filters/ordering
- `addDocument(collectionName, data)` - Add a new document
- `updateDocument(collectionName, docId, data)` - Update an existing document
- `deleteDocument(collectionName, docId)` - Delete a document
- `timestampToDate(timestamp)` - Convert Firestore timestamp to JavaScript Date
- `dateToTimestamp(date)` - Convert JavaScript Date to Firestore timestamp

### Storage Utils (`src/utils/storage.js`)
- `uploadFile(file, path, fileName)` - Upload a file
- `uploadFileWithProgress(file, path, fileName, onProgress)` - Upload with progress tracking
- `deleteFile(filePath)` - Delete a file
- `getFileURL(filePath)` - Get download URL
- `listFiles(path)` - List all files in a directory
- `getFileMetadata(filePath)` - Get file metadata
- `updateFileMetadata(filePath, newMetadata)` - Update file metadata
- `uploadMultipleFiles(files, path)` - Upload multiple files at once

## Important Notes

1. **Environment Variables**: All Firebase config variables must start with `NEXT_PUBLIC_` to be accessible in the browser
2. **Security Rules**: The default rules allow public read/write access. Update them for production!
3. **File Size Limits**: Firebase Storage has limits on file sizes. Check the Firebase documentation for current limits.
4. **Costs**: Firebase has a free tier, but be aware of usage limits and costs for production apps.

## Troubleshooting

### "Firebase: Error (auth/api-key-not-valid)"
- Check that your API key in `.env.local` matches the one in Firebase Console
- Make sure environment variables are properly loaded (restart Next.js dev server)

### "Firebase: Error (permission-denied)"
- Check your Firestore and Storage security rules
- Ensure rules are published (not just saved)

### "Firebase app already initialized"
- This is handled automatically in the config file
- If you see this error, check that you're not importing Firebase config multiple times

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

