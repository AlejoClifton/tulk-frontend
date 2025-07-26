import { Suspense } from 'react';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

import { SessionGuard } from '@/features/auth/components/SessionGuard';
import AsideAdmin from '@/layout/admin/AsideAdmin';
import HeaderAdmin from '@/layout/admin/HeaderAdmin';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { getQueryClient } from '@/shared/lib/get-query-client';

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = getQueryClient();

    return (
        <div className="flex flex-col">
            <HeaderAdmin />
            <div className="flex">
                <AsideAdmin />
                <Suspense fallback={<LoadingSpinner />}>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <SessionGuard>{children}</SessionGuard>
                    </HydrationBoundary>
                </Suspense>
            </div>
        </div>
    );
}
