import React from 'react';
import Image from 'next/image';

import { BrandApi } from '@/contexts/brand/infrastructure/brand-api';

import { MailIcon, MapPinIcon, PhoneIcon } from '@/shared/assets/SvgContainer';
import { SectionTitle, CustomLink, Text } from '@/shared/components';
import { Navegation } from '@/shared/components/Navegation';

const Footer = async () => {
    const brand = await new BrandApi().getBrands('123');

    return (
        <div className="card-dark flex flex-col lg:flex-row flex-wrap justify-between gap-10 px-5 py-10 md:gap-4">
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
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[.5rem] bg-orange-01">
                            <MailIcon className="h-6 w-6 text-white" />
                        </div>
                        <CustomLink href={`mailto:${brand.email}`}>{brand.email}</CustomLink>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[.5rem] bg-orange-01">
                            <PhoneIcon className="h-6 w-6 text-white" />
                        </div>
                        <CustomLink href={`tel:${brand.phone}`}>{brand.phone}</CustomLink>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[.5rem] bg-orange-01">
                            <MapPinIcon className="h-6 w-6 text-white" />
                        </div>
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
