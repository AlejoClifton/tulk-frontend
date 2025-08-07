import React from 'react';

import { BookIcon } from '@/assets/SvgContainer';
import { Button, Text, Title, ImageGallery } from '@/components';
import { ProductInterface } from '@/features/products/interfaces/product.interface';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

interface ProductHeroProps {
    product: ProductInterface;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
    // const allImages = [product.mainImageUrl, ...product.imagesUrl];

    const handleDownloadManual = () => {
        trackUmamiEvent(ANALYTICS_EVENTS.DOWNLOAD_MANUAL, {
            productId: product.id,
            productName: product.name,
        });

        if (product.manualUrl) {
            const isDriveLink = product.manualUrl.includes('drive.google.com');

            if (isDriveLink) {
                const fileId = product.manualUrl.match(/[-\w]{25,}/);
                if (fileId) {
                    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
                    window.open(downloadUrl, '_blank');
                    return;
                }
            }

            window.open(product.manualUrl, '_blank');
        }
    };

    return (
        <section>
            <div className="container mx-auto flex flex-col items-center gap-12 py-10 md:flex-row md:justify-center">
                <div className="max-w-[32rem] rounded-2xl bg-gray-50 p-8 md:w-1/2">
                    <ImageGallery
                        images={product.imagesUrl || []}
                        alt={product.name}
                        thumbnailSize="md"
                        mainImageHeight="h-[32rem]"
                    />
                </div>

                <div className="flex w-full flex-col gap-4 px-6 md:mx-0 md:w-1/2 md:px-0">
                    <div className="flex w-fit flex-row gap-2 rounded-lg bg-orange-04 px-4 py-1">
                        <Text variant="orange" weight="semibold" size="lg">
                            {product.category?.name}
                        </Text>
                    </div>
                    <Title variant="lg">{product.name}</Title>
                    <Text variant="secondary">{product.description}</Text>
                    {product.manualUrl && (
                        <Button size="lg" className="flex items-center gap-2 self-start" onClick={handleDownloadManual}>
                            Descargar manual
                            <BookIcon className="h-8 w-8" />
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductHero;
