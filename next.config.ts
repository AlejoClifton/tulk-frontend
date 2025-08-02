import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default withSentryConfig(nextConfig, {
    org: 'monderks',
    project: 'tulk-frontend-prod',
    sentryUrl: 'https://glitchtip.alejoclifton.com/',
    silent: !process.env.CI,

    widenClientFileUpload: true,

    tunnelRoute: '/monitoring',

    disableLogger: true,

    automaticVercelMonitors: true,
});
