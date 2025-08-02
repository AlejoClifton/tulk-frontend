'use client';
import React, { useState } from 'react';

import { PlusIcon } from '@/assets/SvgContainer';
import { Button, Subtitle } from '@/components/ui';
import { ModalProduct } from '@/features/products/components/ModalProduct';
import { ProductTable } from '@/features/products/components/ProductTable';
import { useProductMutations } from '@/features/products/hooks/queries/useProductMutations';
import { ProductInterface } from '@/features/products/interfaces/product.interface';

const productInitialState: ProductInterface = {
    id: '',
    name: '',
    description: '',
    categoryId: '',
    mainImageUrl: '',
    imagesUrl: [],
    isActive: true,
};

const Products = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [product, setProduct] = useState<ProductInterface | null>(null);

    const { deleteProduct, isLoading } = useProductMutations();

    const handleOpenModal = (product: ProductInterface) => {
        setIsOpenModal(true);
        setProduct(product);
    };

    const handleDelete = (productToDelete: ProductInterface) => {
        const imageUrlsToDelete = [
            ...productToDelete.imagesUrl,
            ...(productToDelete.mainImageUrl ? [productToDelete.mainImageUrl] : []),
        ];

        deleteProduct.mutate({ id: productToDelete.id || '', imageUrls: imageUrlsToDelete });
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setProduct(null);
    };

    return (
        <main className="lg:ml-64 flex flex-col bg-slate-100 p-4 lg:p-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Subtitle variant="lg">Productos</Subtitle>
                    <Button
                        variant="success"
                        size="md"
                        onClick={() => handleOpenModal(productInitialState)}
                        className="flex items-center justify-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Agregar
                    </Button>
                </div>
                <ProductTable handleOpenModal={handleOpenModal} handleDelete={handleDelete} isLoading={isLoading} />
            </div>
            {isOpenModal && product && <ModalProduct product={product} onClose={handleCloseModal} />}
        </main>
    );
};

export default Products;
