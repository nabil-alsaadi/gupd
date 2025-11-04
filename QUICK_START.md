# Quick Start Guide

This guide will help you set up the project on a new laptop quickly.

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd gupd
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages. Wait for it to complete.

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Open `.env.local` in your editor and add your Firebase configuration:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. **Get Firebase Configuration:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Click on your web app (or create one)
   - Copy the config values to `.env.local`

## Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Access Admin Panel

Navigate to: [http://localhost:3000/admin](http://localhost:3000/admin)

## Important Notes

- ✅ `.env.local` is already in `.gitignore` - don't commit it!
- ✅ Make sure Firebase Firestore and Storage are enabled in Firebase Console
- ✅ For development, Firebase security rules should allow read/write (test mode)
- ✅ If you get Firebase errors, check that all environment variables are set correctly

## Troubleshooting

### "Firebase app already initialized" error
- This is usually fine - Firebase checks for existing instances

### "Permission denied" error
- Check Firebase Console > Firestore Database > Rules
- Check Firebase Console > Storage > Rules
- Make sure rules allow read/write access

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folder, then run `npm install`

### Environment variables not working
- Make sure all variables start with `NEXT_PUBLIC_`
- Restart the development server after adding/changing variables
- Check that `.env.local` is in the root directory (same level as `package.json`)

## That's it!

You should now be able to:
- ✅ View the website at `http://localhost:3000`
- ✅ Access admin panel at `http://localhost:3000/admin`
- ✅ Manage content through the admin panel
- ✅ Upload images to Firebase Storage

For more details, see `README.md` and `FIREBASE_SETUP.md`.

