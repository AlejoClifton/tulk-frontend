import React from 'react';

import { MailIcon, MapPinIcon, PhoneIcon } from '@/shared/assets/SvgContainer';
import { PanelCard, SectionTitle, Subtitle } from '@/shared/components';

import { BrandApi } from '@contexts/brand/infrastructure/brand-api';
import { CustomLink } from '@/shared/components/Link';

export const BrandContactInfo = async () => {
    const brand = await new BrandApi().getBrands('123');

    return (
        <PanelCard variant="dark" className="w-full md:w-[31.25rem]">
            <Subtitle variant="lg" color="primary" className="mb-8">
                Información de contacto
            </Subtitle>
            <div className="grid grid-cols-1 gap-8">
                <div className="col-span-1 flex items-center gap-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[.5rem] bg-orange-01">
                        <MailIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <SectionTitle variant="sm" color="primary">
                            Correo electrónico
                        </SectionTitle>
                        <CustomLink href={`mailto:${brand.email}`}>{brand.email}</CustomLink>
                    </div>
                </div>
                <div className="col-span-1 flex items-center gap-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[.5rem] bg-orange-01">
                        <PhoneIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <SectionTitle variant="sm" color="primary">
                            Teléfono
                        </SectionTitle>
                        <CustomLink href={`tel:${brand.phone}`}>{brand.phone}</CustomLink>
                    </div>
                </div>
                <div className="col-span-1 flex items-center gap-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[.5rem] bg-orange-01">
                        <MapPinIcon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <SectionTitle variant="sm" color="primary">
                            Dirección
                        </SectionTitle>
                        <CustomLink href={brand.addressLink} target="_blank">
                            {brand.address}
                        </CustomLink>
                    </div>
                </div>
            </div>
            <hr className="my-8 border-tertiary" />
            <div className="mt-10 flex flex-col gap-4">
                <SectionTitle color="primary">Horario de atención</SectionTitle>
                <ul className="flex list-none flex-col gap-2 text-tertiary">
                    {brand.hours.map((hour) => (
                        <li key={hour}>{hour}</li>
                    ))}
                </ul>
            </div>
        </PanelCard>
    );
};
