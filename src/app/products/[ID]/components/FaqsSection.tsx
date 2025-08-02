'use client';

import React from 'react';

import { SectionTitle, Subtitle, Text } from '@/components';
import { Faq, ProductInterface } from '@/features/products/interfaces/product.interface';

interface FaqsSectionProps {
    product: ProductInterface;
}

const FaqsSection: React.FC<FaqsSectionProps> = ({ product }) => {
    return (
        <section id="faqs" className="flex flex-col gap-8 px-6 py-32 md:px-0">
            <div className="flex flex-col gap-2">
                <Subtitle variant="2xl" className="text-center">
                    Preguntas frecuentes
                </Subtitle>
                <SectionTitle variant="lg" className="text-center" weight="normal" color="tertiary">
                    Respuestas a las consultas técnicas más comunes
                </SectionTitle>
            </div>
            <div className="container mx-auto flex flex-col gap-4">
                {product.faq?.map((faq: Faq, index: number) => (
                    <div
                        key={index}
                        className="mx-auto flex max-w-4xl flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
                        <Text variant="secondary" weight="semibold" size="lg">
                            {faq.question}
                        </Text>
                        <Text variant="secondary" weight="normal" size="lg">
                            {faq.answer}
                        </Text>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FaqsSection;
