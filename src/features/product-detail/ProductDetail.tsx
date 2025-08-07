import React, { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import BrandContainer from '@/components/BrandContainer';
import Footer from '@/components/Footer';
import BenefitsSection from '@/features/product-detail/components/BenefitsSection';
import FaqsSection from '@/features/product-detail/components/FaqsSection';
import HeaderProduct from '@/features/product-detail/components/HeaderProduct';
import ProductHero from '@/features/product-detail/components/ProductHero';
import SpecificationsSection from '@/features/product-detail/components/SpecificationsSection';
import { getProductQueryOptions } from '@/features/products/hooks/queries/getProduct.query-option';

const ProductDetail = ({ id }: { id: string }) => {
    const { data: product } = useSuspenseQuery(getProductQueryOptions(id));

    if (!product) return <div>Producto no encontrado</div>;

    return (
        <Fragment key={product.id}>
            <HeaderProduct />
            <main className="flex flex-col">
                <ProductHero product={product} />
                {product.benefits && product.benefits.length > 0 && <BenefitsSection product={product} />}
                {product.technicalSpecification && product.technicalSpecification.length > 0 && (
                    <SpecificationsSection product={product} />
                )}
                {product.faq && product.faq.length > 0 && <FaqsSection product={product} />}
            </main>
            <BrandContainer />
            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
