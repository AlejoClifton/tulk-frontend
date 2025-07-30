import React from 'react';

import Image from 'next/image';

import { CustomLink, Title } from '@/shared/components';
import Separator from '@/shared/components/ui/Separator';

const HeaderAdmin = () => {
    return (
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-soft">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 p-4">
                <div className="flex flex-row items-center gap-4 md:justify-start">
                    <Image src="/tulk.png" alt="Tulk" width={100} height={24} />
                    <Separator orientation="vertical" />
                    <Title variant="sm" color="secondary">
                        Panel administrativo
                    </Title>
                </div>
                <CustomLink href="/" variant="tertiary">
                    Ver sitio
                </CustomLink>
            </div>
        </header>
    );
};

export default HeaderAdmin;
