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
    const url = req.nextUrl.clone();
    console.log(token, '0k');

    if (pathname === '/login') {
        if (token) {
            url.pathname = '/404';
            return NextResponse.redirect(url);
        }
    }
    if (pathname.startsWith('/admin')) {
        if (!token) {
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
    ],
};
