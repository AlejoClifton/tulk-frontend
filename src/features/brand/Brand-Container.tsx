'use client';

import React from 'react';

import { Subtitle, Text } from '@/shared/components';

import { BrandContactInfo, BrandContactForm } from './components';

const BrandContainer = () => {
    return (
        <div id="contact" className="my-16 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
                <Subtitle variant="xl">Contactanos</Subtitle>
                <Text size="xl" variant="secondary" className="max-w-xl text-center">
                    Estamos aquí para ayudarte con consultas técnicas, información de productos y soporte especializado
                </Text>
            </div>
            <div className="flex flex-col gap-8 md:flex-row md:justify-center">
                <BrandContactForm />
                {/* <BrandContactInfo /> */}
            </div>
        </div>
    );
};

export default BrandContainer;
