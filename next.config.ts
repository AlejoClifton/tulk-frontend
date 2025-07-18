import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        API_URL_CLIENT: process.env.API_URL_CLIENT,
        API_VERSION: process.env.API_VERSION,
        DOMAIN: process.env.DOMAIN,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default nextConfig;
