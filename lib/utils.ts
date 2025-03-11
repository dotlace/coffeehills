import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const sendAdminEmail = async (email: string, password: string) => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in the environment variables');
    throw new Error('JWT_SECRET is required to generate the token');
  }

  // ✅ Hash the temporary password before saving it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Store hashed temporary password in the database
  await prisma.user.update({
    where: { email },
    data: { tempPasswordHash: hashedPassword }, // ✅ Store hashed password
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  // Create a JWT token for the password reset link
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  const resetPasswordLink = `${process.env.BASE_URL}/admin/adminChangePass?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Admin Account Created - Temporary Password',
    text: `Your admin account has been created. Use the following temporary password to log in: ${password}
    
    To change your password, please click the following link:
    ${resetPasswordLink}
    
    This link will expire in 1 hour.`,
  };

  try {
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};




// import nodemailer from 'nodemailer';
// import jwt from 'jsonwebtoken';

// export const sendAdminEmail = async (email: string, password: string) => {
//   if (!process.env.JWT_SECRET) {
//     console.error('JWT_SECRET is not defined in the environment variables');
//     throw new Error('JWT_SECRET is required to generate the token');
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',  // Use 'gmail' for Gmail email accounts
//     auth: {
//       user: process.env.EMAIL_USER,   // Your Gmail address
//       pass: process.env.EMAIL_PASS,   // The App Password you generated
//     },
//     tls: {
//       ciphers: 'SSLv3', // Ensure secure TLS connection
//     }
//   });

//   // Create a JWT token for the password reset link
//   const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
//     expiresIn: '1h', // Token expires in 1 hour
//   });

//   const resetPasswordLink = `${process.env.BASE_URL}/admin/adminChangePass?token=${token}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,  // Your Gmail email address
//     to: email,                     // The recipient's email address
//     subject: 'Admin Account Created - Temporary Password',
//     text: `Your admin account has been created. Use the following temporary password to log in: ${password}
    
//     To change your password, please click the following link:
//     ${resetPasswordLink}
    
//     This link will expire in 1 hour.`,
//   };

//   try {
//     console.log('Attempting to send email...');
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info); // Log the email sent status
//   } catch (error) {
//     console.error('Error sending email:', error); // Log any errors
//   }
// };
