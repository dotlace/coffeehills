import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // ✅ Import bcrypt for password hashing
import { prisma } from '@/lib/prisma'; // ✅ Import Prisma (DB client)

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Missing email or new password' }, { status: 400 });
    }

    // ✅ Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update the password & remove tempPasswordHash from DB
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        tempPasswordHash: null, // ✅ Remove temp password after successful reset
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

