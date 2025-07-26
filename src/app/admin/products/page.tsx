'use client';
import React, { useState } from 'react';

import { PlusIcon } from '@/assets/SvgContainer';
import { ModalProduct } from '@/features/products/components/ModalProduct';
import { ProductTable } from '@/features/products/components/ProductTable';
import { useProductMutations } from '@/features/products/hooks/useProductMutations';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { Button, Subtitle } from '@/shared/components/ui';

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

    const handleDelete = (id: string) => {
        deleteProduct.mutate(id);
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
