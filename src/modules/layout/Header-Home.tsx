import React from 'react';
import Image from 'next/image';

import { BrandApi } from '@/contexts/brand/infrastructure/brand-api';

import { CustomLink } from '@/shared/components';
import { Navegation } from '@/shared/components/Navegation';

const HeaderHome = async () => {
    const brand = await new BrandApi().getBrands('123');

    return (
        <div className="border-b border-slate-200 bg-white shadow-sm">
            <div className="container mx-auto relative flex flex-wrap items-center justify-center gap-4 p-4 md:justify-start lg:gap-0">
                <Image src="/tulk.png" alt={brand.name} width={200} height={100} />

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
            </div>
        </div>
    );
};

export default HeaderHome;
