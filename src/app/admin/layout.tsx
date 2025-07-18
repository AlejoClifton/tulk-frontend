import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { poppins } from '@/styles/Fonts';
import Providers from '@/shared/providers/react-query-provider';

import '@styles/tailwind.css';
import '@styles/globals.css';
import Hydrate from '@/shared/providers/hydrate';
import { getAllProductsOptions } from '@/features/products/application/queries/getAllProducts.option';
import { getAllCategoriesOptions } from '@/features/categories/application/getAllCategories.option';

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
                <Providers>
                    <Hydrate queryOptions={[getAllProductsOptions, getAllCategoriesOptions]}>{children}</Hydrate>
                </Providers>
                <Toaster position="bottom-right" richColors />
            </body>
        </html>
    );
}
