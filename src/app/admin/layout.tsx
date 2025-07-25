import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import { SessionProvider } from 'next-auth/react';

import { poppins } from '@/styles/Fonts';
import Providers from '@/shared/providers/react-query-provider';

import '@styles/tailwind.css';
import '@styles/globals.css';

import Hydrate from '@/shared/providers/hydrate';
import { getAllProductsOptions } from '@/modules/products/application/queries/getAllProducts.option';
import { getAllCategoriesOptions } from '@/modules/categories/application/getAllCategories.option';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';

import HeaderAdmin from '@/layout/admin/HeaderAdmin';
import AsideAdmin from '@/layout/admin/AsideAdmin';
import { SessionGuard } from '@/features/auth/components/SessionGuard';

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
