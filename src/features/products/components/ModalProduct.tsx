import React from 'react';

import { Modal } from '@/components';
import { FormProduct } from '@/features/products/components/FormProduct';
import type { ProductInterface } from '@/features/products/interfaces/product.interface';

interface FormModalProductProps {
    product: ProductInterface;
    onClose: () => void;
}

export const ModalProduct = ({ product, onClose }: FormModalProductProps) => (
    <Modal title={product.id ? 'Editar producto' : 'Crear producto'} onClose={onClose}>
        <FormProduct product={product} onClose={onClose} />
    </Modal>
);
