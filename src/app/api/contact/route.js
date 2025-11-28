import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, phone, serviceType, message, termsAccepted } = await request.json();

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'You must accept the terms and conditions' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get contact email from environment or use default
    const contactEmail = process.env.CONTACT_EMAIL || 'your-email@example.com';
    
    // Get from email - use verified domain or default
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // Send email
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${fromEmail}>`,
      to: [contactEmail],
      replyTo: email,
      subject: `New Contact Form Submission${serviceType ? ` - ${serviceType}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> <span style="color: #333;">${name}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <span style="color: #333;">${email}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> <span style="color: #333;">${phone}</span></p>
            ${serviceType ? `<p style="margin: 10px 0;"><strong style="color: #555;">Service Type:</strong> <span style="color: #333;">${serviceType}</span></p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
              <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px; margin: 0;">
            Submitted at: ${new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
${serviceType ? `Service Type: ${serviceType}` : ''}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

