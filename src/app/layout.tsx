import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from 'sonner';

import Providers from '@/providers/react-query-provider';
import { poppins } from '@/styles/Fonts';

import '@styles/tailwind.css';
import '@styles/globals.css';
export const metadata: Metadata = {
    title: 'Tulk',
    description: 'Soluciones Náuticas de Alta Tecnología',
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
