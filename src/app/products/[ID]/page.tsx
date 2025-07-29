'use client';

import React, { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import BrandContainer from '@/features/brand/Brand-Container';
import BenefitsSection from '@/features/products/components/one-product/BenefitsSection';
import FaqsSection from '@/features/products/components/one-product/FaqsSection';
import ProductHero from '@/features/products/components/one-product/ProductHero';
import SpecificationsSection from '@/features/products/components/one-product/SpecificationsSection';
import Footer from '@/layout/Footer';
import HeaderProduct from '@/layout/product/HeaderProduct';
import { getProductOptions } from '@/modules/products/application/getProduct.option';

const ProductDetail = () => {
    const { ID } = useParams();

    const { data: product } = useSuspenseQuery(getProductOptions(ID as string));

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
