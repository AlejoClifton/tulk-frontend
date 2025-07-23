import React from 'react';
import { Modal } from '@/shared/components';
import { FormProduct } from './FormProduct';

import type { ProductInterface } from '@/modules/products/domain/product.entity';

interface FormModalProductProps {
    product: ProductInterface;
    onClose: () => void;
}

export const ModalProduct = ({ product, onClose }: FormModalProductProps) => (
    <Modal title={product.id ? 'Editar producto' : 'Crear producto'} onClose={onClose}>
        <FormProduct product={product} onClose={onClose} />
    </Modal>
);
