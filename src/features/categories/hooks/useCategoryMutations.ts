import { useSession } from 'next-auth/react';

import {
    createCategoryUseCase,
    deleteCategoryUseCase,
    updateCategoryUseCase,
} from '@/modules/categories/application/use-cases';
import { CategoryInterface } from '@/modules/categories/domain';
import { CategoryApiAdapter } from '@/modules/categories/infrastructure/category.adapter';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export const useCategoryMutations = () => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const categoryRepository = new CategoryApiAdapter(token || '');

    const createCategory = useBaseMutation({
        mutationFn: (category: CategoryInterface) => createCategoryUseCase(categoryRepository, category),
        queryKey: ['categories'],
        successMessage: 'Categoría creada con éxito',
        errorMessage: 'Error al crear la categoría',
    });

    const updateCategory = useBaseMutation({
        mutationFn: (category: CategoryInterface) => updateCategoryUseCase(categoryRepository, category),
        queryKey: ['categories'],
        successMessage: 'Categoría actualizada con éxito',
        errorMessage: 'Error al actualizar la categoría',
    });

    const deleteCategory = useBaseMutation({
        mutationFn: (id: string) => deleteCategoryUseCase(categoryRepository, id),
        queryKey: ['categories'],
        successMessage: 'Categoría eliminada con éxito',
        errorMessage: 'Error al eliminar la categoría',
    });

    return {
        createCategory,
        updateCategory,
        deleteCategory,
        isLoading: createCategory.isPending || updateCategory.isPending || deleteCategory.isPending,
    };
};
