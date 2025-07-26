'use client';

import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    createProductUseCase,
    deleteProductUseCase,
    updateProductUseCase,
} from '@/modules/products/application/use-cases';
import { ProductAdapter } from '@/modules/products/infrastructure/product.adapter';
import { ProductInterface, ProductUpdatePayload } from '@/modules/products/domain';

export const useProductMutations = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.user?.accessToken ?? '';

    const deleteProduct = useMutation({
        mutationFn: async (id: string) => {
            const productAdapter = new ProductAdapter(token);
            return deleteProductUseCase(productAdapter, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const updateProduct = useMutation({
        mutationFn: async (product: ProductUpdatePayload) => {
            const productAdapter = new ProductAdapter(token);
            return updateProductUseCase(productAdapter, product);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const createProduct = useMutation({
        mutationFn: async (product: ProductInterface | FormData) => {
            const productAdapter = new ProductAdapter(token);
            return createProductUseCase(productAdapter, product);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    return {
        deleteProduct,
        updateProduct,
        createProduct,
        isLoading: deleteProduct.isPending || updateProduct.isPending || createProduct.isPending,
    };
};
