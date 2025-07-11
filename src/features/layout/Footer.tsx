import React from 'react';
import Image from 'next/image';

import { BrandApi } from '@features/brand/infrastructure/brand-api';

import { SectionTitle, CustomLink, Text, Navegation } from '@/shared/components';

const Footer = async () => {
    const brand = await new BrandApi().getBrands('123');

    return (
        <div className="card-dark">
            <div className="container mx-auto flex flex-col flex-wrap justify-between gap-10 px-5 py-10 md:gap-4 lg:flex-row">
                <div className="flex flex-col gap-4">
                    <Image src="/tulk.png" alt={brand.name} width={200} height={100} />
                    <Text size="sm" variant="tertiary">
                        {brand.description}
                    </Text>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionTitle variant="sm" color="primary" className="mb-4">
                        Navegación
                    </SectionTitle>
                    <Navegation variant="secondary">
                        <CustomLink href="/">Inicio</CustomLink>
                        <CustomLink href="#products">Productos</CustomLink>
                        <CustomLink href="#contact">Contacto</CustomLink>
                    </Navegation>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionTitle variant="sm" color="primary" className="mb-4">
                        Contacto
                    </SectionTitle>
                    <div className="flex flex-col gap-2">
                        <CustomLink href={`mailto:${brand.email}`}>{brand.email}</CustomLink>
                        <CustomLink href={`tel:${brand.phone}`}>{brand.phone}</CustomLink>
                        <CustomLink href={brand.addressLink} target="_blank">
                            {brand.address}
                        </CustomLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
