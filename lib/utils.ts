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

export interface Product {
  id: number;
  name: string;
  flavor?: string;
  price: number;
  image: string;
  description: string;
}


