'use client';
import React, { useState } from 'react';

import { ModalProduct } from '@/features/products/ui/components/ModalProduct';
import { ProductInterface } from '@/features/products/domain/product.entity';
import { Button, Subtitle } from '@/shared/components/ui';
import { PlusIcon } from '@/shared/components/icons/SvgContainer';
import { ProductTable } from '@/features/products/ui/components/ProductTable';
import { useProductMutations } from '@/features/products/ui/hooks/useProductMutations';

const productInitialState: ProductInterface = {
    id: '',
    name: '',
    description: '',
    categoryId: '',
    mainImageUrl: '',
    imagesUrl: [],
    isActive: true,
};

const Admin = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [product, setProduct] = useState<ProductInterface | null>(null);

    const { deleteProduct } = useProductMutations();

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
        <>
            <div className="container mx-auto flex flex-col gap-4 p-4">
                <div className="flex justify-between">
                    <Subtitle variant="lg">Listado de productos</Subtitle>
                    <Button
                        variant="success"
                        onClick={() => handleOpenModal(productInitialState)}
                        size="icon"
                        className="flex h-10 w-10 items-center justify-center">
                        <PlusIcon className="h-5 w-5" />
                    </Button>
                </div>
                <ProductTable handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            </div>
            {isOpenModal && product && <ModalProduct product={product} onClose={handleCloseModal} />}
        </>
    );
};

export default Admin;
