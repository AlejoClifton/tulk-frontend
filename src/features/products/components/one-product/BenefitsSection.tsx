import React from 'react';

import { OkIcon } from '@/assets/SvgContainer';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { SectionTitle, Subtitle, Text } from '@/shared/components';

interface BenefitsSectionProps {
    product: ProductInterface;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ product }) => {
    return (
        <section id="benefits" className="flex flex-col gap-8 py-32">
            <div className="flex flex-col gap-2">
                <Subtitle variant="2xl" className="text-center">
                    Beneficios y Características
                </Subtitle>
                <SectionTitle variant="lg" className="text-center" weight="normal" color="tertiary">
                    Características técnicas que hacen de este producto la mejor opción
                </SectionTitle>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {product.benefits?.map((benefit, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
                        <div className="flex h-12 w-12 flex-row items-center justify-center rounded-lg bg-[#FFE4CC]">
                            <OkIcon className="h-6 w-6 text-[#FF8A4C]" />
                        </div>
                        <Text variant="secondary" className="text-center" weight="semibold" size="sm">
                            {benefit}
                        </Text>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
