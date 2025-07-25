import { Subtitle } from '@/shared/components';
import React from 'react';

const Categories = () => {
    return (
        <main className="ml-64 flex h-full min-h-screen flex-1 flex-col gap-8 bg-slate-100 p-8">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Subtitle variant="lg">Categorías</Subtitle>
                </div>
            </div>
        </main>
    );
};

export default Categories;
