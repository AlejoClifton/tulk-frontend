'use client';

import React, { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import BenefitsSection from '@/app/products/[ID]/components/BenefitsSection';
import FaqsSection from '@/app/products/[ID]/components/FaqsSection';
import HeaderProduct from '@/app/products/[ID]/components/HeaderProduct';
import ProductHero from '@/app/products/[ID]/components/ProductHero';
import SpecificationsSection from '@/app/products/[ID]/components/SpecificationsSection';
import BrandContainer from '@/components/BrandContainer';
import Footer from '@/components/Footer';
import { getProductQueryOptions } from '@/features/products/hooks/queries/getProduct.query-option';

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
