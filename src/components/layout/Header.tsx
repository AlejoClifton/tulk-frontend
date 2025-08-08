'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { CustomLink } from '@/components';
import { getBrandingQueryOptions } from '@/features/branding/hooks/queries/getBrand.query-option';
import SignIn from '@/features/home/components/SignIn';

const Header = () => {
    const { data: branding } = useSuspenseQuery(getBrandingQueryOptions);

    return (
        <div className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
            <div className="relative container mx-auto flex flex-wrap items-center justify-between gap-4 p-4 lg:gap-0">
                <div className="flex w-full items-center justify-between gap-4 md:w-auto">
                    <CustomLink href="/">
                        <Image
                            src={branding?.image || '/tulk.png'}
                            alt={branding?.name || 'Tulk'}
                            width={200}
                            height={49}
                            priority
                        />
                    </CustomLink>
                    <div className="md:hidden">
                        <SignIn />
                    </div>
                </div>
                <div className="hidden md:block">
                    <SignIn />
                </div>
            </div>
        </div>
    );
};

export default Header;
