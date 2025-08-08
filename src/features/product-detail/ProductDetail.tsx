import React, { Fragment, useEffect } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import BrandContainer from '@/components/BrandContainer';
import Footer from '@/components/Footer';
import Header from '@/components/layout/Header';
import PointsSales from '@/components/layout/PointsSales';
import BenefitsSection from '@/features/product-detail/components/BenefitsSection';
import FaqsSection from '@/features/product-detail/components/FaqsSection';
import ProductHero from '@/features/product-detail/components/ProductHero';
import SpecificationsSection from '@/features/product-detail/components/SpecificationsSection';
import { getProductQueryOptions } from '@/features/products/hooks/queries/getProduct.query-option';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';
import { Button, Subtitle, Text } from '@/components';

const ProductDetail = ({ id }: { id: string }) => {
    const { data: product } = useSuspenseQuery(getProductQueryOptions(id));

    useEffect(() => {
        if (product) {
            trackUmamiEvent(ANALYTICS_EVENTS.VIEW_PRODUCT_DETAIL, {
                productId: product.id,
                productName: product.name,
                category: product.category?.name,
            });
        }
    }, [product]);

    if (!product)
        return (
            <Fragment>
                <Header />
                <main className="container mx-auto mt-10 flex flex-col items-start justify-center gap-10">
                    <Text size="lg" variant="primary">
                        Error 404: El producto que estás buscando no existe
                    </Text>
                    <Button variant="default" size="lg" onClick={() => (window.location.href = '/')}>
                        Volver a la página principal
                    </Button>
                </main>
                <PointsSales />
                <BrandContainer />
                <Footer />
            </Fragment>
        );

    return (
        <Fragment key={product.id}>
            <Header />
            <main className="flex flex-col">
                <ProductHero product={product} />
                {product.benefits && product.benefits.length > 0 && <BenefitsSection product={product} />}
                {product.technicalSpecification && product.technicalSpecification.length > 0 && (
                    <SpecificationsSection product={product} />
                )}
                {product.faq && product.faq.length > 0 && <FaqsSection product={product} />}
                <PointsSales />
                <BrandContainer />
            </main>
            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
