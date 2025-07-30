'use client';

import { BrandEditForm } from '@/features/admin/branding/components/BrandEditForm';
import { Subtitle } from '@/shared/components';

const BrandingPage = () => {
    return (
        <main className="ml-64 flex h-full min-h-screen flex-1 flex-col gap-8 bg-slate-100 p-8">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Subtitle variant="lg">Marca</Subtitle>
                </div>
                <BrandEditForm />
            </div>
        </main>
    );
};

export default BrandingPage;
