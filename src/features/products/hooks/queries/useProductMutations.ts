'use client';

import { useSession } from 'next-auth/react';

import type { ProductInterface } from '@/features/products/interfaces/product.interface';
import {
    createProduct,
    updateProduct,
    deleteProduct as deleteProductService,
} from '@/features/products/services/product.service';
import { useBaseMutation } from '@/hooks/useBaseMutation';
import { useImagesController } from '@/hooks/useImagesController';

export const useProductMutations = (onSuccess?: () => void) => {
    const { data: session } = useSession();
    const { deleteImages } = useImagesController();
    const token = session?.user.accessToken || '';

    const deleteProduct = useBaseMutation({
        mutationFn: async ({ id, imageUrls }: { id: string; imageUrls: string[] }) => {
            await deleteProductService(id, token);
            if (imageUrls && imageUrls.length > 0) {
                await deleteImages(imageUrls);
            }
        },
        queryKey: ['products'],
        successMessage: 'Producto eliminado correctamente',
        errorMessage: 'Error al eliminar el producto',
        onSuccess,
    });

    const updateProductMutation = useBaseMutation({
        mutationFn: async (product: ProductInterface) => {
            return updateProduct(product, token);
        },
        queryKey: ['products'],
        successMessage: 'Producto actualizado correctamente',
        errorMessage: 'Error al actualizar el producto',
        onSuccess,
    });

    const createProductMutation = useBaseMutation({
        mutationFn: async (product: ProductInterface) => {
            return createProduct(product, token);
        },
        queryKey: ['products'],
        successMessage: 'Producto creado correctamente',
        errorMessage: 'Error al crear el producto',
        onSuccess,
    });

    return {
        deleteProduct,
        updateProduct: updateProductMutation,
        createProduct: createProductMutation,
        isLoading: deleteProduct.isPending || updateProductMutation.isPending || createProductMutation.isPending,
    };
};
