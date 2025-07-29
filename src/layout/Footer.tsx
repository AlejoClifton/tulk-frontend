'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getBrandOptions } from '@/modules/brand/application/getBrand.option';
import { SectionTitle, CustomLink, Text } from '@/shared/components';

const Footer = () => {
    const { data: brand } = useSuspenseQuery(getBrandOptions);

    return (
        <div className="card-dark">
            <div className="container mx-auto flex flex-col flex-wrap justify-between gap-10 px-5 py-10 md:gap-4 lg:flex-row">
                <div className="flex flex-col gap-4">
                    <Image src={brand?.image || ''} alt={brand?.name || ''} width={200} height={49} priority />
                    <Text size="sm" variant="tertiary">
                        {brand?.description}
                    </Text>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionTitle variant="sm" color="primary" className="mb-4">
                        Contacto
                    </SectionTitle>
                    <div className="flex flex-col gap-2">
                        <CustomLink href={`mailto:${brand?.email || ''}`}>{brand?.email}</CustomLink>
                        <CustomLink href={`tel:${brand?.phone || ''}`}>{brand?.phone}</CustomLink>
                        <CustomLink href={brand?.addressLink || ''} target="_blank">
                            {brand?.address || ''}
                        </CustomLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
