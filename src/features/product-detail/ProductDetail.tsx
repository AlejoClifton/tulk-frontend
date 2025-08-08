import React, { Fragment, useEffect } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import BrandContainer from '@/components/BrandContainer';
import Footer from '@/components/Footer';
import PointsSales from '@/components/layout/PointsSales';
import Header from '@/features/home/components/Header';
import BenefitsSection from '@/features/product-detail/components/BenefitsSection';
import FaqsSection from '@/features/product-detail/components/FaqsSection';
import ProductHero from '@/features/product-detail/components/ProductHero';
import SpecificationsSection from '@/features/product-detail/components/SpecificationsSection';
import { getProductQueryOptions } from '@/features/products/hooks/queries/getProduct.query-option';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

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

    if (!product) return <div>Producto no encontrado</div>;

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
            </main>
            <PointsSales />
            <BrandContainer />
            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
