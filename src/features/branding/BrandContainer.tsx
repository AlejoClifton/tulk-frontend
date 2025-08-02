'use client';

import React from 'react';

import { Subtitle, Text } from '@/components';

import { BrandContactInfo, BrandContactForm } from './components';

const BrandContainer = () => {
    return (
        <div id="contact" className="card-dark flex flex-col gap-8 py-16">
            <div className="flex flex-col items-center gap-4">
                <Subtitle variant="xl" className="text-white">
                    Contáctanos
                </Subtitle>
                <Text size="xl" variant="secondary" className="max-w-xl text-center text-white/80">
                    Estamos aquí para ayudarte con consultas técnicas, información de productos y soporte especializado
                </Text>
            </div>
            <div className="mx-6 flex flex-col gap-8 md:mx-0 md:flex-row md:justify-center">
                <BrandContactForm />
                <BrandContactInfo />
            </div>
        </div>
    );
};

export default BrandContainer;
