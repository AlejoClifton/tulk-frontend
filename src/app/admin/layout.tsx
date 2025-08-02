import { SessionProvider } from 'next-auth/react';

import AsideAdmin from '@/features/admin/components/AsideAdmin';
import HeaderAdmin from '@/features/admin/components/HeaderAdmin';
import { SessionGuard } from '@/features/admin/providers/SessionGuard';

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
