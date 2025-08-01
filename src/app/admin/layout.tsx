import { SessionProvider } from 'next-auth/react';

import AsideAdmin from '@/features/admin/AsideAdmin';
import HeaderAdmin from '@/features/admin/HeaderAdmin';
import { SessionGuard } from '@/features/auth/components/SessionGuard';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <SessionGuard>
                <div className="flex flex-col bg-slate-100 min-h-screen">
                    <HeaderAdmin />
                    <div className="flex overflow-y-auto">
                        <AsideAdmin />
                        {children}
                    </div>
                </div>
            </SessionGuard>
        </SessionProvider>
    );
}
