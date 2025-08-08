'use client';
import { Suspense } from 'react';

import { useParams } from 'next/navigation';

import { LoadingSpinner } from '@/components';
import ProductDetail from '@/features/product-detail/ProductDetail';

export const dynamic = 'force-dynamic';

const ProductDetailContent = () => {
    const { ID } = useParams();
    return <ProductDetail id={ID as string} />;
};

const ProductDetailPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white">
                    <div className="flex min-h-screen items-center justify-center">
                        <LoadingSpinner size={48} label="Cargando producto..." />
                    </div>
                </div>
            }>
            <ProductDetailContent />
        </Suspense>
    );
};

export default ProductDetailPage;
