import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authToken')?.value || '';
  const userRole = req.cookies.get('userRole')?.value || '';

  // ✅ Skip middleware for password reset links
  if (req.nextUrl.pathname.startsWith('/admin/adminChangePass')) {
    return NextResponse.next();
  }

  // ✅ Restrict access to admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!authToken || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // ✅ Handle login redirections based on role
  if (req.nextUrl.pathname === '/login') {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    } else if (authToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/dashboard'],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const authToken = req.cookies.get('authToken')?.value || '';
//   const userRole = req.cookies.get('userRole')?.value || '';

//   if (req.nextUrl.pathname.startsWith('/admin')) {
//     if (!authToken || userRole !== 'admin') {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }

//   if (req.nextUrl.pathname === '/login') {
//     if (userRole === 'admin') {
//       return NextResponse.redirect(new URL('/admin/dashboard', req.url));
//     } else if (authToken) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/login', '/dashboard'],
// };
