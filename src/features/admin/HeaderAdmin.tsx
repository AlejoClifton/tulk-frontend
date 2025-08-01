'use client';
import React, { useState } from 'react';

import Image from 'next/image';

import { MenuCloseIcon } from '@/assets/SvgContainer';
import AsideAdminMobile from '@/features/admin/AsideAdminMobile';
import { CustomLink, Title } from '@/shared/components';
import Separator from '@/shared/components/ui/Separator';

const HeaderAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (isOpen: boolean) => {
        setIsOpen(isOpen);
    };

    return (
        <>
            <header className="shadow-soft sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
                <div className="flex w-full flex-wrap items-center justify-between gap-4 p-4">
                    <div className="flex flex-row items-center gap-2 md:justify-start md:gap-4">
                        <Image src="/tulk.png" alt="Tulk" width={100} height={24} />
                        <Separator orientation="vertical" />
                        <Title variant="sm" color="secondary">
                            Panel administrativo
                        </Title>
                    </div>
                    <div className="flex w-full select-none items-center justify-between gap-4 lg:w-auto lg:justify-start">
                        <div
                            className="flex cursor-pointer items-center gap-2 lg:hidden"
                            onClick={() => handleChange(!isOpen)}>
                            <MenuCloseIcon
                                className={`h-6 w-6 text-slate-500 transition-all duration-300 ${isOpen ? 'rotate-90 text-slate-800' : 'text-slate-500'}`}
                            />
                            <span
                                className={`text-sm font-medium text-slate-500 ${isOpen ? 'text-slate-800' : 'text-slate-500'}`}>
                                Menú
                            </span>
                        </div>
                        <CustomLink href="/" variant="tertiary">
                            Ver sitio
                        </CustomLink>
                    </div>
                </div>
            </header>
            {isOpen && <AsideAdminMobile />}
        </>
    );
};

export default HeaderAdmin;
