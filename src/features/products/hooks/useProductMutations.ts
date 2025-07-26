'use client';

import { useSession } from 'next-auth/react';
import {
    createProductUseCase,
    deleteProductUseCase,
    updateProductUseCase,
} from '@/modules/products/application/use-cases';
import { ProductAdapter } from '@/modules/products/infrastructure/product.adapter';
import { ProductInterface, ProductUpdatePayload } from '@/modules/products/domain';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export const useProductMutations = () => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken ?? '';

    const deleteProduct = useBaseMutation({
        mutationFn: async (id: string) => {
            const productAdapter = new ProductAdapter(token);
            return deleteProductUseCase(productAdapter, id);
        },
        queryKey: ['products'],
        successMessage: 'Producto eliminado correctamente',
        errorMessage: 'Error al eliminar el producto',
    });

    const updateProduct = useBaseMutation({
        mutationFn: async (product: ProductUpdatePayload) => {
            const productAdapter = new ProductAdapter(token);
            return updateProductUseCase(productAdapter, product);
        },
        queryKey: ['products'],
        successMessage: 'Producto actualizado correctamente',
        errorMessage: 'Error al actualizar el producto',
    });

    const createProduct = useBaseMutation({
        mutationFn: async (product: ProductInterface | FormData) => {
            const productAdapter = new ProductAdapter(token);
            return createProductUseCase(productAdapter, product);
        },
        queryKey: ['products'],
        successMessage: 'Producto creado correctamente',
        errorMessage: 'Error al crear el producto',
    });

    return {
        deleteProduct,
        updateProduct,
        createProduct,
        isLoading: deleteProduct.isPending || updateProduct.isPending || createProduct.isPending,
    };
};
