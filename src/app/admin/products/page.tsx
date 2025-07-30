'use client';
import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { PlusIcon } from '@/assets/SvgContainer';
import { ModalProduct } from '@/features/admin/products/components/ModalProduct';
import { ProductTable } from '@/features/admin/products/components/ProductTable';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { Button, Subtitle } from '@/shared/components/ui';
import { useProductMutations } from '@/shared/hooks/useProductMutations';

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
    const queryClient = useQueryClient();

    const refetchProducts = () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
    };

    const { deleteProduct, isLoading } = useProductMutations(refetchProducts);

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
        <main className="ml-64 flex h-full min-h-screen flex-1 flex-col gap-8 bg-slate-100 p-8">
            <div className="flex flex-1 flex-col gap-4">
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
