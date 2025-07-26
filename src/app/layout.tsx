import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import Providers from '@/shared/providers/react-query-provider';
import { poppins } from '@/styles/Fonts';
import { SessionProvider } from 'next-auth/react';

import '@styles/tailwind.css';
import '@styles/globals.css';

export const metadata: Metadata = {
    title: 'Tulk',
    description: 'Soluciones Náuticas de Alta Tecnología',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${poppins.variable} antialiased`}>
                <SessionProvider>
                    <Providers>{children}</Providers>
                </SessionProvider>
                <Toaster position="bottom-right" richColors />
            </body>
        </html>
    );
}
