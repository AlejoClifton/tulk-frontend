'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getBrandingQueryOptions } from '@/features/branding/hooks/queries/getBrand.query-option';
import SignIn from '@/features/home/components/SignIn';

const HeaderProduct = () => {
    const { data: branding } = useSuspenseQuery(getBrandingQueryOptions);
    const router = useRouter();

    return (
        <div className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
            <div className="relative container mx-auto flex flex-wrap items-center justify-between gap-4 p-4 lg:gap-0">
                <div className="flex w-full items-center justify-between gap-2">
                    <Image
                        src={branding?.image || ''}
                        alt={branding?.name || ''}
                        width={200}
                        height={49}
                        priority
                        onClick={() => router.push('/')}
                        className="cursor-pointer"
                    />
                    <SignIn />
                </div>
            </div>
        </div>
    );
};

export default HeaderProduct;
