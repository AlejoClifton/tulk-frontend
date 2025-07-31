'use client';

import { useSession } from 'next-auth/react';

import { createProductUseCase, updateProductUseCase } from '@/modules/products/application/use-cases';
import { ProductInterface } from '@/modules/products/domain';
import { ProductApi } from '@/modules/products/infrastructure/product.api';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

import { useImagesController } from './useImagesController';

export const useProductMutations = (onSuccess?: () => void) => {
    const { data: session } = useSession();
    const { deleteImages } = useImagesController();

    const deleteProduct = useBaseMutation({
        mutationFn: async ({ id, imageUrls }: { id: string; imageUrls: string[] }) => {
            const productApi = new ProductApi();
            await productApi.delete(id, session?.user.accessToken || '');

            if (imageUrls && imageUrls.length > 0) {
                await deleteImages(imageUrls);
            }
        },
        queryKey: ['products'],
        successMessage: 'Producto eliminado correctamente',
        errorMessage: 'Error al eliminar el producto',
        onSuccess,
    });

    const updateProduct = useBaseMutation({
        mutationFn: async (product: ProductInterface) => {
            const productApi = new ProductApi();
            return updateProductUseCase(productApi, product, session?.user.accessToken || '');
        },
        queryKey: ['products'],
        successMessage: 'Producto actualizado correctamente',
        errorMessage: 'Error al actualizar el producto',
        onSuccess,
    });

    const createProduct = useBaseMutation({
        mutationFn: async (product: ProductInterface) => {
            const productApi = new ProductApi();
            return createProductUseCase(productApi, product, session?.user.accessToken || '');
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
