// @ts-check
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['booking.imtaedu.com', 'i.redd.it'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://booking.imtaedu.com/api/:path*',
            },
        ];
    },
};

export default withNextIntl(nextConfig);
