import React from 'react';

import { ProductInterface } from '@/modules/products/domain/product.entity';
import { SectionTitle, Subtitle, Text } from '@/shared/components';

interface SpecificationsSectionProps {
    product: ProductInterface;
}

const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({ product }) => {
    return (
        <section id="specifications" className="flex flex-col gap-8 rounded-lg bg-slate-50 py-32">
            <div className="flex flex-col gap-2">
                <Subtitle variant="2xl" className="text-center">
                    Especificaciones técnicas
                </Subtitle>
                <SectionTitle variant="lg" className="text-center" weight="normal" color="tertiary">
                    Información técnica del producto
                </SectionTitle>
            </div>
            <div className="container mx-auto flex flex-col gap-4">
                {product.technicalSpecifications?.map((specification, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <SectionTitle variant="lg" color="secondary" className="rounded-lg bg-orange-04 px-4 py-2">
                            {specification.title}
                        </SectionTitle>
                        <div className="flex flex-col gap-2 rounded-lg">
                            {specification.specifications.map((spec, idx) => (
                                <div
                                    key={idx}
                                    className="flex-start flex flex-row items-center gap-2 rounded-lg border border-slate-200 bg-white p-4">
                                    <Text variant="secondary" weight="semibold" size="lg" className="w-1/2">
                                        {spec.key}
                                    </Text>
                                    <Text variant="secondary" weight="medium" size="lg">
                                        {spec.value}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpecificationsSection;
