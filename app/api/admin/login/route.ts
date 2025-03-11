import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check for missing fields
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Find admin in database
    const admin = await prisma.user.findUnique({ where: { email, role: 'admin' } });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // ✅ Store `userRole=admin` and `authToken` in secure cookies
    const response = NextResponse.json(
      { message: 'Admin login successful', user: { username: admin.username, role: 'admin' } },
      { status: 200 }
    );

    // Set authentication cookies
    response.cookies.set('userRole', 'admin', {
      path: '/',
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    });

    response.cookies.set('authToken', 'admin-session', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
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

//     // Find admin in database
//     const admin = await prisma.user.findUnique({ where: { email, role: 'admin' } });
//     if (!admin) {
//       return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
//     }

//     // ✅ Store `userRole=admin` in a secure cookie
//     const response = NextResponse.json({ message: 'Admin login successful', user: admin }, { status: 200 });

//     response.cookies.set('userRole', 'admin', {
//       path: '/',
//       httpOnly: true,  // Prevents client-side access
//       secure: process.env.NODE_ENV === 'production',  // Secure in production
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 7, // 7 days expiration
//     });

//     return response;
//   } catch (error) {
//     console.error('Admin login error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

