import React from 'react';

import { BookIcon } from '@/assets/SvgContainer';
import { Button, Text, Title, ImageGallery } from '@/components';
import { ProductInterface } from '@/features/products/interfaces/product.interface';

interface ProductHeroProps {
    product: ProductInterface;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
    // const allImages = [product.mainImageUrl, ...product.imagesUrl];

    return (
        <section>
            <div className="container mx-auto flex flex-row items-center gap-12 py-10">
                <div className="w-1/2 rounded-2xl bg-gray-50 p-8">
                    <ImageGallery
                        images={product.imagesUrl}
                        alt={product.name}
                        thumbnailSize="md"
                        mainImageHeight="h-[32rem]"
                    />
                </div>

                <div className="flex w-1/2 flex-col gap-4">
                    <div className="flex w-fit flex-row gap-2 rounded-lg bg-orange-04 px-4 py-1">
                        <Text variant="orange" weight="semibold" size="lg">
                            {product.category?.name}
                        </Text>
                    </div>
                    <Title variant="lg">{product.name}</Title>
                    <Text variant="secondary">{product.description}</Text>
                    <Button size="lg" className="flex items-center gap-2 self-start">
                        Descargar manual
                        <BookIcon className="h-8 w-8" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ProductHero;
