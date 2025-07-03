import type { Metadata } from 'next';
import { poppins } from '@/shared/assets/Fonts';
import { Toaster } from 'sonner';

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
            <body className={`${poppins.variable}  antialiased`}>
                {children}
                <Toaster position="bottom-right" richColors/>
            </body>
        </html>
    );
}
