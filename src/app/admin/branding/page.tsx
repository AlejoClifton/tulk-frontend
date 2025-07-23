import AsideAdmin from '@/features/layout/admin/AsideAdmin';
import { Subtitle } from '@/shared/components/ui';
import React from 'react';

const Branding = () => {
    return (
        <div className="flex">
            <AsideAdmin />
            <main className="flex flex-1 flex-col gap-4 bg-slate-50 p-8">
                <Subtitle variant="lg">Marca</Subtitle>
            </main>
        </div>
    );
};

export default Branding;
