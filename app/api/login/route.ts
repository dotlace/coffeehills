import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Ensure the request body is parsed correctly
    const body = await req.text();
    const { email, password } = JSON.parse(body);

    // Check for missing fields
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     // Check for missing fields
//     if (!email || !password) {
//       return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     // Find user in database
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
//     }

//     return NextResponse.json({ message: 'Login successful', user }, { status: 200 });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

