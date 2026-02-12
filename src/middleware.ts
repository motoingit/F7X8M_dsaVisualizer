import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1. Identify public paths
    const isPublicAsset = pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico' ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg)$/);

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

    if (isPublicAsset) {
        return NextResponse.next();
    }

    // 2. Check for Auth Cookies (Manual check to avoid Edge Runtime Crypto errors)
    // NextAuth v5 / v4 cookies
    const sessionToken = req.cookies.get('authjs.session-token') ||
        req.cookies.get('next-auth.session-token') ||
        req.cookies.get('__Secure-next-auth.session-token');

    const isGuest = req.cookies.get('guest-mode')?.value === 'true';
    const isAuth = !!sessionToken;

    // 3. Logic

    // If logged in, redirect away from Login/Signup
    if (isAuth && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If NOT logged in AND NOT guest AND trying to access protected page
    // (Everything is protected except Login/Signup)
    if (!isAuth && !isGuest && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
