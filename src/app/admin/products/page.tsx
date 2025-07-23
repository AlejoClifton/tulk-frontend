'use client';
import React, { useState } from 'react';

import { ModalProduct } from '@/features/products/ui/components/ModalProduct';
import { ProductInterface } from '@/features/products/domain/product.entity';
import { Button, Subtitle } from '@/shared/components/ui';
import { PlusIcon } from '@/shared/components/icons/SvgContainer';
import { ProductTable } from '@/features/products/ui/components/ProductTable';
import { useProductMutations } from '@/features/products/ui/hooks/useProductMutations';
import AsideAdmin from '@/features/layout/admin/AsideAdmin';

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
        <div className="flex">
            <AsideAdmin />
            <main className="flex flex-1 flex-col gap-4 bg-slate-50 p-8">
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
        </div>
    );
};

export default Products;
