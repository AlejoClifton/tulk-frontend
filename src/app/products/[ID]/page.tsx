'use client';

import React, { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import BrandContainer from '@/features/brand/BrandContainer';
import BenefitsSection from '@/features/products[ID]/components/BenefitsSection';
import FaqsSection from '@/features/products[ID]/components/FaqsSection';
import HeaderProduct from '@/features/products[ID]/components/HeaderProduct';
import ProductHero from '@/features/products[ID]/components/ProductHero';
import SpecificationsSection from '@/features/products[ID]/components/SpecificationsSection';
import { getProductQueryOptions } from '@/modules/products/application/getProduct.query-option';
import Footer from '@/shared/components/common/Footer';

const ProductDetail = () => {
    const { ID } = useParams();

    const { data: product } = useSuspenseQuery(getProductQueryOptions(ID as string));

    if (!product) return <div>Producto no encontrado</div>;

    return (
        <Fragment key={product.id}>
            <HeaderProduct />
            <main className="flex flex-col">
                <ProductHero product={product} />
                <BenefitsSection product={product} />
                <SpecificationsSection product={product} />
                <FaqsSection product={product} />
            </main>
            <BrandContainer />
            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
