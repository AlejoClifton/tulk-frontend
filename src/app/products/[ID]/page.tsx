'use client';
import { useParams } from 'next/navigation';

import ProductDetail from '@/features/product-detail/ProductDetail';

const ProductDetailPage = () => {
    const { ID } = useParams();
    return <ProductDetail id={ID as string} />;
};

export default ProductDetailPage;
