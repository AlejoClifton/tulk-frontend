'use client';

import { useSession } from 'next-auth/react';

import { createProductUseCase, updateProductUseCase } from '@/modules/products/application/use-cases';
import { ProductInterface, ProductUpdatePayload } from '@/modules/products/domain';
import { ProductAdapter } from '@/modules/products/infrastructure/product.adapter';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export const useProductMutations = (onSuccess?: () => void) => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken ?? '';

    const deleteProduct = useBaseMutation({
        mutationFn: async ({ id, imageUrls }: { id: string; imageUrls: string[] }) => {
            const productAdapter = new ProductAdapter(token);
            await productAdapter.delete(id);

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
            const productAdapter = new ProductAdapter(token);
            return updateProductUseCase(productAdapter, product);
        },
        queryKey: ['products'],
        successMessage: 'Producto actualizado correctamente',
        errorMessage: 'Error al actualizar el producto',
        onSuccess,
    });

    const createProduct = useBaseMutation({
        mutationFn: async (product: ProductInterface) => {
            const productAdapter = new ProductAdapter(token);
            return createProductUseCase(productAdapter, product);
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
