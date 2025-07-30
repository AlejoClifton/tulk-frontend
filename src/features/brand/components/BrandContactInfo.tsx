import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MailIcon, PhoneIcon } from '@/assets/SvgContainer';
import { getBrandQueryOptions } from '@/modules/brand/application/getBrand.query-option';
import { SectionTitle, Subtitle, CustomLink } from '@/shared/components';

export const BrandContactInfo = () => {
    const { data: brand } = useSuspenseQuery(getBrandQueryOptions);

    if (!brand) return null;

    return (
        <div className="w-full rounded-2xl bg-white/10 p-8 backdrop-blur-sm md:w-[31.25rem]">
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
            </div>
            <hr className="my-8 border-white/20" />
            <div className="mt-10 flex flex-col gap-4">
                <SectionTitle className="text-white">Servicios Incluidos</SectionTitle>
                <ul className="flex list-none flex-col gap-2 text-white">
                    <li className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-01">
                            <span className="text-xs text-white">✓</span>
                        </div>
                        Asesoramiento en instalación
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-01">
                            <span className="text-xs text-white">✓</span>
                        </div>
                        Soporte post-venta
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-01">
                            <span className="text-xs text-white">✓</span>
                        </div>
                        Garantía oficial
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-01">
                            <span className="text-xs text-white">✓</span>
                        </div>
                        Repuestos originales
                    </li>
                </ul>
            </div>
        </div>
    );
};
