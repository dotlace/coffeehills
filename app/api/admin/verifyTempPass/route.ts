import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const { email, tempPassword } = await req.json();
    console.log('Received email:', email);
    console.log('Received temp password:', tempPassword);

    // Fetch the user and their temp password hash
    const user = await prisma.user.findUnique({
      where: { email },
      select: { tempPasswordHash: true },
    });

    if (!user || !user.tempPasswordHash) {
      console.error('No user found or temp password is missing for:', email);
      return NextResponse.json({ error: 'Invalid email or temporary password' }, { status: 401 });
    }

    console.log('Stored hashed temp password:', user.tempPasswordHash);

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(tempPassword, user.tempPasswordHash);
    console.log('bcrypt.compare() result:', isMatch);

    if (!isMatch) {
      console.error('Temp password does not match for:', email);
      return NextResponse.json({ error: 'Invalid email or temporary password' }, { status: 401 });
    }

    // Generate JWT token after successful verification
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });

    return NextResponse.json({ message: 'Verification successful', token });
  } catch (error) {
    console.error('Error verifying temporary password:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
