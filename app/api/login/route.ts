// app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Remove password before returning user object
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error logging in user:', error ?? {});
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
