'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getBrandQueryOptions } from '@/modules/brand/application/getBrand.query-option';
import { CustomLink, Navegation } from '@/shared/components';

import SignIn from '@/features/home/components/SignIn';

const HeaderHome = () => {
    const { data: brand } = useSuspenseQuery(getBrandQueryOptions);

    return (
        <div className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
            <div className="relative container mx-auto flex flex-wrap items-center justify-between gap-4 p-4 lg:gap-0">
                <Image src={brand?.image || ''} alt={brand?.name || ''} width={200} height={49} priority />

                <Navegation className="flex justify-center gap-4 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <CustomLink href="/" variant="primary">
                        Inicio
                    </CustomLink>
                    <CustomLink href="#lines-products" variant="primary">
                        Líneas de Productos
                    </CustomLink>
                    <CustomLink href="#contact" variant="primary">
                        Contacto
                    </CustomLink>
                </Navegation>
                <SignIn />
            </div>
        </div>
    );
};

export default HeaderHome;
