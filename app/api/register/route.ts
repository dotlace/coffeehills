import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';  // Ensure this is correctly imported from your Prisma client
import { z } from 'zod';

// Define Zod schema for input validation
const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON payload
    const { username, email, password } = await req.json();

    // Check if data is valid
    console.log('Received data:', { username, email, password });

    // Validate input using Zod schema
    const parsedData = RegisterSchema.safeParse({ username, email, password });
    if (!parsedData.success) {
      console.error('Validation failed:', parsedData.error.format());
      return NextResponse.json(
        { error: 'Invalid input data', details: parsedData.error.format() },
        { status: 400 }
      );
    }

    // Ensure fields are not null or empty
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields must be filled.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User successfully registered', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    // Log detailed error message to help debug
    if (error instanceof Error) {
      console.error('Error during registration:', error.message);
      console.error('Stack trace:', error.stack);
      return NextResponse.json(
        { error: error.message, stack: error.stack },
        { status: 500 }
      );
    }

    console.error('Unexpected error during registration:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
