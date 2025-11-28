# Contact Form Email Setup Guide

## Overview
The contact form now sends emails to your specified email address using Resend. When users submit the contact form, you'll receive an email with their details.

## Setup Steps

### 1. Install Resend Package
```bash
npm install resend
```

### 2. Get Resend API Key
1. Sign up for a free account at [https://resend.com](https://resend.com)
2. Go to the API Keys section in your dashboard
3. Create a new API key
4. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables
Add these to your `.env.local` file:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
```

**Optional:**
```env
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

**Note:** 
- `CONTACT_EMAIL`: The email where you want to receive contact form submissions
- `RESEND_FROM_EMAIL`: Optional. If you have a verified domain in Resend, use it here. Otherwise, it defaults to `onboarding@resend.dev` (for testing only)

### 4. Verify Your Domain (Recommended for Production)
1. In Resend dashboard, go to "Domains"
2. Add your domain
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for verification (usually takes a few minutes)
5. Update `RESEND_FROM_EMAIL` in your `.env.local` to use your verified domain

### 5. Test the Form
1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email inbox for the submission

## Features

- ✅ Form validation (all required fields)
- ✅ Email validation
- ✅ Terms & conditions checkbox validation
- ✅ Success/error messages with translations (English & Arabic)
- ✅ Loading state during submission
- ✅ Form reset after successful submission
- ✅ Beautiful HTML email template
- ✅ Reply-to set to user's email for easy replies

## Email Template

The email includes:
- User's name, email, and phone
- Selected service type (if any)
- Message content
- Submission timestamp

## Troubleshooting

### Emails not sending?
1. Check that `RESEND_API_KEY` is set correctly in `.env.local`
2. Verify your API key is active in Resend dashboard
3. Check the browser console and server logs for errors
4. Make sure you've restarted your dev server after adding environment variables

### Using a custom domain?
- Make sure your domain is verified in Resend
- Update `RESEND_FROM_EMAIL` to use your verified domain
- Format: `noreply@yourdomain.com` or `Contact Form <noreply@yourdomain.com>`

### Testing with onboarding@resend.dev?
- This email can only send to verified email addresses
- Add your email to Resend's verified recipients list for testing
- For production, always use a verified domain

## Support

For Resend-specific issues, check their documentation: [https://resend.com/docs](https://resend.com/docs)

