import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import {
    createCategoryUseCase,
    deleteCategoryUseCase,
    updateCategoryUseCase,
} from '@/modules/categories/application/use-cases';
import { CategoryInterface } from '@/modules/categories/domain';
import { CategoryApiAdapter } from '@/modules/categories/infrastructure/category.adapter';

export const useCategoryMutations = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const categoryRepository = new CategoryApiAdapter(token || '');

    const createCategory = useMutation({
        mutationFn: (category: CategoryInterface) => createCategoryUseCase(categoryRepository, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoría creada con éxito');
        },
        onError: () => {
            toast.error('Error al crear la categoría');
        },
    });

    const updateCategory = useMutation({
        mutationFn: (category: CategoryInterface) => updateCategoryUseCase(categoryRepository, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoría actualizada con éxito');
        },
        onError: () => {
            toast.error('Error al actualizar la categoría');
        },
    });

    const deleteCategory = useMutation({
        mutationFn: (id: string) => deleteCategoryUseCase(categoryRepository, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoría eliminada con éxito');
        },
        onError: () => {
            toast.error('Error al eliminar la categoría');
        },
    });

    return {
        createCategory,
        updateCategory,
        deleteCategory,
        isLoading: createCategory.isPending || updateCategory.isPending || deleteCategory.isPending,
    };
};
