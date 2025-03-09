import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Ensure the request body is parsed correctly
    const body = await req.text();
    const { username, email, password } = JSON.parse(body);

    // Check for missing fields
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(req: NextRequest) {
//   try {
//     const { username, email, password } = await req.json();

//     // Check for missing fields
//     if (!username || !email || !password) {
//       return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json({ error: 'User already exists' }, { status: 409 });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });

//   } catch (error) {
//     console.error('Registration error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


