import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from 'sonner';

import { brandingInitialData } from '@/features/branding/interfaces/branding';
import Providers from '@/providers/react-query-provider';
import { poppins } from '@/styles/Fonts';

import '@styles/tailwind.css';
import '@styles/globals.css';

export const metadata: Metadata = {
    title: {
        default: brandingInitialData.name,
        template: `%s | ${brandingInitialData.name}`,
    },
    description: brandingInitialData.description,
    keywords: ['productos', 'venta', 'tulk', 'empresa', 'comercio'],
    authors: [{ name: brandingInitialData.name }],
    creator: brandingInitialData.name,
    publisher: brandingInitialData.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(brandingInitialData.domain),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: brandingInitialData.domain,
        title: brandingInitialData.name,
        description: brandingInitialData.description,
        siteName: brandingInitialData.name,
        images: [
            {
                url: brandingInitialData.image,
                width: 1200,
                height: 630,
                alt: `${brandingInitialData.name} - ${brandingInitialData.description}`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: brandingInitialData.name,
        description: brandingInitialData.description,
        images: [brandingInitialData.image],
        creator: '@alejoclifton',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: brandingInitialData.image, sizes: '32x32', type: 'image/png' },
            { url: brandingInitialData.image, sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: brandingInitialData.image, sizes: '180x180', type: 'image/png' }],
        shortcut: brandingInitialData.image,
    },
    manifest: '/manifest.json',
    category: 'business',
    classification: 'business',
    other: {
        'theme-color': '#db5800',
        'msapplication-TileColor': '#db5800',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': brandingInitialData.name,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <head>
                <Script
                    src="https://umami.alejoclifton.com/script.js"
                    data-website-id="d0f08d74-dc44-47f4-a42d-788323466ed8"
                    strategy="afterInteractive"
                />
            </head>
            <body className={`${poppins.variable} antialiased`}>
                <Providers>{children}</Providers>
                <Toaster position="bottom-right" richColors />
            </body>
        </html>
    );
}
