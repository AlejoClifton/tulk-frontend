'use client';

import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { Subtitle, Title } from '@/components';
import { getBrandingQueryOptions } from '@/features/branding/hooks/queries/getBrand.query-option';

interface HomeGateProps {
    children: React.ReactNode;
}

const HomeGate = ({ children }: HomeGateProps) => {
    const { data: branding } = useSuspenseQuery(getBrandingQueryOptions);

    if (!branding?.webActive) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
                <div className="relative z-10 w-full max-w-2xl">
                    <div className="mx-auto rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-xl md:p-12">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <Title variant="lg">En mantenimiento</Title>
                            <Subtitle variant="md" weight="medium" className="text-slate-600">
                                Muy pronto volveremos con una experiencia mejorada.
                            </Subtitle>
                            <Image src={branding?.image || '/tulk.png'} alt="Tulk" width={200} height={200} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default HomeGate;
