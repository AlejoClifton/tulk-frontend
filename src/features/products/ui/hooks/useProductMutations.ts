import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProductCommand, updateProductCommand, createProductCommand } from '@/features/products/application/commands';

export const useProductMutations = () => {
    const queryClient = useQueryClient();

    const deleteProduct = useMutation({
        mutationFn: deleteProductCommand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const updateProduct = useMutation({
        mutationFn: updateProductCommand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const createProduct = useMutation({
        mutationFn: createProductCommand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    return {
        deleteProduct,
        updateProduct,
        createProduct,
    };
}; 