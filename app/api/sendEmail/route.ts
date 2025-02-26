import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Create a transporter using SMTP (this example uses Gmail, but you can use any SMTP server)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASSWORD, // Your Gmail password (or App Password if 2FA is enabled)
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender email address
    to: 'cafemandalayhills@gmail.com', // Your email address
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    html: `<strong>You have received a new message from ${name} (${email}):</strong><p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      return NextResponse.json({ success: false, error: error.message });
    }
    // If the error is not an instance of Error (very rare case), handle accordingly
    return NextResponse.json({ success: false, error: 'An unknown error occurred' });
  }
}
