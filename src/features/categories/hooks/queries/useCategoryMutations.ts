import { useSession } from 'next-auth/react';

import type { CategoryInterface } from '@/features/categories/interfaces/category.interface';
import { createCategory, updateCategory, deleteCategory } from '@/features/categories/services/categories.service';
import { useBaseMutation } from '@/hooks/useBaseMutation';

export const useCategoryMutations = () => {
    const { data: session } = useSession();
    const token = session?.user.accessToken || '';

    const createCategoryMutation = useBaseMutation({
        mutationFn: (category: CategoryInterface) => createCategory(category, token),
        queryKey: ['categories'],
        successMessage: 'Categoría creada con éxito',
        errorMessage: 'Error al crear la categoría',
    });

    const updateCategoryMutation = useBaseMutation({
        mutationFn: (category: CategoryInterface) => updateCategory(category, token),
        queryKey: ['categories'],
        successMessage: 'Categoría actualizada con éxito',
        errorMessage: 'Error al actualizar la categoría',
    });

    const deleteCategoryMutation = useBaseMutation({
        mutationFn: (id: string) => deleteCategory(id, token),
        queryKey: ['categories'],
        successMessage: 'Categoría eliminada con éxito',
        errorMessage: 'Error al eliminar la categoría',
    });

    return {
        createCategory: createCategoryMutation,
        updateCategory: updateCategoryMutation,
        deleteCategory: deleteCategoryMutation,
        isLoading:
            createCategoryMutation.isPending || updateCategoryMutation.isPending || deleteCategoryMutation.isPending,
    };
};
