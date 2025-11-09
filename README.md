# GUPD - Content Management System

A Next.js-based content management system with Firebase integration for managing website content including banners, team members, blog posts, and more.

## Features

- 🎨 Modern admin panel with sidebar navigation
- 📝 Content management for banners, team members, blog posts, FAQs, and more
- ☁️ Firebase Firestore integration for database
- 📸 Firebase Storage integration for image uploads
- 🎯 Professional UI with Lucide React icons
- 📱 Fully responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Firebase Account** - [Sign up](https://firebase.google.com/)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd gupd
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Firebase
- Lucide React (icons)
- Bootstrap
- GSAP (animations)
- And other dependencies

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp env.example .env.local
```

Then edit `.env.local` and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Firebase Setup

#### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

#### Step 2: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** or **Test mode** (for development)
4. Select a location for your database
5. Click "Enable"

#### Step 3: Enable Firebase Storage

1. In Firebase Console, go to **Storage**
2. Click "Get started"
3. Start in **test mode** (you can change security rules later)
4. Choose the same location as your Firestore database
5. Click "Done"

#### Step 4: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **</>** (Web) icon to add a web app
4. Register your app (you can skip app nickname)
5. Copy the configuration values to your `.env.local` file

#### Step 5: Set Up Security Rules

**Firestore Security Rules:**

Go to **Firestore Database** > **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for development)
    // IMPORTANT: Update these rules for production!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Storage Security Rules:**

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
  }
}
```

> **⚠️ Important:** The above rules allow public read/write access. Update them for production use with proper authentication!

## Running the Project

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Admin Panel Access

Once the project is running, access the admin panel at:

**URL:** `http://localhost:3000/admin`

### Admin Panel Features

- **Dashboard** - Overview of all content with statistics
- **Banner Content** - Manage homepage banners and slides
- **Blog Posts** - Create and manage blog articles
- **Team Members** - Manage team member profiles, founder info, and section titles
- **Navigation** - Configure site navigation structure
- **FAQs** - Manage frequently asked questions
- **Projects** - Manage project listings
- **Portfolio** - Manage portfolio items
- **Contact Content** - Manage contact page content
- **Company Data** - Manage company information

## Project Structure

```
gupd/
├── public/
│   └── assets/          # Static assets (images, CSS, JS)
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── admin/       # Admin panel pages
│   │   ├── about/       # About page
│   │   ├── blog/        # Blog pages
│   │   └── ...          # Other pages
│   ├── components/      # React components
│   │   ├── admin/       # Admin panel components
│   │   └── ...          # Other components
│   ├── config/          # Configuration files
│   │   └── firebase.js  # Firebase configuration
│   ├── data/            # JSON data files
│   ├── hooks/           # Custom React hooks
│   │   └── useFirebase.js  # Firebase hooks
│   └── utils/           # Utility functions
│       ├── firestore.js # Firestore utilities
│       └── storage.js   # Storage utilities
├── .env.local           # Environment variables (create this)
├── env.example          # Environment variables template
├── package.json         # Dependencies
└── README.md           # This file
```

## Key Dependencies

- **next** (14.2.4) - React framework
- **react** (^18) - UI library
- **firebase** - Firebase SDK for Firestore and Storage
- **lucide-react** - Icon library
- **bootstrap** (5.3.3) - CSS framework
- **gsap** (3.12.5) - Animation library

## Firebase Collections Structure

The admin panel uses the following Firestore collections:

- **banners** - Homepage banner slides
- **team** - Team members, founder info, and section titles
- **blogs** - Blog posts (structure may vary)
- **navigation** - Navigation menu structure
- **faqs** - Frequently asked questions
- **projects** - Project listings
- **portfolio** - Portfolio items
- **contact** - Contact page content
- **company** - Company information

## Common Issues & Solutions

### Issue: Firebase not initializing

**Solution:** 
- Check that all environment variables in `.env.local` are set correctly
- Make sure variable names start with `NEXT_PUBLIC_`
- Restart the development server after adding environment variables

### Issue: Permission denied errors

**Solution:**
- Check your Firestore and Storage security rules
- Make sure rules are published (not just saved)
- For development, use test mode rules

### Issue: Images not uploading

**Solution:**
- Verify Firebase Storage is enabled
- Check Storage security rules allow writes
- Ensure you have proper file permissions

### Issue: Build errors

**Solution:**
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |

## Development Tips

1. **Always use `.env.local`** for environment variables (it's gitignored)
2. **Never commit `.env.local`** to version control
3. **Use the admin panel** for content management instead of editing JSON files directly
4. **Check Firebase Console** regularly for data and storage usage
5. **Update security rules** before deploying to production
6. **Styling note:** The production site loads precompiled CSS from `public/assets/css/style.css`. The SCSS sources in `public/assets/css/style.scss` are kept for reference only and are not part of the active build pipeline.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

- **Netlify** - Similar to Vercel
- **Firebase Hosting** - Can be used with Firebase projects
- **Traditional hosting** - Build locally and upload `out` folder

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Lucide Icons](https://lucide.dev/)

## Support

For issues or questions:
1. Check the Firebase setup guide: `FIREBASE_SETUP.md`
2. Review Firebase Console for errors
3. Check browser console for client-side errors
4. Review Next.js server logs

## License

[Add your license here]

---

**Last Updated:** November 2024

**Note:** Make sure to update security rules before deploying to production!

