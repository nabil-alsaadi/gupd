# How to Create Your First Admin Account

This guide explains how to create your first admin account for the Jinan admin panel.

## Quick Start (3 Steps)

### Step 1: Create a Regular User Account

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the login page:
   ```
   http://localhost:3000/login
   ```

3. Click "Sign Up" and create an account with your email and password

### Step 2: Make That User an Admin

You have three options:

#### Option A: Using the Setup Page (Easiest)

1. Go to the admin setup page:
   ```
   http://localhost:3000/admin/setup
   ```

2. Enter the email you used to sign up

3. Click "Make Admin" button

4. You'll see a success message confirming the user is now an admin

#### Option B: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)

2. Select your project

3. Navigate to **Firestore Database** in the left sidebar

4. Click on the `users` collection

5. Find the document with your email address (the document ID will be your Firebase user ID)

6. Click on the document to edit it

7. Find the `role` field and change its value from `developer` to `admin`

8. Click "Update" to save

#### Option C: Using Admin Panel (If you already have an admin)

If someone else has already set up an admin account:

1. Ask them to login at `http://localhost:3000/admin/login`

2. They can go to **Users** in the admin panel

3. Find your user and change the role to "Admin"

### Step 3: Login as Admin

1. Go to the admin login page:
   ```
   http://localhost:3000/admin/login
   ```

2. Enter your email and password

3. You'll be redirected to the admin dashboard

## Important Notes

- **Regular login vs Admin login:** 
  - Regular users login at `/login` → redirects to homepage
  - Admins login at `/admin/login` → redirects to admin panel

- **Role values:**
  - `developer` - Regular user (can comment on blog posts)
  - `admin` - Administrator (can access admin panel)
  - `user` - Basic user role (if you add more roles later)

- **Security:** 
  - The setup page at `/admin/setup` should ideally be removed or protected after initial setup
  - For production, consider adding additional security measures

## Troubleshooting

### "User not found" error

- Make sure you've signed up first at `/login`
- Check that the email you entered matches exactly (case-sensitive)
- Verify the user exists in Firestore `users` collection

### "Authentication not available" error

- Check your `.env.local` file has all Firebase configuration
- Make sure you've restarted the dev server after adding `.env.local`
- Verify Firebase Authentication is enabled in Firebase Console

### Can't access admin panel after making user admin

- Make sure you logged out and logged back in
- Clear browser cache and cookies
- Check that the `role` field in Firestore is exactly `admin` (lowercase)

### Setup page shows "An admin already exists"

- This means at least one admin account already exists
- Use the admin login page instead: `/admin/login`
- Or use the Users page in the admin panel to create more admins

## Disabling the Setup Page

The setup page automatically disables itself once an admin account exists. However, you have additional options:

### Option 1: Automatic Disable (Default)
- The setup page automatically disables when an admin exists
- No action needed - it's already protected

### Option 2: Environment Variable (Recommended for Production)
Add this to your `.env.local` file:
```env
NEXT_PUBLIC_DISABLE_SETUP_PAGE=true
```
Then restart your dev server. This completely disables the setup page regardless of admin status.

### Option 3: Delete the Setup Page
For maximum security, you can delete the setup page file:
```bash
rm src/app/admin/setup/page.js
```
This completely removes the setup route.

## Next Steps

After creating your first admin:

1. **Login** at `/admin/login`
2. **Explore** the admin panel features
3. **Create more admins** if needed via the Users page
4. **Disable the setup page** using one of the methods above

---

**Need help?** Check the main README.md or review the Firebase Console for any errors.

