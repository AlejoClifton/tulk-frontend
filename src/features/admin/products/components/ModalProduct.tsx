import React from 'react';

import { FormProduct } from '@/features/admin/products/components/FormProduct';
import type { ProductInterface } from '@/modules/products/domain/product.entity';
import { Modal } from '@/shared/components';

interface FormModalProductProps {
    product: ProductInterface;
    onClose: () => void;
}

export const ModalProduct = ({ product, onClose }: FormModalProductProps) => (
    <Modal title={product.id ? 'Editar producto' : 'Crear producto'} onClose={onClose}>
        <FormProduct product={product} onClose={onClose} />
    </Modal>
);
