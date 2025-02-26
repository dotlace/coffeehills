// app/api/test/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error connecting to database:', error);
    return NextResponse.json({ success: false, message: 'Connection failed' }, { status: 500 });
  }
}
