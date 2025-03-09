import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; // Correct import path for 'lib'
import bcrypt from 'bcryptjs';
import { sendAdminEmail } from '../../../../lib/utils';  // Import the function from utils

// Helper function to generate a random temporary password
const generateTemporaryPassword = (): string => {
  return Math.random().toString(36).slice(-8); // Generate a random 8-character password
};

export async function POST(req: Request) {
  const { email, username } = await req.json();

  const token = req.headers.get('Authorization');
  if (!token || token !== `Bearer ${process.env.ADMIN_AUTH_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  let temporaryPassword;

  if (existingUser) {
    // If user already exists, generate a new temporary password
    temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Update the existing user with the new temporary password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },  // Update with new password
    });
  } else {
    // If the user doesn't exist, create a new admin user
    temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });
  }

  // Send the temporary password to the admin email
  await sendAdminEmail(email, temporaryPassword);

  return NextResponse.json({
    message: 'Admin account created successfully. Please check your email for the temporary password.',
  }, { status: 201 });
}


