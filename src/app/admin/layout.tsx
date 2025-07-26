import { Suspense } from 'react';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { SessionGuard } from '@/features/auth/components/SessionGuard';
import AsideAdmin from '@/layout/admin/AsideAdmin';
import HeaderAdmin from '@/layout/admin/HeaderAdmin';
import { getAllCategoriesOptions } from '@/modules/categories/application/getAllCategories.option';
import { getAllProductsOptions } from '@/modules/products/application/getAllProducts.option';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import Hydrate from '@/shared/providers/hydrate';
import Providers from '@/shared/providers/react-query-provider';
import { poppins } from '@/styles/Fonts';

import '@styles/tailwind.css';
import '@styles/globals.css';


export const metadata: Metadata = {
    title: 'Administrador',
    description: 'Administrador',
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
                    <div className="flex flex-col">
                        <HeaderAdmin />
                        <div className="flex">
                            <AsideAdmin />
                                <Suspense fallback={<LoadingSpinner />}>
                                    <Providers>
                                        <Hydrate queryOptions={[getAllProductsOptions, getAllCategoriesOptions]}>
                                            <SessionGuard>{children}</SessionGuard>
                                        </Hydrate>
                                    </Providers>
                                </Suspense>
                        </div>
                    </div>
                </SessionProvider>
                <Toaster position="bottom-right" richColors />
            </body>
        </html>
    );
}
