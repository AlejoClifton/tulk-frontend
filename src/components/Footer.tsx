'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { SectionTitle, CustomLink, Text } from '@/components';
import { getBrandingQueryOptions } from '@/features/branding/hooks/queries/getBrand.query-option';
import { brandingInitialData } from '@/features/branding/interfaces/branding';

const Footer = () => {
    const { data: branding } = useSuspenseQuery(getBrandingQueryOptions);

    return (
        <div className="card-dark">
            <div className="container mx-auto flex flex-col flex-wrap justify-between gap-10 px-5 py-10 md:gap-4 lg:flex-row">
                <div className="flex flex-col gap-4">
                    <Image
                        src={branding?.image || brandingInitialData.image}
                        alt={branding?.name || brandingInitialData.name}
                        width={200}
                        height={49}
                        priority
                    />
                    <Text size="sm" variant="tertiary">
                        {branding?.description || brandingInitialData.description}
                    </Text>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionTitle variant="sm" color="primary" className="mb-4">
                        Contacto
                    </SectionTitle>
                    <div className="flex flex-col gap-2">
                        <CustomLink href={`mailto:${branding?.email || brandingInitialData.email}`}>
                            {branding?.email || brandingInitialData.email}
                        </CustomLink>
                        <CustomLink href={`tel:${branding?.phone || brandingInitialData.phone}`}>
                            {branding?.phone || brandingInitialData.phone}
                        </CustomLink>
                        <CustomLink href={branding?.addressLink || brandingInitialData.addressLink} target="_blank">
                            {branding?.address || brandingInitialData.address}
                        </CustomLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
