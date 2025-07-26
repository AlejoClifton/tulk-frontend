import React from 'react';

import Image from 'next/image';

import { BrandApi } from '@/modules/brand/infrastructure/brand-api';
import { CustomLink, Navegation } from '@/shared/components';

import SignIn from './SignIn';

const HeaderHome = async () => {
    // const brand = await new BrandApi().getBrand();

    return (
        <div className="border-b border-slate-200 bg-white shadow-sm">
            <div className="relative container mx-auto flex flex-wrap items-center justify-between gap-4 p-4 lg:gap-0">
                {/* <Image src={brand?.image || ''} alt={brand?.name || ''} width={200} height={100} /> */}

                <Navegation className="flex justify-center gap-4 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <CustomLink href="/" variant="primary">
                        Inicio
                    </CustomLink>
                    <CustomLink href="#products" variant="primary">
                        Productos
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
