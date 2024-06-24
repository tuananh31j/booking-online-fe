import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// Tạo middleware quốc tế hóa
const intlMiddleware = createMiddleware({
    locales: ['en', 'vn'],
    defaultLocale: 'en',
    localePrefix: 'never',
});

export default async function middleware(req: NextRequest) {
    const res = intlMiddleware(req);

    const { pathname } = req.nextUrl;
    const token = req.cookies.get('accessToken')?.value;
    const user = req.cookies.get('user')?.value;
    const url = req.nextUrl.clone();

    if (pathname === '/login') {
        if (token) {
            url.pathname = '/404';
            return NextResponse.redirect(url);
        }
    }
    if (pathname.startsWith('/admin') || pathname.startsWith('/staff')) {
        if (user) {
            const userObj = JSON.parse(user);
            if (!token) {
                url.pathname = '/login';
                return NextResponse.redirect(url);
            }
            if (pathname.startsWith('/admin')) {
                if (userObj.role !== 0) {
                    url.pathname = '/404';
                    return NextResponse.redirect(url);
                }
            }
            if (pathname.startsWith('/staff') && userObj.role === 0) {
                url.pathname = '/admin/dashboard';
                return NextResponse.redirect(url);
            }
        } else {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return res;
}

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)', // Áp dụng cho tất cả các route trừ api, _next, _vercel, và các tệp tĩnh
        '/([\\w-]+)?/users/(.+)', // Áp dụng cho các route dưới /users
        '/login', // Áp dụng cho /login
        '/admin/:path*', // Áp dụng cho /admin và tất cả các route con
        '/staff/:path*', // Áp dụng cho /admin và tất cả các route con
    ],
};
