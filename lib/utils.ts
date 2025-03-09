import nodemailer from 'nodemailer';

// Helper function to send an email with the temporary password
export const sendAdminEmail = async (email: string, password: string) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',  // Use 'hotmail' for Outlook email accounts
    auth: {
      user: process.env.EMAIL_USER,   // Your Outlook email address (e.g., youremail@outlook.com)
      pass: process.env.EMAIL_PASS,   // Your email password or App Password
    },
    tls: {
      ciphers: 'SSLv3', // Ensure secure TLS connection
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Your Outlook email address
    to: email,                     // The recipient's email address
    subject: 'Admin Account Created - Temporary Password',
    text: `Your admin account has been created. Use the following temporary password to log in: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



