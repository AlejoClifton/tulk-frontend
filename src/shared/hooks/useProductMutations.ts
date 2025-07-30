'use client';

import { createProductUseCase, updateProductUseCase } from '@/modules/products/application/use-cases';
import { ProductInterface, ProductUpdatePayload } from '@/modules/products/domain';
import { ProductApi } from '@/modules/products/infrastructure/product.api';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export const useProductMutations = (onSuccess?: () => void) => {
    const deleteProduct = useBaseMutation({
        mutationFn: async ({ id, imageUrls }: { id: string; imageUrls: string[] }) => {
            const productApi = new ProductApi();
            await productApi.delete(id);

            if (imageUrls && imageUrls.length > 0) {
                await fetch('/api/products/images', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ urls: imageUrls }),
                });
            }
        },
        queryKey: ['products'],
        successMessage: 'Producto eliminado correctamente',
        errorMessage: 'Error al eliminar el producto',
        onSuccess,
    });

    const updateProduct = useBaseMutation({
        mutationFn: async (product: ProductUpdatePayload) => {
            const productApi = new ProductApi();
            return updateProductUseCase(productApi, product);
        },
        queryKey: ['products'],
        successMessage: 'Producto actualizado correctamente',
        errorMessage: 'Error al actualizar el producto',
        onSuccess,
    });

    const createProduct = useBaseMutation({
        mutationFn: async (product: ProductInterface) => {
            const productApi = new ProductApi();
            return createProductUseCase(productApi, product);
        },
        queryKey: ['products'],
        successMessage: 'Producto creado correctamente',
        errorMessage: 'Error al crear el producto',
        onSuccess,
    });

    return {
        deleteProduct,
        updateProduct,
        createProduct,
        isLoading: deleteProduct.isPending || updateProduct.isPending || createProduct.isPending,
    };
};
