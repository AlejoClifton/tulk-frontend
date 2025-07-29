'use client';

import { SessionProvider } from 'next-auth/react';

import { SessionGuard } from '@/features/auth/components/SessionGuard';
import AsideAdmin from '@/layout/admin/AsideAdmin';
import HeaderAdmin from '@/layout/admin/HeaderAdmin';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <div className="flex flex-col">
                <HeaderAdmin />
                <div className="flex">
                    <AsideAdmin />
                    <SessionGuard>{children}</SessionGuard>
                </div>
            </div>
        </SessionProvider>
    );
}
