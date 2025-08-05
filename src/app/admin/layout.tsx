import AsideAdmin from '@/features/admin/components/AsideAdmin';
import HeaderAdmin from '@/features/admin/components/HeaderAdmin';
import { ProtectedRouteClient } from '@/features/auth/ProtectedRouteClient';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRouteClient>
            <div className="flex min-h-screen flex-col bg-slate-100">
                <HeaderAdmin />
                <div className="flex overflow-y-auto">
                    <AsideAdmin />
                    {children}
                </div>
            </div>
        </ProtectedRouteClient>
    );
}
